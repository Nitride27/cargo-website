interface ScrollProgressRailProps {
  current: string;
  total: string;
  label?: string;
  /**
   * Live 0–1 scroll progress driven by a ScrollTrigger onUpdate (Stage 4
   * pinned sequence). When provided it overrides the static current/total
   * fill; the count text still renders from `current`/`total`.
   */
  progress?: number;
}

/**
 * "01/05" + progress-dash indicator. Static by default; the pinned
 * step-journey scroller drives `current` + `progress` live via onUpdate.
 */
export default function ScrollProgressRail({
  current,
  total,
  label,
  progress,
}: ScrollProgressRailProps) {
  const totalSteps = Number.parseInt(total, 10) || 5;
  const currentStep = Number.parseInt(current, 10) || 1;
  const filled =
    progress == null
      ? currentStep
      : Math.round(Math.min(1, Math.max(0, progress)) * totalSteps);
  return (
    <div data-progress-rail="root" className="flex flex-col gap-8">
      <p data-progress-rail="count" className="text-body-sm text-current">
        {current} / {total}
        {label ? <span className="text-caption"> — {label}</span> : null}
      </p>
      <div
        data-progress-rail="dashes"
        className="flex gap-4"
        aria-hidden="true"
      >
        {Array.from({ length: totalSteps }, (_, i) => (
          <span
            key={i}
            data-progress-rail={i < filled ? "dash-active" : "dash"}
            className={`h-4 w-24 rounded-full ${
              i < filled ? "bg-current" : "bg-mist"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
