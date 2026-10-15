import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { baseOptions, type Language } from './config';

/**
 * Arranca i18next en `lng`, el idioma de la URL. Los cambios posteriores los
 * hace LanguageSync (en Layout) al navegar entre idiomas.
 */
export function initI18n(lng: Language): void {
  // Carga diferida: cada idioma se importa como chunk independiente solo cuando
  // se necesita (code-splitting de Vite sobre los JSON de locales).
  i18n
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`),
      ),
    )
    .use(initReactI18next)
    .init({
      ...baseOptions,
      lng,
      ns: ['common', 'services', 'how', 'contact', 'apply', 'about'],
    });

  i18n.on('languageChanged', (changed) => {
    document.documentElement.lang = changed;
  });
}

export default i18n;
