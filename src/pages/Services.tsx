import { useTranslation } from 'react-i18next';
import PageHeader from '../components/ui/PageHeader';
import CTABanner from '../components/ui/CTABanner';
import { SERVICE_ICONS } from '../components/ui/ServiceIcons';
import { SERVICE_ANCHORS, SERVICE_KEYS } from '../data/services';

export default function Services() {
  const { t } = useTranslation('services');

  return (
    <>
      <PageHeader
        title={t('header.title')}
        subtitle={t('header.subtitle')}
        intro={t('header.intro')}
      />

      {SERVICE_KEYS.map((key, index) => {
        const Icon = SERVICE_ICONS[key];
        const bullets = t(`items.${key}.bullets`, { returnObjects: true }) as string[];
        const stack = t(`items.${key}.stack`, { returnObjects: true }) as string[];

        return (
          <section
            key={key}
            id={SERVICE_ANCHORS[key]}
            className={`relative scroll-mt-16 py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-surface'}`}
          >
            <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
              <div>
                <span className="text-sm font-bold tracking-widest text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="mt-3 flex items-center gap-4">
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-carbon text-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-carbon">
                    {t(`items.${key}.name`)}
                  </h2>
                </div>
                <p className="mt-5 text-lg font-medium leading-relaxed text-carbon">
                  {t(`items.${key}.tagline`)}
                </p>
                <p className="mt-4 leading-relaxed text-carbon-soft/80">
                  {t(`items.${key}.desc`)}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-carbon/15 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-carbon-soft"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`rounded-xl p-8 ${index % 2 === 0 ? 'bg-surface' : 'bg-white shadow-sm'}`}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-carbon-soft/60">
                  {t('labels.capabilities')}
                </h3>
                <ul className="mt-5 space-y-4">
                  {bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-accent"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed text-carbon-soft/85">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}

      {/* Cómo empezamos */}
      <section className="relative bg-surface py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="mx-auto mb-5 block h-1 w-12 bg-accent" aria-hidden="true" />
          <h2 className="text-3xl font-bold tracking-tight text-carbon">{t('pricing.title')}</h2>
          <p className="mt-5 text-lg leading-relaxed text-carbon-soft/80">{t('pricing.text')}</p>
        </div>
      </section>

      <CTABanner secondary="how" />
    </>
  );
}
