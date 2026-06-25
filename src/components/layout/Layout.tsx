import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import ScrollManager from './ScrollManager';
import RouteSeo from '../seo/RouteSeo';
import Analytics from '../analytics/Analytics';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useAdvancedTracking } from '../../hooks/useAdvancedTracking';

// three.js + R3F se cargan como chunk independiente: la UI pinta de inmediato
// y la escena aparece cuando termina de descargarse.
const Scene = lazy(() => import('../canvas/Scene'));

export default function Layout() {
  useScrollProgress();
  usePrefersReducedMotion();
  useAdvancedTracking();
  const { t } = useTranslation();

  return (
    <>
      {/* Capa Canvas 3D: fondo fijo compartido por todas las páginas */}
      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      {/* Capa UI */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
        >
          {t('skipToContent')}
        </a>
        <ScrollManager />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1">
          <Suspense fallback={<div className="min-h-screen" />}>
            <RouteSeo />
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>

      {/* Analítica consent-gated: banner de cookies + carga de trackers */}
      <Analytics />
    </>
  );
}
