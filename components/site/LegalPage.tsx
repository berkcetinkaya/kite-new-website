import Link from "next/link";
import { SiteContainer } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { LegalDocument } from "@/lib/i18n/types";

/**
 * Shared editorial shell for /privacy and /terms — same off-white/black/
 * kite-yellow language and type scale as the rest of the site, just
 * reading as a single long document instead of a sequence of sections.
 * Numbered headings and generous spacing carry the hierarchy; no cards,
 * no boxed callouts.
 */
export function LegalPage({
  document,
  homeHref,
  backToHome,
  lastUpdatedLabel,
  lastUpdatedDate,
}: {
  document: LegalDocument;
  homeHref: string;
  backToHome: string;
  lastUpdatedLabel: string;
  lastUpdatedDate: string;
}) {
  return (
    <section className="bg-paper py-2xl xl:py-4xl">
      <SiteContainer>
        <Link
          href={homeHref}
          className="group relative inline-flex font-body text-label font-semibold uppercase tracking-wide text-ink-soft transition-editorial hover:text-ink"
        >
          {backToHome}
          <span
            aria-hidden
            className="absolute -bottom-[3px] left-0 h-px w-full origin-left scale-x-0 bg-kite-dark transition-editorial group-hover:scale-x-100 group-focus-visible:scale-x-100"
          />
        </Link>

        <h1 className="mt-lg max-w-[22ch] font-display text-display-lg font-black uppercase leading-[0.97] text-ink xl:text-display-2xl">
          {document.title}
        </h1>

        <p className="mt-sm font-body text-label font-semibold uppercase tracking-wide text-ink-soft">
          {lastUpdatedLabel}: {lastUpdatedDate}
        </p>

        <p className="mt-lg max-w-[64ch] font-body text-body-lg text-ink-soft xl:mt-xl">{document.intro}</p>

        <div className="mt-2xl xl:mt-3xl">
          {document.sections.map((section, i) => (
            <div
              key={section.heading}
              className={cn("border-t border-line py-lg xl:py-xl", i === 0 && "border-t-2")}
            >
              <h2 className="font-display text-display-sm font-black uppercase leading-[1.05] text-ink xl:text-display-md">
                {section.heading}
              </h2>

              <div className="mt-sm max-w-[64ch] space-y-sm">
                {section.blocks.map((block, bi) => {
                  if (block.type === "paragraph") {
                    return (
                      <p key={bi} className="font-body text-body-md text-ink-soft">
                        {block.text}
                      </p>
                    );
                  }

                  if (block.type === "list") {
                    return (
                      <ul key={bi} className="space-y-2xs">
                        {block.items.map((item) => (
                          <li key={item} className="flex gap-2xs font-body text-body-md text-ink-soft">
                            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-kite" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <div key={bi} className="font-body text-body-md text-ink">
                      {block.items.map((line, li) =>
                        line.includes("@") ? (
                          <p key={li}>
                            <a href={`mailto:${line}`} className="transition-editorial hover:text-kite-dark">
                              {line}
                            </a>
                          </p>
                        ) : (
                          <p key={li}>{line}</p>
                        ),
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
