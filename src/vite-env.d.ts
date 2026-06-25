/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Analítica/marketing (públicas por diseño; vacío = ese sistema no se carga).
  readonly VITE_GA_ID?: string;
  readonly VITE_GTM_ID?: string;
  readonly VITE_META_PIXEL_ID?: string;
  readonly VITE_GOOGLE_ADS_ID?: string;
  readonly VITE_GOOGLE_ADS_CONVERSION_LABEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
