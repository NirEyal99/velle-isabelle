import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "checkout", robots: { index: false } };

/** Placeholder until the demo checkout is built (phase 3). */
export default function CheckoutPage() {
  return (
    <section className="container-page py-24 text-center md:py-32" aria-labelledby="checkout-title">
      <h1 id="checkout-title" className="heading-lg">
        checkout is almost here
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[17px] text-cocoa-soft">
        this is a demo store, and the checkout is being built next. your bag is saved, so nothing&apos;s lost.
      </p>
      <Link href="/shop" className="btn-primary mt-8">
        keep shopping
      </Link>
    </section>
  );
}
