import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LinkedInIcon from './LinkedInIcon';
import type { TeamMember } from '../../data/company';

interface TeamCardProps {
  member: TeamMember;
  visible: boolean;
  delay: number;
}

/**
 * Tarjeta de equipo con efecto flip 3D.
 * - Escritorio: se voltea al pasar el cursor (hover) o al enfocar con teclado.
 * - Táctil: se voltea al tocar (toggle), ya que no hay hover.
 * El contenido de ambas caras vive en el DOM (accesible e indexable).
 */
export default function TeamCard({ member, visible, delay }: TeamCardProps) {
  const { t } = useTranslation('about');
  const [flipped, setFlipped] = useState(false);

  const role = t(`team.roles.${member.roleKey}`);
  const bio = t(`team.bios.${member.roleKey}`);

  return (
    <div
      className={`perspective h-80 transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={`flip-inner h-full w-full ${flipped ? 'is-flipped' : ''}`}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onFocus={() => setFlipped(true)}
        onBlur={() => setFlipped(false)}
        onClick={() => setFlipped((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setFlipped((v) => !v);
          }
        }}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${member.name} — ${role}`}
      >
        {/* Cara frontal */}
        <div className="flip-face absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-carbon/10 bg-surface p-8 text-center shadow-sm">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-carbon to-carbon-soft ring-4 ring-accent/80">
            <span className="text-2xl font-bold tracking-widest text-white">
              {member.initials}
            </span>
          </div>
          <h3 className="mt-6 text-lg font-semibold text-carbon">{member.name}</h3>
          <p className="mt-1 text-sm font-medium uppercase tracking-wide text-accent">{role}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-carbon-soft/50">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 9-9" />
              <path d="M3 4v4h4" />
            </svg>
            {t('team.flipHint')}
          </span>
        </div>

        {/* Cara posterior */}
        <div className="flip-back flip-face flex flex-col rounded-xl bg-carbon p-8 text-left text-white shadow-lg">
          <h3 className="text-lg font-semibold">{member.name}</h3>
          <p className="mt-0.5 text-sm font-medium uppercase tracking-wide text-accent">{role}</p>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-white/75">{bio}</p>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-accent"
          >
            <LinkedInIcon className="h-4 w-4" />
            {t('team.linkedin')}
          </a>
        </div>
      </div>
    </div>
  );
}
