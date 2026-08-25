import type { ReactNode } from 'react'
import { Breadcrumbs } from './Breadcrumbs'
import { Reveal, RevealItem } from '../ui/Reveal'
import { Glow } from '../ui/SectionHead'

/**
 * Shared opener for every inner page. Type-led with a single ambient wash —
 * deliberately not a stock banner photo behind a title, which is what the old
 * site did on every page.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  trail,
  actions,
  aside,
}: {
  eyebrow: string
  title: ReactNode
  intro?: string
  trail: { label: string; to?: string }[]
  actions?: ReactNode
  aside?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-ink">
      <Glow className="-top-32 left-1/4 size-[560px]" from="rgba(255,122,24,0.16)" />
      <div className="rail relative pt-10 pb-14 lg:pt-14 lg:pb-20">
        <Breadcrumbs trail={trail} />
        <div className={`mt-10 grid gap-10 lg:items-end lg:gap-16 ${aside ? "lg:grid-cols-[1.1fr_0.9fr]" : ""}`}>
          <Reveal stagger>
            <RevealItem>
              <p className="eyebrow flex items-center gap-3 text-amber">
                <span aria-hidden className="grad-flame block h-px w-7 rounded-full" />
                {eyebrow}
              </p>
            </RevealItem>
            <RevealItem>
              <h1 className="mt-5 font-display text-d1 text-bright">{title}</h1>
            </RevealItem>
            {intro && (
              <RevealItem>
                <p className="measure mt-6 text-lead text-muted">{intro}</p>
              </RevealItem>
            )}
            {actions && (
              <RevealItem>
                <div className="mt-9 flex flex-wrap gap-3">{actions}</div>
              </RevealItem>
            )}
          </Reveal>
          {aside && <Reveal distance={20}>{aside}</Reveal>}
        </div>
      </div>
    </section>
  )
}
