import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import RoundedImage from "@/components/rounded-image";

interface ServiceCardProps {
  title: string;
  blurb: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
}

/** Image + title + blurb + circular arrow link for the 3×2 services grid. */
export default function ServiceCard({
  title,
  blurb,
  imageSrc,
  imageAlt,
  href = "/services",
}: ServiceCardProps) {
  return (
    <article data-service-card={title} className="flex flex-col gap-16">
      <RoundedImage
        src={imageSrc}
        alt={imageAlt}
        width={800}
        height={600}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="aspect-[4/3]"
      />
      <div className="flex items-start justify-between gap-16">
        <div className="flex flex-col gap-8">
          <h3 className="text-subheading font-bold text-obsidian leading-[var(--leading-subheading)] tracking-[var(--tracking-subheading)]">{title}</h3>
          <p className="text-body-sm text-pebble">{blurb}</p>
        </div>
        <Link
          href={href}
          aria-label={`Learn more about ${title}`}
          className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full border border-mist text-obsidian transition-colors hover:border-obsidian"
        >
          <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
