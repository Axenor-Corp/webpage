import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { initI18n } from './i18n';
import { languageFromPath } from './lib/routes';
import Root from './Root';

const container = document.getElementById('root')!;

// El idioma lo decide la URL (/en/... = inglés), igual que en el prerender:
// así el primer render coincide con el HTML generado en build. En producción
// cada ruta llega prerenderizada (scripts/prerender.mjs) y se hidrata; en dev
// el contenedor llega vacío y se renderiza directo.
initI18n(languageFromPath(window.location.pathname));
const prerendered = container.hasChildNodes();

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
