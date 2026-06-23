import { lazy, Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import ScrollManager from './ScrollManager';
import RouteSeo from '../seo/RouteSeo';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useScrollProgress } from '../../hooks/useScrollProgress';

// three.js + R3F (~232KB gzip) se cargan como chunk independiente.
const Scene = lazy(() => import('../canvas/Scene'));

/**
 * ¿Vale la pena montar el fondo 3D? Se omite en dispositivos de puntero grueso
 * (móvil/tablet táctil, los más sensibles a batería/datos/INP) y con
 * prefers-reduced-motion. En equipos de escritorio (puntero fino) se mantiene el
 * fondo de marca; en el resto basta el fondo blanco y no se paga ni la descarga
 * del chunk de three.js ni el coste por-frame.
 */
function canRender3D(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  if (window.matchMedia('(pointer: coarse)').matches) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return true;
}

export default function Layout() {
  useScrollProgress();
  usePrefersReducedMotion();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [showScene, setShowScene] = useState(false);

  // La red 3D solo aporta en el Hero de Home; difiérela a idle y no la cargues
  // en rutas profundas (p. ej. /aplicar) ni en dispositivos donde no aporta.
  useEffect(() => {
    if (pathname !== '/' || !canRender3D()) {
      setShowScene(false);
      return;
    }
    const ric: (cb: () => void) => number =
      typeof window.requestIdleCallback === 'function'
        ? (cb) => window.requestIdleCallback(cb)
        : (cb) => window.setTimeout(cb, 250);
    const id = ric(() => setShowScene(true));
    return () => {
      if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, [pathname]);

  return (
    <>
      {/* Capa Canvas 3D: fondo fijo, montado bajo demanda */}
      {showScene && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}

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
    </>
  );
}
