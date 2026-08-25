import { motion } from 'framer-motion'
import { site } from '../../content/site'
import { SETTLE, useSettle } from '../../hooks/useSettle'
import { Eyebrow } from '../ui/Eyebrow'
import { Glow } from '../ui/SectionHead'
import { QuickPrice } from './QuickPrice'

/**
 * ONE JOB: get the visitor to tell us what they have.
 *
 * Deliberately not a photo banner. The old site opened with a four-slide
 * carousel of yard photography and a headline, which said nothing and asked for
 * nothing. This opens with the question the visitor already has in their head
 * and a panel that answers it in two taps.
 */

const marquee = [
  'Copper', 'Brass', 'Aluminium', 'Stainless steel', 'Lead', 'Radiators',
  'Batteries', 'Insulated cable', 'Electric motors', 'Compressors',
  'HMS 1 & 2', 'Starters & alternators', 'Aluminium wheels', 'Brass turnings',
]

export function Hero() {
  const { reduced } = useSettle()

  const rise = (delay: number) => ({
    initial: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.85, delay: reduced ? 0 : delay, ease: SETTLE },
  })

  return (
    <section className="relative overflow-hidden bg-void">
      <Glow className="-top-48 -left-40 size-[680px]" from="rgba(255,77,45,0.20)" />
      <Glow className="top-0 right-[-15%] size-[720px]" from="rgba(255,176,32,0.16)" />

      {/* Blueprint grid — structural rather than decorative, and it keeps the
          ground from reading as an empty black box without using photography. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 40% 10%, #000 20%, transparent 78%)',
        }}
      />

      <div className="rail relative grid items-center gap-12 pt-14 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pt-20 lg:pb-24">
        <div>
          <motion.div {...rise(0)}>
            <Eyebrow>Licensed scrap metal buyers · Ingleburn NSW</Eyebrow>
          </motion.div>

          <motion.h1 {...rise(0.08)} className="mt-6 font-display text-d1 text-bright">
            What&rsquo;s your metal
            <br />
            <span className="text-flame">worth today?</span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="measure mt-6 text-lead text-muted">
            Tell us what you&rsquo;ve got and we&rsquo;ll come back with a price
            on the grade — not a flat rate for &ldquo;mixed metal&rdquo;. Weighed
            in front of you, paid by EFT before you leave the yard.
          </motion.p>

          <motion.dl {...rise(0.24)} className="mt-10 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
            {[
              { k: 'Since', v: String(site.established) },
              { k: 'Grades bought', v: '21' },
              { k: 'Coverage', v: 'NSW & ACT' },
            ].map((s) => (
              <div key={s.k} className="bg-void px-4 py-5 sm:px-5">
                <dd className="font-display text-xl text-bright sm:text-2xl">{s.v}</dd>
                <dt className="eyebrow mt-1.5 text-muted">{s.k}</dt>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div {...rise(0.2)}>
          <QuickPrice />
        </motion.div>
      </div>

      {/* Everything we take, running past. */}
      <div className="relative border-y border-hairline bg-ink/70 py-3.5 backdrop-blur">
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-[marquee_50s_linear_infinite] items-center gap-8 pr-8 motion-reduce:animate-none">
            {[...marquee, ...marquee].map((s, i) => (
              <span key={`${s}-${i}`} className="flex shrink-0 items-center gap-8">
                <span className="text-[15px] whitespace-nowrap text-muted">{s}</span>
                <span aria-hidden className="size-1 rounded-full bg-flame/60" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
