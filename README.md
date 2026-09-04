# Shine Motor Corporation

The website for a licensed scrap metal yard at 8 Noonan Rd, Ingleburn NSW —
[shinemotor.com.au](https://shinemotor.com.au). React + Vite, deployed on
Vercel, with a handful of edge functions behind it.

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # typecheck, generate vCards + sitemap, bundle, prerender
npm run preview      # serve the production build locally
npm run lint
npm run check:api    # exercise the edge functions without deploying
npm run images       # re-compress public/img (one-off, see below)
```

## How it is put together

Copy, photography and grade data are **not** in the components. Everything the
yard would ever want changed lives in [`src/content/`](src/content/), so a price,
a phone number or a new grade is a one-line edit in a data file rather than a
hunt through JSX:

| File | What it holds |
| --- | --- |
| `site.ts` | Address, phones, hours, socials. Every other file reads from here. |
| `metals.ts` | The 30 graded categories: what is accepted, what is not, how to prep it. |
| `services.ts` | The two business lines — sell-your-scrap, and container-load export. |
| `sections.ts` | Homepage sections: audiences, steps, reasons, FAQ. |
| `prices.json` | The price guide. Written by the admin screen, read at build time. |
| `reviews.ts` | Verbatim Google reviews plus the listing's real aggregate. |
| `team.ts` | People with a digital contact card at `/card/<slug>`. |
| `areas.ts` | The nine regions the trucks cover, with the suburbs in each. |
| `guides.ts` | Long-form articles carried over from the old site's blog. |

`src/lib/` holds the cross-cutting pieces: `seo.ts` (per-route head tags),
`schema.ts` (JSON-LD), `whatsapp.ts` (pre-written enquiry links), `vcard.ts`.

## Build steps that generate files

`prebuild` and `postbuild` run three generators, so none of their output should
be hand-edited:

- `scripts/build-vcards.mjs` → `public/card/*.vcf` from `team.ts`
- `scripts/build-seo.mjs` → `public/sitemap.xml` (with image entries for every
  grade) and `public/robots.txt`, with slugs read straight out of the content
  files so a new grade cannot silently go unindexed
- `scripts/prerender.mjs` → a real HTML file per route, see below

`scripts/fetch-reviews.mjs` pulls Google reviews (needs `GOOGLE_MAPS_API_KEY`)
and will not overwrite hand-edited reviews without `--force`.

`scripts/optimise-images.mjs` is a **one-off tool, not part of the build**. It
caps every photograph at 1600px, re-encodes to WebP, and moves the originals to
`.image-originals/` (gitignored) rather than deleting them — `--restore` puts
them back. Run it after adding new photography, then update the `.webp`
references in the content files.

## Prerendering

The site is a React SPA, but it does not ship as one. After Vite builds,
`scripts/prerender.mjs` renders every public route with `react-dom/server` and
writes `dist/<route>/index.html` — 38 routes plus `404.html`. Each file carries
that route's own title, description, canonical, social card, JSON-LD and body
copy in the raw response. The browser then hydrates the markup it was served
rather than replacing it.

This matters because only Google reliably executes JavaScript. Bing, LinkedIn,
Slack, WhatsApp and the AI crawlers read the raw HTML, and before this they all
saw the same near-empty shell with the homepage's title on every URL.

Things to know when changing routes:

- The route list comes from the same content files as the sitemap, so adding a
  grade to `metals.ts` prerenders and indexes it with no other step.
- `index.html` has `<!--seo-start-->` / `<!--seo-end-->` markers. Everything
  between them is replaced per route. The values checked in are the homepage's,
  and are what `npm run dev` serves.
- `src/App.tsx` holds the route table and is shared by `main.tsx` (BrowserRouter)
  and `entry-server.tsx` (StaticRouter), so the two cannot drift.
- `buildHead()` in `src/lib/seo.ts` is the only place a head is computed, for
  both the browser and the prerenderer.
- A page that calls `useSeo` with `preloadImage` gets a `<link rel="preload">`
  for its hero photograph — use it only for something genuinely above the fold.
- Because every real route is a file on disk, `vercel.json` no longer has a
  catch-all rewrite. Unknown URLs get `404.html` with a real 404 status instead
  of a soft 200. Only `/admin` and `/card/:slug` still rewrite to the SPA shell.
- The legacy `.php` URLs are **301 redirects in `vercel.json`**, not client-side
  `<Navigate>` — a real redirect is what passes link equity on. The routes in
  `App.tsx` remain as a fallback for any host that does not do it.

## Migrating from the old PHP site

The old shinemotor.com.au ran on PHP and has been indexed for years. This
replaces it **on the same domain**, which is the single biggest thing working in
its favour — domain authority, the Google Business Profile link and every
external backlink all point at a hostname that is not changing. What does change
is the URL shape (`sell-your-scrap.php` → `/services/sell-your-scrap`), and that
is what the redirect map in `vercel.json` exists to absorb.

### The URL map

Built from an actual crawl of the live old site (34 URLs reached from its
homepage) plus its `sitemap.xml`. `npm run check:redirects` verifies every
destination is a page this build produces, in one hop, with no chains.

| Old URL | New URL | Note |
| --- | --- | --- |
| `/index.php`, `/index.html` | `/` | |
| `/about.php` | `/about` | |
| `/contact.php` | `/contact` | |
| `/sell-your-scrap.php` | `/services/sell-your-scrap` | |
| `/buy-from-us.php` | `/services/buy-from-us` | see keyword gap below |
| `/branches.php` | `/about` | full branch list moved there |
| `/gallery.php` | `/about` | yard photography moved there |
| `/blog.php` | `/guides` | |
| `/best-scrap-metal-recycling.php` | `/guides/scrap-metal-recycling-sydney` | article rebuilt |
| `/blog-single.php` | `/guides/scrap-metal-recycling-sydney` | **same article** as above on the old site — two URLs, one page. Consolidated. |
| `/faq.html` | `/` | old page is unmodified template filler about solar panels |
| `/cash-for-cars-trucks.php` | `/services/sell-your-scrap` | **service discontinued** — ranking expected to lapse |

**Two earlier generations of the site are also covered.** The Wayback Machine's
index shows the domain has been through three URL schemes: a 2015–2019 `.html`
site, a 2022 underscore site (`/copper_scrap`, `/sell_your_scrap_metal`), and
the PHP site being replaced now. The 2022 rebuild appears not to have redirected
the ones before it, so those URLs have been 404ing for years. They are all in
the map now — `/copper_scrap`, `/brass_scrap`, `/aluminium_scrap`,
`/stainless_steel` and `/wiring` land on their family section of `/metals`, and
`/benefits_of_recycling.html` and `/how_it_works.html` land on the guide.
Run `npm run check:redirects` for the full current list.

Two categories are deliberately **absent**:

- The template's `team.html`, `blog.html`, `service-single.html` and the
  `index-*.html` variants, plus the hyphenated 2022 twins (`/copper-scrap`,
  `/about-us`, `/thank-you`). The archive records all of these as 404 even when
  they were being linked, so they never existed and nothing can point at them.
- The old `/assets/images/…` URLs. Only 13 of the 111 archived image URLs still
  exist under the same name in `/img`, so a wildcard would send nine out of ten
  requests to a redirect that ends in a 404 — no better than the 404 they
  already get, and it would make the map dishonest.

### Before you switch the site over

**There is no Google Search Console property under the yard's control, and that
is the one gap worth closing today.** The old site *does* carry a verification
meta tag — `google-site-verification: QVk5UY_kEhzxptx1kJrw4hFlrKup7yWeShxjghzuX74`
— so somebody (most likely whoever built the PHP site) has a verified property
already. Two ways forward, and you can do both:

1. **Ask that developer to add you as an owner** in Search Console. Fastest if
   they answer.
2. **Verify it yourself.** A property can have many owners, so you do not need
   their permission. Add a **Domain property** for `shinemotor.com.au` with a
   DNS TXT record — that covers www, non-www, http and https in one go, and it
   keeps working after the site moves to Vercel, which a file- or tag-based
   verification would not.

Do this **before** the switch if you can. On verifying you get up to **16 months
of historical Performance data immediately** — Google has been collecting it all
along, verification just unlocks the view. That backdated export is the single
best thing you can have going into a migration: it ranks your old URLs by actual
clicks, so you know which redirects genuinely matter rather than guessing.

You also already have analytics the old site has been quietly collecting:

- **GA4 — `G-GGDPHLJDMW`** is installed on every page. Reports → Engagement →
  Pages and screens, set the range to the last 12 months, gives you every URL
  that has actually received a visitor. That is a real substitute for the
  Search Console Pages report.
- **Google Ads — `AW-16647656227`** is also firing, so someone is running paid
  campaigns. Whoever manages that account can almost certainly reach both the
  GA4 property and Search Console. Check the landing pages in those campaigns
  are in the redirect table — a paid ad pointing at a dead URL burns money
  immediately, unlike organic.

Because Search Console was not available, the URL inventory above was assembled
from three independent sources instead, which between them are a good
approximation:

- a live crawl of the old site (34 URLs reachable from its homepage),
- its `sitemap.xml`,
- the **Wayback Machine CDX index**, which is what turned up the two earlier
  generations of the site. Re-run it any time with:
  `curl "http://web.archive.org/cdx/search/cdx?url=shinemotor.com.au*&fl=original,timestamp,statuscode&collapse=urlkey"`

### Google Ads landing pages — check these before launch

Search Console measures organic only. This site's Search Console record is
3 clicks across 3.5 months, so in practice almost all of its traffic arrives
through the Google Ads account (`AW-16647656227`). That inverts the usual
migration priority: the organic risk is negligible, and the paid one is not.

Before the switch, open the Ads account and check every campaign's **Final URL**:

- Any ad pointing at a `.php` URL will still work — the redirects are 301s and
  Vercel passes query strings through, so `?gclid=…` and any UTM tags survive
  the hop. But Ads prefers a final URL that resolves directly, and an extra
  redirect costs a little load time on a click you have paid for. Update them
  to the new URLs.
- **Check specifically for ads pointing at `/cash-for-cars-trucks.php`.** That
  service has been discontinued, and its redirect lands on
  `/services/sell-your-scrap`. An ad still running for cars and trucks is
  spending money to send people to a page that does not offer it.
- A Final URL that 404s gets the ad disapproved, so anything not in the
  redirect table needs to be added or the ad repointed.

GA4 (`G-GGDPHLJDMW`) — Reports → Engagement → Pages and screens — shows the
real traffic picture including paid, which Search Console cannot.

### After you switch

- **Submit the new sitemap** (`https://shinemotor.com.au/sitemap.xml`) in
  Search Console once verified, and in Bing Webmaster Tools.
- **Watch Indexing → Pages weekly for the first month.** "Not found (404)" is
  the report that matters — every unexpected URL there is a missing redirect.
  This is also how you will find anything all three sources above missed.
- **Expect a dip.** A URL-shape change on the same domain typically costs some
  ranking for two to six weeks while Google re-crawls and re-assigns. It
  recovers. Do not start changing things in week two.
- **Never delete these redirects.** They cost nothing and links to the old URLs
  will keep arriving for years — the 2015 generation is proof of that.

### Known keyword gaps

- `buy-from-us.php` currently ranks with the title *"Copper Scrap — Shine
  Motors"*, and the old page named ISRI trade grades in full — Berry, Candy,
  Birch-Cliff, Honey Brass, Ocean, Tense, Troma, Mill Berry. The new
  `/services/buy-from-us` page talks about grading fourteen times but names none
  of those codes. The redirect is topically sound, but those specific terms are
  what an export buyer searches. Worth adding them to that page.
- `cash-for-cars-trucks.php` has no equivalent, by decision — the yard has
  stopped buying cars and trucks. If that ever changes, the page to build is
  `/services/cash-for-cars-trucks` and the redirect should point at it.

## Environment variables

Set in Vercel → Settings → Environment Variables. Nothing here belongs in the
repo.

| Variable | Used by | Without it |
| --- | --- | --- |
| `ADMIN_PASSWORD` | `/admin` sign-in | The admin API fails closed with a 500 |
| `GITHUB_PAT` | Publishing prices | Saving prices returns an error |
| `GITHUB_REPO` | Publishing prices | Defaults to `naerae100/shinemotor` |
| `GITHUB_BRANCH` | Publishing prices | Defaults to `master` |
| `RESEND_API_KEY` | Quote form email | The form falls back to WhatsApp |
| `QUOTE_TO` | Quote form email | As above |
| `QUOTE_FROM` | Quote form email | As above |

## The admin screen

`/admin` edits the price table and publishes it by committing `prices.json` to
GitHub, which triggers a Vercel rebuild. So **prices go live on the next build,
not instantly** — usually a minute or two. The page is `noindex` and disallowed
in robots.txt. Authentication is a single shared password compared in constant
time, with a throttle on failed attempts; it guards a price list, not customer
data, and is sized accordingly.

## Ranking across Sydney suburbs

`/service-areas` lists 148 suburbs across nine regions. Three rules keep it on
the right side of Google's spam policies, and they are not optional:

1. **The suburb lists stay visible.** Content indexed but hidden from visitors
   is cloaking. The penalty is a manual action against the domain, not a
   ranking dip.
2. **No generated per-suburb pages.** One page per suburb, differing only in
   the place name, is doorway abuse — also a named violation. One honest page
   covering all of them is not.
3. **Each region says what is actually true.** The further regions state plainly
   that a collection depends on the load being worth the drive. If the yard
   stops running somewhere, change `areas.ts` — do not let the page claim a run
   that would not be made.

The real lever for suburb-level queries is the **Google Business Profile**, not
this page. Local pack results are decided by proximity, categories, reviews and
photos. The profile already carries 4.5 stars from 20 reviews; keeping it
current and growing review volume will move "scrap metal <suburb>" further than
any on-site change.

## Known gaps

- **Prices are largely unset.** 29 of the 30 rows in `prices.json` are `null`,
  which renders as "Call for price". The guide is not meaningful until the yard
  fills it in through `/admin`.
- **Open `TODO(client)` markers** — the ABN and NSW scrap metal dealer licence
  number in the footer, the minimum-weight figure in the FAQ, and the given /
  family name split in `team.ts`.
- The Google Business Profile is listed as "Shine Metals Pty Ltd" while the site
  says "Shine Motor Corporation Pty Ltd". Worth reconciling for local search.
