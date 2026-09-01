import { useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import {
  ArrowUpRight,
  AtSign,
  Check,
  Clock3,
  Copy,
  Globe,
  MessageCircle,
  Navigation,
  PhoneCall,
  Share2,
  Smartphone,
  UserRoundPlus,
} from 'lucide-react'
import { site, addressLine } from '../content/site'
import { personBySlug } from '../content/team'
import type { Person } from '../content/team'
import { saveVCard } from '../lib/vcard'
import type { SaveOutcome } from '../lib/vcard'
import { whatsappUrl } from '../lib/whatsapp'
import { useSeo } from '../lib/seo'
import { FacebookMark, LinkedInMark, XMark, YouTubeMark } from '../components/ui/BrandMarks'

const BRAND_MARKS = {
  Facebook: FacebookMark,
  YouTube: YouTubeMark,
  LinkedIn: LinkedInMark,
  X: XMark,
} as const

/**
 * Digital business card.
 *
 * Deliberately a different object from the website. The site is molten copper —
 * heavy display type, warm ground, gradients doing the work. A card handed to a
 * stranger should read as precision rather than heat, so this is machined steel:
 * cool graphite, brushed grain, Swiss restraint, and copper reduced to a single
 * hairline. Same company, different material.
 *
 * Everything else follows from "it will be held on a phone": one narrow column,
 * 44px targets, and a sheen that tracks the pointer so the surface behaves like
 * metal rather than a flat rectangle.
 */
export function Card() {
  const { slug } = useParams()
  const person = personBySlug(slug ?? '')
  if (!person) return <Navigate to="/contact" replace />
  return <CardView person={person} />
}

/* Card-local palette. Not the site tokens — this object is cool where the site
   is warm, and the two are meant to sit apart. */
const C = {
  base: '#0d0e10',
  plate: '#16181c',
  plateHi: '#1e2127',
  line: '#ffffff14',
  lineLit: '#ffffff26',
  text: '#eef0f3',
  soft: '#a2a8b2',
  faint: '#8b929e',   /* 4.9:1 on the plate — labels stay legible */
  copper: '#ff7a18',
} as const

function CardView({ person }: { person: Person }) {
  useSeo(
    `${person.name} — ${person.role}, ${site.shortName}`,
    `Contact card for ${person.name}, ${person.role} at ${site.legalName}. Licensed scrap metal buyers in ${site.address.suburb}, ${site.address.state}. Save the details straight to your phone.`,
  )

  const reduced = useReducedMotion()
  const [outcome, setOutcome] = useState<SaveOutcome | null>(null)
  const [busy, setBusy] = useState(false)
  const [shared, setShared] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const plateRef = useRef<HTMLDivElement>(null)

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const cardUrl = typeof window !== 'undefined' ? window.location.href : ''

  /* Sheen. Tracks the pointer on a mouse, drifts on its own on touch — no tilt
     permission prompt, and it still reads as a moving highlight on metal. */
  const mx = useMotionValue(50)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 })
  const sheen = useMotionTemplate`radial-gradient(600px circle at ${sx}% ${sy}%, rgba(255,255,255,0.07), transparent 45%)`

  useEffect(() => {
    if (reduced) return
    const el = plateRef.current
    if (!el) return
    const fine = window.matchMedia('(pointer: fine)').matches

    if (fine) {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        mx.set(((e.clientX - r.left) / r.width) * 100)
        my.set(((e.clientY - r.top) / r.height) * 100)
      }
      window.addEventListener('pointermove', move)
      return () => window.removeEventListener('pointermove', move)
    }

    let raf = 0
    const start = performance.now()
    const loop = (t: number) => {
      const p = (t - start) / 5200
      mx.set(50 + Math.cos(p) * 45)
      my.set(30 + Math.sin(p * 0.8) * 40)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [mx, my, reduced])

  const save = async () => {
    setBusy(true)
    const result = await saveVCard(person, siteUrl)
    setBusy(false)
    if (result === 'cancelled') return
    setOutcome(result)
    setTimeout(() => setOutcome(null), 5000)
  }

  const copy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(key)
      setTimeout(() => setCopied(null), 1800)
    } catch {
      /* Clipboard unavailable — the value is selectable on screen. */
    }
  }

  const share = async () => {
    const payload = {
      title: `${person.name} — ${site.shortName}`,
      text: `${person.name}, ${person.role} at ${site.legalName}`,
      url: cardUrl,
    }
    if (navigator.share) {
      try {
        await navigator.share(payload)
        return
      } catch {
        /* Cancelled — fall through to copying. */
      }
    }
    try {
      await navigator.clipboard.writeText(cardUrl)
      setShared(true)
      setTimeout(() => setShared(false), 2400)
    } catch {
      /* no-op */
    }
  }

  const enter = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] as const },
        }

  return (
    <main
      className="relative min-h-dvh w-full overflow-hidden"
      style={{ backgroundColor: C.base }}
    >
      {/* Cool ambient pool, plus one warm ember far off — the only heat here. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-52 left-1/2 size-[760px] -translate-x-1/2 rounded-full blur-[140px]"
        style={{ background: 'rgba(120,140,170,0.10)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-32 size-[420px] rounded-full blur-[130px]"
        style={{ background: 'rgba(255,122,24,0.10)' }}
      />

      <div className="relative mx-auto w-full max-w-[430px] px-5 py-8 sm:py-14">
        <motion.div
          ref={plateRef}
          {...enter(0)}
          className="relative overflow-hidden rounded-[26px]"
          style={{
            backgroundColor: C.plate,
            border: `1px solid ${C.line}`,
            boxShadow: '0 40px 90px -50px rgba(0,0,0,1), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {/* Brushed grain — fine vertical striations, the way milled plate looks. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(96deg, rgba(255,255,255,0.028) 0px, rgba(255,255,255,0.028) 1px, transparent 1px, transparent 4px)',
            }}
          />
          {/* Pointer-tracked sheen. */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: reduced ? 'none' : sheen }}
          />
          {/* The single copper hairline. */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${C.copper}b3 30%, ${C.copper}66 60%, transparent)`,
            }}
          />

          <div className="relative">
            {/* ── Masthead ─────────────────────────────────────────────── */}
            <div
              className="flex items-start justify-between gap-4 px-7 pt-7 pb-6"
              style={{ borderBottom: `1px solid ${C.line}` }}
            >
              <img
                src="/img/home/logo/shine-motor-logo-one.png"
                alt={site.legalName}
                className="h-8 w-auto"
                width={150}
                height={32}
              />
              <span
                className="mt-0.5 shrink-0 font-mono text-[10px] tracking-[0.18em] uppercase"
                style={{ color: C.faint }}
              >
                Est. {site.established}
              </span>
            </div>

            {/* ── Identity ─────────────────────────────────────────────── */}
            <motion.div {...enter(1)} className="px-7 pt-8 pb-7">
              <p
                className="font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ color: C.copper }}
              >
                {person.role}
              </p>
              <h1
                className="mt-3 font-display text-[34px] leading-[1.05] tracking-[-0.02em]"
                style={{ color: C.text, fontWeight: 600, fontStretch: '100%' }}
              >
                {person.name}
              </h1>
              <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: C.soft }}>
                {site.legalName}
              </p>
            </motion.div>

            {/* ── Primary action ───────────────────────────────────────── */}
            <motion.div {...enter(2)} className="px-7">
              <button
                type="button"
                onClick={save}
                className="group relative flex min-h-[52px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl text-[15px] font-semibold transition-transform duration-200 active:scale-[0.985]"
                style={{
                  color: C.base,
                  background: 'linear-gradient(180deg, #f4f6f8, #d8dde4)',
                  boxShadow: '0 14px 34px -18px rgba(255,255,255,0.35)',
                }}
              >
                {outcome ? (
                  <>
                    <Check aria-hidden className="size-[18px]" strokeWidth={2.5} />
                    {outcome === 'shared' ? 'Sent to your phone' : 'Contact file ready'}
                  </>
                ) : (
                  <>
                    <UserRoundPlus aria-hidden className="size-[18px]" strokeWidth={2} />
                    {busy ? 'Preparing…' : 'Add to contacts'}
                  </>
                )}
              </button>
              <p
                aria-live="polite"
                className="mt-2.5 text-center text-[11.5px] leading-relaxed"
                style={{ color: C.faint }}
              >
                {outcome === 'shared'
                  ? 'Choose Contacts in the share sheet to finish.'
                  : outcome === 'downloaded'
                    ? 'Downloaded — open the file to add it to your contacts.'
                    : 'Opens your share sheet, or downloads a contact file.'}
              </p>
            </motion.div>

            {/* ── Quick actions ────────────────────────────────────────── */}
            <motion.div {...enter(3)} className="mt-2.5 grid grid-cols-3 gap-2.5 px-7">
              <Action
                href={site.phones[0].href}
                icon={<PhoneCall className="size-[17px]" strokeWidth={1.75} />}
                label="Call"
              />
              <Action
                href={whatsappUrl(
                  `Hi ${person.given}, I found your card on the Shine Motor site.`,
                )}
                external
                icon={<MessageCircle className="size-[17px]" strokeWidth={1.75} />}
                label="WhatsApp"
              />
              <Action
                href={site.address.mapUrl}
                external
                icon={<Navigation className="size-[17px]" strokeWidth={1.75} />}
                label="Directions"
              />
            </motion.div>

            {/* ── Details ──────────────────────────────────────────────── */}
            <motion.dl {...enter(4)} className="mt-7">
              <Row
                icon={<Smartphone className="size-[15px]" strokeWidth={1.75} />}
                label={site.phones[0].use}
                value={site.phones[0].label}
                href={site.phones[0].href}
                onCopy={() => copy(site.phones[0].label, 'p0')}
                copied={copied === 'p0'}
                mono
              />
              <Row
                icon={<PhoneCall className="size-[15px]" strokeWidth={1.75} />}
                label={site.phones[1].use}
                value={site.phones[1].label}
                href={site.phones[1].href}
                onCopy={() => copy(site.phones[1].label, 'p1')}
                copied={copied === 'p1'}
                mono
              />
              <Row
                icon={<AtSign className="size-[15px]" strokeWidth={1.75} />}
                label="Email"
                value={site.email}
                href={`mailto:${site.email}`}
                onCopy={() => copy(site.email, 'em')}
                copied={copied === 'em'}
              />
              <Row
                icon={<Navigation className="size-[15px]" strokeWidth={1.75} />}
                label="Yard"
                value={addressLine}
                href={site.address.mapUrl}
                external
                onCopy={() => copy(addressLine, 'ad')}
                copied={copied === 'ad'}
              />
              <Row
                icon={<Clock3 className="size-[15px]" strokeWidth={1.75} />}
                label="Trading hours"
                value="Mon–Fri 7am–5pm · Sat 7am–1pm"
              />
              <Row
                icon={<Globe className="size-[15px]" strokeWidth={1.75} />}
                label="Website"
                value="shinemotor.com.au"
                href="/"
              />
            </motion.dl>

            {/* ── Socials + share ──────────────────────────────────────── */}
            <motion.div
              {...enter(5)}
              className="flex items-center justify-between gap-3 px-7 py-6"
              style={{ borderTop: `1px solid ${C.line}` }}
            >
              <ul className="flex items-center gap-2">
                {site.social.map((s) => {
                  const Mark = BRAND_MARKS[s.label as keyof typeof BRAND_MARKS]
                  return (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex size-11 items-center justify-center rounded-xl transition-colors duration-200"
                        style={{ border: `1px solid ${C.line}`, color: C.faint }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = C.text
                          e.currentTarget.style.borderColor = C.lineLit
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = C.faint
                          e.currentTarget.style.borderColor = C.line
                        }}
                      >
                        {Mark ? <Mark aria-hidden className="size-4" /> : s.label.slice(0, 1)}
                        <span className="sr-only">
                          {site.shortName} on {s.label}
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>

              <button
                type="button"
                onClick={share}
                className="flex min-h-11 items-center gap-2 rounded-xl px-4 text-[13px] font-semibold transition-colors duration-200"
                style={{ border: `1px solid ${C.line}`, color: C.soft }}
              >
                {shared ? (
                  <Check aria-hidden className="size-4" strokeWidth={2.25} />
                ) : (
                  <Share2 aria-hidden className="size-4" strokeWidth={1.75} />
                )}
                {shared ? 'Copied' : 'Share'}
              </button>
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          {...enter(6)}
          className="mt-6 text-center font-mono text-[10.5px] tracking-[0.16em] uppercase"
          style={{ color: C.faint }}
        >
          {site.serviceArea}
        </motion.p>
      </div>
    </main>
  )
}

/** One of the three action tiles under the primary button. */
function Action({
  href,
  icon,
  label,
  external,
}: {
  href: string
  icon: React.ReactNode
  label: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="flex min-h-[64px] flex-col items-center justify-center gap-2 rounded-2xl transition-colors duration-200"
      style={{ border: `1px solid ${C.line}`, color: C.soft, backgroundColor: '#ffffff06' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = C.lineLit
        e.currentTarget.style.color = C.text
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = C.line
        e.currentTarget.style.color = C.soft
      }}
    >
      {icon}
      <span className="text-[11.5px] font-semibold tracking-wide">{label}</span>
    </a>
  )
}

/**
 * A detail line. The value is the link; a separate copy button sits at the end
 * so the row can be both tapped to act on and tapped to copy — on a card handed
 * over in person, copying is what people actually want.
 */
function Row({
  icon,
  label,
  value,
  href,
  external,
  onCopy,
  copied,
  mono,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
  external?: boolean
  onCopy?: () => void
  copied?: boolean
  mono?: boolean
}) {
  const body = (
    <>
      <span aria-hidden className="mt-[3px] shrink-0" style={{ color: C.faint }}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className="block font-mono text-[9.5px] tracking-[0.2em] uppercase"
          style={{ color: C.faint }}
        >
          {label}
        </span>
        <span
          className={`mt-1.5 block text-[14.5px] leading-snug break-words ${mono ? 'font-mono tracking-tight' : ''}`}
          style={{ color: C.text }}
        >
          {value}
        </span>
      </span>
      {href && (
        <ArrowUpRight
          aria-hidden
          className="mt-0.5 size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: C.faint }}
          strokeWidth={1.75}
        />
      )}
    </>
  )

  return (
    <div
      className="flex items-start"
      style={{ borderTop: `1px solid ${C.line}` }}
    >
      {href ? (
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
          className="group flex min-w-0 flex-1 items-start gap-3.5 py-4 pr-2 pl-7 transition-colors"
        >
          {body}
        </a>
      ) : (
        <div className="flex min-w-0 flex-1 items-start gap-3.5 py-4 pr-2 pl-7">{body}</div>
      )}

      {onCopy && (
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy ${label.toLowerCase()}`}
          className="mr-4 mt-2.5 flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-200"
          style={{ color: copied ? C.copper : C.faint }}
        >
          {copied ? (
            <Check aria-hidden className="size-4" strokeWidth={2.25} />
          ) : (
            <Copy aria-hidden className="size-[15px]" strokeWidth={1.75} />
          )}
        </button>
      )}
    </div>
  )
}
