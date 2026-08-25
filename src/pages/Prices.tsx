import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react'
import { families } from '../content/metals'
import type { Family } from '../content/metals'
import {
  formatRange,
  hasPublishedPrices,
  priceDisclaimer,
  priceMeta,
  priceRows,
} from '../content/prices'
import { site } from '../content/site'
import { PageHero } from '../components/layout/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { useSeo } from '../lib/seo'
import { waForMaterial, WA_GENERAL } from '../lib/whatsapp'

const UNIT_LABEL: Record<string, string> = { kg: 'per kg', tonne: 'per tonne', each: 'each' }

export function Prices() {
  useSeo(
    'Scrap Metal Price Guide',
    'Indicative scrap metal price ranges by grade at Shine Motor Corporation, Ingleburn NSW. Prices are a guide only and change with the market — call or email for a firm quotation.',
  )

  const [filter, setFilter] = useState<Family | 'All'>('All')
  const published = hasPublishedPrices()
  const rows = filter === 'All' ? priceRows : priceRows.filter((r) => r.family === filter)

  return (
    <>
      <PageHero
        eyebrow="Price guide"
        title={<>What we&rsquo;re paying.</>}
        intro="Indicative ranges by grade, to help you work out whether a load is worth bringing in. Every figure moves with the market — call or email for a firm quotation on your actual material."
        trail={[{ label: 'Price guide' }]}
        actions={
          <>
            <a
              href={site.phones[0].href}
              className="grad-flame inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(255,122,24,0.7)]"
            >
              <Phone aria-hidden className="size-[18px]" strokeWidth={2.25} />
              Call for today&rsquo;s price
            </a>
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-[15px] font-semibold text-[#0d1b14]"
            >
              <MessageCircle aria-hidden className="size-[18px]" strokeWidth={2.5} />
              WhatsApp a photo
            </a>
          </>
        }
        aside={
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
            <div className="bg-ink px-5 py-5">
              <dd className="font-display text-lg text-bright">
                {priceMeta.updated ?? 'On request'}
              </dd>
              <dt className="eyebrow mt-1.5 text-muted">Last updated</dt>
            </div>
            <div className="bg-ink px-5 py-5">
              <dd className="font-display text-lg text-bright">
                {priceMeta.validTo ?? 'Call to confirm'}
              </dd>
              <dt className="eyebrow mt-1.5 text-muted">Prices valid to</dt>
            </div>
          </dl>
        }
      />

      {/* The short warning sits above the table, where it cannot be missed. */}
      <section className="border-b border-hairline bg-void">
        <div className="rail py-8">
          <Reveal className="flex items-start gap-4 rounded-2xl border border-amber/30 bg-amber/[0.06] px-6 py-5">
            <AlertTriangle
              aria-hidden
              className="mt-0.5 size-5 shrink-0 text-amber"
              strokeWidth={2.25}
            />
            <p className="text-[15px] text-bright">
              {priceDisclaimer.short}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter + table */}
      <section className="border-b border-hairline bg-ink">
        <div className="rail section-y">
          <Reveal className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {(['All', ...families] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`shrink-0 rounded-full border px-4 py-2 text-[14px] font-semibold transition-all duration-200 ${
                  filter === f
                    ? 'grad-flame border-transparent text-white'
                    : 'border-hairline bg-surface text-muted hover:border-flame/40 hover:text-bright'
                }`}
              >
                {f}
              </button>
            ))}
          </Reveal>

          <Reveal className="mt-8 overflow-hidden rounded-2xl border border-hairline">
            {/* Header row — desktop only; the mobile layout stacks instead. */}
            <div className="hidden bg-surface px-6 py-4 lg:grid lg:grid-cols-12 lg:gap-6">
              <span className="eyebrow text-muted lg:col-span-3">Grade</span>
              <span className="eyebrow text-muted lg:col-span-5">What the grade requires</span>
              <span className="eyebrow text-muted lg:col-span-2">Unit</span>
              <span className="eyebrow text-right text-muted lg:col-span-2">
                Indicative range
              </span>
            </div>

            <ul className="divide-y divide-hairline">
              {rows.map((row) => {
                const range = formatRange(row)
                return (
                  <li
                    key={row.slug}
                    className="grid gap-3 bg-void/60 px-6 py-5 transition-colors hover:bg-surface lg:grid-cols-12 lg:items-center lg:gap-6"
                  >
                    <div className="lg:col-span-3">
                      <Link
                        to={`/metals/${row.slug}`}
                        className="group -my-1.5 inline-flex min-h-9 items-center gap-1.5 py-1.5 font-display text-[17px] text-bright transition-colors hover:text-amber"
                      >
                        {row.grade}
                        <ArrowUpRight
                          aria-hidden
                          className="size-3.5 text-muted transition-colors group-hover:text-amber"
                          strokeWidth={2.5}
                        />
                      </Link>
                      <span className="eyebrow mt-1 block text-amber lg:hidden">
                        {row.family}
                      </span>
                    </div>

                    <p className="text-[14px] text-muted lg:col-span-5">{row.spec}</p>

                    <p className="text-[14px] text-muted lg:col-span-2">
                      {UNIT_LABEL[row.unit]}
                    </p>

                    <div className="lg:col-span-2 lg:text-right">
                      {range ? (
                        <span className="font-mono text-[16px] font-semibold text-bright">
                          {range}
                        </span>
                      ) : (
                        <a
                          href={waForMaterial(`${row.grade} (${row.family})`)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-flame/35 bg-flame/10 px-3.5 py-1.5 text-[13px] font-semibold text-amber transition-colors hover:border-flame hover:bg-flame hover:text-white"
                        >
                          Call for price
                        </a>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          {!published && (
            <Reveal className="mt-6 rounded-2xl border border-hairline bg-surface px-6 py-5">
              <p className="text-[15px] text-muted">
                <span className="font-semibold text-bright">
                  Ranges are quoted on request at the moment.
                </span>{' '}
                Metal prices move daily, so rather than publish a figure that is
                stale by the time you read it, we will give you the current number
                for your grade over the phone or on WhatsApp — usually within
                minutes during opening hours.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* The full disclaimer, in the client's own wording. */}
      <section className="border-b border-hairline bg-void">
        <div className="rail section-y">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow flex items-center gap-3 text-amber">
                <span aria-hidden className="grad-flame block h-px w-7 rounded-full" />
                Please note
              </p>
              <h2 className="mt-5 font-display text-d2 text-bright">
                A guide, not a quotation.
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-7">
              <p className="text-lead text-muted">{priceDisclaimer.full}</p>

              <div className="mt-9 grid gap-4 sm:grid-cols-3">
                <a
                  href={site.phones[0].href}
                  className="flex flex-col rounded-2xl border border-hairline bg-surface p-5 transition-colors hover:border-flame/50"
                >
                  <Phone aria-hidden className="size-5 text-amber" strokeWidth={2} />
                  <span className="mt-3 font-mono text-[15px] text-bright">
                    {site.phones[0].label}
                  </span>
                  <span className="text-[13px] text-muted">Firm quote by phone</span>
                </a>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent('Price enquiry')}`}
                  className="flex flex-col rounded-2xl border border-hairline bg-surface p-5 transition-colors hover:border-flame/50"
                >
                  <Mail aria-hidden className="size-5 text-amber" strokeWidth={2} />
                  <span className="mt-3 text-[14px] break-all text-bright">{site.email}</span>
                  <span className="text-[13px] text-muted">Firm quote by email</span>
                </a>
                <Link
                  to="/contact"
                  className="flex flex-col rounded-2xl border border-hairline bg-surface p-5 transition-colors hover:border-flame/50"
                >
                  <span className="font-display text-lg text-amber">✎</span>
                  <span className="mt-3 text-[15px] text-bright">Use the form</span>
                  <span className="text-[13px] text-muted">Same-day reply</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
