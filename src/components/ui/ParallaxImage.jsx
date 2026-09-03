"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * A photograph that drifts slightly against the scroll.
 *
 * Use sparingly — one per page at most. The effect is meant to read as depth,
 * not as an effect; at the default strength the image moves about 40px across
 * a full screen of scrolling, which is felt more than seen.
 *
 * IMPLEMENTATION NOTES
 *
 * - No scroll library, and no scroll handler doing layout reads. The position
 *   is sampled once per animation frame via IntersectionObserver + rAF, and
 *   the frame loop only runs while the element is actually on screen.
 * - The component writes a single CSS custom property. The transform that
 *   consumes it lives in globals.css (`.parallax-media`), which is also where
 *   `prefers-reduced-motion` cancels it — so a user with that setting gets a
 *   plain static image even though this component is still running.
 * - The media is overscaled by 12% in CSS so the travel never exposes an edge.
 *
 * @param {object} props.photo - an entry from `photos` in content/photos.js.
 * @param {number} [props.strength] - peak travel in px, each direction.
 */
export default function ParallaxImage({
  photo,
  strength = 40,
  ratio = "aspect-[4/5]",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className = "",
}) {
  const frameRef = useRef(null);
  const mediaRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;

    // Respect the setting here too, so the rAF loop never starts for a user
    // who would not see its output anyway.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let rafId = null;
    let running = false;

    const update = () => {
      const rect = frame.getBoundingClientRect();
      const viewport = window.innerHeight;

      // -1 when the frame sits just below the fold, +1 just above it, 0 when
      // its centre is level with the viewport centre.
      const progress =
        (rect.top + rect.height / 2 - viewport / 2) / (viewport / 2 + rect.height / 2);

      const clamped = Math.max(-1, Math.min(1, progress));
      media.style.setProperty("--parallax-y", `${(clamped * strength).toFixed(2)}px`);

      rafId = running ? requestAnimationFrame(update) : null;
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(update);
    };

    const stop = () => {
      running = false;
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    };

    // Off-screen frames cost nothing: the loop is bound to visibility rather
    // than to the scroll event, so a page with several of these is not
    // running several loops at once.
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "10% 0px" },
    );

    observer.observe(frame);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [strength]);

  if (!photo) return null;

  return (
    <div
      ref={frameRef}
      className={`relative overflow-hidden bg-canvas-warm ${ratio} ${className}`}
    >
      <Image
        ref={mediaRef}
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectPosition: photo.focal ?? "50% 50%" }}
        className="parallax-media h-full w-full object-cover"
      />
    </div>
  );
}
