/**
 * Quote enquiries from the website form.
 *
 * The form used to show a success screen without transmitting anything, which
 * meant a customer who filled it in was told the yard had their details when
 * nobody did. This is the endpoint that makes that message true.
 *
 * ── CONFIGURATION ─────────────────────────────────────────────────────────
 * Set these in the Vercel project (Settings → Environment Variables):
 *
 *   RESEND_API_KEY   from resend.com — free tier covers this volume
 *   QUOTE_TO         where enquiries land, e.g. shinemotorcorporation@gmail.com
 *   QUOTE_FROM       a verified sender on your domain,
 *                    e.g. "Shine Motor website <quotes@shinemotor.com.au>"
 *
 * Until RESEND_API_KEY exists this returns 501 and the form falls back to
 * WhatsApp with the enquiry pre-written — the customer is never told their
 * details were sent when they were not. Nothing here fails silently.
 */

export const config = {
  runtime: 'edge',
}

const JSON_HEADERS = {
  'content-type': 'application/json',
  'cache-control': 'no-store',
  'x-content-type-options': 'nosniff',
}

function json(body, status) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS })
}

/**
 * Per-instance throttle.
 *
 * Edge instances are not shared, so this is a speed bump rather than a lock —
 * enough to stop one script hammering the mailbox, not enough to call rate
 * limiting. It costs nothing and needs no external store.
 */
const RECENT = new Map()
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5

function throttled(ip) {
  const now = Date.now()
  const hits = (RECENT.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  hits.push(now)
  RECENT.set(ip, hits)
  // Keep the map from growing without bound on a long-lived instance.
  if (RECENT.size > 500) {
    for (const [key, times] of RECENT) {
      if (times.every((t) => now - t >= WINDOW_MS)) RECENT.delete(key)
    }
  }
  return hits.length > MAX_PER_WINDOW
}

/** Trim, cap and strip control characters. Everything is treated as text. */
function clean(value, max) {
  return String(value ?? '')
    // Control characters are the point: they are what a header-injection or
    // log-forging attempt is made of, so they are replaced rather than matched
    // by accident.
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .trim()
    .slice(0, max)
}

/** Header injection guard for anything that reaches a mail header. */
function safeHeaderValue(value) {
  return value.replace(/[\r\n]/g, ' ')
}

const METHOD_LABELS = {
  'drop-off': 'Bringing it in to the yard',
  pickup: 'Needs pickup',
  bin: 'Needs a bin on site',
}

export default async function handler(req) {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  const key = process.env.RESEND_API_KEY
  const to = process.env.QUOTE_TO
  const from = process.env.QUOTE_FROM
  if (!key || !to || !from) {
    console.error('Quote endpoint is not configured: RESEND_API_KEY, QUOTE_TO and QUOTE_FROM are all required')
    return json({ error: 'not_configured' }, 501)
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (throttled(ip)) {
    return json({ error: 'Too many enquiries. Please call the yard.' }, 429)
  }

  let body
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid payload' }, 400)
  }

  /* The honeypot: a field no person can see and no person fills in. Answer 200
     so a bot has nothing to learn from the response, and send nothing. */
  if (clean(body.company, 100)) {
    return json({ success: true }, 200)
  }

  const fields = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    email: clean(body.email, 200),
    material: clean(body.material, 160),
    weight: clean(body.weight, 120),
    suburb: clean(body.suburb, 120),
    method: clean(body.method, 20),
    message: clean(body.message, 2000),
  }

  if (!fields.name || fields.phone.replace(/\D/g, '').length < 8 || !fields.material) {
    return json({ error: 'Please include a name, a phone number and what you are selling.' }, 400)
  }

  const methodLabel = METHOD_LABELS[fields.method] ?? fields.method ?? '—'
  const lines = [
    `Name:     ${fields.name}`,
    `Phone:    ${fields.phone}`,
    `Email:    ${fields.email || '—'}`,
    `Material: ${fields.material}`,
    `Amount:   ${fields.weight || '—'}`,
    `Suburb:   ${fields.suburb || '—'}`,
    `Method:   ${methodLabel}`,
    '',
    fields.message ? `Notes:\n${fields.message}` : 'No additional notes.',
    '',
    '—',
    'Sent from the quote form on shinemotor.com.au',
  ]

  const payload = {
    from,
    to: [to],
    subject: safeHeaderValue(`Quote request — ${fields.name} — ${fields.material}`),
    text: lines.join('\n'),
  }
  /* Reply-to only when they gave a real-looking address, so hitting reply in
     the mailbox goes to the customer rather than bouncing off the sender. */
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    payload.reply_to = safeHeaderValue(fields.email)
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${key}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      // Log the provider's reason; tell the caller only that it failed, so the
      // form can offer WhatsApp instead of pretending the enquiry landed.
      console.error('Resend rejected the enquiry:', res.status, await res.text())
      return json({ error: 'send_failed' }, 502)
    }

    return json({ success: true }, 200)
  } catch (err) {
    console.error('Quote endpoint threw:', err)
    return json({ error: 'send_failed' }, 502)
  }
}
