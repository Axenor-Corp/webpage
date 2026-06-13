import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

/**
 * Publica en el store el progreso de scroll dentro del primer viewport (0 → 1).
 * La escena 3D lo consume para desvanecer y desplazar la red de nodos al salir del Hero.
 */
export function useScrollProgress() {
  useEffect(() => {
    const onScroll = () => {
      const viewport = window.innerHeight || 1;
      const progress = Math.min(window.scrollY / viewport, 1);
      useAppStore.getState().setHeroProgress(progress);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}
