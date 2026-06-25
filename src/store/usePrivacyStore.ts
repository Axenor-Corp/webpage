import { create } from 'zustand';

export interface PrivacyConsent {
  analytics: boolean;
  ads: boolean;
  aiTraining: boolean;
  admt: boolean;
  doNotSellShare: boolean; // CCPA
}

export interface PrivacyState {
  consent: PrivacyConsent | null; // null means unsettled (banner should show)
  isPrivacyCenterOpen: boolean;
  setConsent: (consent: PrivacyConsent) => void;
  updateConsent: (partial: Partial<PrivacyConsent>) => void;
  openPrivacyCenter: () => void;
  closePrivacyCenter: () => void;
  deleteAccount: () => Promise<void>;
}

const CONSENT_KEY = 'axenor_privacy_consent';

function loadInitialConsent(): PrivacyConsent | null {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      return JSON.parse(stored) as PrivacyConsent;
    }
    
    // GPC Interception: If Global Privacy Control is enabled in the browser,
    // we default to denying ads/sharing, but leave consent unsettled to show banner
    // or we could auto-settle. Let's auto-settle with safe defaults if GPC is present,
    // or just leave it null so banner shows but defaults are false.
    // The requirement: "Si recibes este header (o señal), tu código debe mutar el estado automáticamente para apagar los SDKs de publicidad sin exigirle al usuario que haga clic en tu banner."
    // We will use navigator.globalPrivacyControl if available.
    // @ts-expect-error - globalPrivacyControl is not standard in all TS lib typings yet
    const gpc = typeof navigator !== 'undefined' && navigator.globalPrivacyControl;
    if (gpc) {
      const gpcConsent: PrivacyConsent = {
        analytics: false,
        ads: false,
        aiTraining: false,
        admt: false,
        doNotSellShare: true, // GPC explicitly asks not to sell/share
      };
      localStorage.setItem(CONSENT_KEY, JSON.stringify(gpcConsent));
      return gpcConsent;
    }

    return null;
  } catch {
    return null;
  }
}

export const usePrivacyStore = create<PrivacyState>()((set, get) => ({
  consent: loadInitialConsent(),
  isPrivacyCenterOpen: false,
  
  setConsent: (consent) => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    } catch {
      // Ignore localStorage errors
    }
    set({ consent });
    
    // MOCK: Save preferences to Supabase
    // e.g., await supabase.from('user_preferences').upsert({ consent_ads: consent.ads, ai_training_consent: consent.aiTraining })
    console.log("MOCK: Saved preferences to Supabase `user_preferences`:", consent);
  },
  
  updateConsent: (partial) => {
    const current = get().consent || {
      analytics: false,
      ads: false,
      aiTraining: false,
      admt: false,
      doNotSellShare: false,
    };
    const newConsent = { ...current, ...partial };
    get().setConsent(newConsent);
  },
  
  openPrivacyCenter: () => set({ isPrivacyCenterOpen: true }),
  closePrivacyCenter: () => set({ isPrivacyCenterOpen: false }),
  
  deleteAccount: async () => {
    // MOCK: DELETE /api/users/me
    // Al dispararse ejecuta un webhook o función serverless que haga lo siguiente:
    // - Elimine (o anonimice criptográficamente) la fila en Supabase.
    // - Envíe una petición a los APIs de herramientas de terceros (ej. Segment, Mixpanel) para purgar su tracking.
    console.log("MOCK: Calling DELETE /api/users/me -> Supabase deletion, Third-party purge");
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Devuelva un estado al cliente frontend indicándole que borre todo el almacenamiento local
        localStorage.clear();
        sessionStorage.clear();
        console.log("MOCK: Local storage cleared to guarantee OS AI models don't keep residual data.");
        
        // Reset state
        set({ consent: null, isPrivacyCenterOpen: false });
        resolve();
      }, 1000);
    });
  }
}));
