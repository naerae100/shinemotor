import { ArrowUpRight, Check, Mail, MessageCircle, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../../content/services'
import { metals } from '../../content/metals'
import { site } from '../../content/site'
import { useRequestQuote } from '../../hooks/useQuotePrefill'
import { waForService } from '../../lib/whatsapp'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionHead } from '../ui/SectionHead'

/**
 * The two business lines, each as a full card with its own quick-connect row.
 *
 * The previous version was a sparse editorial index with a single arrow — it
 * looked considered but gave the visitor nothing to press. Every card now
 * carries the contact routes that business line actually accepts, driven by
 * `service.channels`: the scrap side takes WhatsApp, phone and the form, while
 * container export is email only.
 */
export function ServicesIndex() {
  const requestQuote = useRequestQuote()

  return (
    <section id="services" className="plate-top bg-void">
      <div className="rail section-y">
        <SectionHead
          eyebrow="What we do" index="01"
          title="Two sides of the same yard."
          action={
            <Link
              to="/services"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold text-bright transition-colors hover:border-flame/50"
            >
              All services
              <ArrowUpRight aria-hidden className="size-4 text-amber" strokeWidth={2.25} />
            </Link>
          }
        >
          We buy ferrous and non-ferrous scrap from the public and the trade, and
          we sell prepared graded stock to mills, brokers and exporters.
        </SectionHead>

        <Reveal stagger className="mt-14 grid gap-6 lg:grid-cols-2">
          {services.map((service, i) => (
            <RevealItem
              key={service.slug}
              distance={22}
              className="ring-flame group relative flex flex-col overflow-hidden rounded-3xl border border-hairline bg-surface transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(255,122,24,0.45)]"
            >
              {/* Image header with the line number and title over it. */}
              <Link to={`/services/${service.slug}`} className="relative block overflow-hidden">
                <img
                  src={service.image.src}
                  alt={service.image.alt}
                  loading="lazy"
                  className="photo aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(7,9,13,0.35) 0%, rgba(20,26,36,0.55) 45%, rgba(20,26,36,0.97) 100%)',
                  }}
                />
                <div className="absolute inset-x-6 bottom-5">
                  <span className="eyebrow text-amber">
                    {String(i + 1).padStart(2, '0')} ·{' '}
                    {service.kind === 'export' ? 'Wholesale & export' : 'We buy from you'}
                  </span>
                  <h3 className="mt-2 font-display text-d3 text-white">{service.name}</h3>
                </div>
              </Link>

              <div className="flex flex-1 flex-col p-6 lg:p-7">
                <p className="font-semibold text-flame">{service.claim}</p>
                <p className="mt-3 text-[15px] text-muted">{service.intro}</p>

                <ul className="mt-5 space-y-2 border-t border-hairline pt-5">
                  {service.includes.slice(0, 3).map((inc) => (
                    <li key={inc.title} className="flex gap-2.5 text-[14px] text-muted">
                      <Check aria-hidden className="mt-1 size-3.5 shrink-0 text-amber" strokeWidth={3} />
                      {inc.title}
                    </li>
                  ))}
                </ul>

                {/* ── Quick connect ─────────────────────────────────────── */}
                <div className="mt-auto pt-6">
                  <p className="eyebrow text-muted">
                    {service.kind === 'export' ? 'Enquiries by email only' : 'Quick connect'}
                  </p>

                  <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {service.channels.whatsapp && (
                      <a
                        href={waForService(service.name.toLowerCase())}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-[14px] font-semibold text-[#0d1b14] transition-transform duration-200 hover:scale-[1.02]"
                      >
                        <MessageCircle aria-hidden className="size-4" strokeWidth={2.5} />
                        WhatsApp
                      </a>
                    )}

                    {service.channels.phone && (
                      <a
                        href={service.phone.href}
                        className="flex items-center justify-center gap-2 rounded-full border border-hairline bg-void/60 py-3 text-[14px] font-semibold text-bright transition-colors hover:border-flame hover:text-amber"
                      >
                        <Phone aria-hidden className="size-4 text-amber" strokeWidth={2.25} />
                        {service.phone.label}
                      </a>
                    )}

                    {service.channels.email && (
                      <a
                        href={`mailto:${site.email}?subject=${encodeURIComponent('Container export enquiry')}`}
                        className="grad-flame flex items-center justify-center gap-2 rounded-full py-3 text-[14px] font-semibold text-on-flame shadow-[0_10px_26px_-12px_rgba(255,122,24,0.7)] sm:col-span-2"
                      >
                        <Mail aria-hidden className="size-4" strokeWidth={2.25} />
                        Email your enquiry
                      </a>
                    )}

                    {service.channels.form && (
                      <button
                        type="button"
                        onClick={() => requestQuote()}
                        className="grad-flame flex items-center justify-center gap-2 rounded-full py-3 text-[14px] font-semibold text-on-flame shadow-[0_10px_26px_-12px_rgba(255,122,24,0.7)]"
                      >
                        Get a quote
                      </button>
                    )}

                    <Link
                      to={`/services/${service.slug}`}
                      className="flex items-center justify-center gap-2 rounded-full border border-hairline bg-void/60 py-3 text-[14px] font-semibold text-bright transition-colors hover:border-flame hover:text-amber"
                    >
                      Full details
                      <ArrowUpRight aria-hidden className="size-3.5" strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </Reveal>

        {/* One shared strip so the price guide is never more than a click away. */}
        <Reveal className="mt-6 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-hairline bg-surface px-6 py-5 lg:px-8">
          <div>
            <p className="font-display text-lg text-bright">
              Want a rough idea before you load up?
            </p>
            <p className="mt-1 text-[15px] text-muted">
              Indicative ranges for all {metals.length} grades, updated as the market moves.
            </p>
          </div>
          <Link
            to="/prices"
            className="glass inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold text-bright transition-colors hover:border-flame/50"
          >
            View the price guide
            <ArrowUpRight aria-hidden className="size-4 text-amber" strokeWidth={2.25} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
