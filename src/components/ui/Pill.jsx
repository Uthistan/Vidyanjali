/**
 * A soft tag. Used for the outcome/marquee items and topic clusters.
 * Fills are the brand's soft tints — accents appear as small confetti, never
 * as large flat blocks.
 */

const TONES = {
  purple: "bg-purple-soft text-purple",
  teal: "bg-teal-soft text-teal",
  gold: "bg-gold-soft text-[#8A6A14]", // darkened gold — the raw token fails AA on text
  outline: "border border-rule text-ink-body",
};

export default function Pill({ tone = "purple", className = "", children }) {
  return (
    <span
      className={`inline-flex items-center rounded-pill px-4 py-2 text-body-sm font-medium whitespace-nowrap ${TONES[tone] ?? TONES.purple} ${className}`}
    >
      {children}
    </span>
  );
}
