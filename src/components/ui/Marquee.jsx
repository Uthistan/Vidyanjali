/**
 * Continuously scrolling ticker — the "what people notice" pattern from the
 * audit. Pure CSS: the track is rendered twice and translated -50%, so the
 * loop is seamless with no JS and no measuring.
 *
 * This is a server component. The duplicate track is aria-hidden so screen
 * readers hear the list once.
 *
 * `prefers-reduced-motion` halts the animation via the global rule in
 * globals.css, leaving a static, readable row.
 *
 * @param {number} [props.speed] - seconds per full cycle. Higher is slower.
 * @param {boolean} [props.reverse] - scroll left-to-right instead.
 */
export default function Marquee({
  items = [],
  speed = 42,
  reverse = false,
  renderItem,
  className = "",
}) {
  if (items.length === 0) return null;

  const track = (ariaHidden) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
    >
      {items.map((item, i) => (
        <li key={`${String(item)}-${i}`} className="shrink-0">
          {renderItem ? renderItem(item) : item}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`group relative flex overflow-hidden ${className}`}
      // Fade the edges so items enter and leave rather than being chopped off.
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6rem, black calc(100% - 6rem), transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6rem, black calc(100% - 6rem), transparent)",
      }}
    >
      <div
        className="flex w-max animate-marquee motion-safe:group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
