import Container from "./Container";

/**
 * A page section: vertical rhythm plus a surface.
 *
 * SURFACES ARE HOW THE PAGE IS DIVIDED NOW. The previous version separated
 * sections with hairline rules on a single near-white background, and the
 * result was a page with no rhythm — every band the same weight, every
 * boundary the same 1px line. The homepage alternates cream → sand → deep
 * purple → sand → cream → deep teal, so a reader feels the sections change
 * before reading a word of them.
 *
 * THE TWO NAMING GROUPS ARE DELIBERATELY SEPARATE:
 *
 *   canvas / warm            the light surfaces the page mostly lives on
 *   deep / teal-deep         the saturated bands, which invert their ink
 *   purple / teal / gold     the pale tints
 *
 * The pale tints are kept — retuned warmer, but kept — because the interior
 * pages use them as card and band fills and reinterpreting `purple` as a dark
 * band would have silently put dark text on a dark surface across /about,
 * /programmes and the detail template. Adding surfaces is safe; redefining
 * one is not.
 */

const TONES = {
  canvas: "bg-canvas",
  warm: "bg-canvas-warm",
  deep: "bg-canvas-deep text-ink-invert on-dark",
  "teal-deep": "bg-teal-deep text-ink-invert on-dark",
  purple: "bg-purple-soft",
  teal: "bg-teal-soft",
  gold: "bg-gold-soft",
};

/**
 * Vertical rhythm.
 *
 * PULLED IN TWICE. `lg` began at 112/144/176px, came down to 96/128/144, and
 * is now 80/96/112. The reason is the SEAM, not the section: padding is
 * symmetrical, so two adjacent `lg` bands used to put 288px of nothing
 * between the last line of one and the first line of the next. Measured
 * across the homepage, that was the largest empty area on the page — larger
 * than any gap inside a section — and it appeared at every join.
 *
 * At 112px a seam is 224px, and where the surface also changes (cream into
 * deep purple, sand into cream) the change of colour does most of the
 * dividing, so the padding no longer has to.
 *
 * `none` hands the padding back to the section so an art-directed layout can
 * set its own asymmetric top and bottom, which the hero, the mission band and
 * the programme index all do.
 */
const SPACING = {
  none: "",
  sm: "py-14 sm:py-16",
  md: "py-16 sm:py-20 lg:py-24",
  lg: "py-20 sm:py-24 lg:py-28",
  xl: "py-28 sm:py-32 lg:py-40",
};

export default function Section({
  as: Tag = "section",
  tone = "canvas",
  spacing = "md",
  bleed = false,
  className = "",
  containerClassName = "",
  children,
  ...rest
}) {
  const body = bleed ? (
    children
  ) : (
    <Container className={containerClassName}>{children}</Container>
  );

  return (
    <Tag
      className={`relative ${TONES[tone] ?? TONES.canvas} ${SPACING[spacing] ?? SPACING.md} ${className}`.trim()}
      {...rest}
    >
      {body}
    </Tag>
  );
}
