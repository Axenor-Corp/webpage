// Cloudflare Pages Function — POST /api/apply
// Recibe el formulario de "Aplicar" y envía el correo a contact@ usando Resend.
// Seguridad: la API key es un secret cifrado de Cloudflare (nunca en el cliente);
// los datos viajan por HTTPS y NO se almacenan en ninguna base de datos.

interface Env {
  RESEND_API_KEY: string;
  APPLY_TO_EMAIL?: string;
  APPLY_FROM_EMAIL?: string;
  // Uno o varios orígenes permitidos, separados por coma. Acepta el nombre en
  // singular o plural por comodidad.
  ALLOWED_ORIGIN?: string;
  ALLOWED_ORIGINS?: string;
}

interface RequestContext {
  request: Request;
  env: Env;
}

interface ApplyBody {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  challenge?: unknown;
  locale?: unknown;
  website?: unknown; // honeypot
}

const json = (data: unknown, status: number): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

const asString = (v: unknown): string => (typeof v === 'string' ? v : '');
const clamp = (v: string, max: number): string => v.trim().slice(0, max);
const isEmail = (v: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const escapeHtml = (v: string): string =>
  v.replace(/[&<>"']/g, (c) =>
    c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '"' ? '&quot;' : '&#39;',
  );

export const onRequestPost = async (context: RequestContext): Promise<Response> => {
  const { request, env } = context;

  // Verificación de origen: rechaza POSTs disparados desde otros sitios.
  // Admite varios dominios (ej. www. y web.) separados por coma.
  const allowedRaw = env.ALLOWED_ORIGIN ?? env.ALLOWED_ORIGINS;
  if (allowedRaw) {
    const allowed = allowedRaw
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean);
    const origin = request.headers.get('origin');
    if (origin && !allowed.includes(origin)) {
      return json({ error: 'forbidden' }, 403);
    }
  }

  let body: ApplyBody;
  try {
    body = (await request.json()) as ApplyBody;
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  // Honeypot: si viene con valor, lo llenó un bot. Fingimos éxito y descartamos.
  if (asString(body.website).length > 0) {
    return json({ ok: true }, 200);
  }

  const name = clamp(asString(body.name), 120);
  const email = clamp(asString(body.email), 160);
  const company = clamp(asString(body.company), 160);
  const challenge = clamp(asString(body.challenge), 5000);
  const locale = asString(body.locale) === 'en' ? 'en' : 'es';

  // Validación en servidor (no se confía en el cliente).
  if (!name || !isEmail(email) || !challenge) {
    return json({ error: 'validation' }, 422);
  }

  if (!env.RESEND_API_KEY) {
    return json({ error: 'not_configured' }, 500);
  }

  const to = env.APPLY_TO_EMAIL ?? 'contact@axenorcorporations.com';
  const from = env.APPLY_FROM_EMAIL ?? 'Axenor Web <onboarding@resend.dev>';

  const html =
    '<h2>Nueva aplicación &mdash; axenorcorporations.com</h2>' +
    `<p><strong>Nombre:</strong> ${escapeHtml(name)}</p>` +
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` +
    (company ? `<p><strong>Empresa:</strong> ${escapeHtml(company)}</p>` : '') +
    `<p><strong>Idioma:</strong> ${locale}</p>` +
    '<hr />' +
    `<p style="white-space:pre-wrap">${escapeHtml(challenge)}</p>`;

  const resend = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject: `Nueva aplicación: ${name}`,
      html,
      reply_to: email,
    }),
  });

  if (!resend.ok) {
    console.error('resend_error', resend.status);
    return json({ error: 'send_failed' }, 502);
  }

  return json({ ok: true }, 200);
};
