import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { addressLine, site } from '../content/site'
import { people } from '../content/team'
import { PageHero } from '../components/layout/PageHero'
import { QuoteForm } from '../components/forms/QuoteForm'
import { Reveal, RevealItem } from '../components/ui/Reveal'
import { useSeo } from '../lib/seo'
import { breadcrumbSchema } from '../lib/schema'
import { WA_GENERAL, WHATSAPP_DISPLAY } from '../lib/whatsapp'

const areas = [
  'Sydney metro', 'Western Sydney', 'South West Sydney', 'Illawarra',
  'Central Coast', 'Newcastle & Hunter', 'Blue Mountains', 'Regional NSW',
  'Canberra & ACT',
]

export function Contact() {
  useSeo(
    'Contact Us — Ingleburn Scrap Metal Yard',
    `Call, WhatsApp or visit Shine Motor Corporation at ${addressLine}. Open Mon–Fri 7am–5pm and Sat 7am–1pm. Servicing ${site.serviceArea.toLowerCase()}.`,
    { path: '/contact', schema: [breadcrumbSchema([{ label: 'Contact' }])] },
  )

  return (
    <>
      <PageHero
        title={<>Talk to the yard.</>}
        intro="Send a photo of your load and we will price it on the grade. Someone is on the phone from 7am, six days a week."
        trail={[{ label: 'Contact' }]}
        meta={[
          { label: 'Open', value: 'Mon–Sat from 7am' },
          { label: 'Yard', value: `${site.address.street}, ${site.address.suburb}` },
          { label: 'Reply time', value: 'Usually within the hour' },
        ]}
        actions={
          <>
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-[15px] font-semibold text-[#0d1b14] shadow-[0_12px_30px_-12px_rgba(37,211,102,0.7)]"
            >
              <MessageCircle aria-hidden className="size-[18px]" strokeWidth={2.5} />
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
            <a
              href={site.address.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold text-bright"
            >
              <MapPin aria-hidden className="size-4 text-amber" strokeWidth={2.25} />
              Get directions
            </a>
          </>
        }
      />

      {/* Digital cards for the people you would actually ask for. */}
      <section className="border-b border-hairline bg-ink">
        <div className="rail py-10">
          <Reveal stagger className="flex flex-wrap items-center gap-4">
            {people.map((person) => (
              <RevealItem key={person.slug}>
                <Link
                  to={`/card/${person.slug}`}
                  className="lift flex items-center gap-4 rounded-2xl border border-hairline bg-surface py-3 pr-6 pl-3"
                >
                  <span
                    aria-hidden
                    className="grad-flame flex size-11 items-center justify-center rounded-xl font-display text-[15px] text-on-flame"
                  >
                    {person.initials}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[15px] font-semibold text-bright">
                      {person.name}
                    </span>
                    <span className="eyebrow mt-0.5 text-amber">{person.role}</span>
                  </span>
                  <span className="ml-2 text-[13px] text-muted">Contact card &rarr;</span>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Direct lines — each phone is labelled with what it is actually for. */}
      <section className="border-b border-hairline bg-void">
        <div className="rail section-y">
          <Reveal stagger className="grid gap-5 sm:grid-cols-2">
            {site.phones.map((p) => (
              <RevealItem
                key={p.href}
                distance={16}
                className="ring-flame relative rounded-2xl border border-hairline bg-surface p-7"
              >
                <span className="grad-flame flex size-11 items-center justify-center rounded-xl">
                  <Phone aria-hidden className="size-5 text-on-flame" strokeWidth={2} />
                </span>
                <p className="eyebrow mt-5 text-amber">{p.use}</p>
                <a
                  href={p.href}
                  className="mt-2 block font-mono text-2xl text-bright transition-colors hover:text-amber"
                >
                  {p.label}
                </a>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal stagger className="mt-5 grid gap-5 lg:grid-cols-3">
            <RevealItem distance={16} className="rounded-2xl border border-hairline bg-surface p-7">
              <span className="flex size-11 items-center justify-center rounded-xl border border-hairline bg-void/60">
                <MapPin aria-hidden className="size-5 text-amber" strokeWidth={2} />
              </span>
              <p className="eyebrow mt-5 text-amber">The yard</p>
              <a
                href={site.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-bright transition-colors hover:text-amber"
              >
                {addressLine}
              </a>
              <p className="mt-2 text-[14px] text-muted">No appointment needed.</p>
            </RevealItem>

            <RevealItem distance={16} className="rounded-2xl border border-hairline bg-surface p-7">
              <span className="flex size-11 items-center justify-center rounded-xl border border-hairline bg-void/60">
                <Clock aria-hidden className="size-5 text-amber" strokeWidth={2} />
              </span>
              <p className="eyebrow mt-5 text-amber">Opening hours</p>
              <dl className="mt-3 space-y-2">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex items-baseline justify-between gap-4">
                    <dt className="text-[14px] text-muted">{h.days}</dt>
                    <dd className="font-mono text-[14px] text-bright">{h.hours}</dd>
                  </div>
                ))}
              </dl>
            </RevealItem>

            <RevealItem distance={16} className="rounded-2xl border border-hairline bg-surface p-7">
              <span className="flex size-11 items-center justify-center rounded-xl border border-hairline bg-void/60">
                <Mail aria-hidden className="size-5 text-amber" strokeWidth={2} />
              </span>
              <p className="eyebrow mt-5 text-amber">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block break-all text-bright transition-colors hover:text-amber"
              >
                {site.email}
              </a>
              <p className="mt-2 text-[14px] text-muted">
                Local and international buyers welcome.
              </p>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* Form + map. */}
      <section className="border-b border-hairline bg-ink">
        <div className="rail section-y">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow flex items-center gap-3 text-amber">
                <span aria-hidden className="grad-flame block h-px w-7 rounded-full" />
                Request a quote
              </p>
              <h2 className="mt-5 font-display text-d2 text-bright">
                Tell us what you have.
              </h2>
              <p className="mt-5 text-lead text-muted">
                We will price it on the grade and come back to you the same day.
                Bring us a genuine quote from another yard and we will beat it.
              </p>

              <div className="mt-10 overflow-hidden rounded-3xl border border-hairline">
                <iframe
                  title={`Map showing ${site.legalName} at ${addressLine}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    `${addressLine}, ${site.address.country}`,
                  )}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="aspect-[4/3] w-full border-0"
                />
              </div>

              <div className="mt-8">
                <p className="eyebrow text-amber">Where we collect</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {areas.map((a) => (
                    <li
                      key={a}
                      className="rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-[13px] text-muted"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div id="quote" className="scroll-mt-28 lg:col-span-7">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
