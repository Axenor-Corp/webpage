import { Link } from '../components/ui/LocalizedLink';
import { useTranslation } from 'react-i18next';
import SectionHeading from '../components/ui/SectionHeading';
import RoleTour from '../components/faro/RoleTour';
import { ScreenShot } from '../components/faro/ScreenStage';
import { FARO_METRICS, FARO_MODULES, FARO_STACK } from '../data/faro';

const FACT_KEYS = ['client', 'type', 'scope', 'status'] as const;
const STORY_KEYS = ['challenge', 'solution', 'result'] as const;
const ENGINEERING_KEYS = ['isolation', 'ai', 'scale', 'mobile'] as const;
const PROCESS_KEYS = ['understand', 'design', 'build', 'operate'] as const;

/**
 * Propuesta 2 + 3 · Caso de software a la medida: /casos/faro
 * Faro no se presenta como producto de catálogo sino como prueba de lo que
 * Axenor construye para un propósito concreto (narrativa del caso + recorrido
 * interactivo por rol + cómo se construyó).
 */
export default function CaseFaro() {
  const { t } = useTranslation('faro');
  const capabilities = t('case.capabilities.items', { returnObjects: true }) as string[];

  return (
    <>
      {/* Hero: transparente sobre la red 3D, como el resto de cabeceras */}
      <section className="relative px-6 pb-16 pt-36">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[5fr_7fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-text md:text-sm">
              {t('case.hero.kicker')}
            </p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight text-carbon md:text-6xl">
              {t('case.hero.title')}
            </h1>
            <p className="mt-4 text-xl font-medium text-accent-text md:text-2xl">{t('case.hero.lead')}</p>
            <p className="mt-5 text-lg leading-relaxed text-carbon-soft/75">{t('case.hero.text')}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/contacto"
                className="rounded-md bg-accent px-8 py-3 font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent/90"
              >
                {t('case.hero.cta')}
              </Link>
              <a
                href="#recorrido"
                className="rounded-md border-2 border-carbon px-8 py-3 font-semibold text-carbon transition hover:border-accent hover:text-accent"
              >
                {t('case.hero.ctaSecondary')}
              </a>
            </div>
          </div>
          <ScreenShot screen="journey" />
        </div>
      </section>

      {/* Ficha rápida del proyecto */}
      <section className="relative bg-white py-10">
        <dl className="mx-auto grid max-w-6xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {FACT_KEYS.map((key) => (
            <div key={key} className="border-l-4 border-accent pl-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-carbon-soft/60">
                {t(`case.facts.${key}.label`)}
              </dt>
              <dd className="mt-1 font-semibold text-carbon">{t(`case.facts.${key}.value`)}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Reto · Solución · Resultado */}
      <section className="relative bg-surface py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">
          {STORY_KEYS.map((key, index) => (
            <article key={key} className="rounded-xl bg-white p-8 shadow-sm">
              <span className="text-sm font-bold tracking-widest text-accent-text">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-2 text-2xl font-bold text-carbon">{t(`case.story.${key}.title`)}</h2>
              <p className="mt-4 leading-relaxed text-carbon-soft/80">{t(`case.story.${key}.text`)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Cifras */}
      <section className="relative bg-carbon py-16 text-white">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-3 lg:grid-cols-6">
          {FARO_METRICS.map(({ key, value }) => (
            <div key={key} className="flex flex-col-reverse justify-end text-center">
              <dt className="mt-2 text-sm leading-snug text-white/65">{t(`metrics.${key}`)}</dt>
              <dd className="text-4xl font-bold text-accent">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <RoleTour />

      {/* Módulos: cada uno responde a una parte concreta del programa */}
      <section className="relative bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title={t('case.modules.title')} subtitle={t('case.modules.subtitle')} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FARO_MODULES.map((key, index) => (
              <article key={key} className="flex flex-col rounded-xl bg-carbon p-6 text-white shadow-lg">
                <span className="text-sm font-bold tracking-widest text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{t(`modules.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{t(`modules.${key}.text`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ingeniería */}
      <section className="relative bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            title={t('case.engineering.title')}
            subtitle={t('case.engineering.subtitle')}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {ENGINEERING_KEYS.map((key) => (
              <article key={key} className="rounded-xl border-t-4 border-accent bg-white p-8 shadow-sm">
                <h3 className="text-lg font-bold text-carbon">
                  {t(`case.engineering.items.${key}.title`)}
                </h3>
                <p className="mt-3 leading-relaxed text-carbon-soft/80">
                  {t(`case.engineering.items.${key}.text`)}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-carbon-soft/60">
              {t('case.engineering.stack')}
            </h3>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {FARO_STACK.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-carbon/15 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-carbon-soft"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cómo lo construimos: el método de Axenor aplicado a este caso */}
      <section className="relative bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title={t('case.process.title')} subtitle={t('case.process.subtitle')} />
          <ol className="grid gap-8 md:grid-cols-4">
            {PROCESS_KEYS.map((key, index) => (
              <li key={key}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold text-carbon">{t(`case.process.items.${key}.title`)}</h3>
                <p className="mt-2 leading-relaxed text-carbon-soft/75">
                  {t(`case.process.items.${key}.text`)}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-12 text-center">
            <Link
              to="/como-trabajamos"
              className="inline-flex items-center gap-1.5 font-semibold text-accent-text transition hover:opacity-80"
            >
              {t('case.process.link')}
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Lo transferible: capacidades probadas, no el producto */}
      <section className="relative bg-surface py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="mx-auto mb-5 block h-1 w-12 bg-accent" aria-hidden="true" />
          <h2 className="text-balance text-3xl font-bold tracking-tight text-carbon">
            {t('case.capabilities.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-carbon-soft/75">
            {t('case.capabilities.text')}
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-2">
            {capabilities.map((item) => (
              <li
                key={item}
                className="rounded-full border border-carbon/15 bg-white px-4 py-2 text-sm font-semibold text-carbon"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative bg-carbon py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="mx-auto mb-5 block h-1 w-12 bg-accent" aria-hidden="true" />
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            {t('case.cta.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">{t('case.cta.text')}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contacto"
              className="rounded-md bg-accent px-8 py-3 font-semibold text-white shadow-lg shadow-accent/20 transition hover:bg-accent/90"
            >
              {t('case.cta.primary')}
            </Link>
            <Link
              to="/servicios#solucion-software"
              className="rounded-md border-2 border-white/30 px-8 py-3 font-semibold text-white transition hover:border-accent hover:text-accent"
            >
              {t('case.cta.secondary')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
