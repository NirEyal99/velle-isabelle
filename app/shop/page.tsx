import type { Metadata } from "next";
import Link from "next/link";
import { PlanCard } from "@/components/shop/PlanCard";
import { ProductCard } from "@/components/shop/ProductCard";

export const metadata: Metadata = {
  title: "shop",
  description: "shop the velle ritual: scalp serum, hydrating shampoo and nourishing conditioner, as a monthly ritual, a 6-month glow journey, a set or on their own.",
};

export default function ShopPage() {
  return (
    <>
      <section className="bg-blush" aria-labelledby="shop-title">
        <div className="container-page py-14 md:py-20">
          <h1 id="shop-title" className="heading-xl">
            shop velle
          </h1>
          <p className="mt-4 max-w-md text-[17px]">
            elite hair health, texture and flow, in three steps. start with a set, or pick your favorites.{" "}
            <Link href="/quiz" className="font-semibold underline underline-offset-4">
              not sure? take the quiz.
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-oat" aria-labelledby="sets-title">
        <div className="container-page py-16 md:py-20">
          <h2 id="sets-title" className="heading-lg">
            the sets
          </h2>
          <p className="mt-2 text-cocoa-soft">all three steps, together. subscriptions always ship free.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <PlanCard id="ritual" />
            <PlanCard id="glow-journey" />
            <PlanCard id="full-set" />
            <PlanCard id="trial-kit" />
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20" aria-labelledby="singles-title">
        <h2 id="singles-title" className="heading-lg">
          on their own
        </h2>
        <p className="mt-2 text-cocoa-soft">every product, full size.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <ProductCard id="serum" tile="bg-clay text-cocoa-deep" />
          <ProductCard id="shampoo" tile="bg-blush" />
          <ProductCard id="conditioner" tile="bg-latte" />
        </div>
      </section>
    </>
  );
}
