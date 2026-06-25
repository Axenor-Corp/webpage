// Carga de analítica/marketing (GA4, GTM, Meta Pixel, Google Ads).
// Los scripts se inyectan desde este módulo bundleado (script 'self'); el sistema
// es INERTE si no hay IDs configurados. loadTrackers() se llama SOLO tras el
// consentimiento del visitante (ver components/analytics/Analytics.tsx).
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

let loaded = false;

function injectScript(src: string): void {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/** Carga los trackers configurados (idempotente). Llamar SOLO con consentimiento. */
export function loadTrackers(): void {
  if (loaded || !hasTracking) return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];

  // GA4 + Google Ads comparten gtag.js
  if (TRACKING.GA_ID || TRACKING.GOOGLE_ADS_ID) {
    injectScript(
      `https://www.googletagmanager.com/gtag/js?id=${TRACKING.GA_ID || TRACKING.GOOGLE_ADS_ID}`,
    );
    const gtag: AnyFn = (...args) => {
      window.dataLayer.push(args);
    };
    window.gtag = gtag;
    gtag('js', new Date());
    // SPA: desactivamos el page_view automático y lo enviamos por ruta (trackPageView).
    if (TRACKING.GA_ID) gtag('config', TRACKING.GA_ID, { send_page_view: false });
    if (TRACKING.GOOGLE_ADS_ID) gtag('config', TRACKING.GOOGLE_ADS_ID);
  }

  // Google Tag Manager
  if (TRACKING.GTM_ID) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    injectScript(`https://www.googletagmanager.com/gtm.js?id=${TRACKING.GTM_ID}`);
  }

  // Meta Pixel (bootstrap oficial de fbevents)
  if (TRACKING.META_PIXEL_ID) {
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
    window.fbq('track', 'PageView');
  }

  // Reportar Web Vitals a GA4/GTM
  reportWebVitals();
}

/** Envía page_view en cada cambio de ruta del SPA. */
export function trackPageView(path: string): void {
  if (!loaded) return;
  if (TRACKING.GA_ID && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
  window.dataLayer?.push({ event: 'page_view', page_path: path });
  if (TRACKING.META_PIXEL_ID && window.fbq) window.fbq('track', 'PageView');
}

/** Evento personalizado (CTAs, clics, etc.). */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (!loaded) return;
  if (window.gtag) window.gtag('event', name, params);
  window.dataLayer?.push({ event: name, ...params });
  if (window.fbq) window.fbq('trackCustom', name, params);
}

/** Conversión de lead: envío del formulario "Aplicar". */
export function trackLead(): void {
  if (!loaded) return;
  if (window.gtag) {
    window.gtag('event', 'generate_lead');
    if (TRACKING.GOOGLE_ADS_ID && TRACKING.GOOGLE_ADS_LABEL) {
      window.gtag('event', 'conversion', {
        send_to: `${TRACKING.GOOGLE_ADS_ID}/${TRACKING.GOOGLE_ADS_LABEL}`,
      });
    }
  }
  window.dataLayer?.push({ event: 'generate_lead' });
  if (window.fbq) window.fbq('track', 'Lead');
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
  const { name, delta, id, value } = metric;
  
  // Enviarlo a GA4 directamente si gtag está activo
  if (window.gtag) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      // Google Analytics requires integer values for metrics
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      event_label: id,
      non_interaction: true,
    });
  }

  // GTM fallback
  window.dataLayer?.push({
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
