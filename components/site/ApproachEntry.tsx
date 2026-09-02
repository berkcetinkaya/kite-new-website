import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer } from "@/components/ui";
import { EditorialOverlay } from "./EditorialOverlay";
import { Diagnosis } from "./Diagnosis";
import { System } from "./System";
import { FirstMonth } from "./FirstMonth";
import { Measurement } from "./Measurement";

/**
 * The homepage's single entry point into the second editorial layer.
 * Diagnosis, System, First 30 Days and Measurement stopped appearing as
 * sequential homepage sections (see the information-architecture reorg),
 * but none of that content was rewritten, shortened or deleted — each is
 * still the exact same async section component it always was, rendered
 * once here and handed to EditorialOverlay as pre-rendered panels that
 * only ever toggle visibility.
 */
export async function ApproachEntry() {
  const dict = await getDictionary();
  const { approach, ui } = dict;

  const panels = [
    <Diagnosis key="diagnosis" />,
    <System key="system" />,
    <FirstMonth key="firstMonth" />,
    <Measurement key="measurement" />,
  ];

  return (
    <div className="relative bg-ink py-xl xl:py-2xl">
      <SiteContainer>
        <EditorialOverlay
          label={approach.label}
          closeLabel={ui.closeLabel}
          topics={approach.topics}
          panels={panels}
          triggerClassName="font-display text-display-sm font-black uppercase leading-none text-paper transition-editorial hover:text-kite xl:text-display-md"
        />
      </SiteContainer>
    </div>
  );
}
