import type { Material, MaterialFamily } from './types'

/**
 * The full buy-from-us catalogue — 21 grades, every one with the client's own
 * photograph. Grade names are real ISRI trade classifications, which is Shine's
 * strongest differentiator: no competitor in this market publishes them.
 * Source: research/current-site-content.md §3.3.
 */
export const materials: Material[] = [
  // ── Copper ──────────────────────────────────────────────────────────────
  {
    grade: 'Mill Berry',
    family: 'Copper',
    description: 'No. 1 bare, uncoated and unalloyed copper wire — Bare Bright. Gauge by agreement.',
    image: { src: '/img/buy/Berry.webp', alt: 'Mill Berry bare bright copper wire' },
  },
  {
    grade: 'Candy',
    family: 'Copper',
    description: 'Clean, unalloyed and uncoated copper clippings, punchings, bus bars, commutator segments and clean copper tubing.',
    image: { src: '/img/buy/Candy.webp', alt: 'Candy grade clean copper clippings and tubing' },
  },
  {
    grade: 'Birch Cliff',
    family: 'Copper',
    description: 'A combination of No. 2 copper wire and copper as defined in the Birch and Cliff grades.',
    image: { src: '/img/buy/Birch-Cliff.webp', alt: 'Birch Cliff copper scrap' },
  },
  {
    grade: 'Ocean',
    family: 'Copper',
    description: 'Mixed automobile radiators, free of aluminium radiators and iron-finned radiators.',
    image: { src: '/img/buy/Ocean.webp', alt: 'Ocean grade mixed automobile copper radiators' },
  },
  // ── Aluminium ───────────────────────────────────────────────────────────
  {
    grade: 'Extruded',
    family: 'Aluminium',
    description: 'Old 6063 aluminium extrusions — window and door section, framing and rail.',
    image: { src: '/img/buy/Extruded.webp', alt: 'Extruded 6063 aluminium section' },
  },
  {
    grade: 'Tense',
    family: 'Aluminium',
    description: 'All types of clean aluminium castings, including automobile and aeroplane castings.',
    image: { src: '/img/buy/Tense.webp', alt: 'Tense grade clean aluminium castings' },
  },
  {
    grade: 'Talk',
    family: 'Aluminium',
    description: 'Clean aluminium and copper radiators, and aluminium fins on copper tubing.',
    image: { src: '/img/buy/Talk-Aluminium-Copper-Radiators-img.webp', alt: 'Talk grade aluminium and copper radiators' },
  },
  {
    grade: 'Troma',
    family: 'Aluminium',
    description: 'Clean, single-piece, unplated aluminium wheels from automobiles and trucks.',
    image: { src: '/img/buy/Troma-Aluminium-Wheels.webp', alt: 'Troma clean unplated aluminium road wheels' },
  },
  // ── Brass ───────────────────────────────────────────────────────────────
  {
    grade: 'Honey',
    family: 'Brass',
    description: 'Mixed yellow brass solids — castings through to tubing, including plated brass.',
    image: { src: '/img/buy/Honey-Brass.webp', alt: 'Honey grade mixed yellow brass solids' },
  },
  {
    grade: 'Night',
    family: 'Brass',
    description: 'Brass rod turnings, strictly free of aluminium, manganese, composition, Tobin and Muntz metal turnings, with no more than 3% free iron.',
    image: { src: '/img/buy/Yellow-Honey-Brass.webp', alt: 'Night grade brass rod turnings' },
  },
  // ── Stainless steel ─────────────────────────────────────────────────────
  {
    grade: 'Stainless 316',
    family: 'Stainless Steel',
    description: 'High-grade stainless steel, valued for its corrosion resistance and durability.',
    image: { src: '/img/buy/Stainless-Steel-316.webp', alt: 'Stainless steel 316 scrap' },
  },
  {
    grade: 'Stainless 304',
    family: 'Stainless Steel',
    description: 'The most common grade — versatile, durable and widely used in fabrication and food equipment.',
    image: { src: '/img/buy/Stainless-Steel-304.webp', alt: 'Stainless steel 304 scrap' },
  },
  // ── Ferrous ─────────────────────────────────────────────────────────────
  {
    grade: 'Ferrous Metal',
    family: 'Ferrous',
    description: 'Iron, steel and other ferrous alloys, in any quantity.',
    image: { src: '/img/buy/Ferrous-Metal-new.webp', alt: 'Ferrous metal scrap' },
  },
  {
    grade: 'HMS 1 & 2',
    family: 'Ferrous',
    description: 'Heavy melting steel suitable for a range of industrial applications. Quantity of each type by agreement.',
    image: { src: '/img/buy/HMS-1.webp', alt: 'HMS 1 heavy melting steel scrap' },
  },
  // ── Wiring ──────────────────────────────────────────────────────────────
  {
    grade: 'Insulated Copper Wire',
    family: 'Wiring',
    description: 'Insulated copper wire of all descriptions. Quality assessed and agreed on inspection.',
    image: { src: '/img/buy/Insulated-Copper-Wires.webp', alt: 'Insulated copper wire' },
  },
  {
    grade: 'Druid',
    family: 'Wiring',
    description: 'Copper wiring bought on recovery rate — the yield agreed between buyer and seller.',
    image: { src: '/img/buy/druid-new-one.webp', alt: 'Druid grade copper wiring' },
  },
  {
    grade: 'Car Wiring Harness',
    family: 'Wiring',
    description: 'Automotive wiring looms and harnesses, priced on the copper content recovered.',
    image: { src: '/img/buy/Car-Wiring-Harness.webp', alt: 'Car wiring harness scrap' },
  },
  // ── Other ───────────────────────────────────────────────────────────────
  {
    grade: 'Lead Scrap',
    family: 'Other',
    description: 'Clean lead solids and shots, free of contaminants such as drosses and battery plates.',
    image: { src: '/img/buy/Scrap-Lead.webp', alt: 'Clean lead scrap solids' },
  },
  {
    grade: 'Electric Motors',
    family: 'Other',
    description: 'Mixed electric motors of all sizes, from household units to industrial.',
    image: { src: '/img/buy/Electric-Motors-MIX.webp', alt: 'Mixed electric motors' },
  },
  {
    grade: 'Starters & Alternators',
    family: 'Other',
    description: 'Car starter motors and alternators, bought by the piece or by the bin.',
    image: { src: '/img/buy/Starter-Motors-Alterators.webp', alt: 'Car starter motors and alternators' },
  },
  {
    grade: 'Compressors',
    family: 'Other',
    description: 'Fridge, air-conditioning and industrial compressors.',
    image: { src: '/img/buy/Fridge-Compressors.webp', alt: 'Fridge and air-conditioning compressors' },
  },
]

export const families: (MaterialFamily | 'All')[] = [
  'All',
  'Copper',
  'Brass',
  'Aluminium',
  'Stainless Steel',
  'Ferrous',
  'Wiring',
  'Other',
]

/**
 * The plain-English list from the homepage — what a member of the public
 * recognises, as opposed to the trade grades above.
 * Source: research/current-site-content.md §2 ("Our Latest Work").
 */
export const weBuy: { name: string; image: string }[] = [
  { name: 'Bright & shiny copper', image: '/img/home/Bright-and-Shiny-Copper-service.webp' },
  { name: 'Electric copper cable', image: '/img/home/Electric-Copper-Cable-service-new.webp' },
  { name: 'Brass', image: '/img/home/Brass-service.webp' },
  { name: 'Aluminium extrusion', image: '/img/home/Aluminum-Extrusion-service.webp' },
  { name: 'Aluminium wheels', image: '/img/home/Aluminum-Wheels-service.webp' },
  { name: 'Aluminium soft bales', image: '/img/home/Extrusion-Aluminum-Soft-Bales-service.webp' },
  { name: 'Heavy steel', image: '/img/home/Heavy-Steel-service.webp' },
  { name: 'Radiators', image: '/img/home/Radiators-service.webp' },
  { name: 'Lead & electrical cable', image: '/img/home/Lead-Electrical-Cable-service.webp' },
  { name: 'New & used batteries', image: '/img/sell/new-used-batteries.webp' },
  { name: 'Copper No. 1', image: '/img/sell/Copper-No-1-img.webp' },
  { name: 'High-grade copper cable', image: '/img/sell/High-Grade-Copper-Cables-img.webp' },
]
