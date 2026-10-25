import Link from "next/link";

/**
 * Results gallery. Empty on purpose until real customer reviews and photos
 * come in. We never show made-up results.
 */
const results: { id: string }[] = [];

export function Results() {
  return (
    <section className="container-page py-20 md:py-32" aria-labelledby="results-title">
      <p className="label">real results</p>
      <h2 id="results-title" className="heading-lg mt-3">
        coming soon
      </h2>
      {results.length === 0 && (
        <div className="mt-8 max-w-lg">
          <p className="text-[17px] leading-relaxed text-cocoa-soft">
            we just launched, so there are no reviews yet. when they come in, we&apos;ll only share real photos from real customers.
          </p>
          <Link href="/shop" className="btn-outline mt-7">
            be one of the first
          </Link>
        </div>
      )}
    </section>
  );
}
