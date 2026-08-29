import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer } from "@/components/ui";
import { SystemCanvas } from "./SystemCanvas";
import { cn } from "@/lib/cn";

/**
 * "006 / Sistem" — answers 005's closing problem head-on: creative, media,
 * web, data and CRM don't talk to each other, so this section is the loop
 * that connects them. Two off-white editorial layers (intro, then the
 * closing statement) bracket one black interruption (SystemCanvas) — the
 * same paper → black → paper rhythm as 004/005, so the black canvas reads
 * as a genuine technical surface rather than another chapter. There's no
 * hint bar left over from 005 to open this section, so — same reasoning as
 * Soruşturma and Teşhis — it renders its own inline "006" label.
 */
export async function System() {
  const dict = await getDictionary();
  const { system } = dict;

  return (
    <section className="relative bg-paper">
      <SiteContainer>
        <div className="pt-2xl xl:pt-3xl">
          <div className="flex items-baseline gap-sm">
            <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft">
              {system.folioNumber}
            </span>
            <span className="font-body text-label font-semibold uppercase tracking-widest text-ink-soft">{system.title}</span>
          </div>

          <h2 className="mt-md max-w-[20ch] font-display text-display-md font-black uppercase leading-[1.05] text-ink xl:text-display-xl xl:leading-[1.08]">
            {system.introLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-md max-w-[52ch] font-body text-body-md text-ink-soft xl:mt-lg">{system.introSupport}</p>
        </div>
      </SiteContainer>

      <div className="mt-xl xl:mt-2xl">
        <SystemCanvas canvasDetails={system.canvasDetails} stages={system.stages} loopNote={system.loopNote} />
      </div>

      <SiteContainer>
        <div className="max-w-[26ch] py-2xl xl:py-3xl">
          <p className="font-display text-display-md font-black uppercase leading-[1.05] text-ink xl:text-display-lg">
            {system.closing.map((segment, i) => (
              <span key={i} className={cn("block", segment.accent && "text-kite")}>
                {segment.text}
              </span>
            ))}
          </p>
          <p className="mt-sm font-body text-body-md text-ink-soft">{system.closingNote}</p>
        </div>
      </SiteContainer>
    </section>
  );
}
