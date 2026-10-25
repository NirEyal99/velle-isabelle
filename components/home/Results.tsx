import Link from "next/link";

/**
 * Results gallery. Empty on purpose until real customer reviews and photos
 * come in. We never show made-up results.
 */
const results: { id: string }[] = [];

// Empty "polaroid" frames waiting for real customer photos.
const frames = [
  { caption: "your before?", tilt: "-rotate-6", bg: "bg-blush/60" },
  { caption: "month 3?", tilt: "rotate-3 translate-y-4", bg: "bg-oat" },
  { caption: "you, maybe!", tilt: "-rotate-2", bg: "bg-latte/40" },
  { caption: "month 6?", tilt: "rotate-6 translate-y-2", bg: "bg-blush/60" },
];

export function Results() {
  return (
    <section className="container-page py-20 md:py-28" aria-labelledby="results-title">
      {results.length === 0 && (
        <div className="grid items-center gap-14 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <div>
            <p className="note">real results</p>
            <h2 id="results-title" className="heading-lg mt-2">
              the velle wall is empty (for now)
            </h2>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-cocoa-soft">
              we&apos;re brand new, so there&apos;s nothing to show yet. when there is, it&apos;ll be real photos from real customers. we&apos;ll never use stock models or filters.
            </p>
            <Link href="/shop" className="btn-outline mt-7">
              be one of the first
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-8 px-2 md:gap-x-8" aria-label="empty photo spots for future reviews">
            {frames.map((f) => (
              <li key={f.caption} className={`bg-cream p-3 pb-2 shadow-[0_12px_30px_-16px_rgba(59,43,36,0.5)] ${f.tilt}`}>
                <div className={`grid aspect-square place-items-center ${f.bg}`}>
                  <svg viewBox="0 0 24 24" className="size-7 text-cocoa/40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
                    <circle cx="12" cy="13" r="3.5" />
                  </svg>
                </div>
                <p className="mt-1.5 text-center font-hand text-[1.35rem] text-cocoa-soft">{f.caption}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
