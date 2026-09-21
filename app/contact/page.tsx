import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/contact-form";
import NavBar from "@/components/nav-bar";
import { contact } from "@/content/copy";
import { images } from "@/content/images";

const channelIcons = {
  email: Mail,
  phone: Phone,
  location: MapPin,
} as const;

export default function ContactPage() {
  return (
    <>
      <NavBar overHero />
      <main data-page="contact" id="main-content" tabIndex={-1}>
        <section
          data-section="contact-banner"
          aria-label="Contact us"
          className="relative w-full overflow-hidden bg-obsidian"
        >
          <div className="absolute inset-0">
            <Image
              src={images.contactBanner.src}
              alt={images.contactBanner.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="relative mx-auto flex w-full max-w-[var(--page-max-width)] flex-col items-start gap-16 px-16 pb-40 pt-100 text-pure-white md:px-24">
            <p className="text-caption tracking-[var(--tracking-caption)]">
              {contact.eyebrow}
            </p>
            <h1 className="max-w-[16ch] text-heading-lg font-bold leading-[var(--leading-heading-lg)] tracking-[var(--tracking-heading-lg)] md:text-display md:leading-[var(--leading-display)] md:tracking-[var(--tracking-display)]">
              {contact.title}
            </h1>
            <p className="max-w-[52ch] text-body">{contact.body}</p>
          </div>
        </section>

        <div className="mx-auto grid w-full max-w-[var(--page-max-width)] gap-40 px-16 py-100 md:grid-cols-2 md:px-24">
          <section data-reveal data-section="contact-channels" aria-label="Contact channels">
            <ul className="flex flex-col gap-24">
              {contact.channels.map((channel) => {
                const Icon = channelIcons[channel.kind];
                return (
                  <li key={channel.label} className="flex gap-16">
                    <span className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full border border-mist text-obsidian">
                      <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div className="flex flex-col gap-4">
                      <p className="text-body-sm text-pebble">{channel.label}</p>
                      <p className="text-body font-bold text-obsidian">
                        {channel.value}
                      </p>
                      <p className="text-body-sm text-driftwood">{channel.note}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <section data-reveal data-section="contact-form" aria-label="Send us a message">
            <ContactForm />
          </section>
        </div>
      </main>
    </>
  );
}
