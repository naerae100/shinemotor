import { Link } from 'react-router-dom'
import { MapPin, MessageCircle, Phone, Truck } from 'lucide-react'
import { serviceAreas, totalSuburbs } from '../content/areas'
import { site, addressLine } from '../content/site'
import { PageHero } from '../components/layout/PageHero'
import { Reveal, RevealItem } from '../components/ui/Reveal'
import { useSeo } from '../lib/seo'
import { breadcrumbSchema } from '../lib/schema'
import { WA_GENERAL } from '../lib/whatsapp'

/**
 * Where we collect from.
 *
 * The suburb lists are visible and accurate — see the note in content/areas.ts
 * for why that matters and why this is not a set of generated suburb pages.
 */
export function ServiceAreas() {
  useSeo(
    'Areas We Serve — Scrap Metal Collection Across NSW',
    `Scrap metal pickup and bin hire from Ingleburn across Sydney, the Illawarra, Central Coast, Hunter and the ACT. ${totalSuburbs} suburbs and towns, with honest travel distances.`,
    {
      path: '/service-areas',
      schema: [breadcrumbSchema([{ label: 'Areas we serve' }])],
    },
  )

  return (
    <>
      <PageHero
        title={<>Where we collect from.</>}
        intro="Our own trucks run out of Ingleburn across New South Wales and the ACT. How far we travel for a load depends on what is in it — the closer you are, the smaller the load can be."
        trail={[{ label: 'Areas we serve' }]}
        meta={[
          { label: 'Yard', value: `${site.address.suburb} ${site.address.state}` },
          { label: 'Regions', value: String(serviceAreas.length) },
          { label: 'Coverage', value: site.serviceArea },
        ]}
        actions={
          <>
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-[15px] font-semibold text-[#0d1b14] transition-opacity hover:opacity-90"
            >
              <MessageCircle aria-hidden className="size-4" strokeWidth={2.5} />
              Ask about your suburb
            </a>
            <a
              href={site.phones[1].href}
              className="glass inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold text-bright"
            >
              <Phone aria-hidden className="size-4 text-amber" strokeWidth={2.25} />
              {site.phones[1].label}
            </a>
          </>
        }
      />

      {/* The honest bit, stated before the lists rather than buried under them. */}
      <section className="border-b border-hairline bg-void">
        <div className="rail section-y">
          <Reveal stagger className="grid gap-5 lg:grid-cols-3">
            <RevealItem distance={14} className="rounded-2xl border border-hairline bg-surface p-7">
              <span className="grad-flame flex size-11 items-center justify-center rounded-xl">
                <MapPin aria-hidden className="size-5 text-on-flame" strokeWidth={2} />
              </span>
              <h2 className="mt-5 font-display text-d3 text-bright">Drive in, any load</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                No minimum and no appointment at the yard itself. {addressLine} — we
                weigh and grade it in front of you and you leave paid.
              </p>
            </RevealItem>
            <RevealItem distance={14} className="rounded-2xl border border-hairline bg-surface p-7">
              <span className="grad-flame flex size-11 items-center justify-center rounded-xl">
                <Truck aria-hidden className="size-5 text-on-flame" strokeWidth={2} />
              </span>
              <h2 className="mt-5 font-display text-d3 text-bright">Pickups have a minimum</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                A truck has to be worth sending, and the further out you are the
                bigger the load needs to be. Send a photo and we will tell you
                straight away whether it is worth a run.
              </p>
            </RevealItem>
            <RevealItem distance={14} className="rounded-2xl border border-hairline bg-surface p-7">
              <span className="grad-flame flex size-11 items-center justify-center rounded-xl">
                <MapPin aria-hidden className="size-5 text-on-flame" strokeWidth={2} />
              </span>
              <h2 className="mt-5 font-display text-d3 text-bright">Not on the list?</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                These are the areas we travel most, not a boundary. We buy from
                right across NSW and the ACT — if your suburb is not here, call
                and ask.
              </p>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      <section className="bg-void">
        <div className="rail section-y">
          <Reveal stagger className="space-y-5">
            {serviceAreas.map((area) => (
              <RevealItem
                key={area.id}
                distance={14}
                as="div"
                className="overflow-hidden rounded-3xl border border-hairline bg-surface"
              >
                <div id={area.id} className="scroll-mt-28 border-b border-hairline px-7 py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h2 className="font-display text-d3 text-bright">{area.name}</h2>
                    <span className="eyebrow text-amber">{area.distance}</span>
                  </div>
                  <p className="measure mt-3 text-[15px] leading-relaxed text-muted">
                    {area.body}
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2 px-7 py-6">
                  {area.suburbs.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-hairline bg-void/60 px-3.5 py-1.5 text-[13px] text-muted"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal className="mt-12 rounded-3xl border border-hairline bg-surface p-8 sm:p-10">
            <h2 className="font-display text-d3 text-bright">Not sure if we come to you?</h2>
            <p className="measure mt-3 text-muted">
              Send a photo of the load and your suburb. We will tell you whether
              it is a pickup, a bin, or worth a trip into the yard — and what it
              is likely to be worth either way.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={WA_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-[15px] font-semibold text-[#0d1b14] transition-opacity hover:opacity-90"
              >
                <MessageCircle aria-hidden className="size-4" strokeWidth={2.5} />
                WhatsApp a photo
              </a>
              <Link
                to="/contact"
                className="glass inline-flex items-center rounded-full px-7 py-3.5 text-[15px] font-semibold text-bright"
              >
                Request a quote
              </Link>
              <Link
                to="/metals"
                className="inline-flex items-center rounded-full border border-hairline px-7 py-3.5 text-[15px] font-semibold text-bright transition-colors hover:border-flame"
              >
                See every grade we buy
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
