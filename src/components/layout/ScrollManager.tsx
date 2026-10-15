import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Al cambiar de ruta: scroll al inicio; si hay hash, scroll al anchor.
 * Reintenta brevemente porque las páginas se cargan con React.lazy y el
 * elemento del anchor puede no existir todavía al disparar el efecto.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  const initial = useRef(true);

  useEffect(() => {
    const isInitial = initial.current;
    initial.current = false;

    if (!hash) {
      // En la carga inicial no se fuerza el scroll: el HTML prerenderizado ya
      // se ve antes de hidratar y el visitante pudo haberse desplazado.
      if (!isInitial) window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tryScroll = () => {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (attempts < 40) {
        // la página destino se carga con React.lazy + i18n diferido: puede
        // tardar varios segundos en montar el anchor en frío
        attempts += 1;
        timer = setTimeout(tryScroll, 150);
      }
    };
    tryScroll();
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
