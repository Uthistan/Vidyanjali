import Section from "./Section";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import InfinityMotif from "@/components/brand/InfinityMotif";

/**
 * The masthead every interior page opens with: eyebrow, page title, optional
 * lede, and the brand motif bleeding off the top-right corner.
 *
 * Shares the hero's spacing so interior pages feel like part of the same
 * system rather than a different template.
 */
export default function PageHeader({ eyebrow, title, lede, motifTone = "purple" }) {
  return (
    <Section spacing="lg" className="overflow-hidden border-b border-rule">
      <InfinityMotif
        tone={motifTone}
        figures={false}
        className="pointer-events-none absolute -top-24 -right-28 h-96 w-auto opacity-[0.07]"
      />

      <Reveal className="relative">
        {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}

        <h1 className="max-w-[18ch] text-display">{title}</h1>

        {lede && (
          <p className="mt-8 max-w-measure text-lede text-ink-body">{lede}</p>
        )}
      </Reveal>
    </Section>
  );
}
