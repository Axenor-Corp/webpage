import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { initI18n } from './i18n';
import { preferredLanguage } from './i18n/preference';
import { DEFAULT_LANGUAGE } from './i18n/config';
import Root from './Root';

const container = document.getElementById('root')!;

// En producción cada ruta llega prerenderizada (scripts/prerender.mjs) en el
// idioma por defecto: se hidrata en ese idioma para que el marcado coincida y
// el preferido del visitante se aplica al terminar (PreferredLanguage, en
// Layout). En dev el contenedor llega vacío y se renderiza directo.
const prerendered = container.hasChildNodes();
initI18n(prerendered ? DEFAULT_LANGUAGE : preferredLanguage());

const app = (
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>
);

if (prerendered) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
