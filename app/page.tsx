import Image from "next/image";
import Link from "next/link";
import Hero3D from "@/components/hero-3d";
import NavBar from "@/components/nav-bar";
import RouteTicker from "@/components/route-ticker";
import ServiceCard from "@/components/service-card";
import StatBlock from "@/components/stat-block";
import StepJourneyScroller from "@/components/step-journey-scroller";
import { about, contact, hero, nav, services } from "@/content/copy";
import { images } from "@/content/images";

export default function Home() {
  return (
    <>
      <NavBar overHero />
      <main data-page="home" id="main-content" tabIndex={-1}>
        <Hero3D />
        <RouteTicker />

        <div className="mx-auto flex w-full max-w-[var(--page-max-width)] flex-col gap-100 px-16 py-100 md:px-24">
          <StepJourneyScroller />

          <section data-reveal data-section="stats-teaser" aria-label="Company statistics">
            <div data-reveal-group="stats" className="grid grid-cols-2 gap-24 md:grid-cols-4">
              {about.stats.map((stat) => (
                <StatBlock key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
            <Link
              href={about.storyHref}
              className="mt-24 inline-block rounded-full border border-mist px-20 py-8 text-body-sm text-obsidian hover:underline"
            >
              {about.storyCta} →
            </Link>
          </section>

          <section data-reveal data-section="services-teaser" aria-label="Services preview">
            <div className="flex flex-col gap-16">
              <p className="text-caption text-pebble">{services.eyebrow}</p>
              <h2 className="text-heading font-bold text-obsidian leading-[var(--leading-heading)] tracking-[var(--tracking-heading)]">
                {services.title}
              </h2>
              <p className="max-w-[60ch] text-body text-pebble">{services.body}</p>
            </div>
            <div data-reveal-group="services" className="mt-24 grid gap-24 sm:grid-cols-2 lg:grid-cols-3">
              {services.items.slice(0, 3).map((service) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  blurb={service.blurb}
                  imageSrc={images[service.imageKey].src}
                  imageAlt={images[service.imageKey].alt}
                />
              ))}
            </div>
            <Link
              href="/services"
              className="mt-24 inline-block rounded-full border border-obsidian bg-obsidian px-28 py-12 text-body text-pure-white transition-colors hover:bg-pure-white hover:text-obsidian hover:underline"
            >
              {hero.primaryCta} →
            </Link>
          </section>
        </div>

        <section
          data-section="cta-banner"
          aria-label="Get a quote"
          className="relative w-full overflow-hidden bg-obsidian"
        >
          <div data-parallax="cta-banner" className="absolute inset-x-0 -bottom-[10%] -top-[10%]">
            <Image
              src={images.contactBanner.src}
              alt={images.contactBanner.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div data-reveal className="relative mx-auto flex w-full max-w-[var(--page-max-width)] flex-col items-start gap-16 px-16 py-100 text-pure-white md:px-24">
            <h2 className="max-w-[16ch] text-heading-lg font-bold leading-[var(--leading-heading-lg)] tracking-[var(--tracking-heading-lg)]">
              {contact.title}
            </h2>
            <p className="max-w-[52ch] text-body">{contact.body}</p>
            <Link
              href={nav.ctaHref}
              className="rounded-full border border-obsidian bg-obsidian px-28 py-12 text-body text-pure-white transition-colors hover:bg-pure-white hover:text-obsidian hover:underline"
            >
              {nav.cta} →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
