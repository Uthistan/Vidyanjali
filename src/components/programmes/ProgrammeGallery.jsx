import Section from "@/components/layout/Section";
import Reveal from "@/components/ui/Reveal";
import PhotoCarousel from "@/components/ui/PhotoCarousel";

/**
 * A programme's photographs, where there is more than one of them.
 *
 * THE BOUNDARY IS TWO, and it is deliberate. A programme with a single
 * photograph shows it in the masthead, where it composes against the title —
 * running it here as well would print the same picture twice, and running a
 * one-slide carousel would put a counter reading "01 / 01" and two dead arrows
 * on the page. So this returns null below two images and ProgrammeHero takes
 * the single case. Between them every programme is covered, and neither ever
 * renders an empty control.
 *
 * NOTHING CURRENTLY REACHES THIS. No programme in the supplied set has two
 * confirmed photographs: Individual therapy and Park day have one each and the
 * other five have none. This exists because the template has to hold when the
 * client sends a real set — and it reuses the Stage 2 carousel rather than
 * introducing a second one, so there is one scroll-snap implementation on the
 * site and one set of controls to keep accessible.
 */
export default function ProgrammeGallery({ programme }) {
  if (programme.images.length < 2) return null;

  return (
    <Section>
      {/* A heading rather than an Eyebrow, so the section has a rung on the
          document outline between the page h1 and the h3s below it. */}
      <Reveal>
        <h2 className="mb-10 font-sans text-eyebrow uppercase text-teal">
          Photographs
        </h2>
      </Reveal>

      <PhotoCarousel
        items={programme.images}
        label={`${programme.name} — photographs`}
      />
    </Section>
  );
}
