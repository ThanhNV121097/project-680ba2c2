/**
 * Mây Coffee Roasters has no logo of its own, so this is the mark: a single
 * roasted coffee bean, drawn as two arcs meeting at the bean's centre crease
 * — geometric, not a picture, in currentColor so it follows the palette and
 * both modes. The same path is public/favicon.svg.
 */
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 4c6.6 0 11 5.1 11 11.3C27 22.3 22 28 16 28S5 22.3 5 15.3C5 9.1 9.4 4 16 4Z" />
      <path d="M16 6.2c-3.4 3-5 6-5 9.1 0 3.4 2 6.6 5 9.4" strokeLinecap="round" />
    </svg>
  );
}
