import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { APPLY_ROUTE } from '../../data/company';

interface CTABannerProps {
  /** destino del botón secundario */
  secondary?: 'how' | 'contact';
}

/** Llamado a la acción reutilizable: "El siguiente paso" → /aplicar. */
export default function CTABanner({ secondary = 'how' }: CTABannerProps) {
  const { t } = useTranslation();
  const secondaryPath = secondary === 'how' ? '/como-trabajamos' : '/contacto';
  const secondaryLabel = secondary === 'how' ? t('cta.secondaryHow') : t('cta.secondaryContact');

  return (
    <section className="relative bg-carbon py-20 text-white">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <span className="mx-auto mb-5 block h-1 w-12 bg-accent" aria-hidden="true" />
        <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
          {t('cta.title')}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">{t('cta.text')}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            to={APPLY_ROUTE.path}
            className="rounded-md bg-accent px-8 py-3 font-semibold text-white shadow-lg shadow-accent/20 transition hover:bg-accent/90"
          >
            {t('cta.primary')}
          </Link>
          <Link
            to={secondaryPath}
            className="rounded-md border-2 border-white/30 px-8 py-3 font-semibold text-white transition hover:border-accent hover:text-accent"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
