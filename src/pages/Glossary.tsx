import { useTranslation } from 'react-i18next';
import PageHeader from '../components/ui/PageHeader';
import CTABanner from '../components/ui/CTABanner';

interface GlossaryTerm {
  slug: string;
  term: string;
  category: string;
  short: string;
  body: string;
}


const SITE = 'https://web.axenorcorporations.com';

export default function Glossary() {
  const { t } = useTranslation('glossary');
  const categories = t('categories', { returnObjects: true }) as string[];
  const terms = t('terms', { returnObjects: true }) as GlossaryTerm[];

  // JSON-LD DefinedTermSet: cada definición como entidad citable para buscadores
  // y motores de IA (consultas "qué es X / what is X").
  const termSet = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: t('meta.title'),
    url: `${SITE}/glosario`,
    hasDefinedTerm: terms.map((term) => ({
      '@type': 'DefinedTerm',
      '@id': `${SITE}/glosario#${term.slug}`,
      name: term.term,
      description: term.short,
    })),
  };

  return (
    <>
      <PageHeader
        title={t('header.title')}
        subtitle={t('header.subtitle')}
        intro={t('header.intro')}
      />

      <section className="relative bg-white pb-24">
        <div className="mx-auto max-w-4xl px-6">
          {categories.map((category) => {
            const items = terms.filter((term) => term.category === category);
            if (items.length === 0) return null;
            return (
              <div key={category} className="mb-16">
                <h2 className="mb-8 border-b border-carbon/10 pb-3 text-sm font-bold uppercase tracking-widest text-accent">
                  {category}
                </h2>
                <dl className="space-y-10">
                  {items.map((term) => (
                    <div key={term.slug} id={term.slug} className="scroll-mt-24">
                      <dt className="text-xl font-bold text-carbon">{term.term}</dt>
                      <dd className="mt-2 leading-relaxed text-carbon-soft/85">{term.short}</dd>
                      <dd className="mt-2 text-sm leading-relaxed text-carbon-soft/60">{term.body}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            );
          })}
        </div>
      </section>

      <CTABanner secondary="how" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termSet) }}
      />
    </>
  );
}
