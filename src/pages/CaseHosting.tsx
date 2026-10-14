import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SectionHeading from '../components/ui/SectionHeading';
import BeforeAfter from '../components/hosting/BeforeAfter';

const STAT_KEYS = ['registered', 'completed', 'reprints', 'sessions'] as const;
const FACT_KEYS = ['client', 'role', 'app', 'cycle'] as const;
const STORY_KEYS = ['challenge', 'solution', 'result'] as const;
const SECURITY_KEYS = ['privilege', 'secrets', 'backups', 'inherited', 'transport', 'spend'] as const;
const RELIABILITY_KEYS = ['connections', 'cost', 'scale'] as const;

/**
 * Caso de alojamiento y ciberseguridad: /casos/autodiagnostico-emprendedores
 * La aplicación es de un tercero (no se muestran sus pantallas ni su marca);
 * el caso cuenta lo que Axenor hizo alrededor: migración, seguridad, operación
 * y cierre ordenado.
 */
export default function CaseHosting() {
  const { t } = useTranslation('hosting');
  const closure = t('closure.items', { returnObjects: true }) as string[];
  const stack = t('stack.items', { returnObjects: true }) as string[];

  return (
    <>
      {/* Hero: transparente sobre la red 3D, con las cifras de la campaña */}
      <section className="relative px-6 pb-16 pt-36">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[7fr_5fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-text md:text-sm">
              {t('hero.kicker')}
            </p>
            <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-carbon md:text-5xl">
              {t('hero.title')}
            </h1>
            <p className="mt-4 text-xl font-medium text-accent-text md:text-2xl">{t('hero.lead')}</p>
            <p className="mt-5 text-lg leading-relaxed text-carbon-soft/75">{t('hero.text')}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/contacto"
                className="rounded-md bg-accent px-8 py-3 font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent/90"
              >
                {t('hero.cta')}
              </Link>
              <a
                href="#antes-y-despues"
                className="rounded-md border-2 border-carbon px-8 py-3 font-semibold text-carbon transition hover:border-accent hover:text-accent"
              >
                {t('hero.ctaSecondary')}
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-carbon p-8 text-white shadow-2xl shadow-carbon/25">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">{t('hero.statsLabel')}</p>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8">
              {STAT_KEYS.map((key) => (
                <div key={key} className="flex flex-col-reverse justify-end">
                  <dt className="mt-1 text-sm leading-snug text-white/60">{t(`stats.${key}.label`)}</dt>
                  <dd className="text-4xl font-bold text-accent md:text-5xl">{t(`stats.${key}.value`)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Ficha rápida */}
      <section className="relative bg-white py-10">
        <dl className="mx-auto grid max-w-6xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {FACT_KEYS.map((key) => (
            <div key={key} className="border-l-4 border-accent pl-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-carbon-soft/60">
                {t(`facts.${key}.label`)}
              </dt>
              <dd className="mt-1 font-semibold text-carbon">{t(`facts.${key}.value`)}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Reto · Lo que hicimos · Resultado */}
      <section className="relative bg-surface py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">
          {STORY_KEYS.map((key, index) => (
            <article key={key} className="rounded-xl bg-white p-8 shadow-sm">
              <span className="text-sm font-bold tracking-widest text-accent-text">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-2 text-2xl font-bold text-carbon">{t(`story.${key}.title`)}</h2>
              <p className="mt-4 leading-relaxed text-carbon-soft/80">{t(`story.${key}.text`)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Antes y después de la infraestructura */}
      <section id="antes-y-despues" className="relative scroll-mt-16 bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeading title={t('architecture.title')} subtitle={t('architecture.subtitle')} />
          <BeforeAfter />
          <p className="mt-10 text-center text-sm text-carbon-soft/60">{t('confidential')}</p>
        </div>
      </section>

      {/* Controles de seguridad */}
      <section className="relative bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title={t('security.title')} subtitle={t('security.subtitle')} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SECURITY_KEYS.map((key) => (
              <article key={key} className="rounded-xl border-t-4 border-accent bg-white p-7 shadow-sm">
                <h3 className="text-lg font-bold text-carbon">{t(`security.items.${key}.title`)}</h3>
                <p className="mt-3 leading-relaxed text-carbon-soft/80">{t(`security.items.${key}.text`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Confiabilidad y costo */}
      <section className="relative bg-carbon py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">{t('reliability.title')}</h2>
          <dl className="mt-12 grid gap-10 md:grid-cols-3">
            {RELIABILITY_KEYS.map((key) => (
              <div key={key} className="flex flex-col-reverse justify-end text-center">
                <dt className="mx-auto mt-2 max-w-xs text-sm leading-snug text-white/65">
                  {t(`reliability.items.${key}.label`)}
                </dt>
                <dd className="text-4xl font-bold text-accent md:text-5xl">{t(`reliability.items.${key}.value`)}</dd>
              </div>
            ))}
          </dl>
          <p className="mx-auto mt-12 max-w-3xl text-center leading-relaxed text-white/70">{t('reliability.fixes')}</p>
        </div>
      </section>

      {/* Cierre ordenado */}
      <section className="relative bg-white py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <span className="mb-4 block h-1 w-12 bg-accent" aria-hidden="true" />
            <h2 className="text-3xl font-bold tracking-tight text-carbon">{t('closure.title')}</h2>
            <p className="mt-4 text-lg leading-relaxed text-carbon-soft/75">{t('closure.text')}</p>
          </div>
          <ul className="space-y-3">
            {closure.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-lg bg-surface p-4">
                <svg
                  viewBox="0 0 24 24"
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12l5 5 9-10" />
                </svg>
                <span className="leading-relaxed text-carbon">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto mt-16 max-w-6xl px-6 text-center">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-carbon-soft/60">{t('stack.title')}</h3>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-carbon/15 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-carbon-soft"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative bg-carbon py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="mx-auto mb-5 block h-1 w-12 bg-accent" aria-hidden="true" />
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">{t('cta.title')}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">{t('cta.text')}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contacto"
              className="rounded-md bg-accent px-8 py-3 font-semibold text-white shadow-lg shadow-accent/20 transition hover:bg-accent/90"
            >
              {t('cta.primary')}
            </Link>
            <Link
              to="/servicios#cloud"
              className="rounded-md border-2 border-white/30 px-8 py-3 font-semibold text-white transition hover:border-accent hover:text-accent"
            >
              {t('cta.secondary')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
