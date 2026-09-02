import { useEffect } from 'react'
import { SITE_URL } from './schema'

const SUFFIX = 'Shine Motor Corporation — Scrap Metal Buyers, Ingleburn NSW'
const DEFAULT_OG = `${SITE_URL}/img/Scrap-Metal-banner.webp`

/** Upsert a <meta> by name or property. */
function meta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function link(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

export interface SeoOptions {
  /** Absolute path for the canonical, e.g. "/metals/copper". Defaults to the
   *  current pathname with any trailing slash removed. */
  path?: string
  /** Social share image, site-relative. */
  image?: string
  /** JSON-LD blocks for this route. Replaced wholesale on every navigation. */
  schema?: object[]
  /** Set for pages that should not be indexed (the admin screen). */
  noindex?: boolean
  /** og:type — "website" for indexes, "article" for content pages. */
  type?: string
}

/**
 * Per-route head management.
 *
 * This is a client-rendered SPA, so everything below runs after hydration.
 * Googlebot executes JavaScript and will see it, but the base tags and the
 * LocalBusiness block are ALSO written statically into index.html so the most
 * important signals are present in the raw HTML for crawlers that do not — Bing,
 * social scrapers, and AI crawlers among them. See the note in index.html.
 */
export function useSeo(title: string, description: string, options: SeoOptions = {}) {
  const { path, image, schema, noindex, type = 'website' } = options

  /**
   * Callers build their schema inline, so `schema` is a fresh array on every
   * render. Depending on the reference directly would re-run the effect each
   * time and tear down and rebuild the JSON-LD tags continuously. Serialising
   * once gives a dependency that changes only when the content does.
   */
  const schemaKey = schema ? JSON.stringify(schema) : ''

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SUFFIX}` : SUFFIX
    // Strip a trailing slash so /metals and /metals/ never both get indexed.
    const canonical =
      SITE_URL + (path ?? window.location.pathname).replace(/\/+$/, '') || SITE_URL
    const ogImage = image ? `${SITE_URL}${image}` : DEFAULT_OG

    document.title = fullTitle
    meta('name', 'description', description)
    meta(
      'name',
      'robots',
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    )
    link('canonical', canonical)

    // Open Graph — used by Facebook, LinkedIn, WhatsApp previews.
    meta('property', 'og:title', fullTitle)
    meta('property', 'og:description', description)
    meta('property', 'og:url', canonical)
    meta('property', 'og:image', ogImage)
    meta('property', 'og:type', type)
    meta('property', 'og:site_name', 'Shine Motor Corporation')
    meta('property', 'og:locale', 'en_AU')

    // Twitter/X.
    meta('name', 'twitter:card', 'summary_large_image')
    meta('name', 'twitter:title', fullTitle)
    meta('name', 'twitter:description', description)
    meta('name', 'twitter:image', ogImage)

    // Route-level JSON-LD. Tagged so navigating away removes only ours and
    // leaves the static blocks in index.html untouched.
    document.head
      .querySelectorAll('script[data-seo="route"]')
      .forEach((n) => n.remove())

    const blocks: object[] = schemaKey ? JSON.parse(schemaKey) : []
    blocks.forEach((block) => {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.dataset.seo = 'route'
      s.textContent = JSON.stringify(block)
      document.head.appendChild(s)
    })
  }, [title, description, path, image, schemaKey, noindex, type])
}
