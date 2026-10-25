"use client";

import Image from "next/image";
import type { PlanId, ProductId } from "@/config/pricing";
import { launch } from "@/config/promotions";
import { itemImages } from "@/content/images";
import type { CartTotals } from "@/lib/cart-math";
import { formatMoney } from "@/lib/pricing";

/** Items, free gifts and totals. Used on the checkout page. */
export function OrderSummary({ totals: t }: { totals: CartTotals }) {
  return (
    <div>
      <ul className="divide-y divide-cocoa/10">
        {t.lines.map((l) => {
          const img = itemImages[l.id as ProductId | PlanId];
          return (
            <li key={l.key} className="flex gap-4 py-3">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-oat">
                <Image src={img.src} alt={img.alt} fill sizes="64px" className="object-cover" />
                <span className="absolute top-1 right-1 grid size-5 place-items-center rounded-full bg-cocoa text-[11px] font-bold text-cream" aria-label={`quantity ${l.qty}`}>
                  {l.qty}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-3">
                  <p className="font-bold">{l.name}</p>
                  <p className="tabular-nums">{formatMoney(l.lineCents)}</p>
                </div>
                {l.note && <p className="text-[13px] text-cocoa-soft">{l.note}</p>}
              </div>
            </li>
          );
        })}
        {t.freeGifts.map((g) => (
          <li key={g.id} className="flex items-center justify-between gap-3 py-3">
            <div>
              <p className="font-bold">{g.name}</p>
              <p className="text-[13px] text-cocoa-soft">{g.reason}</p>
            </div>
            <p className="rounded-full bg-cocoa px-3 py-1 text-xs font-bold text-cream uppercase">free</p>
          </li>
        ))}
      </ul>
      <dl className="mt-3 space-y-1.5 border-t border-cocoa/10 pt-4 text-[15px] tabular-nums">
        <div className="flex justify-between">
          <dt>subtotal</dt>
          <dd>{formatMoney(t.subtotalCents)}</dd>
        </div>
        {t.discountCents > 0 && (
          <div className="flex justify-between font-semibold text-clay-ink">
            <dt>launch week {launch.percentOff}% off</dt>
            <dd>−{formatMoney(t.discountCents)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt>shipping</dt>
          <dd>{t.shippingCents === 0 ? "free" : formatMoney(t.shippingCents)}</dd>
        </div>
        <div className="flex justify-between border-t border-cocoa/10 pt-2 text-lg font-extrabold">
          <dt>{t.hasSubscription ? "due today" : "total"}</dt>
          <dd>{formatMoney(t.totalCents)}</dd>
        </div>
      </dl>
    </div>
  );
}
