"use client";

import { useState } from "react";
import { plans, type ProductId } from "@/config/pricing";
import { useCart } from "@/lib/cart-context";
import { formatMoney, toCents } from "@/lib/pricing";
import { GuaranteeBadge } from "@/components/GuaranteeBadge";

/** Quantity picker, add to cart, and a nudge toward The Ritual on a product page. */
export function BuyBox({ id, name }: { id: ProductId; name: string }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  return (
    <div>
      <div className="flex gap-3">
        <div className="flex items-center rounded-full border border-cocoa/30">
          <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="grid size-12 place-items-center rounded-full text-lg" aria-label="one less">
            −
          </button>
          <span className="w-6 text-center tabular-nums" aria-live="polite" aria-label={`quantity ${qty}`}>
            {qty}
          </span>
          <button type="button" onClick={() => setQty(Math.min(6, qty + 1))} className="grid size-12 place-items-center rounded-full text-lg" aria-label="one more">
            +
          </button>
        </div>
        <button type="button" onClick={() => add({ kind: "product", id }, qty)} className="btn-primary flex-1">
          add to cart
        </button>
      </div>
      <GuaranteeBadge className="mt-3" />

      <div className="mt-6 rounded-2xl bg-blush p-5">
        <p className="font-bold">get all three steps with The Ritual</p>
        <p className="mt-1 text-[15px]">
          the {name.toLowerCase()} plus the other two, full size, every month for {formatMoney(toCents(plans.ritual.price))}. free shipping, skip or cancel anytime.
        </p>
        <button type="button" onClick={() => add({ kind: "plan", id: "ritual" })} className="btn-outline mt-4 min-h-11 w-full">
          {plans.ritual.cta}
        </button>
      </div>
    </div>
  );
}
