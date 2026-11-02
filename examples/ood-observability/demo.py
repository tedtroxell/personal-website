"""Run: python demo.py. Uses synthetic labeled data; does not deploy anything."""
import json
from pathlib import Path
import torch
from torch import nn
from ood import ClassDistance, Trigger, promotion_gate

class Classifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.encoder = nn.Sequential(nn.Linear(2, 12), nn.Tanh())
        self.head = nn.Linear(12, 2)

    def forward(self, x):
        features = self.encoder(x)
        return self.head(features), features

def data(n, shift=0.):
    labels = torch.arange(n) % 2
    x = torch.randn(n, 2) * .55
    x[:, 0] += (labels * 2 - 1) * 1.4
    x[:, 1] += shift
    return x, labels

def train(model, x, y, steps=160):
    model.train()
    optimizer = torch.optim.Adam(model.parameters(), lr=.025)
    for _ in range(steps):
        optimizer.zero_grad(set_to_none=True)
        logits, _ = model(x)
        loss = nn.functional.cross_entropy(logits, y)
        loss.backward()
        optimizer.step()
    return model.eval()

@torch.inference_mode()
def features(model, x):
    model.eval()  # inference_mode alone does not disable dropout / update batchnorm policy.
    return model(x)[1].clone()

@torch.inference_mode()
def accuracy(model, x, y):
    model.eval()
    return (model(x)[0].argmax(1) == y).float().mean().item()

def main():
    torch.manual_seed(42)
    torch.set_num_threads(1)
    train_x, train_y = data(800)
    cal_x, _ = data(800)       # Independent ID calibration, no fitting here.
    old_x, old_y = data(1000) # Reserved evaluation; never used to train.
    new_x, new_y = data(400, 5.)  # Simulates a trusted labeling process.
    test_x, test_y = data(1000, 5.)
    champion = train(Classifier(), train_x, train_y)
    detector = ClassDistance(2, 12).fit(features(champion, train_x), train_y)
    detector.calibrate(features(champion, cal_x))
    trigger = Trigger()
    queued = False
    for index in range(3):
        batch, _ = data(200, 5.)
        with torch.inference_mode():
            score = detector(features(champion, batch))
        flagged = int((score > detector.threshold).sum())
        print(json.dumps(dict(window=index, count=200, flagged=flagged,
                              model_version="demo-v1", detector_version="demo-v1-q99",
                              preprocess_version="identity-v1", slice="synthetic-shift")))
        queued = trigger.observe(total=200, flagged=flagged, timestamp=index*600,
                                 reviewed_labels=len(new_y), contract_ok=True)
    if not queued:
        print("No candidate queued: trigger conditions were not met.")
        return
    candidate = Classifier()
    candidate.load_state_dict(champion.state_dict())
    # Replay original data. New labels come from our synthetic oracle, NOT predictions.
    train(candidate, torch.cat((train_x, new_x)), torch.cat((train_y, new_y)))
    metrics = dict(old_baseline=accuracy(champion, old_x, old_y),
                   old_candidate=accuracy(candidate, old_x, old_y),
                   new_baseline=accuracy(champion, test_x, test_y),
                   new_candidate=accuracy(candidate, test_x, test_y))
    eligible = promotion_gate(**metrics)
    # Any new model changes feature space. Refit and recalibrate with NEW bundle data.
    updated = ClassDistance(2, 12).fit(features(candidate, torch.cat((train_x, new_x))),
                                      torch.cat((train_y, new_y)))
    expanded_cal, _ = data(800, 5.)
    updated.calibrate(features(candidate, torch.cat((cal_x, expanded_cal))))
    out = Path("output")
    out.mkdir(exist_ok=True)
    torch.save({"model": candidate.state_dict(), "detector": updated.state_dict(),
                "preprocess_version": "identity-v1", "bundle_version": "candidate-v2"},
               out / "candidate.pt")
    (out / "evaluation.json").write_text(json.dumps({**metrics, "eligible": eligible}, indent=2))
    print(json.dumps({**metrics, "candidate_saved": True, "eligible_for_canary": eligible,
                      "deployed": False}, indent=2))

if __name__ == "__main__":
    main()
