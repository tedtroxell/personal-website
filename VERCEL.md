# Vercel version

This repository now includes a Next.js App Router version of Ted Troxell’s site, written in TypeScript and TSX. The WordPress theme source is still here; Vercel should use the Next.js app at the repository root.

## Run locally

Use Node.js 20.9 or newer (Node 22 is selected in `.nvmrc`):

```sh
npm install
npm run dev
```

Open `http://localhost:3000`. The existing WordPress preview can continue to run separately on port 8091.

## Build check

```sh
npm run typecheck
npm run build
npm run start
```

## Deploy on Vercel

Import the repository into Vercel and keep the framework preset set to **Next.js**. The root directory is the repository root. Vercel detects the build and output settings from `package.json` and `next.config.ts`; no additional environment variables are needed for the current site.

The WordPress layouts, SVGs and rendered article content are preserved as editable TSX in `components/reference/`. The editorial HTML sources remain in `docs/content/`; update the TSX components to change the live pages. Original drawing, lab and article controllers and images live under `public/assets/`. Include those files in the repository so Vercel can build the same pages. Navigation uses normal page links to give each document the same initialization and history behavior as WordPress. The contact form and animated dialog use the original WordPress interaction. Local preview submissions are saved to `.local/leads.jsonl` (ignored by Git). For Vercel, set `CONTACT_WEBHOOK_URL` to your durable enquiry receiver and optionally `CONTACT_WEBHOOK_TOKEN` for a bearer token. The receiver gets JSON with `name`, `email`, `intent`, `message`, and `request_id`, and must return a successful HTTP status only after accepting the message. Retries include the same `Idempotency-Key`; the receiver must deduplicate by that key. Without this configuration, the production form reports that it is unavailable and offers email.

No files are uploaded as part of local development. A Vercel deployment will, by design, transfer the project source and assets to Vercel when you choose to deploy it.


## Interactive field notes

Three new articles are defined in `lib/articles/field-notes.ts` and rendered by `components/articles/InteractiveArticle.tsx`. Their pure models live in `lib/articles/models.ts`; `npm run test:models` checks capacity, accounting, uncertainty and routing behavior (Node 22+). Article styles are scoped in `app/field-notes.css`, so the original homepage drawing controller remains unchanged.

The archive, homepage writing list and latest-article notice read `lib/article-index.ts`. Add article metadata there for discovery. `published: false` keeps a directly accessible local draft out of those lists. Editorial content is authored locally; there is no hosted CMS dependency.

Illustrations are generated locally with `python3 scripts/build-article-art.py`. SVGs stay crisp on the website. If `rsvg-convert` and ImageMagick are installed, the script also exports the included 1200×630 PNG link previews. Vercel serves the prepared assets and does not need those tools.
