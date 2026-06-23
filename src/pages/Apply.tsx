import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/ui/PageHeader';
import SectionHeading from '../components/ui/SectionHeading';
import { CONTACT } from '../data/company';
import { useReveal } from '../hooks/useReveal';
import Turnstile, { TURNSTILE_ENABLED } from '../components/ui/Turnstile';

const STEP_KEYS = ['review', 'conversation', 'proposal'] as const;

type Status = 'idle' | 'sending' | 'sent' | 'error';

/** Endpoint de la Cloudflare Pages Function que envía el correo por Resend. */
const APPLY_ENDPOINT = '/api/apply';

const inputClass =
  'w-full rounded-md border border-carbon/20 bg-white px-4 py-3 text-carbon placeholder:text-carbon-soft/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30';

export default function Apply() {
  const { t, i18n } = useTranslation('apply');
  const steps = useReveal<HTMLDivElement>(0.1);

  // `website` es un campo trampa (honeypot): invisible para humanos; si llega
  // con valor, lo envía un bot y el servidor lo descarta.
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    challenge: '',
    website: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [turnstileToken, setTurnstileToken] = useState('');
  // Cambia en cada envío exitoso para remontar el widget Turnstile (su token es
  // de un solo uso): permite enviar una segunda aplicación sin recargar.
  const [turnstileKey, setTurnstileKey] = useState(0);

  const update = (field: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === 'sending') return;

    // Si un requerido está vacío o es solo espacios, enfoca el primero. (La
    // validación nativa cubre el vacío; esto cubre además el caso solo-espacios.)
    const firstEmpty = !form.name.trim()
      ? 'apply-name'
      : !form.email.trim()
        ? 'apply-email'
        : !form.challenge.trim()
          ? 'apply-challenge'
          : null;
    if (firstEmpty) {
      document.getElementById(firstEmpty)?.focus();
      return;
    }

    // Captcha (solo si está activo en el build): exige token antes de enviar.
    if (TURNSTILE_ENABLED && !turnstileToken) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      // Se envía a la Cloudflare Pages Function, que manda el correo por Resend.
      // Viaja por HTTPS (cifrado en tránsito); no se guarda en ninguna BD.
      const res = await fetch(APPLY_ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          challenge: form.challenge.trim(),
          locale: i18n.resolvedLanguage === 'en' ? 'en' : 'es',
          website: form.website, // honeypot
          cfTurnstileResponse: turnstileToken,
        }),
      });

      if (!res.ok) {
        setStatus('error');
        return;
      }

      setStatus('sent');
      setForm({ name: '', email: '', company: '', challenge: '', website: '' });
      setTurnstileToken('');
      setTurnstileKey((k) => k + 1);
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <PageHeader title={t('header.title')} subtitle={t('header.subtitle')} />

      <section className="relative bg-white py-20">
        <div className="mx-auto max-w-2xl px-6">
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-carbon/10 bg-surface p-8 shadow-sm md:p-10"
          >
            <div className="grid gap-6">
              {/* Honeypot anti-bots: oculto a usuarios reales (off-screen), los
                  bots tienden a rellenarlo y el servidor descarta esos envíos. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                value={form.website}
                onChange={(e) => update('website')(e.target.value)}
              />
              <div>
                <label htmlFor="apply-name" className="mb-2 block text-sm font-semibold text-carbon">
                  {t('form.name')} <span className="text-accent">*</span>
                </label>
                <input
                  id="apply-name"
                  type="text"
                  required
                  maxLength={120}
                  autoComplete="name"
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => update('name')(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="apply-email" className="mb-2 block text-sm font-semibold text-carbon">
                  {t('form.email')} <span className="text-accent">*</span>
                </label>
                <input
                  id="apply-email"
                  type="email"
                  required
                  maxLength={160}
                  autoComplete="email"
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => update('email')(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="apply-company" className="mb-2 block text-sm font-semibold text-carbon">
                  {t('form.company')}
                </label>
                <input
                  id="apply-company"
                  type="text"
                  maxLength={160}
                  autoComplete="organization"
                  className={inputClass}
                  value={form.company}
                  onChange={(e) => update('company')(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="apply-challenge" className="mb-2 block text-sm font-semibold text-carbon">
                  {t('form.challenge')} <span className="text-accent">*</span>
                </label>
                <textarea
                  id="apply-challenge"
                  required
                  rows={6}
                  maxLength={5000}
                  className={inputClass}
                  placeholder={t('form.challengeHint')}
                  value={form.challenge}
                  onChange={(e) => update('challenge')(e.target.value)}
                />
              </div>
              <Turnstile key={turnstileKey} onToken={setTurnstileToken} />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="rounded-md bg-accent px-8 py-3.5 font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? t('form.sending') : t('form.submit')}
              </button>
              {status === 'sent' && (
                <p role="status" className="rounded-md border border-green-600/30 bg-green-600/10 px-4 py-3 text-sm font-medium text-carbon">
                  {t('form.confirmation')}
                </p>
              )}
              {status === 'error' && (
                <p role="alert" className="rounded-md border border-red-600/30 bg-red-600/10 px-4 py-3 text-sm font-medium text-carbon">
                  {t('form.error')}
                </p>
              )}
              <p className="text-sm leading-relaxed text-carbon-soft/60">{t('form.note')}</p>
            </div>
          </form>

          <p className="mt-8 text-center text-carbon-soft/70">
            <span className="font-semibold text-carbon">{t('direct.title')}</span>{' '}
            {t('direct.text')}{' '}
            <a href={`mailto:${CONTACT.email}`} className="font-medium text-accent-text hover:underline">
              {CONTACT.email}
            </a>
          </p>
        </div>
      </section>

      {/* Proceso de selección */}
      <section className="relative bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title={t('steps.title')} />
          <div ref={steps.ref} className="grid gap-8 md:grid-cols-3">
            {STEP_KEYS.map((key, index) => (
              <article
                key={key}
                className={`rounded-xl bg-carbon p-8 text-white shadow-lg transition-all duration-700 ease-out motion-reduce:transition-none ${
                  steps.visible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <span className="text-3xl font-bold text-accent">{t(`steps.items.${key}.num`)}</span>
                <h3 className="mt-4 text-xl font-semibold">{t(`steps.items.${key}.title`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {t(`steps.items.${key}.text`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
