import { useEffect, useRef } from 'react';

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js';

interface TurnstileApi {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      callback: (token: string) => void;
      'expired-callback'?: () => void;
      'error-callback'?: () => void;
    },
  ) => string;
  remove: (id: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/** True si el captcha está activo en este build (hay site key configurada). */
export const TURNSTILE_ENABLED = Boolean(SITE_KEY);

let scriptPromise: Promise<void> | null = null;
function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      const s = document.createElement('script');
      s.src = SCRIPT_SRC;
      s.async = true;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('turnstile_script_failed'));
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

/**
 * Widget de Cloudflare Turnstile. Solo se monta si VITE_TURNSTILE_SITE_KEY está
 * definido en el build; si no, no renderiza nada y el formulario funciona igual
 * (el servidor solo exige token cuando TURNSTILE_SECRET está configurado).
 */
export default function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const key = SITE_KEY;
    const el = containerRef.current;
    if (!key || !el) return;

    let widgetId: string | null = null;
    let active = true;

    loadTurnstile()
      .then(() => {
        if (!active || !window.turnstile) return;
        widgetId = window.turnstile.render(el, {
          sitekey: key,
          callback: (token) => onToken(token),
          'expired-callback': () => onToken(''),
          'error-callback': () => onToken(''),
        });
      })
      .catch(() => {
        /* script bloqueado/offline: no se obtiene token; lo resuelve el servidor. */
      });

    return () => {
      active = false;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [onToken]);

  if (!SITE_KEY) return null;
  return <div ref={containerRef} className="min-h-[65px]" />;
}
