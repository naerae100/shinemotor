import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL } from './schema'

/**
 * Two suffixes, because they do different jobs.
 *
 * The homepage has no title of its own, so it carries the full descriptive one
 * — that string IS the title, and it earns its length by naming the trade and
 * the suburb. Every other page already says what it is, so it only needs the
 * brand appended. Google truncates a title around 60 characters and the long
 * suffix was pushing grade pages past 110, cutting off the half that carried
 * the keyword.
 */
const HOME_TITLE = 'Shine Motor Corporation — Scrap Metal Buyers, Ingleburn NSW'
const BRAND = 'Shine Motor Corporation'
const DEFAULT_OG = `${SITE_URL}/img/Scrap-Metal-banner.webp`

export interface SeoOptions {
  /** Absolute path for the canonical, e.g. "/metals/copper". Defaults to the
   *  current route with any trailing slash removed. */
  path?: string
  /** Social share image, site-relative. */
  image?: string
  /** JSON-LD blocks for this route. Replaced wholesale on every navigation. */
  schema?: object[]
  /** Set for pages that should not be indexed (the admin screen). */
  noindex?: boolean
  /** og:type — "website" for indexes, "article" for content pages. */
  type?: string
  /**
   * Site-relative path of the photograph that is this page's LCP element.
   *
   * The hero image on a grade or service page is not discoverable by the
   * browser's preload scanner — it only exists once the bundle has run — so it
   * starts downloading late. Naming it here puts a <link rel="preload"> in the
   * prerendered head, and the download begins while the HTML is still being
   * parsed. Only set it for an image that is genuinely above the fold: a
   * preload for something further down competes with what is.
   */
  preloadImage?: string
}

/** Everything that belongs in <head> for one route, as plain data. */
export interface HeadData {
  title: string
  description: string
  canonical: string
  ogImage: string
  type: string
  noindex: boolean
  schema: object[]
  preloadImage?: string
}

export const ROBOTS_INDEX =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
export const ROBOTS_NOINDEX = 'noindex, nofollow'

/**
 * The single source of truth for a route's head.
 *
 * Pure, and deliberately so: the browser applies it to the live document and
 * the prerenderer writes the same values straight into the static HTML, so the
 * two can never drift. Anything added here appears in both.
 */
export function buildHead(
  title: string,
  description: string,
  pathname: string,
  options: SeoOptions = {},
): HeadData {
  const { path, image, schema, noindex = false, type = 'website', preloadImage } = options

  /**
   * Strip a trailing slash so /metals and /metals/ never both get indexed.
   * The homepage is the exception: it keeps its slash, because that is the
   * form index.html declares statically and the form the sitemap lists. A
   * canonical that disagreed with either would be self-contradicting.
   */
  const route = (path ?? pathname).replace(/\/+$/, '')

  return {
    title: title ? `${title} | ${BRAND}` : HOME_TITLE,
    description,
    canonical: route ? SITE_URL + route : `${SITE_URL}/`,
    ogImage: image ? `${SITE_URL}${image}` : DEFAULT_OG,
    type,
    noindex,
    schema: schema ?? [],
    ...(preloadImage ? { preloadImage } : {}),
  }
}

/* ── Prerender collection ────────────────────────────────────────────────────
 *
 * During the static render there is no document to write to, so the head is
 * captured instead. The render is single-pass and single-threaded, one route at
 * a time, which is what makes a module-level slot safe here; it is never used
 * in the browser.
 */
let collected: HeadData | null = null

export function takeCollectedHead(): HeadData | null {
  const head = collected
  collected = null
  return head
}

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

/**
 * Per-route head management.
 *
 * Every route is prerendered to static HTML at build time, so these tags are
 * already in the raw response before any JavaScript runs — which is what Bing,
 * LinkedIn, WhatsApp and the AI crawlers read, none of which execute the
 * bundle. This hook then keeps them correct across client-side navigation,
 * where there is no new document to serve.
 *
 * The route path comes from the router rather than `window.location`, so the
 * same code runs unchanged under the static renderer.
 */
export function useSeo(title: string, description: string, options: SeoOptions = {}) {
  const { pathname } = useLocation()
  const head = buildHead(title, description, pathname, options)

  if (import.meta.env.SSR) {
    /*
     * Captured during render because effects never run in a static render.
     * A write to module scope from a render body is normally a bug; here it is
     * the only point at which the value exists, the branch never runs in the
     * browser, and the prerender is a single-pass, single-threaded loop over
     * one route at a time.
     */
    // eslint-disable-next-line react/globals
    collected = head
  }

  /**
   * Callers build their schema inline, so it is a fresh array on every render.
   * Depending on the object directly would re-run the effect each time and tear
   * down and rebuild the JSON-LD tags continuously. Serialising once gives a
   * dependency that changes only when the content does.
   */
  const key = JSON.stringify(head)

  useEffect(() => {
    const h: HeadData = JSON.parse(key)

    document.title = h.title
    meta('name', 'description', h.description)
    meta('name', 'robots', h.noindex ? ROBOTS_NOINDEX : ROBOTS_INDEX)
    link('canonical', h.canonical)

    // Open Graph — used by Facebook, LinkedIn, WhatsApp previews.
    meta('property', 'og:title', h.title)
    meta('property', 'og:description', h.description)
    meta('property', 'og:url', h.canonical)
    meta('property', 'og:image', h.ogImage)
    meta('property', 'og:type', h.type)
    meta('property', 'og:site_name', 'Shine Motor Corporation')
    meta('property', 'og:locale', 'en_AU')

    // Twitter/X.
    meta('name', 'twitter:card', 'summary_large_image')
    meta('name', 'twitter:title', h.title)
    meta('name', 'twitter:description', h.description)
    meta('name', 'twitter:image', h.ogImage)

    // Route-level JSON-LD. Tagged so navigating away removes only ours and
    // leaves the static blocks in index.html untouched.
    document.head.querySelectorAll('script[data-seo="route"]').forEach((n) => n.remove())

    h.schema.forEach((block) => {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.dataset.seo = 'route'
      s.textContent = JSON.stringify(block)
      document.head.appendChild(s)
    })
  }, [key])
}
