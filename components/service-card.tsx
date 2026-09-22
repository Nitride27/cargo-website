import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  blurb: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
}

/** Image + title + blurb + circular arrow link for the 3×2 services grid.
 * The photo box locks its ratio directly (width:100% + aspect-ratio, so
 * height derives from the element's own width — never from mixed viewport
 * units that zoom/scrollbars can desync). shrink-0 keeps flex layout from
 * squeezing it. Hover: photo eases to a 1.04 zoom. */
export default function ServiceCard({
  title,
  blurb,
  imageSrc,
  imageAlt,
  href = "/services",
}: ServiceCardProps) {
  return (
    <article data-service-card={title} data-reveal-item="" className="group flex flex-col gap-16">
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex items-start justify-between gap-16">
        <div className="flex min-w-0 flex-col gap-8">
          <h3 className="truncate text-subheading font-bold text-obsidian leading-[var(--leading-subheading)] tracking-[var(--tracking-subheading)]">{title}</h3>
          <p className="line-clamp-2 min-h-[2.4em] text-body-sm text-pebble">{blurb}</p>
        </div>
        <Link
          href={href}
          aria-label={`Learn more about ${title}`}
          className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full border border-mist text-obsidian transition-colors hover:border-obsidian hover:bg-obsidian hover:text-pure-white"
        >
          <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-px group-hover:-translate-y-px" />
        </Link>
      </div>
    </article>
  );
}
