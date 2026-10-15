import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from '../i18n/config';

/**
 * Páginas del sitio y su URL en cada idioma: español sin prefijo (las URLs de
 * siempre) e inglés bajo /en con slugs traducidos. Es la fuente única para el
 * router (App.tsx), los enlaces (LocalizedLink), el selector de idioma, el SEO
 * y las páginas que el build prerenderiza.
 */
export const PAGES = [
  { id: 'home', paths: { es: '/', en: '/en' } },
  { id: 'services', paths: { es: '/servicios', en: '/en/services' } },
  { id: 'cases', paths: { es: '/casos', en: '/en/cases' } },
  { id: 'caseFaro', paths: { es: '/casos/faro', en: '/en/cases/faro' } },
  {
    id: 'caseHosting',
    paths: {
      es: '/casos/autodiagnostico-emprendedores',
      en: '/en/cases/entrepreneur-self-assessment',
    },
  },
  { id: 'how', paths: { es: '/como-trabajamos', en: '/en/how-we-work' } },
  { id: 'about', paths: { es: '/nosotros', en: '/en/about' } },
  { id: 'contact', paths: { es: '/contacto', en: '/en/contact' } },
  { id: 'apply', paths: { es: '/aplicar', en: '/en/apply' } },
  { id: 'glossary', paths: { es: '/glosario', en: '/en/glossary' } },
  // Documentos legales: solo existen en español (falta una traducción revisada).
  // /en/legal/* conserva la navegación en inglés, pero su canonical es la
  // versión en español y no declara hreflang (ver routeSeo).
  { id: 'privacy', paths: { es: '/legal/privacidad', en: '/en/legal/privacy' }, spanishOnly: true },
  { id: 'terms', paths: { es: '/legal/terminos', en: '/en/legal/terms' }, spanishOnly: true },
] as const satisfies readonly {
  id: string;
  paths: Record<Language, string>;
  spanishOnly?: boolean;
}[];

export type Page = (typeof PAGES)[number];
export type PageId = Page['id'];

const EN_PREFIX = '/en';

/** Idioma de una URL: /en y /en/... son inglés; el resto, español. */
export function languageFromPath(pathname: string): Language {
  return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`) ? 'en' : DEFAULT_LANGUAGE;
}

const PAGE_BY_PATH = new Map<string, Page>(
  PAGES.flatMap((page) => LANGUAGES.map((lng) => [page.paths[lng], page] as const)),
);

/** Página de una URL en cualquier idioma (tolera la barra final). */
export function findPage(pathname: string): Page | undefined {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return PAGE_BY_PATH.get(normalized);
}

/**
 * Lleva una ruta interna (de cualquier idioma, con #hash o ?query opcionales)
 * a `lng`. Lo que no es una página conocida se devuelve igual.
 */
export function localizePath(to: string, lng: Language): string {
  const [, path, rest] = /^([^?#]*)(.*)$/.exec(to)!;
  const page = findPage(path);
  return page ? page.paths[lng] + rest : to;
}

/** La misma página en `lng`; para una URL desconocida (404), la home de ese idioma. */
export function alternatePath(pathname: string, lng: Language): string {
  return (findPage(pathname) ?? PAGES[0]).paths[lng];
}
