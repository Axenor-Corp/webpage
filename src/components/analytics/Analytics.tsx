import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { applyConsent, hasTracking, trackPageView } from '../../lib/tracking';
import CookieConsent from './CookieConsent';
import { usePrivacyStore } from '../../store/usePrivacyStore';

/**
 * Analítica consent-gated: carga trackers y registra páginas según los permisos
 * aceptados en usePrivacyStore.
 */
export default function Analytics() {
  const { consent } = usePrivacyStore();
  const [mounted, setMounted] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cada tracker se carga solo con su permiso (analítica o publicidad) y se apaga
  // si el visitante lo retira desde el Centro de privacidad.
  useEffect(() => {
    applyConsent({ analytics: Boolean(consent?.analytics), ads: Boolean(consent?.ads) });
  }, [consent]);

  // page_view en cada cambio de ruta del SPA (tracking.ts filtra por permiso).
  useEffect(() => {
    if (consent && (consent.analytics || consent.ads)) {
      trackPageView(pathname);
    }
  }, [consent, pathname]);

  if (!mounted || !hasTracking) return null;

  return <CookieConsent />;
}
