import Link from "next/link";
import { Drop } from "@/components/Logo";

/**
 * Results gallery. Empty on purpose until real customer reviews and photos
 * come in — we never show made-up results.
 */
const results: { id: string }[] = [];

export function Results() {
  return (
    <section className="container-page py-16 md:py-24" aria-labelledby="results-title">
      <p className="eyebrow">real results</p>
      <h2 id="results-title" className="heading-lg mt-3">
        the velle wall.
      </h2>
      {results.length === 0 && (
        <div className="mt-10 rounded-3xl border border-dashed border-latte px-6 py-14 text-center">
          <Drop className="mx-auto h-8 w-auto" />
          <p className="mt-4 text-xl font-medium">real reviews, coming soon.</p>
          <p className="mx-auto mt-2 max-w-md text-cocoa-soft">
            we only share real photos from real customers, never stock shots or filters. try the ritual and you could be first on the wall.
          </p>
          <Link href="/shop" className="btn-outline mt-6">
            be one of the first
          </Link>
        </div>
      )}
    </section>
  );
}
