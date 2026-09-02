import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, X } from 'lucide-react'
import { families, familyIntro, metals, metalsByFamily } from '../content/metals'
import type { Family } from '../content/metals'
import { PageHero } from '../components/layout/PageHero'
import { QuoteChip } from '../components/ui/Button'
import { Reveal, RevealItem } from '../components/ui/Reveal'
import { useSeo } from '../lib/seo'
import { breadcrumbSchema } from '../lib/schema'
import { WA_GENERAL } from '../lib/whatsapp'

/**
 * The full catalogue. Grouped by family with an in-page index down the side,
 * because there are too many grades to scroll blind.
 */
export function Metals() {
  useSeo(
    'Metals We Buy — Every Grade We Accept',
    'Copper, brass, aluminium, stainless steel, lead, motors and more. Every grade Shine Motor Corporation buys, with exactly what each one accepts and rejects.',
    { path: '/metals', schema: [breadcrumbSchema([{ label: 'Metals we buy' }])] },
  )

  const [filter, setFilter] = useState<Family | 'All'>('All')
  const shown = filter === 'All' ? families : [filter]

  return (
    <>
      <PageHero
        title={<>Every grade, and exactly what it accepts.</>}
        intro="Correct grading is the single biggest factor in what you get paid. Find your material below, check what the grade excludes, and sort accordingly before you come in."
        trail={[{ label: 'Metals we buy' }]}
        meta={[
          { label: 'Grades bought', value: String(metals.length) },
          { label: 'Families', value: String(families.length) },
          { label: 'Payment', value: 'Instant EFT' },
        ]}
        actions={
          <>
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-[15px] font-semibold text-[#0d1b14]"
            >
              WhatsApp us a photo
            </a>
            <Link
              to="/contact"
              className="glass inline-flex items-center rounded-full px-7 py-3.5 text-[15px] font-semibold text-bright"
            >
              Request a quote
            </Link>
          </>
        }
        aside={
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
            {[
              { k: 'Grades', v: String(metals.length) },
              { k: 'Families', v: String(families.length) },
              { k: 'Minimum', v: 'By weight' },
            ].map((s) => (
              <div key={s.k} className="bg-ink px-4 py-5">
                <dd className="font-display text-xl text-bright">{s.v}</dd>
                <dt className="eyebrow mt-1.5 text-muted">{s.k}</dt>
              </div>
            ))}
          </dl>
        }
      />

      {/* Sticky family filter. */}
      <div className="sticky top-[68px] z-30 border-b border-hairline bg-void/90 backdrop-blur-xl lg:top-[80px]">
        <div className="rail no-scrollbar flex gap-2 overflow-x-auto py-4">
          {(['All', ...families] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`shrink-0 rounded-full border px-4 py-2 text-[14px] font-semibold transition-all duration-200 ${
                filter === f
                  ? 'grad-flame border-transparent text-on-flame'
                  : 'border-hairline bg-surface text-muted hover:border-flame/40 hover:text-bright'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {shown.map((family, fi) => (
        <section
          key={family}
          id={family.toLowerCase().replace(/\s+/g, '-')}
          className={`scroll-mt-36 border-b border-hairline ${fi % 2 === 0 ? 'bg-void' : 'bg-ink'}`}
        >
          <div className="rail py-14 lg:py-20">
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="font-display text-d2 text-bright">{family}</h2>
                <span className="font-mono text-[13px] text-amber">
                  {String(metalsByFamily(family).length).padStart(2, '0')} grades
                </span>
              </div>
              <p className="measure mt-4 text-lead text-muted">{familyIntro[family]}</p>
            </Reveal>

            <Reveal stagger as="ul" className="mt-10 grid gap-5 lg:grid-cols-2">
              {metalsByFamily(family).map((m) => (
                <RevealItem
                  as="li"
                  key={m.slug}
                  distance={16}
                  className="ring-flame group relative overflow-hidden rounded-2xl border border-hairline bg-surface"
                >
                  <div className="flex gap-5 p-5 lg:p-6">
                    <Link to={`/metals/${m.slug}`} className="shrink-0">
                      <img
                        src={m.image.src}
                        alt={m.image.alt}
                        loading="lazy"
                        className="photo size-28 rounded-xl object-cover transition-transform duration-500 group-hover:scale-105 lg:size-32"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <Link to={`/metals/${m.slug}`}>
                          <h3 className="font-display text-xl text-bright transition-colors group-hover:text-amber">
                            {m.grade}
                          </h3>
                        </Link>
                        <ArrowUpRight
                          aria-hidden
                          className="size-4 shrink-0 text-muted transition-colors group-hover:text-amber"
                          strokeWidth={2.25}
                        />
                      </div>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted">{m.summary}</p>

                      {/* The two lines that stop a wasted trip. */}
                      <ul className="mt-3 space-y-1">
                        <li className="flex items-start gap-2 text-[13px] text-muted">
                          <Check aria-hidden className="mt-0.5 size-3.5 shrink-0 text-[#25D366]" strokeWidth={3} />
                          <span className="truncate">{m.accepted[0]}</span>
                        </li>
                        <li className="flex items-start gap-2 text-[13px] text-muted">
                          <X aria-hidden className="mt-0.5 size-3.5 shrink-0 text-ember" strokeWidth={3} />
                          <span className="truncate">Not: {m.notAccepted[0]}</span>
                        </li>
                      </ul>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <QuoteChip material={`${m.grade} (${m.family})`} />
                        <Link
                          to={`/metals/${m.slug}`}
                          className="inline-flex min-h-9 items-center rounded-full border border-hairline px-4 py-2 text-[13px] font-semibold text-muted transition-colors hover:border-flame/50 hover:text-bright"
                        >
                          Full detail
                        </Link>
                      </div>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </section>
      ))}
    </>
  )
}
