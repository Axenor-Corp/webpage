import { useId, type ReactNode } from 'react';
import { Link } from '../ui/LocalizedLink';
import { INLINE_MARKUP, type ArticleBlock } from '../../lib/insights';

const LINK_CLASS =
  'font-medium text-accent-text underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent';

/** Texto con [enlaces](/ruta) y **negritas** (src/lib/insights.ts). */
export function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE_MARKUP)) {
    const [whole, label, href, bold] = match;
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (bold !== undefined) {
      parts.push(
        <strong key={match.index} className="font-semibold text-carbon">
          <Inline text={bold} />
        </strong>,
      );
    } else if (href.startsWith('/') || href.startsWith('#')) {
      parts.push(
        <Link key={match.index} to={href} className={LINK_CLASS}>
          {label}
        </Link>,
      );
    } else {
      parts.push(
        <a key={match.index} href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          {label}
        </a>,
      );
    }
    last = match.index + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

const TEXT_CLASS = 'text-lg leading-relaxed text-carbon-soft/85';

/** Un bloque del cuerpo: párrafo, lista o tabla comparativa. */
export function ArticleBlockView({ block }: { block: ArticleBlock }) {
  if (typeof block === 'string') {
    return (
      <p className={TEXT_CLASS}>
        <Inline text={block} />
      </p>
    );
  }

  if ('list' in block) {
    return (
      <ul className="space-y-3">
        {block.list.map((item) => (
          <li key={item} className={`flex gap-4 ${TEXT_CLASS}`}>
            <span className="mt-2.5 h-2 w-2 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
            <span>
              <Inline text={item} />
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return <ComparisonTable {...block.table} />;
}

interface ComparisonTableProps {
  caption: string;
  head: string[];
  rows: string[][];
}

/**
 * Tabla comparativa; la última columna (la opción de Axenor) va resaltada. En
 * el celular se desplaza dentro de su caja, no la página, con la primera
 * columna fija; el título queda fuera de la caja para que no se desplace con
 * ella. La caja es enfocable para desplazarla con el teclado.
 */
function ComparisonTable({ caption, head, rows }: ComparisonTableProps) {
  const captionId = useId();
  const last = head.length - 1;
  return (
    <figure>
      <figcaption id={captionId} className="mb-3 text-sm text-carbon-soft/65">
        {caption}
      </figcaption>
      <div className="overflow-x-auto" role="region" aria-labelledby={captionId} tabIndex={0}>
        <table
          aria-labelledby={captionId}
          className="w-full min-w-[600px] border-collapse text-left text-[0.95rem] leading-snug"
        >
          <thead>
            <tr>
              {head.map((cell, index) => (
                <th
                  key={cell || index}
                  scope="col"
                  className={`px-4 py-3 font-semibold ${
                    index === last ? 'bg-accent-text text-white' : 'bg-carbon text-white'
                  } ${index === 0 ? 'sticky left-0 z-10 rounded-tl-lg' : ''} ${index === last ? 'rounded-tr-lg' : ''}`}
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-b border-carbon/10">
                {row.map((cell, index) =>
                  index === 0 ? (
                    <th
                      key={index}
                      scope="row"
                      className="sticky left-0 z-10 bg-surface px-4 py-3 align-top font-semibold text-carbon"
                    >
                      {cell}
                    </th>
                  ) : (
                    <td
                      key={index}
                      className={`px-4 py-3 align-top ${
                        index === last ? 'bg-accent/5 font-medium text-carbon' : 'text-carbon-soft/85'
                      }`}
                    >
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
