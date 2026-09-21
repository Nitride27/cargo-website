# CargoFlow Website — Architecture

## 1. Overview
CargoFlow is a marketing/product site for a global freight & logistics company. Six page/section types are shown in the mockups: Home (hero + steps overview), Journey/Step detail, Services grid, About, Live Tracking, Contact. Visual language follows `DESIGN.md` ("Lightship" system): warm cream canvas, near-monochrome UI, one ember-orange accent, 20px image radius, 100px pill radius on interactive elements, F37Bolton (or Inter/DM Sans substitute) with tight tracking, no shadows, no gradients, no filled buttons except where CargoFlow deviates (CTA pill buttons appear filled black in the mockups — treat black-fill pill buttons as this build's one exception to the "ghost button only" rule, since the mock explicitly shows solid "Get a Quote" / "Send Message" pills).

This build adds one requirement beyond the style doc: a **unique 3D scroll animation** system, and use of **stock photography as placeholders** until CargoFlow supplies real shipping/logistics photos.

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | File-based routing for the 6 sections, static export or ISR, image optimization |
| Language | TypeScript | Type-safe props for reusable card/section components |
| Styling | Tailwind CSS v4 (`@theme`) | Design tokens map directly to `DESIGN.md`'s Tailwind v4 block |
| Animation (scroll/3D) | GSAP + ScrollTrigger + ScrollSmoother | Best-in-class scroll-linked 3D transforms, scrubbing, pinning; smoother than Framer Motion for pinned/parallax sequences |
| Micro-interactions | Framer Motion (optional, component-level only) | Hover states, menu open/close, route transitions — not the scroll engine |
| Stock imagery | Unsplash Source / Unsplash API (dev placeholders) | Freely usable placeholders tagged `cargo`, `shipping`, `port`, `freight`, `logistics`, `truck` — swap for licensed assets before launch |
| Icons | Lucide (thin-line, matches "1.5–2px stroke" spec) | Matches minimal thin-line icon requirement |
| Fonts | Local F37Bolton if licensed, else `Inter`/`DM Sans` via `next/font` | Style doc names these as the approved geometric substitutes |
| Deployment | Vercel | Zero-config Next.js hosting, image CDN |

## 3. Design Token Bridge
`DESIGN.md`'s CSS variables and Tailwind v4 `@theme` block are copied verbatim into `app/globals.css`. No values are re-derived — the token names become the single source of truth for color, spacing, radius, and type scale across every component.

## 4. Site Map / Routes

```
/                → Home: hero + "How it works" strip + about-stats teaser + services teaser + CTA
/journey/[step]  → Step 01–05 detail (Pickup, Transit, Customs, Onward, Final Delivery) — matches "Step 01 Pickup & Documentation" mock
/services        → Global shipping grid (Ocean/Air/Land/Warehousing/Customs/Last-Mile)
/about           → Company story, stats bar, commitment section
/track           → Live tracking search + timeline + shipment detail card
/contact         → Contact info + message form
```

Shared across all routes: `<NavBar>` (transparent-over-hero, solid-over-cream), `<Footer>`.

## 5. Component Inventory

- `Hero3D` — full-bleed image with layered depth (background image, midground shipping containers, foreground gradient/vignette) that responds to scroll with parallax + subtle 3D rotation (see §6)
- `NavBar` — 3-zone layout per style doc; theme-aware black/white swap on scroll past hero
- `StepIndicator` — vertical numbered rail (01–05) with active-state highlight, used on both Home (horizontal filmstrip) and Journey pages (vertical rail)
- `ServiceCard` — image + title + blurb + circular arrow link, used in the 3×2 services grid
- `StatBlock` — big number + label (120+, 10K+, 99.5%, 24/7)
- `TrackingTimeline` — horizontal stepper (Picked Up → In Transit → Customs → Out for Delivery) with colored status dots
- `ShipmentCard` — tracking number, route, progress bar, ETA
- `ContactForm` — pill inputs, black pill submit button
- `PhotoMosaic` — asymmetric offset image collage layout (About/Services sections)
- `ScrollProgressRail` — the "01/05" + progress-dash indicator seen bottom-left of hero and journey images

## 6. 3D Scroll Animation System (the differentiator)

Goal: a signature scroll experience, not generic fade-up-on-scroll. Three layered techniques, all GSAP/ScrollTrigger-driven with `will-change: transform` and `perspective` set once on a wrapping container (avoid per-element `perspective` thrashing):

1. **Depth-parallax hero** — hero image sits in a `perspective: 1200px` stage. On scroll, background image layer translates/scales slower (`z: -200px` equivalent via `scale` + `translateY`), a midground container-ship cutout layer moves faster, and the headline text moves fastest — creating real parallax depth rather than a single flat image.
2. **Pinned step-journey scroller** — the "Step 01 → 05" section pins the viewport and cross-fades/rotates between step photographs on a 3D card-flip (`rotateY` 8–12°, `transformStyle: preserve-3d`) as the user scrolls through five sub-steps, synced to the numbered rail on the right (mirrors the mock's "01 Pickup & Documentation ... 05 Final Delivery" list).
3. **Tilt-on-scroll photo mosaic** — each `PhotoMosaic` card gets a small scroll-velocity-driven `rotateX`/`rotateY` tilt (±3–4°, clamped) plus a fade/scale-in as it enters the viewport, using ScrollTrigger's `scrub` for a continuous (not stepped) feel.

Guardrails:
- Respect `prefers-reduced-motion`: fall back to plain fade/opacity transitions, no 3D transforms, no pinning.
- Cap all rotation to small angles (≤12°) — the brand is minimal/editorial, not playful; the 3D read should feel like subtle depth, not a gimmick.
- Mobile: disable pinning and heavy `perspective` layering below `768px`; keep parallax to a single cheap `translateY` for performance.

## 7. Stock Photography Strategy (placeholder phase)
- Source: Unsplash, queried per section (`freight ship`, `container port`, `cargo plane`, `logistics warehouse`, `truck highway`, `dock worker`) — all License-free for mockup use.
- Store selected URLs in `content/images.ts` as a single swappable map (`hero`, `stepPickup`, `stepTransit`, …, `serviceOcean`, `serviceAir`, …) so real photography is a one-file swap later, not a component rewrite.
- All images pass through `next/image` for optimization and the 20px radius token via a shared `RoundedImage` wrapper (radius 0 only on true full-bleed hero/section-break images, per style doc).

## 8. Folder Structure

```
app/
  layout.tsx
  globals.css
  page.tsx                 # Home
  journey/[step]/page.tsx
  services/page.tsx
  about/page.tsx
  track/page.tsx
  contact/page.tsx
components/
  nav-bar.tsx
  hero-3d.tsx
  step-indicator.tsx
  service-card.tsx
  stat-block.tsx
  tracking-timeline.tsx
  shipment-card.tsx
  contact-form.tsx
  photo-mosaic.tsx
  scroll-progress-rail.tsx
lib/
  gsap.ts                  # registers ScrollTrigger/ScrollSmoother once
  motion-prefs.ts          # prefers-reduced-motion hook
content/
  images.ts                # stock photo placeholder map
  copy.ts                  # section copy (headlines, blurbs, stats)
public/
  fonts/                   # F37Bolton if licensed
AGENTS.md
```
