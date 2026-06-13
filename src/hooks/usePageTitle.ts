import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/** Actualiza document.title con meta.title del namespace de la página. */
export function usePageTitle(namespace: string) {
  const { t, i18n } = useTranslation(namespace);

  useEffect(() => {
    document.title = `${t('meta.title')} · Axenor Corporation S.A.S`;
  }, [t, i18n.resolvedLanguage]);
}
