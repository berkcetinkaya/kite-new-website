import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer } from "@/components/ui";
import { MeasurementLayer } from "./MeasurementLayer";
import { cn } from "@/lib/cn";

/**
 * "011 / Neye Bakıyoruz?" — five measurement layers (Media → Creative →
 * Website → Conversion → Customer), connected by one continuous kite-
 * yellow rail rather than read as five isolated dashboards. The rail is an
 * absolutely-positioned overlay reusing the exact `SiteContainer > relative
 * pl-lg > -left-lg` shape each MeasurementLayer uses for its own marker, so
 * the line's x-position matches every row's marker exactly regardless of
 * viewport width — including layer 04's full-bleed dark background, which
 * the line simply passes over (it's a later, higher sibling in the DOM).
 * A small loop note stands in for the Customer → Media feedback loop
 * instead of a literal diagram, same restraint as system.tsx's return path.
 */
export async function Measurement() {
  const dict = await getDictionary();
  const { measurement } = dict;

  return (
    <section className="relative bg-paper">
      <SiteContainer>
        <div className="pt-2xl xl:pt-3xl">
          <div className="flex items-baseline gap-sm">
            <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft">
              {measurement.folioNumber}
            </span>
            <span className="font-body text-label font-semibold uppercase tracking-widest text-ink-soft">
              {measurement.title}
            </span>
          </div>

          <h2 className="mt-md max-w-[20ch] font-display text-display-md font-black uppercase leading-[1.08] text-ink xl:text-display-xl xl:leading-[1.1]">
            {measurement.introLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-md max-w-[52ch] font-body text-body-md text-ink-soft xl:mt-lg">{measurement.introSupport}</p>
        </div>
      </SiteContainer>

      <div className="relative mt-xl xl:mt-2xl">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <SiteContainer className="h-full">
            <div className="relative h-full">
              <span className="absolute -left-[12px] top-0 bottom-0 w-[2px] bg-kite" />
            </div>
          </SiteContainer>
        </div>

        {measurement.layers.map((layer, i) => (
          <MeasurementLayer key={layer.number} layer={layer} isLast={i === measurement.layers.length - 1} />
        ))}

        <SiteContainer>
          <div className="relative py-md">
            <span aria-hidden className="absolute -left-[12px] top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-kite" />
            <p className="font-body text-[11px] font-semibold uppercase tracking-widest text-kite">{measurement.loopNote}</p>
          </div>
        </SiteContainer>
      </div>

      <SiteContainer>
        <div className="max-w-[24ch] border-t border-line py-2xl xl:py-3xl">
          <p className="font-display text-display-md font-black uppercase leading-[1.08] text-ink xl:text-display-lg">
            {measurement.keyStatement.map((segment, i) => (
              <span key={i} className={cn("block", segment.accent && "text-kite")}>
                {segment.text}
              </span>
            ))}
          </p>
        </div>
      </SiteContainer>

      <SiteContainer>
        <div className="max-w-[28ch] border-t border-line py-2xl xl:py-3xl">
          <p className="font-display text-display-md font-black uppercase leading-[1.08] text-ink xl:text-display-lg">
            {measurement.ending.map((segment, i) => (
              <span key={i} className={cn("block", segment.accent && "text-kite")}>
                {segment.text}
              </span>
            ))}
          </p>
          <p className="mt-sm font-body text-body-md text-ink-soft">{measurement.endingNote}</p>
        </div>
      </SiteContainer>
    </section>
  );
}
