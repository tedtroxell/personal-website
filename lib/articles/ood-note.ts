import type { FieldNote } from './field-notes';
export const oodNote: FieldNote = {
 "kind": "ood",
 "slug": "when-the-inputs-change",
 "title": "When the inputs change",
 "deck": "Build OOD observability in PyTorch, then turn reviewed data into a retraining job without turning every alert into a release.",
 "category": "Machine learning",
 "readTime": "12 MIN READ",
 "sections": [
  {
   "title": "The model still answers. That is the problem.",
   "paragraphs": [
    "A camera gets replaced. A supplier changes a surface finish. A new customer sends a different kind of document. The service stays up and the model keeps returning predictions. None of that tells you whether those predictions still deserve the same trust.",
    "Out of distribution, or OOD, means unfamiliar relative to a reference distribution you chose. It is not a synonym for incorrect. A harmless lighting change can look unusual; a familiar-looking input can still produce a costly mistake. Distribution drift describes a change across a population. Performance monitoring needs outcomes. Keep those signals separate.",
    "This walkthrough adds a small feature-distance monitor to a PyTorch classifier, then connects persistent alerts to automatic candidate retraining. The browser experiment is synthetic. The downloadable Python example actually trains a small network locally. Neither one is a production monitoring platform."
   ],
   "takeaway": "An OOD alert is a reason to investigate. It is not a label or a deployment instruction."
  },
  {
   "title": "Give unfamiliar a reference point.",
   "paragraphs": [
    "Have the model return an embedding as well as logits. Use the same preprocessing in training and serving, and record its version. Explicit outputs are easier to reason about here than a hook attached to a layer whose name might change during a refactor.",
    "Fit one mean embedding per known class on reference training data. Estimate a shared, diagonal within-class variance, with mild shrinkage and a floor. At inference, measure the standardized squared distance to each class mean and keep the smallest. Averaging across feature dimensions makes the scale easier to read, but it does not make the result a probability.",
    "This is a deliberately reduced baseline inspired by class-conditional Mahalanobis methods. It ignores feature correlations and uses one layer. It is not the full method in Lee and colleagues’ paper. A single mean also handles a class with several distinct clusters poorly. Compare it with alternatives on the shifts you care about before depending on it."
   ],
   "equation": "score(z) = min over classes c of mean_j [(z_j − μ_cj)² / v_j]",
   "code": {
    "label": "ood.py / distance score",
    "source": "def forward(self, features):\n        self._check(features)\n        distances = ((features[:, None] - self.means[None]).square()\n                     / self.variance).mean(-1)\n        return distances.min(1).values\n\n"
   }
  },
  {
   "title": "Calibrate the alert, not your optimism.",
   "paragraphs": [
    "Reserve independent, representative in-distribution data for calibration. The example uses its 99th percentile score, with the higher interpolation rule, as the threshold. Flag scores strictly above that threshold. This targets roughly a one-percent tail on that calibration sample. It does not promise a one-percent false alarm rate tomorrow.",
    "Keep a separate evaluation set to estimate the false positive rate, uncertainty and detection rate on known shift examples. Check cameras, sites, products and other meaningful slices. A threshold that looks fine across the whole fleet can overwhelm one site. Many repeated checks also create more chances to raise a false alert.",
    "Use model.eval() as well as torch.inference_mode(). They do different jobs: evaluation mode controls modules such as dropout and batch normalization; inference mode disables autograd bookkeeping. Store detector statistics as buffers so they travel with the state dict. Never compare a new model’s embeddings with the old model’s feature reference."
   ],
   "code": {
    "label": "Fit and calibrate / independent datasets",
    "source": "model.eval()\nwith torch.inference_mode():\n    _, reference = model(train_x)\n    _, heldout = model(calibration_x)\n    detector = ClassDistance(classes=2, dimensions=reference.shape[1]).to(reference.device)\n    detector.fit(reference, train_y).calibrate(heldout, quantile=.99)\n    _, features = model(request_x)\n    scores = detector(features)\n    flagged = scores > detector.threshold"
   }
  },
  {
   "title": "Make the alert useful to an operator.",
   "paragraphs": [
    "Emit counts, score quantiles, flagged counts, input-validation failures and latency, tagged with model, detector and preprocessing versions. Add a bounded site or product slice when it helps someone investigate. Do not put every sample ID into a metrics label. Keep an opaque event ID in a separate, access-controlled review log, with governed links to retained inputs.",
    "The example evaluates non-overlapping ten-minute windows. A window needs at least 100 valid requests; more than eight percent must be flagged for three consecutive windows. These are illustrative operating choices, not statistically derived limits. Low-volume windows reset the streak. A one-hour cooldown limits repeated jobs. Track missing telemetry and service failures separately so silence never looks like recovery.",
    "For a real service, keep counters and trigger state in durable storage. Use event-time watermarks for late data, deduplicate completed windows and evaluate each approved slice independently. Calibrate the alert policy on historical traffic, including its seasonality and autocorrelation. Start with alert-only operation and measure how much review work it creates."
   ],
   "code": {
    "label": "ood.py / persistent-window trigger (excerpt)",
    "source": "breach = total >= self.min_count and flagged / max(total, 1) > self.rate_limit\nself.streak = self.streak + 1 if breach else 0\ncooled = self.last_queued is None or timestamp - self.last_queued >= self.cooldown_seconds\nready = self.streak >= self.required_windows and cooled and reviewed_labels >= 200 and contract_ok\nif ready:\n    self.last_queued = timestamp\n    self.streak = 0\nreturn ready"
   }
  },
  {
   "title": "Do not feed the alert straight back into training.",
   "paragraphs": [
    "Put flagged examples in a review queue. Sort out broken files, sensor faults, changed preprocessing, valid new conditions and genuinely new classes. A bad camera needs a repair before it needs a training job. An unknown class needs an explicit label-schema and product decision. This example supports the existing two classes only.",
    "Get trusted labels for useful new examples. The model’s own prediction is not a ground-truth label. Sample ordinary traffic too, including cases below the OOD threshold, or the dataset will reflect only what this detector happened to notice. Track label quality, provenance, coverage and the age of unresolved reviews.",
    "Before training, deduplicate related examples and split by the unit that could leak information: part, customer, site, session or time. Keep a new-domain holdout out of training and calibration. Preserve an untouched original-domain test set. Retrain on a deliberate mix of reviewed new data and original data so the new condition does not erase the old one."
   ],
   "takeaway": "The automation starts after the data is suitable for training, not merely after it looks different."
  },
  {
   "title": "Automate the candidate job.",
   "paragraphs": [
    "The downloadable Trigger class requires sustained alerts, a cooldown, at least 200 reviewed labels and a passing data contract before returning true. The demo uses that result to launch training automatically. Its labels come from a synthetic oracle. In your application, the reviewed-label count must come from your labeling system and must refer to the same region, time range and dataset manifest as the alert.",
    "Run aggregation on a scheduler, for example every ten minutes. In one database transaction, claim the completed window, update trigger state and insert a job into an outbox with a unique key built from the champion version, policy version and immutable dataset-manifest hash. A worker claims that job with a lease, validates the manifest and launches the training command. Retries reuse the same job ID; a completed job never trains twice.",
    "The manifest should pin input and label versions, group splits, preprocessing, label schema, code revision and training configuration. Record the seed, environment and artifact hashes with the run. Bound the worker’s resources and retries, and alert on failed or stalled jobs. The small Python download keeps trigger state in memory to make the mechanism readable; it does not implement this distributed scheduler or exactly-once processing."
   ],
   "code": {
    "label": "demo.py / candidate training",
    "source": "if not queued:\n    print(\"No candidate queued: trigger conditions were not met.\")\n    return\ncandidate = Classifier()\ncandidate.load_state_dict(champion.state_dict())\n# Replay original data. New labels come from our synthetic oracle, NOT predictions.\ntrain(candidate, torch.cat((train_x, new_x)), torch.cat((train_y, new_y)))"
   }
  },
  {
   "title": "A training run is not a release.",
   "paragraphs": [
    "Evaluate champion and candidate on the same reserved original-domain and new-domain examples. Report counts and uncertainty, not just rounded percentages. Include important class and operating slices, calibration, latency and the downstream cost of errors. If the new data is too sparse to support a decision, keep collecting it.",
    "The example gate allows at most one percentage point of original-domain accuracy regression and requires two points of new-domain improvement. Those values are placeholders. Set your budgets before looking at results, and use an uncertainty-aware comparison appropriate to the task. Repeatedly tuning against the same holdout eventually turns it into development data.",
    "Refit the detector in the candidate’s feature space and calibrate it on a separate, approved mixture of old and newly supported conditions. Keep additional untouched shift examples to test what it still misses. Version model, preprocessing, detector statistics, threshold and policy together. Do not quietly widen the reference to make an alert disappear.",
    "Only a passing bundle becomes eligible for a shadow run or a small canary. Compare live quality when labels arrive, operational metrics and rollback criteria. Expand traffic gradually, retain the previous bundle and switch back if the agreed limits fail. The download writes a candidate bundle and an evaluation file. It intentionally does not change a serving endpoint."
   ],
   "code": {
    "label": "ood.py / illustrative release gate",
    "source": "def promotion_gate(old_baseline, old_candidate, new_baseline, new_candidate):\n    \"\"\"Illustrative accuracy gates, not a universal acceptance policy.\"\"\"\n    values = (old_baseline, old_candidate, new_baseline, new_candidate)\n    if not all(0 <= x <= 1 for x in values):\n        raise ValueError(\"Accuracy must be finite and in [0, 1]\")\n    return (old_candidate >= old_baseline - .01\n            and new_candidate >= new_baseline + .02)\n"
   }
  },
  {
   "title": "Try it locally, then replace the toy assumptions.",
   "paragraphs": [
    "Download the example below, create a Python environment and install the pinned dependency. Run the unit tests, then run demo.py. It generates independent training, calibration and test samples, fits the monitor, emits three versioned windows and trains a candidate if the trigger is ready. It writes output/candidate.pt and output/evaluation.json in your working directory. It sends nothing anywhere.",
    "The code was exercised with Python 3.12 and PyTorch 2.4.1 on CPU. The seed makes this particular demonstration repeatable in that environment; it does not promise identical results across hardware or PyTorch releases. The shifted toy distribution is deliberately easy to detect. It is not an OOD benchmark.",
    "The biggest gap is the representation itself. A network can collapse an unfamiliar input onto a familiar embedding. This distance score will miss it. It also cannot see a changed relationship between inputs and labels when the input distribution stays the same. Keep input checks, outcome monitoring and a random audit sample alongside the detector. The useful system is the whole loop: notice, investigate, learn, test and release."
   ],
   "code": {
    "label": "Terminal / run the local example",
    "source": "python3.12 -m venv .venv\nsource .venv/bin/activate\npython -m pip install -r requirements.txt\npython -m unittest -v\npython demo.py"
   }
  }
 ],
 "modelTitle": "An alert is only the first gate.",
 "modelIntro": "Move the incoming data away from its reference, then change the monitoring policy and the readiness checks. The browser uses a fixed synthetic score distribution, not the Python neural network.",
 "assumptions": "Four independent illustrative windows of 200 requests. Shift changes a fixed synthetic score distribution. Scores above the selected threshold are flagged. The alert limit is 8%; a window needs 100 requests. Label readiness requires 200 reviewed examples and a passing contract. Candidate eligibility uses illustrative point-estimate accuracy gates, not confidence intervals. No data is submitted and no training or deployment runs in the browser.",
 "sources": [
  {
   "label": "Lee et al. / Feature-distance OOD detection",
   "url": "https://proceedings.neurips.cc/paper_files/paper/2018/hash/abdeb6f575ac5c6676b747bca8d09cc2-Abstract.html",
   "note": "The class-conditional Mahalanobis approach behind the simplified baseline. This example omits its full covariance, multiple layers and input perturbation."
  },
  {
   "label": "PyTorch / Inference mode",
   "url": "https://docs.pytorch.org/docs/stable/generated/torch.autograd.grad_mode.inference_mode.html",
   "note": "Inference mode and evaluation mode address different behavior. Use both when collecting inference features."
  },
  {
   "label": "PyTorch / Saving and loading models",
   "url": "https://docs.pytorch.org/tutorials/beginner/saving_loading_models",
   "note": "State dictionaries and checkpoints. Save the model and detector statistics together, and explicitly use weights_only=True when loading the example bundle."
  },
  {
   "label": "NIST AI RMF / Manage",
   "url": "https://airc.nist.gov/airmf-resources/playbook/manage/",
   "note": "Ongoing monitoring, named responsibilities and documented responses. The numerical gates in this article are illustrative choices, not NIST requirements."
  }
 ]
};
