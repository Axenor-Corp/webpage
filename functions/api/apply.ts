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

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #eee;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="color: #ea580c; margin: 0; font-size: 24px;">Nueva aplicación recibida</h2>
        <p style="color: #666; margin-top: 4px; font-size: 14px;">axenorcorporations.com</p>
      </div>
      <div style="background-color: #ffffff; padding: 24px; border-radius: 6px; border: 1px solid #e5e5e5;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 100px;"><strong style="color: #444;">Nombre:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #111;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong style="color: #444;">Email:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #111;"><a href="mailto:${escapeHtml(email)}" style="color: #ea580c; text-decoration: none;">${escapeHtml(email)}</a></td>
          </tr>
          ${company ? `
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong style="color: #444;">Empresa:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #111;">${escapeHtml(company)}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong style="color: #444;">Idioma:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #111;">${locale === 'en' ? 'Inglés (en)' : 'Español (es)'}</td>
          </tr>
        </table>
        <div style="margin-top: 24px;">
          <strong style="color: #444; display: block; margin-bottom: 8px;">Mensaje de la aplicación:</strong>
          <div style="background-color: #f5f5f5; padding: 16px; border-radius: 4px; color: #222; font-size: 15px; line-height: 1.5; white-space: pre-wrap;">${escapeHtml(challenge)}</div>
        </div>
      </div>
    </div>
  `;

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
