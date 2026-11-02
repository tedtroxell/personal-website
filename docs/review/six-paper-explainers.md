# Six interactive research articles

Added native field notes for Attention Residuals, Engram, byteification,
Paper2Agent, AlphaGenome and DINOv3. Each has five chapters, original local
SVG/PNG artwork, a publication/source card, two primary-source links, explicit
demo assumptions and a distinct interactive explanation. Text is approximately
580–670 words per article, excluding controls and references. No em dashes.

The mechanisms are deliberately limited teaching models. No research model runs,
training, genomic interpretation, external agent execution or API calls occur.
Paper results are attributed; browser metrics are synthetic or exact UTF-8
accounting. Source metadata distinguishes first posting from journal publication.

Verification, 1 November 2026:
- 21 Node model tests pass. New invariants: normalized attention, conserved hash
  entries, UTF-8 round trips, blocked tool exposure, context-independent synthetic
  tracks and Gram symmetry/unit diagonal/common-rotation invariance.
- TypeScript and final production build pass. Six new routes statically generated.
- All six article routes, covers and social PNGs return HTTP 200. All are listed
  in the blog archive and source URLs are present in the rendered article HTML.
- Desktop browser at 1422 CSS px: each starts at 0% drawing progress and reaches
  40–47% after two native scroll pages. No document overflow.
- Mobile browser at 355 CSS px: all six have no document overflow, compact sticky
  drawings (~222 px), usable native controls and 28–35% drawing progression after
  two native scroll pages. Numeric data is available outside the SVGs.
- Browser interactions: attention temperature changes concentration; Engram gate
  at zero gives zero contribution while collisions remain visible; emoji UTF-8
  is four bytes; Paper2Agent schema failure blocks exposure and explicit repair
  restores fixture 10; cropped AlphaGenome view flags missing context; setting B
  changes invented coefficient; DINO full anchor reaches zero matrix error and
  common rotation preserves it. Genome reset returns original defaults.
- Browser warning/error log empty during interaction checks.
- Original homepage story.js SHA-256 remains identical to WordPress reference.
- Related articles limited to three to keep the growing collection manageable.

Evidence: evidence/six-papers/browser-checks.json and desktop/mobile screenshots.
Production server remains local on port 3000. No code pushed or deployment made.
