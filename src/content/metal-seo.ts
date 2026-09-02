/**
 * Long-form content for each grade page.
 *
 * Why this exists: the grade pages carried a one-line summary and three short
 * lists. That is thin content — near-duplicate across thirty pages, nothing for
 * a search engine to rank on, and nothing that answers what a seller actually
 * wants to know. Every entry below is written for one grade and says something
 * that is only true of that grade.
 *
 * `related` drives internal links. Search engines use them to understand how
 * the catalogue fits together, and sellers use them because a load is rarely
 * one grade — someone with No. 1 Copper usually has No. 2 and some insulated
 * wire in the same trailer.
 */

export interface MetalSeo {
  /** Body paragraphs. Rendered in order under the grade's specification. */
  body: string[]
  /** Slugs of grades commonly brought in alongside this one. */
  related: string[]
  /** Grade-specific question worth answering. Feeds the page's FAQ block. */
  faq?: { q: string; a: string }[]
}

export const metalSeo: Record<string, MetalSeo> = {
  // ── Copper ─────────────────────────────────────────────────────────────
  'bright-copper-wire': {
    body: [
      'Bright copper wire is the highest-paying copper grade in the yard, and the gap between it and No. 2 is wide enough to be worth the sorting time. To make the grade, wire must be bare, uncoated, unalloyed and thicker than 16 gauge — bright and shiny, with no tarnish, no tinning, no solder and no insulation left on the ends.',
      'The most common reason a load gets downgraded is oxidation. Copper that has sat outside and gone dull or green is still copper, but it is no longer bright, and it will be classified down. Keep it dry and undercover between the strip and the yard visit, and bring it in sooner rather than later.',
      'If you have stripped the wire yourself, check the ends: a few centimetres of remaining insulation or a soldered tag is enough to move a whole bag into a lower grade. It is quicker to trim it at home than to have it sorted out on the scales.',
    ],
    related: ['no-1-copper', 'no-2-copper', 'insulated-copper-wire-83', 'domestic-copper'],
    faq: [
      {
        q: 'What is the difference between bright copper and No. 1 copper?',
        a: 'Both are clean, unalloyed copper. Bright copper wire is uncoated wire thicker than 16 gauge with no tarnish. No. 1 copper covers clean tube, bus bar and heavier solids, and tolerates light oxidation. Bright copper pays more.',
      },
      {
        q: 'Does tarnished copper wire still count as bright?',
        a: 'No. Once the surface has dulled or gone green it is classified as No. 1 or No. 2 depending on condition. Store stripped wire dry and bring it in promptly to hold the higher grade.',
      },
    ],
  },
  'no-1-copper': {
    body: [
      'No. 1 copper is clean, unalloyed and uncoated copper at least 1.6mm thick — clean tube, bus bar, heavy gauge wire and solid copper offcuts. Light oxidation is acceptable at this grade, which is the main practical difference from bright copper wire.',
      'What takes copper out of No. 1 is anything attached to it: solder, brazing, paint, fittings, or the brass valves left on a length of tube. Plumbers bringing in stripped tube generally get the best result by cutting the fittings off and keeping them separate as brass, rather than presenting a mixed load.',
      'Burnt copper is not No. 1. Burning insulation off wire is illegal in NSW under EPA air pollution rules, and the resulting metal is graded down for the surface contamination regardless. Insulated wire is bought as its own grade, priced on recovery percentage.',
    ],
    related: ['bright-copper-wire', 'no-2-copper', 'gun-metal-mix-brass', 'insulated-copper-wire-75'],
    faq: [
      {
        q: 'Do I need to remove brass fittings from copper pipe?',
        a: 'Yes, if you want the copper priced as No. 1. Fittings left attached make it a mixed item. Cut them off and we will weigh the brass separately at the brass rate — you will do better on both.',
      },
    ],
  },
  'no-2-copper': {
    body: [
      'No. 2 copper is unalloyed copper that does not meet No. 1 because of coating, solder, paint or heavier oxidation. Thin-wall tube, soldered pipe, painted copper and light-gauge wire below 1.6mm all sit here. It is still a high-value grade — it simply carries a recovery discount for what has to be removed at the mill.',
      'Most domestic strip-outs produce No. 2 rather than No. 1, and that is normal. Hot water systems, old plumbing runs and roofing copper usually come in soldered or painted.',
      'Sorting No. 1 out of a No. 2 pile is usually worth the time on any load above a few dozen kilos. If you are not sure where a piece sits, bring it in unsorted and we will grade it in front of you rather than guessing over the phone.',
    ],
    related: ['no-1-copper', 'bright-copper-wire', 'domestic-copper', 'copper-brass-radiator'],
  },
  'domestic-copper': {
    body: [
      'Domestic copper covers the mixed copper that comes out of a house or a small commercial strip-out: hot water cylinders, offcuts of pipe, roof flashing, and the odds and ends that do not sort cleanly into No. 1 or No. 2.',
      'It is the most common copper grade we see from householders and it is the easiest to bring in, because it does not need to be sorted first. If there is enough clean material in the load to be worth separating, we will separate it on the scales and pay the higher rate on that portion.',
      'Hot water cylinders are worth checking before you scrap the whole unit: the copper inner tank is valuable, but the outer steel jacket and insulation are not, and a stripped cylinder is worth substantially more than a whole one.',
    ],
    related: ['no-2-copper', 'no-1-copper', 'car-wire', 'ac-units-d-gas'],
  },
  'insulated-copper-wire-20': {
    body: [
      'Insulated copper wire at around 20% recovery is thin, heavily jacketed cable — data cable, telephone cable, ribbon and low-voltage flex where the plastic outweighs the metal by a wide margin.',
      'The percentage is the recoverable copper by weight, and it is what the price is based on. At this end of the range the copper content is low, so the rate per kilo is correspondingly lower. That does not make it worthless: it is bought by weight and it adds up on volume, which is why cablers and data installers bring it in by the bin rather than the bag.',
      'Do not burn it. Burning cable to recover copper is an offence under NSW environment protection law, produces dioxins, and leaves metal that grades down anyway.',
    ],
    related: ['insulated-copper-wire-40', 'insulated-copper-wire-75', 'insulated-copper-wire-83', 'car-wire'],
  },
  'insulated-copper-wire-40': {
    body: [
      'Around 40% recovery covers the middle of the insulated cable range — standard building flex, extension leads, light power cable and most household wiring offcuts.',
      'This is the grade most electricians accumulate. A domestic rewire produces a surprising amount of it, and because the recovery percentage is estimated from the cable type and gauge, presenting it sorted by type rather than as one tangled mass gets you a better assessment.',
      'If you have long clean runs of heavier cable mixed in, keep them separate — heavier cable carries more copper per kilo and grades into the 75% or 83% bands.',
    ],
    related: ['insulated-copper-wire-20', 'insulated-copper-wire-75', 'insulated-copper-wire-83', 'no-2-copper'],
  },
  'insulated-copper-wire-75': {
    body: [
      'At roughly 75% recovery you are into heavy-gauge insulated cable: thick single-core, larger multi-core power cable, and the sort of feed cable pulled out of switchboards and industrial installations.',
      'The thicker the conductor relative to its jacket, the higher the recovery, and the closer the rate moves toward bare copper. Loads at this grade are worth weighing separately rather than throwing in with lighter cable.',
      'Armoured cable sits differently — the steel wire armour has to come off before the copper content can be assessed, so bring it in as-is and we will look at it rather than estimating blind.',
    ],
    related: ['insulated-copper-wire-83', 'insulated-copper-wire-40', 'no-1-copper', 'bright-copper-wire'],
  },
  'insulated-copper-wire-83': {
    body: [
      'The 83% band is the highest insulated grade we buy — very heavy single-core cable with a thin jacket, where almost all of the weight is copper.',
      'This is typically transformer tails, main feed cable and heavy industrial runs. Because the recovery is so high, the rate sits close to bare copper, and it is often not worth stripping it yourself: the labour rarely beats the difference, and hand-stripping heavy cable is how people damage their hands.',
      'Bring it whole, and we will assess it on the actual conductor size rather than a rule of thumb.',
    ],
    related: ['insulated-copper-wire-75', 'bright-copper-wire', 'no-1-copper'],
  },
  'car-wire': {
    body: [
      'Car wire is the automotive loom — the harness cut out of a vehicle, complete with its connectors, tape and sheathing. It is a lower-recovery insulated grade because of how much non-metallic material comes with it.',
      'Wreckers and mechanics bring it in by the bin. It is not worth stripping by hand: the conductors are thin and the connectors are moulded on, so the recovery is in the volume rather than the individual loom.',
      'Where a loom has heavier battery cable attached, cutting that off and keeping it separate is worthwhile — battery cable is thick enough to grade well above harness wire.',
    ],
    related: ['insulated-copper-wire-20', 'starter-alternator', 'batteries', 'electric-motors'],
  },

  // ── Brass ──────────────────────────────────────────────────────────────
  'gun-metal-mix-brass': {
    body: [
      'Gun metal and mixed brass covers the general run of brass that comes through a yard: taps, valves, fittings, sink wastes, ornaments, keys and the brass off plumbing work. Gun metal proper is a copper-tin-zinc alloy used in valve bodies and bearings, and it sits with mixed brass for pricing.',
      'Brass is priced below copper but well above steel, and it is one of the grades most often thrown out by mistake — a box of old taps and valves is worth stopping to keep.',
      'Attachments are what cost you here. Steel screws, chrome plating and plastic handles all count against the weight, so a quick strip of the obvious steel improves the assessment. Chrome-plated brass is still brass; it does not need the plating removed.',
    ],
    related: ['coast-brass', 'no-1-copper', 'copper-brass-radiator', 'soft-lead'],
    faq: [
      {
        q: 'Is chrome-plated brass still worth anything?',
        a: 'Yes. Chrome plating on a brass tap or fitting does not change the underlying alloy and does not need removing. It is bought as mixed brass.',
      },
    ],
  },
  'coast-brass': {
    body: [
      'Coast brass is clean, unplated yellow brass free of iron, solder and heavy attachments — sheet, turnings from machining, clean cut-offs and unlacquered fittings.',
      'It is a step above mixed brass because it needs less work at the smelter, and machine shops producing consistent brass swarf can do well on volume. Keep turnings free of steel swarf and cutting oil where you can.',
      'If your brass has steel inserts, springs or plated finishes, it is mixed brass rather than coast, and there is no benefit to guessing — we grade it on the scales.',
    ],
    related: ['gun-metal-mix-brass', 'no-1-copper', 'stainless-steel-304'],
  },

  // ── Aluminium ──────────────────────────────────────────────────────────
  'aluminium-rims': {
    body: [
      'Aluminium rims — alloy wheels — are one of the cleanest aluminium grades there is, and one of the easiest for a seller to prepare well.',
      'Two things make the difference to what you are paid. The tyre must be off: a wheel with rubber still on it is a different, much lower proposition, and tyre disposal is a cost we would have to carry. The wheel weights should come off too, since they are lead or steel and count against the aluminium weight.',
      'Chrome-plated and painted rims are still accepted. Rims with steel inserts, or steel wheels painted to look like alloys, sit as irony aluminium instead — a magnet settles it in a second.',
    ],
    related: ['cast-aluminium', 'irony-aluminium', 'extruded-aluminium', 'soft-lead'],
    faq: [
      {
        q: 'Do I have to remove the tyres from alloy wheels?',
        a: 'Yes. Rims must be presented without tyres to be bought as clean aluminium rims. Wheel weights should come off as well — they are lead or steel and count against the aluminium weight.',
      },
    ],
  },
  'extruded-aluminium': {
    body: [
      'Extruded aluminium is the 6000-series section used for window and door frames, shopfronts, awnings, framing and rail — clean, consistent, and one of the better-paying aluminium grades when it is presented free of other materials.',
      'Glass, rubber seals, plastic thermal breaks and steel screws are what pull the rate down. A window frame with the glass still in it is a mixed item; the same frame stripped is clean extrusion. Anodised and powder-coated sections are fine as-is and do not need stripping.',
      'Shopfitters and glaziers generating this regularly are usually better served by a bin on site than by carting it in loose — it is bulky relative to its weight.',
    ],
    related: ['aluminium-domestic', 'cast-aluminium', 'irony-aluminium', 'aluminium-rims'],
  },
  'aluminium-domestic': {
    body: [
      'Domestic aluminium is the mixed light-gauge aluminium that comes out of a household: cans, foil trays, pots and pans, garden furniture frames, ladders, roller door slats and light sheet.',
      'It is the easiest grade to accumulate and the easiest to bring in, because it needs no sorting. It is also very light for its bulk, so it pays to build up a reasonable quantity before making the trip.',
      'Aluminium cans are bought by weight here rather than by container deposit. If you are in NSW, eligible drink containers are worth more through Return and Earn than as scrap — bring us the pots, frames and sheet, and take the eligible cans to a depot.',
    ],
    related: ['extruded-aluminium', 'cast-aluminium', 'irony-aluminium'],
    faq: [
      {
        q: 'Should I bring aluminium cans here or to Return and Earn?',
        a: 'Eligible drink containers are generally worth more through the NSW Return and Earn scheme than as scrap aluminium. Bring us the pots, pans, frames, sheet and non-eligible aluminium.',
      },
    ],
  },
  'cast-aluminium': {
    body: [
      'Cast aluminium is the heavier, thicker aluminium produced by casting rather than rolling or extruding — gearbox and engine housings, pump bodies, cylinder heads, brackets and machine castings.',
      'It usually arrives with steel in it. Bolts, studs, bearings and steel inserts are normal in castings, and a light strip of the obvious steel moves a load from irony aluminium into clean cast, which is a real difference in rate.',
      'Oil and grease should be drained where practical. A gearbox case full of oil is a handling and environmental problem rather than a grading one, but it is the difference between a load we can take straight away and one we have to deal with first.',
    ],
    related: ['irony-aluminium', 'aluminium-rims', 'extruded-aluminium', 'electric-motors'],
  },
  'irony-aluminium': {
    body: [
      'Irony aluminium is aluminium with enough steel attached that it cannot be graded clean — castings with bearings still in, frames with steel brackets, or mixed loads where separating is not practical.',
      'It is bought at a discount that reflects the steel content, assessed on the load rather than a fixed formula. Nothing is wasted: it is worth bringing in rather than sending to landfill.',
      'If you have time before you come, a magnet and a few minutes with a spanner is usually the best-paid work in the process — pulling steel out of a bin of irony aluminium can lift the whole load a grade.',
    ],
    related: ['cast-aluminium', 'extruded-aluminium', 'aluminium-domestic', 'light-gage-steel'],
  },

  // ── AC Units ───────────────────────────────────────────────────────────
  'ac-units-d-gas': {
    body: [
      'We buy degassed air conditioning units only. Every unit must have its refrigerant removed by a technician holding the appropriate ARC licence before it comes to the yard — window units, split systems and ducted units alike.',
      'This is not a preference. Releasing refrigerant to atmosphere is an offence under the Ozone Protection and Synthetic Greenhouse Gas Management Act, and a unit still holding gas cannot legally be processed as scrap. Units arriving with gas in them cannot be accepted on site, and we cannot degas them for you.',
      'A degassed unit is worth bringing in because of what is inside it: the copper in the coil and lineset, the aluminium in the fins, and the steel casing. Where you have the degassing certificate, bring it — it makes the intake straightforward.',
    ],
    related: ['compressor', 'electric-motors', 'no-2-copper', 'aluminium-radiator'],
    faq: [
      {
        q: 'Can you degas my air conditioner for me?',
        a: 'No. Refrigerant must be recovered by a technician holding the appropriate ARC licence before the unit reaches the yard. Units still holding gas cannot be accepted on site.',
      },
      {
        q: 'Do I need the degassing certificate?',
        a: 'Bring it if you have it. It makes intake faster and removes any question about the unit being safe to process.',
      },
    ],
  },

  // ── Radiators ──────────────────────────────────────────────────────────
  'copper-brass-radiator': {
    body: [
      'Copper-brass radiators are the older style — a copper core with brass tanks — found in pre-1990s vehicles, trucks, industrial plant and generator sets. They are the highest-paying radiator grade because both metals in them are valuable.',
      'Steel side frames and mounting brackets should come off where they are easy to remove. Plastic tanks mean it is not this grade — that is an aluminium-plastic radiator, which is a different item again.',
      'Drain the coolant before you bring it. It is not a grading issue, but it is a spill risk in the back of a ute and on the yard floor.',
    ],
    related: ['al-cu-radiator', 'aluminium-radiator', 'gun-metal-mix-brass', 'no-2-copper'],
  },
  'al-cu-radiator': {
    body: [
      'AL/CU radiators combine an aluminium fin pack with copper tubing, and are common in air conditioning condensers and some automotive applications.',
      'They sit between the all-copper and all-aluminium radiator grades on price, because the copper has to be separated from the aluminium during processing. There is no benefit in trying to separate it yourself — the fins are bonded to the tube and pulling them apart by hand does more damage than good.',
      'Bring them whole, with steel brackets removed where practical.',
    ],
    related: ['copper-brass-radiator', 'aluminium-radiator', 'ac-units-d-gas'],
  },
  'aluminium-radiator': {
    body: [
      'All-aluminium radiators are standard in most modern vehicles, and typically arrive with plastic end tanks moulded on.',
      'The plastic does not need to come off — it is removed during processing and accounted for in the grade. What does help is removing steel brackets and any attached fan shrouds, since those are graded separately.',
      'As with any radiator, drain it before transport.',
    ],
    related: ['al-cu-radiator', 'copper-brass-radiator', 'cast-aluminium', 'irony-aluminium'],
  },

  // ── Motors ─────────────────────────────────────────────────────────────
  'electric-motors': {
    body: [
      'Electric motors are bought whole, on the copper winding inside them. Pumps, fans, power tools, industrial drives, washing machine motors and workshop equipment all qualify.',
      'The value is in the ratio of copper to steel, so a heavy motor with substantial windings is worth more per kilo than a small one with a large steel housing. There is no need to cut them open — we buy them as they are and recover the copper properly.',
      'Attached gearboxes and pump heads should come off if they are easy to remove, since they are largely steel or cast iron. Oil-filled units need draining before they come in.',
    ],
    related: ['lgem', 'compressor', 'starter-alternator', 'no-2-copper'],
    faq: [
      {
        q: 'Should I strip the copper out of an electric motor first?',
        a: 'Generally not worth it. Cutting a motor open by hand is slow and damages the winding. We buy them whole and recover the copper mechanically.',
      },
    ],
  },
  lgem: {
    body: [
      'LGEM — large generator and electric motors — covers the heavy end of the motor grade: industrial drive motors, generator sets, large pump motors and anything too big to lift by hand.',
      'These are worth handling as their own grade because the copper content is high and consistent, and because they need machinery to move. If you have units on site rather than in a trailer, talk to us before you try to shift them — a pickup with the right equipment is usually easier than getting them onto a truck yourself.',
      'Aluminium-wound motors exist and are graded differently from copper-wound. If you are not sure which you have, we will identify it at intake.',
    ],
    related: ['electric-motors', 'compressor', 'no-1-copper'],
  },
  compressor: {
    body: [
      'Compressors from fridges, freezers and air conditioning units are bought as a sealed grade, priced on the copper winding and steel shell.',
      'Every compressor must be degassed by a licensed technician before it comes in, for the same reason whole AC units must be: releasing refrigerant is an offence, and a gas-charged unit cannot be processed. Oil should be drained as well.',
      'Air compressors from workshops are a different item — those are usually motor plus steel tank, and are graded as electric motors and steel separately.',
    ],
    related: ['ac-units-d-gas', 'electric-motors', 'lgem'],
    faq: [
      {
        q: 'Do fridge compressors need degassing?',
        a: 'Yes. Refrigerant must be recovered by a licensed technician and the oil drained before the compressor reaches the yard.',
      },
    ],
  },
  'starter-alternator': {
    body: [
      'Starters and alternators are bought as their own automotive grade, on the copper winding inside them. They come out of every vehicle and are one of the more valuable single components a wrecker or mechanic accumulates.',
      'They do not need to be dismantled. The copper is recovered mechanically, and pulling them apart by hand rarely improves the return.',
      'Attached mounting brackets and pulleys can stay on. If you are stripping a vehicle, the loom, battery and radiator are all separate grades worth keeping apart.',
    ],
    related: ['electric-motors', 'car-wire', 'batteries', 'aluminium-radiator'],
  },

  // ── Lead, Battery, Steel ───────────────────────────────────────────────
  'soft-lead': {
    body: [
      'Soft lead is clean lead solids — sheet, pipe, roof flashing, ballast, wheel weights and diving weights. It is dense, so quantities that look small on the floor weigh well on the scales.',
      'Lead is toxic and should be handled accordingly: wash your hands after handling it, and keep it away from children and food. We take it because recycling is far better than the alternative, but it is worth treating with care in transit.',
      'Painted lead sheet is still soft lead. Lead-acid batteries are a separate grade and are not bought as soft lead.',
    ],
    related: ['batteries', 'gun-metal-mix-brass', 'aluminium-rims'],
  },
  batteries: {
    body: [
      'Lead-acid batteries from cars, trucks, forklifts, boats and solar installations are bought by weight. They are one of the most recycled products in the world, and close to all of the lead in them is recoverable.',
      'Keep them upright in transport. A cracked or leaking battery is a sulphuric acid spill, which is a genuine hazard in the back of a vehicle and on the yard floor. Leaking units may not be able to be accepted.',
      'Lithium-ion batteries are not accepted. They are a fire risk in a scrap stream and need a dedicated recycler — most councils and battery retailers run collection points for them.',
    ],
    related: ['soft-lead', 'starter-alternator', 'car-wire'],
    faq: [
      {
        q: 'Do you take lithium-ion batteries?',
        a: 'No. Lithium-ion batteries are a fire risk in a scrap stream and need a dedicated recycler. Councils and most battery retailers run collection points. We buy lead-acid batteries only.',
      },
    ],
  },
  'stainless-steel-304': {
    body: [
      'Grade 304 is the workhorse austenitic stainless — commercial kitchen benches, sinks, splashbacks, tanks, food equipment, handrail and general fabrication offcuts. It is the most common stainless we see and the one most people mean when they say "stainless".',
      'It is non-magnetic when annealed, which is the usual quick test, though heavy working can make it slightly magnetic at edges and welds. That does not change the grade.',
      'What matters at intake is what is attached: steel fixings, plastic laminate on a bench underside, and rubber feet all count against the weight. Clean stainless grades and pays better than mixed.',
    ],
    related: ['stainless-steel-316', 'light-gage-steel', 'hms-insize', 'coast-brass'],
    faq: [
      {
        q: 'How can I tell 304 from 316 stainless?',
        a: 'You usually cannot by eye — both are non-magnetic and look identical. 316 contains molybdenum for marine and chemical resistance and is used where corrosion matters. If the item came off a boat, a pool, or chemical plant it is more likely 316. We test at intake rather than guessing.',
      },
    ],
  },
  'stainless-steel-316': {
    body: [
      'Grade 316 adds molybdenum to the 304 recipe, which buys it resistance to chloride corrosion. It is the marine and chemical grade — boat fittings, pool handrail, coastal balustrade, food and pharmaceutical plant, and anything specified for a salt environment.',
      'It pays more than 304 because of the molybdenum content, so it is worth keeping separate if you know what you have. If you do not, bring it unsorted: the two are visually identical and we test rather than guess.',
      'As with 304, remove steel fixings and non-metallic attachments where practical.',
    ],
    related: ['stainless-steel-304', 'coast-brass', 'light-gage-steel'],
  },
  'hms-insize': {
    body: [
      'HMS — heavy melting steel — in size is the standard ferrous grade for thick steel cut to dimensions a mill can charge directly. Structural section, plate, heavy pipe, beam and machinery frames all qualify.',
      '"In size" is the operative part: pieces need to be within the dimensional limits the furnace accepts, which for most mills means under about 1.5 metres in the long direction and a minimum thickness of around 6mm. Oversize material has to be cut, which is a cost.',
      'Ferrous pays less per kilo than any non-ferrous grade, but it comes in volume, and a demolition or plant clear-out generates enough tonnage for it to matter. For quantities like that, a bin on site is almost always better than carting it.',
    ],
    related: ['light-gage-steel', 'irony-aluminium', 'stainless-steel-304'],
  },
  'light-gage-steel': {
    body: [
      'Light gauge steel covers thin ferrous material below the thickness threshold for HMS — sheet, roofing iron, ducting, shelving, light framing, whitegoods casings and general tin.',
      'It is the lowest-value grade in the yard by weight, and it is bulky, so the economics work on volume rather than on a boot load. Where it comes from a strip-out or a demolition, a bin is the sensible way to move it.',
      'Whitegoods can come in, but fridges and freezers must be degassed first, the same as air conditioners.',
    ],
    related: ['hms-insize', 'irony-aluminium', 'ac-units-d-gas', 'aluminium-domestic'],
  },
}
