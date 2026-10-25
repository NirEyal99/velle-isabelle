import Image from "next/image";
import Link from "next/link";
import { products, type ProductId } from "@/config/pricing";
import { productDetails } from "@/content/products";
import { AddToCart } from "@/components/cart/AddToCart";
import { LaunchNote, Price } from "@/components/Price";
import { GuaranteeBadge } from "@/components/GuaranteeBadge";

/** A single product with a link to its page and an add-to-cart button. */
export function ProductCard({ id, tile = "bg-blush" }: { id: ProductId; tile?: string }) {
  const p = products[id];
  const d = productDetails[id];
  return (
    <article className={`flex flex-col rounded-[2rem] p-4 pb-6 ${tile}`} aria-labelledby={`product-${id}`}>
      <Link href={`/products/${id}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
          <Image src={d.image} alt={d.imageAlt} fill placeholder="blur" sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        </div>
        <h3 id={`product-${id}`} className="mt-5 px-2 text-[1.7rem] leading-none font-extrabold tracking-[-0.04em]">
          {p.name.toLowerCase()}
        </h3>
      </Link>
      <div className="flex flex-1 flex-col px-2">
        <p className="mt-2">{d.short}</p>
        <p className="mt-3 text-2xl font-medium">
          <Price dollars={p.price} /> <span className="text-sm font-normal">· {p.size}</span>
        </p>
        <LaunchNote className="self-start" />
        <AddToCart kind="product" id={id} className="btn-primary mt-6">
          add to cart
        </AddToCart>
        <GuaranteeBadge className="mt-3 !text-cocoa" />
      </div>
    </article>
  );
}
