import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { faqs } from '../../content/sections'
import { STATE, useSettle } from '../../hooks/useSettle'
import { Reveal, RevealItem } from '../ui/Reveal'

/** The logistics questions people actually ring to ask. */
export function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0)
  const { reduced } = useSettle()

  return (
    <section className="bg-void">
      <div className="rail section-y">
        {/* Centered header */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-amber">Questions</p>
          <h2 className="font-display text-d2 mt-4 text-bright">Before you load up.</h2>
          <p className="mt-5 text-muted">
            Anything not covered here, ask the yard directly — someone is on
            the phone from 7am.
          </p>
          <Link
            to="/contact"
            className="mt-5 inline-block text-[15px] font-semibold text-amber hover:underline"
          >
            Contact us →
          </Link>
        </Reveal>

        {/* Centered FAQ accordion */}
        <Reveal stagger as="ul" className="mx-auto mt-12 max-w-3xl">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <RevealItem
                as="li"
                key={faq.q}
                distance={10}
                className="mb-3 overflow-hidden rounded-2xl border border-hairline bg-surface"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-start justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span
                      className={`text-lead transition-colors duration-200 ${
                        isOpen ? 'text-amber' : 'text-bright'
                      }`}
                    >
                      {faq.q}
                    </span>
                    <Plus
                      aria-hidden
                      strokeWidth={2}
                      className={`mt-1 size-5 shrink-0 transition-transform duration-300 ease-out ${
                        isOpen ? 'rotate-45 text-amber' : 'text-muted'
                      }`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.32, ease: STATE }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-muted">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </RevealItem>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
