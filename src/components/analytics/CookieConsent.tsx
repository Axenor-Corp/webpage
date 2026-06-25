import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePrivacyStore } from '../../store/usePrivacyStore';

export default function CookieConsent() {
  const { consent, setConsent } = usePrivacyStore();
  const [showPreferences, setShowPreferences] = useState(false);
  
  const [localConsent, setLocalConsent] = useState({
    analytics: false,
    ads: false,
    aiTraining: false,
  });

  if (consent !== null) return null;

  const handleAcceptAll = () => {
    setConsent({
      analytics: true,
      ads: true,
      aiTraining: true,
      admt: true,
      doNotSellShare: false,
    });
  };

  const handleRejectAll = () => {
    setConsent({
      analytics: false,
      ads: false,
      aiTraining: false,
      admt: false,
      doNotSellShare: true,
    });
  };

  const handleSavePreferences = () => {
    setConsent({
      analytics: localConsent.analytics,
      ads: localConsent.ads,
      aiTraining: localConsent.aiTraining,
      admt: localConsent.aiTraining, // usually paired
      doNotSellShare: !localConsent.ads, // if ads is false, we don't sell/share
    });
  };

  return (
    <div
      role="dialog"
      aria-label="Privacy Consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-carbon/95 p-4 shadow-2xl backdrop-blur-md md:p-6"
    >
      <div className="mx-auto max-w-6xl">
        {!showPreferences ? (
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm leading-relaxed text-white/80 md:max-w-2xl">
              Usamos cookies y tecnologías similares para analítica, publicidad personalizada y entrenamiento de nuestros modelos de IA.{' '}
              <Link
                to="/legal/privacidad"
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                Política de Privacidad
              </Link>
            </p>
            <div className="flex shrink-0 flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="rounded-md border border-white/20 px-4 py-2.5 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                Preferencias
              </button>
              <button
                type="button"
                onClick={handleRejectAll}
                className="rounded-md border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-accent hover:text-accent"
              >
                Rechazar Todo
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:bg-accent/90"
              >
                Aceptar Todo
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Preferencias de Privacidad</h3>
              <button onClick={() => setShowPreferences(false)} className="text-sm text-white/60 hover:text-white">Volver</button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">Analíticas</span>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={localConsent.analytics}
                      onChange={(e) => setLocalConsent({ ...localConsent, analytics: e.target.checked })}
                    />
                    <div className="peer h-5 w-9 rounded-full bg-white/20 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-accent peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                  </label>
                </div>
                <p className="text-xs text-white/60">Permite medir el rendimiento de la web.</p>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">Publicidad (Ads)</span>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={localConsent.ads}
                      onChange={(e) => setLocalConsent({ ...localConsent, ads: e.target.checked })}
                    />
                    <div className="peer h-5 w-9 rounded-full bg-white/20 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-accent peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                  </label>
                </div>
                <p className="text-xs text-white/60">Anuncios personalizados basados en tu navegación.</p>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">Entrenamiento IA</span>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={localConsent.aiTraining}
                      onChange={(e) => setLocalConsent({ ...localConsent, aiTraining: e.target.checked })}
                    />
                    <div className="peer h-5 w-9 rounded-full bg-white/20 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-accent peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                  </label>
                </div>
                <p className="text-xs text-white/60">Uso de datos anonimizados para modelos IA.</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleRejectAll}
                className="rounded-md border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-accent hover:text-accent"
              >
                Rechazar Todo
              </button>
              <button
                type="button"
                onClick={handleSavePreferences}
                className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:bg-accent/90"
              >
                Guardar Preferencias
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
