# WordPress parity

Use the local WordPress site on port 8091 as the visual and behavior reference. Work in the migrated project at `/Users/TedT/tmp/personal-website`. Keep all work local.

- Replace simplified drawings and content markup with TSX converted from the rendered WordPress pages. Preserve viewBoxes, paths, dimensions, classes and animation attributes.
- Preserve the original CSS cascade, including WordPress core layout rules and the article styles.
- Use the original scroll controller and lab models. Preserve desktop/mobile breakpoints, phase ranges, horizontal fills, fades, step highlights and reverse scrolling.
- Preserve header navigation, the inline contact form, shared form modal, focus restoration, dismissal and draft preservation.
- Preserve the archive filtering and keyboard shortcuts, article chart interactions, and mold-fill keyboard/slider/stage controls.
- Compare scene positions and heights at matched desktop/mobile viewports. Compare actual DOM animation states after native scrolling in both directions. Check visual screenshots, controls, console errors, TypeScript and the production build.
- Document the Vercel contact receiver configuration. Local submissions stay in the ignored local lead file; do not send test messages to external services.
