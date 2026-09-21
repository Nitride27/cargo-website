// Section copy per ARCHITECTURE.md §8 / IMPLEMENTATION_PLAN.md Phase 4.
// Transcribed from the approved mockups (Sep 2026) — wording matches the mocks
// verbatim except where flagged INVENTED below. Never inline copy in JSX so
// non-engineers can edit it here.

import type { ImageKey } from "./images";

export interface NavLink {
  label: string;
  href: string;
}

export const nav: { brand: string; links: NavLink[]; cta: string; ctaHref: string } = {
  brand: "CargoFlow",
  links: [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Track", href: "/track" },
    { label: "Resources", href: "/contact" },
  ],
  cta: "Get a Quote",
  ctaHref: "/contact",
};

export interface HeroCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  primaryCtaHref: string;
  scrollHint: string;
  progress: { current: string; total: string; label: string };
}

/** Slow route ticker between hero and steps — echoes the trust-logo row. */
export const tickerRoutes: string[] = [
  "Shanghai → Los Angeles",
  "Singapore → Rotterdam",
  "Kathmandu → Delhi",
  "Dubai → Mombasa",
  "Hamburg → New York",
  "Busan → Seattle",
];

export const hero: HeroCopy = {
  eyebrow: "GLOBAL FREIGHT SOLUTIONS",
  title: "Your Cargo. Our Journey.",
  subtitle:
    "From local shipments to global deliveries, we move what matters — safely, on time, and without the hassle.",
  primaryCta: "Explore Our Services",
  primaryCtaHref: "/services",
  scrollHint: "Scroll to explore our shipping journey",
  progress: { current: "01", total: "05", label: "Pickup & Documentation" },
};

export interface StepRef {
  number: string;
  title: string;
}

export const howItWorks: {
  eyebrow: string;
  title: string;
  body: string;
  steps: StepRef[];
  progress: { current: string; total: string };
} = {
  eyebrow: "HOW IT WORKS",
  title: "From pickup to delivery",
  body: "We make global shipping simple. Here's how your cargo moves from origin to destination.",
  steps: [
    { number: "01", title: "Pickup & Documentation" },
    { number: "02", title: "Transit & Tracking" },
    { number: "03", title: "Customs Clearance" },
    { number: "04", title: "Onward Transport" },
    { number: "05", title: "Final Delivery" },
  ],
  progress: { current: "01", total: "05" },
};

export interface JourneyBullet {
  /** Lucide icon name (thin-line set): truck, ship, map-pin, bell, file-text, file-check, shield-check, headphones, clock, package, package-check, clipboard-check. */
  icon: string;
  label: string;
}

export interface JourneyStep {
  number: string;
  title: string;
  body: string;
  bullets: JourneyBullet[];
  imageKey: ImageKey;
}

// Step 01 body + bullets are verbatim from the mock; steps 02–05 bodies and
// bullets are INVENTED in the same editorial tone (mock shows titles only).
export const journeySteps: JourneyStep[] = [
  {
    number: "01",
    title: "Pickup & Documentation",
    body: "We coordinate with your supplier, collect your cargo, and handle all necessary documentation for a smooth start.",
    bullets: [
      { icon: "truck", label: "Cargo pickup from origin" },
      { icon: "file-check", label: "Document verification" },
      { icon: "shield-check", label: "Real-time updates" },
    ],
    imageKey: "stepPickup",
  },
  {
    number: "02",
    title: "Transit & Tracking",
    body: "Your freight moves by ocean, air, or land while live milestones keep you posted at every handoff.",
    bullets: [
      { icon: "map-pin", label: "Live GPS milestones" },
      { icon: "ship", label: "Ocean, air & land options" },
      { icon: "bell", label: "Delay alerts & rerouting" },
    ],
    imageKey: "stepTransit",
  },
  {
    number: "03",
    title: "Customs Clearance",
    body: "We prepare, file, and clear every import and export declaration so your cargo never stalls at the border.",
    bullets: [
      { icon: "file-text", label: "Duty & tax handling" },
      { icon: "file-check", label: "Declaration filing" },
      { icon: "headphones", label: "Broker support" },
    ],
    imageKey: "stepCustoms",
  },
  {
    number: "04",
    title: "Onward Transport",
    body: "From port to door, regional carriers take over with scheduled linehauls and coordinated last-leg delivery.",
    bullets: [
      { icon: "truck", label: "Regional linehaul" },
      { icon: "package", label: "Intermodal handoffs" },
      { icon: "clock", label: "Scheduled time slots" },
    ],
    imageKey: "stepOnward",
  },
  {
    number: "05",
    title: "Final Delivery",
    body: "Proof of delivery, signed and timestamped — your cargo arrives intact, on time, every time.",
    bullets: [
      { icon: "package-check", label: "Doorstep delivery" },
      { icon: "clipboard-check", label: "Proof of delivery" },
      { icon: "bell", label: "Delivery confirmation" },
    ],
    imageKey: "stepFinal",
  },
];

export interface Service {
  title: string;
  blurb: string;
  imageKey: ImageKey;
}

export const services: {
  eyebrow: string;
  title: string;
  body: string;
  items: Service[];
} = {
  eyebrow: "OUR SERVICES",
  title: "Global shipping, made simple.",
  body: "End-to-end logistics solutions tailored to your business. From ocean freight to last-mile delivery, we've got you covered.",
  items: [
    {
      title: "Ocean Freight",
      blurb: "Cost-effective solutions for large, international shipments.",
      imageKey: "serviceOcean",
    },
    {
      title: "Air Freight",
      blurb: "Fast, secure, and reliable for time-sensitive cargo.",
      imageKey: "serviceAir",
    },
    {
      title: "Land Transport",
      blurb: "Flexible and efficient across regions and borders.",
      imageKey: "serviceLand",
    },
    {
      title: "Warehousing",
      blurb: "Safe storage and inventory management solutions.",
      imageKey: "serviceWarehouse",
    },
    {
      title: "Customs Clearance",
      blurb: "Expert handling of all import/export requirements.",
      imageKey: "serviceCustoms",
    },
    {
      title: "Last-Mile Delivery",
      blurb: "On-time delivery to your final destination.",
      imageKey: "serviceLastMile",
    },
  ],
};

export interface Stat {
  value: string;
  label: string;
}

export const about: {
  eyebrow: string;
  title: string;
  body: string;
  storyCta: string;
  storyHref: string;
  imageCaption: string;
  stats: Stat[];
  commitment: { eyebrow: string; title: string; body: string };
} = {
  eyebrow: "ABOUT US",
  title: "More than logistics. A partner in your growth.",
  body: "We're a global freight and logistics company, built on trust, expertise and a commitment to keep your business moving.",
  storyCta: "Our Story",
  storyHref: "/about",
  // INVENTED: mock image caption was illegible.
  imageCaption: "Inbound. Stored. Dispatched.",
  stats: [
    { value: "120+", label: "Countries Served" },
    { value: "10K+", label: "Shipments Monthly" },
    { value: "99.5%", label: "On-time Delivery" },
    { value: "24/7", label: "Customer Support" },
  ],
  commitment: {
    eyebrow: "OUR COMMITMENT",
    title: "Reliable. Efficient. Always.",
    body: "We combine global reach with local expertise to deliver flexible, cost-effective, and sustainable logistics solutions.",
  },
};

export interface TimelineEvent {
  label: string;
  date: string;
}

export const track: {
  eyebrow: string;
  title: string;
  body: string;
  searchPlaceholder: string;
  searchCta: string;
  mapBadge: { status: string; eta: string };
  timeline: TimelineEvent[];
  shipment: {
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
  };
} = {
  eyebrow: "TRACK YOUR SHIPMENT",
  title: "Real-time tracking. Total peace of mind.",
  body: "Enter your tracking number to get the latest updates on your shipment's location and status.",
  searchPlaceholder: "Enter tracking number",
  searchCta: "Track",
  mapBadge: { status: "In Transit", eta: "ETA: Apr 28, 2025" },
  timeline: [
    { label: "Picked Up", date: "Apr 26, 2025" },
    { label: "In Transit", date: "Apr 27, 2025" },
    { label: "Customs Clearance", date: "Apr 27, 2025" },
    { label: "Out for Delivery", date: "ETA: Apr 28, 2025" },
  ],
  shipment: {
    number: "CF123456789",
    status: "In Transit",
    origin: "Shanghai, CN",
    originLabel: "Origin",
    destination: "Los Angeles, US",
    destinationLabel: "Destination",
    currentLocation: "Pacific Ocean",
    currentLocationLabel: "Current Location",
    estimatedArrival: "Apr 28, 2025",
    estimatedArrivalLabel: "Estimated Arrival",
    shipmentType: "Ocean Freight",
    shipmentTypeLabel: "Shipment Type",
  },
};

export interface ContactChannel {
  kind: "email" | "phone" | "location";
  label: string;
  value: string;
  note: string;
}

export const contact: {
  eyebrow: string;
  title: string;
  body: string;
  channels: ContactChannel[];
  form: {
    title: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    submitLabel: string;
  };
} = {
  eyebrow: "CONTACT US",
  title: "Let's move your business forward.",
  body: "Have a question or need a custom quote? Our team is here to help.",
  channels: [
    {
      kind: "email",
      label: "Email",
      value: "hello@cargoflow.com",
      note: "We'll respond within 24 hours.",
    },
    {
      kind: "phone",
      label: "Phone",
      value: "+977 1 590 1234",
      note: "Mon – Fri, 9am – 6pm (NPT)",
    },
    {
      kind: "location",
      label: "Location",
      value: "Kathmandu, Nepal",
      note: "Global support, local presence.",
    },
  ],
  form: {
    title: "Send us a message",
    nameLabel: "Full Name",
    emailLabel: "Email Address",
    messageLabel: "Message",
    submitLabel: "Send Message",
  },
};

export const footer: {
  brand: string;
  links: NavLink[];
  legal: string;
  privacyLabel: string;
  termsLabel: string;
} = {
  brand: "CargoFlow",
  links: [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Track", href: "/track" },
    { label: "Resources", href: "/contact" },
  ],
  legal: "© 2025 CargoFlow. All rights reserved.",
  privacyLabel: "Privacy",
  termsLabel: "Terms",
};
