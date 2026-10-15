# SEO & launch-prep — production SEO layer on the SPA

**Status:** implemented · originally branch `feat/seo-launch-prep`

## Context

`Axenor-Corp/webpage` is the new design (React 19 + Vite + Tailwind v4 SPA, 3D
node-network background, i18next client-side language detection). It replaces the
previous production site (Astro static at `web.axenorcorporations.com`).

This doc describes the SEO/GEO layer ported onto the new design. Phase 2
(prerender/SSG at build time) is implemented: see "Prerender (SSG)" below.

## Decisions

1. **Deploy:** **Cloudflare Pages** (frontend estático + Pages Functions). See the
   root `README.md` (§9) for config.
2. **Backend:** no database. The apply form posts to the Cloudflare Pages Function
   `functions/api/apply.ts`, which sends the email via **Resend**. Secrets are
   server-side (`RESEND_API_KEY`, etc.), never in the client.
3. **SEO:** Approach C (static `<head>` baseline in `index.html` plus per-route
   metadata updated client-side), now backed by a build-time **prerender**: every
   route ships its own HTML with its own `<head>` and rendered content.
4. **Analytics:** none bundled. (If wanted later, use **Cloudflare Web Analytics** —
   a privacy-friendly script, no Vercel.)

## Approach C — how SEO works here

- **Template `<head>`:** `index.html` ships a complete `<head>` (canonical, full
  Open Graph + Twitter, theme-color, manifest, apple-touch-icon, and a static
  JSON-LD `@graph` with Organization + WebSite). The prerender uses it as the
  template and rewrites the per-route tags.
- **Per-route metadata (JS crawlers + browser):** a tiny `useSeo` hook
  (no dependency — React 19 + imperative head updates) rewrites `<title>`,
  `meta[name=description]`, `link[rel=canonical]`, the `hreflang` alternates and the
  `og:`/`twitter:` tags in place on navigation. Centralised in `RouteSeo` (rendered
  in `Layout`), driven by `src/lib/seo.ts`. Glossary injects a `DefinedTermSet`
  JSON-LD.
- **Explicit signals (static files in `public/`):** `robots.txt` (welcomes AI
  crawlers, blocks `/api/`), `sitemap.xml`, `llms.txt` + `llms-full.txt` (GEO brief,
  bilingual), `manifest.webmanifest`, `og.png`, `apple-touch-icon.png`.

## Prerender (SSG)

`npm run build` runs, after the client build:

1. `vite build --ssr src/entry-server.tsx --outDir dist-ssr`: the same app tree
   (`src/Root.tsx`) behind a `StaticRouter`, with the locales bundled so i18n
   never suspends.
2. `node scripts/prerender.mjs`: for each page in each language
   (`PAGES` in `src/lib/routes.ts`) renders the app with `react-dom/static`
   `prerender` (waits for the lazy routes) and writes `dist/<url>.html` from
   `dist/index.html`, with its own `lang`, `<title>`, description, canonical,
   `hreflang`, robots, `og:*` and `twitter:*` and the markup inside `#root`. It
   also writes `dist/404.html` and `dist/en/404.html` (noindex), fails if a
   sitemap URL has no page, and deletes `dist-ssr/`.

Cloudflare Pages serves `/servicios` from `servicios.html`, `/en/services` from
`en/services.html`, `/en` from `en.html`, and the nearest `404.html` (status
404) for anything else (`en/404.html` under `/en/`), so `public/_redirects` no
longer has an SPA fallback. `/api/*` (Pages Functions) resolves before static
assets.

On the client, `src/main.tsx` hydrates (`hydrateRoot`) when `#root` has
prerendered markup and falls back to `createRoot` in dev. Rules that keep
hydration clean:

- The URL decides the language (`/en/...` is English), on the server and on
  the client: i18n starts in the URL's language, so the first render matches the
  generated HTML. `LanguageSync` (in `Layout`) follows later navigation.
- Browser-only pieces render after hydration: the 3D scene (`useIsClient`), the
  cookie banner (already gated on mount).
- A new page goes in `PAGES` (both URLs) and `PAGE_COMPONENTS` in `App.tsx`;
  the router, the links, the prerender and the SEO all read from there.

## Content routes (ported from production)

- `/glosario` — `Glossary` page; bilingual answer-first definitions (i18n
  `glossary` namespace). Indexable surface for "qué es X / what is X".
- `/legal/privacidad`, `/legal/terminos` — `Legal` page (i18n `legal` namespace).

## Files

- **public/**: `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`,
  `manifest.webmanifest`, `og.png`, `apple-touch-icon.png`, plus the Cloudflare
  `_headers` / `_redirects`.
- **index.html**: enriched `<head>` + static JSON-LD.
- **src/hooks/useSeo.ts**, **src/components/seo/RouteSeo.tsx** (replace the old
  per-page `usePageTitle`).
- **src/pages/**: `Glossary.tsx`, `Legal.tsx`.
- **src/i18n/locales/{es,en}/**: `meta.description` per page namespace; `glossary.json`,
  `legal.json`.
- **src/App.tsx** (routes), **src/components/ui/Footer.tsx** (legal/glossary links),
  **src/components/layout/Layout.tsx** (RouteSeo).
- **CSP** lives in `public/_headers` (Cloudflare), not `vercel.json`.

## Bilingual URLs

Spanish keeps the URLs it always had; English lives under `/en` with
translated slugs (`/en/services`, `/en/how-we-work`, `/en/cases/faro`, ...).
The table is `PAGES` in `src/lib/routes.ts`.

- Each page declares `hreflang` es, en and x-default (= Spanish) and a
  self-referencing canonical; `sitemap.xml` lists both versions with
  `xhtml:link` alternates.
- Internal links are written with the Spanish path and go through
  `components/ui/LocalizedLink` (`Link` / `NavLink`), which maps them to the
  current page's language. ESLint blocks importing `Link` / `NavLink` straight
  from `react-router-dom`.
- The language switcher links to the same page in the other language. There is
  no automatic redirect by browser language or `Accept-Language`: every URL,
  for crawlers and people alike, serves the language it names.
- The legal documents (`/legal/*`) have an English convenience translation at
  `/en/legal/*` with its own canonical and `hreflang`; the English text states
  that the Spanish version prevails. Have counsel review it.

## Out of scope / handed to the user

- Cloudflare Pages env vars/secrets (Resend) — see README §7 and §10.
- Point the domain (`axenorcorporations.com` / `web.`) to the Cloudflare Pages project.
- Counsel review of the English translation of the legal documents.
