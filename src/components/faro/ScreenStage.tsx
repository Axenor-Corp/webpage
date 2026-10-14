import { useTranslation } from 'react-i18next';
import BrowserFrame from './BrowserFrame';
import { FARO_ASPECT, FARO_SCREEN_SIZE, faroScreen, type FaroScreenKey } from '../../data/faro';

interface ScreenStageProps {
  /** capturas apiladas en el marco (todas se precargan para el fundido) */
  keys: readonly FaroScreenKey[];
  active: FaroScreenKey;
  className?: string;
  /** id para enlazar el panel con su tablist (aria-controls) */
  id?: string;
}

/**
 * Capturas de Faro apiladas dentro de un marco de navegador: solo la activa es
 * visible y el cambio es un fundido cruzado (sin salto de layout: proporción fija).
 */
export default function ScreenStage({ keys, active, className, id }: ScreenStageProps) {
  const { t } = useTranslation('faro');

  return (
    <BrowserFrame label={t('frame.label')} className={className}>
      <div id={id} role="tabpanel" className={`relative ${FARO_ASPECT} bg-white`}>
        {keys.map((key) => {
          const on = key === active;
          return (
            <img
              key={key}
              src={faroScreen(key).src}
              width={FARO_SCREEN_SIZE.width}
              height={FARO_SCREEN_SIZE.height}
              alt={on ? t(`screens.${key}.alt`) : ''}
              aria-hidden={!on}
              decoding="async"
              loading={on ? 'eager' : 'lazy'}
              className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 motion-reduce:transition-none ${
                on ? 'opacity-100' : 'opacity-0'
              }`}
            />
          );
        })}
      </div>
    </BrowserFrame>
  );
}

/** Una sola captura en su marco (páginas de caso, sin interacción). */
export function ScreenShot({ screen, className }: { screen: FaroScreenKey; className?: string }) {
  const { t } = useTranslation('faro');

  return (
    <BrowserFrame label={t('frame.label')} className={className}>
      <img
        src={faroScreen(screen).src}
        width={FARO_SCREEN_SIZE.width}
        height={FARO_SCREEN_SIZE.height}
        alt={t(`screens.${screen}.alt`)}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
    </BrowserFrame>
  );
}
