"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import RoundedImage from "@/components/rounded-image";
import ScrollProgressRail from "@/components/scroll-progress-rail";
import { howItWorks, journeySteps } from "@/content/copy";
import { images } from "@/content/images";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/motion-prefs";

const stepSlugs = ["pickup", "transit", "customs", "onward", "delivery"];

const pad = (n: number): string => String(n).padStart(2, "0");

/**
 * "How it works" — pinned deck of cards (desktop). The page stays while
 * the five step photographs deal off the top one by one: the outgoing
 * card lifts and fades, the next rises from below in the same slot.
 *
 * The hold is CSS `position: sticky` (never GSAP pin): the section
 * carries ~350vh of scroll room wrapping a sticky full-viewport panel,
 * so the hold cannot fail to engage — no spacer math, no fixed-position
 * measurement. A scrub-only ScrollTrigger (no pin) drives the deal
 * tweens and syncs rail/count/progress. The panel is opaque cream,
 * edge-bled, overflow-hidden: nothing can show through or around it.
 * Mobile and reduced-motion fall back to the static stacked flow.
 */
export default function StepJourneyScroller() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const lastActive = useRef(-1);

  useLayoutEffect(() => {
    const instances = getGsap();
    const root = rootRef.current;
    if (!instances || !root) return;
    if (reduced) return;
    const { gsap, ScrollTrigger } = instances;
    const ctx = gsap.context(() => {
      // Deck on every viewport (explicit override of the no-pinning rule):
      // absolute-stacked cards driven by a scrub-only trigger over the
      // sticky room. Reduced-motion returns early above — static flow.
      const stage = root.querySelector<HTMLElement>("[data-steps-stage]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-steps-card]", root);
      if (!stage || cards.length === 0) return;
        // Stack the deck: stage takes the first card's height (next/image
        // reserves aspect-ratio space, so this holds pre-load).
        stage.style.position = "relative";
        stage.style.height = `${cards[0].offsetHeight}px`;
        for (const [i, card] of cards.entries()) {
          card.style.position = "absolute";
          card.style.inset = "0";
          gsap.set(card, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 48 });
        }
        const deal = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            // Scrub-only: measures plain scroll distance, never pins.
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            // One scroll gesture lands exactly one card: snap points at
            // each of the five deal positions.
            snap: {
              snapTo: 1 / (cards.length - 1),
              duration: 0.4,
              delay: 0.1,
              ease: "power1.inOut",
            },
            onUpdate: (self) => {
              const nextActive = Math.min(
                cards.length - 1,
                Math.floor(self.progress * cards.length),
              );
              if (nextActive !== lastActive.current) {
                lastActive.current = nextActive;
                setActive(nextActive);
              }
            },
            onToggle: (self) => {
              for (const card of cards) {
                card.style.willChange = self.isActive ? "transform, opacity" : "";
              }
            },
          },
        });
        for (let i = 1; i < cards.length; i += 1) {
          const pos = i - 1;
          deal
            .to(cards[i - 1], { autoAlpha: 0, y: -48, duration: 1 }, pos)
            .fromTo(
              cards[i],
              { autoAlpha: 0, y: 48 },
              { autoAlpha: 1, y: 0, duration: 1 },
              pos,
            );
        }
        const onLoad = () => {
          stage.style.height = `${cards[0].offsetHeight}px`;
          ScrollTrigger.refresh();
        };
        window.addEventListener("load", onLoad);
        ScrollTrigger.refresh();
        return () => window.removeEventListener("load", onLoad);
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      data-steps-sequence="how-it-works"
      aria-label="How it works"
      className="-mx-16 bg-warm-cream px-16 md:-mx-24 md:px-24"
    >
      {/* Scroll room: the sticky panel holds while this scrolls.
        Height applies only when motion is allowed — otherwise the
        stacked cards flow with no gap. */}
      <div data-steps-room className="motion-safe:relative motion-safe:h-[350vh]">
      <div
        data-steps-panel="deck"
        className="motion-safe:sticky motion-safe:top-0 motion-safe:flex motion-safe:h-screen motion-safe:h-svh motion-safe:items-center motion-safe:overflow-hidden"
      >
      <div className="grid w-full gap-24 md:grid-cols-[1fr_1.4fr_0.7fr]">
        {/* min-w-0 on both columns: the rail's non-wrapping row is 810px of
          max-content — without this it forces the whole mobile grid track
          to 810px wide (giant photos + page side-scroll). */}
        <div className="flex min-w-0 flex-col gap-16">
          <p className="text-caption text-pebble">{howItWorks.eyebrow}</p>
          <h2 className="text-heading font-bold text-obsidian leading-[var(--leading-heading)] tracking-[var(--tracking-heading)]">
            {howItWorks.title}
          </h2>
          <p className="text-body text-pebble">{howItWorks.body}</p>
          <div className="text-obsidian">
            <ScrollProgressRail
              current={pad(active + 1)}
              total={pad(journeySteps.length)}
              progress={(active + 1) / journeySteps.length}
            />
          </div>
        </div>

        <div data-steps-stage className="flex min-w-0 flex-col gap-64 md:gap-0">
          {journeySteps.map((step, i) => (
            <figure
              key={step.number}
              data-steps-card={step.number}
              data-step={step.number}
              tabIndex={0}
              role="group"
              aria-label={`Step ${step.number} of ${journeySteps.length}: ${step.title}`}
              aria-current={i === active ? "step" : undefined}
              className={`flex scroll-mt-100 flex-col gap-8 ${i > 0 ? "mt-24 md:mt-0" : ""}`}
            >
              <RoundedImage
                src={images[step.imageKey].src}
                alt={images[step.imageKey].alt}
                width={1200}
                height={900}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-[4/3]"
              />
              <figcaption className="flex items-baseline justify-between gap-16">
                <span className="text-body-sm text-obsidian">
                  <span className="text-caption text-driftwood">{step.number} — </span>
                  {step.title}
                </span>
                <Link
                  href={`/journey/${stepSlugs[i]}`}
                  className="shrink-0 text-body-sm text-obsidian hover:underline"
                >
                  View step →
                </Link>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="min-w-0">
          <ol data-steps="rail" aria-label="Journey steps" className="relative flex flex-row gap-16 overflow-x-auto md:flex-col md:gap-0 md:overflow-visible">
            <span
              aria-hidden="true"
              className="absolute bottom-12 left-0 top-12 hidden w-px bg-mist md:block"
            >
              <span
                className="block w-full bg-obsidian transition-all duration-500"
                style={{ height: `${((active + 1) / journeySteps.length) * 100}%` }}
              />
            </span>
            {journeySteps.map((step, i) => {
              const isActive = i === active;
              return (
                <li
                  key={step.number}
                  data-step={step.number}
                  data-step-active={isActive ? "true" : "false"}
                  className="relative shrink-0 border-mist pb-8 pl-0 pr-24 md:border-l md:pb-24 md:pl-24 md:pr-0 md:last:border-l-transparent md:last:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-4 hidden h-8 w-8 rounded-full md:block md:-left-4 ${
                      isActive ? "bg-ember-orange" : "border border-mist bg-warm-cream"
                    }`}
                  />
                  <div className="flex flex-col gap-4">
                    <span className="text-caption text-driftwood">{step.number}</span>
                    <Link
                      href={`/journey/${stepSlugs[i]}`}
                      aria-current={isActive ? "step" : undefined}
                      className={`whitespace-nowrap text-body-sm hover:underline md:whitespace-normal ${
                        isActive ? "font-bold text-obsidian" : "text-pebble"
                      }`}
                    >
                      {step.title}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      </div>
      </div>
    </section>
  );
}
