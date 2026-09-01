import { site } from './site'

/**
 * People with a public-facing digital card at /card/<slug>.
 *
 * Contact details deliberately point at the company's own lines rather than
 * personal ones — the card is a company card carrying a person's name, so it
 * stays correct if the individual's mobile changes.
 */
export interface Person {
  slug: string
  /** Full name as it should be displayed and spoken. */
  name: string
  /**
   * Split for the vCard N: field, which stores them separately so phones sort
   * and search correctly.
   *
   * TODO(client): confirm the split. "Hussain Mohd" is recorded here as given
   * name Hussain, family name Mohd. If Mohd is part of a given name, or the
   * family name is something else entirely, correct it here — it changes how
   * the contact files under "Sort by last name" on both iOS and Android.
   */
  given: string
  family: string
  role: string
  /** Shown in the monogram when there is no photograph. */
  initials: string
  /** Optional headshot in /public. Falls back to the monogram when absent. */
  photo?: string
}

export const people: Person[] = [
  {
    slug: 'hussain',
    name: 'Hussain Mohd',
    given: 'Hussain',
    family: 'Mohd',
    role: 'General Manager',
    initials: 'HM',
  },
]

export function personBySlug(slug: string) {
  return people.find((p) => p.slug === slug)
}

/** The company lines every card carries. */
export const cardContact = {
  phone: site.phones[0],
  secondPhone: site.phones[1],
  email: site.email,
  org: site.legalName,
}
