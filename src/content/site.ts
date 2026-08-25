import type { SiteInfo, TrustFact } from './types'

/** Source: research/current-site-content.md §1. Verified against the live site. */
export const site: SiteInfo = {
  legalName: 'Shine Motor Corporation Pty Ltd',
  shortName: 'Shine Motor',
  established: 1973,
  address: {
    street: '8 Noonan Rd',
    suburb: 'Ingleburn',
    state: 'NSW',
    postcode: '2565',
    country: 'Australia',
    mapUrl: 'https://goo.gl/maps/Qpb7ETEebjUqDeoB7',
  },
  email: 'shinemotorcorporation@gmail.com',
  phones: [
    { label: '0478 555 537', href: 'tel:+61478555537', use: 'Scrap metal & general' },
    { label: '0413 222 171', href: 'tel:+61413222171', use: 'Pickups & bin drops' },
    // TODO(client): the live site lists two landlines — (02) 8712 6999 and
    // (02) 8712 9548 — with no explanation. Confirm which is current before
    // launch; only the first is published here.
    { label: '(02) 8712 6999', href: 'tel:+61287126999', use: 'Yard office' },
  ],
  hours: [
    { days: 'Monday — Friday', hours: '7:00am — 5:00pm' },
    { days: 'Saturday', hours: '7:00am — 1:00pm' },
    { days: 'Sunday', hours: 'Closed' },
  ],
  serviceArea: 'All of NSW & ACT',
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/ShineMetals/' },
    { label: 'YouTube', href: 'https://www.youtube.com/@Shine_Motors' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/103718455/' },
    { label: 'X', href: 'https://x.com/Shine_motors' },
  ],
}

export const addressLine = `${site.address.street}, ${site.address.suburb} ${site.address.state} ${site.address.postcode}`

/**
 * The trust bar. Four facts, stated flat, no badges. "EFT only" is compliance
 * with the Scrap Metal Industry Regulations 2016 — a trust signal, not a
 * limitation. It is explained where there is room for it: Why Choose Us and the
 * FAQ.
 */
export const trustFacts: TrustFact[] = [
  { label: 'All NSW & ACT' },
  { label: 'Instant EFT payment' },
  { label: 'Open 7am, Mon–Sat' },
  { label: 'Bins & pickup supplied' },
]
