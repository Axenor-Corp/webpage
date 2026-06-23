import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSeo, type SeoInput } from '../../hooks/useSeo';

/**
 * Mapa ruta -> namespace i18n. `key` es el prefijo cuando un namespace agrupa
 * varios documentos (p. ej. legal: privacidad/terminos). `bare` omite el sufijo
 * de marca en el título (la home ya lo lleva en su propio título).
 */
interface RouteMeta {
  ns: string;
  key?: string;
  bare?: boolean;
}

const BRAND = 'Axenor Corporation S.A.S';

const ROUTES: Record<string, RouteMeta> = {
  '/': { ns: 'home', bare: true },
  '/servicios': { ns: 'services' },
  '/como-trabajamos': { ns: 'how' },
  '/nosotros': { ns: 'about' },
  '/contacto': { ns: 'contact' },
  '/aplicar': { ns: 'apply' },
  '/glosario': { ns: 'glossary' },
  '/legal/privacidad': { ns: 'legal', key: 'privacidad' },
  '/legal/terminos': { ns: 'legal', key: 'terminos' },
};

/**
 * Se remonta en cada navegación (key={pathname}) para que useTranslation enlace
 * el namespace correcto desde el primer render. Cambiar el argumento `ns` de
 * useTranslation en caliente deja el `t` ligado al namespace anterior durante un
 * render; remontar lo evita de raíz.
 */
function RouteSeoInner({ pathname }: { pathname: string }) {
  const matched = ROUTES[pathname];
  const ns = matched?.ns ?? 'common';
  const { t, i18n } = useTranslation(ns);

  const ogLocale = i18n.resolvedLanguage === 'en' ? 'en_US' : 'es_CO';

  let input: SeoInput;
  if (!matched) {
    // Ruta desconocida (404): título genérico y noindex.
    input = {
      title: `${t('notFound.title')} · ${BRAND}`,
      description: t('notFound.text'),
      path: pathname,
      ogLocale,
      noindex: true,
    };
  } else {
    const prefix = matched.key ? `${matched.key}.` : '';
    const rawTitle = t(`${prefix}meta.title`);
    input = {
      title: matched.bare ? rawTitle : `${rawTitle} · ${BRAND}`,
      description: t(`${prefix}meta.description`),
      path: pathname,
      ogLocale,
    };
  }

  useSeo(input);
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
