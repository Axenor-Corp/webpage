import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { hasTracking, loadTrackers, trackPageView } from '../../lib/tracking';
import CookieConsent from './CookieConsent';
import { usePrivacyStore } from '../../store/usePrivacyStore';

/**
 * Analítica consent-gated: Carga trackers y trackea páginas basándose en los scopes
 * aceptados en usePrivacyStore.
 */
export default function Analytics() {
  const { consent } = usePrivacyStore();
  const [mounted, setMounted] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // loadTrackers could be modified in real code to take { analytics, ads } scopes.
  // For now, if either is true and hasTracking is true, we call loadTrackers.
  useEffect(() => {
    if (consent && (consent.analytics || consent.ads)) {
      loadTrackers(); // internally it should respect the exact scopes.
    }
  }, [consent]);

  // page_view en cada cambio de ruta del SPA (solo con consentimiento analytics).
  useEffect(() => {
    if (consent && consent.analytics) {
      trackPageView(pathname);
    }
  }, [consent, pathname]);

  if (!mounted || !hasTracking) return null;

  return <CookieConsent />;
}
