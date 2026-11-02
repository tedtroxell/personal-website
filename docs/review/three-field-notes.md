# Three interactive field notes

Built and checked locally on 1 November 2026 in `/Users/TedT/tmp/personal-website`. Production preview: `http://localhost:3000`.

## Delivered

- `/where-the-work-waits`: five sections on queues, WIP, capacity and leadership handoffs. A deterministic twelve-request workflow model exposes intake wait, cycle time, lead time and stage queues. Controls change review slots, review duration, WIP and handoff delay. An accessible table gives each request's timeline.
- `/how-good-is-the-measurement`: five sections on repeatability, bias, averaging, calibration and training labels. Controls change a reference dimension, bias, random reading noise and repeated readings. The curve and analytical decision probabilities respond, including an explicitly idealized bias correction.
- `/when-the-model-should-ask-for-help`: six sections on decision costs, review, calibration, drift and operating ownership. A seeded 240-part inspection model includes score thresholds, review capacity, imperfect reviewers, holding and changed conditions. Reference labels can be revealed.

All three use the site's paper, green and coral palette, existing font variables, dimensioned drafting artwork and grid/title-block motifs. New illustrations are local SVG assets plus 1200×630 PNG link previews. Sources are linked in each article. Example data, assumptions and exclusions are visible. The prose contains no em dashes and does not invent career anecdotes or production results.

## Discovery and maintenance

The archive, homepage list and latest-article notice now share `lib/article-index.ts`. The three new notes appear in all three places. Native archive search and category filtering remain available. Related-reading cards connect the three pieces. Refreshing the WordPress reference conversion preserves those integrations.

Content: `lib/articles/field-notes.ts`. Models: `lib/articles/models.ts`. UI: `components/articles/`. Styles: `app/field-notes.css`. Local artwork generator: `scripts/build-article-art.py`.

## Verification

- `npm run test:models`: ten checks passed. These verify resource capacities and stage ordering, lead-time accounting, the adverse low-WIP case, independent-noise averaging, calibration assumptions, boundary acceptance probability, inspection partitioning/capacity, extreme thresholds, imperfect review and the stress-test behavior.
- `npm run typecheck` and `npm run build`: passed. All three page routes and six image routes returned HTTP 200. Each article has PNG social-preview metadata.
- Desktop browser: all three SVG drawings progressed with native downward scrolling and rewound on upward scrolling. Initial 0% returned to 0%; the first scroll moved the three drawings to 35%, 32% and 27%, respectively. Actual stroke offsets changed from the initial hidden offset to zero and back.
- Controls: adding a review slot changed the workflow result to 18.0 average days and completion by day 34; ideal calibration centered the selected average at 75.075 mm; zero review capacity held 25 cases, rising to 64 under changed conditions, without accepting the unreviewed cases.
- Responsive browser: all three pages had no document overflow at observed 433px and 355px viewport widths. Covers loaded. The compact sticky drawing leaves the narrative readable; short viewports use a static drawing. Native labels and keyboard-operated controls are provided.
- Homepage: the original controller file still matches WordPress byte for byte. All nine SVG scene positions and dimensions match the earlier reference. Only the writing/discovery content changed.
- Fresh production browser navigation reported no warnings, hydration errors or runtime errors. The latest notice points to the workflow article; the archive shows six published notes and returns one result for a measurement search. The existing mold-fill draft remains directly accessible.

Browser evidence: `docs/review/evidence/new-field-notes/browser-checks.json`. Desktop article and experiment screenshots are stored alongside it.

No code, images or artifacts were pushed, deployed or uploaded. The source WordPress service was not modified. Existing Vercel contact-receiver configuration requirements are unchanged.
