import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { googleReviews, profile, reviews } from '../../content/reviews'
import type { Review } from '../../content/reviews'
import { Reveal, RevealItem } from '../ui/Reveal'
import { Eyebrow } from '../ui/Eyebrow'
import { GoogleMark } from '../ui/BrandMarks'

/**
 * Social proof, plate 06 — a single scroll-snapped rail rather than a grid.
 *
 * The grid version stacked sixteen cards two-up and ran most of a screen on its
 * own. A rail shows three at a time, keeps the section to roughly one card's
 * height, and still reaches every review.
 *
 * The rating is shown as stars only, filled to the listing's real 4.5 (four
 * solid, one half). No score, no totals, no distribution.
 *
 * The invitation to review is unconditional — screening by sentiment first
 * ("review gating") breaches Google's Prohibited Content policy and is
 * misleading conduct under the Australian Consumer Law.
 */
export function Reviews() {
  if (reviews.length === 0) return null

  return (
    <section className="plate-top relative overflow-hidden border-y border-hairline bg-ink">
      <div className="rail relative py-16 md:py-20">
        <Reveal
          stagger
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <RevealItem>
              <Eyebrow>Verified on Google</Eyebrow>
            </RevealItem>
            <RevealItem>
              <h2 className="mt-4 font-display text-d2 text-bright">
                Weighed fair. Paid on the spot.
              </h2>
            </RevealItem>
            <RevealItem>
              <div className="mt-4 flex items-center gap-3">
                <Stars rating={profile.average} />
                <a
                  href={googleReviews.listing}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-[14px] text-muted transition-colors hover:text-bright"
                >
                  <GoogleMark aria-hidden className="size-4" />
                  Read them on Google
                </a>
              </div>
            </RevealItem>
          </div>

          <RevealItem className="shrink-0">
            <ReviewCta />
          </RevealItem>
        </Reveal>

        <Rail />
      </div>
    </section>
  )
}

/** Scroll-snapped rail with arrow controls. Native scrolling, no library. */
function Rail() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const el = ref.current
    if (!el) return
    setAtStart(el.scrollLeft < 8)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    sync()
    el.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      el.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [sync])

  /** One card plus its gap, so a press always lands on a card edge. */
  const page = (dir: 1 | -1) => {
    const el = ref.current
    if (!el) return
    const card = el.querySelector('li')
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth
    el.scrollBy({ left: step * dir, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <div className="relative mt-10">
      <ul
        ref={ref}
        className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-1 motion-safe:scroll-smooth"
      >
        {reviews.map((review) => (
          <li
            key={`${review.author}-${review.date}`}
            className="w-[88%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]"
          >
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-[13px] text-faint">Scroll for more</p>
        <div className="flex gap-2">
          <RailButton dir="prev" onClick={() => page(-1)} disabled={atStart} />
          <RailButton dir="next" onClick={() => page(1)} disabled={atEnd} />
        </div>
      </div>
    </div>
  )
}

function RailButton({
  dir,
  onClick,
  disabled,
}: {
  dir: 'prev' | 'next'
  onClick: () => void
  disabled: boolean
}) {
  const Icon = dir === 'prev' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'prev' ? 'Previous reviews' : 'Next reviews'}
      className="flex size-11 items-center justify-center rounded-full border border-hairline bg-surface text-bright transition-colors duration-200 hover:border-flame hover:bg-surface-2 disabled:pointer-events-none disabled:opacity-35"
    >
      <Icon aria-hidden className="size-4" strokeWidth={2.25} />
    </button>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const when = new Date(review.date).toLocaleDateString('en-AU', {
    month: 'short',
    year: 'numeric',
  })

  return (
    <figure className="lift flex h-full flex-col rounded-2xl border border-hairline bg-surface p-6">
      <div className="flex items-center justify-between gap-3">
        <Stars rating={review.rating} />
        <GoogleMark aria-hidden className="size-4 shrink-0 opacity-70" />
      </div>

      {/* Clamped so one long review cannot set the height of the whole rail. */}
      <blockquote className="mt-4 line-clamp-6 flex-1 text-[15px] leading-relaxed text-bright">
        {review.quote}
      </blockquote>

      <figcaption className="mt-5 flex items-baseline justify-between gap-3 border-t border-hairline pt-4">
        <span className="text-[14px] font-semibold text-bright">{review.author}</span>
        <span className="font-mono text-[12px] text-faint">{when}</span>
      </figcaption>
    </figure>
  )
}

/**
 * Stars filled to a fractional rating — 4.5 renders as four solid and one half.
 * Each position lays a filled star over an outline one and clips it by width.
 */
function Stars({ rating, className = '' }: { rating: number; className?: string }) {
  return (
    <span className={`flex items-center gap-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const pct = Math.max(0, Math.min(1, rating - (i - 1))) * 100
        return (
          <span key={i} aria-hidden className="relative block size-[18px]">
            <Star className="absolute inset-0 size-[18px] text-faint" strokeWidth={1.75} />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${pct}%` }}
            >
              <Star
                className="size-[18px] text-amber"
                fill="currentColor"
                strokeWidth={1.75}
              />
            </span>
          </span>
        )
      })}
      <span className="sr-only">{rating} out of 5 stars</span>
    </span>
  )
}

/** The ask. Everyone gets it — no pre-screening. */
export function ReviewCta({ className = '' }: { className?: string }) {
  return (
    <a
      href={googleReviews.write}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border border-hairline bg-void/60 px-6 text-[14px] font-semibold text-bright transition-colors duration-200 hover:border-flame hover:bg-void ${className}`}
    >
      <GoogleMark aria-hidden className="size-[18px]" />
      Leave a Google review
    </a>
  )
}
