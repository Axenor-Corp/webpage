import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackTimeOnScreen, trackScrollDepth } from '../lib/tracking';

export function useAdvancedTracking() {
  const { pathname } = useLocation();
  const startTime = useRef<number>(Date.now());
  const maxScroll = useRef<number>(0);
  const scrollMilestones = useRef(new Set<number>());

  useEffect(() => {
    // Reset para la nueva ruta
    startTime.current = Date.now();
    maxScroll.current = 0;
    scrollMilestones.current.clear();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height <= 0) return;
      
      const depth = Math.floor((scrollY / height) * 100);
      if (depth > maxScroll.current) {
        maxScroll.current = depth;
      }

      [25, 50, 75, 100].forEach((milestone) => {
        if (depth >= milestone && !scrollMilestones.current.has(milestone)) {
          scrollMilestones.current.add(milestone);
          trackScrollDepth(pathname, milestone as 25 | 50 | 75 | 100);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      if (timeSpent > 0) {
        trackTimeOnScreen(pathname, timeSpent);
      }
    };
  }, [pathname]);
}
