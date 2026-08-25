import { cn } from "@/lib/cn";

interface SectionLabelProps {
  /** Editorial index, e.g. "001" — not a heading level, purely a kicker. */
  number: string;
  title?: string;
  className?: string;
  /** Extends a hairline rule after the label, e.g. the hero's "001 ——" treatment. */
  rule?: boolean;
}

export function SectionLabel({ number, title, className, rule = false }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-sm", className)}>
      <span className="font-display text-display-sm font-extrabold tabular-nums leading-none text-ink">
        {number}
      </span>
      {title && (
        <span className="font-body text-label font-semibold uppercase tracking-widest text-ink-soft">
          {title}
        </span>
      )}
      {rule && <span aria-hidden className="h-px flex-1 bg-line" />}
    </div>
  );
}
