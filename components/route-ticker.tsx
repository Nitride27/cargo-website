import { tickerRoutes } from "@/content/copy";

/**
 * Slow route ticker between hero and steps — the motion echo of the
 * reference's trust-logo row. Pure CSS marquee (no GSAP needed):
 * duplicated list translates -50% on a loop. The duplicate is
 * aria-hidden; reduced-motion users get a static wrapped row.
 */
export default function RouteTicker() {
  return (
    <div
      data-ticker="root"
      aria-label="Active shipping routes"
      className="overflow-hidden border-y border-mist bg-warm-cream py-12"
    >
      <div data-ticker="track" className="flex w-max items-center">
        {tickerRoutes.map((route) => (
          <span key={route} className="flex items-center gap-16 whitespace-nowrap pr-40 text-body-sm text-pebble">
            {route}
            <span aria-hidden="true" className="h-4 w-4 rounded-full bg-ember-orange" />
          </span>
        ))}
        {tickerRoutes.map((route) => (
          <span
            key={`dup-${route}`}
            aria-hidden="true"
            className="flex items-center gap-16 whitespace-nowrap pr-40 text-body-sm text-pebble"
          >
            {route}
            <span aria-hidden="true" className="h-4 w-4 rounded-full bg-ember-orange" />
          </span>
        ))}
      </div>
    </div>
  );
}
