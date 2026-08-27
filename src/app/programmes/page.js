import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/layout/Section";
import ContentPending from "@/components/ui/ContentPending";
import Reveal from "@/components/ui/Reveal";
import { programmes } from "@/content/programmes";

export const metadata = {
  title: "Programmes",
};

/**
 * Programmes.
 *
 * A ruled, numbered list rather than a grid of cards — seven cards would be
 * more furniture than content, and several programmes have no description at
 * all. In this layout a name on its own is a complete row; in a card it would
 * look broken.
 *
 * The gaps are real: `Individual therapy`, `Dance` and `One day events` need
 * copy from the client. Do not fill them in.
 */
export default function ProgrammesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Programmes"
        title="Programmes offered"
        motifTone="teal"
      />

      <Section>
        <ol className="flex flex-col">
          {programmes.map((programme, index) => (
            <Reveal
              as="li"
              key={programme.name}
              delay={index < 3 ? index * 90 : 0}
              className="grid gap-y-5 border-t border-rule py-10 first:pt-0 sm:py-12 md:grid-cols-12 md:gap-x-12"
            >
              <div className="flex items-baseline gap-4 md:col-span-5">
                <span
                  aria-hidden="true"
                  className="font-sans text-eyebrow text-ink-soft tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-h3">{programme.name}</h2>
              </div>

              {(programme.description || programme.points) && (
                <div className="md:col-span-7">
                  {programme.description && (
                    <p className="max-w-measure text-body text-ink-body">
                      {programme.description}
                    </p>
                  )}

                  {programme.points && (
                    <ul
                      className={`max-w-measure ${programme.description ? "mt-6" : ""} flex flex-col gap-3`}
                    >
                      {programme.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-body-sm text-ink-body"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-pill bg-gold"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="purple" spacing="sm">
        <Reveal>
          <ContentPending
            label="How to join"
            note="The practical next step — enquiry, assessment, waiting list, or whatever the real process is. Nothing about admissions was supplied, so nothing is stated here."
          />
        </Reveal>
      </Section>
    </>
  );
}
