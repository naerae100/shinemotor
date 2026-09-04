#!/usr/bin/env node
/**
 * Verify the old-site redirect map against the pages that actually exist.
 *
 *   npm run check:redirects        (run after `npm run build`)
 *
 * The old shinemotor.com.au ran on PHP and has been indexed for years. Every
 * one of those URLs has to land on a real, related page: a 301 into a 404
 * throws the ranking away more thoroughly than leaving the URL alone would,
 * and a 301 into an unrelated page gets treated as a soft 404 and loses it just
 * as surely.
 *
 * This checks the mechanical half — that every destination is a page the build
 * actually produced, that no redirect points at another redirect, and that
 * nothing loops. Whether the destination is *topically* right is a judgement
 * call and is recorded in the README.
 */

import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(root, 'dist')
const { redirects = [], rewrites = [] } = JSON.parse(
  readFileSync(join(root, 'vercel.json'), 'utf8'),
)

/** Does the build produce a file that serves this path? */
function resolves(path) {
  if (path === '/') return existsSync(join(DIST, 'index.html'))
  const clean = path.split('#')[0].split('?')[0]
  return (
    existsSync(join(DIST, clean, 'index.html')) ||
    existsSync(join(DIST, `${clean}.html`)) ||
    existsSync(join(DIST, clean)) ||
    rewrites.some((r) => new RegExp(`^${r.source.replace(/:\w+/g, '[^/]+')}$`).test(clean))
  )
}

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('No dist/ — run `npm run build` first.')
  process.exit(1)
}

const sources = new Set(redirects.map((r) => r.source))
let failures = 0

for (const r of redirects) {
  const problems = []
  if (!r.permanent) problems.push('not a 301 — a 302 passes no ranking on')
  if (!resolves(r.destination)) problems.push(`destination ${r.destination} is not a built page`)
  if (sources.has(r.destination)) problems.push(`destination is itself redirected (chain)`)
  if (r.source === r.destination) problems.push('redirects to itself')

  if (problems.length) {
    failures++
    console.log(`FAIL  ${r.source} -> ${r.destination}`)
    for (const p of problems) console.log(`        ${p}`)
  } else {
    console.log(`ok    ${r.source.padEnd(34)} -> ${r.destination}`)
  }
}

console.log(
  failures === 0
    ? `\nAll ${redirects.length} redirects land on real pages, in one hop.`
    : `\n${failures} of ${redirects.length} redirects are broken.`,
)
process.exit(failures === 0 ? 0 : 1)
