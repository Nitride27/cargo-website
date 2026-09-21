"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollProgressRail from "@/components/scroll-progress-rail";
import { hero } from "@/content/copy";
import { images } from "@/content/images";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/motion-prefs";

/**
 * Layered full-bleed hero. Split headline ("Your Cargo. / Our
 * Journey.") per DESIGN.md left+right tension. Stage 4 depth-parallax:
 * `perspective: 1200px` stage, background layer drifts slower
 * (scale + translateY), foreground/headline faster with a subtle rotateX
 * (6deg, cap ≤12deg), scrub-linked. Mobile gets one cheap background
 * translateY; reduced-motion renders fully static.
 */
export default function Hero3D() {
  const [firstLine, secondLine] = hero.title.split(". ").map((part, i, arr) =>
    i < arr.length - 1 ? `${part}.` : part,
  );
  const rootRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const instances = getGsap();
    const root = rootRef.current;
    if (!instances || !root) return;
    if (reduced) return;
    const { gsap } = instances;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      // Desktop: full 3D depth-parallax, scrubbed.
      mm.add("(min-width: 768px)", () => {
        gsap.set(root, { perspective: 1200 });
        const layers = gsap.utils.toArray<HTMLElement>(
          '[data-hero-layer="background"], [data-hero-layer="foreground"]',
        );
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onToggle: (self) => {
              // Scope will-change to the active scrub only.
              for (const el of layers) {
                el.style.willChange = self.isActive ? "transform" : "";
              }
            },
          },
        });
        tl.to('[data-hero-layer="background"]', { y: 120, scale: 1.12 }, 0)
          .to('[data-hero-layer="foreground"]', {
            y: -90,
            rotateX: 6,
            transformOrigin: "center top",
          }, 0)
          .to('[data-hero="headline-left"], [data-hero="headline-right"]', { y: -60 }, 0)
          .to('[data-hero-layer="scroll-hint"], [data-hero-layer="progress"]', { opacity: 0 }, 0);
      });
      // Mobile: single cheap single-axis parallax, no perspective/3D.
      mm.add("(max-width: 767px)", () => {
        gsap.to('[data-hero-layer="background"]', {
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      data-hero="root"
      aria-label="CargoFlow introduction"
      className="relative h-svh w-full overflow-hidden bg-obsidian"
    >
      <div data-hero-layer="background" className="absolute inset-0">
        <Image
          src={images.hero.src}
          alt={images.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div
        data-hero-layer="foreground"
        className="absolute inset-0 mx-auto flex w-full max-w-[var(--page-max-width)] flex-col justify-end px-16 pb-40 pt-100 text-pure-white md:px-24"
      >
        <p
          data-hero="eyebrow"
          className="text-caption tracking-[var(--tracking-caption)]"
        >
          {hero.eyebrow}
        </p>
        <div className="mt-16 flex flex-col gap-24 md:flex-row md:items-end md:justify-between">
          <h1
            data-hero="headline-left"
            className="max-w-[12ch] text-heading-lg font-bold leading-[var(--leading-heading-lg)] tracking-[var(--tracking-heading-lg)] md:text-display md:leading-[var(--leading-display)] md:tracking-[var(--tracking-display)]"
          >
            {firstLine}
            <br />
            {secondLine}
          </h1>
          <div data-hero="headline-right" className="flex max-w-[32ch] flex-col gap-16">
            <p className="text-body">{hero.subtitle}</p>
            <Link
              href={hero.primaryCtaHref}
              className="self-start rounded-full border border-obsidian bg-obsidian px-28 py-12 text-body text-pure-white transition-colors hover:bg-pure-white hover:text-obsidian hover:underline"
            >
              {hero.primaryCta} →
            </Link>
          </div>
        </div>

        <div className="mt-40 flex items-end justify-between gap-24">
          <p data-hero-layer="scroll-hint" className="text-caption">
            {hero.scrollHint}
          </p>
          <div data-hero-layer="progress" className="text-pure-white">
            <ScrollProgressRail
              current={hero.progress.current}
              total={hero.progress.total}
              label={hero.progress.label}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
