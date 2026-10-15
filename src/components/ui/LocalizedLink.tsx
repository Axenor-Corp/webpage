// Único punto donde se usan Link/NavLink de React Router (ver eslint.config.js).
// eslint-disable-next-line no-restricted-imports
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';
import type { LinkProps, NavLinkProps, To } from 'react-router-dom';
import type { Language } from '../../i18n/config';
import { useLanguage } from '../../hooks/useLanguage';
import { localizePath } from '../../lib/routes';

function localize(to: To, lng: Language): To {
  if (typeof to === 'string') return localizePath(to, lng);
  return to.pathname ? { ...to, pathname: localizePath(to.pathname, lng) } : to;
}

interface Localized {
  /** Idioma de destino; por defecto, el de la página actual. */
  locale?: Language;
}

/**
 * Link de React Router que lleva la ruta al idioma de la página actual: los
 * componentes escriben las rutas en español ('/servicios#cloud') y en una
 * página /en/... el enlace sale como '/en/services#cloud'.
 */
export function Link({ to, locale, ...props }: LinkProps & Localized) {
  const current = useLanguage();
  return <RouterLink to={localize(to, locale ?? current)} {...props} />;
}

/** NavLink con la misma traducción de ruta que Link. */
export function NavLink({ to, locale, ...props }: NavLinkProps & Localized) {
  const current = useLanguage();
  return <RouterNavLink to={localize(to, locale ?? current)} {...props} />;
}
