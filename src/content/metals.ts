/**
 * The metals catalogue — the backbone of /metals and /metals/:slug.
 */

export type Family =
  | 'Aluminium'
  | 'AC Units'
  | 'Battery'
  | 'Brass'
  | 'Copper'
  | 'Lead'
  | 'Motor'
  | 'Radiator'
  | 'Steel'

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
  // ── Aluminium ───────────────────────────────────────────────────────────
  { slug: 'aluminium-rims', grade: 'Aluminium Rims', family: 'Aluminium', summary: 'Clean aluminium rims', detail: 'Clean aluminium rims from vehicles.', accepted: ['Aluminium rims'], notAccepted: ['Steel wheels', 'Tyres attached'], sources: ['Automotive'], prep: 'Remove tyres and weights.', image: { src: '/img/buy/aluminium-rims.webp', alt: 'Scrap aluminium rims and wheels ready for recycling at Shine Motor Corporation Ingleburn Sydney' } },
  { slug: 'extruded-aluminium', grade: 'Extruded Aluminium', family: 'Aluminium', summary: 'Clean aluminium extrusions', detail: 'Clean aluminium extrusions and profiles.', accepted: ['Extruded profiles'], notAccepted: ['Steel attachments', 'Glass'], sources: ['Window frames', 'Construction'], prep: 'Remove all non-aluminium attachments.', image: { src: '/img/buy/extruded-aluminium.webp', alt: 'Extruded aluminium profiles and scrap extrusions for recycling in Sydney' } },
  { slug: 'aluminium-domestic', grade: 'Aluminium Domestic', family: 'Aluminium', summary: 'Mixed domestic aluminium scrap', detail: 'General household aluminium items.', accepted: ['Pots, pans, general household alu'], notAccepted: ['Food residue', 'Iron handles'], sources: ['Household clear-outs'], prep: 'Clean out food residue and remove iron handles.', image: { src: '/img/buy/aluminium-domestic.webp', alt: 'Domestic aluminium scrap including pots and pans bought for recycling in Ingleburn NSW' } },
  { slug: 'cast-aluminium', grade: 'Cast Aluminium', family: 'Aluminium', summary: 'Clean aluminium castings', detail: 'Clean aluminium castings from engines and machinery.', accepted: ['Engine blocks', 'Castings'], notAccepted: ['Steel inserts', 'Heavy oil'], sources: ['Automotive', 'Machinery'], prep: 'Drain fluids and remove steel bolts.', image: { src: '/img/buy/cast-aluminium.webp', alt: 'Cast aluminium engine blocks and machinery castings for scrap recycling Sydney' } },
  { slug: 'irony-aluminium', grade: 'Irony Aluminium', family: 'Aluminium', summary: 'Aluminium with iron attachments', detail: 'Aluminium items containing significant iron/steel.', accepted: ['Aluminium with steel bolts/inserts'], notAccepted: ['Excessive non-metallics'], sources: ['General scrap'], prep: 'No specific prep needed.', image: { src: '/img/buy/irony-aluminium.webp', alt: 'Irony aluminium scrap with steel attachments accepted at Shine Motor Corporation yard Ingleburn' } },

  // ── AC Units ────────────────────────────────────────────────────────────
  { slug: 'ac-units-d-gas', grade: 'AC Units D Gas', family: 'AC Units', summary: 'Degassed air conditioning units only', detail: 'Air conditioning units already degassed and certified, ready for processing. Degassed units are graded higher because they can go straight into the line.', accepted: ['Degassed window units', 'Degassed split systems', 'Units with a degas certificate'], notAccepted: ['Units still holding refrigerant'], sources: ['HVAC contractors', 'Licensed degassing services'], prep: 'Bring the degassing certificate if you have one.', image: { src: '/img/buy/ac-units-d-gas.webp', alt: 'Degassed split system and window air conditioning units stacked for scrap recycling at Shine Motor Corporation Ingleburn' } },

  // ── Battery ─────────────────────────────────────────────────────────────
  { slug: 'batteries', grade: 'Batteries', family: 'Battery', summary: 'Lead-acid batteries', detail: 'Used lead-acid batteries from vehicles and equipment.', accepted: ['Car batteries', 'Truck batteries'], notAccepted: ['Lithium-ion batteries', 'Leaking batteries'], sources: ['Automotive', 'Solar setups'], prep: 'Keep upright to prevent acid spills.', image: { src: '/img/buy/batteries.webp', alt: 'Used lead-acid car and truck batteries stacked upright for scrap recycling at Shine Motor Corporation Ingleburn' } },

  // ── Brass ───────────────────────────────────────────────────────────────
  { slug: 'gun-metal-mix-brass', grade: 'Gun Metal, Mix Brass', family: 'Brass', summary: 'Mixed yellow and red brass', detail: 'A mixture of various brass items and gun metal.', accepted: ['Plumbing fittings', 'Brass ornaments'], notAccepted: ['Steel attachments'], sources: ['Plumbing', 'Demolition'], prep: 'Remove steel and plastic.', image: { src: '/img/buy/gun-metal-mix-brass.webp', alt: 'Mixed gun metal and brass scrap fittings for recycling at scrap yard Ingleburn NSW' } },
  { slug: 'coast-brass', grade: 'Coast Brass', family: 'Brass', summary: 'Coast brass scrap', detail: 'Clean coast brass materials.', accepted: ['Coast brass'], notAccepted: ['Contaminated brass'], sources: ['Marine', 'Industrial'], prep: 'Ensure material is clean.', image: { src: '/img/buy/coast-brass.webp', alt: 'Clean coast brass scrap from marine and industrial sources sold in Sydney' } },

  // ── Copper ──────────────────────────────────────────────────────────────
  { slug: 'bright-copper-wire', grade: 'Bright Copper Wire', family: 'Copper', summary: 'Bare, bright, uncoated copper wire', detail: 'The cleanest and most valuable copper wire.', accepted: ['Bare bright copper wire'], notAccepted: ['Tarnished wire', 'Insulation'], sources: ['Electrical contractors'], prep: 'Strip insulation completely.', image: { src: '/img/buy/bright-copper-wire.webp', alt: 'Bright bare copper wire scrap stripped of insulation for top prices at Shine Motor Corporation Sydney' } },
  { slug: 'no-1-copper', grade: 'No. 1 Copper', family: 'Copper', summary: 'Clean copper tubing and solids', detail: 'Clean, unalloyed copper solids and tubing.', accepted: ['Clean copper pipe', 'Punchings'], notAccepted: ['Solder', 'Brass fittings'], sources: ['Plumbing', 'Construction'], prep: 'Cut off brass fittings and solder joints.', image: { src: '/img/buy/no-1-copper.webp', alt: 'No. 1 copper pipe and tubing scrap recycled at Shine Motor Corporation Ingleburn NSW' } },
  { slug: 'no-2-copper', grade: 'No. 2 Copper', family: 'Copper', summary: 'Tarnished or lightly oxidised copper', detail: 'Copper that is clean but has oxidation or tarnish.', accepted: ['Tarnished wire', 'Lightly oxidised pipe'], notAccepted: ['Heavy corrosion', 'Brass'], sources: ['Older plumbing', 'Demolition'], prep: 'Separate from bright copper.', image: { src: '/img/buy/no-2-copper.webp', alt: 'No. 2 tarnished copper wire and pipe bought for recycling at scrap yard Sydney' } },
  { slug: 'domestic-copper', grade: 'Domestic Copper', family: 'Copper', summary: 'Mixed domestic copper items', detail: 'General copper scrap from household items.', accepted: ['Pots', 'Ornaments', 'Mixed copper'], notAccepted: ['Non-copper attachments'], sources: ['Household scrap'], prep: 'Remove handles and steel parts.', image: { src: '/img/buy/domestic-copper.webp', alt: 'Domestic copper scrap including pots and ornaments accepted at Shine Motor Ingleburn' } },
  { slug: 'insulated-copper-wire-20', grade: 'Insulated Copper Wire 20%', family: 'Copper', summary: 'Low-yield insulated copper wire', detail: 'Insulated cable yielding roughly 20% copper.', accepted: ['Low-yield comms cable', 'Thin flex'], notAccepted: ['Fibre optics'], sources: ['IT', 'Telecommunications'], prep: 'None required.', image: { src: '/img/buy/insulated-copper-wire-20.webp', alt: 'Low-yield insulated copper wire 20 percent for scrap recycling in Sydney' } },
  { slug: 'insulated-copper-wire-40', grade: 'Insulated Copper Wire 40%', family: 'Copper', summary: 'Medium-yield insulated copper wire', detail: 'Insulated cable yielding roughly 40% copper.', accepted: ['Standard appliance cords', 'Mixed cable'], notAccepted: ['Heavy steel armour'], sources: ['General electrical'], prep: 'None required.', image: { src: '/img/buy/insulated-copper-wire-40.webp', alt: 'Medium-yield insulated copper cable 40 percent bought by Shine Motor Corporation Ingleburn' } },
  { slug: 'insulated-copper-wire-75', grade: 'Insulated Copper Wire 75%', family: 'Copper', summary: 'High-yield insulated copper wire', detail: 'Thick insulated cable yielding roughly 75% copper.', accepted: ['Heavy power cable', 'Industrial wiring'], notAccepted: ['Aluminium core'], sources: ['Industrial electrical', 'Mains power'], prep: 'None required.', image: { src: '/img/buy/insulated-copper-wire-75.webp', alt: 'High-yield insulated copper power cable 75 percent for scrap at Shine Motor Sydney' } },
  { slug: 'insulated-copper-wire-83', grade: 'Insulated Copper Wire 83%', family: 'Copper', summary: 'Very high-yield insulated copper wire', detail: 'Thickest insulated cable yielding roughly 83% copper.', accepted: ['Very heavy power cable'], notAccepted: ['Aluminium core'], sources: ['Industrial distribution'], prep: 'None required.', image: { src: '/img/buy/insulated-copper-wire-83.webp', alt: 'Very high-yield insulated copper mains cable 83 percent recycled at Shine Motor Ingleburn NSW' } },
  { slug: 'car-wire', grade: 'Car Wire', family: 'Copper', summary: 'Automotive wiring harnesses', detail: 'Complete wiring harnesses from vehicles.', accepted: ['Automotive wiring looms', 'Plugs attached'], notAccepted: ['Excessive plastic trim'], sources: ['Auto wreckers'], prep: 'No need to remove plugs.', image: { src: '/img/buy/car-wire.webp', alt: 'Automotive car wiring harnesses and looms bought for copper recycling in Sydney' } },

  // ── Lead ────────────────────────────────────────────────────────────────
  { slug: 'soft-lead', grade: 'Soft Lead', family: 'Lead', summary: 'Clean soft lead solids', detail: 'Clean lead sheet, pipe, and solids.', accepted: ['Lead flashing', 'Lead pipe'], notAccepted: ['Lead-acid batteries', 'Dross'], sources: ['Roofing', 'Plumbing'], prep: 'Ensure it is free of tar and iron.', image: { src: '/img/buy/soft-lead.webp', alt: 'Soft lead scrap sheet pipe and flashing for recycling at Shine Motor Corporation Ingleburn Sydney' } },

  // ── Motor ───────────────────────────────────────────────────────────────
  { slug: 'electric-motors', grade: 'Electric Motors', family: 'Motor', summary: 'Mixed electric motors', detail: 'Whole electric motors containing copper windings.', accepted: ['Mixed electric motors'], notAccepted: ['Oil-filled units'], sources: ['Appliances', 'Industrial equipment'], prep: 'Remove attached pumps or gearboxes.', image: { src: '/img/buy/electric-motors.webp', alt: 'Mixed electric motors with copper windings for scrap recycling at Shine Motor Corporation Sydney' } },
  { slug: 'lgem', grade: 'LGEM', family: 'Motor', summary: 'Large electric motors', detail: 'Heavy industrial electric motors.', accepted: ['Large industrial motors'], notAccepted: ['Attached heavy machinery'], sources: ['Industrial plant'], prep: 'Unbolt from heavy steel mounts.', image: { src: '/img/buy/lgem.webp', alt: 'Large industrial electric motors LGEM scrap bought by Shine Motor Corporation Ingleburn' } },
  { slug: 'compressor', grade: 'Compressor', family: 'Motor', summary: 'Fridge and AC compressors', detail: 'Sealed compressor units.', accepted: ['Fridge compressors', 'AC compressors'], notAccepted: ['Gas-charged units'], sources: ['HVAC', 'Appliance recycling'], prep: 'Must be degassed by a professional.', image: { src: '/img/buy/compressor.webp', alt: 'Fridge and AC compressor scrap units recycled at Shine Motor Ingleburn NSW' } },
  { slug: 'starter-alternator', grade: 'Starter & Alternator', family: 'Motor', summary: 'Automotive starters and alternators', detail: 'Starters and alternators from vehicles.', accepted: ['Car alternators', 'Car starters'], notAccepted: ['Excessive brackets attached'], sources: ['Auto wreckers'], prep: 'Remove steel mounting brackets.', image: { src: '/img/buy/starter-alternator.webp', alt: 'Car starters and alternators scrap metal bought for recycling at Shine Motor Corporation Sydney' } },

  // ── Radiator ────────────────────────────────────────────────────────────
  { slug: 'copper-brass-radiator', grade: 'Copper Brass Radiator', family: 'Radiator', summary: 'Clean copper/brass radiators', detail: 'Automotive or industrial copper/brass radiators.', accepted: ['Copper/brass radiator cores'], notAccepted: ['Aluminium cores', 'Iron fins'], sources: ['Automotive'], prep: 'Remove steel brackets.', image: { src: '/img/buy/copper-brass-radiator.webp', alt: 'Copper brass radiator cores from cars and trucks for scrap recycling at Shine Motor Ingleburn' } },
  { slug: 'al-cu-radiator', grade: 'AL/CU Radiator', family: 'Radiator', summary: 'Aluminium/copper radiators', detail: 'Radiators with copper tubes and aluminium fins.', accepted: ['Al/Cu radiators', 'AC coils'], notAccepted: ['Iron fins'], sources: ['HVAC', 'Automotive'], prep: 'Remove plastic end tanks if possible.', image: { src: '/img/buy/al-cu-radiator.webp', alt: 'Aluminium copper AL-CU radiators and AC coils for scrap at Shine Motor Corporation Sydney' } },
  { slug: 'aluminium-radiator', grade: 'Aluminium Radiator', family: 'Radiator', summary: 'Clean aluminium radiators', detail: 'All-aluminium radiators.', accepted: ['Aluminium radiators'], notAccepted: ['Copper cores'], sources: ['Automotive'], prep: 'Remove plastic end tanks.', image: { src: '/img/buy/aluminium-radiator.webp', alt: 'All-aluminium car radiators for scrap recycling at Shine Motor Corporation Ingleburn NSW' } },

  // ── Steel ───────────────────────────────────────────────────────────────
  { slug: 'stainless-steel-304', grade: 'Stainless Steel 304', family: 'Steel', summary: '304 grade stainless steel', detail: 'Common austenitic stainless steel.', accepted: ['304 stainless sheet', 'pipe'], notAccepted: ['Magnetic stainless', 'Heavy iron attachments'], sources: ['Kitchens', 'Fabrication'], prep: 'Remove steel brackets.', image: { src: '/img/buy/stainless-steel-304.webp', alt: '304 grade stainless steel sheet and pipe scrap recycled at Shine Motor Corporation Sydney' } },
  { slug: 'stainless-steel-316', grade: 'Stainless Steel 316', family: 'Steel', summary: '316 marine grade stainless', detail: 'Higher-nickel marine grade stainless steel.', accepted: ['316 stainless'], notAccepted: ['Magnetic stainless'], sources: ['Marine', 'Chemical plant'], prep: 'Keep separate from 304.', image: { src: '/img/buy/stainless-steel-316.webp', alt: '316 marine grade stainless steel scrap bought at Shine Motor Corporation Ingleburn NSW' } },
  { slug: 'hms-insize', grade: 'HMS Insize', family: 'Steel', summary: 'Heavy melting steel', detail: 'Heavy gauge steel prepared to size.', accepted: ['Structural steel', 'Heavy plate'], notAccepted: ['Light gauge steel', 'Sealed vessels'], sources: ['Demolition', 'Heavy industry'], prep: 'Cut to agreed size.', image: { src: '/img/buy/hms-insize.webp', alt: 'Heavy melting steel HMS scrap structural steel and plate for recycling in Sydney' } },
  { slug: 'light-gage-steel', grade: 'Light Gage Steel', family: 'Steel', summary: 'Light gauge steel scrap', detail: 'Thin or light gauge steel materials.', accepted: ['Roofing iron', 'Whitegoods', 'Light steel'], notAccepted: ['Sealed vessels'], sources: ['Household', 'Construction'], prep: 'Ensure no hazardous materials are attached.', image: { src: '/img/buy/light-gage-steel.webp', alt: 'Light gauge steel scrap roofing iron and whitegoods recycled at Shine Motor Ingleburn' } },
]

export const families: Family[] = [
  'Copper',
  'Brass',
  'Aluminium',
  'Steel',
  'Motor',
  'Radiator',
  'AC Units',
  'Battery',
  'Lead',
]

export function metalBySlug(slug: string): Metal | undefined {
  return metals.find((m) => m.slug === slug)
}

export function metalsByFamily(family: Family): Metal[] {
  return metals.filter((m) => m.family === family)
}

/** Lead photograph per family, for the catalogue index and family headers. */
export const familyImage: Record<Family, { src: string; alt: string }> = {
  Copper:     { src: '/img/buy/copper_scrap_1788318729220.webp',    alt: 'Scrap copper wire and tubing for recycling at Shine Motor Corporation Ingleburn Sydney' },
  Brass:      { src: '/img/buy/brass_scrap_1788318742664.webp',     alt: 'Mixed brass and gun metal scrap fittings bought at Shine Motor Corporation Ingleburn' },
  Aluminium:  { src: '/img/buy/aluminium_scrap_1788318766541.webp', alt: 'Aluminium scrap including extrusions rims and castings recycled at Shine Motor Sydney' },
  Steel:      { src: '/img/buy/steel_scrap_1788318778283.webp',     alt: 'Heavy and light gauge steel scrap for recycling at Shine Motor Corporation Ingleburn NSW' },
  Motor:      { src: '/img/buy/motor_scrap_1788318793266.webp',     alt: 'Electric motors starters alternators and compressors bought for scrap in Sydney' },
  Radiator:   { src: '/img/buy/radiator_scrap_1788319024964.webp',  alt: 'Copper brass and aluminium radiator cores for scrap recycling at Shine Motor Ingleburn' },
  'AC Units': { src: '/img/buy/ac_unit_scrap_1788319053531.webp',   alt: 'Degassed air conditioning units for scrap recycling at Shine Motor Corporation Sydney' },
  Battery:    { src: '/img/buy/battery_scrap_1788319066022.webp',   alt: 'Used lead-acid car and truck batteries for scrap recycling in Ingleburn NSW' },
  Lead:       { src: '/img/buy/lead_scrap_1788319079231.webp',      alt: 'Soft lead scrap sheet pipe and flashing recycled at Shine Motor Corporation Sydney' },
}

/** Short blurb per family, used as section intros on /metals. */
export const familyIntro: Record<Family, string> = {
  Copper: 'From bright wire to car harnesses, we buy all grades of copper at highly competitive rates.',
  Brass: 'We purchase all types of clean and mixed brass solids, including gun metal and coast brass.',
  Aluminium: 'Extrusion, castings, domestic scrap, and rims — we buy all forms of aluminium.',
  Steel: 'We accept everything from premium 316 stainless to heavy melting steel and light gauge scrap.',
  Motor: 'Bring in your electric motors, large industrial units, compressors, starters, and alternators.',
  Radiator: 'We purchase copper/brass, aluminium/copper, and all-aluminium radiator cores.',
  'AC Units': 'We buy degassed air conditioning units only — window, split system and ducted — for the copper, aluminium and steel inside them. Units must be degassed by a licensed technician before they reach the yard; we cannot accept anything still holding refrigerant.',
  Battery: 'We safely recycle lead-acid batteries from vehicles, trucks, and solar setups.',
  Lead: 'Clean soft lead solids, pipe, and flashing are purchased at daily market rates.',
}
