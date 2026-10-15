import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link } from '../components/ui/LocalizedLink';
import CTABanner from '../components/ui/CTABanner';
import { ArticleBlockView, Inline } from '../components/insights/ArticleContent';
import { useLanguage } from '../hooks/useLanguage';
import { formatDate, plainText, readingMinutes, type ArticleFaq, type ArticleSection } from '../lib/insights';
import { articlePath, findArticle, localizePath } from '../lib/routes';
import { SITE } from '../lib/seo';

const BRAND = 'Axenor Corporation S.A.S';

/**
 * Artículo de /insights/<slug> (y /en/insights/<slug>). Título, descripción y
 * etiqueta vienen de insights.json (articles.<id>); el cuerpo, del namespace
 * insight-<id>. Cada artículo lleva JSON-LD Article + BreadcrumbList + FAQPage.
 */
export default function InsightArticle() {
  const { pathname } = useLocation();
  // App.tsx solo monta esta página en las URL de ARTICLES.
  const article = findArticle(pathname)!;
  const lang = useLanguage();
  const ns = `insight-${article.id}`;
  // Un solo useTranslation: los dos namespaces se cargan en paralelo.
  const { t } = useTranslation(['insights', ns]);

  const key = `articles.${article.id}`;
  const title = t(`${key}.title`);
  const tag = t(`${key}.tag`);
  const lead = t('lead', { ns });
  const sections = t('sections', { ns, returnObjects: true }) as ArticleSection[];
  const faq = t('faq', { ns, returnObjects: true }) as ArticleFaq;
  const minutes = readingMinutes(lead, sections, faq);

  const url = SITE + articlePath(article, lang);
  const indexUrl = SITE + localizePath('/insights', lang);
  const organization = { '@type': 'Organization', '@id': `${SITE}/#organization`, name: BRAND, url: `${SITE}/` };

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: title,
        description: t(`${key}.meta.description`),
        articleSection: tag,
        inLanguage: lang,
        datePublished: article.published,
        dateModified: article.modified,
        author: organization,
        publisher: {
          ...organization,
          logo: { '@type': 'ImageObject', url: `${SITE}/apple-touch-icon.png` },
        },
        image: `${SITE}/og.png`,
        url,
        mainEntityOfPage: url,
        isPartOf: { '@id': `${SITE}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { name: t('nav.inicio', { ns: 'common' }), item: SITE + localizePath('/', lang) },
          { name: t('header.title'), item: indexUrl },
          { name: title, item: url },
        ].map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, ...crumb })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: faq.items.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: plainText(a) },
        })),
      },
    ],
  };

  return (
    <>
      <article>
        {/* Cabecera transparente sobre la red 3D, como el resto de páginas */}
        <header className="relative px-6 pb-12 pt-36">
          <div className="mx-auto max-w-3xl">
            <nav aria-label={t('labels.breadcrumb')}>
              <ol className="flex flex-wrap items-center gap-2 text-sm">
                <li>
                  <Link to="/insights" className="font-semibold text-accent-text hover:underline">
                    {t('header.title')}
                  </Link>
                </li>
                <li aria-hidden="true" className="text-carbon-soft/40">
                  /
                </li>
                <li className="text-carbon-soft/70">{tag}</li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-carbon md:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-carbon-soft/80">{lead}</p>
            <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-carbon/10 pt-5 text-sm text-carbon-soft/70">
              <span>
                {t('labels.by')} <span className="font-semibold text-carbon">{BRAND}</span>
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.published}>{formatDate(article.published, lang)}</time>
              <span aria-hidden="true">·</span>
              <span>{t('labels.readingTime', { count: minutes })}</span>
            </p>
          </div>
        </header>

        <div className="relative bg-white pb-24 pt-14">
          <div className="mx-auto max-w-3xl px-6">
            <nav aria-labelledby="toc-title" className="rounded-xl bg-surface p-6 md:p-8">
              <p id="toc-title" className="text-xs font-bold uppercase tracking-widest text-accent-text">
                {t('labels.toc')}
              </p>
              <ol className="mt-4 space-y-2.5">
                {[...sections, { id: 'faq', title: faq.title }].map((section, index) => (
                  <li key={section.id} className="flex gap-3">
                    <span className="w-6 shrink-0 font-semibold tabular-nums text-accent-text">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Link
                      to={`#${section.id}`}
                      className="text-carbon-soft/85 transition-colors hover:text-accent-text"
                    >
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            {sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id} className="mt-16">
                <h2
                  id={section.id}
                  className="scroll-mt-24 text-balance text-2xl font-bold tracking-tight text-carbon md:text-3xl"
                >
                  {section.title}
                </h2>
                <div className="mt-6 space-y-6">
                  {section.blocks.map((block, index) => (
                    <ArticleBlockView key={index} block={block} />
                  ))}
                </div>
              </section>
            ))}

            <section aria-labelledby="faq" className="mt-20 border-t border-carbon/10 pt-14">
              <h2 id="faq" className="scroll-mt-24 text-2xl font-bold tracking-tight text-carbon md:text-3xl">
                {faq.title}
              </h2>
              <div className="mt-8 space-y-9">
                {faq.items.map(({ q, a }) => (
                  <div key={q}>
                    <h3 className="text-lg font-bold text-carbon">{q}</h3>
                    <p className="mt-2 leading-relaxed text-carbon-soft/85">
                      <Inline text={a} />
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <Link
              to="/insights"
              className="mt-16 inline-flex items-center gap-2 font-semibold text-accent-text transition-colors hover:text-accent"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              {t('labels.back')}
            </Link>
          </div>
        </div>
      </article>

      <CTABanner secondary="how" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
