import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { addressLine, site } from '../../content/site'
import { families, metalsByFamily } from '../../content/metals'
import { services } from '../../content/services'
import { WA_GENERAL } from '../../lib/whatsapp'
import { PrimaryCta } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { Glow } from '../ui/SectionHead'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-ink">
      <Glow className="-bottom-40 left-1/2 size-[620px] -translate-x-1/2" from="rgba(255,122,24,0.14)" />
      <div className="rail relative py-14 lg:py-20">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-hairline pb-12 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-d2 text-bright">
                Got metal? Let&rsquo;s talk numbers.
              </h2>
              <p className="mt-3 text-lead text-muted">
                Open from 7am, six days a week. We&rsquo;ll beat any genuine quote.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <PrimaryCta href="/contact">Get a price</PrimaryCta>
              <a
                href={WA_GENERAL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-7 py-3.5 text-[15px] font-semibold text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-[#0d1b14]"
              >
                <MessageCircle aria-hidden className="size-4" strokeWidth={2.5} />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="grid gap-12 pt-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <img
                src="/img/home/logo/shine-motor-logo.png"
                alt="Shine Motor Corporation"
                width={200}
                height={35}
                className="h-8 w-auto"
              />
              <p className="measure mt-5 text-[15px] text-muted">
                {site.legalName} buys ferrous and non-ferrous metal by grade and
                pays the best price in the market. Part of a group trading since{' '}
                {site.established} with twelve branches across the UAE, Japan,
                Korea, Malaysia, the USA and Australia.
              </p>
              <ul className="mt-6 space-y-3">
                {site.phones.map((p) => (
                  <li key={p.href}>
                    <a
                      href={p.href}
                      className="flex min-h-9 items-center gap-3 py-1 font-mono text-bright transition-colors hover:text-amber"
                    >
                      <Phone aria-hidden className="size-4 text-amber/70" strokeWidth={2} />
                      {p.label}
                      <span className="font-sans text-[13px] text-muted">{p.use}</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex min-h-9 items-start gap-3 py-1 text-[15px] break-all text-muted transition-colors hover:text-bright"
                  >
                    <Mail aria-hidden className="mt-1 size-4 shrink-0 text-amber/70" strokeWidth={2} />
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={site.address.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-9 items-start gap-3 py-1 text-[15px] text-muted transition-colors hover:text-bright"
                  >
                    <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-amber/70" strokeWidth={2} />
                    {addressLine}
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <p className="eyebrow text-amber">Metals we buy</p>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
                {families.map((f) => (
                  <li key={f}>
                    <Link
                      to={`/metals#${f.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex min-h-8 items-center py-1 text-[14px] text-muted transition-colors hover:text-bright"
                    >
                      {f}
                    </Link>
                    <span className="ml-1.5 font-mono text-[11px] text-muted/50">
                      {metalsByFamily(f).length}
                    </span>
                  </li>
                ))}
                <li className="col-span-2 pt-2">
                  <Link
                    to="/metals"
                    className="text-[14px] font-semibold text-amber hover:underline"
                  >
                    All 21 grades →
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <p className="eyebrow text-amber">Services</p>
              <ul className="mt-5 space-y-2.5">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      className="inline-flex min-h-8 items-center py-1 text-[14px] text-muted transition-colors hover:text-bright"
                    >
                      {s.short}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/prices" className="inline-flex min-h-8 items-center py-1 text-[14px] text-muted transition-colors hover:text-bright">
                    Price guide
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="inline-flex min-h-8 items-center py-1 text-[14px] text-muted transition-colors hover:text-bright">
                    About us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="inline-flex min-h-8 items-center py-1 text-[14px] text-muted transition-colors hover:text-bright">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <p className="eyebrow text-amber">Opening hours</p>
              <dl className="mt-5 space-y-3">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex items-baseline justify-between gap-4 border-b border-hairline pb-2">
                    <dt className="text-[14px] text-muted">{h.days}</dt>
                    <dd className="font-mono text-[14px] text-bright">{h.hours}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-[13px] text-muted">
                Servicing all of NSW &amp; the ACT. Pickups and bin drops by arrangement.
              </p>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-5 border-t border-hairline pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] text-muted">
              © {new Date().getFullYear()} {site.legalName}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {site.social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-8 items-center py-1 text-[14px] text-muted transition-colors hover:text-bright"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* TODO(client): ABN and NSW scrap metal dealer licence number belong
              here — they are the strongest trust signals a licensed yard has. */}
        </Reveal>
      </div>
    </footer>
  )
}
