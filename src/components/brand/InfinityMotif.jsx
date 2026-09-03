/**
 * The Vidyanjali mark, redrawn as a single continuous line.
 *
 * WHY THIS WAS REBUILT: every call site in the app — Footer, PageHeader, Card,
 * not-found — was already passing `tone`, `figures` and `strokeWidth`, and the
 * previous version accepted none of them. React dropped them silently, so the
 * motif rendered as a heavy filled shape in `currentColor` at every size
 * instead of the tinted hairline those call sites were asking for. This
 * version implements the API that was already in use.
 *
 * The shape is a lemniscate — one unbroken path that crosses itself at the
 * centre — with the logo's three dots above it. Drawn as a stroke rather than
 * a fill because at 7% opacity behind a heading a filled blob reads as a
 * smudge, and because a single path has a measurable length, which is what
 * lets SiteLoader draw it on.
 *
 * @param {"purple"|"teal"|"gold"|"invert"|"current"} [props.tone]
 * @param {boolean} [props.figures] - include the three dots above the loop.
 * @param {number} [props.strokeWidth] - in viewBox units, not pixels.
 * @param {boolean} [props.animated] - draw the line on; SiteLoader uses this.
 */

const TONES = {
  purple: "var(--color-purple-mid)",
  teal: "var(--color-teal)",
  gold: "var(--color-gold)",
  invert: "var(--color-ink-invert)",
  current: "currentColor",
};

/**
 * One continuous stroke that crosses itself at the centre.
 *
 * The crossing is the whole point of the mark and it is easy to lose: if each
 * loop returns to the centre on a VERTICAL tangent, the path renders as two
 * circles touching at a point rather than as an infinity. The trick is that
 * each loop must arrive and leave on the same DIAGONAL, so the two strands
 * pass through the centre as an X.
 *
 * Concretely: the left loop departs the centre toward (130, 106) — direction
 * (-20, -32) — and the right loop arrives from (170, 170), the same direction.
 * Those two segments are therefore one straight strand running ↖. The other
 * pair forms the strand running ↗. Keep that symmetry if you edit the curve.
 *
 * Geometry read from public/brand/vidyanjali-mark.png: loops filling the lower
 * two-thirds, three spheres above with the centre one raised.
 */
const CENTRE = "150 138";

const LOOP = [
  `M${CENTRE}`,
  /* Left loop: out to the upper left, around, and back on the ↗ diagonal. */
  "C130 106, 108 88, 80 88",
  "C47 88, 30 112, 30 138",
  "C30 164, 47 188, 80 188",
  "C108 188, 130 170, 150 138",
  /* Right loop: straight on through the crossing, around, and back. */
  "C170 106, 192 88, 220 88",
  "C253 88, 270 112, 270 138",
  "C270 164, 253 188, 220 188",
  "C192 188, 170 170, 150 138",
  "Z",
].join(" ");

export default function InfinityMotif({
  tone = "current",
  figures = true,
  strokeWidth = 6,
  animated = false,
  className = "",
}) {
  const color = TONES[tone] ?? TONES.current;

  return (
    <svg
      viewBox="0 0 300 210"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d={LOOP}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        /* pathLength normalises the dash maths to 1 regardless of the real
           geometry, so the draw-on animation in globals.css needs no magic
           number and survives any future edit to the curve. */
        pathLength={animated ? 1 : undefined}
        className={animated ? "motif-draw" : undefined}
      />

      {figures && (
        <g className={animated ? "motif-dots" : undefined}>
          <circle cx="48" cy="56" r="12" fill={color} />
          <circle cx="150" cy="34" r="15" fill={color} />
          <circle cx="252" cy="56" r="12" fill={color} />
        </g>
      )}
    </svg>
  );
}
