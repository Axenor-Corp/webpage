import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './i18n';
import App from './App.tsx';
import Logo from './components/ui/Logo';

function Loader() {
  // Fuera del Router: Logo sin `to` (no enlace), wordmark carbón sobre blanco.
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <Logo onDark={false} size={28} wordmarkClass="text-2xl" className="animate-pulse" />
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Suspense cubre la carga diferida (lazy) de los recursos de i18next */}
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </StrictMode>,
);
