#!/usr/bin/env node
/**
 * Generate public/sitemap.xml and public/robots.txt from the real content.
 *
 * Slugs are read out of the TypeScript content files rather than duplicated
 * here, so a grade added to metals.ts appears in the sitemap on the next build
 * and cannot silently go unindexed. Runs from `prebuild`.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://shinemotor.com.au'
const today = new Date().toISOString().slice(0, 10)

/** Pull every `slug: '…'` out of a content module. */
function slugs(file) {
  const src = readFileSync(join(root, 'src', 'content', file), 'utf8')
  return [...src.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map((m) => m[1])
}

const metalSlugs = [...new Set(slugs('metals.ts'))]
const serviceSlugs = [...new Set(slugs('services.ts'))]

/**
 * The lead photograph for each grade and service, for the image sitemap.
 *
 * Scrap buyers search visually — "what does bright copper wire look like" is a
 * real query — so the grade photographs are worth surfacing in Image search.
 * Pulled out of the same content files as the slugs so a new grade's photo is
 * listed without anyone maintaining a second list. Read with a tolerant regex
 * rather than by importing the TypeScript, which this plain Node script cannot
 * do; a grade whose shape does not match is simply listed without an image.
 */
function leadImages(file) {
  const src = readFileSync(join(root, 'src', 'content', file), 'utf8')
  const found = new Map()
  for (const m of src.matchAll(
    /slug:\s*'([a-z0-9-]+)'[\s\S]*?image:\s*\{\s*src:\s*'([^']+)'\s*,\s*alt:\s*'([^']*)'/g,
  )) {
    if (!found.has(m[1])) found.set(m[1], { loc: m[2], title: m[3] })
  }
  return found
}

const guideSlugs = [...new Set(slugs('guides.ts'))]
const metalImages = leadImages('metals.ts')
const guideImages = leadImages('guides.ts')
const serviceImages = leadImages('services.ts')

const xml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
/* Contact cards are intentionally NOT in the sitemap: robots.txt disallows
   them, and listing a disallowed URL in a sitemap is a contradiction Search
   Console reports as an error. They are reached by being handed the link. */
const peopleSlugs = [...new Set(slugs('team.ts'))]

/**
 * priority is a hint, not a ranking lever — Google largely ignores it. It is
 * kept because Bing still reads it, and it costs nothing.
 */
const routes = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/services', changefreq: 'monthly', priority: '0.9' },
  { loc: '/metals', changefreq: 'weekly', priority: '0.9' },
  { loc: '/prices', changefreq: 'daily', priority: '0.9' },
  { loc: '/about', changefreq: 'yearly', priority: '0.6' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.8' },
  { loc: '/service-areas', changefreq: 'monthly', priority: '0.7' },
  { loc: '/guides', changefreq: 'monthly', priority: '0.6' },
  ...guideSlugs.map((s) => ({
    loc: `/guides/${s}`,
    changefreq: 'yearly',
    priority: '0.6',
    image: guideImages.get(s),
  })),
  ...serviceSlugs.map((s) => ({
    loc: `/services/${s}`,
    changefreq: 'monthly',
    priority: '0.8',
    image: serviceImages.get(s),
  })),
  ...metalSlugs.map((s) => ({
    loc: `/metals/${s}`,
    changefreq: 'monthly',
    priority: '0.7',
    image: metalImages.get(s),
  })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE}${r.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>${
      r.image
        ? `
    <image:image>
      <image:loc>${SITE}${xml(r.image.loc)}</image:loc>
      <image:title>${xml(r.image.title)}</image:title>
    </image:image>`
        : ''
    }
  </url>`,
  )
  .join('\n')}
</urlset>
`

/**
 * /admin is disallowed and also carries noindex — robots.txt alone does not
 * remove a page from the index, it only stops the crawl, so a page linked from
 * elsewhere can still be listed. The meta tag is what actually keeps it out.
 */
const robots = `# https://shinemotor.com.au
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

# Contact cards are for people who are handed the link, not for search.
Disallow: /card/

Sitemap: ${SITE}/sitemap.xml
`

writeFileSync(join(root, 'public', 'sitemap.xml'), sitemap, 'utf8')
writeFileSync(join(root, 'public', 'robots.txt'), robots, 'utf8')

console.log(
  `  public/sitemap.xml  ${routes.length} URLs ` +
    `(${serviceSlugs.length} services, ${metalSlugs.length} grades; ` +
    `${peopleSlugs.length} card excluded by robots.txt)`,
)
console.log('  public/robots.txt')
