/** Listado de los 6 servicios oficiales de Axenor (claves de i18n services:items.*). */
export const SERVICE_KEYS = [
  'ai',
  'cybersecurity',
  'infrastructure',
  'cloud',
  'critical',
  'software',
] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];

/** Anchors estables (en español) para deep-linking dentro de /servicios. */
export const SERVICE_ANCHORS: Record<ServiceKey, string> = {
  ai: 'inteligencia-artificial',
  cybersecurity: 'ciberseguridad',
  infrastructure: 'infraestructura',
  cloud: 'cloud',
  critical: 'servicios-criticos',
  software: 'solucion-software',
};
