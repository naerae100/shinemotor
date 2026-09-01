#!/usr/bin/env node
/**
 * Emit a real .vcf file per person into public/card/.
 *
 * Why a served file rather than the Blob the page can build itself:
 *
 *  - iOS Safari will not open a blob: download in Contacts. An <a download>
 *    saves it to Files and stops there, which is what "it doesn't open in
 *    Contacts" looks like. Navigating to a URL that answers with
 *    Content-Type: text/vcard makes Safari render its contact preview with an
 *    "Add Contact" button, which is the behaviour people expect.
 *  - Android routes the same response through its intent system to Contacts.
 *  - The QR code and any printed/short link can point at a stable URL.
 *
 * Run from `prebuild`, so `npm run build` always ships a current copy.
 * Content-Type is set in vercel.json — without it the file is served as
 * application/octet-stream and both platforms just download it.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(root, 'public', 'card')
const PHOTO = join(root, 'public', 'img', 'home', 'logo', 'contact-photo.png')
const SITE_URL = 'https://shinemotor.com.au'

/* Kept in step with src/content/site.ts and src/content/team.ts. Duplicated
   rather than imported because this runs in plain node, before the TS build. */
const site = {
  legalName: 'Shine Motor Corporation Pty Ltd',
  shortName: 'Shine Motor',
  established: 1973,
  email: 'shinemotorcorporation@gmail.com',
  serviceArea: 'All of NSW & ACT',
  address: {
    street: '8 Noonan Rd',
    suburb: 'Ingleburn',
    state: 'NSW',
    postcode: '2565',
    country: 'Australia',
  },
  phones: ['+61413222171', '+61478555537'],
  social: [
    ['Facebook', 'https://www.facebook.com/ShineMetals/'],
    ['YouTube', 'https://www.youtube.com/@Shine_Motors'],
    ['LinkedIn', 'https://www.linkedin.com/company/103718455/'],
    ['X', 'https://x.com/Shine_motors'],
  ],
}

const people = [
  { slug: 'hussain', name: 'Hussain Mohd', given: 'Hussain', family: 'Mohd', role: 'General Manager' },
]

const esc = (v) =>
  v.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')

/** RFC 2426 §2.6 — fold at 75 octets, continuations prefixed with one space. */
const fold = (line) => {
  if (line.length <= 75) return line
  const out = [line.slice(0, 75)]
  for (let i = 75; i < line.length; i += 74) out.push(' ' + line.slice(i, i + 74))
  return out.join('\r\n')
}

const photo = readFileSync(PHOTO).toString('base64')

mkdirSync(OUT_DIR, { recursive: true })

for (const p of people) {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${esc(p.family)};${esc(p.given)};;;`,
    `FN:${esc(p.name)}`,
    `ORG:${esc(site.legalName)}`,
    `TITLE:${esc(p.role)}`,
    `TEL;TYPE=WORK,VOICE:${site.phones[0]}`,
    `TEL;TYPE=WORK,CELL:${site.phones[1]}`,
    `EMAIL;TYPE=INTERNET,WORK:${esc(site.email)}`,
    `ADR;TYPE=WORK:;;${esc(site.address.street)};${esc(site.address.suburb)};${esc(
      site.address.state,
    )};${esc(site.address.postcode)};${esc(site.address.country)}`,
    `URL:${esc(SITE_URL)}`,
    ...site.social.map(([label, href]) => `X-SOCIALPROFILE;TYPE=${esc(label)}:${esc(href)}`),
    `NOTE:${esc(
      `Licensed scrap metal buyers in ${site.address.suburb}, ${site.address.state}. Trading since ${site.established}. Servicing ${site.serviceArea}.`,
    )}`,
    `PHOTO;ENCODING=b;TYPE=PNG:${photo}`,
    'END:VCARD',
  ]

  const vcf = lines.map(fold).join('\r\n') + '\r\n'
  const file = join(OUT_DIR, `${p.slug}.vcf`)
  writeFileSync(file, vcf, 'utf8')
  console.log(`  public/card/${p.slug}.vcf  ${vcf.length} bytes  (${p.name})`)
}
