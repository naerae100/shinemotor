import { motion } from 'framer-motion'
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

/**
 * Fires once, at -12% viewport margin, so content is already settled by the
 * time it is comfortably in view rather than animating under the reader's eye.
 */
export function Reveal({
  children,
  className,
  distance = 20,
  stagger = false,
  as = 'div',
}: RevealProps) {
  const { variants, stagger: staggerVariants } = useSettle(distance)
  const Tag = motion[as]

  return (
    <Tag
      className={className}
      variants={stagger ? staggerVariants : variants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-12% 0px' }}
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
