"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/brand/Logo";
import Button from "@/components/ui/Button";
import Container from "./Container";
import { navItems } from "@/content/site";

/**
 * Site header.
 *
 * Per the audit the header is TALL (~140px desktop) and deliberately NOT
 * sticky — it scrolls away. That unhurried header is a real part of the feel,
 * so resist the urge to pin it.
 *
 * Mobile collapses to logo + toggle, opening a full-screen drawer with scroll
 * lock and a focus trap.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
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

  return (
    <header className="relative z-50 border-b border-rule bg-canvas">
      <Container className="flex h-24 items-center justify-between lg:h-35">
        <Logo asLink priority variant="full" size="md" className="shrink-0" />

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navItems.map((item) => (
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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d={open ? "M5 5l14 14M19 5L5 19" : "M3 7h18M3 17h18"}
              stroke="currentColor"
              strokeWidth="1.75"
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
        className="fixed inset-x-0 top-24 bottom-0 z-50 overflow-y-auto border-t border-rule bg-canvas lg:hidden"
      >
        <nav aria-label="Primary" className="px-6 py-8 sm:px-8">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-rule">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block py-5 text-h3 no-underline ${
                    isActive(item.href) ? "text-teal" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Button href="/contact" variant="primary" size="lg" className="mt-10 w-full">
            Get in touch
          </Button>
        </nav>
      </div>
    </header>
  );
}
