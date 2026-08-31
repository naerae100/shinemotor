#!/usr/bin/env node
/**
 * Pull the Google reviews for Shine Motor into src/content/reviews.ts.
 *
 *   GOOGLE_MAPS_API_KEY=xxx node scripts/fetch-reviews.mjs
 *
 * Getting a key (about five minutes, free for this volume):
 *   1. console.cloud.google.com → create/select a project
 *   2. APIs & Services → Library → enable "Places API (New)"
 *   3. Credentials → Create credentials → API key
 *   4. Restrict it to the Places API. Keep it out of the repo — it is read
 *      only ever from the environment here, never written to a file.
 *
 * Limits worth knowing before you run it: the Places API returns at most FIVE
 * reviews and you cannot choose which five. Google picks them. If you want a
 * specific set on the site, paste them into src/content/reviews.ts by hand —
 * that stays the more controllable option, and this script will not overwrite
 * a file you have hand-edited unless you pass --force.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const PLACE_ID = 'ChIJ14X_i2HrEmsRAmMPw3RQ9c0'
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'reviews.ts')
const KEY = process.env.GOOGLE_MAPS_API_KEY
const FORCE = process.argv.includes('--force')

if (!KEY) {
  console.error('GOOGLE_MAPS_API_KEY is not set. See the header of this file.')
  process.exit(1)
}

/** Refuse to clobber hand-written reviews unless explicitly told to. */
if (existsSync(OUT) && !FORCE) {
  const current = readFileSync(OUT, 'utf8')
  const populated = /export const reviews: Review\[\] = \[\s*\{/.test(current)
  if (populated) {
    console.error(
      'src/content/reviews.ts already contains reviews.\n' +
        'Re-run with --force to replace them with whatever Google returns.',
    )
    process.exit(1)
  }
}

const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
  headers: {
    'X-Goog-Api-Key': KEY,
    'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews',
  },
})

if (!res.ok) {
  console.error(`Places API ${res.status}: ${await res.text()}`)
  process.exit(1)
}

const place = await res.json()
const incoming = place.reviews ?? []

if (incoming.length === 0) {
  console.error('Google returned no reviews for this place. Nothing written.')
  process.exit(1)
}

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

const entries = incoming
  .map((r) => {
    // originalText is the untranslated review as the customer wrote it.
    const text = (r.originalText?.text ?? r.text?.text ?? '').trim()
    return {
      author: r.authorAttribution?.displayName ?? 'Google user',
      rating: r.rating,
      quote: text,
      date: (r.publishTime ?? '').slice(0, 10),
    }
  })
  .filter((r) => r.quote.length > 0)
  .sort((a, b) => b.date.localeCompare(a.date))
  .map(
    (r) =>
      `  {\n    author: '${esc(r.author)}',\n    rating: ${r.rating},\n` +
      `    quote:\n      '${esc(r.quote)}',\n    date: '${r.date}',\n  },`,
  )
  .join('\n')

const header = readFileSync(OUT, 'utf8').split('export const reviews: Review[]')[0]
const rest = readFileSync(OUT, 'utf8').split(/export const reviews: Review\[\] = \[[\s\S]*?\n\]\n/)[1] ?? ''

writeFileSync(
  OUT,
  `${header}export const reviews: Review[] = [\n${entries}\n]\n${rest}`,
  'utf8',
)

console.log(
  `Wrote ${incoming.length} review(s) for "${place.displayName?.text}".\n` +
    `Google reports ${place.rating} from ${place.userRatingCount} total ratings.\n` +
    `Note: the API caps at 5 reviews — the site shows what it returned, not all ${place.userRatingCount}.`,
)
