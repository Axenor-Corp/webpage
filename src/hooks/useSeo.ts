import { useEffect } from 'react';
import { SITE, ogLocale, type SeoInput } from '../lib/seo';

/**
 * SEO por ruta sin dependencias: reescribe en su lugar las etiquetas del <head>
 * (title, description, canonical, hreflang, robots y los tags og/twitter
 * dinámicos) al navegar en el cliente. La carga inicial ya llega con el <head> correcto: el
 * build prerenderiza cada ruta con los mismos datos (scripts/prerender.mjs).
 */

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(selector: string, attrs: Record<string, string> | null) {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!attrs) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    document.head.appendChild(el);
  }
  for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value);
}

export function useSeo({ title, description, path, lang, alternates, noindex = false }: SeoInput): void {
  const esPath = alternates?.es;
  const enPath = alternates?.en;

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const url = SITE + path;
    const other = lang === 'es' ? 'en' : 'es';

    document.title = title;
    upsertMeta('meta[name="description"]', 'name', 'description', description);
    upsertMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    // 404: sin canonical ni alternates (igual que el 404.html prerenderizado).
    setLink('link[rel="canonical"]', noindex ? null : { rel: 'canonical', href: url });
    const hreflang: [string, string | undefined][] = [
      ['es', esPath],
      ['en', enPath],
      ['x-default', esPath],
    ];
    for (const [code, target] of hreflang) {
      setLink(
        `link[rel="alternate"][hreflang="${code}"]`,
        target ? { rel: 'alternate', hreflang: code, href: SITE + target } : null,
      );
    }

    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', url);
    upsertMeta('meta[property="og:locale"]', 'property', 'og:locale', ogLocale(lang));
    upsertMeta('meta[property="og:locale:alternate"]', 'property', 'og:locale:alternate', ogLocale(other));
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  }, [title, description, path, lang, esPath, enPath, noindex]);
}
