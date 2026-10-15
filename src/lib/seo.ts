/**
 * Metadatos SEO por ruta. Fuente única para dos consumidores:
 * - RouteSeo (cliente): reescribe el <head> al navegar.
 * - scripts/prerender.mjs (build): escribe el <head> de cada HTML prerenderizado.
 */

export const SITE = 'https://web.axenorcorporations.com';

const BRAND = 'Axenor Corporation S.A.S';

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

/**
 * Ruta -> namespace i18n. `key` es el prefijo cuando un namespace agrupa varios
 * documentos (p. ej. legal: privacidad/terminos). `bare` omite el sufijo de
 * marca en el título (la home ya lo lleva en su propio título).
 */
interface RouteMeta {
  ns: string;
  key?: string;
  bare?: boolean;
}

/**
 * Rutas indexables. También es la lista de páginas que el build prerenderiza:
 * una ruta nueva en App.tsx debe agregarse aquí, o en producción caerá en
 * 404.html.
 */
export const ROUTES: Record<string, RouteMeta> = {
  '/': { ns: 'home', bare: true },
  '/servicios': { ns: 'services' },
  '/como-trabajamos': { ns: 'how' },
  '/nosotros': { ns: 'about' },
  '/contacto': { ns: 'contact' },
  '/aplicar': { ns: 'apply' },
  '/glosario': { ns: 'glossary' },
  '/legal/privacidad': { ns: 'legal', key: 'privacidad' },
  '/legal/terminos': { ns: 'legal', key: 'terminos' },
  '/casos': { ns: 'cases' },
  '/casos/faro': { ns: 'faro', key: 'case' },
  '/casos/autodiagnostico-emprendedores': { ns: 'hosting' },
};

/** Namespace i18n con los textos SEO de la ruta (404: 'common'). */
export function routeNamespace(pathname: string): string {
  return ROUTES[pathname]?.ns ?? 'common';
}

/** `t` ya ligado al namespace de `routeNamespace(pathname)`. */
export function routeSeo(
  pathname: string,
  t: (key: string) => string,
  language: string | undefined,
): SeoInput {
  const matched = ROUTES[pathname];
  const ogLocale = language === 'en' ? 'en_US' : 'es_CO';

  if (!matched) {
    // Ruta desconocida (404): título genérico y noindex.
    return {
      title: `${t('notFound.title')} · ${BRAND}`,
      description: t('notFound.text'),
      path: pathname,
      ogLocale,
      noindex: true,
    };
  }

  const prefix = matched.key ? `${matched.key}.` : '';
  const rawTitle = t(`${prefix}meta.title`);
  return {
    title: matched.bare ? rawTitle : `${rawTitle} · ${BRAND}`,
    description: t(`${prefix}meta.description`),
    path: pathname,
    ogLocale,
  };
}
