import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { families, familyImage, familyIntro, metalsByFamily } from '../../content/metals'
import { Reveal, RevealItem } from '../ui/Reveal'
import { Glow, SectionHead } from '../ui/SectionHead'

/**
 * The catalogue index, one card per family.
 *
 * Each card leads with a photograph of the material so the section can be read
 * at a glance, then lists the grade names underneath — which is how the trade
 * actually refers to it. The full specification lives on the detail pages.
 */
export function MetalsIndex() {
  return (
    <section className="relative overflow-hidden border-y border-hairline bg-ink">
      <Glow className="top-0 right-0 size-[520px]" from="rgba(255,176,32,0.12)" />
      <div className="rail section-y relative">
        <SectionHead
          eyebrow="Metals we buy"
          title="All our grades, priced individually."
          action={
            <Link
              to="/metals"
              className="-my-2 inline-block py-2 text-[15px] font-semibold text-amber transition-opacity hover:opacity-75"
            >
              Full catalogue →
            </Link>
          }
        >
          Correct grading is the single biggest factor in what you get paid. Find
          your material below and read exactly what the grade accepts.
        </SectionHead>

        <Reveal stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {families.map((family) => {
            const items = metalsByFamily(family)
            const photo = familyImage[family]
            const anchor = family.toLowerCase().replace(/\s+/g, '-')
            return (
              <RevealItem
                as="li"
                key={family}
                distance={18}
                className="ring-flame group relative overflow-hidden rounded-2xl border border-hairline bg-surface transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_50px_-26px_rgba(255,122,24,0.5)]"
              >
                <Link to={`/metals#${anchor}`} className="block">
                  <div className="relative overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="photo aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(13,17,24,0.15) 0%, rgba(20,26,36,0.95) 100%)',
                      }}
                    />
                    <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-3">
                      <h3 className="font-display text-d3 text-white">{family}</h3>
                      <span className="rounded-full border border-white/15 bg-void/70 px-2.5 py-1 font-mono text-[11px] text-amber backdrop-blur-md">
                        {String(items.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="p-5 lg:p-6 flex flex-col h-full">
                  <p className="text-[14px] leading-relaxed text-muted">
                    {familyIntro[family]}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5 flex-1">
                    {items.slice(0, 4).map((m) => (
                      <li key={m.slug}>
                        <Link
                          to={`/metals/${m.slug}`}
                          className="inline-flex min-h-9 items-center rounded-full border border-hairline bg-void/60 px-3.5 py-1.5 text-[12px] text-muted transition-colors hover:border-flame/50 hover:text-bright"
                        >
                          {m.grade}
                        </Link>
                      </li>
                    ))}
                    {items.length > 4 && (
                      <li>
                        <Link
                          to={`/metals#${anchor}`}
                          className="inline-flex min-h-9 items-center rounded-full border border-hairline bg-void/60 px-3.5 py-1.5 text-[12px] text-amber transition-colors hover:border-flame/50"
                        >
                          +{items.length - 4} more
                        </Link>
                      </li>
                    )}
                  </ul>
                  <Link
                    to={`/metals#${anchor}`}
                    className="mt-4 inline-flex min-h-9 items-center gap-1.5 py-2 text-[14px] font-semibold text-amber transition-opacity hover:opacity-75"
                  >
                    {family} detail
                    <ArrowUpRight aria-hidden className="size-3.5" strokeWidth={2.5} />
                  </Link>
                </div>
              </RevealItem>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
