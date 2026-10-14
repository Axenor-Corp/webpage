/**
 * Faro: plataforma construida a la medida (y operada) por Axenor para un
 * programa de aceleración empresarial. Se presenta como caso de software a la
 * medida, no como producto de catálogo. El cliente y los participantes están bajo
 * confidencialidad: las capturas usan datos de demostración y no muestran
 * nombres reales ni logos de terceros. Textos en i18n faro:*.
 */

export type FaroRole = 'company' | 'mentor' | 'program';

export const FARO_SCREENS = [
  { key: 'journey', role: 'company', src: '/proyectos/faro/recorrido.webp' },
  { key: 'diagnostic', role: 'company', src: '/proyectos/faro/diagnostico.webp' },
  { key: 'bootcamp', role: 'company', src: '/proyectos/faro/bootcamp.webp' },
  { key: 'assistant', role: 'company', src: '/proyectos/faro/asistente.webp' },
  { key: 'mentor', role: 'mentor', src: '/proyectos/faro/mentor.webp' },
  { key: 'console', role: 'program', src: '/proyectos/faro/consola.webp' },
  { key: 'company', role: 'program', src: '/proyectos/faro/gestion.webp' },
] as const satisfies readonly { key: string; role: FaroRole; src: string }[];

export type FaroScreenKey = (typeof FARO_SCREENS)[number]['key'];

/**
 * Todas las capturas comparten tamaño (1140×860, recortadas al área útil de una
 * pantalla de 1440 px): evita saltos de layout. Ver FARO_ASPECT.
 */
export const FARO_SCREEN_SIZE = { width: 1140, height: 860 } as const;

/** Clase de Tailwind con la proporción de las capturas (1140/860 = 57/43). */
export const FARO_ASPECT = 'aspect-[57/43]';

export const FARO_ROLES: FaroRole[] = ['company', 'mentor', 'program'];

/** Cifras verificables del informe técnico de la plataforma (ago-2026). */
export const FARO_METRICS = [
  { key: 'companies', value: '85' },
  { key: 'questions', value: '147' },
  { key: 'canvases', value: '9' },
  { key: 'modes', value: '6' },
  { key: 'roles', value: '3' },
  { key: 'policies', value: '121' },
] as const;

export const FARO_MODULES = [
  'diagnostic',
  'journey',
  'bootcamp',
  'assistant',
  'mentoring',
  'documents',
  'agenda',
  'console',
] as const;

export const FARO_STACK = [
  'Next.js',
  'React 19',
  'TypeScript',
  'PostgreSQL',
  'pgvector',
  'Row-Level Security',
  'Google Cloud Run',
  'Vertex AI · Gemini',
  'Cloud Storage',
  'PWA + iOS',
];

export function faroScreen(key: FaroScreenKey) {
  return FARO_SCREENS.find((s) => s.key === key)!;
}
