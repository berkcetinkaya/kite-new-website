import Image from "next/image";

interface HeroArtworkProps {
  agencyLine: string;
  locationLine: string;
  coordinates: string[];
  stampLines: string[];
}

/**
 * A small line-drawn kite (diamond + cross-brace), matching the mark used
 * elsewhere in the identity rather than a generic icon. Drawn in the same
 * 0–100 viewBox as the string beneath it so both share one coordinate
 * space; the outer svg already runs with preserveAspectRatio="none" to
 * match the 4:3 frame, so straight edges stay straight even though the
 * box itself isn't square.
 */
function KiteMark({ cx, cy, r = 7, rotate = 18 }: { cx: number; cy: number; r?: number; rotate?: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate})`}>
      <polygon
        points={`0,${-r} ${r},0 0,${r} ${-r},0`}
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth={0.55}
        vectorEffect="non-scaling-stroke"
      />
      <line x1={0} y1={-r} x2={0} y2={r} stroke="var(--color-ink)" strokeWidth={0.35} vectorEffect="non-scaling-stroke" />
      <line x1={-r} y1={0} x2={r} y2={0} stroke="var(--color-ink)" strokeWidth={0.35} vectorEffect="non-scaling-stroke" />
    </g>
  );
}

/**
 * The "move brands forward" badge — real circular stamp with curved
 * type along the rim (not stacked centered lines), a small kite mark at
 * its center. Kept as its own square-viewBox svg so the ellipse-by-
 * non-uniform-scaling problem that the kite/string overlay accepts never
 * touches this piece — a badge reads as broken instantly if it isn't a
 * true circle.
 */
function MoveBrandsStamp({ lines, className }: { lines: [string, string]; className?: string }) {
  const [top, bottom] = lines;
  return (
    <div aria-hidden className={className}>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle cx={50} cy={50} r={46} fill="none" stroke="var(--color-kite-yellow-dark)" strokeWidth={0.8} strokeDasharray="2 2.5" />
        <circle cx={50} cy={50} r={34} fill="none" stroke="var(--color-kite-yellow-dark)" strokeWidth={0.6} />
        <defs>
          {/* Both traced left-to-right (sweep flags mirrored, not equal) —
              that's what keeps text upright on both the top and bottom
              halves; verified empirically, the intuitive flag choice
              renders upside down on one of the two arcs. */}
          <path id="stamp-arc-top" d="M 12 50 A 38 38 0 0 1 88 50" fill="none" />
          <path id="stamp-arc-bottom" d="M 12 50 A 38 38 0 0 0 88 50" fill="none" />
        </defs>
        <text className="font-body" fill="var(--color-kite-yellow-dark)" fontSize={8.5} fontWeight={700} letterSpacing="0.1em">
          <textPath href="#stamp-arc-top" startOffset="50%" textAnchor="middle">
            {top}
          </textPath>
        </text>
        <text className="font-body" fill="var(--color-kite-yellow-dark)" fontSize={8.5} fontWeight={700} letterSpacing="0.1em">
          <textPath href="#stamp-arc-bottom" startOffset="50%" textAnchor="middle">
            {bottom}
          </textPath>
        </text>
        <KiteMark cx={50} cy={50} r={8} rotate={20} />
      </svg>
    </div>
  );
}

/**
 * The Galata Tower editorial plate — framed like a mounted archival image
 * (thin border + ivory mat), not a full-bleed background. Sized to the
 * source asset's own 4:3 aspect so the whole photo is always visible
 * (object-contain — no cropping of the tower's roof or body). The asset
 * already carries its own yellow sun and screenprinted light-ray, so only
 * the technical label, the kite + string kept clear of the tower, and the
 * "move brands forward" stamp are added on top.
 */
export function HeroArtwork({ agencyLine, locationLine, coordinates, stampLines }: HeroArtworkProps) {
  return (
    <div className="hero-artwork-reveal border border-ink p-[14px] xl:p-[18px]">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src="/brand/galata2.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 44vw, 92vw"
          className="object-contain"
        />

        {/* String only — a non-uniformly-scaled (preserveAspectRatio="none")
            overlay is fine for a loose curved line, but would warp the
            kite's straight diamond edges into a parallelogram, so the kite
            itself lives in its own true-aspect square svg below. */}
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-85"
        >
          <path
            d="M 68 26 C 60 34, 52 40, 45 45 C 38 50, 33 53, 28 56"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth={0.4}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Positioned by CSS percentage (matching the string's endpoint
            above, expressed in the same 0–100 → 0–100% terms) rather than
            sharing that svg's viewBox, so this box can stay a true square
            regardless of the 4:3 frame and the diamond never skews. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[68%] top-[26%] h-14 w-14 -translate-x-1/2 -translate-y-1/2 opacity-85 sm:h-20 sm:w-20"
        >
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <KiteMark cx={50} cy={50} r={30} rotate={24} />
          </svg>
        </div>

        <div
          aria-hidden
          className="absolute left-[4%] top-[4%] max-w-[46%] border border-ink bg-paper/90 px-2xs py-3xs font-body text-eyebrow font-semibold uppercase leading-snug tracking-wide text-ink sm:max-w-[42%]"
        >
          <p>{agencyLine}</p>
          <p>{locationLine}</p>
          {coordinates.map((c) => (
            <p key={c}>{c}</p>
          ))}
        </div>

        <MoveBrandsStamp
          lines={[stampLines[0] ?? "", stampLines[1] ?? ""]}
          className="absolute bottom-[4%] right-[4%] h-16 w-16 shrink-0 sm:h-24 sm:w-24"
        />
      </div>
    </div>
  );
}
