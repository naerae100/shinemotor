import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { App } from './App'
import { takeCollectedHead } from './lib/seo'
import type { HeadData } from './lib/seo'

/**
 * Render one route to static HTML.
 *
 * Used only by scripts/prerender.mjs at build time; nothing here ships to the
 * browser. The head comes back as data rather than as markup so the prerenderer
 * can decide how to serialise it — see `buildHead` in lib/seo.ts, which is the
 * one place either path computes it.
 */
export function render(url: string): { html: string; head: HeadData | null } {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )

  return { html, head: takeCollectedHead() }
}
