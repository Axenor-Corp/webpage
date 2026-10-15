/**
 * Prerender (SSG) post-build. Toma dist/index.html (build del cliente) como
 * plantilla y, por cada página en cada idioma (src/lib/routes.ts), escribe un
 * HTML con su propio lang, <title>, description, canonical, hreflang,
 * og/twitter y el contenido ya renderizado dentro de #root, que React hidrata
 * después (src/main.tsx).
 *
 * Salida: / -> index.html, /servicios -> servicios.html, /en/services ->
 * en/services.html (Cloudflare Pages los sirve sin extensión), y 404.html y
 * en/404.html para cualquier otra URL.
 *
 * Lo ejecuta `npm run build` tras compilar src/entry-server.tsx a dist-ssr/.
 * No es repetible sobre el mismo dist/: index.html ya no es plantilla.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const { render, pages, SITE, ogLocale } = await import(
  pathToFileURL(join(ssrDir, 'entry-server.js')).href
);

const template = readFileSync(join(dist, 'index.html'), 'utf8');

const escapeAttr = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/**
 * Reemplaza exactamente una coincidencia; si la plantilla cambió, falla el
 * build. `replacement` es una función para que un `$` del texto no se
 * interprete como patrón de reemplazo.
 */
function replaceOne(html, pattern, replacement, label) {
  const matches = html.match(new RegExp(pattern.source, `${pattern.flags}g`));
  if (matches?.length !== 1) {
    throw new Error(`prerender: se esperaba 1 "${label}" en index.html y hay ${matches?.length ?? 0}`);
  }
  return html.replace(pattern, replacement);
}

/** <meta name|property="key" content="..."> (admite saltos de línea entre atributos). */
function setMeta(html, attr, key, value) {
  const pattern = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`);
  return replaceOne(html, pattern, (_, open, close) => open + escapeAttr(value) + close, `${attr}=${key}`);
}

function removeTag(html, pattern, label) {
  return replaceOne(html, pattern, '', label);
}

function buildPage({ html, seo, lang }) {
  const url = SITE + seo.path;
  let page = template;

  page = replaceOne(page, /<html lang="[^"]*">/, `<html lang="${lang}">`, 'html lang');
  page = replaceOne(page, /<title>[^<]*<\/title>/, () => `<title>${escapeAttr(seo.title)}</title>`, 'title');
  page = setMeta(page, 'name', 'description', seo.description);
  page = setMeta(page, 'name', 'robots', seo.noindex ? 'noindex, follow' : 'index, follow');
  page = setMeta(page, 'property', 'og:title', seo.title);
  page = setMeta(page, 'property', 'og:description', seo.description);
  page = setMeta(page, 'property', 'og:locale', ogLocale(lang));
  page = setMeta(page, 'property', 'og:locale:alternate', ogLocale(lang === 'es' ? 'en' : 'es'));
  page = setMeta(page, 'name', 'twitter:title', seo.title);
  page = setMeta(page, 'name', 'twitter:description', seo.description);

  if (seo.noindex) {
    // 404: sin URL canónica que declarar.
    page = removeTag(page, /\s*<link rel="canonical" href="[^"]*"\s*\/?>/, 'canonical');
    page = removeTag(page, /\s*<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, 'og:url');
  } else {
    // canonical + hreflang de las dos versiones (x-default = español); las
    // páginas solo en español no traen alternates.
    const { alternates } = seo;
    const hreflang = (alternates ? [['es', alternates.es], ['en', alternates.en], ['x-default', alternates.es]] : [])
      .map(([code, path]) => `\n    <link rel="alternate" hreflang="${code}" href="${escapeAttr(SITE + path)}" />`)
      .join('');
    page = replaceOne(
      page,
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      () => `<link rel="canonical" href="${escapeAttr(url)}" />${hreflang}`,
      'canonical',
    );
    page = setMeta(page, 'property', 'og:url', url);
  }

  return replaceOne(page, /<div id="root"><\/div>/, () => `<div id="root">${html}</div>`, 'div#root');
}

// Guarda: toda URL del sitemap (<loc> y alternates xhtml:link) debe tener su
// HTML prerenderizado.
const sitemap = readFileSync(join(root, 'public', 'sitemap.xml'), 'utf8');
const urls = new Set(pages.map((page) => page.url));
const missing = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>|href="([^"]+)"/g)]
  .map(([, loc, href]) => new URL(loc ?? href).pathname)
  .filter((path) => !urls.has(path));
if (missing.length > 0) {
  throw new Error(`prerender: URLs del sitemap sin página en src/lib/routes.ts: ${[...new Set(missing)].join(', ')}`);
}

for (const { url, file } of pages) {
  const result = await render(url);
  if (!result.html.trim()) throw new Error(`prerender: ${url} salió vacío`);
  const target = join(dist, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, buildPage(result));
  console.log(`prerender: ${url.padEnd(40)} -> ${file.padEnd(42)} "${result.seo.title}"`);
}

rmSync(ssrDir, { recursive: true, force: true });
