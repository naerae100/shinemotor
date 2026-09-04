import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Serve .vcf with its real media type.
 *
 * Vite's static middleware does not know the vcard type and sends an empty
 * Content-Type, which makes both iOS and Android treat the file as an opaque
 * download instead of a contact. Production sets this in vercel.json; this
 * mirrors it so dev and preview behave the same way.
 */
function vcardContentType() {
  return {
    name: 'vcard-content-type',
    configureServer(server: { middlewares: { use: (fn: unknown) => void } }) {
      server.middlewares.use((req: never, res: never, next: () => void) => {
        const r = req as unknown as { url?: string }
        if (r.url?.endsWith('.vcf')) {
          ;(res as unknown as { setHeader: (k: string, v: string) => void }).setHeader(
            'Content-Type',
            'text/vcard; charset=utf-8',
          )
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), vcardContentType()],
  build: {
    /**
     * Split the libraries away from the site's own code.
     *
     * React, the router, the animation library and the icon set change only
     * when a dependency is upgraded, while the content files change every time
     * the yard edits a grade or a price. Shipping them in one chunk meant a
     * price update invalidated ~500KB of unchanged library code in every
     * returning visitor's cache. Separated, a content edit re-downloads only
     * the small app chunk.
     */
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'react', test: /node_modules[/\\](react|react-dom|scheduler)[/\\]/ },
            { name: 'router', test: /node_modules[/\\]react-router/ },
            { name: 'motion', test: /node_modules[/\\](framer-motion|motion-dom|motion-utils)[/\\]/ },
            { name: 'icons', test: /node_modules[/\\]lucide-react[/\\]/ },
          ],
        },
      },
    },
  },
})
