// Carga de analítica/marketing (GA4, GTM, Meta Pixel, Google Ads).
// Los scripts se inyectan desde este módulo bundleado (script 'self'); el sistema
// es INERTE si no hay IDs configurados. applyConsent() carga cada tracker SOLO
// con el permiso que le corresponde (ver components/analytics/Analytics.tsx).
// Los IDs son públicos por diseño (van al bundle, como toda analítica web).

/* eslint-disable @typescript-eslint/no-explicit-any */
import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from 'web-vitals';

type AnyFn = (...args: any[]) => void;

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: AnyFn;
    fbq?: any;
    _fbq?: any;
  }
}

const env = import.meta.env;

export const TRACKING = {
  GA_ID: (env.VITE_GA_ID as string | undefined) ?? '',
  GTM_ID: (env.VITE_GTM_ID as string | undefined) ?? '',
  META_PIXEL_ID: (env.VITE_META_PIXEL_ID as string | undefined) ?? '',
  GOOGLE_ADS_ID: (env.VITE_GOOGLE_ADS_ID as string | undefined) ?? '',
  GOOGLE_ADS_LABEL: (env.VITE_GOOGLE_ADS_CONVERSION_LABEL as string | undefined) ?? '',
} as const;

/** true si hay al menos un sistema configurado (define si se muestra el banner). */
export const hasTracking = Boolean(
  TRACKING.GA_ID || TRACKING.GTM_ID || TRACKING.META_PIXEL_ID || TRACKING.GOOGLE_ADS_ID,
);

export interface TrackingScopes {
  analytics: boolean;
  ads: boolean;
}

// Qué permitió el visitante AHORA (puede retirarlo desde el Centro de privacidad).
const granted: TrackingScopes = { analytics: false, ads: false };
let gtagReady = false;
let gaConfigured = false;
let adsConfigured = false;
let gtmLoaded = false;
let metaLoaded = false;
let vitalsReported = false;

function injectScript(src: string): void {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function ensureGtag(): void {
  if (gtagReady) return;
  gtagReady = true;
  window.dataLayer = window.dataLayer || [];
  // gtag.js solo procesa objetos `arguments`; si se empuja un array (rest params)
  // descarta el comando y GA4 nunca envía hits. Por eso no es una arrow function.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  injectScript(
    `https://www.googletagmanager.com/gtag/js?id=${TRACKING.GA_ID || TRACKING.GOOGLE_ADS_ID}`,
  );
}

/**
 * Aplica el consentimiento del visitante (idempotente). Analítica: GA4 y GTM.
 * Publicidad: Google Ads y Meta Pixel. Llamar en cada cambio de consentimiento:
 * carga lo nuevo que se permitió y, si se retiró un permiso, lo apaga.
 */
export function applyConsent(scopes: TrackingScopes): void {
  if (!hasTracking) return;
  granted.analytics = scopes.analytics;
  granted.ads = scopes.ads;

  if (gtagReady && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: scopes.analytics ? 'granted' : 'denied',
      ad_storage: scopes.ads ? 'granted' : 'denied',
      ad_user_data: scopes.ads ? 'granted' : 'denied',
      ad_personalization: scopes.ads ? 'granted' : 'denied',
    });
  }
  if (metaLoaded && window.fbq) window.fbq('consent', scopes.ads ? 'grant' : 'revoke');

  if (scopes.analytics) {
    if (TRACKING.GA_ID && !gaConfigured) {
      ensureGtag();
      gaConfigured = true;
      // SPA: desactivamos el page_view automático y lo enviamos por ruta (trackPageView).
      window.gtag?.('config', TRACKING.GA_ID, { send_page_view: false });
    }
    if (TRACKING.GTM_ID && !gtmLoaded) {
      gtmLoaded = true;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
      injectScript(`https://www.googletagmanager.com/gtm.js?id=${TRACKING.GTM_ID}`);
    }
    if (!vitalsReported) {
      vitalsReported = true;
      reportWebVitals();
    }
  }

  if (scopes.ads) {
    if (TRACKING.GOOGLE_ADS_ID && !adsConfigured) {
      ensureGtag();
      adsConfigured = true;
      window.gtag?.('config', TRACKING.GOOGLE_ADS_ID);
    }
    // Meta Pixel (bootstrap oficial de fbevents). El PageView lo envía trackPageView.
    if (TRACKING.META_PIXEL_ID && !metaLoaded) {
      metaLoaded = true;
      const n: any = function (...args: any[]) {
        if (n.callMethod) n.callMethod(...args);
        else n.queue.push(args);
      };
      if (!window._fbq) window._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      window.fbq = n;
      injectScript('https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', TRACKING.META_PIXEL_ID);
    }
  }
}

const canGoogle = () => Boolean(window.gtag) && (granted.analytics || granted.ads);
const canMeta = () => metaLoaded && granted.ads && Boolean(window.fbq);

/** Envía page_view en cada cambio de ruta del SPA. */
export function trackPageView(path: string): void {
  if (granted.analytics && gaConfigured && window.gtag) {
    window.gtag('event', 'page_view', {
      send_to: TRACKING.GA_ID,
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
  if (granted.analytics && gtmLoaded) window.dataLayer?.push({ event: 'page_view', page_path: path });
  if (canMeta()) window.fbq('track', 'PageView');
}

/** Evento personalizado (CTAs, clics, etc.). */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (canGoogle()) window.gtag?.('event', name, params);
  if (granted.analytics && gtmLoaded) window.dataLayer?.push({ event: name, ...params });
  if (canMeta()) window.fbq('trackCustom', name, params);
}

/** Conversión de lead: envío del formulario "Aplicar". */
export function trackLead(): void {
  if (canGoogle()) window.gtag?.('event', 'generate_lead');
  if (granted.ads && adsConfigured && TRACKING.GOOGLE_ADS_LABEL) {
    window.gtag?.('event', 'conversion', {
      send_to: `${TRACKING.GOOGLE_ADS_ID}/${TRACKING.GOOGLE_ADS_LABEL}`,
    });
  }
  if (granted.analytics && gtmLoaded) window.dataLayer?.push({ event: 'generate_lead' });
  if (canMeta()) window.fbq('track', 'Lead');
}

/** Navegación: Tiempo en pantalla */
export function trackTimeOnScreen(path: string, seconds: number): void {
  trackEvent('time_on_screen', { page_path: path, duration_seconds: seconds });
}

/** Navegación: Scroll Depth */
export function trackScrollDepth(path: string, depth: 25 | 50 | 75 | 100): void {
  trackEvent('scroll_depth', { page_path: path, depth_percentage: depth });
}

/** Abandono de Formulario (Partial Fills) */
export function trackFormAbandonment(formId: string, lastField: string): void {
  trackEvent('form_abandonment', { form_id: formId, last_field_focused: lastField });
}

/** Conversión Rápida (Contacto) */
export function trackContactClick(method: 'whatsapp' | 'email'): void {
  trackEvent('contact_click', { method });
}

/** Enlaces Externos e Internos */
export function trackLinkClick(url: string, type: 'external' | 'internal' = 'external'): void {
  trackEvent('link_click', { link_url: url, link_type: type });
}

/** Footer Legal */
export function trackLegalClick(doc: 'privacidad' | 'terminos'): void {
  trackEvent('legal_click', { document: doc });
}

/** Preferencias de Idioma */
export function trackLanguageChange(lang: string, isManual: boolean): void {
  trackEvent('language_preference', { language: lang, manual_change: isManual });
}

/** Interacción 3D (Núcleo Criptográfico) */
export function track3DInteraction(action: string): void {
  trackEvent('3d_core_interaction', { action });
}

/** Web Vitals: Envío a los datalayers */
function sendToAnalytics(metric: Metric) {
  if (!granted.analytics) return;
  const { name, delta, id, value } = metric;

  // Enviarlo a GA4 directamente si gtag está activo
  if (gaConfigured && window.gtag) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      // Google Analytics requires integer values for metrics
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      event_label: id,
      non_interaction: true,
    });
  }

  // GTM fallback
  if (gtmLoaded) window.dataLayer?.push({
    event: 'web_vitals',
    web_vitals_name: name,
    web_vitals_value: value,
    web_vitals_id: id,
  });
}

/** Inicializador de Web Vitals */
export function reportWebVitals(): void {
  onCLS(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onFCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}
