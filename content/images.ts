// Stock photo placeholder map per ARCHITECTURE.md §7.
// Stage 2 (verified Sep 2026): every URL below returned HTTP 200 via curl and
// its subject was visually confirmed. Swapping real CargoFlow photography later
// touches this file only — never hardcode an image URL in a component.
//
// Key names supersede the draft list in the original stub comment:
// stepFinal (not stepFinalDelivery), serviceWarehouse (not serviceWarehousing),
// aboutStory / aboutCommitment (not a single `about`).

export interface ImageEntry {
  src: string;
  alt: string;
}

export type ImageKey =
  | "hero"
  | "stepPickup"
  | "stepTransit"
  | "stepCustoms"
  | "stepOnward"
  | "stepFinal"
  | "serviceOcean"
  | "serviceAir"
  | "serviceLand"
  | "serviceWarehouse"
  | "serviceCustoms"
  | "serviceLastMile"
  | "aboutStory"
  | "aboutCommitment"
  | "contactBanner"
  | "trackBanner"
  | "trackVessel";

const unsplash = (id: string, width: number): string =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${width}&auto=format&fit=crop`;

export const images: Record<ImageKey, ImageEntry> = {
  hero: {
    src: unsplash("1578575437130-527eed3abbec", 2400),
    alt: "Container ship loaded with colorful freight containers berthed under port cranes",
  },
  stepPickup: {
    src: unsplash("1450101499163-c8848c66ca85", 1600),
    alt: "Close-up of a hand signing shipping and customs documents",
  },
  stepTransit: {
    src: unsplash("1494412574643-ff11b0a5c1c3", 1600),
    alt: "Aerial view of a container port with cranes and stacked freight containers",
  },
  stepCustoms: {
    src: unsplash("1578575437130-527eed3abbec", 1600),
    alt: "Container vessel being loaded and inspected at a port terminal",
  },
  stepOnward: {
    src: unsplash("1601584115197-04ecc0da31d7", 1600),
    alt: "White semi truck driving on an open highway",
  },
  stepFinal: {
    src: unsplash("1593113598332-cd288d649433", 1600),
    alt: "Courier handing stacked parcel boxes to a recipient at a truck",
  },
  serviceOcean: {
    src: unsplash("1578575437130-527eed3abbec", 800),
    alt: "Container ship carrying stacked freight containers",
  },
  serviceAir: {
    src: unsplash("1436491865332-7a61a109cc05", 800),
    alt: "Airplane wing above the clouds at sunset",
  },
  serviceLand: {
    src: unsplash("1601584115197-04ecc0da31d7", 800),
    alt: "Semi truck on an open highway",
  },
  serviceWarehouse: {
    src: unsplash("1586528116311-ad8dd3c8310d", 800),
    alt: "Fulfillment warehouse with stocked shelves and yellow bins",
  },
  serviceCustoms: {
    src: unsplash("1494412574643-ff11b0a5c1c3", 800),
    alt: "Aerial view of a container yard and cranes at a shipping port",
  },
  serviceLastMile: {
    src: unsplash("1595246140625-573b715d11dc", 800),
    alt: "Two sealed cardboard parcel boxes ready for delivery",
  },
  aboutStory: {
    src: unsplash("1553413077-190dd305871c", 1600),
    alt: "Long aisle of stocked warehouse shelving",
  },
  aboutCommitment: {
    src: unsplash("1519003722824-194d4455a60c", 2000),
    alt: "Freight truck driving a mountain highway through a rocky valley",
  },
  contactBanner: {
    src: unsplash("1592838064575-70ed626d3a0e", 2000),
    alt: "Semi truck in an open lot under a sunset sky",
  },
  trackBanner: {
    src: unsplash("1524661135-423995f22d0b", 1600),
    alt: "World map marked with shipment route pins",
  },
  trackVessel: {
    src: unsplash("1578575437130-527eed3abbec", 800),
    alt: "Container ship thumbnail for the tracked shipment",
  },
};
