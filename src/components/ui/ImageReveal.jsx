import Image from "next/image";
import Reveal from "./Reveal";

/**
 * The editorial photograph.
 *
 * This is the ONLY component that should place a client photograph. It takes
 * an entry from `src/content/photos.js` rather than a path and an alt string,
 * so alt text stays reviewable in one place and a photograph can be swapped
 * without touching a layout.
 *
 * A server component: `Reveal` is the client boundary and it only receives
 * already-rendered children, so no page pays for this in JS.
 *
 * FRAMING. Every supplied original is portrait and none exceeds 1600px on its
 * long edge, so the ratios here stop at 3:2 — there is no source that can fill
 * a wide banner without visible softening. See the `gaps` note in photos.js.
 *
 * @param {object} props.photo - an entry from `photos` in content/photos.js.
 * @param {"portrait"|"tall"|"square"|"landscape"|"natural"} [props.ratio]
 * @param {"none"|"hairline"} [props.frame] - the thin rule around the image.
 * @param {string} [props.caption] - rendered below, in the caption size.
 * @param {string} [props.captionClassName] - override the caption colour. The
 *   default soft ink is a light-surface value; on the deep teal and deep purple
 *   bands the caption has to invert or it drops to about 1.5:1.
 * @param {boolean} [props.zoom] - subtle scale on hover and keyboard focus.
 * @param {string} [props.sizes] - passed to next/image; set it when the image
 *   is not full-width, or the browser downloads more than it needs.
 * @param {string} [props.frameClassName] - extra classes on the aspect-ratio
 *   frame itself. The hero uses it to trade the fixed ratio for `h-full`, so
 *   the photograph can fill an absolutely-positioned column whose height is
 *   set by the composition around it rather than by the image's own crop.
 */

const RATIOS = {
  portrait: "aspect-[4/5]",
  tall: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[3/2]",
  natural: "",
};

const FRAMES = {
  none: "",
  hairline: "border border-rule",
};

export default function ImageReveal({
  photo,
  ratio = "portrait",
  frame = "none",
  zoom = false,
  caption,
  captionClassName = "text-ink-soft",
  priority = false,
  delay = 0,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className = "",
  frameClassName = "",
  imageClassName = "",
}) {
  if (!photo) return null;

  const isNatural = ratio === "natural";

  return (
    <figure className={className}>
      <Reveal
        variant="mask"
        delay={delay}
        duration={1000}
        /* overflow-hidden contains the overscaled media. The wipe itself is a
           clip-path on `.reveal-clip` INSIDE this element, never on this
           element — see the MOTION SYSTEM note in globals.css. Clipping the
           observed element would stop it ever intersecting, and the
           photograph would never appear. */
        className={`relative overflow-hidden bg-canvas-warm ${zoom ? "photo-zoom" : ""} ${RATIOS[ratio] ?? RATIOS.portrait} ${FRAMES[frame] ?? ""} ${frameClassName}`}
      >
        <div className={`reveal-clip ${isNatural ? "" : "absolute inset-0"}`}>
          <Image
            src={photo.src}
            alt={photo.alt}
            {...(isNatural
              ? { width: photo.width, height: photo.height }
              : { fill: true })}
            sizes={sizes}
            priority={priority}
            style={isNatural ? undefined : { objectPosition: photo.focal ?? "50% 50%" }}
            /* In `natural` the image sets its own height and there is nothing
               to crop against, so object-fit and the focal point do not apply. */
            className={`reveal-media ${
              isNatural ? "h-auto w-full" : "h-full w-full object-cover"
            } ${imageClassName}`}
          />
        </div>
      </Reveal>

      {caption && (
        <figcaption className={`mt-4 max-w-measure text-caption ${captionClassName}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
