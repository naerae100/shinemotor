/**
 * Where the trucks actually go.
 *
 * WHY THIS PAGE EXISTS, AND WHAT IT IS NOT
 * ----------------------------------------
 * "Do you come out to Penrith?" is a real question people type, and it deserves
 * a real answer. This page gives one.
 *
 * It is deliberately NOT a set of generated suburb pages, and the suburb lists
 * are NOT hidden from view. Both of those are named violations in Google's spam
 * policies — doorway abuse and cloaking — and the penalty is a manual action
 * against the whole domain, not a ranking dip. A visible, accurate list of the
 * areas a business genuinely services is ordinary content and carries no such
 * risk.
 *
 * Which means the honesty here is load-bearing. Each region says what is
 * actually true about servicing it, and the further ones say plainly that a
 * collection depends on the load being worth the drive. If that stops being
 * true, change it here — do not let the page claim a run the yard would not
 * actually make.
 *
 * The real lever for suburb-level search is the Google Business Profile, not
 * this page. See the README.
 */

export interface ServiceArea {
  /** Anchor id, so the region can be linked to directly. */
  id: string
  name: string
  /** Rough drive time or distance from the Ingleburn yard. */
  distance: string
  /** What is actually true about collecting from here. */
  body: string
  suburbs: string[]
}

export const serviceAreas: ServiceArea[] = [
  {
    id: 'south-west-sydney',
    name: 'South West Sydney',
    distance: 'On our doorstep',
    body: 'The yard is in Ingleburn, so this is home ground. Drive in without an appointment during opening hours, or we will collect — these runs go out most days and there is no minimum worth worrying about.',
    suburbs: [
      'Ingleburn', 'Minto', 'Macquarie Fields', 'Glenfield', 'Casula', 'Liverpool',
      'Prestons', 'Moorebank', 'Campbelltown', 'Leumeah', 'Narellan', 'Camden',
      'Oran Park', 'Gregory Hills', 'Smeaton Grange', 'Edmondson Park', 'Austral',
      'Bringelly', 'Bankstown', 'Milperra', 'Revesby', 'Padstow', 'Chipping Norton',
      'Warwick Farm', 'Villawood', 'Ingleburn Industrial',
    ],
  },
  {
    id: 'western-sydney',
    name: 'Western Sydney',
    distance: '30–50 minutes',
    body: 'Our regular run through the western industrial estates. Fabrication shops, demolition sites and factories out here are on scheduled collections — if you produce scrap every week, we will work out a rhythm and drop a bin.',
    suburbs: [
      'Parramatta', 'Blacktown', 'Penrith', 'St Marys', 'Mount Druitt', 'Seven Hills',
      'Wetherill Park', 'Smithfield', 'Prospect', 'Huntingwood', 'Eastern Creek',
      'Erskine Park', 'Kings Park', 'Marayong', 'Riverstone', 'Rooty Hill',
      'Auburn', 'Silverwater', 'Rydalmere', 'Girraween', 'Arndell Park', 'Emu Plains',
    ],
  },
  {
    id: 'sydney-metro',
    name: 'Sydney metro',
    distance: '45–70 minutes',
    body: 'City, inner west, north shore, eastern suburbs and the Shire. Mostly strip-outs, electrical and plumbing work and site clean-ups. Send a photo before you book — access and load size decide whether a truck or a bin makes more sense.',
    suburbs: [
      'Sydney CBD', 'Alexandria', 'Mascot', 'Botany', 'Rosebery', 'Waterloo', 'Zetland',
      'Marrickville', 'Leichhardt', 'Annandale', 'Balmain', 'Rozelle', 'North Sydney',
      'Artarmon', 'St Leonards', 'Chatswood', 'Brookvale', 'Manly', 'Bondi', 'Randwick',
      'Maroubra', 'Hurstville', 'Kogarah', 'Rockdale', 'Sutherland', 'Caringbah',
      'Taren Point', 'Kirrawee', 'Miranda', 'Peakhurst',
    ],
  },
  {
    id: 'blue-mountains',
    name: 'Blue Mountains',
    distance: '1–1.5 hours',
    body: 'We come up the mountains for collections that justify the climb — a full trailer, a strip-out, or a few jobs bundled together. Worth a call before you start stockpiling so we can tell you what makes the trip worthwhile.',
    suburbs: [
      'Springwood', 'Blaxland', 'Glenbrook', 'Winmalee', 'Faulconbridge', 'Hazelbrook',
      'Lawson', 'Wentworth Falls', 'Leura', 'Katoomba', 'Warrimoo', 'Valley Heights',
    ],
  },
  {
    id: 'illawarra',
    name: 'Illawarra & South Coast',
    distance: '1–2 hours',
    body: 'Wollongong and down the coast. Heavy steel from industrial sites, marine and construction work. Regular enough that a bin on site is usually the right answer for anything ongoing.',
    suburbs: [
      'Wollongong', 'Port Kembla', 'Unanderra', 'Dapto', 'Warilla', 'Shellharbour',
      'Albion Park', 'Kiama', 'Nowra', 'Bomaderry', 'Berkeley', 'Corrimal',
    ],
  },
  {
    id: 'central-coast',
    name: 'Central Coast',
    distance: '1.5 hours',
    body: 'Gosford, Wyong and the industrial estates between them. Collections run on demand rather than on a fixed schedule, so give us a bit of notice and tell us roughly what you have.',
    suburbs: [
      'Gosford', 'West Gosford', 'Somersby', 'Erina', 'Wyong', 'Tuggerah',
      'Berkeley Vale', 'Woy Woy', 'Terrigal', 'Long Jetty', 'Charmhaven',
    ],
  },
  {
    id: 'newcastle-hunter',
    name: 'Newcastle & Hunter',
    distance: '2–2.5 hours',
    body: 'Newcastle, Maitland and the Hunter. This far out a collection needs to be a decent tonnage to be worth sending a truck for — usually demolition, industrial plant or an ongoing production stream. Tell us what you have and we will be straight with you.',
    suburbs: [
      'Newcastle', 'Mayfield', 'Cardiff', 'Beresfield', 'Thornton', 'Tomago',
      'Rutherford', 'Maitland', 'Cessnock', 'Singleton', 'Muswellbrook', 'Kurri Kurri',
    ],
  },
  {
    id: 'act-southern-tablelands',
    name: 'ACT & Southern Tablelands',
    distance: '2.5–3 hours',
    body: 'Canberra, Queanbeyan and the towns along the Hume. Larger loads and container quantities only at this distance — spot loads and ongoing contracts both work, but it needs to be worth the run.',
    suburbs: [
      'Canberra', 'Fyshwick', 'Mitchell', 'Hume', 'Queanbeyan', 'Goulburn',
      'Yass', 'Mittagong', 'Bowral', 'Moss Vale', 'Marulan',
    ],
  },
  {
    id: 'regional-nsw',
    name: 'Regional NSW',
    distance: 'By arrangement',
    body: 'We buy from across the state, but a truck does not leave Ingleburn for a regional pickup unless the tonnage justifies it. Farm clean-ups, plant dismantling and mine or industrial site clearances are the usual reasons. Call with the details and we will tell you honestly whether it stacks up.',
    suburbs: [
      'Bathurst', 'Orange', 'Dubbo', 'Wagga Wagga', 'Albury', 'Tamworth',
      'Armidale', 'Coffs Harbour', 'Port Macquarie', 'Griffith', 'Broken Hill', 'Lithgow',
    ],
  },
]

export const totalSuburbs = serviceAreas.reduce((n, a) => n + a.suburbs.length, 0)
