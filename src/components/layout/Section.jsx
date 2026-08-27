import Container from "./Container";

/**
 * A page section: vertical rhythm plus an optional soft tint band.
 *
 * Spacing is deliberately large — in the audit, generous vertical rhythm is
 * what makes sections feel like separate thoughts without needing borders or
 * shadows to divide them.
 */

const TONES = {
  canvas: "bg-canvas",
  purple: "bg-purple-soft",
  teal: "bg-teal-soft",
  gold: "bg-gold-soft",
  deep: "bg-canvas-deep text-ink-invert",
};

const SPACING = {
  sm: "py-16 sm:py-20",
  md: "py-20 sm:py-28 lg:py-32",
  lg: "py-28 sm:py-36 lg:py-44",
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
      className={`relative ${TONES[tone] ?? TONES.canvas} ${SPACING[spacing] ?? SPACING.md} ${className}`}
      {...rest}
    >
      {body}
    </Tag>
  );
}
