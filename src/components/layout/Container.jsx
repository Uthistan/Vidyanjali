/**
 * The content column. Capped at 1120px (`--container-page`) to match the
 * audited ~1131px column of the reference, with generous gutters that grow
 * with the viewport rather than clamping to a fixed pad.
 */
export default function Container({ as: Tag = "div", className = "", children }) {
  return (
    <Tag className={`mx-auto w-full max-w-page px-6 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </Tag>
  );
}
