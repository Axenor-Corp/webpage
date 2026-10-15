import { useTranslation } from 'react-i18next';
import { Link } from '../components/ui/LocalizedLink';
import PageHeader from '../components/ui/PageHeader';
import CTABanner from '../components/ui/CTABanner';
import { useLanguage } from '../hooks/useLanguage';
import { formatDate } from '../lib/insights';
import { ARTICLES, articlePath, localizePath } from '../lib/routes';
import { SITE } from '../lib/seo';

/** Índice de artículos: /insights (src/lib/routes.ts, ARTICLES). */
export default function Insights() {
  const { t } = useTranslation('insights');
  const lang = useLanguage();
  const pageUrl = SITE + localizePath('/insights', lang);

  // JSON-LD CollectionPage con la lista de artículos.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#collection`,
    name: t('meta.title'),
    description: t('meta.description'),
    url: pageUrl,
    inLanguage: lang,
    isPartOf: { '@id': `${SITE}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: ARTICLES.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: SITE + articlePath(article, lang),
        name: t(`articles.${article.id}.title`),
      })),
    },
  };

  return (
    <>
      <PageHeader title={t('header.title')} subtitle={t('header.subtitle')} intro={t('header.intro')} />

      <section className="relative bg-surface py-20">
        <div className="mx-auto max-w-4xl space-y-8 px-6">
          {ARTICLES.map((article) => {
            const key = `articles.${article.id}`;
            return (
              <Link
                key={article.id}
                to={articlePath(article, 'es')}
                className="group block rounded-xl border-t-4 border-accent bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl md:p-10"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-accent-text">
                  {t(`${key}.tag`)}
                </span>
                <h2 className="mt-3 text-balance text-2xl font-bold text-carbon md:text-3xl">
                  {t(`${key}.title`)}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-carbon-soft/80">{t(`${key}.excerpt`)}</p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-carbon/10 pt-5">
                  <time dateTime={article.published} className="text-sm text-carbon-soft/70">
                    {formatDate(article.published, lang)}
                  </time>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-accent-text">
                    {t('labels.read')}
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 transition group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <CTABanner secondary="how" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
