import Image from "next/image";
import NavBar from "@/components/nav-bar";
import PhotoMosaic from "@/components/photo-mosaic";
import StatBlock from "@/components/stat-block";
import { about } from "@/content/copy";
import { images } from "@/content/images";

export default function AboutPage() {
  return (
    <>
      <NavBar overHero={false} />
      <main data-page="about" id="main-content" tabIndex={-1}>
        <div className="mx-auto flex w-full max-w-[var(--page-max-width)] flex-col gap-100 px-16 pb-100 pt-100 md:px-24">
          <section data-reveal data-section="story" aria-label="Our story">
            <div className="grid gap-24 md:grid-cols-2 md:items-end">
              <div className="flex flex-col gap-16">
                <p className="text-caption text-pebble">{about.eyebrow}</p>
                <h1 className="text-heading-lg font-bold text-obsidian leading-[var(--leading-heading-lg)] tracking-[var(--tracking-heading-lg)]">
                  {about.title}
                </h1>
                <p className="max-w-[52ch] text-body text-pebble">{about.body}</p>
              </div>
            </div>
            <div className="mt-24">
              <PhotoMosaic
                images={[
                  {
                    src: images.aboutStory.src,
                    alt: images.aboutStory.alt,
                    caption: about.imageCaption,
                  },
                  {
                    src: images.stepTransit.src,
                    alt: images.stepTransit.alt,
                  },
                ]}
              />
            </div>
          </section>

          <section data-reveal data-section="stats-bar" aria-label="Company statistics">
            <div data-reveal-group="about-stats" className="grid grid-cols-2 gap-24 md:grid-cols-4 md:divide-x md:divide-mist">
              {about.stats.map((stat) => (
                <div key={stat.label} className="md:pl-24 md:first:pl-0">
                  <StatBlock value={stat.value} label={stat.label} />
                </div>
              ))}
            </div>
          </section>
        </div>

        <section
          data-section="commitment-banner"
          aria-label="Our commitment"
          className="relative w-full overflow-hidden bg-obsidian"
        >
          <div data-parallax="commitment-banner" className="absolute inset-x-0 -bottom-[10%] -top-[10%]">
            <Image
              src={images.aboutCommitment.src}
              alt={images.aboutCommitment.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div data-reveal className="relative mx-auto flex w-full max-w-[var(--page-max-width)] flex-col items-start gap-16 px-16 py-100 text-pure-white md:px-24">
            <p className="text-caption tracking-[var(--tracking-caption)]">
              {about.commitment.eyebrow}
            </p>
            <h2 className="max-w-[16ch] text-heading-lg font-bold leading-[var(--leading-heading-lg)] tracking-[var(--tracking-heading-lg)]">
              {about.commitment.title}
            </h2>
            <p className="max-w-[52ch] text-body">{about.commitment.body}</p>
          </div>
        </section>
      </main>
    </>
  );
}
