import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Routes a "Request a quote" click to the actual form, wherever the visitor is.
 *
 * If the current page has the form on it (contact, service detail) we prefill
 * and scroll to it. If it does not (the metals catalogue, a grade page, the
 * homepage) we navigate to /contact and carry the grade across in router state,
 * so the visitor lands on the form with their material already selected rather
 * than at the top of a page they then have to scroll.
 */
const EVENT = 'quote:prefill'

/** Router state shape used to carry a material across a navigation. */
export interface QuoteNavState {
  material?: string
}

export function useRequestQuote() {
  const navigate = useNavigate()

  return useCallback(
    (material?: string) => {
      const form = document.getElementById('quote')
      if (form) {
        window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: material ?? '' }))
        form.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      // The hash is what Layout's scroll handler keys off, so the visitor
      // lands on the form rather than at the top of the contact page.
      navigate(
        { pathname: '/contact', hash: '#quote' },
        { state: { material } satisfies QuoteNavState },
      )
    },
    [navigate],
  )
}

/**
 * Subscribed by the form. Picks up both same-page requests (the custom event)
 * and cross-page ones (router state left by the navigation above).
 */
export function useQuotePrefill(onPrefill: (material: string) => void) {
  const { state } = useLocation()

  useEffect(() => {
    const handler = (e: Event) => onPrefill((e as CustomEvent<string>).detail)
    window.addEventListener(EVENT, handler)
    return () => window.removeEventListener(EVENT, handler)
  }, [onPrefill])

  useEffect(() => {
    const material = (state as QuoteNavState | null)?.material
    if (material) onPrefill(material)
  }, [state, onPrefill])
}
