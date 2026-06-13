import { create } from 'zustand';

export interface AppState {
  /** progreso de scroll dentro del primer viewport (0 → 1), consumido por la escena 3D */
  heroProgress: number;
  /** prefers-reduced-motion del sistema: desactiva drift, tilt y parallax */
  reducedMotion: boolean;
  setHeroProgress: (progress: number) => void;
  setReducedMotion: (reduced: boolean) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  heroProgress: 0,
  reducedMotion: false,
  setHeroProgress: (heroProgress) => set({ heroProgress }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
}));
