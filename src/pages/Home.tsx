import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Hero from '../components/ui/Hero';
import SectionHeading from '../components/ui/SectionHeading';
import ServiceCard from '../components/ui/ServiceCard';
import CTABanner from '../components/ui/CTABanner';
import { SERVICE_ICONS } from '../components/ui/ServiceIcons';
import { SERVICE_ANCHORS, SERVICE_KEYS } from '../data/services';
import { useReveal } from '../hooks/useReveal';
import { usePageTitle } from '../hooks/usePageTitle';

export default function Home() {
  usePageTitle('home');
  const { t } = useTranslation(['home', 'services']);
  const services = useReveal<HTMLDivElement>(0.1);
  const how = useReveal<HTMLDivElement>(0.1);

  const pillarKeys = ['context', 'ownership', 'results'] as const;

  return (
    <>
      <Hero />

      {/* Resumen de servicios: tarjetas que enlazan al detalle en /servicios */}
      <section id="servicios" className="relative scroll-mt-16 bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            title={t('home:services.title')}
            subtitle={t('home:services.subtitle')}
          />
          <div ref={services.ref} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICE_KEYS.map((key, index) => {
              const Icon = SERVICE_ICONS[key];
              return (
                <ServiceCard
                  key={key}
                  icon={<Icon className="h-6 w-6" />}
                  name={t(`services:items.${key}.name`)}
                  description={t(`services:items.${key}.tagline`)}
                  visible={services.visible}
                  delay={index * 120}
                  to={`/servicios#${SERVICE_ANCHORS[key]}`}
                  cta={t('home:services.viewDetail')}
                />
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/servicios"
              className="inline-block rounded-md border-2 border-carbon px-8 py-3 font-semibold text-carbon transition hover:border-accent hover:text-accent"
            >
              {t('home:services.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* Teaser del modelo de trabajo */}
      <section className="relative bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title={t('home:how.title')} subtitle={t('home:how.subtitle')} />
          <div ref={how.ref} className="grid gap-8 md:grid-cols-3">
            {pillarKeys.map((key, index) => (
              <article
                key={key}
                className={`rounded-xl border-t-4 border-accent bg-surface p-8 shadow-sm transition-all duration-700 ease-out motion-reduce:transition-none ${
                  how.visible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <h3 className="text-xl font-bold text-carbon">
                  {t(`home:how.pillars.${key}.title`)}
                </h3>
                <p className="mt-3 leading-relaxed text-carbon-soft/80">
                  {t(`home:how.pillars.${key}.text`)}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/como-trabajamos"
              className="inline-flex items-center gap-1.5 font-semibold text-accent transition hover:opacity-80"
            >
              {t('home:how.link')}
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
            </Link>
          </div>
        </div>
      </section>

      {/* Llamado a la acción principal */}
      <CTABanner secondary="how" />
    </>
  );
}
