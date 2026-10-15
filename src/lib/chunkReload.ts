// Tras un deploy, una pestaña abierta (o un HTML servido justo durante el cambio)
// puede pedir chunks que ya no existen y la ruta cae en el ErrorBoundary. Una
// recarga trae el HTML y los bundles nuevos. La marca en sessionStorage limita a
// una recarga cada 30 s para no entrar en bucle si el fallo es otro.
const KEY = 'axenor:chunk-reload';
const CHUNK_ERROR =
  /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|Unable to preload CSS/i;

export function isChunkLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return CHUNK_ERROR.test(message);
}

/** Recarga la página si no se hizo en los últimos 30 s. Devuelve true si recarga. */
export function reloadForNewDeploy(): boolean {
  try {
    const last = Number(sessionStorage.getItem(KEY) || 0);
    if (Date.now() - last < 30_000) return false;
    sessionStorage.setItem(KEY, String(Date.now()));
  } catch {
    return false;
  }
  window.location.reload();
  return true;
}
