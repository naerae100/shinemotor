#!/usr/bin/env node
/**
 * Compress everything under public/img, and record what size it ended up.
 *
 * The photography that came in for the grade pages arrived as ~1.1MB JPEGs at
 * full camera width. On the phone-on-a-worksite connection this site is
 * actually used on, a page of those is the difference between a price checked
 * and a tab closed. This does three things:
 *
 *   1. Caps the long edge at MAX_EDGE. Nothing on the site displays wider than
 *      about 800 CSS px, so 1600 still covers a 2x screen with room over.
 *   2. Re-encodes to WebP at QUALITY. Every browser the site's analytics will
 *      ever see supports it.
 *   3. Reports what each file weighed before and after, so a bad crop or an
 *      over-compressed photograph is visible in the run rather than on the
 *      live site.
 *
 * Originals are MOVED to .image-originals/ (gitignored), never deleted, so a
 * bad run costs nothing. Run `node scripts/optimise-images.mjs --restore` to
 * put them back.
 *
 * This is a one-off tool, not part of the build: the build should not be
 * re-encoding 200 photographs on every deploy.
 */

import sharp from 'sharp'
import { readdirSync, statSync, mkdirSync, renameSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative, extname, sep } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const IMG = join(root, 'public', 'img')
const BACKUP = join(root, '.image-originals')

const MAX_EDGE = 1600
const QUALITY = 78
/** Below this, re-encoding costs more in quality than it saves in bytes. */
const MIN_BYTES = 24 * 1024
/** Keep the new file only if it saves at least this share of the original. */
const MIN_SAVING = 0.1

const RASTER = new Set(['.jpg', '.jpeg', '.png', '.webp'])
/**
 * Left alone on purpose. The logos are already a few KB, they are referenced
 * as .png from the JSON-LD and the vCard where the URL is published and should
 * stay stable, and re-encoding line art as lossy WebP would only make it worse.
 */
const SKIP = /(favicon|apple-touch-icon|icon-|site\.webmanifest|[/\\]logo[/\\])/

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  )
}

const kb = (n) => `${Math.round(n / 1024)}KB`

async function restore() {
  if (!existsSync(BACKUP)) {
    console.error('Nothing to restore: .image-originals/ does not exist.')
    process.exit(1)
  }
  for (const file of walk(BACKUP)) {
    const target = join(IMG, relative(BACKUP, file))
    mkdirSync(dirname(target), { recursive: true })
    renameSync(file, target)
    console.log('  restored', relative(root, target))
  }
  rmSync(BACKUP, { recursive: true, force: true })
  console.log('\nOriginals restored. The .webp files this script wrote are still there — remove them by hand if you want a clean slate.')
}

async function optimise() {
  const files = walk(IMG).filter((f) => RASTER.has(extname(f).toLowerCase()) && !SKIP.test(f))

  /**
   * Refuse to run if two source files would produce the same .webp name.
   *
   * macOS is case-insensitive, so `photo.jpg` silently overwrites `Photo.webp`
   * here and both survive on the case-sensitive Linux box that serves the site
   * — a file that works locally and 404s in production. Caught up front rather
   * than discovered from a broken image on a grade page.
   */
  const collisions = new Map()
  for (const f of files) {
    const key = relative(IMG, f).toLowerCase().replace(/\.(jpe?g|png)$/, '.webp')
    collisions.set(key, [...(collisions.get(key) ?? []), relative(IMG, f)])
  }
  const clashing = [...collisions.values()].filter((group) => group.length > 1)
  if (clashing.length > 0) {
    console.error('Refusing to run — these would overwrite each other:\n')
    for (const group of clashing) console.error('  ' + group.join('  <->  '))
    console.error('\nRename one of each pair, then run again.')
    process.exit(1)
  }

  let before = 0
  let after = 0
  let converted = 0
  let skipped = 0

  for (const file of files.sort()) {
    const rel = relative(join(root, 'public'), file).split(sep).join('/')
    const bytes = statSync(file).size
    const ext = extname(file).toLowerCase()
    const webpPath = file.replace(/\.(jpe?g|png|webp)$/i, '.webp')
    const webpRel = rel.replace(/\.(jpe?g|png|webp)$/i, '.webp')

    let meta
    try {
      meta = await sharp(file).metadata()
    } catch {
      console.log(`  ! unreadable, left alone: ${rel}`)
      continue
    }

    const needsResize = Math.max(meta.width, meta.height) > MAX_EDGE

    // Small and already the right size and format: record its size and move on.
    if (bytes < MIN_BYTES && !needsResize && ext === '.webp') {
      before += bytes
      after += bytes
      skipped++
      continue
    }

    const pipeline = sharp(file).rotate()
    if (needsResize) {
      pipeline.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    }

    const buf = await pipeline.webp({ quality: QUALITY, effort: 5 }).toBuffer()
    const out = await sharp(buf).metadata()

    // An already-tight WebP can come out bigger. Keep whichever is smaller.
    const worthIt = ext !== '.webp' || buf.length < bytes * (1 - MIN_SAVING)
    if (!worthIt) {
      before += bytes
      after += bytes
      skipped++
      continue
    }

    // Park the original before writing over its slot.
    const backupTarget = join(BACKUP, relative(IMG, file))
    mkdirSync(dirname(backupTarget), { recursive: true })
    renameSync(file, backupTarget)

    writeFileSync(webpPath, buf)

    before += bytes
    after += buf.length
    converted++

    const note = needsResize ? ` ${meta.width}→${out.width}px` : ''
    console.log(
      `  ${webpRel.padEnd(52)} ${kb(bytes).padStart(7)} → ${kb(buf.length).padStart(7)}${note}`,
    )
  }

  const saved = before - after
  console.log(
    `\n  ${converted} re-encoded, ${skipped} already fine.` +
      `\n  ${kb(before)} → ${kb(after)}  (saved ${kb(saved)}, ${Math.round((saved / before) * 100)}%)` +
      `\n  originals in .image-originals/ — restore with --restore`,
  )
}

if (process.argv.includes('--restore')) await restore()
else await optimise()
