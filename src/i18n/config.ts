import type { InitOptions } from 'i18next';

export const LANGUAGES = ['es', 'en'] as const;
export type Language = (typeof LANGUAGES)[number];

/** Idioma de las URLs canónicas y del HTML prerenderizado. */
export const DEFAULT_LANGUAGE: Language = 'es';

/**
 * Opciones comunes al cliente (i18n/index.ts) y al prerender
 * (entry-server.tsx): si difieren, el texto renderizado en build no coincide
 * con el del cliente y la hidratación falla.
 */
export const baseOptions = {
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: [...LANGUAGES],
  nonExplicitSupportedLngs: true,
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
} satisfies InitOptions;
