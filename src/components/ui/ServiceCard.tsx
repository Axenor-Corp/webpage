import { useRef } from 'react';
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';

interface ServiceCardProps {
  icon: ReactNode;
  name: string;
  description: string;
  /** la tarjeta entró en viewport (controlado por la grilla padre) */
  visible: boolean;
  /** retardo en ms para la entrada escalonada */
  delay: number;
  /** si se define, la tarjeta completa enlaza a esta ruta */
  to?: string;
  /** texto del enlace inferior (ej. "Ver detalle") */
  cta?: string;
}

const MAX_TILT_X = 8;
const MAX_TILT_Y = 10;

export default function ServiceCard({
  icon,
  name,
  description,
  visible,
  delay,
  to,
  cta,
}: ServiceCardProps) {
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: ReactMouseEvent<HTMLElement>) => {
    const el = innerRef.current;
    if (!el || useAppStore.getState().reducedMotion) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = 'transform 80ms linear';
    el.style.transform = `perspective(900px) rotateX(${(-py * MAX_TILT_X).toFixed(2)}deg) rotateY(${(px * MAX_TILT_Y).toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleLeave = () => {
    const el = innerRef.current;
    if (!el) return;
    el.style.transition = 'transform 400ms ease';
    el.style.transform = '';
  };

  const card = (
    <div
      ref={innerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="flex h-full flex-col rounded-xl bg-carbon p-8 text-white shadow-lg will-change-transform"
    >
      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/15 text-accent">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">{description}</p>
      {cta && (
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          {cta}
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      )}
    </div>
  );

  return (
    <div
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-12 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {to ? (
        <Link to={to} className="block h-full">
          {card}
        </Link>
      ) : (
        card
      )}
    </div>
  );
}
