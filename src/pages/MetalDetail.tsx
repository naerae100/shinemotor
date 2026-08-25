import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, Check, MessageCircle, Phone, X } from 'lucide-react'
import { metalBySlug, metalsByFamily } from '../content/metals'
import { site } from '../content/site'
import { Breadcrumbs } from '../components/layout/Breadcrumbs'
import { Reveal, RevealItem } from '../components/ui/Reveal'
import { Glow } from '../components/ui/SectionHead'
import { QuoteChip } from '../components/ui/Button'
import { useSeo } from '../lib/seo'
import { waForMaterial } from '../lib/whatsapp'

/** One grade in full: what it is, what it accepts, what it rejects, how to prep it. */
export function MetalDetail() {
  const { slug = '' } = useParams()
  const metal = metalBySlug(slug)

  useSeo(
    metal ? `${metal.grade} — ${metal.family} We Buy` : 'Metal grade',
    metal
      ? `${metal.summary} Shine Motor Corporation buys ${metal.grade} at Ingleburn, NSW. See what the grade accepts and rejects, and get a price.`
      : '',
  )

  if (!metal) return <Navigate to="/metals" replace />

  const related = metalsByFamily(metal.family).filter((m) => m.slug !== metal.slug)

  return (
    <>
      <section className="relative overflow-hidden border-b border-hairline bg-ink">
        <Glow className="-top-32 right-0 size-[520px]" from="rgba(255,122,24,0.16)" />
        <div className="rail relative pt-10 pb-14 lg:pt-14 lg:pb-20">
          <Breadcrumbs
            trail={[
              { label: 'Metals we buy', to: '/metals' },
              { label: metal.family, to: `/metals#${metal.family.toLowerCase().replace(/\s+/g, '-')}` },
              { label: metal.grade },
            ]}
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal stagger>
              <RevealItem>
                <p className="eyebrow flex items-center gap-3 text-amber">
                  <span aria-hidden className="grad-flame block h-px w-7 rounded-full" />
                  {metal.family}
                </p>
              </RevealItem>
              <RevealItem>
                <h1 className="mt-5 font-display text-d1 text-bright">{metal.grade}</h1>
              </RevealItem>
              <RevealItem>
                <p className="measure mt-5 text-lead text-muted">{metal.detail}</p>
              </RevealItem>
              <RevealItem>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a
                    href={waForMaterial(`${metal.grade} (${metal.family})`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-[15px] font-semibold text-[#0d1b14] shadow-[0_12px_30px_-12px_rgba(37,211,102,0.7)]"
                  >
                    <MessageCircle aria-hidden className="size-[18px]" strokeWidth={2.5} />
                    Get a price on WhatsApp
                  </a>
                  <a
                    href={site.phones[0].href}
                    className="glass inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold text-bright"
                  >
                    <Phone aria-hidden className="size-4 text-amber" strokeWidth={2.25} />
                    {site.phones[0].label}
                  </a>
                </div>
              </RevealItem>
            </Reveal>

            <Reveal distance={22}>
              <img
                src={metal.image.src}
                alt={metal.image.alt}
                width={800}
                height={962}
                className="photo aspect-[4/3] w-full rounded-3xl border border-hairline object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Accepted / not accepted — the two lists that prevent a wasted trip. */}
      <section className="border-b border-hairline bg-void">
        <div className="rail section-y">
          <Reveal stagger className="grid gap-5 lg:grid-cols-2">
            <RevealItem
              distance={16}
              className="rounded-2xl border border-[#25D366]/25 bg-[#25D366]/[0.05] p-7"
            >
              <h2 className="flex items-center gap-3 font-display text-d3 text-bright">
                <span className="flex size-8 items-center justify-center rounded-full bg-[#25D366]">
                  <Check aria-hidden className="size-4 text-[#0d1b14]" strokeWidth={3} />
                </span>
                What this grade accepts
              </h2>
              <ul className="mt-6 space-y-3">
                {metal.accepted.map((a) => (
                  <li key={a} className="flex gap-3 text-muted">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-[#25D366]" strokeWidth={2.5} />
                    {a}
                  </li>
                ))}
              </ul>
            </RevealItem>

            <RevealItem
              distance={16}
              className="rounded-2xl border border-ember/25 bg-ember/[0.05] p-7"
            >
              <h2 className="flex items-center gap-3 font-display text-d3 text-bright">
                <span className="flex size-8 items-center justify-center rounded-full bg-ember">
                  <X aria-hidden className="size-4 text-white" strokeWidth={3} />
                </span>
                What it does not
              </h2>
              <ul className="mt-6 space-y-3">
                {metal.notAccepted.map((a) => (
                  <li key={a} className="flex gap-3 text-muted">
                    <X aria-hidden className="mt-1 size-4 shrink-0 text-ember" strokeWidth={2.5} />
                    {a}
                  </li>
                ))}
              </ul>
            </RevealItem>
          </Reveal>

          <Reveal stagger className="mt-5 grid gap-5 lg:grid-cols-2">
            <RevealItem distance={16} className="rounded-2xl border border-hairline bg-surface p-7">
              <h2 className="font-display text-d3 text-bright">Where it usually comes from</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {metal.sources.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-hairline bg-void/60 px-3.5 py-1.5 text-[13px] text-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </RevealItem>

            <RevealItem distance={16} className="ring-flame relative rounded-2xl border border-hairline bg-surface p-7">
              <h2 className="font-display text-d3 text-bright">How to prepare it</h2>
              <p className="mt-4 text-muted">{metal.prep}</p>
              <p className="mt-4 text-[13px] text-amber">
                Not sure? Send a photo before you sort anything — it costs nothing to ask.
              </p>
            </RevealItem>
          </Reveal>

          <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-hairline bg-surface px-7 py-6">
            <p className="font-display text-lg text-bright">
              Ready to move your {metal.grade}?
            </p>
            <div className="flex flex-wrap gap-3">
              <QuoteChip material={`${metal.grade} (${metal.family})`} />
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full border border-hairline px-4 py-2 text-[13px] font-semibold text-muted transition-colors hover:border-flame/50 hover:text-bright"
              >
                Contact the yard
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-ink">
          <div className="rail section-y">
            <Reveal>
              <h2 className="font-display text-d2 text-bright">
                Other {metal.family.toLowerCase()} grades
              </h2>
            </Reveal>
            <Reveal stagger as="ul" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((m) => (
                <RevealItem as="li" key={m.slug} distance={16}>
                  <Link
                    to={`/metals/${m.slug}`}
                    className="group ring-flame relative block overflow-hidden rounded-2xl border border-hairline bg-surface"
                  >
                    <img
                      src={m.image.src}
                      alt={m.image.alt}
                      loading="lazy"
                      className="photo aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="p-5">
                      <h3 className="font-display text-lg text-bright transition-colors group-hover:text-amber">
                        {m.grade}
                      </h3>
                      <p className="mt-2 text-[14px] text-muted">{m.summary}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-amber">
                        Read the grade
                        <ArrowRight aria-hidden className="size-3.5" strokeWidth={2.5} />
                      </span>
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </section>
      )}
    </>
  )
}
