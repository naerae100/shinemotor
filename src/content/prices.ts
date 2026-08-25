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

export const priceMeta = {
  currency: 'AUD',
  /** TODO(client): the date this guide should next be reviewed. */
  validTo: '30 September 2026' as string | null,
  /** TODO(client): the date you last changed the figures below. */
  updated: '25 August 2026' as string | null,
}

export const priceRows: PriceRow[] = [
  // ── Copper ──────────────────────────────────────────────────────────────
  { slug: 'mill-berry-copper', grade: 'Mill Berry', family: 'Copper', spec: 'Bare bright, no coating or alloy', unit: 'kg', low: 9.0, high: 11.0 },
  { slug: 'candy-copper', grade: 'Candy', family: 'Copper', spec: 'Clean solids, clippings, bus bar, tube', unit: 'kg', low: 8.5, high: 10.5 },
  { slug: 'birch-cliff-copper', grade: 'Birch Cliff', family: 'Copper', spec: 'No. 2 copper, tarnished or oxidised', unit: 'kg', low: 7.8, high: 9.6 },
  { slug: 'ocean-radiators', grade: 'Ocean', family: 'Copper', spec: 'Copper/brass radiator cores', unit: 'kg', low: 4.5, high: 6.0 },

  // ── Brass ───────────────────────────────────────────────────────────────
  { slug: 'honey-brass', grade: 'Honey', family: 'Brass', spec: 'Mixed yellow brass solids', unit: 'kg', low: 5.0, high: 6.5 },
  { slug: 'night-brass-turnings', grade: 'Night', family: 'Brass', spec: 'Brass rod turnings, max 3% free iron', unit: 'kg', low: 4.0, high: 5.5 },

  // ── Aluminium ───────────────────────────────────────────────────────────
  { slug: 'extruded-aluminium', grade: 'Extruded', family: 'Aluminium', spec: '6063 section, no glass or steel', unit: 'kg', low: 1.6, high: 2.3 },
  { slug: 'tense-aluminium-castings', grade: 'Tense', family: 'Aluminium', spec: 'Clean castings, no steel inserts', unit: 'kg', low: 1.2, high: 1.8 },
  { slug: 'talk-aluminium-copper-radiators', grade: 'Talk', family: 'Aluminium', spec: 'Alu/copper radiators, degassed', unit: 'kg', low: 3.0, high: 4.5 },
  { slug: 'troma-aluminium-wheels', grade: 'Troma', family: 'Aluminium', spec: 'Unplated wheels, tyres off', unit: 'kg', low: 1.8, high: 2.6 },

  // ── Stainless ───────────────────────────────────────────────────────────
  { slug: 'stainless-steel-316', grade: 'Stainless 316', family: 'Stainless Steel', spec: 'Marine grade, no carbon steel', unit: 'kg', low: 2.2, high: 3.2 },
  { slug: 'stainless-steel-304', grade: 'Stainless 304', family: 'Stainless Steel', spec: 'Common grade, no attachments', unit: 'kg', low: 1.6, high: 2.4 },

  // ── Ferrous ─────────────────────────────────────────────────────────────
  { slug: 'ferrous-metal', grade: 'Ferrous Metal', family: 'Ferrous', spec: 'Steel and iron, no sealed vessels', unit: 'tonne', low: 200, high: 330 },
  { slug: 'hms-1-and-2', grade: 'HMS 1 & 2', family: 'Ferrous', spec: 'Heavy melting, prepared to size', unit: 'tonne', low: 280, high: 400 },

  // ── Wiring ──────────────────────────────────────────────────────────────
  { slug: 'insulated-copper-wire', grade: 'Insulated Copper Wire', family: 'Wiring', spec: 'Assessed on inspection', unit: 'kg', low: 2.0, high: 6.5 },
  { slug: 'druid-copper-wiring', grade: 'Druid', family: 'Wiring', spec: 'Priced on agreed recovery rate', unit: 'kg', low: 3.0, high: 7.0 },
  { slug: 'car-wiring-harness', grade: 'Car Wiring Harness', family: 'Wiring', spec: 'Looms with connectors attached', unit: 'kg', low: 1.8, high: 3.5 },

  // ── Other ───────────────────────────────────────────────────────────────
  { slug: 'lead-scrap', grade: 'Lead Scrap', family: 'Other', spec: 'Clean solids, no battery plates', unit: 'kg', low: 2.2, high: 3.2 },
  { slug: 'electric-motors', grade: 'Electric Motors', family: 'Other', spec: 'Whole motors, unbolted from plant', unit: 'kg', low: 0.9, high: 1.6 },
  { slug: 'starter-motors-alternators', grade: 'Starters & Alternators', family: 'Other', spec: 'Whole units, brackets removed', unit: 'kg', low: 1.0, high: 1.8 },
  { slug: 'compressors', grade: 'Compressors', family: 'Other', spec: 'Degassed by a licensed technician', unit: 'kg', low: 0.7, high: 1.3 },
]

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
