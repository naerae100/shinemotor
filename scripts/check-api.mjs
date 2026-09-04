#!/usr/bin/env node
/**
 * Exercise the two edge functions without deploying them.
 *
 *   npm run check:api
 *
 * Both accept input from the open internet and both have real consequences —
 * one sends mail, the other commits to the repository — so the rejection paths
 * matter more than the happy one. GitHub and the mail provider are stubbed;
 * nothing leaves the machine.
 *
 * Exits non-zero on the first failure, so it can go in CI as-is.
 */

process.env.ADMIN_PASSWORD = 'correct-horse'
process.env.GITHUB_PAT = 'fake'
process.env.RESEND_API_KEY = 'fake'
process.env.QUOTE_TO = 'yard@example.com'
process.env.QUOTE_FROM = 'site@example.com'

const quote = (await import('../api/quote.js')).default
const prices = (await import('../api/update-prices.js')).default

let sent = null
const realFetch = globalThis.fetch
globalThis.fetch = async (url, init) => {
  sent = { url: String(url), init }
  if (String(url).includes('api.github.com')) {
    return new Response(JSON.stringify({ sha: 'abc123' }), { status: 200 })
  }
  return new Response(JSON.stringify({ id: 'msg_1' }), { status: 200 })
}

let ipSeq = 0
// A fresh IP per case, so one test's requests do not trip the throttle for the
// next one. The throttle itself is exercised deliberately at the end.
const post = (body, headers = {}) =>
  new Request('https://x/api', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': `10.0.0.${++ipSeq}`,
      ...headers,
    },
    body: JSON.stringify(body),
  })

let failures = 0
const check = async (label, res, wantStatus) => {
  const body = await res.clone().json().catch(() => ({}))
  const ok = res.status === wantStatus
  if (!ok) failures++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(46)} ${res.status} (want ${wantStatus})  ${JSON.stringify(body).slice(0, 78)}`)
  return ok
}

console.log('── /api/quote ──')
const good = { name: 'Dave', phone: '0412 345 678', material: 'No. 1 Copper (Copper)', method: 'pickup', suburb: 'Liverpool' }
await check('valid enquiry sends', await quote(post(good)), 200)
console.log('      subject:', JSON.parse(sent.init.body).subject)
await check('no name rejected', await quote(post({ ...good, name: '' })), 400)
await check('short phone rejected', await quote(post({ ...good, phone: '123' })), 400)
await check('no material rejected', await quote(post({ ...good, material: '' })), 400)
sent = null
await check('honeypot swallowed silently', await quote(post({ ...good, company: 'bot' })), 200)
console.log('      nothing sent:', sent === null)
await check('GET rejected', await quote(new Request('https://x/api')), 405)
// Header injection through the name: CRLF must not survive into the subject.
await quote(post({ ...good, name: 'Dave\r\nBcc: victim@example.com' }))
console.log('      subject after CRLF attempt:', JSON.stringify(JSON.parse(sent.init.body).subject))
// Throttle: 5 per minute, so the 7th from one IP is refused.
let last
for (let i = 0; i < 8; i++) last = await quote(post(good, { 'x-forwarded-for': '9.9.9.9' }))
await check('throttle kicks in', last, 429)

console.log('\n── /api/update-prices ──')
const auth = { authorization: 'Bearer correct-horse' }
const row = { slug: 'no-1-copper', grade: 'No. 1 Copper', family: 'Copper', spec: 'Clean', unit: 'kg', low: 9.5, high: 11 }
await check('valid table publishes', await prices(post({ rows: [row] }, auth)), 200)
await check('wrong password', await prices(post({ rows: [row] }, { authorization: 'Bearer nope' })), 401)
await check('rows not an array', await prices(post({ rows: 'oops' }, auth)), 400)
await check('empty table refused', await prices(post({ rows: [] }, auth)), 400)
await check('unknown family', await prices(post({ rows: [{ ...row, family: 'Unobtanium' }] }, auth)), 400)
await check('bad unit', await prices(post({ rows: [{ ...row, unit: 'sack' }] }, auth)), 400)
await check('low above high', await prices(post({ rows: [{ ...row, low: 50, high: 5 }] }, auth)), 400)
await check('negative price', await prices(post({ rows: [{ ...row, low: -5 }] }, auth)), 400)
await check('absurd price', await prices(post({ rows: [{ ...row, high: 1e9 }] }, auth)), 400)
await check('slug with path traversal', await prices(post({ rows: [{ ...row, slug: '../../etc' }] }, auth)), 400)
await check('duplicate slugs', await prices(post({ rows: [row, row] }, auth)), 400)
await check('injected extra field dropped', await prices(post({ rows: [{ ...row, evil: '<script>' }] }, auth)), 200)
console.log('      committed JSON has no `evil` key:',
  !Buffer.from(JSON.parse(sent.init.body).content, 'base64').toString().includes('evil'))
await check('nulls are a valid "call us"', await prices(post({ rows: [{ ...row, low: null, high: null }] }, auth)), 200)

console.log('\n── the real price table ──')
const live = (await import('../src/content/prices.json', { with: { type: 'json' } })).default
await check(`prices.json (${live.rows.length} rows) still validates`,
  await prices(post({ rows: live.rows }, auth)), 200)

globalThis.fetch = realFetch
console.log(failures === 0 ? '\nAll checks passed.' : `\n${failures} check(s) FAILED.`)
process.exit(failures === 0 ? 0 : 1)
