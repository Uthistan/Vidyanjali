"use client";

import { useEffect, useRef } from "react";

/**
 * Fade-and-rise on scroll into view — the one section-level animation the
 * reference site uses. Deliberately dependency-free: an IntersectionObserver
 * and two CSS custom properties do everything a motion library would here.
 *
 * The hidden start state lives in globals.css scoped to [data-js="true"], so
 * users without JS see content immediately rather than a blank page.
 * `prefers-reduced-motion` is handled in CSS, so it holds even mid-transition.
 *
 * @param {number} [props.delay] - stagger, in ms.
 * @param {string} [props.as] - element to render, defaults to div.
 */
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // The revealed flag is a presentational DOM attribute, not application
    // state — nothing renders from it. Setting it directly keeps this a
    // one-way sync to the DOM and avoids a re-render per element on scroll.
    const reveal = () => node.setAttribute("data-revealed", "true");

    // Bail out cleanly on older browsers — content simply shows.
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        }
      },
      // Fire slightly before the element reaches the fold so the motion
      // reads as "already settling" rather than snapping in late.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      data-revealed="false"
      style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
