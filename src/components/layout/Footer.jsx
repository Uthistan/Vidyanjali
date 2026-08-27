import Link from "next/link";
import Logo from "@/components/brand/Logo";
import InfinityMotif from "@/components/brand/InfinityMotif";
import Button from "@/components/ui/Button";
import Container from "./Container";
import { contact, footerCta, navItems, site } from "@/content/site";

/**
 * Footer: a large closing CTA band, then a thin link row.
 *
 * Kept deliberately thin per the audit — no sitemap grid, no newsletter form,
 * no social wall. The closing invitation is the point.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      {/* Closing CTA */}
      <div className="relative overflow-hidden bg-canvas-deep text-ink-invert">
        <InfinityMotif
          tone="gold"
          figures={false}
          strokeWidth={3}
          className="pointer-events-none absolute -right-16 -bottom-16 h-72 w-auto opacity-[0.08]"
        />

        <Container className="relative py-20 sm:py-28">
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-[24ch] text-h1 text-ink-invert">
              {footerCta.heading}
            </h2>

            <Button href={footerCta.href} variant="invert" size="lg">
              {footerCta.action}
            </Button>
          </div>
        </Container>
      </div>

      {/* Link row */}
      <Container className="flex flex-col gap-10 py-14 lg:flex-row lg:items-center lg:justify-between">
        {/* Live type rather than the stacked lockup image: at footer scale the
            artwork's tagline is only a few pixels tall and reads as a smudge. */}
        <Logo variant="full" size="md" />

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-body-sm text-ink-body no-underline transition-colors duration-300 hover:text-teal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <Container className="border-t border-rule py-8">
        <div className="flex flex-col gap-3 text-caption text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name} &mdash; {site.tagline}
          </p>

          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="text-ink-body no-underline transition-colors duration-300 hover:text-teal"
            >
              {contact.email}
            </a>
          )}
        </div>
      </Container>
    </footer>
  );
}
