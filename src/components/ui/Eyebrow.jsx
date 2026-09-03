/**
 * The small uppercase label that sits above a heading. 11px, tracked wide.
 *
 * It is the quietest thing on the page, and against a 50px programme name or
 * an 84px hero statement that is exactly its job: the distance between the
 * two is most of what makes the large tier read as large.
 */

const TONES = {
  teal: "text-teal",
  purple: "text-purple-mid",
  /* Raw --color-gold is 1.9:1 on the cream — unreadable as text. `gold-deep`
     is the same hue burnt down until it clears AA on both light surfaces. Use
     `gold-bright` instead when the label sits on one of the dark bands, where
     the raw gold measures 7.4:1 and is the better colour. */
  gold: "text-gold-deep",
  "gold-bright": "text-gold",
  invert: "text-ink-invert/75",
};

export default function Eyebrow({ tone = "teal", as: Tag = "p", className = "", children }) {
  return (
    <Tag
      className={`text-eyebrow font-sans uppercase ${TONES[tone] ?? TONES.teal} ${className}`}
    >
      {children}
    </Tag>
  );
}
