"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { hero } from "@/content/copy";
import { images } from "@/content/images";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/motion-prefs";

/**
 * Mockup-style hero: full-bleed ship photo, left-aligned eyebrow +
 * display headline + subtitle + black pill CTA, scroll hint bottom-left
 * and 01/05 progress bottom-right. No pin — the next section flows in
 * naturally.
 *
 * The scroll-out is a small zoom with vertical motion blur, pinned just
 * long enough to last ~2 scrolls. The photo eases out across the whole
 * hold while two aria-hidden ghost copies smear vertically behind it
 * (offset y, opacity swelling then releasing), trailing upward as you
 * scroll down — then the pin releases and the next section flows in.
 * Nothing scales past rest. Transform/opacity only — no filters.
 * Reduced-motion is static.
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
    const { gsap, ScrollTrigger } = instances;
    const ctx = gsap.context(() => {
      // Entrance: gentle settle, no masks or pops.
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(
          '[data-hero-layer="background"]',
          { scale: 1.12 },
          { scale: 1.06, duration: 1.8, ease: "power2.out" },
          0,
        )
        .fromTo(
          "[data-hero-enter]",
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1 },
          0.2,
        );

      const mm = gsap.matchMedia();
      // Desktop: pin one extra viewport (~2 scrolls). The zoom-out and
      // vertical trails play across the whole hold, then release.
      mm.add("(min-width: 768px)", () => {
        const layers = gsap.utils.toArray<HTMLElement>("[data-hero-trail]", root);
        gsap.set(layers, { scale: 1.06, y: 0 });
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "+=100%",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              // One scroll lands one hero stage: rest → zoomed → release.
              snap: {
                snapTo: [0, 0.5, 1],
                duration: 0.4,
                delay: 0.1,
                ease: "power1.inOut",
              },
              onToggle: (self) => {
                const bg = root.querySelector<HTMLElement>(
                  '[data-hero-layer="background"]',
                );
                if (bg) bg.style.willChange = self.isActive ? "transform" : "";
              },
            },
          })
          .to('[data-hero-layer="background"]', { scale: 1, y: 50, duration: 1 }, 0)
          .to(
            '[data-hero-trail="1"]',
            {
              keyframes: [
                { y: -30, opacity: 0.3, duration: 0.4 },
                { y: -8, opacity: 0, duration: 0.4 },
              ],
            },
            0,
          )
          .to(
            '[data-hero-trail="2"]',
            {
              keyframes: [
                { y: -56, opacity: 0.16, duration: 0.45 },
                { y: -18, opacity: 0, duration: 0.35 },
              ],
            },
            0,
          )
          .to("[data-hero-copy]", { y: -90, opacity: 0, duration: 0.3 }, 0)
          .to('[data-hero-layer="bottom"]', { opacity: 0, duration: 0.12 }, 0);
        ScrollTrigger.refresh();
      });
      // Mobile: single cheap single-axis parallax, no trails.
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
      className="relative flex h-svh w-full flex-col overflow-hidden bg-obsidian"
    >
      {/* Oversized 8% so the zoom-out + drift never reveal edges. */}
      <div data-hero-layer="background" className="absolute inset-x-0 -bottom-[8%] -top-[8%]">
        <Image
          src={images.hero.src}
          alt={images.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {/* Ghost trails — same photo, hidden until the scroll zoom. Oversized
        vertically so the trailing offsets never reveal edges. */}
      {[1, 2].map((n) => (
        <div
          key={n}
          data-hero-trail={n}
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-[90px] -top-[90px] hidden opacity-0 motion-safe:md:block"
        >
          <Image
            src={images.hero.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      <div
        data-hero-copy="intro"
        className="relative z-10 mx-auto flex w-full max-w-[var(--page-max-width)] flex-1 flex-col justify-end px-16 pb-40 pt-100 text-pure-white md:px-24"
      >
        <p data-hero-enter="eyebrow" className="text-caption tracking-[var(--tracking-caption)]">
          {hero.eyebrow}
        </p>
        <h1
          data-hero-enter="headline"
          className="mt-16 max-w-[12ch] text-heading-lg font-bold leading-[var(--leading-heading-lg)] tracking-[var(--tracking-heading-lg)] md:text-display md:leading-[var(--leading-display)] md:tracking-[var(--tracking-display)]"
        >
          {firstLine}
          <br />
          {secondLine}
        </h1>
        <p data-hero-enter="sub" className="mt-16 max-w-[46ch] text-body">
          {hero.subtitle}
        </p>
        <Link
          data-hero-enter="cta"
          href={hero.primaryCtaHref}
          className="mt-24 self-start rounded-full border border-obsidian bg-obsidian px-28 py-12 text-body text-pure-white transition-colors hover:bg-pure-white hover:text-obsidian hover:underline"
        >
          {hero.primaryCta} →
        </Link>

        <div data-hero-layer="bottom" className="mt-40 flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-24">
          <p className="text-caption">{hero.scrollHint}</p>
          <p className="text-caption">
            {hero.progress.current} / {hero.progress.total} · {hero.progress.label}
          </p>
        </div>
      </div>
    </section>
  );
}
