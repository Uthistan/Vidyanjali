import Section from "@/components/layout/Section";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import InfinityMotif from "@/components/brand/InfinityMotif";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Section spacing="lg" className="overflow-hidden">
      <InfinityMotif
        tone="purple"
        figures={false}
        className="pointer-events-none absolute -top-16 -right-24 h-80 w-auto opacity-[0.07]"
      />

      <div className="relative">
        <Eyebrow className="mb-5">404</Eyebrow>

        <h1 className="max-w-[16ch] text-display">
          We couldn&rsquo;t find that page.
        </h1>

        <p className="mt-8 max-w-measure text-lede text-ink-body">
          The link may be out of date, or the page may have moved.
        </p>

        <Button href="/" variant="primary" size="lg" className="mt-10">
          Back to home
        </Button>
      </div>
    </Section>
  );
}
