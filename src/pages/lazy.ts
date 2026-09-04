import { lazy } from 'react'

/**
 * The routes that are split out of the main bundle.
 *
 * Neither is part of the public journey: /admin is the yard's own price screen,
 * and /card/:slug is handed out as a link rather than navigated to. Shipping
 * both to every visitor who only wanted a copper price meant paying for pages
 * almost nobody loads. They fetch on demand instead.
 *
 * They live here rather than in main.tsx so the entry file exports nothing but
 * its side effect, which is what the fast-refresh rule expects.
 */
export const Admin = lazy(() => import('./Admin').then((m) => ({ default: m.Admin })))
export const Card = lazy(() => import('./Card').then((m) => ({ default: m.Card })))
