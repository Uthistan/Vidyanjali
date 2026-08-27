import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/layout/Section";
import Reveal from "@/components/ui/Reveal";
import ContentPending from "@/components/ui/ContentPending";

export const metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader eyebrow="Blog" title="Writing" motifTone="purple" />

      <Section>
        <Reveal>
          <ContentPending
            label="No content pipeline yet"
            note="The blog needs a decision before it can be built: MDX files committed to the repo (simplest, developer edits) or a CMS (client edits, more setup). The index and article templates follow once that is settled — this route exists now so navigation is complete."
          />
        </Reveal>
      </Section>
    </>
  );
}
