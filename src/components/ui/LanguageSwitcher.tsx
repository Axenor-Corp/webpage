import { useTranslation } from 'react-i18next';

const LANGUAGES = ['es', 'en'] as const;

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? i18n.language;

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Idioma / Language">
      {LANGUAGES.map((lng, index) => (
        <span key={lng} className="flex items-center gap-1.5">
          {index > 0 && <span className="text-white/30">/</span>}
          <button
            type="button"
            onClick={() => i18n.changeLanguage(lng)}
            aria-pressed={current === lng}
            className={`text-sm uppercase tracking-wider transition-colors hover:text-accent ${
              current === lng ? 'font-semibold text-accent' : 'text-white/70'
            }`}
          >
            {lng}
          </button>
        </span>
      ))}
    </div>
  );
}
