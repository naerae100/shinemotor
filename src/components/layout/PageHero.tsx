import type { ReactNode } from 'react'
import { Breadcrumbs } from './Breadcrumbs'
import { Reveal, RevealItem } from '../ui/Reveal'
import { Glow } from '../ui/SectionHead'

export interface PageMeta {
  label: string
  value: string
}

/**
 * Shared opener for every inner page.
 *
 * Two things were wrong with the previous version:
 *
 * 1. It printed an eyebrow ("Contact") directly beneath a breadcrumb whose last
 *    crumb was also "Contact" — same colour, same mono uppercase, same size, so
 *    every page opened by naming itself twice. The breadcrumb already labels the
 *    page, so the eyebrow is gone and `meta` takes that row instead: two or
 *    three facts that actually tell the visitor something.
 *
 * 2. The <h1> used the hero scale, which after the display-type rework ran to
 *    104px and pushed the real content of the page off the screen. Inner pages
 *    now use `text-dp`, one step down.
 */
export function PageHero({
  title,
  intro,
  trail,
  actions,
  aside,
  meta,
}: {
  title: ReactNode
  intro?: string
  trail: { label: string; to?: string }[]
  actions?: ReactNode
  aside?: ReactNode
  /** Up to three facts shown as a rule-separated strip under the intro. */
  meta?: PageMeta[]
}) {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-ink">
      <Glow className="-top-40 left-1/3 size-[620px]" from="rgba(255,122,24,0.14)" />

      {/* Structural grid, masked back so it fades before the copy starts. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 30% 0%, #000 10%, transparent 75%)',
        }}
      />

      <div className="rail relative pt-8 pb-12 lg:pt-10 lg:pb-16">
        <Breadcrumbs trail={trail} />

        <div
          className={`mt-8 grid gap-10 lg:gap-16 ${
            aside ? 'lg:grid-cols-[1.15fr_0.85fr] lg:items-end' : ''
          }`}
        >
          <Reveal stagger>
            <RevealItem>
              <h1 className="font-display text-dp text-bright">{title}</h1>
            </RevealItem>

            {intro && (
              <RevealItem>
                <p className="measure mt-5 text-lead text-muted">{intro}</p>
              </RevealItem>
            )}

            {meta && meta.length > 0 && (
              <RevealItem>
                <dl className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                  {meta.map((m) => (
                    <div key={m.label} className="border-l border-hairline pl-4">
                      <dt className="eyebrow text-faint">{m.label}</dt>
                      <dd className="mt-1 font-display text-[17px] text-bright">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </RevealItem>
            )}

            {actions && (
              <RevealItem>
                <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
              </RevealItem>
            )}
          </Reveal>

          {aside && <Reveal distance={20}>{aside}</Reveal>}
        </div>
      </div>
    </section>
  )
}
