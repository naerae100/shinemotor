import { motion } from 'framer-motion'
import { SETTLE, useSettle } from '../../hooks/useSettle'
import { Eyebrow } from '../ui/Eyebrow'
import { Glow } from '../ui/SectionHead'
import { QuickPrice } from './QuickPrice'

/**
 * Visual alternative to the Hero section.
 * Uses Framer Motion and photography to visually explain the scrap metal buying process.
 */
export function HeroVisual() {
  const { reduced } = useSettle()

  const rise = (delay: number) => ({
    initial: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.85, delay: reduced ? 0 : delay, ease: SETTLE },
  })

  const fadeScale = (delay: number) => ({
    initial: { opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1.2, delay, ease: SETTLE },
  })

  return (
    <section className="relative overflow-hidden bg-void">
      <Glow className="-top-48 -left-40 size-[680px]" from="rgba(255,77,45,0.20)" />
      
      {/* Background Graphic Element */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 10%, transparent 80%)',
        }}
      />

      <div className="rail relative grid items-center gap-12 pt-14 pb-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:pt-20 lg:pb-24">
        
        {/* Left Column: Text & Visuals */}
        <div className="flex flex-col">
          <motion.div {...rise(0)}>
            <Eyebrow>Licensed scrap metal buyers · Ingleburn NSW</Eyebrow>
          </motion.div>

          <motion.h1 {...rise(0.1)} className="mt-6 font-display text-d1 text-bright leading-tight">
            Turn your scrap metal into <span className="text-flame">instant cash.</span>
          </motion.h1>

          <motion.p {...rise(0.2)} className="measure mt-6 text-lead text-muted">
            From copper to heavy steel, we buy it all. Weighed in front of you on our calibrated scales, and paid directly to your account before you even leave the yard.
          </motion.p>

          {/* Visual Explainer Grid */}
          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3">
            {/* Visual 1 */}
            <motion.div {...fadeScale(0.3)} className="group relative overflow-hidden rounded-2xl border border-hairline bg-surface aspect-[4/3]">
              <img 
                src="/img/home/Bright-and-Shiny-Copper-service.webp" 
                alt="Copper Scrap"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-display text-sm text-bright">Top Rates</span>
                <p className="text-[12px] text-muted leading-tight">For all grades</p>
              </div>
            </motion.div>

            {/* Visual 2 */}
            <motion.div {...fadeScale(0.4)} className="group relative overflow-hidden rounded-2xl border border-hairline bg-surface aspect-[4/3]">
              <img 
                src="/img/home/home-slider-1-new.webp" 
                alt="Scrap Metal Yard"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-display text-sm text-bright">Drive in</span>
                <p className="text-[12px] text-muted leading-tight">Fast turnaround</p>
              </div>
            </motion.div>

            {/* Visual 3 */}
            <motion.div {...fadeScale(0.5)} className="group hidden sm:block relative overflow-hidden rounded-2xl border border-hairline bg-surface aspect-[4/3]">
              <img 
                src="/img/home/Heavy-Steel-service.webp" 
                alt="Heavy Steel"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-display text-sm text-bright">Instant EFT</span>
                <p className="text-[12px] text-muted leading-tight">Paid on the spot</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column: QuickPrice Form in a floating glass panel */}
        <motion.div {...rise(0.4)} className="relative lg:ml-auto w-full max-w-[420px]">
          {/* Decorative elements around the form */}
          <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-b from-flame/30 to-amber/5 opacity-50 blur-lg" />
          <Glow className="absolute -right-20 -top-20 size-[400px] z-[-1]" from="rgba(255,176,32,0.15)" />
          
          <div className="relative shadow-2xl shadow-black/50">
            <QuickPrice />
          </div>
        </motion.div>
      </div>

    </section>
  )
}
