import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import {
  SiteContainer,
  Section,
  SectionLabel,
  EditorialGrid,
  EditorialFrame,
  PrimaryButton,
  TextLink,
  Divider,
  LanguageSwitcher,
  Logo,
} from "@/components/ui";

const displaySizeClass: Record<string, string> = {
  "display-2xl": "text-display-2xl",
  "display-xl": "text-display-xl",
  "display-lg": "text-display-lg",
  "display-md": "text-display-md",
  "display-sm": "text-display-sm",
};

const bodySizeClass: Record<string, string> = {
  "body-lg": "text-body-lg",
  "body-md": "text-body-md",
  "body-sm": "text-body-sm",
  label: "text-label uppercase tracking-widest",
  eyebrow: "text-eyebrow uppercase tracking-widest",
};

const spacingTokens = [
  { token: "3xs", range: "4–6px" },
  { token: "2xs", range: "8–12px" },
  { token: "xs", range: "12–18px" },
  { token: "sm", range: "16–24px" },
  { token: "md", range: "24–36px" },
  { token: "lg", range: "36–60px" },
  { token: "xl", range: "56–100px" },
  { token: "2xl", range: "80–152px" },
  { token: "3xl", range: "112–216px" },
  { token: "4xl", range: "144–280px" },
] as const;

const spacingWidthClass: Record<string, string> = {
  "3xs": "w-3xs",
  "2xs": "w-2xs",
  xs: "w-xs",
  sm: "w-sm",
  md: "w-md",
  lg: "w-lg",
  xl: "w-xl",
  "2xl": "w-2xl",
  "3xl": "w-3xl",
  "4xl": "w-4xl",
};

export default async function DesignSystemPreviewPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const p = dict.designSystemPreview;

  return (
    <>
      {/* Preview chrome — intentionally minimal, NOT the future site header. */}
      <div className="border-b border-line">
        <SiteContainer className="flex items-center justify-between py-xs">
          <div className="flex items-center gap-xs">
            <Logo size={36} />
            <span className="font-body text-eyebrow font-semibold uppercase tracking-widest text-ink-soft">
              {p.eyebrow}
            </span>
          </div>
          <LanguageSwitcher currentLocale={locale} />
        </SiteContainer>
      </div>

      <main id="content">
        {/* Intro */}
        <Section border="none" spacing="loose">
          <SiteContainer>
            <SectionLabel number="000" title={p.eyebrow} className="mb-md" />
            <h1 className="max-w-[16ch] font-display text-display-xl font-black uppercase text-ink">
              {p.title}
            </h1>
            <p className="mt-md max-w-[52ch] text-body-lg text-ink-soft">{p.subtitle}</p>
            <div className="mt-lg inline-block border border-dashed border-line px-sm py-xs">
              <p className="text-body-sm text-ink-soft">{p.statusNote}</p>
            </div>
          </SiteContainer>
        </Section>

        {/* 001 — Typography */}
        <Section spacing="loose">
          <SiteContainer>
            <SectionLabel number="001" title={p.sectionLabels.typography} rule className="mb-lg" />

            <p lang="en" className="mb-2xs text-label font-semibold uppercase tracking-widest text-ink-soft">
              Display — Big Shoulders Display / 700–900
            </p>
            <div className="mb-xl border border-line divide-y divide-line-soft">
              {(
                [
                  ["display-2xl", p.displaySampleHeadline],
                  ["display-xl", p.displaySampleSubline],
                  ["display-lg", "AaBbCc 001"],
                  ["display-md", "AaBbCc 001"],
                  ["display-sm", "AaBbCc 001"],
                ] as const
              ).map(([token, sample]) => (
                <div key={token} className="flex flex-col gap-2xs px-sm py-sm md:flex-row md:items-baseline md:justify-between">
                  <span
                    className={`${displaySizeClass[token]} min-w-0 break-words font-display font-black uppercase text-ink md:mr-md`}
                  >
                    {sample}
                  </span>
                  <span lang="en" className="shrink-0 font-body text-eyebrow uppercase tracking-widest text-ink-soft">
                    {token}
                  </span>
                </div>
              ))}
            </div>

            <p lang="en" className="mb-2xs text-label font-semibold uppercase tracking-widest text-ink-soft">
              Body / UI — Inter / 400–700
            </p>
            <div className="border border-line divide-y divide-line-soft">
              {(
                [
                  ["body-lg", p.bodySampleParagraph],
                  ["body-md", p.bodySampleParagraph],
                  ["body-sm", p.bodySampleParagraph],
                  ["label", p.sectionLabels.numbering],
                  ["eyebrow", p.eyebrow],
                ] as const
              ).map(([token, sample]) => (
                <div key={token} className="flex flex-col gap-2xs px-sm py-sm md:flex-row md:items-baseline md:justify-between">
                  <span className={`${bodySizeClass[token]} max-w-[48ch] text-ink`}>{sample}</span>
                  <span className="shrink-0 font-body text-eyebrow uppercase tracking-widest text-ink-soft">
                    {token}
                  </span>
                </div>
              ))}
            </div>
          </SiteContainer>
        </Section>

        {/* 002 — Color system */}
        <Section spacing="loose">
          <SiteContainer>
            <SectionLabel number="002" title={p.sectionLabels.color} rule className="mb-lg" />
            <EditorialGrid columns={{ base: 2, md: 3, xl: 6 }}>
              {[
                { name: "Paper", hex: "#F2EEE4", className: "bg-paper" },
                { name: "Paper Dim", hex: "#E9E2D2", className: "bg-paper-dim" },
                { name: "Ink", hex: "#0B0B0B", className: "bg-ink" },
                { name: "Kite Yellow", hex: "#EFB004", className: "bg-kite" },
                { name: "Kite Yellow Dark", hex: "#D39C03", className: "bg-kite-dark" },
                { name: "Line", hex: "92% ink", className: "bg-ink" },
              ].map((c) => (
                <div key={c.name}>
                  <div className={`aspect-square border border-line ${c.className}`} />
                  <p lang="en" className="mt-2xs text-label font-semibold uppercase tracking-widest text-ink">
                    {c.name}
                  </p>
                  <p className="text-body-sm text-ink-soft">{c.hex}</p>
                </div>
              ))}
            </EditorialGrid>
            <p className="mt-md max-w-[60ch] text-body-sm text-ink-soft">
              Kite Yellow is an accent, not a background — reserved for CTAs, single emphasized
              words and small interaction cues.
            </p>
          </SiteContainer>
        </Section>

        {/* 003 — Paper texture */}
        <Section spacing="loose">
          <SiteContainer>
            <SectionLabel number="003" title={p.sectionLabels.texture} rule className="mb-lg" />
            <div className="grid gap-sm md:grid-cols-2">
              <div className="border border-line bg-paper p-md">
                <p lang="en" className="text-label font-semibold uppercase tracking-widest text-ink">
                  Active site-wide · 0.07 opacity
                </p>
                <p className="mt-2xs text-body-sm text-ink-soft">
                  Applied once, fixed, via <code className="text-body-sm">.paper-texture</code> on{" "}
                  <code className="text-body-sm">&lt;body&gt;</code>. Deliberately near-invisible at
                  normal viewing distance.
                </p>
              </div>
              <div className="paper-texture-swatch border border-line bg-paper p-md">
                <p lang="en" className="text-label font-semibold uppercase tracking-widest text-ink">
                  Magnified for review · 0.14 opacity
                </p>
                <p className="mt-2xs text-body-sm text-ink-soft">
                  Demo-only variant so the grain can be inspected without zooming the browser.
                </p>
              </div>
            </div>
          </SiteContainer>
        </Section>

        {/* 004 — Buttons */}
        <Section spacing="loose">
          <SiteContainer>
            <SectionLabel number="004" title={p.sectionLabels.buttons} rule className="mb-lg" />
            <div className="flex flex-wrap items-center gap-sm">
              <PrimaryButton href="#content">{p.primaryCtaLabel}</PrimaryButton>
              <PrimaryButton href="#content" arrow={false}>
                {p.primaryCtaLabel} — NO ARROW
              </PrimaryButton>
            </div>
            <div className="mt-sm border border-line bg-ink p-lg">
              <PrimaryButton href="#content">{p.primaryCtaLabel}</PrimaryButton>
              <p className="mt-sm text-body-sm text-paper opacity-70">On dark backgrounds.</p>
            </div>
          </SiteContainer>
        </Section>

        {/* 005 — Text links */}
        <Section spacing="loose">
          <SiteContainer>
            <SectionLabel number="005" title={p.sectionLabels.links} rule className="mb-lg" />
            <div className="flex flex-wrap items-center gap-lg">
              <TextLink href="#content">{p.secondaryCtaLabel}</TextLink>
              <TextLink href="#content" arrow={false}>
                {p.secondaryCtaLabel} — NO ARROW
              </TextLink>
            </div>
          </SiteContainer>
        </Section>

        {/* 006 — Editorial numbering */}
        <Section spacing="loose">
          <SiteContainer>
            <SectionLabel number="006" title={p.sectionLabels.numbering} rule className="mb-lg" />
            <div className="flex flex-col gap-md">
              <div>
                <SectionLabel number="007" title={p.sectionLabels.borders} />
                <p className="mt-2xs text-body-sm text-ink-soft">
                  {"<SectionLabel number=\"007\" title=\"...\" />"}
                </p>
              </div>
              <Divider variant="soft" />
              <div>
                <SectionLabel number="008" title={p.sectionLabels.spacing} rule />
                <p className="mt-2xs text-body-sm text-ink-soft">
                  {"<SectionLabel number=\"008\" title=\"...\" rule />"}
                </p>
              </div>
              <Divider variant="soft" />
              <div>
                <SectionLabel number="009" />
                <p className="mt-2xs text-body-sm text-ink-soft">
                  {"<SectionLabel number=\"009\" />"}
                </p>
              </div>
            </div>
          </SiteContainer>
        </Section>

        {/* 007 — Borders & editorial framing */}
        <Section spacing="loose">
          <SiteContainer>
            <SectionLabel number="007" title={p.sectionLabels.borders} rule className="mb-lg" />
            <div className="mb-lg flex flex-wrap items-center gap-lg">
              <div className="flex items-center gap-xs">
                <div className="h-16 w-16 border border-line" />
                <span lang="en" className="text-label uppercase tracking-widest text-ink-soft">Line</span>
              </div>
              <div className="flex items-center gap-xs">
                <div className="h-16 w-16 border border-line-soft" />
                <span lang="en" className="text-label uppercase tracking-widest text-ink-soft">Line Soft</span>
              </div>
              <div className="flex items-center gap-xs">
                <div className="h-16 w-16 border-2 border-line" />
                <span className="text-label uppercase tracking-widest text-ink-soft">2px</span>
              </div>
            </div>
            <div className="grid gap-sm md:grid-cols-2">
              <EditorialFrame caption="KITE GROWTH AGENCY / IMAGE PLACEHOLDER" captionVariant="dashed">
                <div className="flex aspect-[4/3] items-center justify-center bg-paper-dim">
                  <span lang="en" className="text-label uppercase tracking-widest text-ink-soft">
                    Media placeholder
                  </span>
                </div>
              </EditorialFrame>
              <EditorialFrame caption="SOLID CAPTION" captionVariant="solid">
                <div className="flex aspect-[4/3] items-center justify-center bg-paper-dim">
                  <span lang="en" className="text-label uppercase tracking-widest text-ink-soft">
                    Media placeholder
                  </span>
                </div>
              </EditorialFrame>
            </div>
          </SiteContainer>
        </Section>

        {/* 008 — Spacing system */}
        <Section spacing="loose">
          <SiteContainer>
            <SectionLabel number="008" title={p.sectionLabels.spacing} rule className="mb-lg" />
            <div className="flex flex-col gap-xs">
              {spacingTokens.map((s) => (
                <div key={s.token} className="flex items-center gap-sm">
                  <span className="w-10 shrink-0 text-label uppercase tracking-widest text-ink-soft">
                    {s.token}
                  </span>
                  <div className={`h-3 bg-kite ${spacingWidthClass[s.token]}`} />
                  <span className="shrink-0 text-body-sm text-ink-soft">{s.range}</span>
                </div>
              ))}
            </div>
          </SiteContainer>
        </Section>

        {/* 009 — Grid behavior */}
        <Section spacing="loose" border="both">
          <SiteContainer>
            <SectionLabel number="009" title={p.sectionLabels.grid} rule className="mb-lg" />
            <p className="mb-sm text-body-sm text-ink-soft">4 columns → 6 columns (md) → 12 columns (xl). Resize to see the shift.</p>
            <EditorialGrid columns={{ base: 4, md: 6, xl: 12 }}>
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="flex aspect-square items-center justify-center border border-line-soft text-label text-ink-soft"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              ))}
            </EditorialGrid>
          </SiteContainer>
        </Section>

        {/* Closing strip — not a footer */}
        <div className="py-lg">
          <SiteContainer className="flex flex-col items-center gap-2xs text-center">
            <Logo size={28} />
            <p className="text-body-sm text-ink-soft">
              {dict.brand.location} · {dict.brand.globalNote}
            </p>
            <p lang="en" className="text-eyebrow uppercase tracking-widest text-ink-soft">
              Foundation phase — homepage sections to follow
            </p>
          </SiteContainer>
        </div>
      </main>
    </>
  );
}
