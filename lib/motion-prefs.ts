"use client";

import { useEffect, useState } from "react";

// Motion-preference helpers per AGENTS.md animation rules: every scroll
// animation needs a prefers-reduced-motion fallback, and pinning/heavy
// parallax is disabled below 768px viewport width.

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_BREAKPOINT_PX = 768;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < MOBILE_BREAKPOINT_PX;
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => prefersReducedMotion());

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
