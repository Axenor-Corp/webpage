/**
 * Prerender (SSG) post-build. Toma dist/index.html (build del cliente) como
 * plantilla y, por cada ruta de src/lib/seo.ts, escribe un HTML con su propio
 * <title>, description, canonical, og/twitter y el contenido ya renderizado
 * dentro de #root, que React hidrata después (src/main.tsx).
 *
 * Salida: / -> index.html, /servicios -> servicios.html, /casos/faro ->
 * casos/faro.html (Cloudflare Pages los sirve sin extensión) y 404.html para
 * cualquier otra URL.
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

const { render, routes, SITE } = await import(
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
  page = setMeta(page, 'property', 'og:locale', seo.ogLocale);
  page = setMeta(page, 'name', 'twitter:title', seo.title);
  page = setMeta(page, 'name', 'twitter:description', seo.description);

  if (seo.noindex) {
    // 404: sin URL canónica que declarar.
    page = removeTag(page, /\s*<link rel="canonical" href="[^"]*"\s*\/?>/, 'canonical');
    page = removeTag(page, /\s*<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, 'og:url');
  } else {
    page = replaceOne(
      page,
      /(<link rel="canonical" href=")[^"]*(")/,
      (_, open, close) => open + escapeAttr(url) + close,
      'canonical',
    );
    page = setMeta(page, 'property', 'og:url', url);
  }

  return replaceOne(page, /<div id="root"><\/div>/, () => `<div id="root">${html}</div>`, 'div#root');
}

function outputFile(route) {
  return route === '/' ? 'index.html' : `${route.slice(1)}.html`;
}

// Guarda: toda URL del sitemap debe tener su HTML prerenderizado.
const sitemap = readFileSync(join(root, 'public', 'sitemap.xml'), 'utf8');
const missing = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(([, loc]) => new URL(loc).pathname)
  .filter((path) => !routes.includes(path));
if (missing.length > 0) {
  throw new Error(`prerender: rutas del sitemap sin entrada en src/lib/seo.ts: ${missing.join(', ')}`);
}

const pages = [...routes.map((route) => [route, outputFile(route)]), ['/404', '404.html']];
for (const [route, file] of pages) {
  const result = await render(route);
  if (!result.html.trim()) throw new Error(`prerender: ${route} salió vacío`);
  const target = join(dist, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, buildPage(result));
  console.log(`prerender: ${route.padEnd(40)} -> ${file}  "${result.seo.title}"`);
}

rmSync(ssrDir, { recursive: true, force: true });
