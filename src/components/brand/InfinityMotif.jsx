/**
 * Vidyanjali mark, monochrome — three dots above a twisted infinity loop.
 * Single fill color (defaults to currentColor so it inherits text color).
 * No gradients, no multicolor — just the shape.
 */
export default function InfinityMotif({
  className = "",
  color = "currentColor",
}) {
  return (
    <svg
      viewBox="0 0 300 190"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* Left loop */}
      <path
        d="M150 100
           C150 70, 128 50, 98 50
           C64 50, 40 72, 40 100
           C40 128, 64 150, 98 150
           C122 150, 140 136, 150 116
           C140 128, 122 134, 104 128
           C82 121, 70 108, 70 100
           C70 92, 82 79, 104 72
           C122 66, 140 78, 150 100 Z"
        fill={color}
      />

      {/* Right loop */}
      <path
        d="M150 100
           C150 70, 172 50, 202 50
           C236 50, 260 72, 260 100
           C260 128, 236 150, 202 150
           C178 150, 160 136, 150 116
           C160 128, 178 134, 196 128
           C218 121, 230 108, 230 100
           C230 92, 218 79, 196 72
           C178 66, 160 78, 150 100 Z"
        fill={color}
      />

      {/* Three dots on top */}
      <circle cx="66" cy="34" r="20" fill={color} />
      <circle cx="150" cy="20" r="24" fill={color} />
      <circle cx="234" cy="34" r="20" fill={color} />
    </svg>
  );
}
