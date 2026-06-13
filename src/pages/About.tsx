import { useTranslation } from 'react-i18next';
import PageHeader from '../components/ui/PageHeader';
import SectionHeading from '../components/ui/SectionHeading';
import CTABanner from '../components/ui/CTABanner';
import Team from '../components/ui/Team';
import { useReveal } from '../hooks/useReveal';
import { usePageTitle } from '../hooks/usePageTitle';

const PRINCIPLE_KEYS = ['ownership', 'proof', 'depth', 'transparency'] as const;

export default function About() {
  usePageTitle('about');
  const { t } = useTranslation('about');
  const cards = useReveal<HTMLDivElement>(0.1);
  const principles = useReveal<HTMLDivElement>(0.1);

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
        intro={t('intro')}
      />

      {/* Misión y Visión (textos canónicos) */}
      <section className="relative bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div ref={cards.ref} className="grid gap-8 md:grid-cols-2">
            {(
              [
                { titleKey: 'missionTitle', textKey: 'mission' },
                { titleKey: 'visionTitle', textKey: 'vision' },
              ] as const
            ).map(({ titleKey, textKey }, index) => (
              <article
                key={titleKey}
                className={`rounded-xl border-t-4 border-accent bg-surface p-8 shadow-sm ${revealClass(cards.visible)}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <h2 className="text-2xl font-bold text-carbon">{t(titleKey)}</h2>
                <p className="mt-4 leading-relaxed text-carbon-soft/80">{t(textKey)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Principios */}
      <section className="relative bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title={t('principles.title')} subtitle={t('principles.subtitle')} />
          <div ref={principles.ref} className="grid gap-8 md:grid-cols-2">
            {PRINCIPLE_KEYS.map((key, index) => (
              <article
                key={key}
                className={`flex items-start gap-5 rounded-xl bg-white p-8 shadow-sm ${revealClass(principles.visible)}`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <span className="mt-1.5 h-3 w-3 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-bold text-carbon">
                    {t(`principles.items.${key}.title`)}
                  </h3>
                  <p className="mt-2 leading-relaxed text-carbon-soft/80">
                    {t(`principles.items.${key}.text`)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestro Equipo */}
      <Team />

      <CTABanner secondary="how" />
    </>
  );
}
