/**
 * Google reviews for the Ingleburn yard.
 *
 * Source: the Google Business Profile export for
 * accounts/…/locations/10800603847992778745 — reviews RECEIVED at this
 * location. Every quote below is verbatim; the only edits were repairing
 * characters mangled by the export's encoding (em dashes, apostrophes, emoji).
 * Nothing is reworded and nothing is invented.
 *
 * WHAT IS SHOWN vs WHAT IS COUNTED
 * --------------------------------
 * `reviews` holds the 16 five-star reviews that have text — a five-star with no
 * comment has nothing to quote. Choosing which testimonials to feature on your
 * own site is ordinary marketing.
 *
 * `profile` holds the REAL totals for the whole listing, including the 4-star
 * and both 1-star reviews. The section displays these, not an average of the
 * curated set. Publishing "5.0" while the listing says 4.5 would be misleading
 * — and it is one click away from being disproved, which is the opposite of
 * what a trust section is for. 4.5 from 20 with 17 five-stars is strong, and
 * it reads as real precisely because it is not perfect.
 */

export interface Review {
  /** Reviewer's name exactly as it appears on Google. */
  author: string
  rating: 1 | 2 | 3 | 4 | 5
  /** The review text, verbatim. */
  quote: string
  /** ISO date (YYYY-MM-DD) the review was left. */
  date: string
  /** The yard's public reply, where one was given. */
  reply?: string
  /** Optional: what they sold, if the review makes it clear. */
  material?: string
}

/** Verbatim five-star reviews with text, newest first. */
export const reviews: Review[] = [
  {
    author: 'Mubeen Abdul',
    rating: 5,
    quote:
      'Great service and friendly staff — would recommend to anyone.',
    date: '2026-08-25',
  },
  {
    author: 'Alextolmz',
    rating: 5,
    quote:
      'Always kind and respectful and a good price. Been coming here for many years and will for many more.',
    date: '2026-03-05',
    reply:
      'Thank you, Alex, for your kind review, we always strive to provide our customers with the best experience possible while also providing them with the best prices for their scrap.\n\nHope to see you again soon!!',
  },
  {
    author: 'shaun stack',
    rating: 5,
    quote:
      'Quick, easy and great prices! Il be back again.',
    date: '2026-02-18',
  },
  {
    author: 'sanjay kumar',
    rating: 5,
    quote:
      'Reliable price and product',
    date: '2026-02-13',
  },
  {
    author: 'jazz singh',
    rating: 5,
    quote:
      'We wanted to express my sincere gratitude for the excellent recycling service provided by your team. The process was seamless and effortless, making it a positive experience. I was impressed with the professionalism and care taken in handling the recycling process.\n\nPlease know that I will not hesitate to use your services again in the future and will recommend your company to others.\nThank you once again for your outstanding service.',
    date: '2026-01-12',
  },
  {
    author: 'Kulwinder Kaur1970',
    rating: 5,
    quote:
      'Thank you for your help with recycling. The service was great and so effortless; I\'ll definitely be using Shine Motor Corporation Pty Ltd again in the future.\nThanks again.',
    date: '2026-01-08',
    reply:
      'Thank You! Kulwinder, for leaving an amazing review. We appreciate the recommendation. Hope to see you again soon!!!',
  },
  {
    author: 'S R',
    rating: 5,
    quote:
      'Great quality for great prices',
    date: '2026-01-07',
  },
  {
    author: 'Farhad Ahmadi',
    rating: 5,
    quote:
      'I went to Shine Metals to sell some scrap and had a great experience. The staff were friendly and helpful from the moment I arrived, explained everything clearly, and offered the best price and showed it to me. The process was quick and payment was made straight away. I’ll definitely be coming back and would recommend them to anyone selling scrap metal. 10/10 for the whole process.',
    date: '2026-01-06',
    reply:
      'Thank you, Farhad, for your kind and detailed review. The Shine Team greatly appreciates your feedback and hopes to see you soon again!!!',
  },
  {
    author: 'Christopher Hudson',
    rating: 5,
    quote:
      'I’ve been getting rid of scrap brass and copper for a like time now and these guys are the go to! Travel 30 minutes to get there and best prices along with service',
    date: '2025-12-04',
    reply:
      'Thank you, Christopher, it was great seeing you today. Our Team greatly appreciates your 5-star review.',
  },
  {
    author: 'Tyrone Toohey',
    rating: 5,
    quote:
      'Great team, very kind and easy to deal with.\nGreat prices',
    date: '2025-02-07',
    reply:
      'Thank You! Tyrone, for leaving an amazing review. We appreciate the recommendation.',
  },
  {
    author: 'Cohan Bleasdale',
    rating: 5,
    quote:
      'Always friendly. Quick service. Definitely recommend',
    date: '2025-02-04',
    reply:
      'Thank You Cohan, for leaving an amazing review. We appreciate the recommendation.',
  },
  {
    author: 'Cameron King',
    rating: 5,
    quote:
      'Awesome to deal with fast and easy 👍🏻',
    date: '2025-02-04',
    reply:
      'Thank you! We truly appreciate your honest review and are glad to hear the process was fast and easy for you.',
  },
  {
    author: 'Dean Edwards',
    rating: 5,
    quote:
      'Very professional 👍🏾',
    date: '2025-02-04',
    reply:
      'Thank you, appreciate your honest review.',
  },
  {
    author: 'Joseph Hilder',
    rating: 5,
    quote:
      'I regularly drop copper and air-conditioning waste here they always give a good price and have recently cleaned up the yard good work shine metal team thanks and I\'ll see you again',
    date: '2024-02-09',
    reply:
      'Thank you, appreciate your honest review.',
  },
  {
    author: 'Landon Halliday',
    rating: 5,
    quote:
      'Good prices',
    date: '2023-10-20',
    reply:
      'Thank You! , for leaving an amazing review. We appreciate the recommendation.',
  },
  {
    author: 'Dan Wallbee',
    rating: 5,
    quote:
      'Good service\nGood prices\nBut check or internet banking only',
    date: '2019-02-02',
  },
]

/**
 * The listing's real aggregate — all 20 reviews, not just the featured ones.
 * Update whenever a fresh export is taken.
 */
export const profile = {
  total: 20,
  average: 4.5,
  /** Full distribution, 5 → 1. */
  distribution: { 5: 17, 4: 1, 3: 0, 2: 0, 1: 2 },
} as const

/**
 * Live links to the Google Business Profile, resolved from the map short-link
 * in site.ts (goo.gl/maps/Qpb7ETEebjUqDeoB7).
 *
 * NOTE: the profile is listed as "Shine Metals Pty Ltd", not "Shine Motor
 * Corporation Pty Ltd". Worth reconciling so the brand matches across search.
 */
export const googleReviews = {
  /** Opens the Business Profile with the reviews panel. Verified 200. */
  listing: 'https://maps.google.com/?cid=14840856609488331522',
  /**
   * Google's "write a review" composer. Verified 200. The endpoint requires a
   * ChIJ place ID and rejects the CID form with a 400.
   */
  write:
    'https://search.google.com/local/writereview?placeid=ChIJ14X_i2HrEmsRAmMPw3RQ9c0',
  placeId: 'ChIJ14X_i2HrEmsRAmMPw3RQ9c0',
} as const

/** The aggregate shown in the UI. Always the listing's real numbers. */
export function reviewSummary() {
  if (reviews.length === 0) return null
  return {
    count: profile.total,
    average: profile.average,
    featured: reviews.length,
    distribution: profile.distribution,
  }
}
