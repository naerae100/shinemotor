import { motion } from 'framer-motion'
import { Truck, ArrowRight } from 'lucide-react'
import { SETTLE, useSettle } from '../../hooks/useSettle'
import { Eyebrow } from '../ui/Eyebrow'
import { Glow } from '../ui/SectionHead'
import { QuickPrice } from './QuickPrice'

/**
 * Premium parallax image masonry layout using real photography.
 */
function PremiumPhotoMasonry() {
  const { reduced } = useSettle()

  const imageReveal = (delay: number, yOffset: number) => ({
    initial: { opacity: reduced ? 1 : 0, y: reduced ? 0 : yOffset, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 1.2, delay, ease: SETTLE },
  })

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center gap-4 sm:gap-6 mt-8">
      
      {/* 1. Bring Metal */}
      <motion.div 
        {...imageReveal(0.6, 40)}
        className="group relative w-1/3 h-[280px] rounded-[2rem] overflow-hidden bg-surface mt-12 shadow-2xl"
      >
        <img 
          src="/img/home/sell-your-scrap-image.webp" 
          alt="Bring Scrap Metal"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-80 mix-blend-luminosity group-hover:mix-blend-normal"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-amber/10 mix-blend-overlay" />
        
        <div className="absolute bottom-6 left-6 right-6">
          <span className="font-mono text-[10px] text-amber tracking-[0.2em] uppercase mb-1 block">Step 01</span>
          <span className="font-display text-lg text-bright leading-tight">Bring<br/>Metal</span>
        </div>
      </motion.div>

      {/* 2. Weighed */}
      <motion.div 
        {...imageReveal(0.8, -40)}
        className="group relative w-1/3 h-[340px] rounded-[2rem] overflow-hidden bg-surface z-10 shadow-[0_0_50px_rgba(255,176,32,0.15)] border border-amber/20"
      >
        <img 
          src="/img/home/home-slider-1-new.webp" 
          alt="Weighing Scrap"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent opacity-90" />
        
        <div className="absolute bottom-6 left-6 right-6">
          <span className="font-mono text-[10px] text-amber tracking-[0.2em] uppercase mb-1 block">Step 02</span>
          <span className="font-display text-lg text-bright leading-tight">Instant<br/>Weigh</span>
        </div>
      </motion.div>

      {/* 3. Get Paid */}
      <motion.div 
        {...imageReveal(1.0, 40)}
        className="group relative w-1/3 h-[280px] rounded-[2rem] overflow-hidden bg-surface mt-12 shadow-2xl"
      >
        <img 
          src="/img/home/Bright-and-Shiny-Copper-service.webp" 
          alt="Get Paid for Copper"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-80 mix-blend-luminosity group-hover:mix-blend-normal"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-flame/10 mix-blend-overlay" />
        
        <div className="absolute bottom-6 left-6 right-6">
          <span className="font-mono text-[10px] text-flame tracking-[0.2em] uppercase mb-1 block">Step 03</span>
          <span className="font-display text-lg text-bright leading-tight">Leave<br/>Paid</span>
        </div>
      </motion.div>

      {/* Decorative Connecting Elements */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute left-[30%] top-[60%] z-20 flex items-center justify-center size-8 rounded-full bg-void border border-hairline shadow-lg"
      >
        <ArrowRight className="size-3 text-muted" />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}
        className="absolute right-[30%] top-[60%] z-20 flex items-center justify-center size-8 rounded-full bg-void border border-hairline shadow-lg"
      >
        <ArrowRight className="size-3 text-muted" />
      </motion.div>

    </div>
  )
}

/**
 * High-tech visual representation of the business.
 */
export function HeroVisual() {
  const { reduced } = useSettle()

  const rise = (delay: number) => ({
    initial: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.85, delay: reduced ? 0 : delay, ease: SETTLE },
  })

  return (
    <section className="relative overflow-hidden bg-void min-h-[90vh] flex items-center pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Deep ambient glows */}
      <Glow className="-top-48 -left-40 size-[800px]" from="rgba(255,122,24,0.15)" />
      <Glow className="bottom-0 right-0 size-[600px]" from="rgba(255,176,32,0.12)" />
      
      {/* Blueprint grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="rail relative grid items-start gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        
        {/* Left Column: Text & Technical Graphic */}
        <div className="flex flex-col z-10 pt-2">
          <motion.div {...rise(0)} className="flex items-center gap-4 flex-wrap">
            <Eyebrow>Licensed Scrap Buyers · Ingleburn</Eyebrow>
            <span className="flex items-center gap-1.5 rounded-full border border-flame/30 bg-flame/10 px-2.5 py-1">
              <Truck className="size-3 text-amber" />
              <span className="text-[10px] font-semibold tracking-[0.1em] text-amber uppercase">Pickups available</span>
            </span>
          </motion.div>

          <motion.h1 {...rise(0.1)} className="mt-5 font-display text-d1 text-bright leading-[1.05] tracking-tight">
            Bring your metal. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-flame">
              Leave with cash.
            </span>
          </motion.h1>

          <motion.p {...rise(0.2)} className="measure mt-5 text-lead text-muted">
            The fastest turnaround in Ingleburn. No estimations, just top rates. We weigh it in front of you and process instant EFT before you drive out.
          </motion.p>

          {/* Premium Photo Masonry Graphic */}
          <motion.div {...rise(0.3)} className="w-full">
             <PremiumPhotoMasonry />
          </motion.div>
        </div>

        {/* Right Column: QuickPrice Form in a floating glass panel */}
        <motion.div {...rise(0.4)} className="relative lg:ml-auto w-full max-w-[420px] z-20">
          {/* Decorative backdrop for form */}
          <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-b from-flame/40 via-amber/10 to-transparent opacity-60 blur-[1px]" />
          <div className="absolute -inset-4 rounded-[32px] bg-amber/5 opacity-40 blur-2xl" />
          
          <div className="relative shadow-2xl shadow-black/80">
            <QuickPrice />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
