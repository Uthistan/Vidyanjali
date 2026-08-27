import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/layout/Section";
import Reveal from "@/components/ui/Reveal";
import ContentPending from "@/components/ui/ContentPending";

export const metadata = {
  title: "Get Involved",
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get Involved"
        title="Support the work"
        motifTone="gold"
      />

      <Section>
        <Reveal>
          <ContentPending
            label="Ways to get involved"
            note="Volunteering, partnerships, donations — whichever of these Vidyanjali actually offers. Confirm the list before this page is built out."
          />
        </Reveal>

        <Reveal delay={100} className="mt-8">
          <ContentPending
            label="Donation details"
            note="Only if the client wants to accept donations through the site. Payment handling, tax-receipt requirements and compliance need discussing separately before anything is implemented."
          />
        </Reveal>
      </Section>
    </>
  );
}
