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
            const MAX_PILLS = 3
            const shown = items.slice(0, MAX_PILLS)
            const extra = items.length - MAX_PILLS
            return (
              <RevealItem
                as="li"
                key={family}
                distance={18}
                className="ring-flame group relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_50px_-26px_rgba(255,122,24,0.5)]"
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
                    <h3 className="absolute inset-x-5 bottom-4 font-display text-d3 text-white">
                      {family}
                    </h3>
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-5 lg:p-6">
                  <p className="text-[14px] leading-relaxed text-muted">
                    {familyIntro[family]}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {shown.map((m) => (
                      <li key={m.slug}>
                        <Link
                          to={`/metals/${m.slug}`}
                          className="inline-flex min-h-8 items-center rounded-full border border-hairline bg-void/60 px-3 py-1 text-[12px] text-muted transition-colors hover:border-flame/50 hover:text-bright"
                        >
                          {m.grade}
                        </Link>
                      </li>
                    ))}
                    {extra > 0 && (
                      <li>
                        <Link
                          to={`/metals#${anchor}`}
                          className="inline-flex min-h-8 items-center rounded-full border border-dashed border-hairline bg-void/40 px-3 py-1 text-[12px] text-amber transition-colors hover:border-flame/50"
                        >
                          +{extra} more
                        </Link>
                      </li>
                    )}
                  </ul>
                  <Link
                    to={`/metals#${anchor}`}
                    className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-semibold text-amber transition-opacity hover:opacity-75"
                  >
                    View {family.toLowerCase()}
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
