/**
 * Long-form text block. Constrains to the paragraph measure and sets the
 * body rhythm — 21px at 1.6 line-height, the single most defining metric
 * from the audit.
 *
 * Styling is applied to descendants so this can wrap CMS/MDX output later
 * without needing per-element classes.
 */
export default function Prose({ className = "", children }) {
  return (
    <div
      className={`max-w-measure text-body text-ink-body
        [&_a]:text-teal [&_a]:underline [&_a]:underline-offset-4
        [&_h2]:mt-14 [&_h2]:mb-5 [&_h2]:text-h2
        [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-h3
        [&_li]:mb-2
        [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6
        [&_p]:mb-6
        [&_strong]:font-semibold [&_strong]:text-ink
        [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6
        [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 ${className}`}
    >
      {children}
    </div>
  );
}
