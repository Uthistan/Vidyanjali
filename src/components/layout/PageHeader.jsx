import Section from "./Section";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import InfinityMotif from "@/components/brand/InfinityMotif";

/**
 * The masthead every interior page opens with.
 *
 * WHAT CHANGED. It used to be a very tall band of near-white with a title
 * floating in the middle of it and the brand mark ghosted at 7% in the corner
 * — around 700px of page to deliver one short line, and the emptiest thing on
 * the site. Since every interior route renders it, that single component was
 * doing more than any other to make the site feel unfinished.
 *
 * It is now a sand band, roughly half the height, opened by a gold rule and
 * closed by the change of surface into the page below. The mark sits at 10%
 * rather than 7% and is cropped harder by the corner, so it reads as a
 * deliberate piece of brand texture rather than as a faint accident.
 *
 * A SAND BAND RATHER THAN CREAM is also what gives interior pages the same
 * opening move as the homepage, whose hero sets its statement on exactly this
 * surface. The two now look like the same publication.
 */
export default function PageHeader({ eyebrow, title, lede, motifTone = "purple" }) {
  return (
    <Section
      tone="warm"
      spacing="none"
      className="overflow-hidden pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24"
    >
      <InfinityMotif
        tone={motifTone}
        figures={false}
        strokeWidth={3}
        className="pointer-events-none absolute -top-20 -right-24 h-72 w-auto opacity-[0.1] sm:h-96"
      />

      <Reveal className="relative">
        <div className="flex items-center gap-5 border-t-[3px] border-gold pt-5">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        </div>

        <h1 className="mt-7 max-w-[18ch] text-display">{title}</h1>

        {lede && (
          <p className="mt-6 max-w-measure text-lede text-ink-body">{lede}</p>
        )}
      </Reveal>
    </Section>
  );
}
