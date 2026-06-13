import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation('home');

  return (
    <section className="relative flex min-h-screen items-center">
      <div className="mx-auto max-w-5xl px-6 pt-16 text-center">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-accent md:text-sm">
          {t('hero.kicker')}
        </p>
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-carbon md:text-6xl">
          {t('hero.title')}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-carbon-soft/75 md:text-xl">
          {t('hero.subtitle')}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/servicios"
            className="rounded-md bg-accent px-8 py-3 font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent/90"
          >
            {t('hero.ctaServices')}
          </Link>
          <Link
            to="/contacto"
            className="rounded-md border-2 border-carbon px-8 py-3 font-semibold text-carbon transition hover:border-accent hover:text-accent"
          >
            {t('hero.ctaContact')}
          </Link>
        </div>
      </div>

      <a
        href="#servicios"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-carbon-soft/60 transition-colors hover:text-accent md:flex"
        aria-label={t('hero.scroll')}
      >
        <span className="text-xs uppercase tracking-widest">{t('hero.scroll')}</span>
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 animate-bounce motion-reduce:animate-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
