import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSeo } from '../../hooks/useSeo';
import { routeNamespace, routeSeo } from '../../lib/seo';

/**
 * Se remonta en cada navegación (key={pathname}) para que useTranslation enlace
 * el namespace correcto desde el primer render. Cambiar el argumento `ns` de
 * useTranslation en caliente deja el `t` ligado al namespace anterior durante un
 * render; remontar lo evita de raíz.
 */
function RouteSeoInner({ pathname }: { pathname: string }) {
  const { t, i18n } = useTranslation(routeNamespace(pathname));
  useSeo(routeSeo(pathname, t, i18n.resolvedLanguage));
  return null;
}

/**
 * Componente sin render visible: en cada navegación aplica al <head> el título y
 * la descripción de la ruta desde i18n. Se monta dentro del Suspense de la
 * página, de modo que comparte el mismo estado de carga del namespace y nunca
 * muestra claves sin traducir.
 */
export default function RouteSeo() {
  const { pathname } = useLocation();
  return <RouteSeoInner key={pathname} pathname={pathname} />;
}
