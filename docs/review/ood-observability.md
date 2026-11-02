# OOD observability field note

Local route: /when-the-inputs-change/

Eight chapters cover embedding reference, simplified class-conditional diagonal
distance, independent quantile calibration, telemetry/windows, review and labels,
automatic candidate training, evaluation and canary release. Primary references
are linked in the article. No deployment service or cloud artifact was created.

The browser experiment is deterministic synthetic policy logic, not a neural
network running in JavaScript. The download runs an actual local PyTorch toy
classifier and automatic candidate training after a persistent alert. Distributed
scheduling, durable trigger state and deployment are explicitly integration work,
not features claimed by the small download.

Verification, 1 November 2026:
- 13 Node model tests pass, including independent OOD data/release gates.
- Six Python tests pass from the extracted downloadable ZIP (Python 3.12,
  PyTorch 2.4.1 CPU).
- Downloaded demo runs: three windows flag 198, 200 and 197 of 200 samples,
  then trains and saves a candidate and evaluation. No serving changes.
- Candidate state reloads with weights_only=True and produces finite scores.
- npm run typecheck and npm run build pass; new route statically generated.
- Browser: eight chapters, six copyable code blocks. Copy action works.
- Browser controls: shift + reviewed labels permit training; increased original-
  domain loss holds the candidate at evaluation. Reset returns original state.
- Drawing progresses from 0% to 44% after desktop scroll. Original homepage
  story.js SHA-256 unchanged from WordPress reference.
- Desktop 1600 CSS px and mobile 433 / 355 CSS px: no document overflow.
  Wide code stays inside independently scrollable blocks. Mobile diagram remains
  compact and sticky; readable HTML controls carry the same information.
- Browser warning/error log empty. Blog lists the article. Article, archive,
  ZIP and PNG social image return HTTP 200.

Evidence: evidence/ood/article-desktop.jpg, experiment-desktop.jpg,
article-mobile.jpg. All evidence is local. Original WordPress server untouched.
