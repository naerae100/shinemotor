# Shine Motor Corporation — Design Plan
Design lead brief, v1. Written before any code. Sources: `research/current-site-content.md`, `research/competitor-reference.md`.

---

## 0. The strategic read

Shine has one asset no competitor in this market has, and the current site throws it away: **they speak in real trade grades.** Mill Berry. Candy. Birch Cliff. Ocean. Honey. Night. Troma. Druid. These are ISRI scrap classifications — the actual language of the international metals trade — and they happen to be beautiful words. Greenway says "We Buy Copper." Shine can say "Mill Berry."

That is the whole design. Everything below serves one proposition:

> **This is not a junkyard with a website. This is a metals house that has been grading, weighing and exporting since 1973 — and it will beat any genuine quote.**

Premium, in this category, does not mean luxurious. It means *precise*. Honest weighing, correct grading, instant EFT. The design should feel like a set of calibrated instruments, not like a hospitality brand.

---

## 1. Colour — 6 named values

Every name comes from the metal trade. This is not decoration; it keeps the team honest about what each colour is for.

| Token | Hex | Role | Budget |
|---|---|---|---|
| `anvil` | `#0B0C0E` | Deepest field. Specimen plates, hero, the final CTA. The colour objects are photographed against. | ~35% |
| `graphite` | `#141619` | Page base. Cold-rolled steel in shade — cool, never brown, never pure black. | ~45% |
| `mill` | `#1D2126` | Raised surface. All hairlines are `mill` lifted to `#2A2F36`. | ~10% |
| `bare` | `#E7E9EB` | Type. A steel-tinted white, not cream — deliberately away from the warm-cream + terracotta cliché. | ~8% |
| `bright` | `#C97B4A` | **The one accent.** Named for Bare Bright — the colour of freshly cut No.1 copper wire. | **< 2%** |
| `blued` | `#6E8CA0` | Secondary. Named for the temper colour steel turns at ~300°C. Quiet, cold, used three times on the page. | **< 1%** |

Derived text tone: `slag` `#8A9097` — muted body copy, a desaturated tint of `graphite`, not a new hue.

**Accent budget is a hard rule.** `bright` appears in exactly five places on the homepage:
1. The primary CTA fill (and its single soft glow — the only glow on the site)
2. The active tick in the materials rail
3. The material category label on the active specimen
4. The Ingleburn dot on the service-area map
5. The arrow on a hovered/focused link

`blued` appears in exactly three: the hero eyebrow, the map outline, and the keyboard focus ring.

Rejected on purpose: warm cream + terracotta (the current AI house style), near-black + acid green (ditto, and it would signal "eco startup" rather than "metals trade"), any use of green at all — every recycler in Sydney is green, which is exactly why we won't be.

---

## 2. Type

**Display — Archivo** (variable, `wdth` 112–120, weight **600 only**).
A grotesque descended from American gothic signage. Set wide and tight-tracked, it reads as machined plate — engineered, not fashionable. Chosen over the condensed-caps default (Bebas/Oswald) because condensed reads *sports*, and expanded reads *industrial*.

**Body — IBM Plex Sans** (weights **400 and 500 only**).
Commissioned by a company that built machines. Slightly humanist, extremely legible at small sizes, and it does not have Inter's "every startup in 2024" fingerprint.

**Data — IBM Plex Mono** (weight **400**).
Same superfamily as the body, so this is a two-family pairing, not three. Mono is honest here: grade codes, phone numbers, opening hours and weights are all tabular data.

**Four weights in play across the whole site.** That is the discipline.

### Type scale — fixed, used everywhere, no ad-hoc sizes

| px | Use | Tracking | Leading |
|---|---|---|---|
| **96** | Hero statement, breaker CTA (desktop) | −0.04em | 0.95 |
| **64** | Section headline, active grade name | −0.03em | 1.0 |
| **40** | Pillar title, "Who we serve" row | −0.02em | 1.05 |
| **28** | Lead paragraph, FAQ question | −0.01em | 1.35 |
| **20** | Large body, pillar body | 0 | 1.6 |
| **17** | Body — *not 16* | 0 | 1.7 |
| **14** | Nav, captions, footer links | 0 | 1.6 |
| **12** | Mono eyebrow, data strips (uppercase) | **+0.16em** | 1.4 |

Fluid clamps: 96 → 40 at mobile, 64 → 32, 40 → 26, 28 → 20. Body sizes hold — legibility is not responsive.

Line length capped at **62ch** for body, **46ch** for leads, **18ch** for display. No paragraph runs the width of the viewport, ever.

---

## 3. Layout — "the yard and the plate"

Two spatial registers, alternating. Nothing else.

**Yard** — full-bleed, generous, left-aligned. Every eyebrow and headline down the entire page starts at *the same left rail*. The content changes; the rail never moves. This is the quiet backbone.

**Plate** — a centred `anvil` field with a single lit object in it. Rare, and reserved for material specimens and the final CTA.

- Content max-width **1280**, full-bleed sections **1440**
- Page padding: 24 / 48 / 80 (mobile / tablet / desktop)
- 12-column grid, 32px gutter
- **Section padding: 200px desktop · 120 tablet · 88 mobile.** Breakers get 240.
- Hairlines are 1px `#2A2F36` and are the *only* dividers. No cards with borders on all four sides. No shadows anywhere except the single CTA glow.

### Hero
```
┌───────────────────────────────────────────────────────────────────┐
│  SHINE MOTOR          Buy · Sell · Cars & Trucks      0478 555 537 │  72px, hairline under, blurs on scroll
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│                        ·  200px of nothing  ·                     │
│                                                                   │
│  SINCE 1973 · INGLEBURN NSW                                       │  mono 12, +0.16em, blued
│                                                                   │
│  We will beat                                          ░░░░░░░░   │  Archivo 96/0.95/−0.04em
│  any other                                            ░░░░░░░░░   │  photo bleeds from RIGHT EDGE only,
│  genuine quote.                                        ░░░░░░░░   │  opacity 0.22, gradient to anvil
│                                                                   │  by 55% — type sits on clean field
│  Ferrous and non-ferrous, bought at Sydney's                      │  20/1.6, slag, 46ch
│  top rates. Paid by EFT before you leave the yard.                │
│                                                                   │
│  ▸ Request a quote      Sell your scrap →                         │  ONE filled copper button + one text link
│                                                                   │
│                        ·  160px of nothing  ·                     │
├───────────────────────────────────────────────────────────────────┤
│  NSW & ACT    ·   EFT ONLY   ·   7AM MON–SAT   ·   BINS SUPPLIED  │  trust bar: mono 12, slag, hairlines
└───────────────────────────────────────────────────────────────────┘
```
Not "headline + subhead + two buttons + stock photo." One sentence at scale, one supporting line, one button. The photograph is atmosphere at the edge — the type owns the room.

### Materials — THE SIGNATURE (see §4)
```
┌───────────────────────────────────────────────────────────────────┐  sticky, 100vh, anvil
│  MATERIALS                                          01 / 08       │
│                                                                   │
│        ┌─────────────────┐                                        │
│        │                 │       COPPER                           │  mono 12, bright
│        │    specimen     │                                        │
│        │   raking light  │       MILL BERRY                       │  Archivo 64
│        │   on near-black │                                        │
│        │                 │       No. 1 bare, uncoated and         │  17/1.7, slag, 42ch
│        └─────────────────┘       unalloyed copper wire.           │
│                                  Bare Bright.                     │
│                                                                   │
│                                  Gauge by agreement               │  mono 12, slag
│                                                                   │
│  ▬ ▭ ▭ ▭ ▭ ▭ ▭ ▭                        View all 19 grades →     │
└───────────────────────────────────────────────────────────────────┘
```

### Services pillars
Three full-width rows, each ≥ 60vh, mirrored alternately. Not three cards in a row — each pillar gets a screen's worth of room.
```
│  ────────────────────────────────────────────────────────────    │
│                                                                   │
│   BUY FROM US                              ┌──────────────┐      │
│   Graded stock, ready to ship.             │              │      │
│                                            │  image 4:5   │      │
│   We process, sort and prepare at          │  anvil field │      │
│   our own facility for sale to steel       │              │      │
│   mills, brokers and exporters —           └──────────────┘      │
│   locally and internationally.                                    │
│                                                                   │
│   View the catalogue →                                            │
│                                                                   │
│  ────────────────────────────────────────────────────────────    │
│                              ┌──────────┐   SELL YOUR SCRAP      │  (mirrored)
```

---

## 4. The signature: **the Specimen Plate**

One idea, and the page is remembered for it.

Each material is presented the way Apple photographs a product: **a single object, alone, on a near-black field, lit by one raking light from upper-left, with its trade name set large beside it.** Not an icon. Not a card in a grid of twelve. A plate.

The signature *moment* is the **pinned specimen rail**: the materials section pins for roughly five screens of scroll, and as you scroll, the plate is swapped — image cross-fades and settles from 1.04 → 1.00 scale, the grade name reveals under a vertical clip mask, like a plate being changed on a stand. Eight grades, one at a time, each getting the whole screen.

This is the **only** pinned/scroll-driven moment on the page. Everything else scrolls normally.

Eight featured grades: **Mill Berry** (Copper) · **Candy** (Copper) · **Ocean** (Radiators) · **Honey** (Brass) · **Night** (Brass) · **Extruded** (Aluminium) · **Troma** (Aluminium Wheels) · **Druid** (Wiring). Then one quiet link to the full catalogue of 19.

Mobile falls back to a horizontal snap-scroll of the same plates. Pinning on a phone is hostile; the plate treatment survives intact, which is the point — the signature is the *plate*, and the pin is just how desktop reveals it.

---

## 5. Section-by-section — one idea each

| # | Section | The single point | Treatment |
|---|---|---|---|
| 1 | Hero | We'll beat any genuine quote | One sentence at 96px |
| 2 | Sticky quote | (persistent) | Graphite pill, hairline, one copper dot. Enters after hero. Bottom bar on mobile. |
| 3 | Trust bar | Four facts, no badges | Mono 12 on hairlines |
| 4 | Pillars | Three ways to trade with us | Three full rows, own CTA each |
| 5 | **Materials** | **We buy by grade, properly** | **Pinned specimen plates** |
| 6 | Who we serve | We know your trade | Six large type rows, targeted CTA per row |
| 7 | How it works | Three steps, that's all | Numbered — it is genuinely a sequence |
| 8 | Why choose us | You get paid properly | Four text items on hairlines, no icons |
| 9 | Service area | All of NSW & ACT | Hairline map outline, one copper dot on Ingleburn |
| 10 | FAQ | The logistics questions | Typographic accordion, no card chrome |
| 11 | Quote breaker | Bring it in, get paid today | Boldest block on the page. 96px + the one glow. |
| 12 | Footer | Everything practical | Mono-heavy, hairline-divided, quiet |

---

## 6. Motion

- **Easing:** entrances `cubic-bezier(0.16, 1, 0.3, 1)`. State changes `cubic-bezier(0.4, 0, 0.2, 1)`. Nothing else.
- **Reveal:** opacity 0→1 and y 20→0, 800ms, stagger 70ms, fires once, at `-12%` viewport margin. Objects settling, not sliding in.
- **No overshoot anywhere.** No bounce, no spring wobble, no `scale` above 1.02, no rotation.
- **Micro-interaction:** buttons scale 1.015 on hover / 0.985 on press, 180ms. Perceptible, barely.
- **The one glow:** primary CTA carries a soft `bright` bloom at 18% that lifts to 28% on hover. It appears nowhere else.
- **`prefers-reduced-motion`:** every reveal resolves instantly, the pin releases into a static stacked list, the map dot stops pulsing. Handled through Framer Motion's `useReducedMotion` plus a global CSS guard, not left to chance.

---

## 7. Self-critique — what I cut, and why

I went back over the plan looking for anything that would look identical on a plumber's site, a gym's site, or a solar installer's site. Seven things did. All removed:

1. **Numbered service pillars (01 / 02 / 03).** Numbering something that is not a sequence is pure decoration. The pillars are three parallel options, not three steps. → Numbers removed from pillars, kept only in How It Works where they are *earned*.
2. **Animated stat counters** — "12 branches · 50+ years · 1000s of tonnes". This is the single most generic move in local-business web design, and two of those three numbers are unverifiable. → Cut entirely. The one fact worth having, "SINCE 1973", survives as a mono line in the hero, stated once, not animated.
3. **Icon badges on Why Choose Us and the trust bar.** A shield for "trusted", a clock for "fast". Stock semantics, zero information. → All decorative icons cut. `lucide-react` is used *only* for functional UI: arrow, chevron, phone, menu, close. Nothing on the page is an icon standing in for an idea.
4. **A testimonials section.** Greenway has one; it was the obvious thing to match. But we have no real testimonials, and inventing them would be dishonest. → Cut. Flagged for the client to supply; if they do, it goes in with trade attribution ("David H., Site Foreman"), which is what makes it persuasive.
5. **Gradient overlays on the pillar images.** The default web move, and it fights the whole premise — a gradient scrim announces "this is a web card." → Replaced with flat `anvil` fields and one raking light, so the images read as *photographed objects*.
6. **A parallax hero on top of the pinned materials section.** Two scroll effects competing. → Parallax cut. One scroll moment on the page, and it is the specimen rail.
7. **The current site's dual "Buy From Us / Sell To Us" hero buttons.** Two equal-weight buttons is the template tell — it means nobody decided what the page is for. → One filled CTA, one text link.

**Still on the watch list.** Two things remain slightly generic by nature and are being held to a tight leash: the FAQ accordion (mitigated — no cards, no plus-in-a-circle, just hairlines and a thin rotating chevron) and the four-up Why Choose Us (mitigated — text only, no boxes, very wide gaps).

---

## 8. Open questions for the client

1. Two landlines appear on the current site — (02) 8712 6999 and (02) 8712 9548 — with no explanation. Which is correct?
2. "Minimum weight required" is stated with no figure. What is it? The FAQ answers this honestly rather than inventing a number.
3. Real testimonials with trade attribution — do these exist?
4. Photography: the existing images are usable placeholders but are flat on-site phone shots. The specimen-plate treatment needs a short shoot — eight materials, dark background, one raking light. This is the single highest-leverage spend on the project.
5. ABN and any recycler licence numbers — these belong in the footer as trust signals.
