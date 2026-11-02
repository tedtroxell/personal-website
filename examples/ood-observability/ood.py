"""Small, explicit OOD baseline. No service dependencies. Tested with torch 2.4.1."""
from dataclasses import dataclass
import torch
from torch import nn


class ClassDistance(nn.Module):
    """Class means, tied diagonal within-class variance, mean squared distance."""
    def __init__(self, classes: int, dimensions: int):
        super().__init__()
        self.register_buffer("means", torch.zeros(classes, dimensions))
        self.register_buffer("variance", torch.ones(dimensions))
        self.register_buffer("threshold", torch.tensor(float("inf")))

    @torch.no_grad()
    def fit(self, features, labels):
        self._check(features)
        k = len(self.means)
        if labels.shape != (len(features),) or labels.dtype != torch.long:
            raise ValueError("Expected one integer label per feature row")
        if (labels < 0).any() or (labels >= k).any():
            raise ValueError("Unknown class: review the label schema first")
        counts = torch.bincount(labels, minlength=k)
        if (counts < 2).any():
            raise ValueError("Need at least two reference samples per class")
        means = torch.stack([features[labels == c].mean(0) for c in range(k)])
        residual = features - means[labels]
        pooled = residual.square().sum(0) / (len(features) - k)
        # Mild shrinkage plus a floor. Tune on development data, never the test set.
        variance = (.9 * pooled + .1 * pooled.mean()).clamp_min(1e-4)
        self.means.copy_(means)
        self.variance.copy_(variance)
        self.threshold.fill_(float("inf"))  # A refit invalidates calibration.
        return self

    def _check(self, features):
        if features.ndim != 2 or features.shape[1] != self.means.shape[1]:
            raise ValueError("Feature dimension does not match this detector")
        if not len(features) or not torch.isfinite(features).all():
            raise ValueError("Empty or non-finite features: route to input validation")

    def forward(self, features):
        self._check(features)
        distances = ((features[:, None] - self.means[None]).square()
                     / self.variance).mean(-1)
        return distances.min(1).values

    @torch.no_grad()
    def calibrate(self, heldout_id, quantile=.99):
        if not 0 < quantile < 1:
            raise ValueError("Quantile must be between zero and one")
        self.threshold.copy_(torch.quantile(self(heldout_id), quantile,
                                           interpolation="higher"))
        return self


@dataclass
class Trigger:
    """Called once per NON-OVERLAPPING, completed window, in time order."""
    rate_limit: float = .08
    min_count: int = 100
    required_windows: int = 3
    cooldown_seconds: int = 3600
    streak: int = 0
    last_queued: int | None = None
    last_window: int | None = None

    def observe(self, *, total, flagged, timestamp, reviewed_labels, contract_ok):
        if total < 0 or not 0 <= flagged <= total:
            raise ValueError("Invalid window counts")
        if self.last_window is not None and timestamp <= self.last_window:
            raise ValueError("Duplicate or out-of-order window")
        self.last_window = timestamp
        breach = total >= self.min_count and flagged / max(total, 1) > self.rate_limit
        self.streak = self.streak + 1 if breach else 0
        cooled = self.last_queued is None or timestamp - self.last_queued >= self.cooldown_seconds
        ready = self.streak >= self.required_windows and cooled and reviewed_labels >= 200 and contract_ok
        if ready:
            self.last_queued = timestamp
            self.streak = 0
        return ready


def promotion_gate(old_baseline, old_candidate, new_baseline, new_candidate):
    """Illustrative accuracy gates, not a universal acceptance policy."""
    values = (old_baseline, old_candidate, new_baseline, new_candidate)
    if not all(0 <= x <= 1 for x in values):
        raise ValueError("Accuracy must be finite and in [0, 1]")
    return (old_candidate >= old_baseline - .01
            and new_candidate >= new_baseline + .02)
