import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePrivacyStore, type PrivacyConsent } from '../../store/usePrivacyStore';

const NO_CONSENT: PrivacyConsent = {
  analytics: false,
  ads: false,
  aiTraining: false,
  admt: false,
  doNotSellShare: false,
};

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="relative inline-flex shrink-0 cursor-pointer items-center">
      <input
        type="checkbox"
        className="sr-only peer"
        aria-label={label}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="peer h-6 w-11 rounded-full bg-white/20 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-accent peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
    </label>
  );
}

export default function PrivacyCenter() {
  const { t } = useTranslation();
  const { consent, updateConsent, isPrivacyCenterOpen, closePrivacyCenter, deleteAccount } = usePrivacyStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  if (!isPrivacyCenterOpen) return null;
  // Sin decisión previa se muestra todo apagado; cualquier cambio la registra.
  const current = consent ?? NO_CONSENT;

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteAccount();
    setIsDeleting(false);
    setDeleteConfirm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/80 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-center-title"
        className="w-full max-w-lg rounded-xl border border-white/10 bg-carbon p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 id="privacy-center-title" className="text-xl font-bold text-white">
            {t('privacyCenter.title')}
          </h2>
          <button
            type="button"
            onClick={closePrivacyCenter}
            aria-label={t('privacyCenter.close')}
            className="text-white/60 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-white">{t('privacyCenter.analytics')}</h3>
              <p className="text-sm text-white/60">{t('privacyCenter.analyticsDesc')}</p>
            </div>
            <Toggle
              label={t('privacyCenter.analytics')}
              checked={current.analytics}
              onChange={(checked) => updateConsent({ analytics: checked })}
            />
          </div>

          {/* CCPA: Do Not Sell or Share. Activarlo apaga la publicidad personalizada. */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-white">{t('privacyCenter.doNotSell')}</h3>
              <p className="text-sm text-white/60">{t('privacyCenter.doNotSellDesc')}</p>
            </div>
            <Toggle
              label={t('privacyCenter.doNotSell')}
              checked={current.doNotSellShare}
              onChange={(checked) => updateConsent({ doNotSellShare: checked, ads: !checked })}
            />
          </div>

          {/* GDPR/CCPA: AI Training & ADMT */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-white">{t('privacyCenter.aiTraining')}</h3>
              <p className="text-sm text-white/60">{t('privacyCenter.aiTrainingDesc')}</p>
            </div>
            <Toggle
              label={t('privacyCenter.aiTraining')}
              checked={current.aiTraining}
              onChange={(checked) => updateConsent({ aiTraining: checked, admt: checked })}
            />
          </div>

          <hr className="border-white/10" />

          {/* DROP: borrado de los datos guardados en el navegador */}
          <div>
            <h3 className="font-medium text-red-400">{t('privacyCenter.deleteTitle')}</h3>
            <p className="mb-3 text-sm text-white/60">{t('privacyCenter.deleteDesc')}</p>

            {!deleteConfirm ? (
              <button
                type="button"
                onClick={() => setDeleteConfirm(true)}
                className="rounded-md border border-red-500/50 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
              >
                {t('privacyCenter.deleteButton')}
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
                >
                  {isDeleting ? t('privacyCenter.deleting') : t('privacyCenter.deleteConfirm')}
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(false)}
                  className="rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10"
                >
                  {t('privacyCenter.cancel')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
