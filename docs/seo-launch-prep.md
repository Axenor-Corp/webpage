# SEO & launch-prep — porting the production SEO layer onto the new SPA

**Status:** approved (2026-06-22) · **Branch:** `feat/seo-launch-prep`

## Context

`Axenor-Corp/webpage` is the new design (React 19 + Vite + Tailwind v4 SPA, 3D
node-network background, i18next client-side language detection). It replaces the
previous production site (`Nicoomega/Pagina-axenor`, Astro static site at
`web.axenorcorporations.com`). Vercel will be repointed to this repo.

The old Astro site carried a substantial SEO/GEO layer that this SPA does not yet
have. This spec ports that layer onto the new design without changing its
architecture (no prerender/SSG for now — that is an optional phase 2).

## Decisions

1. **Deploy:** keep this repo as the source; Vercel is repointed here (user action).
2. **Backend:** new Supabase project `udqohsvuegpskdmktamb` (table `applications`).
   Migration + env vars are applied by the user; the frontend already reads
   `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.
3. **SEO:** Approach C — strong **static** `<head>` baseline in `index.html` plus
   **per-route** metadata updated client-side. No full prerender.
4. **Analytics:** re-add Vercel Analytics + Speed Insights.

## Approach C — how SEO works here

- **Universal baseline (non-JS crawlers & social scrapers):** `index.html` ships a
  complete `<head>` — canonical, full Open Graph + Twitter, theme-color, manifest,
  apple-touch-icon, and a static JSON-LD `@graph` (Organization + WebSite). Every
  route falls back to this when JS is not executed. *Known limit of any SPA: social
  scrapers that don't run JS see the homepage card on every route. Full per-route
  OG would require prerender (phase 2).*
- **Per-route metadata (JS crawlers + browser):** a tiny `useSeo` hook
  (no dependency — React 19 + imperative head updates) rewrites `<title>`,
  `meta[name=description]`, `link[rel=canonical]`, and the `og:`/`twitter:` tags in
  place on navigation. Centralised in `RouteSeo` (rendered in `Layout`), driven by a
  `path → namespace` map. Glossary injects a `DefinedTermSet` JSON-LD.
- **Explicit signals (static files in `public/`):** `robots.txt` (welcomes AI
  crawlers), `sitemap.xml`, `llms.txt` + `llms-full.txt` (GEO brief, bilingual),
  `manifest.webmanifest`, `og.png`, `apple-touch-icon.png`.

## New content routes (ported from production)

- `/glosario` — `Glossary` page; 20 bilingual answer-first definitions (i18n
  `glossary` namespace). Indexable content surface for "qué es X / what is X".
- `/legal/privacidad`, `/legal/terminos` — `Legal` page (i18n `legal` namespace).

## Files

- **public/**: `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`,
  `manifest.webmanifest`, `og.png`, `apple-touch-icon.png`.
- **index.html**: enriched `<head>` + static JSON-LD.
- **src/hooks/useSeo.ts** (new), **src/components/seo/RouteSeo.tsx** (new),
  remove per-page `usePageTitle`, delete `src/hooks/usePageTitle.ts`.
- **src/pages/**: `Glossary.tsx`, `Legal.tsx` (new).
- **src/i18n/locales/{es,en}/**: add `meta.description` to each page namespace;
  new `glossary.json`, `legal.json`; stronger home title.
- **src/App.tsx** (routes), **src/components/ui/Footer.tsx** (legal/glossary links),
  **src/components/layout/Layout.tsx** (Analytics + SpeedInsights + RouteSeo).
- **vercel.json**: extend CSP for Vercel Analytics hosts.
- **package.json**: `@vercel/analytics`, `@vercel/speed-insights`.

## Bilingual SEO note

Production had distinct `/es/` + `/en/` indexable URLs with `hreflang`. The new
design uses a single URL set with client-side language detection, so per-locale
indexable URLs do not carry over. Canonical + `x-default` is the honest baseline;
restructuring to per-locale routes is a possible follow-up.

## Out of scope (handed to the user)

- Apply the Supabase migration to project `udqohsvuegpskdmktamb`; set Vercel env vars.
- Repoint the Vercel project / domain to `Axenor-Corp/webpage`.
- (Optional phase 2) prerender for full per-route crawler/scraper fidelity.
