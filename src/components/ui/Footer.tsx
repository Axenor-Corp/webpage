import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LinkedInIcon from './LinkedInIcon';
import Logo from './Logo';
import { APPLY_ROUTE, COMPANY_LINKEDIN, CONTACT, NAV_ROUTES } from '../../data/company';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const links = [...NAV_ROUTES.filter(({ path }) => path !== '/'), APPLY_ROUTE];

  return (
    <footer className="relative bg-carbon py-14 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
        <div>
          <Logo to="/" size={20} wordmarkClass="text-base" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            {t('footer.tagline')}
          </p>
          <a
            href={COMPANY_LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block text-white/60 transition-colors hover:text-accent"
            aria-label="LinkedIn Axenor Corporations"
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
        </div>

        <nav aria-label={t('footer.navTitle')}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
            {t('footer.navTitle')}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {links.map(({ path, key }) => (
              <li key={path}>
                <Link to={path} className="text-sm text-white/70 transition-colors hover:text-accent">
                  {t(`nav.${key}`)}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/glosario" className="text-sm text-white/70 transition-colors hover:text-accent">
                {t('footer.glossary')}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
            {t('footer.contactTitle')}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li>
              <a href={`mailto:${CONTACT.email}`} className="break-all transition-colors hover:text-accent">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={CONTACT.phoneHref} className="transition-colors hover:text-accent">
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>Bogotá, Colombia</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 px-6 pt-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-white/50">
            © {year} Axenor Corporation S.A.S · {t('footer.rights')}
          </p>
          <nav className="flex gap-5 text-sm text-white/50" aria-label={t('footer.legalLabel')}>
            <Link to="/legal/privacidad" className="transition-colors hover:text-accent">
              {t('footer.privacy')}
            </Link>
            <Link to="/legal/terminos" className="transition-colors hover:text-accent">
              {t('footer.terms')}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
