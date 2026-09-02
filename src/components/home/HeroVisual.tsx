import { motion } from 'framer-motion'
import { Truck } from 'lucide-react'
import { SETTLE, useSettle } from '../../hooks/useSettle'
import { Eyebrow } from '../ui/Eyebrow'
import { Glow } from '../ui/SectionHead'
import { QuickPrice } from './QuickPrice'
import { FlowGraphic } from './FlowGraphic'

/**
 * Everything the yard takes, running past the base of the hero. Carried over
 * from the retired photo-led Hero: naming the grades is the cheapest possible
 * proof that this yard knows its materials, and it answers "do you even take
 * what I've got?" before the visitor has to ask.
 */
const marquee = [
  'Copper', 'Brass', 'Aluminium', 'Stainless steel', 'Lead', 'Radiators',
  'Batteries', 'Insulated cable', 'Electric motors', 'Compressors',
  'HMS 1 & 2', 'Starters & alternators', 'Aluminium wheels', 'Brass turnings',
]

/**
 * The opening screen.
 *
 * One question, one panel that answers it, and one drawing of the run from
 * metal to money — see {@link FlowGraphic}. The ground stays quiet on
 * purpose: a single warm wash off the top-left and a structural grid, so the
 * plate is the only thing on the page with any light on it.
 */
export function HeroVisual() {
  const { reduced } = useSettle()

  const rise = (delay: number) => ({
    initial: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.85, delay: reduced ? 0 : delay, ease: SETTLE },
  })

  return (
    <section className="relative overflow-hidden bg-void pt-20 lg:pt-28">
      <Glow className="-top-56 -left-48 size-[820px]" from="rgba(255,122,24,0.13)" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 85% 65% at 30% 8%, #000 15%, transparent 76%)',
        }}
      />

      <div className="rail relative grid items-start gap-12 lg:grid-cols-[1.28fr_0.72fr] lg:gap-16">
        <div className="z-10 flex flex-col">
          <motion.div {...rise(0)} className="flex flex-wrap items-center gap-4">
            <Eyebrow>Licensed Scrap Buyers · Ingleburn</Eyebrow>
            <span className="flex items-center gap-1.5 rounded-full border border-hairline bg-white/[0.03] px-2.5 py-1">
              <Truck aria-hidden className="size-3 text-amber" />
              <span className="font-mono text-[10px] tracking-[0.12em] text-muted uppercase">
                Pickups available
              </span>
            </span>
          </motion.div>

          {/* The <h1> is the page's strongest on-page ranking signal, so it
              carries the terms people actually search — "scrap metal yard" and
              "Sydney" — rather than a slogan. "Paid on the spot" is accurate:
              EFT is processed before you leave the yard, which is what "on the
              spot" means. It is not a claim that we pay cash. */}
          <motion.h1
            {...rise(0.08)}
            className="mt-6 text-balance font-display text-d1 text-bright"
          >
            Sydney&rsquo;s best scrap metal yard.{' '}
            <span className="text-flame">Top prices, paid on the spot.</span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="measure mt-6 text-lead text-muted">
            The fastest turnaround in Ingleburn. No estimations, just top rates. We
            weigh it in front of you and pay by instant EFT before you drive out.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-10">
            <FlowGraphic />
          </motion.div>
        </div>

        <motion.div {...rise(0.2)} className="relative z-20 w-full max-w-[420px] lg:ml-auto">
          <QuickPrice />
        </motion.div>

      </div>

      {/* Everything we take, running past. */}
      <div className="relative mt-16 border-y border-hairline bg-ink/70 py-3.5 backdrop-blur lg:mt-20">
        <div className="flex overflow-hidden" aria-hidden>
          <div className="flex shrink-0 animate-[marquee_50s_linear_infinite] items-center gap-8 pr-8 motion-reduce:animate-none">
            {[...marquee, ...marquee].map((s, i) => (
              <span key={`${s}-${i}`} className="flex shrink-0 items-center gap-8">
                <span className="text-[15px] whitespace-nowrap text-muted">{s}</span>
                <span className="size-1 rounded-full bg-flame/60" />
              </span>
            ))}
          </div>
        </div>
        {/* The scrolling strip is decorative; this is the same list, once, for
            assistive tech and for anything that indexes the page. */}
        <p className="sr-only">
          Metals bought: {marquee.join(', ')}.
        </p>
      </div>
    </section>
  )
}
