/**
 * Content types for Shine Motor Corporation.
 *
 * Copy is migrated from the client's live site (audited in
 * research/current-site-content.md) with the repeated marketing boilerplate
 * stripped out. Every `image` path points at an asset downloaded from
 * shinemotor.com.au and stored under /public/img — nothing here is a
 * placeholder and nothing is hotlinked.
 */

export interface Phone {
  label: string
  href: string
  use: string
}

export interface OpeningHours {
  days: string
  hours: string
}

export interface SiteInfo {
  legalName: string
  shortName: string
  established: number
  address: {
    street: string
    suburb: string
    state: string
    postcode: string
    country: string
    mapUrl: string
  }
  email: string
  phones: Phone[]
  hours: OpeningHours[]
  serviceArea: string
  social: { label: string; href: string }[]
}

export interface Photo {
  src: string
  alt: string
}

export interface TrustFact {
  label: string
}

export interface Pillar {
  id: string
  title: string
  claim: string
  body: string
  bullets: string[]
  cta: { label: string; href: string }
  image: Photo
}

export type MaterialFamily =
  | 'Aluminium'
  | 'AC Units'
  | 'Battery'
  | 'Brass'
  | 'Copper'
  | 'Lead'
  | 'Motor'
  | 'Radiator'
  | 'Steel'

export interface Material {
  /** The ISRI trade grade name, as the client already uses it. */
  grade: string
  family: MaterialFamily
  description: string
  image: Photo
}

export interface Segment {
  name: string
  brings: string
  image: Photo
}

export interface Step {
  n: string
  title: string
  body: string
}

export interface Reason {
  title: string
  body: string
}

export interface Faq {
  q: string
  a: string
}
