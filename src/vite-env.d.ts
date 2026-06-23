/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Site key público de Cloudflare Turnstile. Si está definido, el formulario
   *  Aplicar muestra el captcha; si no, el form funciona sin captcha. */
  readonly VITE_TURNSTILE_SITE_KEY?: string;
}
