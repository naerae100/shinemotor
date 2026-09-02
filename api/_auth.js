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

  const header = req.headers.get('authorization')
  if (!header || !header.startsWith('Bearer ')) {
    return jsonResponse({ error: 'Unauthorized' }, 401)
  }

  const supplied = header.slice('Bearer '.length)
  const [a, b] = await Promise.all([sha256(supplied), sha256(expected)])
  if (!timingSafeEqual(a, b)) {
    return jsonResponse({ error: 'Unauthorized' }, 401)
  }

  return null
}
