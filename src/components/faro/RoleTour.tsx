import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SectionHeading from '../ui/SectionHeading';
import ScreenStage from './ScreenStage';
import { FARO_ROLES, FARO_SCREENS, type FaroRole, type FaroScreenKey } from '../../data/faro';

const ALL_SCREENS = FARO_SCREENS.map((s) => s.key);

function screensFor(role: FaroRole): FaroScreenKey[] {
  return FARO_SCREENS.filter((s) => s.role === role).map((s) => s.key);
}

/**
 * Recorrido interactivo por rol: se elige Empresa / Mentor / Equipo del
 * programa y cada pantalla de ese rol se abre en el marco de la derecha.
 */
export default function RoleTour() {
  const { t } = useTranslation('faro');
  const [role, setRole] = useState<FaroRole>('company');
  const [screen, setScreen] = useState<FaroScreenKey>(screensFor('company')[0]);

  const roleScreens = screensFor(role);
  const extras = t(`tour.extras.${role}`, { returnObjects: true }) as string[];

  const pickRole = (next: FaroRole) => {
    setRole(next);
    setScreen(screensFor(next)[0]);
  };

  return (
    <section id="recorrido" className="relative scroll-mt-16 bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading title={t('tour.title')} subtitle={t('tour.subtitle')} />

        <div
          role="tablist"
          aria-label={t('tour.rolesLabel')}
          className="mx-auto mb-12 flex max-w-xl rounded-lg bg-white p-1 shadow-sm"
        >
          {FARO_ROLES.map((r) => (
            <button
              key={r}
              type="button"
              role="tab"
              aria-selected={r === role}
              aria-controls="faro-tour-panel"
              onClick={() => pickRole(r)}
              className={`flex-1 rounded-md px-3 py-2.5 text-sm font-semibold transition ${
                r === role ? 'bg-carbon text-white' : 'text-carbon-soft/70 hover:text-carbon'
              }`}
            >
              {t(`roles.${r}`)}
            </button>
          ))}
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[4fr_8fr]">
          <div>
            <p className="text-lg leading-relaxed text-carbon">{t(`tour.roles.${role}`)}</p>
            <ul className="mt-6 space-y-3">
              {roleScreens.map((key) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => setScreen(key)}
                    aria-pressed={key === screen}
                    className={`w-full rounded-lg border-l-4 bg-white p-4 text-left transition ${
                      key === screen
                        ? 'border-accent shadow-md'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <span className="block font-semibold text-carbon">{t(`screens.${key}.title`)}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-carbon-soft/75">
                      {t(`screens.${key}.text`)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {extras.length > 0 && (
              <ul className="mt-6 space-y-3">
                {extras.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
                    <span className="leading-relaxed text-carbon-soft/85">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ScreenStage
            id="faro-tour-panel"
            keys={ALL_SCREENS}
            active={screen}
            className="order-first lg:sticky lg:top-24 lg:order-none"
          />
        </div>
        <p className="mt-10 text-center text-sm text-carbon-soft/60">{t('confidential')}</p>
      </div>
    </section>
  );
}
