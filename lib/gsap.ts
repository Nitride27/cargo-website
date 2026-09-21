import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Shared GSAP singleton per AGENTS.md animation rules: register
// ScrollTrigger + ScrollSmoother exactly once, guard for SSR, and route
// ALL scroll-linked animation through getGsap() — never instantiate a
// second GSAP context per component.

let registered = false;

export interface GsapInstances {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  ScrollSmoother: typeof ScrollSmoother;
}

export function getGsap(): GsapInstances | null {
  if (typeof window === "undefined") return null;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    registered = true;
  }
  return { gsap, ScrollTrigger, ScrollSmoother };
}
