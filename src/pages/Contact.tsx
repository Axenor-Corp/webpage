import { useTranslation } from 'react-i18next';
import PageHeader from '../components/ui/PageHeader';
import CTABanner from '../components/ui/CTABanner';
import { CONTACT } from '../data/company';
import { useReveal } from '../hooks/useReveal';

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function Contact() {
  const { t } = useTranslation('contact');
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);

  const cards = [
    {
      icon: <MailIcon className="h-6 w-6" />,
      label: t('emailLabel'),
      content: (
        <a href={`mailto:${CONTACT.email}`} className="break-all font-medium text-carbon transition-colors hover:text-accent">
          {CONTACT.email}
        </a>
      ),
    },
    {
      icon: <PhoneIcon className="h-6 w-6" />,
      label: t('phoneLabel'),
      content: (
        <div className="flex flex-col items-center gap-2">
          <a href={CONTACT.phoneHref} className="font-medium text-carbon transition-colors hover:text-accent">
            {CONTACT.phoneDisplay}
          </a>
          <a
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            {t('whatsapp')}
          </a>
        </div>
      ),
    },
    {
      icon: <PinIcon className="h-6 w-6" />,
      label: t('locationLabel'),
      content: <p className="font-medium text-carbon">{t('location')}</p>,
    },
  ];

  return (
    <>
      <PageHeader title={t('header.title')} subtitle={t('header.subtitle')} />

      <section className="relative bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div ref={ref} className="grid gap-8 md:grid-cols-3">
            {cards.map(({ icon, label, content }, index) => (
              <div
                key={label}
                className={`rounded-xl bg-white p-8 text-center shadow-sm transition-all duration-700 ease-out motion-reduce:transition-none ${
                  visible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="mx-auto mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  {icon}
                </div>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-carbon-soft/60">
                  {label}
                </h2>
                {content}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Llamado a la acción en contacto */}
      <CTABanner secondary="how" />
    </>
  );
}
