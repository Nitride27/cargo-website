"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/motion-prefs";

/**
 * Stage 4 baseline: cheap fade/translate-in (y 24px → 0, opacity) for every
 * `[data-reveal]` section entrance. Fire-once via ScrollTrigger.batch —
 * scrub is off. Reduced-motion renders fully static (no transform, no
 * ScrollTrigger). Hiding happens only inside the effect, so no-JS and
 * reduced-motion users always see content.
 */
export default function ScrollReveal() {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const instances = getGsap();
    if (!instances) return;
    const { gsap, ScrollTrigger } = instances;
    const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    if (targets.length === 0) return;
    if (reduced) {
      gsap.set(targets, { clearProps: "opacity,transform" });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 24 });
      ScrollTrigger.batch(targets, {
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
      ScrollTrigger.refresh();
    });
    return () => ctx.revert();
  }, [pathname, reduced]);

  return null;
}
