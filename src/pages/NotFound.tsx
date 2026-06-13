import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-screen items-center">
      <div className="mx-auto max-w-2xl px-6 pt-16 text-center">
        <p className="text-7xl font-bold tracking-tight text-accent">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-carbon">
          {t('notFound.title')}
        </h1>
        <p className="mt-4 text-lg text-carbon-soft/75">{t('notFound.text')}</p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-md bg-accent px-8 py-3 font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent/90"
        >
          {t('notFound.back')}
        </Link>
      </div>
    </section>
  );
}
