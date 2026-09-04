import { m as motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { STATE } from '../../hooks/useSettle'
import { useRequestQuote } from '../../hooks/useQuotePrefill'

const press = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2, ease: STATE },
}

interface ButtonProps {
  href: string
  children: ReactNode
  className?: string
}

/** Primary action — molten copper gradient with a matching bloom beneath it. */
export function PrimaryCta({ href, children, className = '' }: ButtonProps) {
  return (
    <motion.a
      href={href}
      {...press}
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-[15px] font-semibold text-on-flame ${className}`}
      style={{ boxShadow: '0 10px 34px -10px rgba(255,122,24,0.65)' }}
    >
      <span aria-hidden className="grad-flame absolute inset-0" />
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'linear-gradient(100deg,#ff8f2b,#ffc44d)' }}
      />
      <span className="relative">{children}</span>
      <ArrowRight
        aria-hidden
        className="relative size-[17px] transition-transform duration-300 ease-out group-hover:translate-x-1"
        strokeWidth={2.25}
      />
    </motion.a>
  )
}

/** Secondary action — frosted glass, never a second solid button. */
export function GhostCta({ href, children, className = '' }: ButtonProps) {
  return (
    <motion.a
      href={href}
      {...press}
      className={`glass group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold text-bright transition-colors duration-200 hover:border-flame/50 ${className}`}
    >
      {children}
      <ArrowRight
        aria-hidden
        className="size-[17px] text-muted transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-amber"
        strokeWidth={2.25}
      />
    </motion.a>
  )
}

/** Inline link with a gradient underline. */
export function TextCta({ href, children, className = '' }: ButtonProps) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 font-semibold text-amber transition-colors duration-200 hover:text-flame ${className}`}
    >
      <span className="border-b border-amber/30 pb-0.5 transition-colors group-hover:border-amber">
        {children}
      </span>
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
        strokeWidth={2.25}
      />
    </a>
  )
}

/**
 * Compact "Request a quote" that carries its material across to the form.
 * Used on every card in the catalogue.
 */
export function QuoteChip({
  material,
  className = '',
  full = false,
}: {
  material: string
  className?: string
  full?: boolean
}) {
  const requestQuote = useRequestQuote()
  return (
    <button
      type="button"
      onClick={() => requestQuote(material)}
      className={`group/chip inline-flex items-center justify-center gap-2 rounded-full border border-flame/35 bg-flame/10 px-4 py-2 text-[13px] font-semibold text-amber transition-all duration-200 hover:border-flame hover:bg-flame hover:text-on-flame ${
        full ? 'w-full' : ''
      } ${className}`}
    >
      Request a quote
      <ArrowRight
        aria-hidden
        className="size-3.5 transition-transform duration-300 ease-out group-hover/chip:translate-x-0.5"
        strokeWidth={2.5}
      />
      <span className="sr-only">for {material}</span>
    </button>
  )
}
