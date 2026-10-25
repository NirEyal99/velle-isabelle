import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, type ProductId } from "@/config/pricing";
import { freeFrom, productDetails } from "@/content/products";
import applying from "@/public/images/applying.jpg";
import trio from "@/public/images/trio.jpg";
import ingredients from "@/public/images/ingredients.jpg";
import { Gallery } from "@/components/shop/Gallery";
import { BuyBox } from "@/components/shop/BuyBox";
import { ProductCard } from "@/components/shop/ProductCard";
import { LaunchNote, Price } from "@/components/Price";

const ids = Object.keys(products) as ProductId[];
const isProduct = (id: string): id is ProductId => (ids as string[]).includes(id);

export function generateStaticParams() {
  return ids.map((id) => ({ id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  if (!isProduct(id)) return {};
  const d = productDetails[id];
  return {
    title: products[id].name.toLowerCase(),
    description: `${d.short} ${d.description}`,
    openGraph: { images: [{ url: d.image.src, alt: d.imageAlt }] },
  };
}

// The extra photos shown under each product.
const extraPhotos: Record<ProductId, { src: typeof trio; alt: string }[]> = {
  serum: [
    { src: applying, alt: "woman with long, glossy brown waves dropping velle scalp serum onto her parting" },
    { src: ingredients, alt: "rosemary, mint, rice water and oil drops on linen" },
  ],
  shampoo: [
    { src: trio, alt: "velle scalp serum, hydrating shampoo and nourishing conditioner together" },
    { src: ingredients, alt: "rosemary, mint, rice water and oil drops on linen" },
  ],
  conditioner: [
    { src: trio, alt: "velle scalp serum, hydrating shampoo and nourishing conditioner together" },
    { src: ingredients, alt: "rosemary, mint, rice water and oil drops on linen" },
  ],
};

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isProduct(id)) notFound();
  const p = products[id];
  const d = productDetails[id];
  const others = ids.filter((x) => x !== id);

  return (
    <>
      <section className="container-page grid gap-10 py-10 md:grid-cols-2 md:gap-16 md:py-16" aria-labelledby="product-title">
        <Gallery images={[{ src: d.image, alt: d.imageAlt }, ...extraPhotos[id]]} />
        <div className="md:pt-4">
          <p className="label">{d.feel}</p>
          <h1 id="product-title" className="heading-lg mt-2">
            {p.name.toLowerCase()}
          </h1>
          <p className="mt-3 text-[17px]">{d.short}</p>
          <p className="mt-5 text-3xl font-medium">
            <Price dollars={p.price} /> <span className="text-base font-normal text-cocoa-soft">· {p.size}</span>
          </p>
          <LaunchNote />
          <p className="mt-5 leading-relaxed text-cocoa-soft">{d.description}</p>
          <div className="mt-7">
            <BuyBox id={id} name={p.name} />
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm text-cocoa-soft" aria-label="free from and certifications">
            {freeFrom.map((f) => (
              <li key={f}>✓ {f}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-oat" aria-labelledby="details-title">
        <h2 id="details-title" className="sr-only">
          ingredients and how to use
        </h2>
        <div className="container-page grid gap-12 py-16 md:grid-cols-2 md:gap-16 md:py-20">
          <div>
            <h3 className="text-[1.9rem] leading-none font-extrabold tracking-[-0.04em]">what&apos;s inside</h3>
            <ul className="mt-6 divide-y divide-cocoa/10 border-y border-cocoa/10">
              {d.keyIngredients.map((ing) => (
                <li key={ing.name} className="py-4">
                  <p className="font-bold">{ing.name}</p>
                  <p className="text-cocoa-soft">{ing.why}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[1.9rem] leading-none font-extrabold tracking-[-0.04em]">how to use</h3>
            <ol className="mt-6 space-y-4">
              {d.howToUse.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cocoa text-sm font-bold text-cream" aria-hidden="true">
                    {i + 1}
                  </span>
                  <p className="pt-1.5">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20" aria-labelledby="reviews-title">
        <h2 id="reviews-title" className="heading-lg">
          reviews
        </h2>
        <div className="mt-6 max-w-lg">
          <p className="text-[17px] text-cocoa-soft">
            no reviews yet. we just launched, so the {p.name.toLowerCase()} is waiting for its first one. we&apos;ll only ever show real reviews from real customers.
          </p>
        </div>
      </section>

      <section className="bg-oat" aria-labelledby="more-title">
        <div className="container-page py-16 md:py-20">
          <h2 id="more-title" className="heading-lg">
            complete the ritual
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {others.map((o, i) => (
              <ProductCard key={o} id={o} tile={i === 0 ? "bg-blush" : "bg-latte"} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
