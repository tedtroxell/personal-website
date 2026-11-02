# WordPress parity verification

Verified locally on 1 November 2026. Reference: `http://localhost:8091`. Migrated production preview: `http://localhost:3000`, served from `/Users/TedT/tmp/personal-website`.

## Aesthetics and SVG scrolling

The approximation in the initial migration has been replaced with TSX converted from the actual WordPress output. All nine original SVG scenes, viewBoxes, paths, classes and phase attributes are preserved. The original core block CSS and theme CSS restore the typography, buttons, spacing, sticky drawing columns, mobile layout and diagram captions.

At matched browser viewports, every scene had the same document position and dimensions. The page heights also matched. Native scroll input was applied to each site at the same increments, then reversed:

- Desktop: 19 sampled states matched exactly.
- Mobile: 21 sampled states matched exactly.
- Each comparison includes scroll position, every drawing path's dash offset, every fill's clip path, fade opacity, and leadership/timeline reached/current classes.
- The 12 drawing, navigation, modal, toast, article and lab controller/model files match the running WordPress theme byte for byte.
- Mobile retains the original compact breakpoint and 70% viewport trigger; desktop retains its 78% trigger and original leadership transition rules. Drawing sensitivity, phase ranges, Gantt horizontal fills and timeline progression use the original calculations.

Evidence: [all scroll states](evidence/scroll-parity.json), [WordPress desktop drawing](evidence/wordpress-leadership-desktop.jpg), [TSX desktop drawing](evidence/tsx-leadership-desktop.jpg), [TSX mobile homepage](evidence/tsx-home-mobile.jpg).

## Pages and controls

- Data-center article: all five charts, heading typography and page height matched on desktop and mobile. No horizontal document overflow at either size. [Measurements](evidence/data-article-parity.json).
- Mold-fill article: original 2D phone-case drawing, filters, controls and seven scroll stages restored. Arrow Right advanced the fill to 3%; Arrow Left returned it to 0%. No unrendered WordPress shortcode remains.
- Lab: original lazy-loaded model runs and resets. Its pendulum moves and the original fitting/threshold controls are retained.
- Contact: mobile menu opens; modal locks scrolling and focuses the title; closing returns the form to its inline position and preserves the draft; speaking selects the correct enquiry type. A synthetic test enquiry saved locally and cleared the form after success. Invalid JSON was rejected with HTTP 400.
- Blog: original archive layout, category filters and search restored at `/blog` and `/writing`. A data-center search returned one matching post. Search form navigation is supported too.
- Experience pages, privacy page, footer and navigation use the WordPress layout/content. The archive reflects published WordPress content; the mold-fill draft remains directly available at `/pareto-mold-fill`.
- The production build passed. All checked page/asset routes returned HTTP 200. JavaScript modules return `application/javascript`. A fresh production browser session reported no runtime, hydration or console warnings/errors across the homepage and both interactive articles.

## Vercel contact configuration

The public form interaction matches WordPress, but WordPress's enquiry database does not run on Vercel. Local submissions are stored in the ignored `.local/leads.jsonl` file. Configure `CONTACT_WEBHOOK_URL` (and optionally `CONTACT_WEBHOOK_TOKEN`) to save production enquiries in a durable receiver. Without that configuration the Vercel form preserves the draft and offers email rather than claiming success. See `VERCEL.md`.

The original WordPress sources and service are unchanged. No code, screenshots, test messages or other artifacts were pushed, deployed or uploaded.

## Editing and reproducing the conversion

Editable TSX is under `components/reference/`. The local HTML snapshots used for conversion are under `docs/reference/wordpress/`. Run `python3 scripts/import-wordpress-reference.py` to reproduce the conversion, then verify the TypeScript build and browser behavior after edits. Custom live behavior is loaded by `components/SiteRuntime.tsx` and `components/ArticleRuntime.tsx`.
