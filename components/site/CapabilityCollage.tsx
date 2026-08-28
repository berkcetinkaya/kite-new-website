import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

interface CapabilityItem {
  number: string;
  title: string;
  services: string[];
}

interface Card {
  number: string;
  name: string;
  services: string[];
}

/**
 * The real "STRATEJİ & KREATİF" row covers two disciplines, so it becomes
 * two specimen cards sharing one folio number; every other row maps to a
 * single card using its own first discipline word. Six cards total, all
 * text pulled straight from production content — nothing invented.
 */
export function deriveCards(items: CapabilityItem[]): Card[] {
  const [first, ...rest] = items;
  if (!first) return [];
  const [nameA, nameB] = first.title.split(" & ");
  const splitAt = Math.ceil(first.services.length / 2);

  return [
    { number: first.number, name: nameA ?? first.title, services: first.services.slice(0, splitAt) },
    { number: first.number, name: nameB ?? "", services: first.services.slice(splitAt) },
    ...rest.map((item) => ({
      number: item.number,
      name: item.title.split(" & ")[0] ?? item.title,
      services: item.services,
    })),
  ];
}

const gridPaperStyle = {
  backgroundImage:
    "linear-gradient(var(--color-line-soft) 1px, transparent 1px), linear-gradient(90deg, var(--color-line-soft) 1px, transparent 1px)",
  backgroundSize: "10px 10px",
};

/** A literal pixel-space placement — this collage is a fixed physical arrangement, not a fluid grid. */
interface Area {
  x: number;
  y: number;
  w: number;
  h: number;
}

function areaStyle(area: Area, rotate: number): CSSProperties {
  return {
    left: `${area.x}px`,
    top: `${area.y}px`,
    width: `${area.w}px`,
    height: `${area.h}px`,
    transform: `rotate(${rotate}deg)`,
  };
}

/** Slightly irregular corner geometry per tone, so sheets don't read as perfect rectangles. */
const EDGE_CLIPS = [
  "polygon(0.5% 1%, 99% 0%, 100% 98.5%, 1% 100%)",
  "polygon(0% 0.5%, 100% 1.5%, 99.5% 100%, 0.5% 99%)",
  "polygon(1% 0%, 100% 0.5%, 99% 99.5%, 0% 100%)",
];
const PAPER_TONES = ["bg-paper", "bg-paper-dim", "bg-paper"];
const SOFT_SHADOWS = [
  "shadow-[0_10px_22px_-10px_rgba(11,11,11,0.28),0_1px_0_rgba(11,11,11,0.14)]",
  "shadow-[0_8px_18px_-8px_rgba(11,11,11,0.32),0_1px_0_rgba(11,11,11,0.16)]",
  "shadow-[0_12px_24px_-11px_rgba(11,11,11,0.26),0_1px_0_rgba(11,11,11,0.13)]",
];

/** A near-invisible fold crease — a single soft diagonal line multiplied over the paper tone. */
function Crease({ angle = 106 }: { angle?: number }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background: `linear-gradient(${angle}deg, transparent 44%, rgba(11,11,11,0.05) 45%, rgba(255,255,255,0.35) 46%, transparent 47%)`,
        mixBlendMode: "multiply",
      }}
    />
  );
}

function Tape({ className, rotate = -8, wide = false }: { className?: string; rotate?: number; wide?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute z-40 bg-kite/45 mix-blend-multiply",
        wide ? "h-7 w-20" : "h-6 w-16",
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)`, boxShadow: "0 1px 2px rgba(11,11,11,0.15)" }}
    />
  );
}

function BinderClip({ className, dark = false, rotate = 0 }: { className?: string; dark?: boolean; rotate?: number }) {
  return (
    <span
      aria-hidden
      className={cn("absolute z-40 flex -translate-x-1/2 flex-col items-center drop-shadow-[0_3px_3px_rgba(11,11,11,0.25)]", className)}
      style={{ transform: `translateX(-50%) rotate(${rotate}deg)` }}
    >
      <span className={cn("block h-4 w-11 border", dark ? "border-ink bg-ink" : "border-ink bg-ink/90")} />
      <span className="-mt-1 block h-3.5 w-3.5 rounded-full border-2 border-ink bg-paper" style={{ marginInline: "auto" }} />
    </span>
  );
}

function Paperclip({ className, rotate = -12 }: { className?: string; rotate?: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 34"
      className={cn("absolute z-40 h-9 w-6 drop-shadow-[0_2px_2px_rgba(11,11,11,0.25)]", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
      fill="none"
      stroke="var(--color-ink-soft)"
      strokeWidth={1.6}
    >
      <path d="M6 8 V24 a4 4 0 0 0 8 0 V6 a6 6 0 0 0-12 0 V26" strokeLinecap="round" />
    </svg>
  );
}

/** Small crosshair registration mark — a restrained CSS "print imperfection". */
function RegMark({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("pointer-events-none absolute z-20 text-ink-soft/50", className)}>
      +
    </span>
  );
}

function DisciplineCard({
  number,
  name,
  services,
  area,
  rotate = 0,
  tone = 0,
  z = 10,
  annotation,
}: Card & { area: Area; rotate?: number; tone?: number; z?: number; annotation?: string }) {
  return (
    <div
      className={cn(
        "absolute border border-ink/80 p-md",
        PAPER_TONES[tone % PAPER_TONES.length],
        SOFT_SHADOWS[tone % SOFT_SHADOWS.length],
      )}
      style={{ ...areaStyle(area, rotate), zIndex: z, clipPath: EDGE_CLIPS[tone % EDGE_CLIPS.length] }}
    >
      <Crease angle={100 + tone * 8} />
      <div className="flex items-start justify-between gap-xs">
        <span className="font-display text-[2.1rem] font-black uppercase leading-[0.92] text-ink">{name}</span>
        <span className="font-body text-[11px] font-semibold tabular-nums leading-none text-ink-soft">{number}</span>
      </div>
      <span aria-hidden className="mt-xs block h-[3px] w-14 bg-kite" />
      <ul className="mt-sm space-y-2">
        {services.slice(0, 3).map((service) => (
          <li key={service} className="font-body text-[13px] leading-snug text-ink-soft">
            {service}
          </li>
        ))}
      </ul>
      {annotation && (
        <span className="absolute bottom-2 right-3 rotate-[-3deg] font-body text-[11px] italic text-ink-soft/70">
          {annotation}
        </span>
      )}
      <RegMark className="bottom-1 left-2 text-[10px]" />
    </div>
  );
}

function StickyNote({ lines, area, rotate = -3, z = 30 }: { lines: string[]; area: Area; rotate?: number; z?: number }) {
  return (
    <div
      aria-hidden
      className="absolute bg-kite p-md shadow-[0_10px_20px_-9px_rgba(11,11,11,0.4)]"
      style={{ ...areaStyle(area, rotate), zIndex: z, clipPath: "polygon(0% 1%, 100% 0%, 99% 100%, 1% 99%)" }}
    >
      <Paperclip className="-left-3 -top-4" rotate={-18} />
      {lines.map((line) => (
        <span key={line} className="block font-body text-[15px] font-semibold leading-snug text-ink">
          {line}
        </span>
      ))}
    </div>
  );
}

function Stamp({
  lines,
  area,
  rotate = 6,
  inline = false,
  z = 40,
}: {
  lines: string[];
  area?: Area;
  rotate?: number;
  inline?: boolean;
  z?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex aspect-square shrink-0 items-center justify-center rounded-full border border-dashed border-ink/70 bg-paper/90 text-center shadow-[0_6px_14px_-6px_rgba(11,11,11,0.35)]",
        inline ? "relative h-24 w-24" : "absolute",
      )}
      style={inline ? undefined : { ...(area ? areaStyle(area, rotate) : {}), zIndex: z }}
    >
      <div className="flex flex-col items-center gap-3xs px-2xs">
        <span className="block h-2 w-2 rotate-45 border border-ink" />
        {lines.map((line) => (
          <span key={line} className="font-body text-[9px] font-bold uppercase leading-tight tracking-wide text-ink">
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}

function KiteSpecimen({ agencyLine, area, rotate = 0, z = 15 }: { agencyLine: string; area: Area; rotate?: number; z?: number }) {
  return (
    <div
      className="absolute border border-ink bg-paper p-lg shadow-[0_16px_30px_-12px_rgba(11,11,11,0.35),0_1px_0_rgba(11,11,11,0.16)]"
      style={{ ...areaStyle(area, rotate), zIndex: z }}
    >
      <Crease angle={112} />
      <RegMark className="bottom-2 left-2 text-sm" />
      <RegMark className="bottom-2 right-2 text-sm" />
      <p className="text-center font-display text-[3.4rem] font-black uppercase leading-[0.85] text-ink">
        {agencyLine.split(" ")[0]}
      </p>
      <p className="mt-xs text-center font-body text-[12px] font-semibold uppercase tracking-wide text-ink-soft">
        {agencyLine.split(" ").slice(1).join(" ")}
      </p>

      <svg aria-hidden viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
        <path
          d="M 34 34 Q 50 58 50 78"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth={0.6}
          strokeDasharray="1 3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        aria-hidden
        className="absolute left-1/2 top-[78%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-kite-dark bg-kite"
      />
    </div>
  );
}

function WireframeSheet({ area, rotate = 0.8, z = 20 }: { area: Area; rotate?: number; z?: number }) {
  return (
    <div
      aria-hidden
      className="absolute border border-ink/80 bg-paper p-sm shadow-[0_12px_24px_-11px_rgba(11,11,11,0.32),0_1px_0_rgba(11,11,11,0.14)]"
      style={{ ...areaStyle(area, rotate), zIndex: z }}
    >
      <div className="flex items-center gap-2xs border-b border-line-soft pb-xs">
        <span className="h-2.5 w-2.5 rounded-full border border-ink" />
        <span className="h-2.5 w-2.5 rounded-full border border-ink" />
        <span className="h-2.5 w-2.5 rounded-full border border-ink" />
      </div>
      <div className="relative mt-sm h-24 border border-line-soft">
        <svg viewBox="0 0 40 40" preserveAspectRatio="none" className="h-full w-full">
          <line x1="0" y1="0" x2="40" y2="40" stroke="var(--color-line)" strokeWidth={0.5} vectorEffect="non-scaling-stroke" />
          <line x1="40" y1="0" x2="0" y2="40" stroke="var(--color-line)" strokeWidth={0.5} vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="mt-sm space-y-2">
        <span className="block h-1.5 w-full bg-line-soft" />
        <span className="block h-1.5 w-2/3 bg-line-soft" />
      </div>
      <span className="absolute bottom-2 right-3 rotate-[-2deg] font-body text-[11px] italic text-ink-soft/70">mobile first</span>
      <RegMark className="-bottom-3 right-1 text-base" />
    </div>
  );
}

/** Wordless bar chart — a media/performance artifact without inventing copy. */
function MediaChartSheet({ area, rotate = -1, z = 10 }: { area: Area; rotate?: number; z?: number }) {
  return (
    <div
      aria-hidden
      className="absolute flex items-end gap-2 border border-ink/80 bg-paper p-md shadow-[0_10px_22px_-10px_rgba(11,11,11,0.28),0_1px_0_rgba(11,11,11,0.14)]"
      style={{ ...areaStyle(area, rotate), zIndex: z }}
    >
      <Crease angle={95} />
      <span className="h-[34%] w-[13%] bg-ink-soft/70" />
      <span className="h-[54%] w-[13%] bg-ink-soft/70" />
      <span className="h-[24%] w-[13%] bg-kite" />
      <span className="h-[72%] w-[13%] bg-ink-soft/70" />
      <span className="h-[44%] w-[13%] bg-kite" />
      <span className="h-[60%] w-[13%] bg-ink-soft/70" />
    </div>
  );
}

/** Search-ad wireframe using MEDIA's real service names as its chip row. */
function AdMockSheet({ services, area, rotate = 0.6, z = 10 }: { services: string[]; area: Area; rotate?: number; z?: number }) {
  return (
    <div
      aria-hidden
      className="absolute border border-ink/80 bg-paper p-md shadow-[0_10px_22px_-10px_rgba(11,11,11,0.28),0_1px_0_rgba(11,11,11,0.14)]"
      style={{ ...areaStyle(area, rotate), zIndex: z }}
    >
      <div className="flex items-center gap-xs border-b border-line-soft pb-xs">
        <span className="block h-3 w-3 shrink-0 rounded-full border border-ink-soft" />
        <span className="block h-2 w-full max-w-[70%] bg-line-soft" />
      </div>
      <span className="mt-sm block h-3 w-4/5 bg-ink-soft/60" />
      <span className="mt-2 block h-1.5 w-full bg-line-soft" />
      <span className="mt-1 block h-1.5 w-3/5 bg-line-soft" />
      <div className="mt-md flex flex-wrap gap-2">
        {services.slice(0, 3).map((service) => (
          <span
            key={service}
            className="border border-line px-xs py-3xs font-body text-[10px] font-semibold uppercase leading-tight text-ink-soft"
          >
            {service}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Small icon grid ("campaign framework" sketch) — abstract, no invented copy. */
function SketchFrameworkSheet({ area, rotate = 1, z = 8 }: { area: Area; rotate?: number; z?: number }) {
  return (
    <div
      aria-hidden
      className="absolute grid grid-cols-2 gap-2 border border-ink/80 bg-paper-dim p-sm shadow-[0_8px_18px_-9px_rgba(11,11,11,0.3)]"
      style={{ ...areaStyle(area, rotate), zIndex: z }}
    >
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="flex aspect-square items-center justify-center border border-line">
          {i === 2 ? (
            <span className="font-display text-[15px] font-black text-ink">K.</span>
          ) : i % 2 === 0 ? (
            <svg viewBox="0 0 10 10" className="h-4 w-4" stroke="var(--color-line)" strokeWidth={0.8}>
              <line x1="1" y1="1" x2="9" y2="9" />
              <line x1="9" y1="1" x2="1" y2="9" />
            </svg>
          ) : null}
        </span>
      ))}
    </div>
  );
}

function CrmFlowSheet({ services, area, rotate = 0.5, z = 10 }: { services: string[]; area: Area; rotate?: number; z?: number }) {
  const steps = services.slice(0, 3);
  return (
    <div
      aria-hidden
      className="absolute border border-ink/80 bg-paper p-md shadow-[0_10px_22px_-10px_rgba(11,11,11,0.28),0_1px_0_rgba(11,11,11,0.14)]"
      style={{ ...areaStyle(area, rotate), zIndex: z }}
    >
      <Paperclip className="-bottom-3 left-3" rotate={165} />
      <div className="flex flex-col gap-sm">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          return (
            <div key={step} className="flex items-center gap-xs">
              <span
                className={cn(
                  "flex h-11 w-full items-center justify-center p-xs text-center font-body text-[10px] font-semibold uppercase leading-tight text-ink-soft",
                  isLast ? "rounded-full border border-kite-dark" : "border border-line",
                )}
              >
                {step}
              </span>
              {!isLast && (
                <span className="shrink-0 rotate-90 text-ink-soft" aria-hidden>
                  →
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface CapabilityCollageProps {
  items: CapabilityItem[];
  agencyLine: string;
  locationLine: string;
}

/**
 * The kraft-paper hangtag from the reference's left column — a physical
 * specimen label repeating the six disciplines, closed with a short real
 * caption. Sits beside the section statement, not inside the collage.
 */
export function HangingTag({ names, tagLine, className }: { names: string[]; tagLine: string; className?: string }) {
  return (
    <div aria-hidden className={cn("relative w-[190px]", className)}>
      <svg viewBox="0 0 20 24" className="mx-auto h-8 w-7" stroke="var(--color-ink)" strokeWidth={1.5} fill="none">
        <path d="M 10 0 C 3 6, 3 14, 10 20" strokeLinecap="round" />
      </svg>
      <div
        className="relative -mt-1 -rotate-2 border border-ink bg-paper-dim px-lg py-lg shadow-[0_14px_26px_-12px_rgba(11,11,11,0.35),0_1px_0_rgba(11,11,11,0.16)]"
        style={{ clipPath: "polygon(0.5% 0%, 100% 0.5%, 99.5% 100%, 0% 99.5%)" }}
      >
        <Crease angle={100} />
        <span className="absolute left-1/2 top-md h-3 w-3 -translate-x-1/2 rounded-full border border-ink bg-paper" />
        <ul className="mt-xl space-y-2">
          {names.map((name) => (
            <li key={name} className="font-display text-[1.85rem] font-black uppercase leading-[0.92] text-ink">
              {name}
            </li>
          ))}
        </ul>
        <p className="mt-lg max-w-[18ch] border-t border-line-soft pt-sm font-body text-[11px] font-semibold uppercase leading-snug tracking-wide text-ink-soft">
          {tagLine}
        </p>
      </div>
    </div>
  );
}

const COLLAGE_W = 900;
const COLLAGE_H = 650;

/**
 * A pinned creative-workspace desk, positioned in literal pixels to match
 * the reference's physical arrangement — large, irregular sheets that
 * genuinely overlap (KITE's binder clip sits on the specimen itself, the
 * wireframe crosses under both WEB and MEDYA, the CRM flow sheet lies half
 * over the CRM card) rather than a padded grid of cards. Purely decorative
 * (aria-hidden except the real discipline text) — the accordion below
 * remains the only place this content is meaningfully navigable.
 */
export function CapabilityCollage({ items, agencyLine, locationLine }: CapabilityCollageProps) {
  const cards = deriveCards(items);
  const [strateji, kreatif, medya, web, ai, crm] = cards;

  return (
    <div
      data-collage-root
      className="relative hidden xl:block"
      style={{ width: COLLAGE_W, height: COLLAGE_H, maxWidth: "100%" }}
    >
      {strateji && (
        <DisciplineCard
          {...strateji}
          area={{ x: 0, y: 6, w: 222, h: 200 }}
          rotate={-2.4}
          tone={0}
          z={10}
        />
      )}
      {strateji && <Tape className="left-[36px] -top-3" rotate={-9} wide />}

      <KiteSpecimen agencyLine={agencyLine} area={{ x: 228, y: 0, w: 208, h: 318 }} rotate={0.6} z={16} />
      <BinderClip className="left-[332px] -top-4" dark rotate={-2} />

      {kreatif && (
        <DisciplineCard
          {...kreatif}
          area={{ x: 452, y: 14, w: 208, h: 192 }}
          rotate={1.8}
          tone={1}
          z={11}
        />
      )}
      <Tape className="left-[500px] -top-3" rotate={6} />

      <MediaChartSheet area={{ x: 672, y: 8, w: 222, h: 232 }} rotate={-1.4} z={9} />
      <Tape className="left-[850px] -top-3" rotate={10} />

      {strateji && (
        <StickyNote lines={strateji.services.slice(0, 2)} area={{ x: 4, y: 176, w: 150, h: 158 }} rotate={-4} />
      )}

      <SketchFrameworkSheet area={{ x: 138, y: 222, w: 118, h: 178 }} rotate={2.6} z={8} />

      {medya && (
        <DisciplineCard
          {...medya}
          area={{ x: 398, y: 192, w: 202, h: 244 }}
          rotate={-1.6}
          tone={2}
          z={12}
        />
      )}

      <AdMockSheet
        services={medya?.services ?? []}
        area={{ x: 654, y: 228, w: 226, h: 214 }}
        rotate={0.9}
        z={9}
      />
      <BinderClip className="left-[720px] top-[226px] -translate-y-1/2" dark />

      <Stamp lines={[agencyLine, locationLine]} area={{ x: 768, y: 172, w: 122, h: 122 }} rotate={8} z={25} />

      {web && (
        <DisciplineCard
          {...web}
          area={{ x: 0, y: 402, w: 204, h: 226 }}
          rotate={-2.2}
          tone={1}
          z={13}
        />
      )}
      <Tape className="left-[24px] top-[386px]" rotate={-6} />

      <WireframeSheet area={{ x: 172, y: 368, w: 244, h: 224 }} rotate={1.4} z={22} />

      {ai && (
        <DisciplineCard
          {...ai}
          area={{ x: 420, y: 404, w: 190, h: 208 }}
          rotate={2.4}
          tone={0}
          z={14}
        />
      )}

      {crm && (
        <DisciplineCard
          {...crm}
          area={{ x: 618, y: 410, w: 200, h: 226 }}
          rotate={-1.8}
          tone={2}
          z={15}
        />
      )}

      <CrmFlowSheet
        services={crm?.services ?? []}
        area={{ x: 708, y: 418, w: 182, h: 220 }}
        rotate={2}
        z={23}
      />
    </div>
  );
}

/**
 * Mobile's own composition, not the desktop collage shrunk down: a vertical
 * editorial stack where the KITE specimen, sticky note, media chart,
 * wireframe and CRM flow sheets tuck in behind the discipline cards as
 * peeking, overlapping accessories rather than a flat, evenly-spaced list.
 */
export function CapabilityCollageMobile({ items, agencyLine, locationLine }: CapabilityCollageProps) {
  const cards = deriveCards(items);
  const [strateji, kreatif, medya, web, ai, crm] = cards;

  return (
    <div className="relative xl:hidden">
      <div className="relative mx-[8%] border border-ink bg-paper p-lg shadow-[0_14px_26px_-12px_rgba(11,11,11,0.32)]" style={gridPaperStyle}>
        <BinderClip className="left-1/2 top-0 -translate-y-1/2" dark />
        <p className="text-center font-display text-[2.4rem] font-black uppercase leading-[0.88] text-ink">
          {agencyLine.split(" ")[0]}
        </p>
        <p className="mt-2xs text-center font-body text-label font-semibold uppercase tracking-wide text-ink-soft">
          {agencyLine.split(" ").slice(1).join(" ")}
        </p>
        <span aria-hidden className="mx-auto mt-sm block h-3.5 w-3.5 rotate-45 border border-kite-dark bg-kite" />
      </div>

      <div className="relative mt-lg">
        {strateji && (
          <div className="relative">
            <div className="pointer-events-none absolute -right-2 -top-5 z-0 w-32 rotate-6">
              <div
                aria-hidden
                className="bg-kite p-sm shadow-[0_8px_16px_-8px_rgba(11,11,11,0.35)]"
                style={{ clipPath: "polygon(0% 1%, 100% 0%, 99% 100%, 1% 99%)" }}
              >
                {strateji.services.slice(0, 2).map((line) => (
                  <span key={line} className="block font-body text-[11px] font-semibold leading-snug text-ink">
                    {line}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative z-10" style={{ transform: "rotate(-1.6deg)" }}>
              <div className={cn("relative border border-ink/80 p-md shadow-[0_10px_20px_-10px_rgba(11,11,11,0.3)]", PAPER_TONES[0])}>
                <Tape className="-top-3 left-6" rotate={-6} />
                <div className="flex items-start justify-between gap-xs">
                  <span className="font-display text-[1.9rem] font-black uppercase leading-[0.9] text-ink">{strateji.name}</span>
                  <span className="font-body text-[11px] font-semibold tabular-nums leading-none text-ink-soft">{strateji.number}</span>
                </div>
                <span aria-hidden className="mt-xs block h-[3px] w-12 bg-kite" />
                <ul className="mt-sm space-y-2">
                  {strateji.services.slice(0, 3).map((service) => (
                    <li key={service} className="font-body text-[13px] leading-snug text-ink-soft">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {kreatif && (
          <div className="relative -mt-sm z-20" style={{ transform: "rotate(1.4deg)" }}>
            <div className={cn("relative border border-ink/80 p-md shadow-[0_10px_20px_-10px_rgba(11,11,11,0.3)]", PAPER_TONES[1])}>
              <div className="flex items-start justify-between gap-xs">
                <span className="font-display text-[1.9rem] font-black uppercase leading-[0.9] text-ink">{kreatif.name}</span>
                <span className="font-body text-[11px] font-semibold tabular-nums leading-none text-ink-soft">{kreatif.number}</span>
              </div>
              <span aria-hidden className="mt-xs block h-[3px] w-12 bg-kite" />
              <ul className="mt-sm space-y-2">
                {kreatif.services.slice(0, 3).map((service) => (
                  <li key={service} className="font-body text-[13px] leading-snug text-ink-soft">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {medya && (
          <div className="relative -mt-sm">
            <div className="pointer-events-none absolute -right-3 -top-6 z-0 w-28 rotate-6 opacity-90">
              <div className="relative">
                <MediaChartSheet area={{ x: 0, y: 0, w: 112, h: 88 }} rotate={0} z={0} />
                <div className="h-[88px]" />
              </div>
            </div>
            <div className="relative z-10" style={{ transform: "rotate(-1.4deg)" }}>
              <div className={cn("relative border border-ink/80 p-md shadow-[0_10px_20px_-10px_rgba(11,11,11,0.3)]", PAPER_TONES[2])}>
                <BinderClip className="left-1/2 -top-1" />
                <div className="flex items-start justify-between gap-xs">
                  <span className="font-display text-[1.9rem] font-black uppercase leading-[0.9] text-ink">{medya.name}</span>
                  <span className="font-body text-[11px] font-semibold tabular-nums leading-none text-ink-soft">{medya.number}</span>
                </div>
                <span aria-hidden className="mt-xs block h-[3px] w-12 bg-kite" />
                <ul className="mt-sm space-y-2">
                  {medya.services.slice(0, 3).map((service) => (
                    <li key={service} className="font-body text-[13px] leading-snug text-ink-soft">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {web && (
          <div className="relative -mt-sm z-20" style={{ transform: "rotate(1.8deg)" }}>
            <div className={cn("relative border border-ink/80 p-md shadow-[0_10px_20px_-10px_rgba(11,11,11,0.3)]", PAPER_TONES[0])}>
              <Tape className="-top-3 right-8" rotate={5} />
              <div className="flex items-start justify-between gap-xs">
                <span className="font-display text-[1.9rem] font-black uppercase leading-[0.9] text-ink">{web.name}</span>
                <span className="font-body text-[11px] font-semibold tabular-nums leading-none text-ink-soft">{web.number}</span>
              </div>
              <span aria-hidden className="mt-xs block h-[3px] w-12 bg-kite" />
              <ul className="mt-sm space-y-2">
                {web.services.slice(0, 3).map((service) => (
                  <li key={service} className="font-body text-[13px] leading-snug text-ink-soft">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {ai && (
          <div className="relative -mt-md">
            <div className="pointer-events-none absolute -left-4 -top-5 z-0 w-32 -rotate-3 opacity-90">
              <div className="relative">
                <WireframeSheet area={{ x: 0, y: 0, w: 128, h: 100 }} rotate={0} z={0} />
                <div className="h-[130px]" />
              </div>
            </div>
            <div className="relative z-10" style={{ transform: "rotate(-1.2deg)" }}>
              <div className={cn("relative border border-ink/80 p-md shadow-[0_10px_20px_-10px_rgba(11,11,11,0.3)]", PAPER_TONES[1])}>
                <div className="flex items-start justify-between gap-xs">
                  <span className="font-display text-[1.9rem] font-black uppercase leading-[0.9] text-ink">{ai.name}</span>
                  <span className="font-body text-[11px] font-semibold tabular-nums leading-none text-ink-soft">{ai.number}</span>
                </div>
                <span aria-hidden className="mt-xs block h-[3px] w-12 bg-kite" />
                <ul className="mt-sm space-y-2">
                  {ai.services.slice(0, 3).map((service) => (
                    <li key={service} className="font-body text-[13px] leading-snug text-ink-soft">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {crm && (
          <div className="relative -mt-sm z-20" style={{ transform: "rotate(1.5deg)" }}>
            <div className={cn("relative border border-ink/80 p-md shadow-[0_10px_20px_-10px_rgba(11,11,11,0.3)]", PAPER_TONES[2])}>
              <Paperclip className="-bottom-3 right-6" rotate={165} />
              <div className="flex items-start justify-between gap-xs">
                <span className="font-display text-[1.9rem] font-black uppercase leading-[0.9] text-ink">{crm.name}</span>
                <span className="font-body text-[11px] font-semibold tabular-nums leading-none text-ink-soft">{crm.number}</span>
              </div>
              <span aria-hidden className="mt-xs block h-[3px] w-12 bg-kite" />
              <ul className="mt-sm space-y-2">
                {crm.services.slice(0, 3).map((service) => (
                  <li key={service} className="font-body text-[13px] leading-snug text-ink-soft">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-30 mt-lg flex items-center justify-between border-t border-line pt-md">
        <span className="font-body text-label font-semibold uppercase tracking-wide text-ink-soft">{locationLine}</span>
        <Stamp lines={[agencyLine, locationLine]} inline />
      </div>
    </div>
  );
}
