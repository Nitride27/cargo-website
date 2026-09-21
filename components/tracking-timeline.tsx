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
 * mist outline upcoming. No animation — Stage 4 only if requested.
 */
export default function TrackingTimeline({
  events,
  activeIndex = 1,
}: TrackingTimelineProps) {
  return (
    <ol
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
