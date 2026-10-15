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
  `meta[name=description]`, `link[rel=canonical]`, and the `og:`/`twitter:` tags in
  place on navigation. Centralised in `RouteSeo` (rendered in `Layout`), driven by a
  `path → namespace` map. Glossary injects a `DefinedTermSet` JSON-LD.
- **Explicit signals (static files in `public/`):** `robots.txt` (welcomes AI
  crawlers, blocks `/api/`), `sitemap.xml`, `llms.txt` + `llms-full.txt` (GEO brief,
  bilingual), `manifest.webmanifest`, `og.png`, `apple-touch-icon.png`.

## Prerender (SSG)

`npm run build` runs, after the client build:

1. `vite build --ssr src/entry-server.tsx --outDir dist-ssr`: the same app tree
   (`src/Root.tsx`) behind a `StaticRouter`, with the locales bundled so i18n
   never suspends.
2. `node scripts/prerender.mjs`: for each route in `ROUTES` (`src/lib/seo.ts`)
   renders the app with `react-dom/static` `prerender` (waits for the lazy
   routes) and writes `dist/<route>.html` from `dist/index.html`, with its own
   `<title>`, description, canonical, robots, `og:*` and `twitter:*` and the
   markup inside `#root`. It also writes `dist/404.html` (noindex), fails if a
   sitemap URL has no route, and deletes `dist-ssr/`.

Cloudflare Pages serves `/servicios` from `servicios.html`, `/casos/faro` from
`casos/faro.html`, and `404.html` (status 404) for anything else, so
`public/_redirects` no longer has an SPA fallback. `/api/*` (Pages Functions)
resolves before static assets.

On the client, `src/main.tsx` hydrates (`hydrateRoot`) when `#root` has
prerendered markup and falls back to `createRoot` in dev. Rules that keep
hydration clean:

- The HTML is generated in Spanish (`DEFAULT_LANGUAGE`). i18n starts in that
  language and the visitor's preferred one (saved choice, else browser) is
  applied right after hydration by `PreferredLanguage` (in `Layout`).
- Browser-only pieces render after hydration: the 3D scene (`useIsClient`), the
  cookie banner (already gated on mount).
- A new indexable route goes in both `App.tsx` and `ROUTES`; otherwise it is
  served as `404.html` in production.

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
design uses a single URL set with client-side language detection, so only the
Spanish version is indexable (it is the prerendered one).

Next step (not implemented): `/en/...` routes. With the prerender in place it
needs an `en` prefix in the router, locale-aware links across the components,
a language switcher that navigates between equivalent URLs instead of only
changing i18n, rendering each `/en/...` route with the `en` resources, and
`hreflang` es / en / x-default in each page and in `sitemap.xml`.

## Out of scope / handed to the user

- Cloudflare Pages env vars/secrets (Resend) — see README §7 and §10.
- Point the domain (`axenorcorporations.com` / `web.`) to the Cloudflare Pages project.
- `/en/...` indexable routes with `hreflang` (see Bilingual SEO note).
