#!/usr/bin/env node
/**
 * Render every public route to static HTML.
 *
 * The site is a client-rendered SPA, which meant the raw response for every URL
 * was the same near-empty index.html: one title, one description, no content.
 * Google runs JavaScript and coped. Bing, LinkedIn, Slack, WhatsApp and the AI
 * crawlers do not, so every page shared the homepage's preview and none of the
 * copy was visible to them at all.
 *
 * This renders each route with react-dom/server and writes a real HTML file per
 * URL, carrying that route's own title, description, canonical, social card,
 * JSON-LD and body copy. The browser then hydrates the markup it was served
 * rather than replacing it.
 *
 * Route list comes from the same content files as the sitemap, so a grade added
 * to metals.ts is prerendered and indexed without anyone remembering to do
 * anything.
 *
 * Runs from `postbuild`, after Vite has produced dist/index.html.
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'
import { build } from 'vite'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(root, 'dist')
const SSR_OUT = join(root, '.ssr-build')

/** Pull every `slug: '…'` out of a content module. */
function slugs(file) {
  const src = readFileSync(join(root, 'src', 'content', file), 'utf8')
  return [...new Set([...src.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map((m) => m[1]))]
}

const routes = [
  '/',
  '/services',
  '/metals',
  '/prices',
  '/about',
  '/contact',
  '/service-areas',
  '/guides',
  ...slugs('guides.ts').map((s) => `/guides/${s}`),
  ...slugs('services.ts').map((s) => `/services/${s}`),
  ...slugs('metals.ts').map((s) => `/metals/${s}`),
]

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const escapeText = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * JSON-LD goes inside a <script>, where the only sequence that can break out is
 * a literal `</script`. Escaping the slash keeps the JSON valid and the tag
 * closed. `<!--` is escaped for the same reason.
 */
const safeJsonLd = (obj) =>
  JSON.stringify(obj).replace(/<\/(script)/gi, '<\\/$1').replace(/<!--/g, '<\\!--')

/** Serialise a route's head into the block index.html marks out for it. */
function headMarkup(head) {
  const tags = [
    `<title>${escapeText(head.title)}</title>`,
    `<meta name="description" content="${escapeAttr(head.description)}" />`,
    `<link rel="canonical" href="${escapeAttr(head.canonical)}" />`,
    `<meta name="robots" content="${escapeAttr(head.robots)}" />`,
    `<meta property="og:site_name" content="Shine Motor Corporation" />`,
    `<meta property="og:type" content="${escapeAttr(head.type)}" />`,
    `<meta property="og:locale" content="en_AU" />`,
    `<meta property="og:url" content="${escapeAttr(head.canonical)}" />`,
    `<meta property="og:title" content="${escapeAttr(head.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(head.description)}" />`,
    `<meta property="og:image" content="${escapeAttr(head.ogImage)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(head.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(head.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(head.ogImage)}" />`,
  ]

  /* The hero photograph is this page's LCP element and is not discoverable
     until the bundle has run and rendered it. Preloading lets the browser start
     the download while it is still parsing the head. */
  if (head.preloadImage) {
    tags.push(
      `<link rel="preload" as="image" fetchpriority="high" href="${escapeAttr(head.preloadImage)}" />`,
    )
  }

  for (const block of head.schema ?? []) {
    tags.push(`<script type="application/ld+json" data-seo="route">${safeJsonLd(block)}</script>`)
  }

  return tags.join('\n    ')
}

async function main() {
  const template = readFileSync(join(DIST, 'index.html'), 'utf8')
  if (!template.includes('<!--seo-start-->')) {
    throw new Error('dist/index.html has no <!--seo-start--> marker — did index.html change?')
  }
  if (!template.includes('<div id="root"></div>')) {
    throw new Error('dist/index.html has no empty #root to render into')
  }

  // Build the server bundle. Quiet: the client build has already reported.
  await build({
    root,
    logLevel: 'warn',
    build: {
      ssr: join(root, 'src', 'entry-server.tsx'),
      outDir: SSR_OUT,
      emptyOutDir: true,
      copyPublicDir: false,
    },
  })

  const entry = join(SSR_OUT, 'entry-server.js')
  if (!existsSync(entry)) throw new Error(`SSR bundle missing at ${entry}`)
  const { render } = await import(pathToFileURL(entry).href)

  let written = 0
  let bytes = 0

  const ROBOTS_INDEX =
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  const ROBOTS_NOINDEX = 'noindex, nofollow'

  const emit = (outPath, route, { html, head }) => {
    if (!head) throw new Error(`${route} rendered no head — is useSeo called on that page?`)

    const block = headMarkup({
      ...head,
      robots: head.noindex ? ROBOTS_NOINDEX : ROBOTS_INDEX,
    })

    const page = template
      .replace(
        /<!--seo-start-->[\s\S]*<!--seo-end-->/,
        `<!--seo-start-->\n    ${block}\n    <!--seo-end-->`,
      )
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)

    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, page, 'utf8')
    written++
    bytes += page.length
  }

  for (const route of routes) {
    emit(join(DIST, route === '/' ? '' : route, 'index.html'), route, render(route))
  }

  /* A URL that matches nothing must answer 404, not 200 with a "not found"
     page — a soft 404 gets the URL indexed as a real page and dilutes the rest.
     Vercel serves this file for anything the filesystem and the rewrites do not
     claim. The NotFound page already sets noindex, so the head is correct as
     rendered. */
  emit(join(DIST, '404.html'), '/404', render('/this-route-does-not-exist'))

  rmSync(SSR_OUT, { recursive: true, force: true })

  console.log(
    `  prerendered ${written} pages, ${Math.round(bytes / 1024)}KB of HTML ` +
      `(${routes.length} routes + 404.html)`,
  )
}

await main()
