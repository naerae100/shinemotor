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
})
