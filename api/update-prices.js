/**
 * Publish the price table from the admin screen.
 *
 * The dashboard sends the whole table; this writes it to src/content/prices.json
 * on GitHub, which triggers a rebuild and puts the new figures on the site.
 *
 * Everything that arrives is validated before it is committed. The old version
 * accepted any array at all, so one malformed save — a bad paste, a stale
 * client, a leaked password — could put arbitrary JSON in front of customers as
 * prices. Rows are now checked field by field and rejected as a batch: the
 * table is written whole, so a partial write would publish a half-correct
 * price list, which is worse than publishing nothing.
 *
 * ── CONFIGURATION ─────────────────────────────────────────────────────────
 *   GITHUB_PAT     token with contents:write on the site repo
 *   GITHUB_REPO    owner/name — defaults to the repo below
 *   GITHUB_BRANCH  defaults to master
 */

import { requireAdmin, jsonResponse } from './_auth.js'

export const config = {
  runtime: 'edge',
}

const DEFAULT_REPO = 'naerae100/shinemotor'
const DEFAULT_BRANCH = 'master'
const FILE_PATH = 'src/content/prices.json'

const FAMILIES = new Set([
  'Aluminium', 'AC Units', 'Battery', 'Brass', 'Copper',
  'Lead', 'Motor', 'Radiator', 'Steel',
])
const UNITS = new Set(['kg', 'tonne', 'each'])

/** A slug, as used for /metals/<slug>. Anything else is not one of our rows. */
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const MAX_ROWS = 200
/** No grade this yard buys is worth this per unit. A typo, not a price. */
const MAX_PRICE = 100_000

function str(value, max) {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= max
    ? value.trim()
    : null
}

/** `null` means "quote by phone" and is a legitimate value, not a missing one. */
function price(value) {
  if (value === null || value === undefined || value === '') return { ok: true, value: null }
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n) || n < 0 || n > MAX_PRICE) return { ok: false }
  // Two decimal places: these are dollars, and the admin inputs step by 0.01.
  return { ok: true, value: Math.round(n * 100) / 100 }
}

/**
 * Returns { rows } or { error } — never a partially cleaned table.
 */
function validate(input) {
  if (!Array.isArray(input)) return { error: 'rows must be an array' }
  if (input.length === 0) return { error: 'rows is empty — refusing to publish an empty price table' }
  if (input.length > MAX_ROWS) return { error: `too many rows (${input.length})` }

  const rows = []
  const seen = new Set()

  for (const [i, raw] of input.entries()) {
    const where = `row ${i + 1}`
    if (!raw || typeof raw !== 'object') return { error: `${where}: not an object` }

    const slug = str(raw.slug, 80)
    if (!slug || !SLUG.test(slug)) return { error: `${where}: invalid slug` }
    if (seen.has(slug)) return { error: `${where}: duplicate slug "${slug}"` }
    seen.add(slug)

    const grade = str(raw.grade, 120)
    if (!grade) return { error: `${where} (${slug}): missing grade` }

    if (!FAMILIES.has(raw.family)) return { error: `${where} (${slug}): unknown family` }
    if (!UNITS.has(raw.unit)) return { error: `${where} (${slug}): unit must be kg, tonne or each` }

    const spec = typeof raw.spec === 'string' && raw.spec.length <= 200 ? raw.spec.trim() : null
    if (spec === null) return { error: `${where} (${slug}): invalid spec` }

    const low = price(raw.low)
    const high = price(raw.high)
    if (!low.ok) return { error: `${where} (${slug}): invalid low price` }
    if (!high.ok) return { error: `${where} (${slug}): invalid high price` }
    if (low.value !== null && high.value !== null && low.value > high.value) {
      return { error: `${where} (${slug}): low price is above the high price` }
    }

    rows.push({ slug, grade, family: raw.family, spec, unit: raw.unit, low: low.value, high: high.value })
  }

  return { rows }
}

export default async function handler(req) {
  const denied = await requireAdmin(req)
  if (denied) return denied

  const token = process.env.GITHUB_PAT
  if (!token) {
    console.error('GITHUB_PAT is not configured')
    return jsonResponse({ error: 'Server misconfiguration' }, 500)
  }

  const repo = process.env.GITHUB_REPO || DEFAULT_REPO
  const branch = process.env.GITHUB_BRANCH || DEFAULT_BRANCH
  const api = `https://api.github.com/repos/${repo}/contents/${FILE_PATH}`
  const ghHeaders = {
    authorization: `Bearer ${token}`,
    accept: 'application/vnd.github+json',
    'user-agent': 'shinemotor-admin',
  }

  let body
  try {
    body = await req.json()
  } catch {
    return jsonResponse({ error: 'Invalid payload' }, 400)
  }

  const { rows, error } = validate(body.rows)
  if (error) return jsonResponse({ error }, 400)

  const updated = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Australia/Sydney',
  })

  const contents = JSON.stringify({ meta: { currency: 'AUD', updated }, rows }, null, 2) + '\n'
  // btoa needs latin1; the table is ASCII, but encode properly rather than assume.
  const base64 = btoa(String.fromCharCode(...new TextEncoder().encode(contents)))

  try {
    const current = await fetch(`${api}?ref=${encodeURIComponent(branch)}`, { headers: ghHeaders })
    if (!current.ok) {
      console.error('GitHub read failed:', current.status, await current.text())
      return jsonResponse({ error: 'Could not read the current price file from GitHub' }, 502)
    }
    const { sha } = await current.json()

    const put = await fetch(api, {
      method: 'PUT',
      headers: { ...ghHeaders, 'content-type': 'application/json' },
      body: JSON.stringify({
        message: `Update prices via admin dashboard (${updated})`,
        content: base64,
        sha,
        branch,
      }),
    })

    if (!put.ok) {
      // The GitHub error can name the repo and token scope — log it, don't return it.
      console.error('GitHub write failed:', put.status, await put.text())
      return jsonResponse({ error: 'Could not save the prices. They have not changed.' }, 502)
    }

    return jsonResponse({ success: true, updated, rows: rows.length }, 200)
  } catch (err) {
    console.error('update-prices threw:', err)
    return jsonResponse({ error: 'Could not save the prices. They have not changed.' }, 502)
  }
}
