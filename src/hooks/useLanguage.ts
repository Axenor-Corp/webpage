import { useLocation } from 'react-router-dom';
import type { Language } from '../i18n/config';
import { languageFromPath } from '../lib/routes';

/** Idioma de la página actual, según su URL (/en/... = inglés). */
export function useLanguage(): Language {
  return languageFromPath(useLocation().pathname);
}
