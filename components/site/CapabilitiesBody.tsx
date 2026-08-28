import { CapabilityCollage, CapabilityCollageMobile, HangingTag, deriveCards } from "./CapabilityCollage";
import { CapabilityIndex } from "./CapabilityIndex";

interface CapabilityItem {
  number: string;
  title: string;
  services: string[];
}

interface CapabilitiesBodyProps {
  supportingLines: string[];
  items: CapabilityItem[];
  agencyLine: string;
  locationLine: string;
  tagLine: string;
}

export function CapabilitiesBody({
  supportingLines,
  items,
  agencyLine,
  locationLine,
  tagLine,
}: CapabilitiesBodyProps) {
  const disciplineNames = deriveCards(items)
    .map((card) => card.name)
    .filter(Boolean);

  return (
    <>
      <div className="flex flex-col xl:flex-row xl:items-start xl:gap-2xl">
        <div className="xl:w-[280px] xl:shrink-0">
          <h2 className="max-w-[22ch] font-display text-display-sm font-black uppercase leading-tight text-ink-soft">
            {supportingLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>

          <div className="mt-lg xl:mt-2xl">
            <p className="font-body text-label font-semibold uppercase tracking-wide text-ink">
              {agencyLine}
              <span aria-hidden className="mt-3xs block h-[2px] w-10 bg-kite" />
            </p>
            <p className="mt-2xs max-w-[20ch] font-body text-label text-ink-soft">{disciplineNames.join(" • ")}</p>
          </div>

          <HangingTag names={disciplineNames} tagLine={tagLine} className="mt-2xl hidden xl:block" />
        </div>

        <div className="mt-xl xl:mt-0 xl:min-w-0 xl:flex-1">
          <CapabilityCollage items={items} agencyLine={agencyLine} locationLine={locationLine} />
          <CapabilityCollageMobile items={items} agencyLine={agencyLine} locationLine={locationLine} />
        </div>
      </div>

      <div className="mt-xl xl:mt-2xl">
        <CapabilityIndex items={items} />
      </div>
    </>
  );
}
