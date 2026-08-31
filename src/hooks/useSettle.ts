import { useReducedMotion } from 'framer-motion'
import type { Transition, Variants } from 'framer-motion'

/** The two curves. Entrances settle; state changes move. Nothing else. */
export const SETTLE: Transition['ease'] = [0.16, 1, 0.3, 1]
export const STATE: Transition['ease'] = [0.4, 0, 0.2, 1]

/**
 * Reveal variants for anything entering the viewport.
 *
 * Objects settle into place: opacity plus a short vertical travel, no scale,
 * no overshoot, no spring. When the visitor has asked for reduced motion the
 * travel is removed and the duration collapses — the content is simply there.
 */
export function useSettle(distance = 20) {
  const reduced = useReducedMotion()

  const variants: Variants = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : distance },
    shown: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.8, ease: SETTLE },
    },
  }

  /**
   * Applied to a parent to stagger its children.
   *
   * 90ms rather than 70: at 70 a three-up card row reads as one block landing
   * slightly out of sync, which looks like jank. At 90 the eye tracks each card
   * in turn and the row reads as deliberate. `delayChildren` lets the container
   * settle before its contents start, so the two motions don't overlap.
   */
  const stagger: Variants = {
    hidden: {},
    shown: {
      transition: {
        staggerChildren: reduced ? 0 : 0.09,
        delayChildren: reduced ? 0 : 0.05,
      },
    },
  }

  return { reduced, variants, stagger }
}
