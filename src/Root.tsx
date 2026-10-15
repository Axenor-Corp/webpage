import { Suspense } from 'react';
import App from './App.tsx';
import Logo from './components/ui/Logo';
import ErrorBoundary from './components/ui/ErrorBoundary';

function Loader() {
  // Logo sin `to` (no enlace), wordmark carbón sobre blanco.
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <Logo onDark={false} size={28} wordmarkClass="text-2xl" className="animate-pulse" />
    </div>
  );
}

/**
 * Árbol común al cliente (main.tsx) y al prerender (entry-server.tsx); cada
 * entrada solo aporta su router. Debe ser idéntico en ambos lados para que la
 * hidratación coincida con el HTML generado en build.
 */
export default function Root() {
  return (
    <ErrorBoundary>
      {/* Suspense cubre la carga diferida (lazy) de i18next y de las rutas. */}
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  );
}
