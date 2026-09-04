/**
 * Shared admin auth for the edge functions.
 *
 * Two things the inline check got wrong:
 *
 *  - `password !== process.env.ADMIN_PASSWORD` compares byte by byte and bails
 *    at the first mismatch, so response time leaks how much of the password was
 *    correct. timingSafeEqual over SHA-256 digests removes that.
 *  - If ADMIN_PASSWORD were ever unset, the comparison silently becomes
 *    "anything !== undefined", which is only accidentally safe. It now fails
 *    closed with a 500 that names the misconfiguration.
 *
 * A constant-time compare stops the password leaking one byte at a time, but it
 * does nothing about someone simply trying a lot of passwords quickly, so there
 * is now a throttle on failures as well. See {@link tooManyFailures}.
 */

async function sha256(value) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  return new Uint8Array(buf)
}

/** Constant-time compare of two equal-length byte arrays. */
function timingSafeEqual(a, b) {
  let diff = a.length ^ b.length
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    diff |= (a[i] ?? 0) ^ (b[i] ?? 0)
  }
  return diff === 0
}

/**
 * Failed-attempt throttle.
 *
 * Edge instances do not share memory, so this bounds one attacker on one
 * instance rather than the whole surface — a speed bump, not a lock. It is
 * still the difference between thousands of guesses a minute and ten. A real
 * lockout would need a shared store (Vercel KV, Upstash); worth adding if this
 * screen ever guards more than a price table.
 *
 * Only failures count. Someone signing in repeatedly with the right password is
 * not the problem this is for.
 */
const FAILURES = new Map()
const WINDOW_MS = 15 * 60_000
const MAX_FAILURES = 10

function clientKey(req) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

function tooManyFailures(key) {
  const now = Date.now()
  const recent = (FAILURES.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length === 0) FAILURES.delete(key)
  else FAILURES.set(key, recent)
  return recent.length >= MAX_FAILURES
}

function recordFailure(key) {
  const now = Date.now()
  const recent = (FAILURES.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  FAILURES.set(key, recent)
  if (FAILURES.size > 500) {
    for (const [k, times] of FAILURES) {
      if (times.every((t) => now - t >= WINDOW_MS)) FAILURES.delete(k)
    }
  }
}

const JSON_HEADERS = {
  'content-type': 'application/json',
  'cache-control': 'no-store',
  'x-content-type-options': 'nosniff',
}

export function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS })
}

/**
 * Returns null when the request is authorised, or a Response to return as-is.
 */
export async function requireAdmin(req) {
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405)
  }

  const expected = process.env.ADMIN_PASSWORD
  if (!expected) {
    // Fail closed and say so in the log, not to the caller.
    console.error('ADMIN_PASSWORD is not configured')
    return jsonResponse({ error: 'Server misconfiguration' }, 500)
  }

  const key = clientKey(req)
  if (tooManyFailures(key)) {
    return jsonResponse({ error: 'Too many attempts. Try again in 15 minutes.' }, 429)
  }

  const header = req.headers.get('authorization')
  if (!header || !header.startsWith('Bearer ')) {
    recordFailure(key)
    return jsonResponse({ error: 'Unauthorized' }, 401)
  }

  const supplied = header.slice('Bearer '.length)
  const [a, b] = await Promise.all([sha256(supplied), sha256(expected)])
  if (!timingSafeEqual(a, b)) {
    recordFailure(key)
    return jsonResponse({ error: 'Unauthorized' }, 401)
  }

  return null
}
