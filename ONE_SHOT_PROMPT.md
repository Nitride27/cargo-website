# One-Shot Build Prompt — CargoFlow Website

Paste this whole prompt into your agentic coding tool (Claude Code / equivalent) at the repo root, after `ARCHITECTURE.md`, `IMPLEMENTATION_PLAN.md`, `AGENTS.md`, and `DESIGN.md` are present in the repo.

---

## Prompt

You are building the CargoFlow marketing website end-to-end in one pass. Read `ARCHITECTURE.md`, `IMPLEMENTATION_PLAN.md`, `AGENTS.md`, and `DESIGN.md` fully before writing any code — they are binding, not inspiration. Do not ask me clarifying questions; make the most reasonable call yourself and note assumptions in a final summary.

**Work through this as a pipeline of sub-agents, each with a narrow mandate. Use the Task tool to spin up a fresh sub-agent per stage below — don't do all six stages in one undifferentiated pass.** Each sub-agent should receive only the context it needs (its stage's brief + the relevant source docs), do its work, write its own short handoff note (what it built, what it assumed, what the next stage needs to know), and stop. The orchestrating agent (you, at the top level) sequences the stages, passes handoff notes forward, and owns the final QA gate.

### Stage 1 — Scaffold Agent
Mandate: project setup only.
- `create-next-app` per `ARCHITECTURE.md` §2 (TypeScript, App Router, Tailwind v4)
- Port `DESIGN.md`'s CSS variables and Tailwind `@theme` block into `app/globals.css` verbatim
- Install `gsap`, `lucide-react`; set up `lib/gsap.ts` and `lib/motion-prefs.ts`
- Create the empty folder structure from `ARCHITECTURE.md` §8
- Handoff note: confirm build runs clean (`npm run dev`) before passing on

### Stage 2 — Content & Imagery Agent
Mandate: `content/images.ts` and `content/copy.ts` only, nothing else.
- Source stock photography for every slot named in `ARCHITECTURE.md` §7 (hero, 5 journey steps, 6 services, about, contact banner) — freight ships, container ports, cargo planes, warehouses, trucks, dock workers. Prefer wide/cinematic compositions since several are full-bleed.
- Write all headline/body/stat copy for the 6 mockup screens (Home, Journey step detail, Services, About, Track, Contact) — match the tone and actual line content visible in the mockups (e.g. "Your Cargo. Our Journey.", "120+ Countries Served", "Step 01 Pickup & Documentation")
- Handoff note: list every image slot and its source query/URL, flag any slot you couldn't find a strong image for

### Stage 3 — Component Agent
Mandate: build every component in `ARCHITECTURE.md` §5 as static, unanimated, fully responsive React components using only the design tokens (no hardcoded colors/spacing/radii — see `AGENTS.md` Design System Rules).
- Build in this order: `NavBar`, `Footer`, `RoundedImage`, `StatBlock`, `ServiceCard`, `StepIndicator`, `ContactForm`, `TrackingTimeline`, `ShipmentCard`, `PhotoMosaic`, `Hero3D` (static version — no motion yet)
- Assemble all 6 routes from `ARCHITECTURE.md` §4 using these components and Stage 2's content/images
- Responsive check at 375 / 768 / 1440
- **Before marking this stage done, invoke the `taste-skill` and `impeccable` skills against every assembled page** — treat their output as a blocking review, not a suggestion. Fix anything they flag (spacing inconsistency, weak hierarchy, off-brand color use, cramped or misaligned layouts) before moving on. If either skill isn't available in this environment, do a manual self-review against `DESIGN.md`'s Do's/Don'ts list instead and say so in the handoff note.
- Handoff note: confirm zero hardcoded style values, confirm taste/impeccable review passed (or manual equivalent), list any deviations from the mockups and why

### Stage 4 — Animation Agent
Mandate: implement `ARCHITECTURE.md` §6 exactly — the three-layer 3D scroll system (depth-parallax hero, pinned step-journey 3D card-flip scroller, tilt-on-scroll photo mosaic) — plus the baseline scroll-triggered fade/translate-ins for everything else.
- Wire `ScrollProgressRail` to the pinned step sequence
- Implement and verify the `prefers-reduced-motion` fallback path (must fully disable pinning/3D, not just reduce it)
- Implement the mobile fallback (no pinning, single-axis parallax only, below 768px)
- Cap all rotation at ≤12deg per `AGENTS.md`
- Handoff note: confirm 60fps target checked in devtools performance tab, confirm reduced-motion path manually tested, confirm mobile fallback tested at 375px

### Stage 5 — Polish Agent
Mandate: `IMPLEMENTATION_PLAN.md` Phase 5 in full — hover/focus states, accessibility pass (alt text, focus rings, semantic headings, keyboard nav through the pinned sections), Lighthouse pass, cross-browser Safari check on the pinning/sticky interaction.
- **Re-invoke `taste-skill`/`impeccable` on the fully animated, fully polished site** — this is the final visual-quality gate before QA. Iterate until clean.
- Handoff note: Lighthouse scores, any accessibility issues found and fixed, any Safari-specific fixes applied

### Stage 6 — QA Agent (orchestrator-run, not delegated)
- Run `npm run typecheck && npm run lint && npm run build` — must all pass clean
- Walk `AGENTS.md`'s PR/Change Checklist item by item
- Walk `DESIGN.md`'s Do's/Don'ts list item by item, confirming compliance
- Produce a final summary for me: what was built, all assumptions made across stages, any skill (taste-skill/impeccable) findings that were overridden and why, and a short list of anything deferred to `IMPLEMENTATION_PLAN.md` Phase 6 (real-asset swap, licensed font)

### Global constraints (apply to every stage)
- Follow `AGENTS.md` without exception — design tokens only, GSAP owns scroll animation, Framer Motion (if used) is micro-interactions only, images only via `content/images.ts`, copy only via `content/copy.ts`
- Don't skip ahead to later stages to "save time" — each stage's handoff note is how the next stage gets context, and skipping breaks that chain
- If a stage's sub-agent hits a genuine ambiguity `ARCHITECTURE.md`/`DESIGN.md` doesn't resolve, it should make the most on-brand call itself (cream-canvas, minimal, editorial, 20px/100px radii, ember-orange-as-rare-accent) rather than stall

Begin with Stage 1.
