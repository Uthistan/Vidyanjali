/**
 * An unmistakable placeholder.
 *
 * Vidyanjali's copy, services and photography have not been supplied. Rather
 * than invent them, every unbuilt page region renders this block. It is meant
 * to look obviously provisional — if this ever ships to production, it should
 * be immediately apparent that something is missing.
 *
 * Delete each instance as the real content lands.
 */
export default function ContentPending({ label, note, className = "" }) {
  return (
    <div
      className={`rounded-card border-2 border-dashed border-rule-strong bg-canvas-lift/60 p-8 sm:p-12 ${className}`}
    >
      <p className="text-eyebrow font-sans uppercase text-purple-mid">
        Content pending
      </p>

      <p className="mt-3 max-w-measure text-h3 text-ink">
        {label ?? "Awaiting content from the client."}
      </p>

      {note && (
        <p className="mt-4 max-w-measure text-body-sm text-ink-soft">{note}</p>
      )}
    </div>
  );
}
