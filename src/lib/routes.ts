import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from '../i18n/config';

/**
 * Páginas del sitio y su URL en cada idioma: español sin prefijo (las URLs de
 * siempre) e inglés bajo /en con slugs traducidos. Es la fuente única para el
 * router (App.tsx), los enlaces (LocalizedLink), el selector de idioma, el SEO
 * y las páginas que el build prerenderiza.
 */
const SITE_PAGES = [
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
  { id: 'privacy', paths: { es: '/legal/privacidad', en: '/en/legal/privacy' } },
  { id: 'terms', paths: { es: '/legal/terminos', en: '/en/legal/terms' } },
  { id: 'insights', paths: { es: '/insights', en: '/en/insights' } },
] as const satisfies readonly {
  id: string;
  paths: Record<Language, string>;
}[];

/**
 * Artículos de /insights, del más reciente al más antiguo. `id` es la clave
 * del artículo en insights.json (título, descripción y tarjeta del índice) y
 * el sufijo de su namespace propio, `insight-<id>` (el cuerpo). Cada artículo
 * se publica en los dos idiomas con un slug propio en cada uno; las fechas van
 * en ISO (AAAA-MM-DD) y alimentan el JSON-LD Article.
 *
 * Artículo nuevo: entrada aquí, `articles.<id>` en insights.json (es/en), los
 * dos insight-<id>.json y sus URL en public/sitemap.xml y llms*.txt.
 */
export const ARTICLES = [
  {
    id: 'fde',
    slugs: {
      es: 'que-es-forward-deployed-engineering',
      en: 'what-is-forward-deployed-engineering',
    },
    published: '2026-10-15',
    modified: '2026-10-15',
  },
] as const satisfies readonly {
  id: string;
  slugs: Record<Language, string>;
  published: string;
  modified: string;
}[];

export type Article = (typeof ARTICLES)[number];

/** URL de un artículo en `lng`: /insights/<slug> o /en/insights/<slug>. */
export function articlePath(article: Article, lng: Language): string {
  return `${lng === 'en' ? '/en' : ''}/insights/${article.slugs[lng]}`;
}

const ARTICLE_PAGES = ARTICLES.map((article) => ({
  id: 'article' as const,
  article,
  paths: { es: articlePath(article, 'es'), en: articlePath(article, 'en') },
}));

export type ArticlePage = (typeof ARTICLE_PAGES)[number];
export type Page = (typeof SITE_PAGES)[number] | ArticlePage;
export type PageId = Page['id'];

/** Todas las páginas: las del sitio y un artículo por entrada de ARTICLES. */
export const PAGES: readonly Page[] = [...SITE_PAGES, ...ARTICLE_PAGES];

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

/** Artículo de una URL de /insights/<slug> (en cualquier idioma). */
export function findArticle(pathname: string): Article | undefined {
  const page = findPage(pathname);
  return page?.id === 'article' ? page.article : undefined;
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
