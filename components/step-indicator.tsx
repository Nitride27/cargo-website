import Link from "next/link";

export interface StepRef {
  number: string;
  title: string;
  href?: string;
}

interface StepIndicatorProps {
  steps: StepRef[];
  /** Number of the active step ("01"–"05"). Omit for the neutral strip. */
  activeStep?: string;
  orientation?: "horizontal" | "vertical";
}

/**
 * Numbered 01–05 rail. Horizontal filmstrip on Home, vertical rail on
 * Journey pages. `data-pin="steps"` marks the vertical rail Stage 4 pins.
 * Active step gets the ember-orange dot — the only chromatic accent here.
 */
export default function StepIndicator({
  steps,
  activeStep,
  orientation = "horizontal",
}: StepIndicatorProps) {
  if (orientation === "vertical") {
    return (
      <ol data-steps="rail" data-pin="steps" className="flex flex-col">
        {steps.map((step) => {
          const active = step.number === activeStep;
          return (
            <li
              key={step.number}
              data-step={step.number}
              data-step-active={active ? "true" : "false"}
              className="relative border-l border-mist pb-24 pl-24 last:border-l-transparent last:pb-0"
            >
              <span
                aria-hidden="true"
                className={`absolute -left-4 top-4 h-8 w-8 rounded-full ${
                  active ? "bg-ember-orange" : "border border-mist bg-warm-cream"
                }`}
              />
              <div className="flex flex-col gap-4">
                <span className="text-caption text-driftwood">{step.number}</span>
                {step.href ? (
                  <Link
                    href={step.href}
                    aria-current={active ? "step" : undefined}
                    className={`text-body-sm hover:underline ${
                      active ? "font-bold text-obsidian" : "text-pebble"
                    }`}
                  >
                    {step.title}
                  </Link>
                ) : (
                  <span
                    className={`text-body-sm ${
                      active ? "font-bold text-obsidian" : "text-pebble"
                    }`}
                  >
                    {step.title}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol
      data-steps="strip"
      className="grid grid-cols-2 gap-24 sm:grid-cols-3 md:grid-cols-5"
    >
      {steps.map((step) => {
        const active = step.number === activeStep;
        return (
          <li
            key={step.number}
            data-step={step.number}
            data-step-active={active ? "true" : "false"}
            className="flex flex-col gap-8"
          >
            <span
              aria-hidden="true"
              className={`h-8 w-8 rounded-full ${
                activeStep === undefined
                  ? "border border-mist"
                  : active
                    ? "bg-ember-orange"
                    : "border border-mist"
              }`}
            />
            <span className="text-caption text-driftwood">{step.number}</span>
            {step.href ? (
              <Link
                href={step.href}
                aria-current={active ? "step" : undefined}
                className={`text-body-sm hover:underline ${
                  active ? "font-bold text-obsidian" : "text-obsidian"
                }`}
              >
                {step.title}
              </Link>
            ) : (
              <span className="text-body-sm text-obsidian">{step.title}</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
