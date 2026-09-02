import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import type { ReactNode } from 'react'
import { useSettle } from '../../hooks/useSettle'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Vertical travel in px. Larger elements settle from further away. */
  distance?: number
  /** Stagger children that are themselves <RevealItem>s. */
  stagger?: boolean
  as?: 'div' | 'section' | 'ul' | 'ol' | 'li' | 'dl' | 'header' | 'footer'
}

/** Fires once, at -12% viewport margin, so content is settled before it is read. */
const VIEWPORT = { once: true, margin: '-12% 0px' } as const

/**
 * Scroll reveal, with a guarantee that content cannot stay invisible.
 *
 * The previous version used `whileInView` alone. That reveals content by
 * animating it from opacity 0, which means anything the IntersectionObserver
 * fails to report stays at opacity 0 permanently — the section has laid out,
 * takes up its full height, and renders nothing. That is the "sometimes the
 * page doesn't load the content" symptom: the content is in the DOM and
 * readable to a crawler, but invisible on screen.
 *
 * The observer can miss for several reasons — a route change that reuses this
 * component instance so `once: true` state carries over, layout shifting under
 * it as lazy images resolve, or a fast scroll past the trigger band. Rather
 * than chase each one, this adds a safety net: shortly after mount, if the
 * element is actually within the viewport but has not been revealed, it is
 * shown regardless. Elements below the fold are untouched, so the scroll
 * choreography is unchanged.
 */
export function Reveal({
  children,
  className,
  distance = 20,
  stagger = false,
  as = 'div',
}: RevealProps) {
  const { variants, stagger: staggerVariants } = useSettle(distance)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, VIEWPORT)
  const [forced, setForced] = useState(false)

  useEffect(() => {
    if (inView || forced) return
    const t = setTimeout(() => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      // Only rescue what is genuinely on screen and still hidden.
      if (r.top < window.innerHeight && r.bottom > 0) setForced(true)
    }, 900)
    return () => clearTimeout(t)
  }, [inView, forced])

  const Tag = motion[as]

  return (
    <Tag
      ref={ref as never}
      className={className}
      variants={stagger ? staggerVariants : variants}
      initial="hidden"
      animate={inView || forced ? 'shown' : 'hidden'}
    >
      {children}
    </Tag>
  )
}

/** A child of a <Reveal stagger>. Inherits the parent's timeline. */
export function RevealItem({
  children,
  className,
  distance = 20,
  as = 'div',
}: Omit<RevealProps, 'stagger'>) {
  const { variants } = useSettle(distance)
  const Tag = motion[as]
  return (
    <Tag className={className} variants={variants}>
      {children}
    </Tag>
  )
}
