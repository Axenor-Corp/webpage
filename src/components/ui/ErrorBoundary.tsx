import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { BrandMark } from './Logo';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Captura errores de render (lo único que Suspense NO atrapa) para que un fallo
 * puntual no deje la SPA en blanco. Es una clase porque getDerivedStateFromError /
 * componentDidCatch no tienen equivalente en hooks.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary', error, info.componentStack);
  }

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-6 text-center">
        <span className="inline-flex items-center gap-2.5">
          <BrandMark size={28} />
          <span className="text-2xl font-bold uppercase tracking-[0.3em] text-carbon">
            AXENOR<span className="text-accent">.</span>
          </span>
        </span>
        <div>
          <p className="text-lg font-semibold text-carbon">
            Algo salió mal · Something went wrong
          </p>
          <p className="mt-2 max-w-md text-sm text-carbon-soft/70">
            Ocurrió un error inesperado. Recarga la página o vuelve al inicio. /
            An unexpected error occurred. Reload the page or go back home.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-md bg-accent px-6 py-2.5 font-semibold text-white transition hover:bg-accent/90"
          >
            Recargar / Reload
          </button>
          <a
            href="/"
            className="rounded-md border-2 border-carbon px-6 py-2.5 font-semibold text-carbon transition hover:border-accent hover:text-accent"
          >
            Inicio / Home
          </a>
        </div>
      </div>
    );
  }
}
