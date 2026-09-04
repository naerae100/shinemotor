import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { App } from './App'

const root = document.getElementById('root')!

const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

/**
 * Every route is prerendered to static HTML at build time, so in production
 * there is already markup in #root and the job is to adopt it rather than throw
 * it away — hydrating keeps the text on screen through startup instead of
 * blanking the page and re-rendering it.
 *
 * In dev there is no prerender and #root is empty, so fall back to a plain
 * client render. The check is on the DOM rather than on the environment, which
 * means it also does the right thing if prerendering is ever skipped.
 */
if (root.hasChildNodes()) {
  hydrateRoot(root, tree)
} else {
  createRoot(root).render(tree)
}
