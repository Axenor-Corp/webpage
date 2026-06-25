import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Cada página es un chunk independiente (code-splitting por ruta).
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const HowWeWork = lazy(() => import('./pages/HowWeWork'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Apply = lazy(() => import('./pages/Apply'));
const Glossary = lazy(() => import('./pages/Glossary'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="servicios" element={<Services />} />
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
