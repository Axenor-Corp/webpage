import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';

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

// Toda ruta indexable debe figurar también en ROUTES (src/lib/seo.ts): de ahí
// salen su <head> y su HTML prerenderizado en el build.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="servicios" element={<Services />} />
        <Route path="casos" element={<Cases />} />
        <Route path="casos/faro" element={<CaseFaro />} />
        <Route path="casos/autodiagnostico-emprendedores" element={<CaseHosting />} />
        <Route path="como-trabajamos" element={<HowWeWork />} />
        <Route path="nosotros" element={<About />} />
        <Route path="contacto" element={<Contact />} />
        <Route path="aplicar" element={<Apply />} />
        <Route path="glosario" element={<Glossary />} />
        <Route path="legal/privacidad" element={<PrivacyPolicy />} />
        <Route path="legal/terminos" element={<TermsAndConditions />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
