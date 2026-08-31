import { MessageCircle, PenLine, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '../../content/site'
import { WA_GENERAL } from '../../lib/whatsapp'
import { Reveal, RevealItem } from '../ui/Reveal'
import { Glow } from '../ui/SectionHead'

/**
 * The closing ask. Three routes to the same conversation, ordered by how this
 * trade actually gets in touch: photo first, phone second, form third.
 */
export function ContactCta() {
  return (
    <section className="plate-top relative overflow-hidden border-t border-hairline bg-ink">
      <Glow className="top-0 left-1/3 size-[600px]" from="rgba(255,122,24,0.18)" />
      <div className="rail section-y relative">
        <Reveal stagger className="mx-auto max-w-3xl text-center">
          <RevealItem>
            <p className="eyebrow flex items-center justify-center gap-3 text-amber">
              <span aria-hidden className="grad-flame block h-px w-7 rounded-full" />
              Get a price
            </p>
          </RevealItem>
          <RevealItem>
            <h2 className="mt-5 font-display text-d2 text-bright">
              Send us a photo. We&rsquo;ll send you a price.
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-5 text-lead text-muted">
              It is the fastest way to find out what your load is worth. Snap it
              where it sits, send it over, and we will grade it and come back to
              you — usually within the hour during opening times.
            </p>
          </RevealItem>
        </Reveal>

        <Reveal stagger className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
          <RevealItem distance={16}>
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noreferrer"
              className="flex h-full flex-col items-center rounded-2xl border border-[#25D366]/35 bg-[#25D366]/[0.07] p-7 text-center lift hover:border-[#25D366] hover:bg-[#25D366]/[0.13]"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-[#25D366]">
                <MessageCircle aria-hidden className="size-6 text-[#0d1b14]" strokeWidth={2.25} />
              </span>
              <span className="mt-4 font-display text-lg text-bright">WhatsApp</span>
              <span className="mt-1.5 text-[14px] text-muted">
                Send photos of the load
              </span>
            </a>
          </RevealItem>

          <RevealItem distance={16}>
            <a
              href={site.phones[0].href}
              className="flex h-full flex-col items-center rounded-2xl border border-hairline bg-surface p-7 text-center lift hover:border-flame"
            >
              <span className="grad-flame flex size-12 items-center justify-center rounded-full">
                <Phone aria-hidden className="size-6 text-on-flame" strokeWidth={2.25} />
              </span>
              <span className="mt-4 font-display text-lg text-bright">Call the yard</span>
              <span className="mt-1.5 font-mono text-[14px] text-muted">
                {site.phones[0].label}
              </span>
            </a>
          </RevealItem>

          <RevealItem distance={16}>
            <Link
              to="/contact"
              className="flex h-full flex-col items-center rounded-2xl border border-hairline bg-surface p-7 text-center lift hover:border-flame"
            >
              <span className="flex size-12 items-center justify-center rounded-full border border-hairline bg-void/60 text-amber">
                <PenLine aria-hidden className="size-5" strokeWidth={2.25} />
              </span>
              <span className="mt-4 font-display text-lg text-bright">Use the form</span>
              <span className="mt-1.5 text-[14px] text-muted">
                Full details, same-day reply
              </span>
            </Link>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  )
}
