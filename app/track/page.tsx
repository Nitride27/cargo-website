"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import NavBar from "@/components/nav-bar";
import RoundedImage from "@/components/rounded-image";
import ShipmentCard from "@/components/shipment-card";
import TrackingTimeline from "@/components/tracking-timeline";
import { track } from "@/content/copy";
import { images } from "@/content/images";

/**
 * Live tracking search — stubbed per IMPLEMENTATION_PLAN.md Phase 4.
 * Any submitted tracking number returns the mock CF123456789 shipment.
 */
export default function TrackPage() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <NavBar overHero={false} />
      <main data-page="track" id="main-content" tabIndex={-1}>
        <div className="mx-auto flex w-full max-w-[var(--page-max-width)] flex-col gap-40 px-16 pb-100 pt-100 md:px-24">
          <section data-reveal data-section="track-header" aria-label="Track your shipment">
            <p className="text-caption text-pebble">{track.eyebrow}</p>
            <h1 className="mt-16 max-w-[16ch] text-heading-lg font-bold text-obsidian leading-[var(--leading-heading-lg)] tracking-[var(--tracking-heading-lg)]">
              {track.title}
            </h1>
            <p className="mt-16 max-w-[60ch] text-body text-pebble">{track.body}</p>

            <form
              data-track-form="root"
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-24 flex w-full max-w-[60ch] items-center gap-8 rounded-full border border-mist bg-pure-white p-8 pl-20"
            >
              <Search
                size={16}
                strokeWidth={1.5}
                aria-hidden="true"
                className="shrink-0 text-pebble"
              />
              <label htmlFor="tracking-number" className="sr-only">
                {track.searchPlaceholder}
              </label>
              <input
                id="tracking-number"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={track.searchPlaceholder}
                className="w-full bg-transparent text-body text-obsidian placeholder:text-driftwood focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full border border-obsidian bg-obsidian px-28 py-12 text-body text-pure-white transition-colors hover:bg-pure-white hover:text-obsidian hover:underline"
              >
                {track.searchCta}
              </button>
            </form>
          </section>

          {submitted ? (
            <div data-track-results="root" className="flex flex-col gap-40" aria-live="polite">
              <section data-section="track-map" aria-label="Shipment map">
                <div className="relative">
                  <RoundedImage
                    src={images.trackBanner.src}
                    alt={images.trackBanner.alt}
                    width={1600}
                    height={800}
                    sizes="100vw"
                    className="aspect-[2/1]"
                  />
                  <p className="absolute right-16 top-16 flex items-center gap-8 rounded-full border border-mist bg-pure-white px-12 py-4 text-caption text-obsidian">
                    <span
                      aria-hidden="true"
                      className="h-8 w-8 rounded-full bg-ember-orange"
                    />
                    {track.mapBadge.status} · {track.mapBadge.eta}
                  </p>
                </div>
              </section>

              <section data-section="track-timeline" aria-label="Shipment timeline">
                <TrackingTimeline events={track.timeline} activeIndex={1} />
              </section>

              <section data-section="track-shipment" aria-label="Shipment details">
                <ShipmentCard
                  shipment={track.shipment}
                  imageSrc={images.trackVessel.src}
                  imageAlt={images.trackVessel.alt}
                />
              </section>
            </div>
          ) : (
            <p data-track-results="empty" className="text-body-sm text-pebble">
              Enter a tracking number above to see the latest status.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
