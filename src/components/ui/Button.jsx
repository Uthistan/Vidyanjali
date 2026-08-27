import Link from "next/link";

/**
 * The site's CTA. Pill-shaped, 12px/24px padding per the audit, with the
 * signature hover: a colour fill sweeping upward from the bottom edge while
 * the label swaps colour. The sweep itself lives in `.btn-sweep` (globals.css)
 * because it needs a pseudo-element.
 *
 * Renders as <Link> for internal hrefs, <a> for external, <button> otherwise.
 */

const VARIANTS = {
  /* Deep purple button, gold sweeps up, label goes purple. */
  primary: {
    base: "bg-purple text-ink-invert hover:text-purple focus-visible:text-purple",
    sweep: "var(--color-gold)",
  },
  /* Outlined on cream, purple sweeps up, label goes cream. */
  secondary: {
    base: "border border-rule-strong text-ink hover:text-ink-invert focus-visible:text-ink-invert",
    sweep: "var(--color-purple)",
  },
  /* Teal button, purple sweeps up. */
  accent: {
    base: "bg-teal text-ink-invert",
    sweep: "var(--color-purple)",
  },
  /* For use on the dark footer band. */
  invert: {
    base: "bg-canvas text-purple hover:text-purple focus-visible:text-purple",
    sweep: "var(--color-gold)",
  },
};

const SIZES = {
  md: "px-6 py-3 text-body-sm",
  lg: "px-8 py-4 text-body",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}) {
  const tone = VARIANTS[variant] ?? VARIANTS.primary;

  const classes = [
    "btn-sweep inline-flex items-center justify-center gap-2 rounded-pill",
    "font-sans font-semibold tracking-[-0.01em] no-underline",
    "transition-colors duration-300 ease-out-soft",
    tone.base,
    SIZES[size] ?? SIZES.md,
    className,
  ].join(" ");

  const style = { "--btn-sweep-color": tone.sweep };

  if (!href) {
    return (
      <button type="button" className={classes} style={style} {...rest}>
        {children}
      </button>
    );
  }

  const isExternal = /^(https?:)?\/\/|^mailto:|^tel:/.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        style={style}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} style={style} {...rest}>
      {children}
    </Link>
  );
}
