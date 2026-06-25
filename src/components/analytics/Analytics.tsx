import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { hasTracking, loadTrackers, trackPageView } from '../../lib/tracking';
import CookieConsent from './CookieConsent';

const CONSENT_KEY = 'axenor_cookie_consent';
type Consent = 'granted' | 'denied' | 'unset';

function readConsent(): Consent {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === 'granted' ? 'granted' : v === 'denied' ? 'denied' : 'unset';
  } catch {
    return 'unset';
  }
}

/**
 * Analítica consent-gated: NO se carga ningún tracker hasta que el visitante
 * acepta. La elección se recuerda en localStorage. Si no hay IDs configurados
 * (`hasTracking` false), no se muestra el banner ni se carga nada.
 */
export default function Analytics() {
  const [consent, setConsent] = useState<Consent>('unset');
  const [mounted, setMounted] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setConsent(readConsent());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (consent === 'granted') loadTrackers();
  }, [consent]);

  // page_view en cada cambio de ruta del SPA (solo con consentimiento).
  useEffect(() => {
    if (consent === 'granted') trackPageView(pathname);
  }, [consent, pathname]);

  if (!mounted || !hasTracking || consent !== 'unset') return null;

  const choose = (granted: boolean) => {
    try {
      localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied');
    } catch {
      /* localStorage bloqueado: la sesión actual respeta la elección igual */
    }
    setConsent(granted ? 'granted' : 'denied');
  };

  return <CookieConsent onAccept={() => choose(true)} onReject={() => choose(false)} />;
}
