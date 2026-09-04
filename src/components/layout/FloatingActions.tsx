import { AnimatePresence, m as motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { MessageCircle, Phone, X } from 'lucide-react'
import { useState } from 'react'
import { site } from '../../content/site'
import { SETTLE, useSettle } from '../../hooks/useSettle'
import { WA_GENERAL, WHATSAPP_DISPLAY } from '../../lib/whatsapp'

/**
 * Persistent direct-contact dock.
 *
 * In this trade the conversation almost always starts with a photo of a load
 * and "what's this worth?", so WhatsApp is the primary action and the phone is
 * the fallback. Collapsed to a single button until tapped, so it never sits on
 * top of the page shouting.
 */
export function FloatingActions() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()
  const { reduced } = useSettle()

  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > 320))

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open && visible && (
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : 0.96 }}
            transition={{ duration: reduced ? 0 : 0.28, ease: SETTLE }}
            className="flex flex-col items-end gap-2.5"
          >
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full border border-[#25D366]/40 bg-[#0d1b14] py-3 pr-5 pl-4 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.9)] transition-colors hover:border-[#25D366]"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-[#25D366]">
                <MessageCircle aria-hidden className="size-4 text-[#0d1b14]" strokeWidth={2.5} />
              </span>
              <span className="text-left leading-tight">
                <span className="block text-[14px] font-semibold text-bright">
                  WhatsApp us a photo
                </span>
                <span className="block font-mono text-[11px] text-muted">
                  {WHATSAPP_DISPLAY}
                </span>
              </span>
            </a>
            <a
              href={site.phones[0].href}
              className="flex items-center gap-3 rounded-full border border-hairline bg-surface py-3 pr-5 pl-4 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.9)] transition-colors hover:border-flame"
            >
              <span className="grad-flame flex size-8 items-center justify-center rounded-full">
                <Phone aria-hidden className="size-4 text-on-flame" strokeWidth={2.5} />
              </span>
              <span className="text-left leading-tight">
                <span className="block text-[14px] font-semibold text-bright">Call the yard</span>
                <span className="block font-mono text-[11px] text-muted">
                  {site.phones[0].label}
                </span>
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            onClick={() => setOpen((o) => !o)}
            initial={{ opacity: 0, scale: reduced ? 1 : 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduced ? 1 : 0.8 }}
            transition={{ duration: reduced ? 0 : 0.25, ease: SETTLE }}
            aria-expanded={open}
            aria-label={open ? 'Close contact options' : 'Open contact options'}
            className="flex size-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_14px_34px_-10px_rgba(37,211,102,0.7)]"
          >
            {open ? (
              <X aria-hidden className="size-6 text-[#0d1b14]" strokeWidth={2.5} />
            ) : (
              <MessageCircle aria-hidden className="size-7 text-[#0d1b14]" strokeWidth={2.25} />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
