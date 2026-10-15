import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from './config';

// Misma clave que usaba i18next-browser-languagedetector: conserva la elección
// de quienes ya habían cambiado de idioma.
const STORAGE_KEY = 'i18nextLng';

/** Idioma preferido: el elegido antes en el selector o, si no, el del navegador. */
export function preferredLanguage(): Language {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    // almacenamiento bloqueado: se decide por el navegador
  }
  for (const code of [stored, ...navigator.languages, navigator.language]) {
    const base = code?.toLowerCase().split('-')[0];
    const match = LANGUAGES.find((lng) => lng === base);
    if (match) return match;
  }
  return DEFAULT_LANGUAGE;
}

/** Guarda la elección explícita del selector de idioma. */
export function rememberLanguage(lng: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // sin almacenamiento: la elección dura solo esta visita
  }
}
