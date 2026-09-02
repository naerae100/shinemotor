/**
 * The two business lines.
 *
 * They are deliberately modelled differently, because they are different
 * businesses: selling scrap is a walk-in/collection trade that runs on
 * WhatsApp and the phone, while buying from us is container-load export
 * wholesale that runs on email and documentation. `channels` drives which
 * contact routes each page actually offers.
 */

export interface ServiceChannels {
  whatsapp: boolean
  phone: boolean
  form: boolean
  email: boolean
}

export interface Service {
  slug: string
  name: string
  short: string
  claim: string
  intro: string
  /** 'retail' = we buy from you. 'export' = you buy from us, by the container. */
  kind: 'retail' | 'export'
  channels: ServiceChannels
  includes: { title: string; body: string }[]
  requirements: string[]
  audience: string[]
  phone: { label: string; href: string }
  image: { src: string; alt: string }
  gallery: { src: string; alt: string }[]
}

export const services: Service[] = [
  {
    slug: 'sell-your-scrap',
    name: 'Sell your scrap metal',
    short: 'Sell your scrap',
    claim: "We'll beat any other genuine quote.",
    kind: 'retail',
    channels: { whatsapp: true, phone: true, form: true, email: false },
    intro:
      'We buy all ferrous and non-ferrous scrap metal, graded properly and weighed in front of you. Drive into the yard at Ingleburn, book a collection anywhere in NSW and the ACT, or have a bin dropped on site for an ongoing job.',
    includes: [
      {
        title: 'Priced on the grade, not a flat rate',
        body: 'Your load is classified against real trade grades rather than lumped in as "mixed metal". Correct grading is the single biggest factor in what you get paid.',
      },
      {
        title: 'Weighed in front of you',
        body: 'Everything goes over our own calibrated scales while you watch. Nothing is assessed out of sight.',
      },
      {
        title: 'Paid by EFT before you leave',
        body: 'Payment is processed on completion, on site. No cash, in line with the Scrap Metal Industry Regulations 2016 — the same way every licensed yard in NSW operates.',
      },
      {
        title: 'Free pickup and bin hire',
        body: 'We collect across NSW and the ACT, and we can drop bins on site for demolition, strip-outs and ongoing production scrap.',
      },
      {
        title: 'We beat genuine quotes',
        body: 'Bring us a real quote from another yard and we will better it. Fifty years of buying gives us the margin to do it.',
      },
    ],
    requirements: [
      'Photo identification',
      'Your bank details for the EFT',
      'A rough idea of what the load contains',
    ],
    audience: ['The public', 'Plumbers', 'Electricians', 'Manufacturers', 'Demolition contractors', 'Tradies'],
    phone: { label: '0478 555 537', href: 'tel:+61478555537' },
    image: {
      src: '/img/sell/sell-your-scrap-inner-1.webp',
      alt: 'Scrap metal being sorted at the Shine Motor yard in Ingleburn',
    },
    gallery: [
      { src: '/img/gallery/gallery-new-1.webp', alt: 'Sorted scrap metal at the Ingleburn yard' },
      { src: '/img/home/home-slider-3.webp', alt: 'A tipper loaded with collected scrap metal' },
      { src: '/img/about/about-1.webp', alt: 'Shine Motor staff at work in the yard' },
    ],
  },
  {
    slug: 'buy-from-us',
    name: 'Container export supply',
    short: 'Buy from us',
    claim: 'Container loads only. We do not sell to individuals.',
    kind: 'export',
    channels: { whatsapp: true, phone: false, form: false, email: true },
    intro:
      'We are direct wholesalers and exporters. Scrap is processed, sorted and prepared to grade at our own Ingleburn facility, then loaded into containers for steel mills, smelters, foundries and refineries in Australia and overseas.',
    includes: [
      {
        title: 'Prepared to recognised trade grades',
        body: 'Stock is sorted and prepared to the same classifications it is sold under, so what is described on the packing list is what comes out of the container.',
      },
      {
        title: 'Full container loads',
        body: 'We supply by the container, not by the piece or the pallet. Minimum order is one FCL — we do not sell to individuals or walk-in buyers.',
      },
      {
        title: 'Loaded and shipped from Sydney',
        body: 'Containers are packed at our own facility and shipped from Australian ports. We deal with the major shipping lines and can arrange bookings on request.',
      },
      {
        title: 'Documentation with every shipment',
        body: 'Packing list, weight certificates and grade description supplied with each container so your customs and mill intake have what they need.',
      },
      {
        title: 'Part of a global group',
        body: 'Twelve branches across the UAE, Japan, Korea, Malaysia, the USA and Australia, trading since 1973. Established counterparties, not a one-off seller.',
      },
    ],
    requirements: [
      'Company name, country and trading history',
      'Grades and tonnages required',
      'Destination port and preferred incoterms',
      'Frequency — spot load or ongoing contract',
    ],
    audience: ['Steel mills', 'Foundries', 'Brokers and traders', 'Export buyers', 'Smelters'],
    phone: { label: '0413 222 171', href: 'tel:+61413222171' },
    image: {
      src: '/img/sell/sell-your-scrap-inner-2.webp',
      alt: 'Baled and prepared scrap stock ready for container loading',
    },
    gallery: [
      { src: '/img/buy/Extruded.webp', alt: 'Prepared aluminium extrusion stock' },
      { src: '/img/buy/Honey-Brass.webp', alt: 'Prepared brass stock' },
      { src: '/img/buy/HMS-1.webp', alt: 'Prepared heavy melting steel' },
    ],
  },
]

/** Container-export specifics, shown only on the export service page. */
export const exportSpecs = [
  { k: 'Minimum order', v: 'One full container load (FCL)' },
  { k: 'Container types', v: "20ft and 40ft, packed to line weight limits" },
  { k: 'Load ports', v: 'Australian container ports' },
  { k: 'Enquiries', v: 'By email only' },
  { k: 'Documentation', v: 'Packing list, weight certificates, grade description' },
  { k: 'Not available', v: 'Retail, walk-in or individual piece sales' },
]

/** How an export order actually proceeds. */
export const exportProcess = [
  {
    n: '01',
    title: 'Email your enquiry',
    body: 'Tell us the grades, tonnage, destination port and how often you need it. Company details and trading history help us respond properly the first time.',
  },
  {
    n: '02',
    title: 'We quote and confirm availability',
    body: 'You receive a written offer against the grades requested, with current availability and indicative loading dates.',
  },
  {
    n: '03',
    title: 'Container packed and documented',
    body: 'Stock is prepared, weighed and loaded at Ingleburn. Packing list, weight certificates and grade description are issued with the shipment.',
  },
  {
    n: '04',
    title: 'Shipped from Australia',
    body: 'We book through the major lines and provide shipping documents so your customs clearance and mill intake are covered.',
  },
]

export function serviceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
