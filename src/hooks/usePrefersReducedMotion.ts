import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

/**
 * Sincroniza prefers-reduced-motion del sistema con el store global.
 * La escena 3D y los efectos tilt lo respetan desactivando el movimiento.
 */
export function usePrefersReducedMotion() {
  const setReducedMotion = useAppStore((s) => s.setReducedMotion);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, [setReducedMotion]);
}
