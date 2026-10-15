import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';

/**
 * El idioma lo decide la URL. La carga inicial ya arranca en el idioma de la
 * URL (main.tsx); esto cubre la navegación posterior entre idiomas (atrás /
 * adelante, enlaces). El selector de idioma cambia el idioma antes de navegar,
 * así que al llegar aquí ya coincide y no hace nada.
 */
export default function LanguageSync() {
  const lng = useLanguage();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== lng) void i18n.changeLanguage(lng);
  }, [i18n, lng]);

  return null;
}
