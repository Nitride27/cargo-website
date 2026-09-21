# CargoFlow Website — Implementation Plan

Phased so each phase produces something viewable. Assumes the stack and structure in `ARCHITECTURE.md`.

## Phase 0 — Project Setup
- [ ] `create-next-app` (TypeScript, App Router, Tailwind v4)
- [ ] Paste `DESIGN.md`'s CSS variables + Tailwind `@theme` block into `app/globals.css`
- [ ] Install `gsap`, `lucide-react`; register `ScrollTrigger` + `ScrollSmoother` in `lib/gsap.ts`
- [ ] Add `next/font` fallback (Inter or DM Sans) as F37Bolton stand-in
- [ ] Set up `content/images.ts` with ~15 Unsplash placeholder URLs covering hero, 5 journey steps, 6 services, about, contact banner

## Phase 1 — Static Layout, No Animation
- [ ] Build `NavBar`, `Footer`, base page shells for all 6 routes
- [ ] Build `Hero3D` as a static full-bleed image + split headline (no motion yet)
- [ ] Build `ServiceCard` grid, `StatBlock` row, `ContactForm`, `TrackingTimeline`, `ShipmentCard`
- [ ] Verify token usage: 20px radius on cards/images, 100px radius on pills/inputs, no shadows, no gradients, cream canvas throughout
- [ ] Responsive pass at 375 / 768 / 1440

**Checkpoint:** site is fully navigable and on-brand with zero motion.

## Phase 2 — Core Scroll Animation
- [ ] Wire `ScrollTrigger` fade/translate-in for all section entrances (cheap baseline, works everywhere)
- [ ] Implement depth-parallax hero (background/midground/text layers at different scroll speeds)
- [ ] Implement `prefers-reduced-motion` fallback path and confirm it disables all 3D/pin behavior
- [ ] Perf pass: confirm 60fps on mid-tier laptop, `will-change` scoped correctly, no layout thrash

## Phase 3 — Signature 3D Sequence
- [ ] Build pinned step-journey scroller (5-step 3D card-flip synced to numbered rail) for `/journey/[step]`
- [ ] Build tilt-on-scroll `PhotoMosaic` for About/Services sections
- [ ] Wire `ScrollProgressRail` (the "01/05" indicator) to the active pinned step
- [ ] Mobile variant: disable pinning, reduce to single-axis parallax below 768px

**Checkpoint:** the "unique 3D scroll" requirement is fully demoable end to end.

## Phase 4 — Content & Data Wiring
- [ ] Fill `content/copy.ts` with all headline/body copy from the mocks (hero, steps, services, about stats, tracking, contact)
- [ ] Wire `/track` search to a mock/stubbed API route returning a fake shipment (`Tracking #CF123456789` style) until a real tracking backend exists
- [ ] Wire `ContactForm` to a stub submit handler (log + success state); swap in real email/CRM endpoint later

## Phase 5 — Polish
- [ ] Hover/focus states on all pill links and buttons (underline-on-hover per style doc's "Ghost Text Button")
- [ ] Accessibility pass: focus rings, alt text on all stock images, semantic headings, keyboard nav through pinned sections
- [ ] Lighthouse pass (target 90+ perf on desktop, 80+ mobile given animation load)
- [ ] Cross-browser check (Safari's `position: sticky` + GSAP pinning interaction is the usual snag)

## Phase 6 — Handoff / Real-Asset Swap
- [ ] Replace every entry in `content/images.ts` with licensed CargoFlow photography — no component changes required
- [ ] Swap Inter/DM Sans for licensed F37Bolton if/when acquired
- [ ] Final QA against `DESIGN.md` Do's/Don'ts checklist

## Definition of Done (per phase)
A phase is complete when: it builds with no TS errors, passes the responsive checkpoints above, and (from Phase 2 onward) the reduced-motion fallback has been manually verified in devtools.
