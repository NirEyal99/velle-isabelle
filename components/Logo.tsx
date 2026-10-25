/** The clay teardrop from the velle logo. Also used on its own as an accent. */
export function Drop({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 14" className={className} aria-hidden="true" focusable="false">
      <path d="M5 0C5 0 0.6 6.1 0.6 9.1A4.4 4.4 0 0 0 9.4 9.1C9.4 6.1 5 0 5 0Z" fill="#B88A73" />
    </svg>
  );
}

/** "velle" in lowercase Figtree Medium, cocoa, with the teardrop at the top right of the last "e". */
export function Logo({ className = "text-3xl" }: { className?: string }) {
  return (
    <span className={`relative inline-block pr-[0.28em] leading-none font-medium tracking-tight text-cocoa ${className}`}>
      velle
      <Drop className="absolute top-[0.02em] right-0 h-[0.36em] w-auto" />
    </span>
  );
}
