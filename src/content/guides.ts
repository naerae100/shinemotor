import type { Photo } from './types'

/**
 * Long-form pages carried over from the old site's blog.
 *
 * WHY THIS SECTION EXISTS
 * -----------------------
 * shinemotor.com.au ran a blog for years. Only one post was ever given a real
 * URL — best-scrap-metal-recycling.php, published 24 February 2025 — and it
 * accumulated internal links and search history. Dropping it in the rebuild
 * would have meant redirecting an indexed URL to something unrelated, which
 * search engines read as a soft 404. It is rebuilt here so the old URL has a
 * true one-to-one destination.
 *
 * WHAT WAS CHANGED FROM THE LIVE ARTICLE
 * --------------------------------------
 * The substance and the phrasing are the client's own. Three edits:
 *
 *  1. Two paragraphs of Lorem Ipsum ("...the leap into electronic typesetting,
 *     remaining essentially unchanged...") were left in the published article by
 *     the template. They are removed, not reworded — they never said anything.
 *  2. A paragraph offering "cash for vehicles" is removed. The yard has stopped
 *     buying cars and trucks, and the new site must not advertise a service it
 *     no longer runs.
 *  3. A stray ">" inside "the >best wire prices" is fixed, and American
 *     spellings of "aluminum" are set to Australian "aluminium" to match the
 *     rest of the site.
 *
 * Nothing has been added. If a claim is not in the original, it is not here.
 */

export interface GuideBlock {
  /** A paragraph, a subheading, or a list of points. */
  kind: 'p' | 'h2' | 'list'
  text?: string
  items?: string[]
}

export interface Guide {
  slug: string
  title: string
  /** Shown in the index and used as the meta description. */
  summary: string
  /** ISO date the article was originally published on the old site. */
  published: string
  /** The category the old site filed it under. */
  category: string
  image: Photo
  blocks: GuideBlock[]
}

export const guides: Guide[] = [
  {
    slug: 'scrap-metal-recycling-sydney',
    title: 'Maximising value through scrap metal recycling',
    summary:
      'Recycle your scrap metal with Shine Motor for the best prices. We buy copper, brass and all metals in Sydney — what gets recycled, why it matters, and how to get paid for it.',
    published: '2025-02-24',
    category: 'Scrap metal',
    image: {
      src: '/img/home/we-collect-it.webp',
      alt: 'Scrap metal being collected for recycling at Shine Motor Corporation in Ingleburn, Sydney',
    },
    blocks: [
      {
        kind: 'p',
        text: 'Where can I sell my scrap in Sydney? Shine Motor Corporation is one of the best scrap metal recycling companies in Sydney, making sure valuable metals are reused efficiently. We understand the importance of sustainability and the role of metal recycling in reducing waste and conserving resources. As part of our commitment to the environment, we help clear landfill waste through metal and scrap recycling. This guide covers what metal recycling is, why it matters, and how it works at our yard.',
      },
      { kind: 'h2', text: 'What is metal and scrap recycling?' },
      {
        kind: 'p',
        text: 'Metal and scrap recycling is the process of collecting and processing discarded metal products — old appliances, industrial scrap, offcuts and worn-out fittings — so they can be reused in the production of new materials. Instead of ending up in landfill, metals are melted down, purified and shaped into new items.',
      },
      { kind: 'h2', text: 'Recycling non-ferrous metals in Sydney' },
      {
        kind: 'p',
        text: 'Recycling non-ferrous metals in Sydney is a key part of our work. By recycling metals like aluminium, copper and brass, we help reduce waste, conserve resources and limit environmental impact — contributing to a cleaner, greener Sydney. The metals we most commonly recycle are:',
      },
      {
        kind: 'list',
        items: [
          'Aluminium — beverage cans, extrusions, castings and domestic scrap',
          'Copper — wiring, tube and electronics',
          'Brass — plumbing fittings and decorative items',
          'Lead — batteries, sheet, pipe and flashing',
        ],
      },
      { kind: 'h2', text: 'The environmental benefits of metal recycling' },
      {
        kind: 'list',
        items: [
          'Reduces mining impact — recycling metal lessens the need for harmful mining practices.',
          'Keeps the environment clean — it prevents pollution and protects air, water and soil quality.',
          'Prevents landfill overflow — recycling metals reduces the amount of waste going to landfill.',
          'Saves energy — recycling uses significantly less energy than producing new metal.',
          'Reduces greenhouse gas emissions — less energy consumption means fewer harmful gases released.',
        ],
      },
      { kind: 'h2', text: 'How metal recycling turns waste into wealth' },
      {
        kind: 'list',
        items: [
          'Creates valuable resources — waste is transformed into reusable material.',
          'Supports jobs — recycling generates employment in sorting, processing and selling metal.',
          'Lowers production costs — recycled metal reduces raw material costs.',
          'Encourages sustainability — it promotes a circular economy through material reuse.',
          'Generates economic value — recycling metals creates financial benefits and boosts local economies.',
        ],
      },
      {
        kind: 'p',
        text: 'Shine Motor Corporation is one of the leading scrap metal dealers in Sydney, committed to making metal recycling easy and profitable. We offer the best price for scrap metal in Sydney, buying both ferrous and non-ferrous metals so they are recycled responsibly and given new life. By paying for scrap, we encourage individuals and businesses to recycle, reducing waste and promoting sustainability.',
      },
      {
        kind: 'p',
        text: 'We also offer the best wire prices in Sydney, with competitive rates for old aluminium and copper wire. Turning unwanted material into cash helps conserve resources.',
      },
      { kind: 'h2', text: 'Cash for copper, brass and every other metal in Sydney' },
      {
        kind: 'p',
        text: 'We pay for copper in Sydney at competitive rates across all types of copper scrap, including copper cables. We pride ourselves on offering the best copper prices in Sydney so you get top value for your unwanted copper. We also offer the best brass prices in Sydney, helping you get the most for your scrap brass. Whether it is copper or brass, we make recycling straightforward and worthwhile.',
      },
    ],
  },
]

export function guideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug)
}
