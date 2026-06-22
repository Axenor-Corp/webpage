import { useEffect } from 'react';

/**
 * SEO por ruta sin dependencias: reescribe en su lugar las etiquetas que ya
 * vienen estáticas en index.html (title, description, canonical, robots y los
 * tags og/twitter dinámicos) al navegar. Pensado para una SPA pura: los
 * crawlers que ejecutan JS (Googlebot) y la pestaña del navegador ven el meta
 * correcto de cada ruta; los que no ejecutan JS conservan el baseline de
 * index.html. La fidelidad por-ruta total exigiría prerender (fase 2).
 */

const SITE = 'https://web.axenorcorporations.com';

export interface SeoInput {
  /** Título completo de la pestaña (ya con sufijo de marca si aplica). */
  title: string;
  description: string;
  /** Ruta canónica, empezando por '/'. */
  path: string;
  /** og:locale, p. ej. 'es_CO' | 'en_US'. */
  ogLocale: string;
  /** 404 y similares: no indexar. */
  noindex?: boolean;
}

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useSeo({ title, description, path, ogLocale, noindex = false }: SeoInput): void {
  useEffect(() => {
    const url = SITE + path;

    document.title = title;
    upsertMeta('meta[name="description"]', 'name', 'description', description);
    upsertLink('canonical', url);
    upsertMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, follow' : 'index, follow');

    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', url);
    upsertMeta('meta[property="og:locale"]', 'property', 'og:locale', ogLocale);
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  }, [title, description, path, ogLocale, noindex]);
}
