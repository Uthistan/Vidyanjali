import Section from "@/components/layout/Section";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import InfinityMotif from "@/components/brand/InfinityMotif";
import { mission } from "@/content/about";

/**
 * The belief, on the page's first dark band.
 *
 * THIS IS THE PAGE'S LOUDEST MOMENT and it is built like one: a full-bleed
 * deep purple field, the client's mission sentence centred in cream at display
 * size, and nothing else in the band competing for the middle. Coming after a
 * deliberately small, quiet journey note, the change of surface does the work
 * that no amount of type size could — the reader crosses an edge.
 *
 * CENTRED, LIKE THE HERO. The two are the only centred statements on the page
 * and they are the two moments where Vidyanjali is speaking rather than
 * listing. Everything between them and after them returns to the left rail.
 *
 * THE SUPPORTING COPY IS SMALL, LATE AND IN TWO COLUMNS. It is the detail
 * behind the statement, not a continuation of it, and setting it at a sixth of
 * the size says so. It is also the only place the client's "over 100 children"
 * figure appears; it is quoted, not extracted into a statistic, because the
 * sentence around it is what makes it true.
 *
 * THE INVITATION IS THE SECOND OF FOUR on the page. Putting one here rather
 * than only at the foot means the reader can act at the moment they are most
 * persuaded instead of having to reach the end first.
 *
 * THE MOTIF is the mark at 14% in gold, oversized and bleeding off the corner
 * — brand texture in the one part of a centred composition that is never used.
 */
export default function Mission() {
  const [statement, ...supporting] = mission;

  return (
    <Section tone="deep" spacing="xl" className="overflow-hidden">
      <InfinityMotif
        tone="gold"
        figures={false}
        strokeWidth={3}
        className="pointer-events-none absolute -right-24 -bottom-28 h-80 w-auto opacity-[0.14] sm:h-104"
      />

      <div className="relative">
        <Reveal>
          <Eyebrow tone="gold-bright" className="text-center">
            Mission
          </Eyebrow>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mx-auto mt-8 max-w-[19ch] text-center text-statement text-ink-invert sm:mt-10">
            {statement}
          </h2>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-x-14 gap-y-8 sm:mt-16 sm:grid-cols-2">
          {supporting.map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * 90}>
              <p className="text-body-sm text-ink-invert/80">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={180}>
          <div className="mt-12 flex justify-center sm:mt-14">
            <Button href="/contact" variant="invert" size="lg">
              Get in touch
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
