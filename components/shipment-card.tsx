import { ArrowRight } from "lucide-react";
import RoundedImage from "@/components/rounded-image";

export interface ShipmentInfo {
  number: string;
  status: string;
  origin: string;
  originLabel: string;
  destination: string;
  destinationLabel: string;
  currentLocation: string;
  currentLocationLabel: string;
  estimatedArrival: string;
  estimatedArrivalLabel: string;
  shipmentType: string;
  shipmentTypeLabel: string;
}

interface ShipmentCardProps {
  shipment: ShipmentInfo;
  imageSrc: string;
  imageAlt: string;
  /** 0–1 progress along the route. Stubbed at 0.66 for CF123456789. */
  progress?: number;
}

/** Tracking number, route, progress bar, ETA + detail grid. */
export default function ShipmentCard({
  shipment,
  imageSrc,
  imageAlt,
  progress = 0.66,
}: ShipmentCardProps) {
  return (
    <article
      data-shipment-card={shipment.number}
      className="grid gap-24 rounded-2xl border border-mist bg-pure-white p-24 md:grid-cols-[1fr_2fr]"
    >
      <RoundedImage
        src={imageSrc}
        alt={imageAlt}
        width={480}
        height={480}
        sizes="(min-width: 768px) 240px, 100vw"
        className="aspect-square"
      />
      <div className="flex flex-col gap-16">
        <div className="flex flex-wrap items-center gap-12">
          <h2 className="text-subheading font-bold text-obsidian leading-[var(--leading-subheading)] tracking-[var(--tracking-subheading)]">
            Tracking #{shipment.number}
          </h2>
          <span className="flex items-center gap-8 rounded-full border border-mist px-12 py-4 text-caption text-obsidian">
            <span
              aria-hidden="true"
              className="h-8 w-8 rounded-full bg-ember-orange"
            />
            {shipment.status}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-12 text-body-sm">
          <span className="text-pebble">
            {shipment.originLabel}:{" "}
            <strong className="font-bold text-obsidian">
              {shipment.origin}
            </strong>
          </span>
          <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          <span className="text-pebble">
            {shipment.destinationLabel}:{" "}
            <strong className="font-bold text-obsidian">
              {shipment.destination}
            </strong>
          </span>
        </div>

        <div
          data-shipment-progress="root"
          className="h-4 w-full rounded-full bg-mist"
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Shipment progress"
        >
          <div
            data-shipment-progress="fill"
            className="h-4 rounded-full bg-obsidian"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>

        <dl className="grid grid-cols-1 gap-16 border-t border-mist pt-16 sm:grid-cols-3">
          <div className="flex flex-col gap-4">
            <dt className="text-caption text-driftwood">
              {shipment.currentLocationLabel}
            </dt>
            <dd className="text-body-sm font-bold text-obsidian">
              {shipment.currentLocation}
            </dd>
          </div>
          <div className="flex flex-col gap-4">
            <dt className="text-caption text-driftwood">
              {shipment.estimatedArrivalLabel}
            </dt>
            <dd className="text-body-sm font-bold text-obsidian">
              {shipment.estimatedArrival}
            </dd>
          </div>
          <div className="flex flex-col gap-4">
            <dt className="text-caption text-driftwood">
              {shipment.shipmentTypeLabel}
            </dt>
            <dd className="text-body-sm font-bold text-obsidian">
              {shipment.shipmentType}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
