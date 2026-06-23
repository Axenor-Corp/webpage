import { Link } from 'react-router-dom';

// Símbolo oficial de AXENOR: la "A" geométrica naranja (manual de marca v1.0).
// Es el ÚNICO símbolo de la marca. Prohibido rotar, recolorear, deformar, dar
// sombra o rehacer la geometría. viewBox 0 0 64 64.
const A_PATH = 'M32 13 L51 51 H42.5 L32 29.5 L21.5 51 H13 Z';
const BRAND_ORANGE = '#F27429';

export function BrandMark({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={A_PATH} fill={BRAND_ORANGE} />
    </svg>
  );
}

interface LogoProps {
  /** Si se pasa, el logo es un enlace. Omitir fuera del Router (p. ej. el loader). */
  to?: string;
  /** Alto del símbolo "A" en px. */
  size?: number;
  /** Fondo oscuro (carbón) -> wordmark blanco; claro -> carbón. */
  onDark?: boolean;
  /** Clase de tamaño del wordmark (Tailwind), p. ej. "text-lg". */
  wordmarkClass?: string;
  className?: string;
}

/**
 * Lockup oficial: símbolo "A" + wordmark AXENOR con su punto naranja.
 * Wordmark en mayúsculas, peso 700, tracking 0.3em (manual de marca).
 */
export default function Logo({
  to,
  size = 22,
  onDark = true,
  wordmarkClass = 'text-lg',
  className = '',
}: LogoProps) {
  const inner = (
    <>
      <BrandMark size={size} />
      <span
        className={`font-bold uppercase tracking-[0.3em] ${
          onDark ? 'text-white' : 'text-carbon'
        } ${wordmarkClass}`}
      >
        AXENOR<span className="text-accent">.</span>
      </span>
    </>
  );

  const classes = `inline-flex items-center gap-2.5 ${className}`;

  return to ? (
    <Link to={to} className={classes} aria-label="AXENOR Inicio">
      {inner}
    </Link>
  ) : (
    <span className={classes}>{inner}</span>
  );
}
