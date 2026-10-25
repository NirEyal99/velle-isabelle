import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, type ProductId } from "@/config/pricing";
import { productDetails } from "@/content/products";
import { ProductView } from "@/components/shop/ProductView";

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

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isProduct(id)) notFound();
  return <ProductView id={id} />;
}
