import { Link } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import { services } from '../content/services'
import { steps } from '../content/sections'
import { PageHero } from '../components/layout/PageHero'
import { Reveal, RevealItem } from '../components/ui/Reveal'
import { SectionHead } from '../components/ui/SectionHead'
import { useSeo } from '../lib/seo'
import { breadcrumbSchema } from '../lib/schema'
import { WA_GENERAL } from '../lib/whatsapp'

export function Services() {
  useSeo(
    'Our Services — Scrap Metal Buying & Wholesale Supply',
    'Sell your ferrous and non-ferrous scrap metal, or buy prepared graded stock for mills and export. Shine Motor Corporation, Ingleburn NSW — servicing all of NSW and the ACT.',
    { path: '/services', schema: [breadcrumbSchema([{ label: 'Services' }])] },
  )

  return (
    <>
      <PageHero
        title={<>Two sides of the same yard.</>}
        intro="We buy ferrous and non-ferrous scrap from the public and the trade, and we sell prepared graded stock on to steel mills, brokers and exporters here and overseas."
        trail={[{ label: 'Services' }]}
        meta={[
          { label: 'Services', value: String(services.length) },
          { label: 'Coverage', value: 'NSW & ACT' },
          { label: 'Bins', value: 'Supplied free' },
        ]}
        actions={
          <>
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-[15px] font-semibold text-[#0d1b14]"
            >
              WhatsApp the yard
            </a>
            <Link
              to="/contact"
              className="glass inline-flex items-center rounded-full px-7 py-3.5 text-[15px] font-semibold text-bright"
            >
              Request a quote
            </Link>
          </>
        }
      />

      {services.map((service, i) => (
        <section
          key={service.slug}
          className={`border-b border-hairline ${i % 2 === 0 ? 'bg-void' : 'bg-ink'}`}
        >
          <div className="rail section-y">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal
                distance={22}
                className={i % 2 === 1 ? 'lg:order-2' : ''}
              >
                <img
                  src={service.image.src}
                  alt={service.image.alt}
                  loading="lazy"
                  className="photo aspect-[4/3] w-full rounded-3xl border border-hairline object-cover"
                />
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {service.gallery.map((g) => (
                    <img
                      key={g.src}
                      src={g.src}
                      alt={g.alt}
                      loading="lazy"
                      className="photo aspect-square w-full rounded-xl border border-hairline object-cover"
                    />
                  ))}
                </div>
              </Reveal>

              <Reveal stagger className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <RevealItem>
                  <p className="eyebrow flex items-center gap-3 text-amber">
                    <span aria-hidden className="grad-flame block h-px w-7 rounded-full" />
                    {String(i + 1).padStart(2, '0')} · {service.short}
                  </p>
                </RevealItem>
                <RevealItem>
                  <h2 className="mt-5 font-display text-d2 text-bright">{service.name}</h2>
                </RevealItem>
                <RevealItem>
                  <p className="mt-3 text-lead font-semibold text-flame">{service.claim}</p>
                </RevealItem>
                <RevealItem>
                  <p className="mt-5 text-muted">{service.intro}</p>
                </RevealItem>
                <RevealItem>
                  <ul className="mt-7 space-y-2.5 border-t border-hairline pt-6">
                    {service.includes.slice(0, 4).map((inc) => (
                      <li key={inc.title} className="flex gap-3 text-[15px] text-muted">
                        <Check aria-hidden className="mt-1 size-4 shrink-0 text-amber" strokeWidth={2.5} />
                        <span>
                          <span className="font-semibold text-bright">{inc.title}</span>
                          {' — '}
                          {inc.body}
                        </span>
                      </li>
                    ))}
                  </ul>
                </RevealItem>
                <RevealItem>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      to={`/services/${service.slug}`}
                      className="grad-flame inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold text-on-flame shadow-[0_10px_30px_-10px_rgba(255,122,24,0.7)]"
                    >
                      Full details
                      <ArrowUpRight aria-hidden className="size-4" strokeWidth={2.25} />
                    </Link>
                    <a
                      href={service.phone.href}
                      className="glass inline-flex items-center rounded-full px-7 py-3.5 text-[15px] font-semibold text-bright"
                    >
                      {service.phone.label}
                    </a>
                  </div>
                </RevealItem>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-void">
        <div className="rail section-y">
          <SectionHead eyebrow="How it works" title="In, weighed, paid." align="center" />
          <Reveal stagger as="ol" className="mt-12 grid gap-5 lg:grid-cols-3">
            {steps.map((step) => (
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
                <p className="mt-3 text-muted">{step.body}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}
