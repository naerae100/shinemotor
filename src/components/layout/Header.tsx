import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ChevronDown, Clock, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { services } from '../../content/services'
import { families, metalsByFamily } from '../../content/metals'
import { site } from '../../content/site'
import { STATE } from '../../hooks/useSettle'
import { WA_GENERAL } from '../../lib/whatsapp'
import { PrimaryCta } from '../ui/Button'

export function Header() {
  const [lifted, setLifted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menu, setMenu] = useState<'metals' | 'services' | null>(null)
  const { scrollY } = useScroll()
  const { pathname } = useLocation()

  useMotionValueEvent(scrollY, 'change', (y) => setLifted(y > 16))

  // Any navigation closes whatever was open.
  useEffect(() => {
    setMobileOpen(false)
    setMenu(null)
  }, [pathname])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[15px] font-medium transition-colors duration-200 ${
      isActive ? 'text-amber' : 'text-muted hover:text-bright'
    }`

  return (
    <>
      {/* Utility strip — the three things a caller wants before anything else. */}
      <div className="hidden border-b border-hairline bg-void lg:block">
        <div className="rail flex h-10 items-center justify-between">
          <div className="flex items-center gap-6">
            <p className="eyebrow flex items-center gap-2 text-muted">
              <MapPin aria-hidden className="size-3.5 text-amber/70" strokeWidth={2} />
              8 Noonan Rd, Ingleburn NSW 2565
            </p>
            <p className="eyebrow flex items-center gap-2 text-muted">
              <Clock aria-hidden className="size-3.5 text-amber/70" strokeWidth={2} />
              Mon–Fri 7am–5pm · Sat 7am–1pm
            </p>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${site.email}`}
              className="text-[13px] text-muted transition-colors hover:text-bright"
            >
              {site.email}
            </a>
            <span aria-hidden className="h-3 w-px bg-hairline" />
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[13px] font-semibold text-[#25D366] transition-opacity hover:opacity-80"
            >
              <MessageCircle aria-hidden className="size-3.5" strokeWidth={2.5} />
              WhatsApp us
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          lifted
            ? 'border-hairline bg-void/85 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl'
            : 'border-hairline bg-void'
        }`}
        onMouseLeave={() => setMenu(null)}
      >
        <div className="rail flex h-[68px] items-center justify-between gap-6 lg:h-[80px]">
          <Link to="/" className="-my-2 shrink-0 py-2">
            <img
              src="/img/home/logo/shine-motor-logo-one.png"
              alt="Shine Motor Corporation"
              width={266}
              height={46}
              className="h-8 w-auto lg:h-9"
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 xl:flex">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>

            {/* Services dropdown */}
            <div className="relative" onMouseEnter={() => setMenu('services')}>
              <button
                type="button"
                onClick={() => setMenu(menu === 'services' ? null : 'services')}
                aria-expanded={menu === 'services'}
                className={`flex items-center gap-1.5 text-[15px] font-medium transition-colors ${
                  pathname.startsWith('/services') ? 'text-amber' : 'text-muted hover:text-bright'
                }`}
              >
                Services
                <ChevronDown
                  aria-hidden
                  className={`size-4 transition-transform duration-200 ${
                    menu === 'services' ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2}
                />
              </button>
            </div>

            {/* Metals dropdown */}
            <div className="relative" onMouseEnter={() => setMenu('metals')}>
              <button
                type="button"
                onClick={() => setMenu(menu === 'metals' ? null : 'metals')}
                aria-expanded={menu === 'metals'}
                className={`flex items-center gap-1.5 text-[15px] font-medium transition-colors ${
                  pathname.startsWith('/metals') ? 'text-amber' : 'text-muted hover:text-bright'
                }`}
              >
                Metals we buy
                <ChevronDown
                  aria-hidden
                  className={`size-4 transition-transform duration-200 ${
                    menu === 'metals' ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2}
                />
              </button>
            </div>

            <NavLink to="/prices" className={linkClass}>
              Price guide
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.phones[0].href}
              className="hidden items-center gap-2.5 sm:flex"
            >
              <span className="flex size-9 items-center justify-center rounded-full border border-flame/30 bg-flame/10">
                <Phone aria-hidden className="size-4 text-amber" strokeWidth={2} />
              </span>
              <span className="leading-tight">
                <span className="block font-mono text-[15px] font-medium text-bright">
                  {site.phones[0].label}
                </span>
                <span className="block text-[11px] text-muted">Call the yard</span>
              </span>
            </a>
            <span className="hidden lg:block">
              <PrimaryCta href="/contact">Get a price</PrimaryCta>
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="-m-2.5 p-2.5 xl:hidden"
              aria-label="Open menu"
            >
              <Menu aria-hidden className="size-6 text-bright" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* ── Mega panels ─────────────────────────────────────────────────── */}
        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: STATE }}
              className="absolute inset-x-0 top-full hidden border-b border-hairline bg-void/95 backdrop-blur-xl xl:block"
            >
              <div className="rail py-8">
                {menu === 'services' ? (
                  <div className="grid grid-cols-3 gap-5">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className="group ring-flame relative flex gap-4 rounded-2xl border border-hairline bg-surface p-5 transition-colors"
                      >
                        <img
                          src={s.image.src}
                          alt=""
                          aria-hidden
                          className="photo size-16 shrink-0 rounded-xl object-cover"
                        />
                        <span>
                          <span className="block font-display text-[17px] text-bright">
                            {s.short}
                          </span>
                          <span className="mt-1 block text-[13px] text-muted">{s.claim}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-x-8 gap-y-6">
                    {families.map((f) => (
                      <div key={f}>
                        <Link
                          to={`/metals#${f.toLowerCase().replace(/\s+/g, '-')}`}
                          className="eyebrow text-amber transition-opacity hover:opacity-75"
                        >
                          {f}
                        </Link>
                        <ul className="mt-3 space-y-1.5">
                          {metalsByFamily(f).map((m) => (
                            <li key={m.slug}>
                              <Link
                                to={`/metals/${m.slug}`}
                                className="text-[14px] text-muted transition-colors hover:text-bright"
                              >
                                {m.grade}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="col-span-4 border-t border-hairline pt-5">
                      <Link
                        to="/metals"
                        className="text-[14px] font-semibold text-amber hover:underline"
                      >
                        View the full catalogue — all 21 grades →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Mobile drawer ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: STATE }}
            className="fixed inset-0 z-50 overflow-y-auto bg-void xl:hidden"
          >
            <div className="rail flex h-[68px] items-center justify-between border-b border-hairline">
              <img
                src="/img/home/logo/shine-motor-logo-one.png"
                alt="Shine Motor Corporation"
                className="h-8 w-auto"
              />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="-m-2.5 p-2.5"
              >
                <X aria-hidden className="size-6 text-bright" strokeWidth={1.75} />
              </button>
            </div>

            <div className="rail py-6">
              <nav aria-label="Primary" className="flex flex-col">
                <Link to="/" className="border-b border-hairline py-4 font-display text-xl text-bright">
                  Home
                </Link>
                <p className="eyebrow pt-6 pb-2 text-amber">Services</p>
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="border-b border-hairline py-3.5 text-[16px] text-muted"
                  >
                    {s.short}
                  </Link>
                ))}
                <p className="eyebrow pt-6 pb-2 text-amber">Metals we buy</p>
                <Link
                  to="/metals"
                  className="border-b border-hairline py-3.5 text-[16px] text-bright"
                >
                  All 21 grades
                </Link>
                {families.map((f) => (
                  <Link
                    key={f}
                    to={`/metals#${f.toLowerCase().replace(/\s+/g, '-')}`}
                    className="border-b border-hairline py-3.5 text-[16px] text-muted"
                  >
                    {f}
                  </Link>
                ))}
                <Link to="/prices" className="border-b border-hairline py-4 font-display text-xl text-bright">
                  Price guide
                </Link>
                <Link to="/about" className="border-b border-hairline py-4 font-display text-xl text-bright">
                  About
                </Link>
                <Link to="/contact" className="border-b border-hairline py-4 font-display text-xl text-bright">
                  Contact
                </Link>
              </nav>

              <div className="mt-8 space-y-3">
                <a
                  href={WA_GENERAL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] py-3.5 text-[15px] font-semibold text-[#0d1b14]"
                >
                  <MessageCircle aria-hidden className="size-4" strokeWidth={2.5} />
                  WhatsApp us a photo
                </a>
                {site.phones.map((p) => (
                  <a
                    key={p.href}
                    href={p.href}
                    className="flex items-baseline justify-between rounded-full border border-hairline bg-surface px-5 py-3.5"
                  >
                    <span className="font-mono text-[15px] text-bright">{p.label}</span>
                    <span className="text-[13px] text-muted">{p.use}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
