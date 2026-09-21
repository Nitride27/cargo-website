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
/** Card-flip angle for the pinned sequence — within the ≤12deg cap. */
const FLIP_DEG = 10;

const pad = (n: number): string => String(n).padStart(2, "0");

/**
 * Stage 4 pinned step-journey scroller (Home "How it works"). Desktop pins
 * the section and cross-fades the 5 step photographs with a rotateY 10deg
 * card-flip (`preserve-3d`); the numbered rail active state and the
 * ScrollProgressRail count/dashes sync via ScrollTrigger onUpdate.
 * Mobile + reduced-motion fall back to a static stacked layout — no pin,
 * no 3D. Cards use autoAlpha so hidden steps never intercept clicks.
 */
export default function StepJourneyScroller() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const last = useRef({ active: -1, progress: -1 });

  useLayoutEffect(() => {
    const instances = getGsap();
    const root = rootRef.current;
    if (!instances || !root) return;
    if (reduced) return;
    const { gsap } = instances;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const stage = root.querySelector<HTMLElement>("[data-steps-stage]");
        const cards = gsap.utils.toArray<HTMLElement>("[data-steps-card]", root);
        if (!stage || cards.length === 0) return;
        gsap.set(root, { perspective: 1200 });
        // Stack cards: stage takes the first card's height (next/image
        // reserves aspect-ratio space, so this is correct pre-load).
        stage.style.position = "relative";
        stage.style.height = `${cards[0].offsetHeight}px`;
        for (const [i, card] of cards.entries()) {
          card.style.position = "absolute";
          card.style.inset = "0";
          gsap.set(card, {
            transformStyle: "preserve-3d",
            autoAlpha: i === 0 ? 1 : 0,
            rotateY: i === 0 ? 0 : FLIP_DEG,
          });
        }
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${cards.length * 700}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              const nextActive = Math.min(cards.length - 1, Math.floor(p * cards.length));
              const s = last.current;
              if (nextActive !== s.active) {
                s.active = nextActive;
                setActive(nextActive);
              }
              // Coarse progress state: enough for live dashes, ~20 renders
              // per full scrub instead of one per tick.
              if (Math.abs(p - s.progress) > 0.05) {
                s.progress = p;
                setProgress(p);
              }
            },
            onToggle: (self) => {
              for (const card of cards) {
                card.style.willChange = self.isActive ? "transform" : "";
              }
            },
          },
        });
        for (let i = 1; i < cards.length; i += 1) {
          const pos = i - 1;
          tl.to(cards[i - 1], { autoAlpha: 0, rotateY: -FLIP_DEG, duration: 1 }, pos).fromTo(
            cards[i],
            { autoAlpha: 0, rotateY: FLIP_DEG },
            { autoAlpha: 1, rotateY: 0, duration: 1 },
            pos,
          );
        }
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      data-pin="steps"
      data-steps-sequence="how-it-works"
      aria-label="How it works"
    >
      <div className="grid gap-24 md:grid-cols-[1fr_1.4fr_0.7fr]">
        <div className="flex flex-col gap-16">
          <p className="text-caption text-pebble">{howItWorks.eyebrow}</p>
          <h2 className="text-heading font-bold text-obsidian leading-[var(--leading-heading)] tracking-[var(--tracking-heading)]">
            {howItWorks.title}
          </h2>
          <p className="text-body text-pebble">{howItWorks.body}</p>
          <div className="text-obsidian">
            <ScrollProgressRail
              current={pad(active + 1)}
              total={pad(journeySteps.length)}
              progress={progress}
            />
          </div>
        </div>

        <div data-steps-stage className="flex min-w-0 flex-col">
          {journeySteps.map((step, i) => (
            <figure
              key={step.number}
              data-steps-card={step.number}
              data-step={step.number}
              tabIndex={0}
              role="group"
              aria-label={`Step ${step.number} of ${journeySteps.length}: ${step.title}`}
              aria-current={i === active ? "step" : undefined}
              className={`flex flex-col gap-8 ${i > 0 ? "mt-24 md:mt-0" : ""}`}
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

        <ol data-steps="rail" aria-label="Journey steps" className="flex flex-col">
          {journeySteps.map((step, i) => {
            const isActive = i === active;
            return (
              <li
                key={step.number}
                data-step={step.number}
                data-step-active={isActive ? "true" : "false"}
                className="relative border-l border-mist pb-24 pl-24 last:border-l-transparent last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-4 top-4 h-8 w-8 rounded-full ${
                    isActive ? "bg-ember-orange" : "border border-mist bg-warm-cream"
                  }`}
                />
                <div className="flex flex-col gap-4">
                  <span className="text-caption text-driftwood">{step.number}</span>
                  <Link
                    href={`/journey/${stepSlugs[i]}`}
                    aria-current={isActive ? "step" : undefined}
                    className={`text-body-sm hover:underline ${
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
    </section>
  );
}
