import { useEffect } from 'react'

const SUFFIX = 'Shine Motor Corporation — Scrap Metal Buyers, Ingleburn NSW'

/**
 * Small stand-in for a head manager. Sets the document title, meta description
 * and canonical per route, and restores nothing on unmount because the next
 * route always sets its own.
 */
export function useSeo(title: string, description: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SUFFIX}` : SUFFIX

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = description

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = window.location.origin + window.location.pathname
  }, [title, description])
}
