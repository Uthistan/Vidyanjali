import Container from "./Container";
import Button from "@/components/ui/Button";
import InfinityMotif from "@/components/brand/InfinityMotif";
import Reveal from "@/components/ui/Reveal";
import { footerCta } from "@/content/site";

/**
 * The closing invitation: a deep purple band, one line, one action.
 *
 * CENTRED, AND THE LAST OF THE PAGE'S FOUR INVITATIONS. The band used to run
 * the heading left and the button right, which reads as a footer bar. Centred,
 * with the mark behind it and nothing else in the field, it reads as the end
 * of a piece of writing — and it rhymes with the hero and the mission, the
 * other two centred moments, so the page closes the way it opened.
 *
 * This used to live inside Footer, which meant it rendered on every page
 * whether or not the page had earned it. It is now a component each page
 * places deliberately, immediately before the footer.
 *
 * The heading comes from `footerCta` in content/site.js, which explains why it
 * is written rather than quoted — every vision statement is already set out in
 * full on both the homepage and /about, so borrowing one repeated it.
 *
 * @param {string} [props.heading] - override the default line.
 */
export default function ClosingCTA({ heading, action, href }) {
  return (
    <section className="on-dark relative overflow-hidden bg-canvas-deep text-ink-invert">
      {/* The mark, oversized and nearly invisible, bleeding off the corner. At
          14% it reads as embossed into the surface rather than sitting on it. */}
      <InfinityMotif
        tone="gold"
        figures={false}
        strokeWidth={3}
        className="pointer-events-none absolute -right-20 -bottom-24 h-80 w-auto opacity-[0.13] sm:h-96"
      />

      <Container className="relative py-24 sm:py-28 lg:py-36">
        <Reveal className="flex flex-col items-center gap-10 text-center">
          <h2 className="max-w-[16ch] text-statement text-ink-invert">
            {heading ?? footerCta.heading}
          </h2>

          <Button href={href ?? footerCta.href} variant="invert" size="lg">
            {action ?? footerCta.action}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
