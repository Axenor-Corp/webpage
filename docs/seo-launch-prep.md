# SEO & launch-prep — production SEO layer on the SPA

**Status:** implemented · originally branch `feat/seo-launch-prep`

## Context

`Axenor-Corp/webpage` is the new design (React 19 + Vite + Tailwind v4 SPA, 3D
node-network background, i18next client-side language detection). It replaces the
previous production site (Astro static at `web.axenorcorporations.com`).

This doc describes the SEO/GEO layer ported onto the new design without changing
its architecture (no prerender/SSG for now — optional phase 2).

## Decisions

1. **Deploy:** **Cloudflare Pages** (frontend estático + Pages Functions). See the
   root `README.md` (§9) for config.
2. **Backend:** no database. The apply form posts to the Cloudflare Pages Function
   `functions/api/apply.ts`, which sends the email via **Resend**. Secrets are
   server-side (`RESEND_API_KEY`, etc.), never in the client.
3. **SEO:** Approach C — strong **static** `<head>` baseline in `index.html` plus
   **per-route** metadata updated client-side. No full prerender.
4. **Analytics:** none bundled. (If wanted later, use **Cloudflare Web Analytics** —
   a privacy-friendly script, no Vercel.)

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
  crawlers, blocks `/api/`), `sitemap.xml`, `llms.txt` + `llms-full.txt` (GEO brief,
  bilingual), `manifest.webmanifest`, `og.png`, `apple-touch-icon.png`.

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

## Bilingual SEO note

Production had distinct `/es/` + `/en/` indexable URLs with `hreflang`. The new
design uses a single URL set with client-side language detection, so per-locale
indexable URLs do not carry over. Canonical + `x-default` is the honest baseline;
restructuring to per-locale routes is a possible follow-up.

## Out of scope / handed to the user

- Cloudflare Pages env vars/secrets (Resend) — see README §7 and §10.
- Point the domain (`axenorcorporations.com` / `web.`) to the Cloudflare Pages project.
- (Optional phase 2) prerender for full per-route crawler/scraper fidelity.
