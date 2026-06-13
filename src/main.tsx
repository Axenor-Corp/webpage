import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './i18n';
import App from './App.tsx';

function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <span className="animate-pulse text-2xl font-bold tracking-[0.3em] text-carbon">
        AXENOR<span className="text-accent">.</span>
      </span>
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
