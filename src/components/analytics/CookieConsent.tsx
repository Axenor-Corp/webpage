import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface CookieConsentProps {
  onAccept: () => void;
  onReject: () => void;
}

/** Banner de consentimiento (paleta Axenor, i18n). El padre carga los trackers solo al aceptar. */
export default function CookieConsent({ onAccept, onReject }: CookieConsentProps) {
  const { t } = useTranslation();

  return (
    <div
      role="dialog"
      aria-label={t('cookies.title')}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-carbon/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-relaxed text-white/80">
          {t('cookies.text')}{' '}
          <Link
            to="/legal/privacidad"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            {t('cookies.policy')}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={onReject}
            className="rounded-md border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-accent hover:text-accent"
          >
            {t('cookies.reject')}
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:bg-accent/90"
          >
            {t('cookies.accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
