import Section from "@/components/layout/Section";
import Reveal from "@/components/ui/Reveal";

/**
 * The client's own bullet phrases, set as statements rather than as bullets.
 *
 * These four lines — "Supports children's various sensory needs and therapy",
 * "Socialisation", and so on — are the entire supplied content for what Group
 * therapy involves. There is no explanation of any of them, and none is
 * written here. Given so little, the honest move is to let each phrase have a
 * ruled line to itself at heading size and let the whitespace carry the
 * section, rather than to dress four fragments up as prose.
 *
 * The heading is a structural label from the programme data, not a claim: it
 * says what the list is, promises no outcome, and can be overridden per
 * programme where the default would misdescribe the contents — One day events
 * uses "The events", because "what the programme covers" would read a pair of
 * event names as a syllabus.
 *
 * SIZE FOLLOWS COUNT. One or two short phrases at h3 look like a stub; at h2
 * they look like a statement, which is what they are. Four longer phrases at
 * h2 would wrap into a wall, so those drop to h3.
 */
export default function ProgrammePoints({ heading, points = [], tone = "canvas" }) {
  if (points.length === 0) return null;

  const size = points.length <= 2 ? "text-h2" : "text-h3";

  return (
    <Section tone={tone}>
      <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
        <Reveal className="lg:col-span-4">
          <h2 className="max-w-[14ch] text-h3 text-ink-soft">{heading}</h2>
        </Reveal>

        <ul className="lg:col-span-7 lg:col-start-6">
          {points.map((point, index) => (
            <Reveal
              as="li"
              key={point}
              delay={index < 4 ? index * 90 : 0}
              className="border-t border-rule py-7 last:border-b last:border-rule sm:py-9"
            >
              <p className={`${size} max-w-[24ch] text-ink`}>{point}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
