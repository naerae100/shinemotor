import { Link, Navigate, useParams } from 'react-router-dom'
import { Check, Container, Mail, MessageCircle, Phone, Ship, X } from 'lucide-react'
import { exportProcess, exportSpecs, serviceBySlug, services } from '../content/services'
import { steps } from '../content/sections'
import { site } from '../content/site'
import { metals } from '../content/metals'
import { Breadcrumbs } from '../components/layout/Breadcrumbs'
import { QuoteForm } from '../components/forms/QuoteForm'
import { Reveal, RevealItem } from '../components/ui/Reveal'
import { Glow } from '../components/ui/SectionHead'
import { useSeo } from '../lib/seo'
import { breadcrumbSchema, serviceSchema } from '../lib/schema'
import { WA_EXPORT, waForService } from '../lib/whatsapp'

export function ServiceDetail() {
  const { slug = '' } = useParams()
  const service = serviceBySlug(slug)

  useSeo(
    service ? service.name : 'Service',
    service ? `${service.claim} ${service.intro}` : '',
    {
      path: service ? `/services/${service.slug}` : undefined,
      type: 'article',
      schema: service
        ? [
            serviceSchema(service.name, service.intro, `/services/${service.slug}`),
            breadcrumbSchema([
              { label: 'Services', path: '/services' },
              { label: service.short },
            ]),
          ]
        : undefined,
    },
  )

  if (!service) return <Navigate to="/services" replace />

  const isExport = service.kind === 'export'
  const others = services.filter((s) => s.slug !== service.slug)

  /** Email subject/body pre-written for export enquiries. */
  const exportMailto = `mailto:${site.email}?subject=${encodeURIComponent(
    'Container export enquiry',
  )}&body=${encodeURIComponent(
    [
      'Company:',
      'Country:',
      'Grades required:',
      'Tonnage:',
      'Destination port:',
      'Incoterms:',
      'Frequency (spot / ongoing):',
      '',
      'Additional notes:',
    ].join('\n'),
  )}`

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-hairline bg-ink">
        <Glow className="-top-32 left-1/4 size-[560px]" from="rgba(255,122,24,0.16)" />
        <div className="rail relative pt-10 pb-14 lg:pt-14 lg:pb-20">
          <Breadcrumbs trail={[{ label: 'Services', to: '/services' }, { label: service.short }]} />

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal stagger>
              <RevealItem>
                <h1 className="font-display text-dp text-bright">{service.name}</h1>
              </RevealItem>
              <RevealItem>
                <p className="mt-4 text-lead font-semibold text-flame">{service.claim}</p>
              </RevealItem>
              <RevealItem>
                <p className="measure mt-5 text-muted">{service.intro}</p>
              </RevealItem>

              {/* Contact routes differ by business line. */}
              <RevealItem>
                <div className="mt-9 flex flex-wrap gap-3">
                  {service.channels.whatsapp && (
                    <a
                      href={isExport ? WA_EXPORT : waForService(service.name.toLowerCase())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-[15px] font-semibold text-[#0d1b14] shadow-[0_12px_30px_-12px_rgba(37,211,102,0.7)]"
                    >
                      <MessageCircle aria-hidden className="size-[18px]" strokeWidth={2.5} />
                      {isExport ? 'WhatsApp the trade desk' : 'WhatsApp a photo'}
                    </a>
                  )}
                  {service.channels.phone && (
                    <a
                      href={service.phone.href}
                      className="glass inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold text-bright"
                    >
                      <Phone aria-hidden className="size-4 text-amber" strokeWidth={2.25} />
                      {service.phone.label}
                    </a>
                  )}
                  {service.channels.form && (
                    <a
                      href="#quote"
                      className="glass inline-flex items-center rounded-full px-7 py-3.5 text-[15px] font-semibold text-bright"
                    >
                      Use the form
                    </a>
                  )}
                  {service.channels.email && (
                    <a
                      href={exportMailto}
                      className="grad-flame inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold text-on-flame shadow-[0_10px_30px_-10px_rgba(255,122,24,0.7)]"
                    >
                      <Mail aria-hidden className="size-[18px]" strokeWidth={2.25} />
                      Email your enquiry
                    </a>
                  )}
                </div>
                {isExport && (
                  <p className="mt-4 flex items-start gap-2 text-[14px] text-muted">
                    <X aria-hidden className="mt-0.5 size-4 shrink-0 text-ember" strokeWidth={2.5} />
                    Export enquiries are handled by email only — we do not take
                    wholesale orders by phone, WhatsApp or web form.
                  </p>
                )}
              </RevealItem>
            </Reveal>

            <Reveal distance={22}>
              <img
                src={service.image.src}
                alt={service.image.alt}
                className="photo aspect-[4/3] w-full rounded-3xl border border-hairline object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Export-only: the terms of trade, up front ─────────────────────── */}
      {isExport && (
        <section className="border-b border-hairline bg-void">
          <div className="rail section-y">
            <Reveal>
              <h2 className="font-display text-d2 text-bright">How we supply.</h2>
              <p className="measure mt-4 text-lead text-muted">
                We sell prepared stock by the container load. If you are after a
                single item or a small quantity, we are not the right supplier.
              </p>
            </Reveal>

            <Reveal stagger as="dl" className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
              {exportSpecs.map((spec) => (
                <RevealItem key={spec.k} distance={12} className="bg-surface p-6">
                  <dt className="eyebrow text-amber">{spec.k}</dt>
                  <dd className="mt-2.5 text-[15px] text-bright">{spec.v}</dd>
                </RevealItem>
              ))}
            </Reveal>

            <Reveal stagger className="mt-10 grid gap-5 lg:grid-cols-2">
              <RevealItem distance={16} className="rounded-2xl border border-hairline bg-surface p-7">
                <span className="grad-flame flex size-11 items-center justify-center rounded-xl">
                  <Container aria-hidden className="size-5 text-on-flame" strokeWidth={2} />
                </span>
                <h3 className="mt-5 font-display text-d3 text-bright">Grades we load</h3>
                <p className="mt-3 text-[15px] text-muted">
                  Any of the {metals.length} grades in our catalogue, prepared and
                  described to the classification it is sold under.
                </p>
                <Link
                  to="/metals"
                  className="mt-4 inline-block py-2 text-[14px] font-semibold text-amber hover:underline"
                >
                  See the full grade catalogue →
                </Link>
              </RevealItem>

              <RevealItem distance={16} className="rounded-2xl border border-hairline bg-surface p-7">
                <span className="grad-flame flex size-11 items-center justify-center rounded-xl">
                  <Ship aria-hidden className="size-5 text-on-flame" strokeWidth={2} />
                </span>
                <h3 className="mt-5 font-display text-d3 text-bright">Shipping</h3>
                <p className="mt-3 text-[15px] text-muted">
                  Packed at Ingleburn and shipped from Australian ports. We work with
                  the major lines and can arrange bookings on request.
                </p>
                <p className="mt-3 text-[13px] text-amber">
                  Incoterms by agreement — tell us what suits your side.
                </p>
              </RevealItem>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── What you get ─────────────────────────────────────────────────── */}
      <section className="border-b border-hairline bg-ink">
        <div className="rail section-y">
          <Reveal>
            <h2 className="font-display text-d2 text-bright">
              {isExport ? 'What you can expect' : 'What you get'}
            </h2>
          </Reveal>
          <Reveal stagger as="ul" className="mt-10 grid gap-5 lg:grid-cols-2">
            {service.includes.map((inc) => (
              <RevealItem
                as="li"
                key={inc.title}
                distance={16}
                className="ring-flame relative rounded-2xl border border-hairline bg-surface p-7"
              >
                <span className="grad-flame flex size-9 items-center justify-center rounded-lg">
                  <Check aria-hidden className="size-4 text-on-flame" strokeWidth={3} />
                </span>
                <h3 className="mt-5 font-display text-lg text-bright">{inc.title}</h3>
                <p className="mt-2 text-[15px] text-muted">{inc.body}</p>
              </RevealItem>
            ))}
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal distance={16} className="rounded-2xl border border-hairline bg-surface p-7">
              <h3 className="font-display text-d3 text-bright">
                {isExport ? 'Include in your email' : 'What to bring'}
              </h3>
              <ul className="mt-5 space-y-3">
                {service.requirements.map((r) => (
                  <li key={r} className="flex gap-3 text-muted">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-amber" strokeWidth={2.5} />
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal distance={16} className="rounded-2xl border border-hairline bg-surface p-7">
              <h3 className="font-display text-d3 text-bright">Who this is for</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {service.audience.map((a) => (
                  <li
                    key={a}
                    className="rounded-full border border-hairline bg-void/60 px-3.5 py-1.5 text-[13px] text-muted"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal stagger as="ul" className="mt-5 grid gap-4 sm:grid-cols-3">
            {service.gallery.map((g) => (
              <RevealItem as="li" key={g.src} distance={14}>
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="photo aspect-[4/3] w-full rounded-2xl border border-hairline object-cover"
                />
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section className="border-b border-hairline bg-void">
        <div className="rail section-y">
          <Reveal>
            <h2 className="font-display text-d2 text-bright">
              {isExport ? 'How an order runs' : 'How it works'}
            </h2>
          </Reveal>
          <Reveal
            stagger
            as="ol"
            className={`mt-10 grid gap-5 ${isExport ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}
          >
            {(isExport ? exportProcess : steps).map((step) => (
              <RevealItem
                as="li"
                key={step.n}
                distance={18}
                className="rounded-2xl border border-hairline bg-surface p-7"
              >
                <span className="grad-flame flex size-11 items-center justify-center rounded-xl font-display text-lg text-on-flame">
                  {step.n}
                </span>
                <h3 className="mt-5 font-display text-d3 text-bright">{step.title}</h3>
                <p className="mt-3 text-[15px] text-muted">{step.body}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Contact block ────────────────────────────────────────────────── */}
      <section id="quote" className="scroll-mt-24 border-b border-hairline bg-ink">
        <div className="rail section-y">
          {isExport ? (
            <div className="mx-auto max-w-3xl text-center">
              <Reveal stagger>
                <RevealItem>
                  <span className="grad-flame mx-auto flex size-14 items-center justify-center rounded-2xl">
                    <Mail aria-hidden className="size-6 text-on-flame" strokeWidth={2} />
                  </span>
                </RevealItem>
                <RevealItem>
                  <h2 className="mt-6 font-display text-d2 text-bright">
                    Export enquiries by email.
                  </h2>
                </RevealItem>
                <RevealItem>
                  <p className="mt-5 text-lead text-muted">
                    Send your company details, the grades and tonnage you need,
                    your destination port and preferred incoterms. We reply with
                    a written offer.
                  </p>
                </RevealItem>
                <RevealItem>
                  <a
                    href={exportMailto}
                    className="grad-flame mt-9 inline-flex max-w-full items-center justify-center gap-2.5 rounded-full px-6 py-4 text-[15px] font-semibold text-on-flame shadow-[0_10px_34px_-10px_rgba(255,122,24,0.65)] sm:px-8"
                  >
                    <Mail aria-hidden className="size-[18px] shrink-0" strokeWidth={2.25} />
                    <span className="min-w-0 break-all">{site.email}</span>
                  </a>
                </RevealItem>
                <RevealItem>
                  <p className="mt-5 text-[13px] text-muted">
                    Opens your mail client with the required fields already laid out.
                  </p>
                </RevealItem>
              </Reveal>
            </div>
          ) : (
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="eyebrow flex items-center gap-3 text-amber">
                  <span aria-hidden className="grad-flame block h-px w-7 rounded-full" />
                  Get started
                </p>
                <h2 className="mt-5 font-display text-d2 text-bright">
                  Tell us what you have.
                </h2>
                <p className="mt-5 text-lead text-muted">
                  Three ways to reach the yard — whichever suits you.
                </p>

                <div className="mt-8 space-y-3">
                  <a
                    href={isExport ? WA_EXPORT : waForService(service.name.toLowerCase())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-2xl border border-[#25D366]/35 bg-[#25D366]/[0.07] px-5 py-4 lift hover:border-[#25D366]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]">
                      <MessageCircle aria-hidden className="size-5 text-[#0d1b14]" strokeWidth={2.5} />
                    </span>
                    <span>
                      <span className="block font-semibold text-bright">WhatsApp a photo</span>
                      <span className="block text-[13px] text-muted">Fastest — send it where it sits</span>
                    </span>
                  </a>
                  <a
                    href={service.phone.href}
                    className="flex items-center gap-4 rounded-2xl border border-hairline bg-surface px-5 py-4 lift hover:border-flame/50"
                  >
                    <span className="grad-flame flex size-10 shrink-0 items-center justify-center rounded-full">
                      <Phone aria-hidden className="size-5 text-on-flame" strokeWidth={2.5} />
                    </span>
                    <span>
                      <span className="block font-mono font-semibold text-bright">
                        {service.phone.label}
                      </span>
                      <span className="block text-[13px] text-muted">Someone answers from 7am</span>
                    </span>
                  </a>
                  <Link
                    to="/prices"
                    className="flex items-center gap-4 rounded-2xl border border-hairline bg-surface px-5 py-4 lift hover:border-flame/50"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-hairline bg-void/60 font-display text-amber">
                      $
                    </span>
                    <span>
                      <span className="block font-semibold text-bright">Check the price guide</span>
                      <span className="block text-[13px] text-muted">Indicative ranges by grade</span>
                    </span>
                  </Link>
                </div>

                <div className="mt-8 space-y-3 border-t border-hairline pt-8">
                  {others.map((o) => (
                    <Link
                      key={o.slug}
                      to={`/services/${o.slug}`}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-hairline bg-surface px-5 py-4 lift hover:border-flame/50"
                    >
                      <span>
                        <span className="block font-display text-[16px] text-bright">{o.short}</span>
                        <span className="mt-0.5 block text-[13px] text-muted">{o.claim}</span>
                      </span>
                      <span className="text-amber">→</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-7">
                <QuoteForm />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
