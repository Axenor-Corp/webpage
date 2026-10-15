/**
 * Metadatos SEO por ruta. Fuente única para dos consumidores:
 * - RouteSeo (cliente): reescribe el <head> al navegar.
 * - scripts/prerender.mjs (build): escribe el <head> de cada HTML prerenderizado.
 */
import type { Language } from '../i18n/config';
import { findPage, type PageId } from './routes';

export const SITE = 'https://web.axenorcorporations.com';

const BRAND = 'Axenor Corporation S.A.S';

const OG_LOCALES: Record<Language, string> = { es: 'es_CO', en: 'en_US' };

export interface SeoInput {
  /** Título completo de la pestaña (ya con sufijo de marca si aplica). */
  title: string;
  description: string;
  /** Ruta canónica, empezando por '/'. */
  path: string;
  lang: Language;
  /** URL de la misma página en cada idioma (hreflang). Ausente en el 404 y en las páginas solo en español. */
  alternates?: Record<Language, string>;
  /** 404 y similares: no indexar. */
  noindex?: boolean;
}

/**
 * Página -> namespace i18n. `key` es el prefijo cuando un namespace agrupa
 * varios documentos (p. ej. legal: privacidad/terminos). `bare` omite el
 * sufijo de marca en el título (la home ya lo lleva en su propio título).
 */
interface PageMeta {
  ns: string;
  key?: string;
  bare?: boolean;
}

const META: Record<PageId, PageMeta> = {
  home: { ns: 'home', bare: true },
  services: { ns: 'services' },
  how: { ns: 'how' },
  about: { ns: 'about' },
  contact: { ns: 'contact' },
  apply: { ns: 'apply' },
  glossary: { ns: 'glossary' },
  privacy: { ns: 'legal', key: 'privacidad' },
  terms: { ns: 'legal', key: 'terminos' },
  cases: { ns: 'cases' },
  caseFaro: { ns: 'faro', key: 'case' },
  caseHosting: { ns: 'hosting' },
};

export function ogLocale(lng: Language): string {
  return OG_LOCALES[lng];
}

/** Namespace i18n con los textos SEO de la ruta (404: 'common'). */
export function routeNamespace(pathname: string): string {
  const page = findPage(pathname);
  return page ? META[page.id].ns : 'common';
}

/** `t` ya ligado al namespace de `routeNamespace(pathname)` y al idioma `lang`. */
export function routeSeo(pathname: string, t: (key: string) => string, lang: Language): SeoInput {
  const page = findPage(pathname);

  if (!page) {
    // Ruta desconocida (404): título genérico y noindex.
    return {
      title: `${t('notFound.title')} · ${BRAND}`,
      description: t('notFound.text'),
      path: pathname,
      lang,
      noindex: true,
    };
  }

  const meta = META[page.id];
  const prefix = meta.key ? `${meta.key}.` : '';
  const rawTitle = t(`${prefix}meta.title`);
  return {
    title: meta.bare ? rawTitle : `${rawTitle} · ${BRAND}`,
    description: t(`${prefix}meta.description`),
    path: page.paths[lang],
    lang,
    alternates: page.paths,
  };
}
