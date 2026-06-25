import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { APPLY_ROUTE, NAV_ROUTES } from '../../data/company';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm uppercase tracking-wider transition-colors hover:text-accent ${
      isActive ? 'text-accent' : 'text-white/80'
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-carbon/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo to="/" />

        <div className="hidden items-center gap-7 md:flex">
          <ul className="flex items-center gap-6">
            {NAV_ROUTES.map(({ path, key }) => (
              <li key={path}>
                <NavLink to={path} end={path === '/'} className={linkClass}>
                  {t(`nav.${key}`)}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            to={APPLY_ROUTE.path}
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-accent/90"
          >
            {t(`nav.${APPLY_ROUTE.key}`)}
          </Link>
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          className="p-2 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-nav" className="border-t border-white/10 px-6 pb-6 pt-3 md:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_ROUTES.map(({ path, key }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === '/'}
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  {t(`nav.${key}`)}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to={APPLY_ROUTE.path}
                onClick={() => setOpen(false)}
                className="inline-block rounded-md bg-accent px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white"
              >
                {t(`nav.${APPLY_ROUTE.key}`)}
              </Link>
            </li>
          </ul>
          <div className="mt-5">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
