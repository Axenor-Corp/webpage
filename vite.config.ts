import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// host 0.0.0.0: el dev server corre dentro de un contenedor (Podman) y debe
// ser accesible desde el navegador de la máquina host.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    // Endurecimiento del dev server (Zero Trust): solo responde a hosts
    // esperados (anti DNS-rebinding) y no sirve archivos fuera de la raíz.
    allowedHosts: ['localhost', '127.0.0.1'],
    fs: { strict: true },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
  build: {
    // Sin polyfill de modulePreload => Vite no inyecta script inline; permite
    // una CSP estricta con `script-src 'self'` (sin 'unsafe-inline' ni nonces).
    modulePreload: { polyfill: false },
  },
});
