/**
 * Entrada de prerender (SSG). Solo se usa en build: `vite build --ssr` la
 * compila y scripts/prerender.mjs llama a render() por cada ruta de ROUTES.
 */
import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import Root from './Root';
import { baseOptions, DEFAULT_LANGUAGE } from './i18n/config';
import { ROUTES, SITE, routeNamespace, routeSeo, type SeoInput } from './lib/seo';

// En build los textos van empaquetados (sin carga diferida): useTranslation
// nunca suspende y el HTML sale completo.
const locales = import.meta.glob<Record<string, unknown>>('./i18n/locales/*/*.json', {
  eager: true,
  import: 'default',
});

const resources: Record<string, Record<string, Record<string, unknown>>> = {};
for (const [file, data] of Object.entries(locales)) {
  const [, lng, ns] = /\/locales\/([^/]+)\/([^/]+)\.json$/.exec(file)!;
  resources[lng] ??= {};
  resources[lng][ns] = data;
}

const i18n = createInstance();
void i18n.use(initReactI18next).init({
  ...baseOptions,
  lng: DEFAULT_LANGUAGE,
  ns: Object.keys(resources[DEFAULT_LANGUAGE]),
  resources,
  initAsync: false,
  showSupportNotice: false,
});

export { SITE };

/** Rutas a prerenderizar. */
export const routes = Object.keys(ROUTES);

export interface RenderResult {
  /** Marcado de la app para el interior de <div id="root">. */
  html: string;
  seo: SeoInput;
  lang: string;
}

/** Renderiza `url` esperando a que resuelvan todas las rutas lazy. */
export async function render(url: string): Promise<RenderResult> {
  const errors: unknown[] = [];
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <Root />
      </StaticRouter>
    </StrictMode>,
    {
      // Sin límite: React no "parte" los Suspense grandes en fragmentos que se
      // completan con <script> inline al final; cada página sale en orden.
      progressiveChunkSize: Number.POSITIVE_INFINITY,
      onError(error) {
        errors.push(error);
      },
    },
  );
  const html = await new Response(prelude).text();
  // Un error dentro de un Suspense no rompe el render (React deja ese tramo
  // para el cliente), pero en build significa una página incompleta.
  if (errors.length > 0) throw errors[0];

  const t = i18n.getFixedT(DEFAULT_LANGUAGE, routeNamespace(url));
  return { html, seo: routeSeo(url, t, DEFAULT_LANGUAGE), lang: DEFAULT_LANGUAGE };
}
