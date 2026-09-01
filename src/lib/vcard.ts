import { site } from '../content/site'
import type { Person } from '../content/team'

/**
 * vCard 3.0 builder.
 *
 * 3.0 rather than 4.0 on purpose: iOS Contacts, Android and Outlook all import
 * 3.0 without complaint, while 4.0 is still handled unevenly. The gain from 4.0
 * here would be nil — this card uses no field that 3.0 lacks.
 */

/** Square avatar shown as the contact's picture. See PHOTO note below. */
export const CONTACT_PHOTO = '/img/home/logo/contact-photo.png'

/** Escape the characters that carry meaning in a vCard value. */
function esc(value: string) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

/**
 * Fold to 75 octets per RFC 2426 §2.6, continuation lines prefixed with a
 * single space. Base64 photo data runs to thousands of characters, and a number
 * of importers — Outlook among them — reject or truncate unfolded lines.
 */
function fold(line: string) {
  if (line.length <= 75) return line
  const parts: string[] = [line.slice(0, 75)]
  for (let i = 75; i < line.length; i += 74) parts.push(' ' + line.slice(i, i + 74))
  return parts.join('\r\n')
}

/** Fetch the avatar and return bare base64, or null if it cannot be read. */
export async function loadPhotoBase64(url: string): Promise<string | null> {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const buf = await res.arrayBuffer()
    let binary = ''
    const bytes = new Uint8Array(buf)
    // Chunked to avoid blowing the argument limit on String.fromCharCode.
    for (let i = 0; i < bytes.length; i += 0x8000) {
      binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
    }
    return btoa(binary)
  } catch {
    return null
  }
}

export function buildVCard(person: Person, siteUrl: string, photoBase64?: string | null) {
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
  ]

  /**
   * The company mark, carried as PHOTO rather than LOGO.
   *
   * LOGO is the semantically correct field for an organisation's mark, but
   * almost no contact app displays it — Android and iOS both render PHOTO and
   * ignore LOGO. Since there is no headshot, the company mark as PHOTO is what
   * actually shows up in the contact list, which is the point. It is a square
   * on the card's own graphite so it survives the circular crop both platforms
   * apply; the wide site logo would have cropped to a few letters.
   */
  if (photoBase64) {
    lines.push(`PHOTO;ENCODING=b;TYPE=PNG:${photoBase64}`)
  }

  lines.push('END:VCARD')

  // vCard requires CRLF line endings; some Windows importers reject bare LF.
  return lines.map(fold).join('\r\n')
}

/**
 * Trigger a download of the .vcf.
 *
 * Uses a Blob rather than a data: URI — iOS Safari refuses to open a
 * data:text/vcard link, but handles a blob: URL, and this keeps the filename.
 */
export async function downloadVCard(person: Person, siteUrl: string) {
  const photo = await loadPhotoBase64(CONTACT_PHOTO)
  const blob = new Blob([buildVCard(person, siteUrl, photo)], {
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
