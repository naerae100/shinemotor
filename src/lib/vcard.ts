import { site } from '../content/site'
import type { Person } from '../content/team'

/**
 * vCard 3.0 builder.
 *
 * 3.0 rather than 4.0 on purpose: iOS Contacts, Android and Outlook all import
 * 3.0 without complaint, while 4.0 is still handled unevenly. The gain from 4.0
 * here would be nil — this card uses no field that 3.0 lacks.
 */

/** Escape the characters that carry meaning in a vCard value. */
function esc(value: string) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

export function buildVCard(person: Person, siteUrl: string) {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    // N is structured: family;given;additional;prefix;suffix
    `N:${esc(person.family)};${esc(person.given)};;;`,
    `FN:${esc(person.name)}`,
    `ORG:${esc(site.legalName)}`,
    `TITLE:${esc(person.role)}`,
    `TEL;TYPE=WORK,VOICE:${site.phones[0].href.replace('tel:', '')}`,
    `TEL;TYPE=WORK,CELL:${site.phones[1].href.replace('tel:', '')}`,
    `EMAIL;TYPE=INTERNET,WORK:${esc(site.email)}`,
    // ADR is structured: po;ext;street;locality;region;postcode;country
    `ADR;TYPE=WORK:;;${esc(site.address.street)};${esc(site.address.suburb)};${esc(
      site.address.state,
    )};${esc(site.address.postcode)};${esc(site.address.country)}`,
    `LABEL;TYPE=WORK:${esc(
      `${site.address.street}, ${site.address.suburb} ${site.address.state} ${site.address.postcode}`,
    )}`,
    `URL:${esc(siteUrl)}`,
    ...site.social.map((s) => `X-SOCIALPROFILE;TYPE=${esc(s.label)}:${esc(s.href)}`),
    `NOTE:${esc(
      `Licensed scrap metal buyers in ${site.address.suburb}, ${site.address.state}. Trading since ${site.established}. Servicing ${site.serviceArea}.`,
    )}`,
    `REV:${new Date().toISOString()}`,
    'END:VCARD',
  ]

  // vCard requires CRLF line endings; some Windows importers reject bare LF.
  return lines.join('\r\n')
}

/**
 * Trigger a download of the .vcf.
 *
 * Uses a Blob rather than a data: URI — iOS Safari refuses to open a
 * data:text/vcard link, but handles a blob: URL, and this keeps the filename.
 */
export function downloadVCard(person: Person, siteUrl: string) {
  const blob = new Blob([buildVCard(person, siteUrl)], {
    type: 'text/vcard;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${person.name.replace(/\s+/g, '-')}-${site.shortName.replace(/\s+/g, '-')}.vcf`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  // Revoke on the next tick — revoking synchronously can cancel the download.
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
