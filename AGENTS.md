# AGENTS.md

Instructions for AI coding agents (Claude Code, Copilot, etc.) working in this repository.

## Project
CargoFlow marketing site — Next.js 15 (App Router) + TypeScript + Tailwind v4 + GSAP/ScrollTrigger. See `ARCHITECTURE.md` for structure and `IMPLEMENTATION_PLAN.md` for phased build order. Read both before making structural changes.

## Setup
```bash
npm install
npm run dev        # http://localhost:3000
```

## Commands
```bash
npm run dev         # local dev server
npm run build        # production build — MUST pass before any PR
npm run lint          # eslint
npm run typecheck   # tsc --noEmit
```
Run `lint` and `typecheck` before considering a task done. Do not `git commit` with either failing.

## Design System Rules (non-negotiable)
All values come from `DESIGN.md` tokens, already ported into `app/globals.css`. Do not hardcode colors, spacing, or radii — use the CSS variables / Tailwind theme classes.

- Canvas is `--color-warm-cream` (`#faf6ef`), never pure white as page background.
- Image/card radius: 20px (`--radius-2xl`). Interactive elements (buttons, inputs, nav pills): 100px (`--radius-full`).
- No `box-shadow`, no gradients, anywhere.
- Ember orange (`--color-ember-orange`) is a rare accent wash only — never a large surface, never the default button fill.
- Section vertical rhythm: 100px gaps (`--spacing-100`).
- Full-bleed hero/section-break images: no border-radius. All other images: 20px.
- Typography: only the one font family token (`--font-f37bolton`, falling back to Inter/DM Sans). Use the named `--text-*` size tokens, not arbitrary px values.

## Animation Rules
- All scroll-linked animation goes through `lib/gsap.ts`'s shared `ScrollTrigger`/`ScrollSmoother` instance — don't instantiate a second GSAP context per component.
- Every scroll animation needs a `prefers-reduced-motion` fallback (see `lib/motion-prefs.ts`). Never ship a scroll effect without checking this hook.
- Keep 3D rotation angles ≤12deg. This is an editorial/minimal brand — motion should read as "depth," not playful bounce.
- Disable pinning and heavy parallax below 768px viewport width; use a cheap single-axis fallback instead.
- Framer Motion is for discrete UI micro-interactions only (menus, hovers). GSAP owns all scroll-scrubbed animation. Don't mix both for the same element.

## Images
- Placeholder stock photography lives entirely in `content/images.ts`. Never hardcode an image URL inside a component — import from that map so the eventual real-asset swap touches one file.
- All images render through the shared `RoundedImage` wrapper (or `next/image` directly for true full-bleed hero images) — always with `alt` text.

## Content
- Copy lives in `content/copy.ts`, not inline in JSX, so non-engineers can edit it later.

## PR / Change Checklist
1. `npm run typecheck && npm run lint && npm run build` all pass.
2. Changed components respect the Design System Rules above (spot-check radius/color/spacing tokens).
3. If a change touches scroll behavior, manually verify with `prefers-reduced-motion: reduce` in devtools.
4. If a change touches layout, check 375 / 768 / 1440 breakpoints.
5. No new dependency added for something GSAP, Tailwind, or Lucide already covers.

## Out of Scope for Agents (ask first)
- Swapping the animation library (GSAP → something else)
- Changing the color palette or type scale
- Adding a CMS or backend without discussion — `/track` and the contact form are stubbed intentionally per `IMPLEMENTATION_PLAN.md` Phase 4
