import { useTranslation } from 'react-i18next';
import PageHeader from '../components/ui/PageHeader';
import SectionHeading from '../components/ui/SectionHeading';
import CTABanner from '../components/ui/CTABanner';
import { useReveal } from '../hooks/useReveal';

const PILLAR_KEYS = ['context', 'ownership', 'seniority'] as const;
const PHASE_KEYS = ['onboarding', 'discovery', 'delivery', 'measurement'] as const;
const RISK_KEYS = ['visibility', 'milestones', 'deliverables', 'timeToValue'] as const;

export default function HowWeWork() {
  const { t } = useTranslation('how');
  const pillars = useReveal<HTMLDivElement>(0.1);
  const phases = useReveal<HTMLDivElement>(0.1);
  const risk = useReveal<HTMLDivElement>(0.1);

  const revealClass = (visible: boolean) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${
      visible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-10 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
    }`;

  return (
    <>
      <PageHeader
        title={t('header.title')}
        subtitle={t('header.subtitle')}
        intro={t('header.intro')}
      />

      {/* El modelo: tres pilares */}
      <section className="relative bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title={t('pillars.title')} />
          <div ref={pillars.ref} className="grid gap-8 md:grid-cols-3">
            {PILLAR_KEYS.map((key, index) => (
              <article
                key={key}
                className={`rounded-xl border-t-4 border-accent bg-surface p-8 shadow-sm ${revealClass(pillars.visible)}`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <h3 className="text-xl font-bold text-carbon">{t(`pillars.items.${key}.title`)}</h3>
                <p className="mt-3 leading-relaxed text-carbon-soft/80">
                  {t(`pillars.items.${key}.text`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* El proceso: cuatro fases */}
      <section className="relative bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title={t('phases.title')} subtitle={t('phases.subtitle')} />
          <div ref={phases.ref} className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PHASE_KEYS.map((key, index) => (
              <article
                key={key}
                className={`rounded-xl bg-carbon p-8 text-white shadow-lg ${revealClass(phases.visible)}`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <span className="text-3xl font-bold text-accent">
                  {t(`phases.items.${key}.num`)}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{t(`phases.items.${key}.title`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {t(`phases.items.${key}.text`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Reducción de riesgo */}
      <section className="relative bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title={t('risk.title')} subtitle={t('risk.subtitle')} />
          <div ref={risk.ref} className="grid gap-8 md:grid-cols-2">
            {RISK_KEYS.map((key, index) => (
              <article
                key={key}
                className={`flex items-start gap-5 rounded-xl border border-carbon/10 bg-surface p-8 ${revealClass(risk.visible)}`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <span className="mt-1.5 h-3 w-3 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-bold text-carbon">{t(`risk.items.${key}.title`)}</h3>
                  <p className="mt-2 leading-relaxed text-carbon-soft/80">
                    {t(`risk.items.${key}.text`)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner secondary="contact" />
    </>
  );
}
