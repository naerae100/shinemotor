import type { Family } from './metals'

/**
 * ═══ PRICE GUIDE ═════════════════════════════════════════════════════════
 *
 * ⚠️  THESE ARE PLACEHOLDER FIGURES — REVIEW BEFORE GOING LIVE ⚠️
 *
 * The ranges below are broad Australian market ballparks, put in so the page
 * reads as a working price guide rather than a column of "call us". They are
 * NOT Shine Motor's rates and nobody has verified them against your buying
 * book. Go through every row and set your own numbers before this site is
 * published, or customers will arrive quoting figures you never offered.
 *
 * TO UPDATE:
 *   1. Set `low` / `high` on each row (AUD). Set both to `null` for any grade
 *      you would rather quote by phone — that row renders "Call for price",
 *      and the two states mix freely in the same table.
 *   2. Set `priceMeta.updated` to the date you changed them.
 *   3. Set `priceMeta.validTo` to the date the guide should next be reviewed.
 *
 * Units: 'kg' and 'tonne' are per unit weight; 'each' is per item.
 * ════════════════════════════════════════════════════════════════════════ */

export interface PriceRow {
  /** Matches a metal slug so the row can link to the full grade spec. */
  slug: string
  grade: string
  family: Family
  /** Short reminder of what the grade requires, for scanning. */
  spec: string
  unit: 'kg' | 'tonne' | 'each'
  low: number | null
  high: number | null
}

import priceData from './prices.json'

export const priceMeta = {
  currency: priceData.meta.currency,
  /** TODO(client): the date this guide should next be reviewed. */
  validTo: null as string | null,
  /** TODO(client): the date you last changed the figures below. */
  updated: priceData.meta.updated as string | null,
}

export const priceRows: PriceRow[] = priceData.rows as PriceRow[]

/** The client's own wording, shown in full on the price guide page. */
export const priceDisclaimer = {
  short:
    'Prices are subject to change without notice. Prices are affected by quality and quantity.',
  full:
    'Please note: due to the unpredictable nature of the scrap metal market, these prices are to be used as a helpful guide and are subject to change without notice. Firm quotations, which will be calculated using criteria such as quality, quantity and frequency, may be obtained either by email through this site or by calling the number listed on the home page. Hope this helps.',
}

export function hasPublishedPrices(): boolean {
  return priceRows.some((r) => r.low !== null || r.high !== null)
}

export function formatRange(row: PriceRow, currency = priceMeta.currency): string | null {
  if (row.low === null && row.high === null) return null
  const money = (n: number) =>
    new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency,
      minimumFractionDigits: row.unit === 'tonne' ? 0 : 2,
      maximumFractionDigits: row.unit === 'tonne' ? 0 : 2,
    }).format(n)
  if (row.low !== null && row.high !== null && row.low !== row.high)
    return `${money(row.low)} – ${money(row.high)}`
  return money((row.low ?? row.high) as number)
}
