"use client";

import { useLayoutEffect, useRef } from "react";
import RoundedImage from "@/components/rounded-image";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/motion-prefs";

export interface MosaicImage {
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoMosaicProps {
  images: MosaicImage[];
}

/**
 * Asymmetric offset collage (About/Services). Stage 4 tilt-on-scroll:
 * perspective is set once on the `data-mosaic` stage; each card gets a
 * scrubbed fade/scale-in plus a clamped rotateX/rotateY sweep (±4deg max).
 * Mobile keeps the cheap fade/translate only; reduced-motion is static.
 */
const placement: string[] = [
  "md:col-span-7",
  "md:col-span-5 md:mt-40",
  "md:col-span-5 md:-mt-24",
  "md:col-span-7 md:mt-16",
  "md:col-span-6",
  "md:col-span-6 md:mt-40",
];

export default function PhotoMosaic({ images }: PhotoMosaicProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const instances = getGsap();
    const stage = stageRef.current;
    if (!instances || !stage) return;
    if (reduced) return;
    const { gsap } = instances;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.set(stage, { perspective: 1200 });
        gsap.utils.toArray<HTMLElement>("[data-mosaic-card]", stage).forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 24, scale: 0.98, rotateX: 4, rotateY: -3 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              rotateY: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                end: "top 40%",
                scrub: true,
              },
            },
          );
        });
      });
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-mosaic-card]", stage).forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                end: "top 60%",
                scrub: true,
              },
            },
          );
        });
      });
    }, stage);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={stageRef}
      data-mosaic="stage"
      className="grid grid-cols-1 gap-24 sm:grid-cols-2 md:grid-cols-12"
    >
      {images.map((image, i) => (
        <figure
          key={image.src + i}
          data-mosaic-card={i}
          className={`flex flex-col gap-8 sm:col-span-1 ${placement[i % placement.length]}`}
        >
          <RoundedImage
            src={image.src}
            alt={image.alt}
            width={800}
            height={600}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-[4/3]"
          />
          {image.caption ? (
            <figcaption className="text-caption text-driftwood">
              {image.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
