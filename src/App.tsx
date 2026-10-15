import { lazy, type ComponentType } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { LANGUAGES } from './i18n/config';
import { PAGES, type PageId } from './lib/routes';

// Cada página es un chunk independiente (code-splitting por ruta).
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Cases = lazy(() => import('./pages/Cases'));
const CaseFaro = lazy(() => import('./pages/CaseFaro'));
const CaseHosting = lazy(() => import('./pages/CaseHosting'));
const HowWeWork = lazy(() => import('./pages/HowWeWork'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Apply = lazy(() => import('./pages/Apply'));
const Glossary = lazy(() => import('./pages/Glossary'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Cada página existe en los dos idiomas (src/lib/routes.ts): /servicios y
// /en/services montan el mismo componente; el idioma lo toma i18n de la URL.
const PAGE_COMPONENTS: Record<PageId, ComponentType> = {
  home: Home,
  services: Services,
  cases: Cases,
  caseFaro: CaseFaro,
  caseHosting: CaseHosting,
  how: HowWeWork,
  about: About,
  contact: Contact,
  apply: Apply,
  glossary: Glossary,
  privacy: PrivacyPolicy,
  terms: TermsAndConditions,
};

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {PAGES.flatMap((page) => {
          const Page = PAGE_COMPONENTS[page.id];
          return LANGUAGES.map((lng) => (
            <Route key={page.paths[lng]} path={page.paths[lng]} element={<Page />} />
          ));
        })}
        {/* /en/... desconocido también cae aquí: NotFound sale en inglés. */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
