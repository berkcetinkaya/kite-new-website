import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer } from "@/components/ui";
import { PrincipleRow } from "./PrincipleRow";
import { cn } from "@/lib/cn";

/**
 * "010 / Bazı Şeylere İnanıyoruz" — eight editorial principles, not a
 * company-values page: no icons, no photography, no eight identical cards.
 * Purely typographic, carried by PrincipleRow's three controlled
 * treatments (see that component) with principles 01 and 04 as the
 * section's two dark inversions. There's no hint bar left over from 009 to
 * open this section with, so it renders its own inline "010" label, same
 * reasoning as every section since Soruşturma.
 */
export async function Principles() {
  const dict = await getDictionary();
  const { principles } = dict;

  return (
    <section className="relative bg-paper">
      <SiteContainer>
        <div className="pt-2xl xl:pt-3xl">
          <div className="flex items-baseline gap-sm">
            <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft">
              {principles.folioNumber}
            </span>
            <span className="font-body text-label font-semibold uppercase tracking-widest text-ink-soft">
              {principles.title}
            </span>
          </div>

          <h2 className="mt-md max-w-[22ch] font-display text-display-md font-black uppercase leading-[1.08] text-ink xl:text-display-xl xl:leading-[1.1]">
            {principles.introLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-md max-w-[52ch] font-body text-body-md text-ink-soft xl:mt-lg">{principles.introSupport}</p>
        </div>
      </SiteContainer>

      <div className="mt-xl xl:mt-2xl">
        {principles.items.map((item, i) => (
          <PrincipleRow key={item.number} item={item} total={principles.items.length} isLast={i === principles.items.length - 1} />
        ))}
      </div>

      <SiteContainer>
        <div className={cn("max-w-[30ch] py-2xl xl:py-3xl")}>
          <p className="font-display text-display-md font-black uppercase leading-[1.08] text-ink xl:text-display-lg">
            {principles.closing.map((segments, i) => (
              <span key={i} className="block">
                {segments.map((segment, j) => (
                  <span key={j} className={segment.accent ? "text-kite" : undefined}>
                    {segment.text}
                  </span>
                ))}
              </span>
            ))}
          </p>
        </div>
      </SiteContainer>
    </section>
  );
}
