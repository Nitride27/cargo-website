import Image from "next/image";

interface RoundedImageProps {
  src: string;
  /** Alt text is always required — never render an image without it. */
  alt: string;
  width?: number;
  height?: number;
  /** Fill-mode: caller provides a `relative` container with sizing. */
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  /**
   * True only for true full-bleed hero/section-break images (radius 0).
   * Every other image keeps the 20px signature radius (rounded-2xl token).
   */
  bleed?: boolean;
  className?: string;
}

/**
 * Shared image wrapper per ARCHITECTURE.md §7. All non-bleed imagery keeps
 * the 20px radius token; full-bleed heroes/banners pass `bleed`.
 */
export default function RoundedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  priority = false,
  bleed = false,
  className = "",
}: RoundedImageProps) {
  const radius = bleed ? "rounded-none" : "rounded-2xl";
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${radius} ${className}`.trim()}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      sizes={sizes}
      priority={priority}
      className={`h-auto w-full object-cover ${radius} ${className}`.trim()}
    />
  );
}
