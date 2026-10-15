import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { preferredLanguage } from '../../i18n/preference';

/**
 * El HTML prerenderizado está en el idioma por defecto. Este efecto corre
 * cuando su Suspense (el de la página, el más interno) terminó de hidratar, así
 * que cambiar de idioma aquí ya no choca con la hidratación. Sin prerender (dev)
 * el idioma ya es el preferido y no hace nada.
 */
export default function PreferredLanguage() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lng = preferredLanguage();
    if (i18n.language !== lng) void i18n.changeLanguage(lng);
  }, [i18n]);

  return null;
}
