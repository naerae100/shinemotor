import { motion } from 'framer-motion'
import { Truck } from 'lucide-react'
import { SETTLE, useSettle } from '../../hooks/useSettle'
import { Eyebrow } from '../ui/Eyebrow'
import { Glow } from '../ui/SectionHead'
import { QuickPrice } from './QuickPrice'

/**
 * High-fidelity JS/SVG Graphic: Pile of Copper/Metal Scrap
 */
function ScrapGraphic() {
  return (
    <div className="relative size-24 flex items-center justify-center group">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl transition-transform duration-500 group-hover:scale-110">
        
        {/* Abstract Steel Beams */}
        <motion.rect x="20" y="50" width="60" height="15" rx="2" fill="url(#steel-grad)" transform="rotate(-15 50 50)" />
        <motion.rect x="30" y="40" width="50" height="12" rx="2" fill="url(#steel-grad-dark)" transform="rotate(10 50 50)" />
        
        {/* Copper Pipes */}
        <motion.circle cx="40" cy="65" r="12" fill="url(#copper-grad)" stroke="#1a1a1a" strokeWidth="2" />
        <motion.circle cx="65" cy="70" r="10" fill="url(#copper-grad)" stroke="#1a1a1a" strokeWidth="2" />
        <motion.circle cx="55" cy="55" r="14" fill="url(#copper-grad-light)" stroke="#1a1a1a" strokeWidth="2" />
        
        {/* Pipe Holes */}
        <circle cx="40" cy="65" r="6" fill="#1a1a1a" />
        <circle cx="65" cy="70" r="5" fill="#1a1a1a" />
        <circle cx="55" cy="55" r="7" fill="#1a1a1a" />

        {/* Animated Sparkle */}
        <motion.path 
          d="M 25 30 Q 30 30 30 25 Q 30 30 35 30 Q 30 30 30 35 Q 30 30 25 30" 
          fill="#ffb020"
          animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />

        <defs>
          <linearGradient id="steel-grad" x1="20" y1="50" x2="80" y2="65" gradientUnits="userSpaceOnUse">
            <stop stopColor="#71717a" />
            <stop offset="1" stopColor="#3f3f46" />
          </linearGradient>
          <linearGradient id="steel-grad-dark" x1="30" y1="40" x2="80" y2="52" gradientUnits="userSpaceOnUse">
            <stop stopColor="#52525b" />
            <stop offset="1" stopColor="#27272a" />
          </linearGradient>
          <linearGradient id="copper-grad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#d97706" />
            <stop offset="1" stopColor="#92400e" />
          </linearGradient>
          <linearGradient id="copper-grad-light" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#f59e0b" />
            <stop offset="1" stopColor="#b45309" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

/**
 * High-fidelity JS/SVG Graphic: Calibrated Industrial Scale
 */
function ScaleGraphic() {
  return (
    <div className="relative size-24 flex items-center justify-center group">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl transition-transform duration-500 group-hover:scale-110">
        
        {/* Scale Base */}
        <path d="M10 80 L90 80 L80 90 L20 90 Z" fill="#27272a" />
        <rect x="15" y="75" width="70" height="5" fill="#52525b" />
        
        {/* Scale Platform with animation */}
        <motion.rect 
          x="20" y="70" width="60" height="4" fill="#ffb020"
          animate={{ y: [0, 2, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Digital Display Box */}
        <rect x="25" y="25" width="50" height="30" rx="4" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
        
        {/* Screen */}
        <rect x="30" y="30" width="40" height="20" rx="2" fill="#09090b" stroke="#ffb020" strokeWidth="1" strokeOpacity="0.3" />
        
        {/* Animated Digital Numbers */}
        <motion.text 
          x="50" y="44" 
          fontFamily="monospace" 
          fontSize="10" 
          fontWeight="bold" 
          fill="#ffb020" 
          textAnchor="middle"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 0.1, repeat: Infinity }}
          style={{ textShadow: "0 0 8px rgba(255,176,32,0.8)" }}
        >
          1450 KG
        </motion.text>
        
        {/* Glowing LED Dot */}
        <motion.circle 
          cx="35" cy="40" r="1.5" fill="#ffb020"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </svg>
    </div>
  )
}

/**
 * High-fidelity JS/SVG Graphic: Instant EFT / Smartphone Transfer
 */
function EFTGraphic() {
  return (
    <div className="relative size-24 flex items-center justify-center group">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl transition-transform duration-500 group-hover:scale-110">
        
        {/* Phone Body */}
        <rect x="30" y="15" width="40" height="70" rx="6" fill="#18181b" stroke="#ff4d2d" strokeWidth="2" />
        <rect x="33" y="18" width="34" height="64" rx="4" fill="#09090b" />
        
        {/* Phone Notch */}
        <path d="M45 18 L55 18" stroke="#3f3f46" strokeWidth="3" strokeLinecap="round" />
        
        {/* Banking UI Lines */}
        <rect x="38" y="35" width="24" height="4" rx="2" fill="#27272a" />
        <rect x="38" y="43" width="16" height="4" rx="2" fill="#27272a" />

        {/* Success Circle */}
        <circle cx="50" cy="60" r="12" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1" />
        
        {/* Animated Checkmark */}
        <motion.path 
          d="M 45 60 L 49 64 L 56 55" 
          stroke="#10b981" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2, ease: "easeOut" }}
          style={{ filter: "drop-shadow(0 0 4px rgba(16,185,129,0.8))" }}
        />
        
        {/* Radiating success waves */}
        <motion.circle 
          cx="50" cy="60" r="12" stroke="#10b981" strokeWidth="1"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
        />
      </svg>
    </div>
  )
}

/**
 * Premium glassmorphism workflow using pure JS Graphics
 */
function PremiumWorkflowGraphic() {
  return (
    <div className="relative w-full h-[240px] sm:h-[280px] flex items-center justify-between px-2 sm:px-4 mt-8">
      
      {/* Animated connecting laser line */}
      <div className="absolute left-[15%] right-[15%] top-[40%] h-[2px] bg-void z-0 -translate-y-1/2 overflow-hidden rounded-full">
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
        <div className="relative flex items-center justify-center p-4 rounded-3xl bg-gradient-to-b from-surface/50 to-void border border-hairline shadow-[0_0_30px_rgba(255,255,255,0.02)] backdrop-blur-sm">
          <ScrapGraphic />
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
        <div className="relative flex items-center justify-center p-4 rounded-3xl bg-gradient-to-b from-[#1a1a1a]/80 to-void border border-amber/30 shadow-[0_0_40px_rgba(255,176,32,0.1)] backdrop-blur-sm">
          <ScaleGraphic />
          <div className="absolute -bottom-3 rounded-full bg-void border border-amber px-3 py-0.5 text-[10px] text-amber tracking-widest uppercase font-mono shadow-[0_0_15px_rgba(255,176,32,0.3)] font-semibold z-20">
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
        <div className="relative flex items-center justify-center p-4 rounded-3xl bg-gradient-to-b from-flame/10 to-void border border-flame/40 shadow-[0_0_30px_rgba(255,77,45,0.15)] backdrop-blur-sm">
          <EFTGraphic />
          <div className="absolute -top-3 left-[-10px] rounded-full bg-flame px-2 py-0.5 text-[10px] text-white font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(255,77,45,0.4)] z-20">
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
