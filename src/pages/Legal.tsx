import { useTranslation } from 'react-i18next';
import PageHeader from '../components/ui/PageHeader';

interface LegalSection {
  h: string;
  body: string;
}

interface LegalProps {
  /** Documento a renderizar; coincide con la clave en el namespace `legal`. */
  doc: 'privacidad' | 'terminos';
}

export default function Legal({ doc }: LegalProps) {
  const { t } = useTranslation('legal');
  const sections = t(`${doc}.sections`, { returnObjects: true }) as LegalSection[];

  return (
    <>
      <PageHeader title={t(`${doc}.title`)} />

      <section className="relative bg-white pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-sm text-carbon-soft/50">{t(`${doc}.updated`)}</p>
          <p className="mt-6 rounded-md border border-accent/30 bg-accent/5 px-4 py-3 text-sm text-carbon-soft/80">
            {t(`${doc}.note`)}
          </p>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <div key={section.h}>
                <h2 className="text-xl font-bold text-carbon">{section.h}</h2>
                <p className="mt-3 leading-relaxed text-carbon-soft/80">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
