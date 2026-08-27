import Eyebrow from "./Eyebrow";

/**
 * A person: role, name, qualifications, biography.
 *
 * Text-led and photograph-free by design — no portraits have been supplied,
 * and an empty avatar circle would be worse than none. If real photography
 * arrives, add it above the eyebrow rather than beside it, so the column
 * rhythm below is untouched.
 *
 * A hairline top rule separates people instead of card fills: five stacked
 * cards would fight the restraint of the rest of the site.
 *
 * @param {"lg"|"md"} [props.size] - lg for founders, md for the wider team.
 * @param {string[]} props.bio - one string per paragraph.
 */
export default function Person({
  name,
  credentials,
  role,
  bio = [],
  size = "md",
  eyebrowTone,
  className = "",
}) {
  const large = size === "lg";

  return (
    <div className={`border-t border-rule pt-8 ${className}`}>
      {role && (
        <Eyebrow tone={eyebrowTone} className="mb-4">
          {role}
        </Eyebrow>
      )}

      <h3 className={large ? "text-h2" : "text-h3"}>{name}</h3>

      {credentials && (
        <p className="mt-2 font-sans text-caption text-ink-soft">
          {credentials}
        </p>
      )}

      {bio.length > 0 && (
        <div
          className={`mt-6 max-w-measure ${large ? "text-body" : "text-body-sm"} text-ink-body`}
        >
          {bio.map((paragraph) => (
            <p key={paragraph} className="mb-5 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
