import { createClient } from '@supabase/supabase-js';

// Variables públicas (compiladas en el bundle). La seguridad de los datos vive
// en Row Level Security, no en ocultar esta key. Ver supabase/migrations/.
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Falla visible en consola si faltan las env vars (dev sin .env.local, etc.).
  console.error(
    'Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. Copia .env.example a .env.local (dev) y configúralas en Vercel (prod).',
  );
}

export const supabase = createClient(url, anonKey, {
  // Formulario público anónimo: sin sesión, no tocamos localStorage ni /auth/v1.
  auth: { persistSession: false, autoRefreshToken: false },
});

/** Forma de una fila insertable en public.applications. */
export interface ApplicationInsert {
  name: string;
  email: string;
  company: string | null;
  challenge: string;
  locale: 'es' | 'en';
}
