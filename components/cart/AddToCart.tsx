"use client";

import type { PlanId, ProductId } from "@/config/pricing";
import { useCart } from "@/lib/cart-context";

type Props = { className?: string; children: React.ReactNode; qty?: number } & (
  | { kind: "product"; id: ProductId }
  | { kind: "plan"; id: PlanId }
);

/** A button that adds an item to the cart and opens it. */
export function AddToCart({ className = "btn-primary", children, qty = 1, ...item }: Props) {
  const { add } = useCart();
  return (
    <button type="button" className={className} onClick={() => add({ kind: item.kind, id: item.id } as Parameters<typeof add>[0], qty)}>
      {children}
    </button>
  );
}
