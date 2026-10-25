"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { findOrder, useAccount, type Order } from "@/lib/account";
import { formatMoney } from "@/lib/pricing";
import { nextChargeCents } from "@/lib/subscription";
import { guarantee } from "@/config/promotions";

const longDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export function OrderConfirmation() {
  const id = useSearchParams().get("order") ?? "";
  const { ready, account } = useAccount();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    if (ready) setOrder(findOrder(id) ?? null);
  }, [id, ready, account]);

  if (order === undefined) return <p className="py-24 text-center">loading your order…</p>;
  if (order === null) {
    return (
      <div className="py-24 text-center">
        <h1 className="heading-lg">we couldn&apos;t find that order</h1>
        <p className="mt-3 text-cocoa-soft">it may have been placed in a different browser. your orders are always in your account.</p>
        <Link href="/account" className="btn-primary mt-8">
          go to my account
        </Link>
      </div>
    );
  }

  const sub = order.subscriptionId ? account?.subscriptions.find((s) => s.id === order.subscriptionId) : undefined;

  return (
    <div className="mx-auto max-w-2xl">
      <p className="label">order {order.id}</p>
      <h1 className="heading-xl mt-3">thank you, {order.name.split(" ")[0].toLowerCase()} ♡</h1>
      <p className="mt-5 text-[17px]">
        your order is confirmed and we&apos;ll email updates to <strong>{order.email}</strong>. your hair is about to get very touchable.
      </p>
      <p className="mt-3 rounded-2xl bg-blush px-4 py-3 text-[15px]">demo store: no real payment was taken and nothing will ship.</p>

      <div className="mt-8 rounded-[2rem] bg-oat p-6 md:p-8">
        <h2 className="text-xl font-extrabold tracking-[-0.03em]">what you ordered</h2>
        <ul className="mt-4 divide-y divide-cocoa/10">
          {order.lines.map((l) => (
            <li key={l.name} className="flex justify-between gap-4 py-3">
              <span>
                <span className="font-bold">{l.name}</span> × {l.qty}
              </span>
              <span className="tabular-nums">{formatMoney(l.lineCents)}</span>
            </li>
          ))}
          {order.gifts.map((g) => (
            <li key={g} className="flex justify-between gap-4 py-3">
              <span className="font-bold">{g}</span>
              <span className="text-sm font-bold uppercase">free</span>
            </li>
          ))}
        </ul>
        <dl className="mt-3 space-y-1.5 border-t border-cocoa/10 pt-4 tabular-nums">
          {order.discountCents > 0 && (
            <div className="flex justify-between text-clay-ink">
              <dt>launch discount</dt>
              <dd>−{formatMoney(order.discountCents)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt>shipping</dt>
            <dd>{order.shippingCents === 0 ? "free" : formatMoney(order.shippingCents)}</dd>
          </div>
          <div className="flex justify-between text-lg font-extrabold">
            <dt>paid</dt>
            <dd>{formatMoney(order.totalCents)}</dd>
          </div>
        </dl>
        <div className="mt-6 grid gap-6 text-[15px] sm:grid-cols-2">
          <div>
            <h3 className="font-bold">shipping to</h3>
            <p className="mt-1 text-cocoa-soft">
              {order.name}
              <br />
              {order.address.line1}
              {order.address.line2 && (
                <>
                  <br />
                  {order.address.line2}
                </>
              )}
              <br />
              {order.address.city}, {order.address.state} {order.address.zip}
            </p>
          </div>
          <div>
            <h3 className="font-bold">paid with</h3>
            <p className="mt-1 text-cocoa-soft">visa ending in {order.payment.last4}</p>
          </div>
        </div>
      </div>

      {sub && sub.nextChargeAt && (
        <div className="mt-5 rounded-[2rem] bg-cocoa p-6 text-cream md:p-8">
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">your ritual is set up</h2>
          <p className="mt-2 opacity-90">
            next delivery on {longDate(sub.nextChargeAt)} for {formatMoney(nextChargeCents(sub))}. skip, pause or cancel anytime from your account.
          </p>
        </div>
      )}

      <p className="mt-6 text-[15px] text-cocoa-soft">{guarantee.long}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/account" className="btn-primary">
          view my account
        </Link>
        <Link href="/shop" className="btn-outline">
          keep shopping
        </Link>
      </div>
    </div>
  );
}
