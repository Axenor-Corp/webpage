/**
 * Formato del cuerpo de los artículos de /insights (namespace insight-<id>) y
 * utilidades compartidas por el índice y la página de artículo.
 *
 * El texto admite dos marcas en línea: [texto](/ruta) para enlaces (internos
 * en español, LocalizedLink los lleva al idioma de la página) y **texto** para
 * negrita. Nada de HTML: se renderiza como nodos de React.
 */
import type { Language } from '../i18n/config';

/** Párrafo (texto), lista de viñetas o tabla comparativa. */
export type ArticleBlock =
  | string
  | { list: string[] }
  | { table: { caption: string; head: string[]; rows: string[][] } };

export interface ArticleSection {
  /** Ancla de la sección (#id), estable entre versiones. */
  id: string;
  title: string;
  blocks: ArticleBlock[];
}

export interface ArticleFaq {
  title: string;
  items: { q: string; a: string }[];
}

/** [texto](href) | **negrita** */
export const INLINE_MARKUP = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

/** El texto sin marcas, para JSON-LD y conteo de palabras (una negrita puede contener un enlace). */
export function plainText(text: string): string {
  return text.replace(INLINE_MARKUP, (_, label: string | undefined, _href, bold: string | undefined) =>
    label ?? plainText(bold ?? ''),
  );
}

function blockText(block: ArticleBlock): string[] {
  if (typeof block === 'string') return [block];
  if ('list' in block) return block.list;
  return [block.table.caption, ...block.table.head, ...block.table.rows.flat()];
}

/** Minutos de lectura a 200 palabras por minuto (mínimo 1). */
export function readingMinutes(lead: string, sections: ArticleSection[], faq: ArticleFaq): number {
  const texts = [
    lead,
    ...sections.flatMap((section) => [section.title, ...section.blocks.flatMap(blockText)]),
    ...faq.items.flatMap(({ q, a }) => [q, a]),
  ];
  const words = texts.reduce((total, text) => total + plainText(text).split(/\s+/).filter(Boolean).length, 0);
  return Math.max(1, Math.round(words / 200));
}

/**
 * Fecha ISO (AAAA-MM-DD) en formato largo del idioma: «15 de octubre de 2026»
 * / «October 15, 2026». En UTC para que el prerender y el navegador coincidan.
 */
export function formatDate(iso: string, lng: Language): string {
  return new Intl.DateTimeFormat(lng === 'en' ? 'en-US' : 'es-CO', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`));
}
