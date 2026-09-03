import Section from "@/components/layout/Section";
import Reveal from "@/components/ui/Reveal";

/**
 * The figures a programme actually carries, set as a ruled row.
 *
 * ONLY Group therapy has any, and they are a restatement of its own sentence —
 * "a carefully curated 3 hour programme with five children and 2 teachers" —
 * lifted into figures so the reader can take them in at a glance. Nothing is
 * added: there is no ratio, no age range, no frequency, no session count, and
 * no unit of measurement the client did not write down. If a programme has no
 * `facts` array the section does not render at all.
 *
 * Each item reads as "3 hours" in the accessibility tree because the value and
 * the label are one list item in that order — the stacking is visual only.
 */
export default function ProgrammeFacts({ facts = [] }) {
  if (facts.length === 0) return null;

  return (
    <Section spacing="sm">
      <Reveal>
        <ul className="grid border-b border-rule sm:grid-cols-3">
          {facts.map((fact) => (
            <li
              key={fact.label}
              className="flex flex-col gap-2 border-t border-rule py-8 first:border-t-0 sm:border-t-0 sm:border-l sm:py-10 sm:pl-8 sm:first:border-l-0 sm:first:pl-0"
            >
              <span className="text-display leading-none text-ink tabular-nums">
                {fact.value}
              </span>
              <span className="font-sans text-eyebrow uppercase text-ink-soft">
                {fact.label}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
