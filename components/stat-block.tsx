interface StatBlockProps {
  value: string;
  label: string;
}

/** Big number + label (120+, 10K+, 99.5%, 24/7). Copy comes from callers. */
export default function StatBlock({ value, label }: StatBlockProps) {
  return (
    <div data-stat="root" className="flex flex-col gap-4">
      <p
        data-stat="value"
        className="text-heading-lg font-bold text-obsidian leading-[var(--leading-heading-lg)] tracking-[var(--tracking-heading-lg)]"
      >
        {value}
      </p>
      <p data-stat="label" className="text-body-sm text-pebble">
        {label}
      </p>
    </div>
  );
}
