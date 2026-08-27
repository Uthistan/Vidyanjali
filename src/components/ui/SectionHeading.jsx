import Eyebrow from "./Eyebrow";

/**
 * Eyebrow + heading + optional lede, at the audited sizes.
 * The lede is capped to the paragraph measure (~544px) — long headings run
 * wide, but body copy never does. That contrast is a big part of the rhythm.
 */
export default function SectionHeading({
  eyebrow,
  eyebrowTone,
  title,
  lede,
  as: Tag = "h2",
  align = "left",
  size = "h2",
  className = "",
}) {
  const centred = align === "center";

  return (
    <div
      className={`flex flex-col ${centred ? "items-center text-center" : "items-start"} ${className}`}
    >
      {eyebrow && (
        <Eyebrow tone={eyebrowTone} className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}

      <Tag
        className={`max-w-[20ch] ${centred ? "mx-auto" : ""} ${size === "h1" ? "text-h1" : "text-h2"}`}
      >
        {title}
      </Tag>

      {lede && (
        <p
          className={`mt-6 max-w-measure text-lede text-ink-body ${centred ? "mx-auto" : ""}`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
