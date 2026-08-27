/**
 * The small uppercase label that sits above a heading. 12px, wide tracking,
 * 2em leading — per the audited micro-label style.
 */

const TONES = {
  teal: "text-teal",
  purple: "text-purple-mid",
  gold: "text-gold",
  invert: "text-ink-invert/70",
};

export default function Eyebrow({ tone = "teal", className = "", children }) {
  return (
    <p
      className={`text-eyebrow font-sans uppercase ${TONES[tone] ?? TONES.teal} ${className}`}
    >
      {children}
    </p>
  );
}
