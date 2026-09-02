import { site, addressLine } from '../content/site'

/**
 * JSON-LD builders.
 *
 * Two rules govern what is here.
 *
 * 1. NO aggregateRating on LocalBusiness or Organization. Reviews about a
 *    business, published on that business's own site, are "self-serving" —
 *    Google explicitly does not show star rich results for them, and marking
 *    them up anyway is a structured-data policy violation rather than a clever
 *    trick. Our 4.5 lives on the Google Business Profile, where it is eligible
 *    on its own merits and already surfaces in the local pack and Maps.
 *
 * 2. Everything asserted here must be true on the page. Structured data that
 *    describes content a visitor cannot see is a manual-action risk.
 */

export const SITE_URL = 'https://shinemotor.com.au'
export const ORG_ID = `${SITE_URL}/#organization`
export const SITE_ID = `${SITE_URL}/#website`

const GEO = { lat: -33.9890097, lng: 150.8625991 }

/** Maps the site's opening hours to schema.org day tokens. */
const OPENING_HOURS = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '07:00',
    closes: '17:00',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Saturday'],
    opens: '07:00',
    closes: '13:00',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Sunday'],
    opens: '00:00',
    closes: '00:00',
  },
]

/**
 * The business itself. RecyclingCenter is the most specific schema.org type
 * that fits a licensed scrap yard, and it inherits from LocalBusiness so it
 * keeps every local-pack signal.
 */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['RecyclingCenter', 'LocalBusiness'],
    '@id': ORG_ID,
    name: site.legalName,
    alternateName: [site.shortName, 'Shine Metals'],
    url: SITE_URL,
    logo: `${SITE_URL}/img/home/logo/shine-motor-logo-one.png`,
    image: `${SITE_URL}/img/home/logo/contact-photo.png`,
    description:
      'Licensed scrap metal buyers in Ingleburn, NSW. We buy copper, brass, aluminium, stainless, lead and ferrous scrap by grade, weigh it in front of you and pay by instant EFT. Free pickup and bin hire across NSW and the ACT.',
    foundingDate: String(site.established),
    email: site.email,
    telephone: site.phones[0].href.replace('tel:', ''),
    priceRange: '$$',
    currenciesAccepted: 'AUD',
    // Cash is prohibited for scrap metal in NSW; saying so is a trust signal.
    paymentAccepted: 'EFT, Bank transfer',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.suburb,
      addressRegion: site.address.state,
      postalCode: site.address.postcode,
      addressCountry: 'AU',
    },
    geo: { '@type': 'GeoCoordinates', latitude: GEO.lat, longitude: GEO.lng },
    hasMap: site.address.mapUrl,
    openingHoursSpecification: OPENING_HOURS,
    areaServed: [
      { '@type': 'State', name: 'New South Wales' },
      { '@type': 'State', name: 'Australian Capital Territory' },
    ],
    sameAs: site.social.map((s) => s.href),
    contactPoint: site.phones.map((p) => ({
      '@type': 'ContactPoint',
      telephone: p.href.replace('tel:', ''),
      contactType: 'customer service',
      areaServed: 'AU',
      availableLanguage: 'English',
    })),
  }
}

/** The site container, plus the search action for a sitelinks search box. */
export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE_URL,
    name: site.legalName,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-AU',
  }
}

/** Breadcrumbs, mirroring the visible trail exactly. */
export function breadcrumbSchema(trail: { label: string; path?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      ...trail.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: t.label,
        ...(t.path ? { item: `${SITE_URL}${t.path}` } : {}),
      })),
    ],
  }
}

/** FAQ markup. Only ever built from questions actually rendered on the page. */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  }
}

/** A service the yard offers. */
export function serviceSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'State', name: 'New South Wales' },
      { '@type': 'State', name: 'Australian Capital Territory' },
    ],
    serviceType: 'Scrap metal recycling',
  }
}

/**
 * A grade we buy.
 *
 * Modelled as a Product the business seeks to buy rather than sell, which is
 * what a scrap yard actually does. No `offers` block: we publish indicative
 * ranges, not firm prices, and inventing a price to satisfy the schema would
 * be exactly the mismatch between markup and page that earns a penalty.
 */
export function metalSchema(grade: string, description: string, path: string, image?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${grade} scrap`,
    description,
    url: `${SITE_URL}${path}`,
    ...(image ? { image: `${SITE_URL}${image}` } : {}),
    category: 'Scrap metal',
    brand: { '@id': ORG_ID },
  }
}

/** The About page's organisation view. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/img/home/logo/shine-motor-logo-one.png`,
    foundingDate: String(site.established),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.suburb,
      addressRegion: site.address.state,
      postalCode: site.address.postcode,
      addressCountry: 'AU',
    },
    sameAs: site.social.map((s) => s.href),
  }
}

/** A person's contact card. */
export function personSchema(name: string, role: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: role,
    url: `${SITE_URL}${path}`,
    worksFor: { '@id': ORG_ID },
    telephone: site.phones[0].href.replace('tel:', ''),
    email: site.email,
    workLocation: { '@type': 'Place', address: addressLine },
  }
}
