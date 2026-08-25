import type { Faq, Reason, Segment, Step } from './types'

/**
 * The six audiences named on the live site, each with a line about what that
 * trade specifically brings in. Naming the trade is what makes it land — a
 * sparky should see themselves on the page.
 * Source: research/current-site-content.md §4.
 */
export const segments: Segment[] = [
  {
    name: 'The public',
    brings: 'Household clear-outs, old appliances, a garage full of offcuts.',
    image: { src: '/img/sell/new-used-batteries.webp', alt: 'Household scrap including old batteries' },
  },
  {
    name: 'Plumbers',
    brings: 'Copper tube, brass fittings, hot water units, lead flashing.',
    image: { src: '/img/buy/Honey-Brass.webp', alt: 'Brass fittings and tapware from plumbing work' },
  },
  {
    name: 'Electricians',
    brings: 'Insulated cable, switchboard copper, motors and starters.',
    image: { src: '/img/buy/Insulated-Copper-Wires.webp', alt: 'Insulated copper cable from electrical work' },
  },
  {
    name: 'Manufacturers',
    brings: 'Production offcuts, turnings, swarf and process scrap, collected on schedule.',
    image: { src: '/img/buy/Extruded.webp', alt: 'Aluminium extrusion offcuts from production' },
  },
  {
    name: 'Demolition',
    brings: 'Structural steel, HMS 1 & 2, strip-out non-ferrous, whole-site loads.',
    image: { src: '/img/buy/HMS-1.webp', alt: 'Heavy melting steel from demolition work' },
  },
  {
    name: 'Tradies',
    brings: "Whatever came off the job. If it's metal, bring it.",
    image: { src: '/img/gallery/gallery-new-1.webp', alt: 'Mixed scrap metal brought in by trade customers' },
  },
]

/**
 * A genuine sequence — which is the only reason these are numbered.
 * Source: research/current-site-content.md §3.1, §2.
 */
export const steps: Step[] = [
  {
    n: '01',
    title: 'Tell us what you have',
    body: 'Call or send a photo. We will quote on the grade and the weight, and we will beat any other genuine quote you have been given.',
  },
  {
    n: '02',
    title: 'Bring it in, or we collect',
    body: 'Drive into the yard at Ingleburn any weekday from 7am, or book a pickup anywhere in NSW and the ACT. We can drop a bin on site for larger jobs.',
  },
  {
    n: '03',
    title: 'Weighed, graded, paid',
    body: 'Your load is weighed on our scales in front of you and graded by trained staff. Payment goes out by EFT before you leave the site.',
  },
]

/**
 * One idea for this whole section: you get paid properly. Four items, no icons —
 * an icon standing in for an idea carries no information.
 * Source: research/current-site-content.md §2.
 */
export const reasons: Reason[] = [
  {
    title: 'Honest weighing',
    body: 'Loads are weighed in front of you on our own calibrated scales. Nothing is assessed out of sight.',
  },
  {
    title: 'Graded by people who know grades',
    body: 'Trained, experienced staff working to real trade classifications — not a flat price for "mixed metal".',
  },
  {
    title: 'Paid before you leave',
    body: 'Instant EFT on completion. No cash, in line with the Scrap Metal Industry Regulations 2016 — traceable, and how a licensed yard should operate.',
  },
  {
    title: "We'll beat any genuine quote",
    body: 'Bring us a real quote from another yard and we will better it. Fifty years of buying gives us the margin to do it.',
  },
]

/**
 * Logistics questions, not marketing questions. These are the things a caller
 * actually rings to ask. Structure borrowed from the competitor audit
 * (research/competitor-reference.md §2); every answer comes from Shine's own
 * published facts.
 */
export const faqs: Faq[] = [
  {
    q: 'Do I need an appointment?',
    a: 'No. Drive in during opening hours — 7:00am to 5:00pm Monday to Friday, or 7:00am to 1:00pm Saturday. Call ahead only if you are bringing a large or unusual load and want it assessed quickly.',
  },
  {
    q: 'How do you pay?',
    a: 'By EFT, on the spot, before you leave the site. We do not pay cash for scrap metal — that has been prohibited under the Scrap Metal Industry Regulations 2016 since 2016, and every licensed yard in NSW works the same way. Bring your bank details.',
  },
  {
    q: 'What do I need to bring?',
    a: 'Photo identification, and your bank details for the EFT. Recording ID against every transaction is a legal requirement on our side, not paperwork for its own sake.',
  },
  {
    q: 'Will you pick up, or supply a bin?',
    a: 'Both. We collect anywhere in NSW and the ACT, and we can drop bins on site for demolition, strip-out and ongoing production scrap. Call 0478 555 537 to arrange it.',
  },
  {
    q: 'Is there a minimum weight?',
    a: 'There is a minimum for pickups and for bin drops, because the truck has to be worth sending. There is no minimum to drive into the yard — call and we will tell you straight away whether your load is worth a collection or a trip in.',
    // TODO(client): the live site says "(minimum weight required)" without a
    // figure. Confirm the threshold and state it plainly here.
  },
  {
    q: 'Do you take mixed or dirty loads?',
    a: 'Yes, but grade is what sets the price. Clean, separated metal is worth considerably more than a mixed bin — contamination such as iron in brass turnings, or aluminium in a radiator load, moves it down a grade. Sort what you reasonably can and we will do the rest.',
  },
  {
    q: 'What do you actually buy?',
    a: 'Copper, brass, aluminium, stainless steel, ferrous and HMS 1 & 2, insulated cable and wiring harness, lead, batteries, radiators, electric motors, starter motors, alternators and compressors — twenty-one graded categories in all.',
  },
  {
    q: 'How far do you travel?',
    a: 'All of New South Wales and the ACT. The yard is at 8 Noonan Rd, Ingleburn, and our trucks run out from there.',
  },
]
