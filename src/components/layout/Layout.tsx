import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import ScrollManager from './ScrollManager';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useScrollProgress } from '../../hooks/useScrollProgress';

// three.js + R3F se cargan como chunk independiente: la UI pinta de inmediato
// y la escena aparece cuando termina de descargarse.
const Scene = lazy(() => import('../canvas/Scene'));

export default function Layout() {
  useScrollProgress();
  usePrefersReducedMotion();

  return (
    <>
      {/* Capa Canvas 3D: fondo fijo compartido por todas las páginas */}
      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      {/* Capa UI */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <ScrollManager />
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<div className="min-h-screen" />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}
