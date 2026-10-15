import { useLocation } from 'react-router-dom';
import { LANGUAGES } from '../../i18n/config';
import { useLanguage } from '../../hooks/useLanguage';
import { alternatePath } from '../../lib/routes';
import { Link } from './LocalizedLink';

/**
 * Enlaza la misma página en el otro idioma (/servicios <-> /en/services). El
 * cambio de idioma de i18next lo hace LanguageSync al cambiar la URL, y
 * `keepScroll` evita que ScrollManager suba al inicio: se sigue leyendo en el
 * mismo punto, como cuando el idioma no cambiaba la URL.
 */
export default function LanguageSwitcher() {
  const { pathname } = useLocation();
  const current = useLanguage();

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Idioma / Language">
      {LANGUAGES.map((lng, index) => (
        <span key={lng} className="flex items-center gap-1.5">
          {index > 0 && <span className="text-white/30">/</span>}
          <Link
            to={alternatePath(pathname, lng)}
            locale={lng}
            state={{ keepScroll: true }}
            lang={lng}
            hrefLang={lng}
            aria-current={current === lng ? 'true' : undefined}
            aria-label={lng === 'es' ? 'Español' : 'English'}
            className={`text-sm uppercase tracking-wider transition-colors hover:text-accent ${
              current === lng ? 'font-semibold text-accent' : 'text-white/70'
            }`}
          >
            {lng}
          </Link>
        </span>
      ))}
    </div>
  );
}
