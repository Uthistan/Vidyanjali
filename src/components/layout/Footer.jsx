import Link from "next/link";
import Logo from "@/components/brand/Logo";
import Container from "./Container";
import { allRoutes, contact, site } from "@/content/site";

/**
 * Footer: a thin closing row and nothing else.
 *
 * The large CTA band that used to live here is now `ClosingCTA`, placed by
 * each page — see that file. What remains is deliberately quiet: the lockup,
 * the routes, a copyright line.
 *
 * `Get Involved` appears here even though it is absent from the header. The
 * footer is where a site lists what exists; the header is where it says what
 * is worth your attention. The page is still two `ContentPending` blocks.
 *
 * NO invented contact details. `contact.email` is null until the client
 * supplies it, and the block below simply does not render — which is the
 * correct behaviour, not a gap to be filled with a plausible-looking address.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-rule">
      <Container className="flex flex-col gap-12 py-16 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-5">
          {/* Live type rather than the stacked lockup image: at footer scale
              the artwork's tagline is only a few pixels tall and reads as a
              smudge. */}
          <Logo variant="full" size="md" />
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-10">
            {allRoutes.map((item) => (
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
