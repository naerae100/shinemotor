import { motion } from 'framer-motion'
import { Truck, Check } from 'lucide-react'
import { SETTLE, useSettle } from '../../hooks/useSettle'
import { Eyebrow } from '../ui/Eyebrow'
import { Glow } from '../ui/SectionHead'
import { QuickPrice } from './QuickPrice'

/**
 * Premium glassmorphism workflow graphic with photo integration
 */
function PremiumWorkflowGraphic() {
  return (
    <div className="relative w-full h-[280px] sm:h-[320px] flex items-center justify-between px-2 sm:px-4 mt-8">
      
      {/* Animated connecting laser line */}
      <div className="absolute left-[15%] right-[15%] top-[45%] h-[2px] bg-void z-0 -translate-y-1/2 overflow-hidden rounded-full">
        <div className="absolute inset-0 bg-hairline opacity-50" />
        <motion.div 
          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-amber to-transparent blur-[1px]"
          animate={{ x: ['-100%', '300%'] }}
          transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
        />
      </div>

      {/* Step 1: Metal / Scrap */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: SETTLE }}
        className="relative z-10 flex flex-col items-center gap-4 w-[110px] sm:w-[130px]"
      >
        <div className="group relative size-24 sm:size-28 rounded-2xl bg-void border border-hairline flex items-center justify-center shadow-xl transition-all duration-500 hover:border-amber/50 hover:shadow-[0_0_30px_rgba(255,176,32,0.15)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
          
          {/* Photo Integration */}
          <img 
            src="/img/home/sell-your-scrap-image.webp" 
            alt="Scrap Metal" 
            className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent opacity-80" />
          
          <div className="absolute -top-3 right-[-10px] rounded border border-hairline bg-void px-2 py-0.5 text-[10px] text-muted tracking-widest uppercase font-mono shadow-md z-20">
            Scrap
          </div>
        </div>
        <div className="text-center">
          <span className="font-display text-[13px] sm:text-[15px] text-bright block">1. Bring Metal</span>
          <span className="text-[11px] text-muted tracking-wide">Any grade</span>
        </div>
      </motion.div>

      {/* Step 2: Calibrated Scales */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: SETTLE }}
        className="relative z-10 flex flex-col items-center gap-4 w-[110px] sm:w-[130px]"
      >
        <div className="group relative size-28 sm:size-32 rounded-[1.5rem] bg-void border border-amber/40 flex items-center justify-center shadow-[0_0_40px_rgba(255,176,32,0.15)] overflow-hidden">
          
          {/* Photo Integration */}
          <img 
            src="/img/home/home-slider-1-new.webp" 
            alt="Weighing Scale" 
            className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/10 opacity-90" />
          
          {/* Scanning animation effect */}
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
            className="absolute inset-x-0 h-[2px] bg-amber/50 blur-[1px] z-10"
          />

          <div className="flex flex-col items-center gap-2 relative z-20 mt-4">
            <div className="bg-black/70 backdrop-blur-sm border border-amber/30 rounded px-2.5 py-1 flex items-center gap-1.5 shadow-inner">
              <span className="relative flex size-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75"></span>
                <span className="relative inline-flex rounded-full size-1.5 bg-amber"></span>
              </span>
              <motion.span 
                className="font-mono text-[11px] sm:text-[12px] text-amber font-semibold tracking-wider"
              >
                1450 KG
              </motion.span>
            </div>
          </div>
          
          <div className="absolute -bottom-3 rounded-full bg-void border border-amber px-3 py-0.5 text-[10px] text-amber tracking-widest uppercase font-mono shadow-[0_0_15px_rgba(255,176,32,0.4)] font-semibold z-20">
            Weighed
          </div>
        </div>
        <div className="text-center">
          <span className="font-display text-[13px] sm:text-[15px] text-bright block">2. Weighed</span>
          <span className="text-[11px] text-muted tracking-wide">In front of you</span>
        </div>
      </motion.div>

      {/* Step 3: Instant EFT / Cash */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: SETTLE }}
        className="relative z-10 flex flex-col items-center gap-4 w-[110px] sm:w-[130px]"
      >
        <div className="group relative size-24 sm:size-28 rounded-2xl bg-void border border-flame/50 flex items-center justify-center shadow-[0_0_30px_rgba(255,77,45,0.2)] transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,77,45,0.4)] overflow-hidden">
          
          {/* Photo Integration */}
          <img 
            src="/img/home/Bright-and-Shiny-Copper-service.webp" 
            alt="Cash / Payment" 
            className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent opacity-80" />
          <div className="absolute inset-0 bg-flame/10 mix-blend-overlay z-10" />

          <div className="relative z-20 flex flex-col items-center">
            {/* Elegant glowing checkmark */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.1, 1] }}
              transition={{ delay: 2, duration: 0.5, ease: "backOut", repeat: Infinity, repeatDelay: 3 }}
              className="rounded-full bg-emerald-500/20 backdrop-blur-sm p-2 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)] mt-2"
            >
              <Check className="size-5 sm:size-6 text-emerald-400" strokeWidth={3} />
            </motion.div>
          </div>
          
          <div className="absolute -top-3 left-[-10px] rounded-full bg-flame px-2 py-0.5 text-[10px] text-white font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(255,77,45,0.5)] z-20">
            PAID
          </div>
        </div>
        <div className="text-center">
          <span className="font-display text-[13px] sm:text-[15px] text-bright block">3. Instant EFT</span>
          <span className="text-[11px] text-muted tracking-wide">Before you leave</span>
        </div>
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

      {/* Changed items-center to items-start so title and form align perfectly at the top */}
      <div className="rail relative grid items-start gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
        
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

          {/* Animated Business Process Graphic */}
          <motion.div {...rise(0.3)} className="w-full">
             <PremiumWorkflowGraphic />
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
