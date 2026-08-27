import Link from "next/link";
import InfinityMotif from "@/components/brand/InfinityMotif";

/**
 * The service/pillar card. Borderless and shadowless per the audit — colour
 * and spacing do the separating. Each card is keyed to a brand accent so a
 * row of them reads as a set without repeating.
 */

const TONES = {
  purple: { fill: "bg-purple-soft", motif: "purple", link: "text-purple-mid" },
  teal: { fill: "bg-teal-soft", motif: "teal", link: "text-teal" },
  gold: { fill: "bg-gold-soft", motif: "gold", link: "text-[#8A6A14]" },
  plain: { fill: "bg-canvas-lift", motif: "purple", link: "text-purple-mid" },
};

export default function Card({
  title,
  children,
  tone = "purple",
  href,
  cta,
  motif = true,
  className = "",
}) {
  const t = TONES[tone] ?? TONES.purple;

  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-card ${t.fill} p-8 sm:p-10 ${className}`}
    >
      {motif && (
        <InfinityMotif
          tone={t.motif}
          figures={false}
          strokeWidth={4}
          className="pointer-events-none absolute -top-6 -right-10 h-32 w-auto opacity-[0.09]"
        />
      )}

      <h3 className="text-h3">{title}</h3>

      {children && (
        <div className="mt-4 flex-1 text-body-sm text-ink-body">{children}</div>
      )}

      {href && cta && (
        <Link
          href={href}
          className={`mt-8 inline-flex items-center gap-2 text-body-sm font-semibold no-underline ${t.link} transition-transform duration-300 ease-out-soft hover:gap-3`}
        >
          {cta}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      )}
    </div>
  );
}
