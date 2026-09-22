import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bell,
  ClipboardCheck,
  Clock,
  FileCheck,
  FileText,
  Headphones,
  MapPin,
  Package,
  PackageCheck,
  ShieldCheck,
  Ship,
  Truck,
  type LucideIcon,
} from "lucide-react";
import NavBar from "@/components/nav-bar";
import RoundedImage from "@/components/rounded-image";
import ScrollProgressRail from "@/components/scroll-progress-rail";
import StepIndicator from "@/components/step-indicator";
import { howItWorks, journeySteps } from "@/content/copy";
import { images } from "@/content/images";

const stepSlugs = ["pickup", "transit", "customs", "onward", "delivery"];

const bulletIcons: Record<string, LucideIcon> = {
  truck: Truck,
  ship: Ship,
  "map-pin": MapPin,
  bell: Bell,
  "file-text": FileText,
  "file-check": FileCheck,
  "shield-check": ShieldCheck,
  headphones: Headphones,
  clock: Clock,
  package: Package,
  "package-check": PackageCheck,
  "clipboard-check": ClipboardCheck,
};

export function generateStaticParams() {
  return stepSlugs.map((step) => ({ step }));
}

export default async function JourneyStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  const index = stepSlugs.indexOf(step);
  if (index === -1) notFound();
  const journey = journeySteps[index];
  const prev = index > 0 ? stepSlugs[index - 1] : null;
  const next = index < stepSlugs.length - 1 ? stepSlugs[index + 1] : null;

  return (
    <>
      <NavBar overHero={false} />
      <main data-page="journey-step" data-step-page={journey.number} id="main-content" tabIndex={-1}>
        <div className="mx-auto flex w-full max-w-[var(--page-max-width)] flex-col gap-40 px-16 pb-100 pt-100 md:px-24">
          <div className="grid gap-40 md:grid-cols-[2fr_1fr]">
            <section data-reveal data-section="step-detail" aria-label={`Step ${journey.number}`}>
              <p className="text-caption text-pebble">{howItWorks.eyebrow}</p>
              <h1 className="mt-16 text-heading-lg font-bold text-obsidian leading-[var(--leading-heading-lg)] tracking-[var(--tracking-heading-lg)]">
                Step {journey.number}
                <br />
                {journey.title}
              </h1>
              <p className="mt-16 max-w-[60ch] text-body text-pebble">
                {journey.body}
              </p>
              <ul data-reveal-group="step-bullets" className="mt-24 grid grid-cols-1 gap-24 sm:grid-cols-3">
                {journey.bullets.map((bullet) => {
                  const Icon = bulletIcons[bullet.icon] ?? Package;
                  return (
                    <li key={bullet.label} data-reveal-item="" className="flex flex-col gap-8">
                      <span className="flex h-40 w-40 items-center justify-center rounded-full border border-mist text-obsidian">
                        <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <span className="text-body-sm text-obsidian">
                        {bullet.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>

            <aside data-reveal data-section="step-rail" aria-label="Journey steps">
              <StepIndicator
                orientation="vertical"
                activeStep={journey.number}
                steps={howItWorks.steps.map((s, i) => ({
                  ...s,
                  href: `/journey/${stepSlugs[i]}`,
                }))}
              />
            </aside>
          </div>

          <section data-reveal data-section="step-image" aria-label={`${journey.title} photo`}>
            <RoundedImage
              src={images[journey.imageKey].src}
              alt={images[journey.imageKey].alt}
              width={1600}
              height={900}
              sizes="(min-width: 768px) 100vw, 100vw"
              className="aspect-[16/9]"
            />
            <div className="mt-16 flex items-center justify-between gap-24">
              <div className="text-obsidian">
                <ScrollProgressRail
                  current={journey.number}
                  total={howItWorks.progress.total}
                  label={journey.title}
                />
              </div>
              <nav
                data-step-nav="prev-next"
                aria-label="Previous and next steps"
                className="flex gap-12"
              >
                {prev ? (
                  <Link
                    href={`/journey/${prev}`}
                    className="rounded-full border border-mist px-20 py-8 text-body-sm text-obsidian transition-colors hover:border-obsidian hover:underline"
                  >
                    ← Prev
                  </Link>
                ) : null}
                {next ? (
                  <Link
                    href={`/journey/${next}`}
                    className="rounded-full border border-obsidian bg-obsidian px-20 py-8 text-body-sm text-pure-white transition-colors hover:bg-pure-white hover:text-obsidian hover:underline"
                  >
                    Next →
                  </Link>
                ) : null}
              </nav>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
