import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * false en el prerender y durante la hidratación; true después (y desde el
 * primer render cuando no hay HTML que hidratar). Para lo que solo existe en
 * el navegador, como el canvas WebGL.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
