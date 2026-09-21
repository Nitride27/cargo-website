"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion-prefs";

interface StatBlockProps {
  value: string;
  label: string;
}

/**
 * Big number + label (120+, 10K+, 99.5%, 24/7). The leading numeric part
 * counts up on first entry into view (rAF, ease-out, ~1.2s); the suffix
 * (+, K+, %, /7) stays put. Reduced-motion and no-JS render the final
 * value statically — the count-up only ever replaces mounted content.
 */
export default function StatBlock({ value, label }: StatBlockProps) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : Number.NaN;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const [display, setDisplay] = useState(value);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || Number.isNaN(target) || prefersReducedMotion()) return;
    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1200;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - p) ** 3;
          setDisplay(`${(target * eased).toFixed(decimals)}${suffix}`);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, suffix, decimals]);

  return (
    <div ref={rootRef} data-stat="root" data-reveal-item="" className="flex flex-col gap-4">
      <p
        data-stat="value"
        className="text-heading-lg font-bold text-obsidian leading-[var(--leading-heading-lg)] tracking-[var(--tracking-heading-lg)]"
      >
        {display}
      </p>
      <p data-stat="label" className="text-body-sm text-pebble">
        {label}
      </p>
    </div>
  );
}
