import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/ui/PageHeader';
import CTABanner from '../components/ui/CTABanner';
import { FARO_ASPECT, FARO_SCREEN_SIZE, faroScreen } from '../data/faro';

const CASES = [
  { key: 'faro', to: '/casos/faro' },
  { key: 'hosting', to: '/casos/autodiagnostico-emprendedores' },
] as const;

/** Índice de casos: /casos */
export default function Cases() {
  const { t } = useTranslation('cases');

  return (
    <>
      <PageHeader title={t('header.title')} subtitle={t('header.subtitle')} intro={t('header.intro')} />

      <section className="relative bg-surface py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
          {CASES.map(({ key, to }) => {
            const figures = t(`items.${key}.figures`, { returnObjects: true }) as {
              value: string;
              label: string;
            }[];
            return (
              <Link
                key={key}
                to={to}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                {key === 'faro' ? (
                  <img
                    src={faroScreen('journey').src}
                    width={FARO_SCREEN_SIZE.width}
                    height={FARO_SCREEN_SIZE.height}
                    alt={t('items.faro.imageAlt')}
                    className={`${FARO_ASPECT} w-full border-b border-carbon/10 object-cover object-top`}
                  />
                ) : (
                  // La app de este caso es de un tercero: en vez de sus pantallas, sus cifras.
                  <div className={`${FARO_ASPECT} flex w-full flex-col justify-center bg-carbon px-10 text-white`}>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                      {t('items.hosting.panelLabel')}
                    </p>
                    <p className="mt-4 text-5xl font-bold text-accent md:text-6xl">329</p>
                    <p className="mt-1 text-white/65">{t('items.hosting.panelText')}</p>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent-text">
                    {t(`items.${key}.tag`)}
                  </span>
                  <h2 className="mt-2 text-2xl font-bold text-carbon">{t(`items.${key}.title`)}</h2>
                  <p className="mt-3 flex-1 leading-relaxed text-carbon-soft/80">{t(`items.${key}.text`)}</p>
                  <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-carbon/10 pt-5">
                    {figures.map(({ value, label }) => (
                      <div key={label} className="flex flex-col-reverse justify-end">
                        <dt className="mt-1 text-xs leading-snug text-carbon-soft/65">{label}</dt>
                        <dd className="text-2xl font-bold text-accent-text">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-accent-text">
                    {t('view')}
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 transition group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        <p className="mx-auto mt-12 max-w-3xl px-6 text-center text-sm leading-relaxed text-carbon-soft/65">
          {t('note')}
        </p>
      </section>

      <CTABanner secondary="contact" />
    </>
  );
}
