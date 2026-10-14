import type { ReactNode } from 'react';

interface BrowserFrameProps {
  /** texto de la barra de direcciones (sin URL real: el sitio en vivo menciona al cliente) */
  label: string;
  children: ReactNode;
  className?: string;
}

/** Marco de navegador ligero para mostrar capturas de producto. */
export default function BrowserFrame({ label, children, className = '' }: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-carbon/10 bg-white shadow-2xl shadow-carbon/25 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-carbon/10 bg-surface px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-carbon/15" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-carbon/15" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/70" aria-hidden="true" />
        <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-xs text-carbon-soft/60">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}
