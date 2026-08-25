import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer } from "@/components/ui";
import { cn } from "@/lib/cn";
import { CapabilityIndex } from "./CapabilityIndex";

/**
 * Selected Work's own bottom hint ("003 / NELER YAPIYORUZ") is this
 * section's opening marker — see SelectedWork.tsx. Same reasoning as
 * Phase 4: no repeated SectionLabel here.
 */
export async function Capabilities() {
  const dict = await getDictionary();
  const { capabilities } = dict;

  return (
    <section className="relative bg-paper pt-xl xl:pt-2xl">
      <SiteContainer>
        <p className="max-w-[24ch] font-display text-display-sm font-black uppercase leading-tight text-ink-soft">
          {capabilities.supportingLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>

        <div className="mt-xl xl:mt-2xl">
          <CapabilityIndex items={capabilities.items} />
        </div>

        <div className="mt-2xl border-t border-line pt-xl xl:mt-3xl xl:pt-2xl">
          <p className="max-w-[46ch] font-body text-label font-semibold uppercase tracking-wide text-ink-soft">
            {capabilities.microCopy}
          </p>
          <p className="mt-md font-display text-display-lg font-black uppercase leading-[0.95] text-ink xl:text-display-2xl">
            {capabilities.closingStatement.map((group, i) => (
              <span key={i} className={cn("block", group.accent && "text-kite")}>
                {group.lines.map((line, j) => (
                  <span key={j} className="block">
                    {line}
                  </span>
                ))}
              </span>
            ))}
          </p>
        </div>
      </SiteContainer>

      <div className="mt-2xl border-t border-line xl:mt-3xl">
        <SiteContainer className="flex items-center justify-between py-xs">
          <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft">
            {capabilities.nextSectionHint.number} / {capabilities.nextSectionHint.title}
          </span>
          <span aria-hidden className="text-ink-soft">
            ↓
          </span>
        </SiteContainer>
      </div>
    </section>
  );
}
