/**
 * The metals catalogue — the backbone of /metals and /metals/:slug.
 *
 * Grade names and the technical descriptions come from the client's own
 * buy-from-us catalogue (audited in research/current-site-content.md §3.3).
 * `accepted` / `notAccepted` are taken strictly from what that catalogue
 * actually specifies — nothing about tolerances or contamination limits is
 * invented here. `prep` is deliberately general advice, because how a load is
 * sorted genuinely changes the grade it falls into.
 */

export type Family =
  | 'Copper'
  | 'Brass'
  | 'Aluminium'
  | 'Stainless Steel'
  | 'Ferrous'
  | 'Wiring'
  | 'Other'

export interface Metal {
  slug: string
  grade: string
  family: Family
  /** One line for cards and table rows. */
  summary: string
  /** Fuller description for the detail page. */
  detail: string
  accepted: string[]
  notAccepted: string[]
  /** Where this typically comes from — helps people recognise their own load. */
  sources: string[]
  prep: string
  image: { src: string; alt: string }
}

export const metals: Metal[] = [
  // ── Copper ──────────────────────────────────────────────────────────────
  {
    slug: 'mill-berry-copper',
    grade: 'Mill Berry',
    family: 'Copper',
    summary: 'No. 1 bare, uncoated and unalloyed copper wire — Bare Bright.',
    detail:
      'The cleanest copper grade there is, and the highest paying. Bare bright wire with no coating, no alloy and no insulation, bright to the eye rather than dull or tarnished. Wire gauge is agreed between buyer and seller.',
    accepted: [
      'Bare, uncoated, unalloyed copper wire',
      'Bright, untarnished surface',
      'Wire gauge by agreement',
    ],
    notAccepted: ['Insulated or sheathed cable', 'Tinned or coated wire', 'Alloyed copper'],
    sources: ['Stripped building cable', 'Electrical rewires', 'Cable stripping operations'],
    prep:
      'Strip the insulation and keep it separate from tarnished or tinned copper — mixing bright wire into a lower grade costs you the difference on the whole load.',
    image: { src: '/img/buy/Berry.webp', alt: 'Mill Berry bare bright copper wire' },
  },
  {
    slug: 'candy-copper',
    grade: 'Candy',
    family: 'Copper',
    summary: 'Clean, unalloyed and uncoated copper solids — clippings through to tube.',
    detail:
      'Clean copper solids rather than wire. Clippings, punchings, bus bars, commutator segments and clean copper tubing all fall in here. Hydraulically briquetted copper is accepted subject to agreement.',
    accepted: [
      'Copper clippings and punchings',
      'Bus bars and commutator segments',
      'Clean copper tubing',
      'Briquetted copper by agreement',
    ],
    notAccepted: ['Coated or plated copper', 'Alloyed copper', 'Soldered or brazed joints'],
    sources: ['Switchboard strip-outs', 'Plumbing work', 'Sheet metal fabrication offcuts'],
    prep:
      'Cut off soldered fittings and brass valves where you can — a copper tube with brass ends grades down to the lower of the two.',
    image: { src: '/img/buy/Candy.webp', alt: 'Candy grade clean copper clippings and tubing' },
  },
  {
    slug: 'birch-cliff-copper',
    grade: 'Birch Cliff',
    family: 'Copper',
    summary: 'A combination of No. 2 copper wire and copper, as defined in the Birch and Cliff grades.',
    detail:
      'The working grade for copper that is clean but not bright — tarnished, lightly oxidised or slightly alloyed material that does not make Mill Berry or Candy. Combines the Birch and Cliff classifications.',
    accepted: ['No. 2 copper wire', 'Tarnished or oxidised copper', 'Light gauge copper'],
    notAccepted: ['Heavy corrosion or excessive dirt', 'Insulated cable', 'Brass or bronze'],
    sources: ['Older demolition strip-outs', 'Hot water systems', 'Mixed copper collections'],
    prep:
      'Separate anything genuinely bright out of this — it is worth more as Mill Berry than it is buried in a No. 2 bin.',
    image: { src: '/img/buy/Birch-Cliff.webp', alt: 'Birch Cliff copper scrap' },
  },
  {
    slug: 'ocean-radiators',
    grade: 'Ocean',
    family: 'Copper',
    summary: 'Mixed automobile radiators, free of aluminium and iron-finned radiators.',
    detail:
      'Copper and brass automotive radiator cores. The grade is defined by what is kept out of it: aluminium radiators and iron-finned radiators are excluded and priced separately.',
    accepted: ['Copper and brass automotive radiator cores', 'Mixed sizes and vehicle types'],
    notAccepted: ['Aluminium radiators', 'Iron-finned radiators'],
    sources: ['Mechanical workshops', 'Radiator specialists', 'End-of-life vehicles'],
    prep:
      'Keep aluminium radiators in a separate bin — they are bought under the Talk grade and mixing the two pulls the whole load down.',
    image: { src: '/img/buy/Ocean.webp', alt: 'Ocean grade mixed automobile copper radiators' },
  },
  // ── Aluminium ───────────────────────────────────────────────────────────
  {
    slug: 'extruded-aluminium',
    grade: 'Extruded',
    family: 'Aluminium',
    summary: 'Old 6063 aluminium extrusions — window and door section, framing and rail.',
    detail:
      'The most common aluminium grade in the building trade. Old 6063 extrusion in any length: window and door frames, shopfront section, framing and rail.',
    accepted: ['6063 extruded section', 'Window and door frames', 'Shopfront and framing section'],
    notAccepted: ['Glass still in frames', 'Steel screws, hinges and hardware', 'Painted or thermally broken section without agreement'],
    sources: ['Window and door replacement', 'Shopfitting', 'Building demolition'],
    prep:
      'Knock the glass out and pull the steel hardware. Clean extrusion with no attachments is a straightforward grade; a frame full of glass is not.',
    image: { src: '/img/buy/Extruded.webp', alt: 'Extruded 6063 aluminium section' },
  },
  {
    slug: 'tense-aluminium-castings',
    grade: 'Tense',
    family: 'Aluminium',
    summary: 'All types of clean aluminium castings, including automobile and aeroplane castings.',
    detail:
      'Cast aluminium rather than extruded or sheet. Covers all clean casting types, including automotive and aviation castings.',
    accepted: ['Clean aluminium castings of all types', 'Automotive castings', 'Aviation castings'],
    notAccepted: ['Steel inserts, bearings and studs', 'Oily or greasy castings', 'Iron contamination'],
    sources: ['Engine and gearbox housings', 'Machinery casings', 'Automotive workshops'],
    prep:
      'Drain the oil and knock out steel inserts and bearings where practical. Iron in a casting load is what moves it down a grade.',
    image: { src: '/img/buy/Tense.webp', alt: 'Tense grade clean aluminium castings' },
  },
  {
    slug: 'talk-aluminium-copper-radiators',
    grade: 'Talk',
    family: 'Aluminium',
    summary: 'Clean aluminium and copper radiators, and aluminium fins on copper tubing.',
    detail:
      'Mixed-metal radiator material: aluminium and copper radiators, plus aluminium fins on copper tubing. Priced on the recoverable copper content as much as the aluminium.',
    accepted: ['Clean aluminium radiators', 'Aluminium fin on copper tube', 'Air-conditioning coils'],
    notAccepted: ['Iron-finned radiators', 'Radiators still full of coolant or oil', 'Plastic end tanks left on where avoidable'],
    sources: ['Air-conditioning removals', 'Automotive radiators', 'Refrigeration strip-outs'],
    prep:
      'Drain them and cut the plastic tanks off if you can. Keep all-copper cores separate — those go in as Ocean and pay better.',
    image: { src: '/img/buy/Talk-Aluminium-Copper-Radiators-img.webp', alt: 'Talk grade aluminium and copper radiators' },
  },
  {
    slug: 'troma-aluminium-wheels',
    grade: 'Troma',
    family: 'Aluminium',
    summary: 'Clean, single-piece, unplated aluminium wheels from cars and trucks.',
    detail:
      'Alloy road wheels, single-piece and unplated, off both passenger vehicles and trucks. One of the cleanest and most consistent aluminium grades going.',
    accepted: ['Single-piece aluminium road wheels', 'Car and truck wheels', 'Unplated finish'],
    notAccepted: ['Chrome-plated wheels', 'Two-piece or steel-centred wheels', 'Tyres still fitted', 'Steel weights and valve stems'],
    sources: ['Tyre shops', 'Mechanical workshops', 'End-of-life vehicles'],
    prep:
      'Tyres off, balance weights off. Chromed wheels are a different grade — keep them out of the Troma bin.',
    image: { src: '/img/buy/Troma-Aluminium-Wheels.webp', alt: 'Troma clean unplated aluminium road wheels' },
  },
  // ── Brass ───────────────────────────────────────────────────────────────
  {
    slug: 'honey-brass',
    grade: 'Honey',
    family: 'Brass',
    summary: 'Mixed yellow brass solids — castings through to tubing, including plated brass.',
    detail:
      'The general yellow brass grade. Mixed brass solids of all kinds, from castings through to tubing, and plated brass is accepted in this grade.',
    accepted: ['Mixed yellow brass solids', 'Brass castings and tubing', 'Plated brass'],
    notAccepted: ['Brass turnings (graded as Night)', 'Heavy iron attachments', 'Brass with rubber or plastic left on where avoidable'],
    sources: ['Plumbing fittings and valves', 'Taps and tapware', 'Door hardware', 'Sprinkler and irrigation fittings'],
    prep:
      'Pull off steel spindles, rubber washers and plastic handles where it is quick. Keep turnings separate — they are a different grade.',
    image: { src: '/img/buy/Honey-Brass.webp', alt: 'Honey grade mixed yellow brass solids' },
  },
  {
    slug: 'night-brass-turnings',
    grade: 'Night',
    family: 'Brass',
    summary: 'Brass rod turnings, strictly free of other alloy turnings, with no more than 3% free iron.',
    detail:
      'Machining swarf from brass rod. This grade is defined tightly: strictly free of aluminium, manganese, composition, Tobin and Muntz metal turnings, and carrying no more than 3% free iron.',
    accepted: ['Brass rod turnings', 'Up to 3% free iron'],
    notAccepted: [
      'Aluminium turnings',
      'Manganese bronze turnings',
      'Composition, Tobin and Muntz metal turnings',
      'More than 3% free iron',
    ],
    sources: ['CNC and lathe shops', 'Fittings manufacturers', 'Precision machining'],
    prep:
      'Keep the machine swept out between jobs and keep bins by alloy. A brass turnings bin with aluminium swarf through it is no longer this grade.',
    image: { src: '/img/buy/Yellow-Honey-Brass.webp', alt: 'Night grade brass rod turnings' },
  },
  // ── Stainless ───────────────────────────────────────────────────────────
  {
    slug: 'stainless-steel-316',
    grade: 'Stainless 316',
    family: 'Stainless Steel',
    summary: 'Marine-grade stainless, valued for corrosion resistance and durability.',
    detail:
      'The higher-nickel, molybdenum-bearing stainless grade. Pays more than 304 and is worth separating if you know what you have.',
    accepted: ['316 and 316L stainless', 'Plate, sheet, pipe and fittings'],
    notAccepted: ['Magnetic (ferritic) stainless without agreement', 'Attached carbon steel', 'Heavily contaminated or greasy material'],
    sources: ['Marine and coastal fabrication', 'Food and pharmaceutical plant', 'Chemical process equipment'],
    prep:
      'If you are not certain whether it is 316 or 304, bring it in and we will test it rather than guessing — the difference in price is worth the trip.',
    image: { src: '/img/buy/Stainless-Steel-316.webp', alt: 'Stainless steel 316 scrap' },
  },
  {
    slug: 'stainless-steel-304',
    grade: 'Stainless 304',
    family: 'Stainless Steel',
    summary: 'The common austenitic grade — versatile, durable and widely used.',
    detail:
      'The most common stainless grade in circulation. Kitchen and food equipment, balustrade, sheet and pipe.',
    accepted: ['304 and 304L stainless', 'Sheet, pipe, tube and fabricated items'],
    notAccepted: ['Attached carbon steel frames or fixings', 'Magnetic stainless without agreement', 'Food residue and grease'],
    sources: ['Commercial kitchen strip-outs', 'Balustrade and handrail', 'Sheet metal fabrication'],
    prep:
      'Cut away mild steel frames and brackets. Stainless with steel through it is bought as the lesser metal.',
    image: { src: '/img/buy/Stainless-Steel-304.webp', alt: 'Stainless steel 304 scrap' },
  },
  // ── Ferrous ─────────────────────────────────────────────────────────────
  {
    slug: 'ferrous-metal',
    grade: 'Ferrous Metal',
    family: 'Ferrous',
    summary: 'Iron, steel and other ferrous alloys, in any quantity.',
    detail:
      'General steel and iron. Lower value per tonne than the non-ferrous grades, but it comes in volume, and we take it in any quantity above our minimum weight.',
    accepted: ['Steel and iron of all kinds', 'Cast iron', 'Light and heavy gauge'],
    notAccepted: ['Sealed gas bottles and pressure vessels', 'Anything containing liquids or fuel', 'Asbestos-bearing material'],
    sources: ['Building sites', 'Farm clean-ups', 'Machinery and plant', 'Household clear-outs'],
    prep:
      'Never bring in a sealed cylinder, tank or pressure vessel. Cut it open first or leave it out — it is a safety issue in the yard, not a pricing one.',
    image: { src: '/img/buy/Ferrous-Metal-new.webp', alt: 'Ferrous metal scrap' },
  },
  {
    slug: 'hms-1-and-2',
    grade: 'HMS 1 & 2',
    family: 'Ferrous',
    summary: 'Heavy melting steel for industrial applications. Quantity of each type by agreement.',
    detail:
      'Heavy melting scrap, prepared to size for the mills. The split between HMS 1 and HMS 2 in a load is agreed between buyer and seller.',
    accepted: ['Heavy gauge steel plate and section', 'Structural steel', 'Prepared to agreed dimensions'],
    notAccepted: ['Sealed vessels', 'Light gauge or tinplate', 'Non-ferrous attachments'],
    sources: ['Demolition and structural strip-out', 'Shipping and rail', 'Heavy plant and machinery'],
    prep:
      'Talk to us before you cut — the size and thickness you prepare to determines whether it grades as HMS 1 or HMS 2.',
    image: { src: '/img/buy/HMS-1.webp', alt: 'HMS 1 heavy melting steel scrap' },
  },
  // ── Wiring ──────────────────────────────────────────────────────────────
  {
    slug: 'insulated-copper-wire',
    grade: 'Insulated Copper Wire',
    family: 'Wiring',
    summary: 'Insulated copper wire of all descriptions. Quality agreed on inspection.',
    detail:
      'Copper cable still in its insulation. Because the copper content varies enormously between cable types, quality is assessed and agreed on inspection rather than sight-unseen.',
    accepted: ['Insulated copper cable of all gauges', 'Building and industrial cable', 'Mixed cable loads'],
    notAccepted: ['Aluminium-cored cable sold as copper', 'Cable with heavy steel armour, without agreement', 'Fibre optic and data cable with no copper'],
    sources: ['Electrical rewires', 'Site strip-outs', 'Switchboard and distribution work'],
    prep:
      'Keep heavy single-core cable separate from thin flex — the recovery rate is completely different and so is the price.',
    image: { src: '/img/buy/Insulated-Copper-Wires.webp', alt: 'Insulated copper wire' },
  },
  {
    slug: 'druid-copper-wiring',
    grade: 'Druid',
    family: 'Wiring',
    summary: 'Copper wiring bought on recovery rate — the yield agreed between buyer and seller.',
    detail:
      'Cable priced explicitly on the copper it will yield. The recovery rate is discussed and agreed rather than assumed, which is the fairest way to buy mixed cable.',
    accepted: ['Copper wiring assessed on recovery rate', 'Mixed gauge and insulation types'],
    notAccepted: ['Aluminium-cored cable', 'Cable with no recoverable copper'],
    sources: ['Electrical contractors', 'Telecommunications strip-outs', 'Industrial maintenance'],
    prep:
      'Bring a representative sample if the load is large — we can agree the recovery rate up front so there are no surprises on the weighbridge.',
    image: { src: '/img/buy/druid-new-one.webp', alt: 'Druid grade copper wiring' },
  },
  {
    slug: 'car-wiring-harness',
    grade: 'Car Wiring Harness',
    family: 'Wiring',
    summary: 'Automotive looms and harnesses, priced on recoverable copper content.',
    detail:
      'Vehicle wiring looms complete with connectors and plugs. Quality agreements are tailored to the load, because harness copper content varies by vehicle and era.',
    accepted: ['Automotive wiring looms and harnesses', 'Plugs and connectors attached'],
    notAccepted: ['Loose plastic trim and ducting', 'Modules and ECUs sold as harness'],
    sources: ['Wreckers and dismantlers', 'Vehicle strip-downs', 'Automotive workshops'],
    prep:
      'No need to strip the plugs — bring the loom as it comes out and we will assess it.',
    image: { src: '/img/buy/Car-Wiring-Harness.webp', alt: 'Car wiring harness scrap' },
  },
  // ── Other ───────────────────────────────────────────────────────────────
  {
    slug: 'lead-scrap',
    grade: 'Lead Scrap',
    family: 'Other',
    summary: 'Clean lead solids and shots, free of drosses and battery plates.',
    detail:
      'Clean lead only. Solids and shot, specifically free of contaminants such as drosses and battery plates — batteries are bought separately.',
    accepted: ['Lead solids', 'Lead shot', 'Lead flashing and sheet'],
    notAccepted: ['Drosses', 'Battery plates', 'Lead-acid batteries (bought separately)'],
    sources: ['Roof and window flashing', 'Plumbing work', 'Ballast and counterweights', 'Radiation shielding'],
    prep:
      'Keep batteries out of the lead bin entirely — we buy them, just not under this grade.',
    image: { src: '/img/buy/Scrap-Lead.webp', alt: 'Clean lead scrap solids' },
  },
  {
    slug: 'electric-motors',
    grade: 'Electric Motors',
    family: 'Other',
    summary: 'Mixed electric motors, from household units through to industrial.',
    detail:
      'Whole electric motors, bought mixed. Priced on the copper windings inside relative to the steel and aluminium housing.',
    accepted: ['Whole electric motors of all sizes', 'Industrial and domestic units', 'Copper-wound motors'],
    notAccepted: ['Motors full of oil', 'Aluminium-wound motors sold as copper-wound', 'Motors still bolted to plant'],
    sources: ['Industrial maintenance', 'Air-conditioning and refrigeration', 'Pumps and machinery', 'Appliance recycling'],
    prep:
      'Unbolt them from mounts and pumps. A motor with a steel gearbox attached is bought as the lesser metal across the whole weight.',
    image: { src: '/img/buy/Electric-Motors-MIX.webp', alt: 'Mixed electric motors' },
  },
  {
    slug: 'starter-motors-alternators',
    grade: 'Starters & Alternators',
    family: 'Other',
    summary: 'Car starter motors and alternators, by the piece or by the bin.',
    detail:
      'Automotive starters and alternators, bought as a dedicated grade because their copper content is high relative to their size.',
    accepted: ['Car and truck starter motors', 'Alternators', 'By the piece or by the bin'],
    notAccepted: ['Units with heavy steel brackets attached', 'Oil-filled or heavily greased units'],
    sources: ['Wreckers and dismantlers', 'Mechanical workshops', 'Auto electricians'],
    prep:
      'No stripping needed — bring them whole. Just keep them out of the general ferrous bin, where they would be paid as steel.',
    image: { src: '/img/buy/Starter-Motors-Alterators.webp', alt: 'Car starter motors and alternators' },
  },
  {
    slug: 'compressors',
    grade: 'Compressors',
    family: 'Other',
    summary: 'Fridge, air-conditioning and industrial compressors.',
    detail:
      'Sealed compressor units from refrigeration, air-conditioning and industrial plant. Bought whole and priced on the copper windings inside.',
    accepted: ['Fridge and freezer compressors', 'Air-conditioning compressors', 'Industrial compressor units'],
    notAccepted: ['Units still charged with refrigerant gas', 'Compressors still attached to plant or framing'],
    sources: ['Air-conditioning installers', 'Refrigeration mechanics', 'Appliance recycling', 'Site strip-outs'],
    prep:
      'Refrigerant must be recovered by a licensed technician before it comes to the yard. Degassed units only.',
    image: { src: '/img/buy/Fridge-Compressors.webp', alt: 'Fridge and air-conditioning compressors' },
  },
]

export const families: Family[] = [
  'Copper',
  'Brass',
  'Aluminium',
  'Stainless Steel',
  'Ferrous',
  'Wiring',
  'Other',
]

export function metalBySlug(slug: string): Metal | undefined {
  return metals.find((m) => m.slug === slug)
}

export function metalsByFamily(family: Family): Metal[] {
  return metals.filter((m) => m.family === family)
}

/** Lead photograph per family, for the catalogue index and family headers. */
export const familyImage: Record<Family, { src: string; alt: string }> = {
  Copper: { src: '/img/buy/Bright-and-shiny-img.webp', alt: 'Bright and shiny copper wire' },
  Brass: { src: '/img/buy/Honey-Brass.webp', alt: 'Mixed yellow brass solids and fittings' },
  Aluminium: { src: '/img/buy/Extruded.webp', alt: 'Aluminium extrusion section' },
  'Stainless Steel': { src: '/img/buy/Stainless-Steel-304.webp', alt: 'Stainless steel scrap' },
  Ferrous: { src: '/img/buy/HMS-1.webp', alt: 'Heavy melting steel scrap' },
  Wiring: { src: '/img/buy/Insulated-Copper-Wires.webp', alt: 'Insulated copper cable' },
  Other: { src: '/img/buy/Electric-Motors-MIX.webp', alt: 'Electric motors and compressors' },
}

/** Short blurb per family, used as section intros on /metals. */
export const familyIntro: Record<Family, string> = {
  Copper:
    'The highest-value metal we buy, and the one where grading matters most. Bright wire, clean solids and radiator cores are all priced differently.',
  Brass:
    'Solids and turnings are two separate grades with very different specifications. Keeping them apart is worth real money.',
  Aluminium:
    'Extrusion, castings, radiators and wheels each have their own grade. Attachments and glass are what pull a load down.',
  'Stainless Steel':
    '316 pays more than 304. If you are not sure which you have, bring it in and we will test it rather than guess.',
  Ferrous:
    'Steel and iron by volume. Never bring in sealed cylinders, tanks or pressure vessels — cut them open first.',
  Wiring:
    'Cable is bought on recovery rate: the copper it actually yields. Heavy single-core and thin flex are worlds apart.',
  Other:
    'Lead, motors, starters, alternators and compressors — all bought whole, all priced on the copper inside.',
}
