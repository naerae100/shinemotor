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

/** How the card was handed over, so the UI can say the right thing after. */
export type SaveOutcome = 'shared' | 'downloaded' | 'cancelled'

/**
 * Hand the .vcf to the operating system.
 *
 * Prefers the Web Share API with a file attached: on Android that opens the
 * system share sheet with Contacts as a target, so the card imports in one tap
 * instead of landing in Downloads for the user to find. iOS shows its own sheet
 * with "Add to Contacts". Desktop browsers mostly do not support file sharing,
 * and fall through to a download.
 *
 * Cancelling the sheet returns 'cancelled' and does NOT then force a download —
 * the visitor said no, and answering that by pushing a file at them anyway is
 * exactly the behaviour that makes people distrust a page.
 */
export async function saveVCard(person: Person, siteUrl: string): Promise<SaveOutcome> {
  const photo = await loadPhotoBase64(CONTACT_PHOTO)
  const text = buildVCard(person, siteUrl, photo)
  const filename = `${person.name.replace(/\s+/g, '-')}-${site.shortName.replace(
    /\s+/g,
    '-',
  )}.vcf`

  // charset matters: names and the NOTE can carry non-ASCII.
  const type = 'text/vcard;charset=utf-8'
  const file = new File([text], filename, { type })

  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: `${person.name} — ${site.shortName}` })
      return 'shared'
    } catch (err) {
      // AbortError means the person dismissed the sheet on purpose. Anything
      // else is a real failure, and falling back to a download is right.
      if (err instanceof DOMException && err.name === 'AbortError') return 'cancelled'
    }
  }

  downloadBlob(text, filename, type)
  return 'downloaded'
}

/**
 * Blob rather than a data: URI — iOS Safari refuses to open data:text/vcard,
 * but handles blob:, and this keeps the filename.
 */
function downloadBlob(text: string, filename: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }))
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  // Firefox historically ignored a click on a detached element.
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  // Revoke on a timeout — revoking synchronously can cancel the download.
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
