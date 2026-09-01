import { SiteContainer } from "@/components/ui";
import { cn } from "@/lib/cn";

interface Segment {
  text: string;
  accent?: boolean;
}

interface Layer {
  number: string;
  name: string;
  mainQuestion: string[];
  signals: string[];
  meaning: string;
  diagnosticQuestions: string[];
  smallLine: Segment[];
  variant: "grid" | "typographic" | "journey" | "metric" | "lifecycle";
  dark?: boolean;
}

/**
 * One measurement layer's signal list — the one part of the row that
 * actually changes shape per `variant`, so five layers read as one system
 * with rhythm rather than five repeats of one template:
 *  - grid: a tight multi-column signal board (Media).
 *  - typographic: signals run as flowing inline text, not a list (Creative).
 *  - journey: a small connected step-line stands in for the on-page path (Website).
 *  - metric: two of the layer's own metric names blow up to display scale as graphic content — never attached to a fake value (Conversion).
 *  - lifecycle: signals read as a small cyclical sequence (Customer).
 */
function SignalDisplay({ signals, variant, dark }: { signals: string[]; variant: Layer["variant"]; dark?: boolean }) {
  const soft = dark ? "text-paper-soft" : "text-ink-soft";
  const rule = dark ? "border-[rgba(242,238,228,0.16)]" : "border-line-soft";

  if (variant === "metric") {
    const [first, second] = signals;
    return (
      <div aria-hidden className="flex flex-wrap items-baseline gap-x-md gap-y-2xs">
        {[first, second].filter(Boolean).map((metric) => (
          <span key={metric} className="font-display text-display-md font-black uppercase leading-none text-kite xl:text-display-lg">
            {metric}
          </span>
        ))}
      </div>
    );
  }

  if (variant === "journey") {
    return (
      <div className="flex flex-wrap items-center gap-x-2xs gap-y-2xs">
        {signals.map((signal, i) => (
          <span key={signal} className="flex items-center gap-2xs">
            {i > 0 && (
              <span aria-hidden className={cn("h-px w-4", dark ? "bg-[rgba(242,238,228,0.3)]" : "bg-line")} />
            )}
            <span className={cn("font-body text-label", soft)}>{signal}</span>
          </span>
        ))}
      </div>
    );
  }

  if (variant === "lifecycle") {
    return (
      <div className="flex flex-wrap items-baseline gap-x-2xs gap-y-2xs font-body text-label">
        {signals.map((signal, i, arr) => (
          <span key={signal} className="flex items-baseline gap-2xs">
            {i > 0 && (
              <span aria-hidden className={soft}>
                →
              </span>
            )}
            <span className={soft}>{signal}</span>
            {i === arr.length - 1 && (
              <span aria-hidden className="text-kite">
                ↺
              </span>
            )}
          </span>
        ))}
      </div>
    );
  }

  if (variant === "typographic") {
    return (
      <p className={cn("font-body text-label", soft)}>
        {signals.map((signal, i) => (
          <span key={signal}>
            {i > 0 && " · "}
            {signal}
          </span>
        ))}
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-x-md gap-y-2xs xl:grid-cols-3">
      {signals.map((signal) => (
        <li key={signal} className={cn("border-t pt-3xs font-body text-label transition-editorial", rule, soft)}>
          {signal}
        </li>
      ))}
    </ul>
  );
}

/**
 * One measurement layer. LEFT rail carries the number/name; CENTER carries
 * the main question and what it tells us; RIGHT carries signals (see
 * SignalDisplay) and the small diagnostic questions, closed by the layer's
 * small line. All hover behavior is plain CSS `group`/`group-hover`.
 */
export function MeasurementLayer({ layer, isLast }: { layer: Layer; isLast: boolean }) {
  const { dark, variant } = layer;
  const text = dark ? "text-paper" : "text-ink";
  const soft = dark ? "text-paper-soft" : "text-ink-soft";
  const rule = dark ? "border-[rgba(242,238,228,0.16)]" : "border-line-soft";

  return (
    <div className={cn("group relative border-t border-line", dark && "bg-ink", isLast && "border-b")}>
      <SiteContainer>
        <div className="relative">
          {/* Marker on the section-wide connecting rail (see Measurement.tsx's overlay line) —
              a small fixed offset (not -left-lg) so it lands inside SiteContainer's own gutter
              rather than relying on this row having its own pl-lg to cancel out against, which
              would double the offset and push it off-screen (this row has no pl-lg of its own). */}
          <span
            aria-hidden
            className={cn(
              "absolute -left-[12px] top-xl h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-kite transition-editorial",
              dark ? "bg-ink" : "bg-paper",
              "group-hover:scale-125 group-hover:bg-kite",
            )}
          />
          <div className="grid grid-cols-1 gap-y-md py-lg xl:grid-cols-12 xl:items-start xl:gap-x-lg xl:py-xl">
            <div className="xl:col-span-2">
              <span
                className={cn(
                  "font-display text-display-md font-extrabold uppercase tabular-nums leading-none transition-editorial",
                  dark ? "text-paper-soft group-hover:text-kite" : "text-ink-soft group-hover:text-kite",
                )}
              >
                {layer.number}
              </span>
              <span className={cn("mt-sm block font-body text-[10px] font-semibold uppercase tracking-widest", dark ? "text-paper-soft" : "text-ink-soft")}>
                {layer.name}
              </span>
            </div>

            <div className="xl:col-span-4">
              <h3 className={cn("font-display text-display-sm font-black uppercase leading-[1.08] xl:text-display-md", text)}>
                {layer.mainQuestion.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h3>
            </div>

            <div className={cn("xl:col-span-6 xl:border-l xl:pl-lg", rule)}>
              <SignalDisplay signals={layer.signals} variant={variant} dark={dark} />

              <p className={cn("mt-md max-w-[36ch] font-body text-body-md transition-editorial", soft, "group-hover:opacity-100")}>
                {layer.meaning}
              </p>

              <ul className={cn("mt-md space-y-2xs border-t pt-sm font-body text-label italic", rule, soft)}>
                {layer.diagnosticQuestions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>

              <p className={cn("mt-md font-display text-body-lg font-black uppercase leading-[1.15]", text)}>
                {layer.smallLine.map((segment, i) => (
                  <span key={i} className={cn("block", segment.accent && "text-kite")}>
                    {segment.text}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </SiteContainer>
    </div>
  );
}
