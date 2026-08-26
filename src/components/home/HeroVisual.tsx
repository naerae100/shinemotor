import { motion } from 'framer-motion'
import { ShieldCheck, Truck } from 'lucide-react'
import { SETTLE, useSettle } from '../../hooks/useSettle'
import { Eyebrow } from '../ui/Eyebrow'
import { Glow } from '../ui/SectionHead'
import { QuickPrice } from './QuickPrice'

/**
 * Highly creative, animated Hero section using Framer Motion to tell the story
 * of the scrap metal process (Bring metal -> We weigh it -> You get paid instantly).
 * Features a custom 3D isometric illustration of the business flow.
 */
export function HeroVisual() {
  const { reduced } = useSettle()

  const rise = (delay: number) => ({
    initial: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.85, delay: reduced ? 0 : delay, ease: SETTLE },
  })

  return (
    <section className="relative overflow-hidden bg-void min-h-[90vh] flex items-center">
      {/* Deep ambient glows */}
      <Glow className="-top-48 -left-40 size-[800px]" from="rgba(255,122,24,0.15)" />
      <Glow className="bottom-0 right-0 size-[600px]" from="rgba(255,176,32,0.12)" />
      
      {/* High-tech grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, #000 20%, transparent 80%)',
        }}
      />

      <div className="rail relative grid items-center gap-12 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16 lg:py-24">
        
        {/* Left Column: Text & 3D Illustration */}
        <div className="flex flex-col z-10">
          <motion.div {...rise(0)} className="flex items-center gap-4 flex-wrap">
            <Eyebrow>Sydney's Premier Scrap Buyers</Eyebrow>
            <span className="flex items-center gap-1.5 rounded-full border border-flame/30 bg-flame/10 px-2.5 py-1">
              <Truck className="size-3 text-amber" />
              <span className="text-[11px] font-semibold tracking-wide text-amber uppercase">Pickups available</span>
            </span>
          </motion.div>

          <motion.h1 {...rise(0.1)} className="mt-6 font-display text-d1 text-bright leading-[1.1] tracking-tight">
            Bring your metal. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-flame">
              Leave with cash.
            </span>
          </motion.h1>

          <motion.p {...rise(0.2)} className="measure mt-6 text-lead text-muted">
            The fastest turnaround in Ingleburn. No waiting, no estimations. We weigh it in front of you and process instant EFT before you drive out.
          </motion.p>

          {/* Stunning 3D Graphic */}
          <motion.div {...rise(0.3)} className="mt-12 relative w-full max-w-[550px] aspect-video">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-amber/20 to-flame/20 blur-2xl opacity-40 mix-blend-screen" />
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-hairline bg-surface/50 shadow-2xl shadow-black/80">
              <img 
                src="/img/hero-process-graphic.png" 
                alt="3D illustration showing scrap metal turning into instant cash via digital scales and EFT transfer" 
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 rounded-full border border-hairline bg-black/40 px-3 py-1.5 backdrop-blur-md">
                  <ShieldCheck className="size-3.5 text-emerald-400" />
                  <span className="text-[12px] font-medium text-bright">SafeWork NSW</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-display text-sm text-bright">Instant Process</span>
                  <span className="text-[11px] text-amber tracking-wider uppercase font-semibold">Metal ➔ Weight ➔ EFT</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: QuickPrice Form in a floating glass panel */}
        <motion.div {...rise(0.4)} className="relative lg:ml-auto w-full max-w-[440px] z-20 mt-10 lg:mt-0">
          {/* Decorative backdrop for form */}
          <div className="absolute -inset-[2px] rounded-[28px] bg-gradient-to-b from-flame/40 via-amber/10 to-transparent opacity-60 blur-[2px]" />
          <div className="absolute -inset-4 rounded-[32px] bg-amber/5 opacity-40 blur-2xl" />
          
          <div className="relative shadow-2xl shadow-black/80">
            <QuickPrice />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
