import { Link } from 'react-router-dom'
import { Check, Globe2 } from 'lucide-react'
import { site } from '../content/site'
import { reasons } from '../content/sections'
import { gallery } from '../content/gallery'
import { PageHero } from '../components/layout/PageHero'
import { Reveal, RevealItem } from '../components/ui/Reveal'
import { SectionHead } from '../components/ui/SectionHead'
import { useSeo } from '../lib/seo'
import { breadcrumbSchema, organizationSchema } from '../lib/schema'

/** Global branches, from research/current-site-content.md §5. */
const branches = [
  { name: 'Shine Motor Corporation', place: 'Ingleburn, Australia' },
  { name: 'Shine Motor Used Auto Spare Parts Trdg. Co. L.L.C.', place: 'Sharjah, UAE' },
  { name: 'Marco Polo Used Cars Trading', place: 'Sharjah, UAE' },
  { name: 'Red Star Used Cars & Spare Parts Trading', place: 'Sharjah, UAE' },
  { name: 'Arwad Auto Maintenance & Workshop', place: 'Sharjah, UAE' },
  { name: 'Shine International Trading', place: 'Akita, Japan' },
  { name: 'Golden Motor Co. Ltd', place: 'Japan' },
  { name: 'Tokyo Motors', place: 'Tokyo, Japan' },
  { name: 'Golden Shine Trading Co. Ltd', place: 'Korea' },
  { name: 'Ema Shine Auto Parts SDN BHD', place: 'Malaysia' },
  { name: 'Shine Motor Second Hand Auto Parts', place: 'New Jersey, USA' },
  { name: 'Shine Motor USA', place: 'Miami, Florida, USA' },
]

const commitments = [
  '100% customer satisfaction',
  'Friendly and reliable service',
  'Reasonable and competitive prices',
  'Specialists in recycling',
  'Honest weighing',
  'Best price offered',
  'Pickup, or bins dropped for your scrap',
]

export function About() {
  useSeo(
    'About Us — Trading Since 1973',
    'Shine Motor Corporation Pty Ltd is part of a group trading since 1973, with twelve branches worldwide. We process, sort and prepare scrap at our own Ingleburn facility and supply it directly to steel mills, smelters, foundries and refineries in Australia and overseas.',
    { path: '/about', schema: [organizationSchema(), breadcrumbSchema([{ label: 'About' }])] },
  )

  return (
    <>
      <PageHero
        title={<>A family business that grew into a global group.</>}
        intro="Shine Motors began in 1973 as a small family business. Today the group runs twelve branches across the UAE, Japan, Korea, Malaysia, the USA and Australia — and the Ingleburn yard is where it trades in New South Wales."
        trail={[{ label: 'About' }]}
        meta={[
          { label: 'Trading since', value: String(site.established) },
          { label: 'Yard', value: 'Ingleburn, NSW' },
          { label: 'Coverage', value: site.serviceArea },
        ]}
        aside={
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
            {[
              { k: 'Established', v: String(site.established) },
              { k: 'Branches', v: '12' },
              { k: 'Countries', v: '6' },
            ].map((s) => (
              <div key={s.k} className="bg-ink px-4 py-5">
                <dd className="font-display text-xl text-bright">{s.v}</dd>
                <dt className="eyebrow mt-1.5 text-muted">{s.k}</dt>
              </div>
            ))}
          </dl>
        }
      />

      <section className="border-b border-hairline bg-void">
        <div className="rail section-y">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal stagger>
              <RevealItem>
                <h2 className="font-display text-d2 text-bright">
                  What happens after we buy it.
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="mt-6 text-lead text-muted">
                  Scrap is processed, sorted and prepared at our own facility
                  before it is supplied directly to steel mills, smelters, foundries
                  across the country and internationally.
                </p>
              </RevealItem>
              <RevealItem>
                <p className="mt-5 text-muted">
                  We are direct wholesalers from the local market and we deal
                  with major shipping lines worldwide. That downstream reach is
                  what lets us pay competitively on the scales: we are not
                  selling your metal to another middleman.
                </p>
              </RevealItem>
              <RevealItem>
                <p className="mt-5 text-muted">
                  Local and international buyers are welcome to contact the yard
                  directly at{' '}
                  <a href={`mailto:${site.email}`} className="text-amber hover:underline">
                    {site.email}
                  </a>
                  .
                </p>
              </RevealItem>
              <RevealItem>
                <ul className="mt-8 grid gap-2.5 border-t border-hairline pt-8 sm:grid-cols-2">
                  {commitments.map((c) => (
                    <li key={c} className="flex gap-3 text-[15px] text-muted">
                      <Check aria-hidden className="mt-1 size-4 shrink-0 text-amber" strokeWidth={2.5} />
                      {c}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            </Reveal>

            <Reveal distance={22}>
              <div className="grid grid-cols-2 gap-4">
                {gallery.slice(0, 4).map((g, i) => (
                  <img
                    key={g.src}
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className={`photo w-full rounded-2xl border border-hairline object-cover ${
                      i % 2 === 0 ? 'aspect-[4/5]' : 'aspect-square mt-8'
                    }`}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-hairline bg-ink">
        <div className="rail section-y">
          <SectionHead eyebrow="Why Shine Motor" title="You get paid properly." />
          <Reveal stagger as="ul" className="mt-12 grid gap-5 lg:grid-cols-2">
            {reasons.map((r, i) => (
              <RevealItem
                as="li"
                key={r.title}
                distance={16}
                className="ring-flame relative flex gap-5 rounded-2xl border border-hairline bg-surface p-7"
              >
                <span className="grad-flame flex size-9 shrink-0 items-center justify-center rounded-xl font-mono text-[13px] font-semibold text-on-flame">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-lg text-bright">{r.title}</h3>
                  <p className="mt-2 text-[15px] text-muted">{r.body}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-void">
        <div className="rail section-y">
          <SectionHead eyebrow="The group" title="Twelve branches, six countries.">
            Shine Motor Corporation is the Australian arm of a group that has
            been trading since 1973.
          </SectionHead>

          <Reveal stagger as="ul" className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((b, i) => (
              <RevealItem as="li" key={b.name} distance={12} className="bg-surface p-6">
                <div className="flex items-start gap-3">
                  <Globe2
                    aria-hidden
                    className={`mt-0.5 size-4 shrink-0 ${i === 0 ? 'text-amber' : 'text-muted/50'}`}
                    strokeWidth={2}
                  />
                  <div>
                    <p className={`text-[15px] ${i === 0 ? 'font-semibold text-bright' : 'text-muted'}`}>
                      {b.name}
                    </p>
                    <p className="eyebrow mt-1.5 text-muted/70">{b.place}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-hairline bg-surface px-7 py-6">
            <p className="font-display text-lg text-bright">
              Selling scrap in NSW or the ACT?
            </p>
            <Link
              to="/contact"
              className="grad-flame inline-flex shrink-0 items-center rounded-full px-7 py-3.5 text-[15px] font-semibold text-on-flame"
            >
              Get a price
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
