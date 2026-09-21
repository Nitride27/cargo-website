"use client";

import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/motion-prefs";

interface TimelineEvent {
  label: string;
  date: string;
}

interface TrackingTimelineProps {
  events: TimelineEvent[];
  /** Index of the current event. Earlier = done (obsidian), current = ember dot. */
  activeIndex?: number;
}

/**
 * Horizontal stepper (Picked Up → In Transit → Customs → Out for Delivery).
 * Status reads from dot fill only: obsidian done, tiny ember current,
 * mist outline upcoming. Dots pop in with a stagger on first entry;
 * reduced-motion renders them statically.
 */
export default function TrackingTimeline({
  events,
  activeIndex = 1,
}: TrackingTimelineProps) {
  const rootRef = useRef<HTMLOListElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const instances = getGsap();
    const root = rootRef.current;
    if (!instances || !root || reduced) return;
    const { gsap, ScrollTrigger } = instances;
    const ctx = gsap.context(() => {
      const dots = gsap.utils.toArray<HTMLElement>("[data-timeline-dot]", root);
      gsap.set(dots, { scale: 0, transformOrigin: "center" });
      ScrollTrigger.create({
        trigger: root,
        start: "top 88%",
        once: true,
        onEnter: () =>
          gsap.to(dots, { scale: 1, duration: 0.45, ease: "back.out(2)", stagger: 0.12 }),
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <ol
      ref={rootRef}
      data-timeline="root"
      className="grid grid-cols-2 gap-24 md:grid-cols-4"
    >
      {events.map((event, i) => {
        const done = i < activeIndex;
        const current = i === activeIndex;
        return (
          <li
            key={event.label}
            data-timeline-event={event.label}
            data-timeline-state={current ? "current" : done ? "done" : "upcoming"}
            className="flex flex-col gap-8"
          >
            <div className="flex items-center gap-8" aria-hidden="true">
              <span
                data-timeline-dot={event.label}
                className={`h-12 w-12 shrink-0 rounded-full ${
                  current
                    ? "bg-ember-orange"
                    : done
                      ? "bg-obsidian"
                      : "border border-mist"
                }`}
              />
              {i < events.length - 1 ? (
                <span
                  className={`h-px flex-1 ${done ? "bg-obsidian" : "bg-mist"}`}
                />
              ) : null}
            </div>
            <p className="text-body-sm font-bold text-obsidian">{event.label}</p>
            <p className="text-caption text-driftwood">{event.date}</p>
          </li>
        );
      })}
    </ol>
  );
}
