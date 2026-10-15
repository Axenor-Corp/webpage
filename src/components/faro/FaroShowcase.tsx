import { useEffect, useState } from 'react';
import { Link } from '../ui/LocalizedLink';
import { useTranslation } from 'react-i18next';
import ScreenStage from './ScreenStage';
import { FARO_METRICS } from '../../data/faro';
import { useReveal } from '../../hooks/useReveal';
import { useAppStore } from '../../store/useAppStore';

const SHOWCASE_SCREENS = ['journey', 'diagnostic', 'bootcamp', 'assistant', 'mentor', 'console'] as const;
const SHOWCASE_METRICS = FARO_METRICS.filter((m) => ['companies', 'canvases', 'modes'].includes(m.key));
const AUTOPLAY_MS = 5000;

/**
 * Propuesta 1 · Caso destacado en la Home: banda oscura con texto corto, tres
 * cifras y capturas que rotan solas. La rotación se detiene al pasar el ratón,
 * al enfocar con teclado, al elegir una pestaña o con movimiento reducido.
 */
export default function FaroShowcase() {
  const { t } = useTranslation('faro');
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const reveal = useReveal<HTMLDivElement>(0.2);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userPicked, setUserPicked] = useState(false);

  const autoplay = reveal.visible && !paused && !userPicked && !reducedMotion;

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % SHOWCASE_SCREENS.length),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(id);
  }, [autoplay]);

  const active = SHOWCASE_SCREENS[index];

  return (
    <section id="faro" className="relative scroll-mt-16 overflow-hidden bg-carbon py-24 text-white">
      <div
        ref={reveal.ref}
        className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[4fr_7fr]"
      >
        <div
          className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
            reveal.visible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
          }`}
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            {t('showcase.kicker')}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            {t('showcase.title')}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">{t('showcase.text')}</p>

          <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-white/10 py-6">
            {SHOWCASE_METRICS.map(({ key, value }) => (
              <div key={key} className="flex flex-col-reverse justify-end">
                <dt className="mt-1 text-sm leading-snug text-white/60">{t(`metrics.${key}`)}</dt>
                <dd className="text-3xl font-bold text-accent md:text-4xl">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/casos/faro"
              className="rounded-md bg-accent px-7 py-3 font-semibold text-white shadow-lg shadow-accent/20 transition hover:bg-accent/90"
            >
              {t('showcase.cta')}
            </Link>
            <Link
              to="/contacto"
              className="rounded-md border-2 border-white/30 px-7 py-3 font-semibold text-white transition hover:border-accent hover:text-accent"
            >
              {t('showcase.ctaSecondary')}
            </Link>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-white/40">{t('confidential')}</p>
        </div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <ScreenStage id="faro-showcase-panel" keys={SHOWCASE_SCREENS} active={active} />

          <div
            role="tablist"
            aria-label={t('showcase.tabsLabel')}
            className="mt-5 flex flex-wrap justify-center gap-2"
          >
            {SHOWCASE_SCREENS.map((key, i) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-controls="faro-showcase-panel"
                onClick={() => {
                  setIndex(i);
                  setUserPicked(true);
                }}
                className={`relative overflow-hidden rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                  i === index
                    ? 'bg-white text-carbon'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {t(`screens.${key}.tab`)}
                {i === index && autoplay && (
                  <span
                    key={index}
                    className="faro-progress absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
                    style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-white/55" aria-live="polite">
            {t(`screens.${active}.title`)}
          </p>
        </div>
      </div>
    </section>
  );
}
