"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/motion-prefs";

/**
 * Scroll motion hub (all routes, mounted in `app/layout.tsx`):
 * - `[data-reveal]` — cheap fade/translate-in, fire-once (baseline).
 * - `[data-reveal-group]` — children `[data-reveal-item]` rise with a
 *   0.08s stagger when the group enters (grids, rails, timelines).
 * - `[data-parallax]` — slow yPercent drift (-8 → 8), scrub-linked, for
 *   full-bleed banner imagery behind foreground content.
 * Scrub is off except parallax; hiding happens only inside the effect so
 * no-JS users always see content. Reduced-motion renders fully static.
 */
export default function ScrollReveal() {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const instances = getGsap();
    if (!instances) return;
    const { gsap, ScrollTrigger } = instances;
    if (reduced) {
      gsap.set("[data-reveal], [data-reveal-item], [data-parallax]", {
        clearProps: "opacity,transform",
      });
      return;
    }
    const ctx = gsap.context(() => {
      const singles = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (singles.length > 0) {
        gsap.set(singles, { opacity: 0, y: 24 });
        ScrollTrigger.batch(singles, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              overwrite: true,
            }),
        });
      }
      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal-item]", group);
        if (items.length === 0) return;
        gsap.set(items, { opacity: 0, y: 28 });
        ScrollTrigger.create({
          trigger: group,
          start: "top 88%",
          once: true,
          onEnter: () =>
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.08,
              overwrite: true,
            }),
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      ScrollTrigger.refresh();
    });
    return () => ctx.revert();
  }, [pathname, reduced]);

  return null;
}
