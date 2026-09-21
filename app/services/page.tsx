import NavBar from "@/components/nav-bar";
import ServiceCard from "@/components/service-card";
import { services } from "@/content/copy";
import { images } from "@/content/images";

export default function ServicesPage() {
  return (
    <>
      <NavBar overHero={false} />
      <main data-page="services" id="main-content" tabIndex={-1}>
        <div className="mx-auto flex w-full max-w-[var(--page-max-width)] flex-col gap-40 px-16 pb-100 pt-100 md:px-24">
          <section data-reveal data-section="services-header" aria-label="Services introduction">
            <p className="text-caption text-pebble">{services.eyebrow}</p>
            <h1 className="mt-16 max-w-[16ch] text-heading-lg font-bold text-obsidian leading-[var(--leading-heading-lg)] tracking-[var(--tracking-heading-lg)]">
              {services.title}
            </h1>
            <p className="mt-16 max-w-[60ch] text-body text-pebble">
              {services.body}
            </p>
          </section>

          <section data-reveal data-section="services-grid" aria-label="All services">
            <h2 className="sr-only">All services</h2>
            <div data-reveal-group="services-all" className="grid gap-24 sm:grid-cols-2 lg:grid-cols-3">
              {services.items.map((service) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  blurb={service.blurb}
                  imageSrc={images[service.imageKey].src}
                  imageAlt={images[service.imageKey].alt}
                  href="/contact"
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
