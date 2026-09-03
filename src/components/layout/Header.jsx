"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/brand/Logo";
import Container from "./Container";
import { navCta, primaryNav } from "@/content/site";

/**
 * Site header.
 *
 * CHANGE FROM STAGE 1: this header used to scroll away. The unhurried,
 * non-sticky header was a deliberate call and it did suit the feel, but the
 * page is now long and photography-led, and a reader six sections deep had no
 * way back to the navigation or to the enquiry link without scrolling to the
 * top. It is now pinned — but it earns the pin by shrinking.
 *
 * At rest it is tall and sits flush on the canvas with no border, so the top
 * of the page reads as one uninterrupted composition. Past the fold it
 * condenses to a slim bar with a hairline rule. Nothing moves horizontally and
 * nothing fades in or out; only the height and the rule change, which is what
 * keeps it from feeling like a widget bolted to the top of the page.
 *
 * Three items and one CTA. `Get Involved` is deliberately absent — see the
 * note on `primaryNav` in content/site.js.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef(null);
  const toggleRef = useRef(null);

  /* Close the drawer whenever the route changes — including on browser
     back/forward, which a link onClick would miss. Adjusting state during
     render is React's documented pattern for this; an effect here would
     cause a cascading re-render. */
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  /* Condense past roughly one screen of scrolling. Read inside rAF so the
     scroll handler never forces layout, and only commit when the boolean
     actually flips, so React re-renders twice per page rather than per pixel. */
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setCondensed(window.scrollY > 120);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll, trap focus, and close on Escape while open. */
  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const focusables = () =>
      drawerRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? [];

    focusables()[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const nodes = focusables();
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
    };
  }, [open]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* The drawer is anchored to the header's own height, so it stays flush
     whichever state the header is in.

     At rest this used to be 128px on desktop. Together with the masthead datum
     and the hero's own top padding that put 277px above the first word of the
     statement — a third of a 860px laptop viewport spent before the page said
     anything. 104px still reads as an unhurried header and gives the hero back
     24px. */
  const barHeight = condensed ? "h-16 lg:h-18" : "h-20 lg:h-26";

  return (
    <header
      data-condensed={condensed || undefined}
      className={`sticky top-0 z-50 bg-canvas transition-[border-color] duration-500 ease-out-soft ${
        condensed || open ? "border-b border-rule" : "border-b border-transparent"
      }`}
    >
      <Container
        className={`flex items-center justify-between transition-[height] duration-500 ease-out-soft ${barHeight}`}
      >
        <Logo asLink priority variant="full" size="md" className="shrink-0" />

        {/* Desktop navigation */}
        <div className="hidden items-center gap-10 lg:flex">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-9">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative text-body-sm font-medium no-underline transition-colors duration-300
                      after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right
                      after:scale-x-0 after:bg-teal after:transition-transform after:duration-300
                      after:ease-out-soft hover:text-teal hover:after:origin-left hover:after:scale-x-100
                      ${isActive(item.href) ? "text-teal after:origin-left after:scale-x-100" : "text-ink-body"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Text-and-arrow rather than a filled pill. A solid button in the
              header would be the loudest thing on the page and would compete
              with the hero's own CTA; the arrow carries the same instruction
              at a fraction of the weight. */}
          <Link
            href={navCta.href}
            className="group inline-flex items-center gap-2 text-body-sm font-semibold text-ink no-underline transition-colors duration-300 hover:text-teal"
          >
            {navCta.label}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-pill text-ink lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d={open ? "M5 5l14 14M19 5L5 19" : "M3 7h18M3 17h18"}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </Container>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        ref={drawerRef}
        hidden={!open}
        className={`fixed inset-x-0 bottom-0 z-50 overflow-y-auto border-t border-rule bg-canvas lg:hidden ${
          condensed ? "top-16" : "top-20"
        }`}
      >
        <nav aria-label="Primary" className="px-6 py-10 sm:px-8">
          <ul className="flex flex-col">
            {primaryNav.map((item) => (
              <li key={item.href} className="border-b border-rule">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block py-6 font-display text-h2 no-underline ${
                    isActive(item.href) ? "text-teal" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={navCta.href}
            className="mt-12 inline-flex items-center gap-3 text-lede font-semibold text-teal no-underline"
          >
            {navCta.label}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
