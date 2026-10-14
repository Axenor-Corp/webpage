import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

const BEFORE_NODES = ['qr', 'host', 'db', 'capacity'] as const;
const AFTER_NODES = ['qr', 'domain', 'run', 'db', 'guards'] as const;

function Arrow({ dark }: { dark: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`mx-auto my-1 h-5 w-5 ${dark ? 'text-accent' : 'text-carbon/25'}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

function Mark({ ok }: { ok: boolean }) {
  return ok ? (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l5 5 9-10" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-carbon/45" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function Node({ title, children, dark }: { title: string; children: ReactNode; dark: boolean }) {
  return (
    <div
      className={`rounded-lg p-4 ${
        dark ? 'border border-white/10 bg-white/5' : 'border border-dashed border-carbon/20 bg-surface'
      }`}
    >
      <p className={`font-semibold ${dark ? 'text-white' : 'text-carbon/80'}`}>{title}</p>
      <div className={`mt-1 text-sm leading-relaxed ${dark ? 'text-white/65' : 'text-carbon-soft/65'}`}>
        {children}
      </div>
    </div>
  );
}

/**
 * Diagrama antes/después de la infraestructura: sin capturas de la app (es de
 * un tercero), lo que se muestra es lo que Axenor cambió alrededor de ella.
 */
export default function BeforeAfter() {
  const { t } = useTranslation('hosting');
  const issues = t('architecture.before.nodes.db.issues', { returnObjects: true }) as string[];
  const checks = t('architecture.after.nodes.db.checks', { returnObjects: true }) as string[];

  const list = (items: string[], ok: boolean) => (
    <ul className="mt-1 space-y-1">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <Mark ok={ok} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <figure className="rounded-xl bg-white p-6 shadow-sm">
        <figcaption className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-carbon-soft/55">
          {t('architecture.before.label')}
        </figcaption>
        {BEFORE_NODES.map((key, index) => (
          <div key={key}>
            {index > 0 && <Arrow dark={false} />}
            <Node title={t(`architecture.before.nodes.${key}.title`)} dark={false}>
              {key === 'db' ? list(issues, false) : t(`architecture.before.nodes.${key}.text`)}
            </Node>
          </div>
        ))}
      </figure>

      <figure className="rounded-xl bg-carbon p-6 shadow-xl shadow-carbon/20">
        <figcaption className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-accent">
          {t('architecture.after.label')}
        </figcaption>
        {AFTER_NODES.map((key, index) => (
          <div key={key}>
            {index > 0 && <Arrow dark />}
            <Node title={t(`architecture.after.nodes.${key}.title`)} dark>
              {key === 'db' ? list(checks, true) : t(`architecture.after.nodes.${key}.text`)}
            </Node>
          </div>
        ))}
      </figure>
    </div>
  );
}
