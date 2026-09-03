"use client";

import { useEffect, useRef } from "react";

/**
 * The site's one scroll animation, in four flavours.
 *
 * Deliberately dependency-free: an IntersectionObserver and a handful of CSS
 * custom properties do everything a motion library would here. The observer
 * disconnects on first intersection, so an element animates once and then
 * costs nothing — content does not re-animate when scrolled back past.
 *
 * The visual states all live in globals.css under MOTION SYSTEM. This file
 * only decides WHEN. That split is what keeps `prefers-reduced-motion` honest:
 * it is enforced in CSS, so it holds even if the setting changes mid-scroll,
 * and it cannot be defeated by a component forgetting to check.
 *
 * The hidden start state is scoped to [data-js="true"] — set by the inline
 * script in layout.js before first paint — so with JS off or still loading,
 * everything renders plainly instead of sitting invisible at opacity 0.
 *
 * @param {"rise"|"fade"|"mask"|"scale"} [props.variant]
 *   rise:  fade up 1.5rem. The default; for text and blocks.
 *   fade:  opacity only, no travel.
 *   mask:  a wipe up from the bottom edge, with the media settling out of a
 *          slight overscale. For photographs. Needs `reveal-media` on the img.
 *   scale: the overscale settle without the wipe.
 * @param {number} [props.delay] - stagger, in ms.
 * @param {number} [props.duration] - override, in ms.
 * @param {string} [props.as] - element to render. Defaults to div.
 */
export default function Reveal({
  as: Tag = "div",
  variant = "rise",
  delay = 0,
  duration,
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

  const style = {};
  if (delay) style["--reveal-delay"] = `${delay}ms`;
  if (duration) style["--reveal-duration"] = `${duration}ms`;

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      data-reveal={variant === "rise" ? undefined : variant}
      data-revealed="false"
      style={Object.keys(style).length > 0 ? style : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
