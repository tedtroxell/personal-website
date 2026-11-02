# Pareto mold-fill article handoff

The article is ready as a local WordPress draft with a native theme template and a scroll-built SVG geometry proxy.

## Local files

- Uploadable theme: `dist/tedtroxell-theme.zip`
- Optional one-post WordPress import: `dist/pareto-mold-fill-draft.xml`
- Canonical editable post content: `docs/content/pareto-mold-fill.html`
- Package check: `python3 scripts/check-pareto-package.py`

Install the theme ZIP, then import the WXR file to create the draft post. The theme alone does not create article content. The draft is named “A faster answer first” with slug `pareto-mold-fill`.

## Local preview and checks

The isolated local WordPress site is `http://localhost:8091/`. Its draft ID is 88 and its authenticated preview route is `http://localhost:8091/?p=88&preview=true`. The temporary editor login used for visual review was removed after testing. The draft remains unpublished.

The theme package check confirms 43 files, all under the `tedtroxell/` archive root, including the target template, shortcode, local CSS, controller and model. The import file contains exactly one draft post. The article assets load on the target post only. Keyboard testing confirmed that focusing the drawing and pressing Right advances the fill; the site’s unrelated homepage remained intact.

Automated checks passed for the article source, package, geometry model, keyboard isolation and PHP syntax. Visual review covered the desktop layout and the available 511 px in-app viewport. The exact 390 px, 320 px and landscape-phone screenshots, and manual browser toggling of reduced-motion and JavaScript-disabled modes were unavailable in this session. Their responsive, reduced-motion and static-fallback behavior is covered by the scoped styles, markup and controller paths but should get a final device check before public publication.

All files and artifacts remain on this machine. Changes are committed locally on `codex/leadership-website`; nothing was pushed, published or uploaded.
