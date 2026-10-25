"use client";

import { plans } from "@/config/pricing";
import { launch } from "@/config/promotions";
import { addOrder, signIn, type Address, type Order } from "@/lib/account";
import type { CartTotals } from "@/lib/cart-math";
import { payments } from "@/lib/payments";
import type { PaymentCard } from "@/lib/payments/types";
import { startSubscription } from "@/lib/subscription";
import { markWelcomeGiftUsed } from "@/lib/welcome";
import { toCents } from "@/lib/pricing";

export type PlaceOrderInput = {
  totals: CartTotals;
  launchActive: boolean;
  email: string;
  name: string;
  address: Address;
  card: PaymentCard;
};

export type PlaceOrderResult = { ok: true; order: Order } | { ok: false; field?: string; message: string };

const shortId = () => Math.random().toString(36).slice(2, 7).toUpperCase();

/** Takes payment, then records the order (and The Ritual subscription, if it's in the cart). */
export async function placeOrder(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  const { totals } = input;
  if (totals.lines.length === 0) return { ok: false, message: "your bag is empty." };

  const result = await payments.pay({
    amountCents: totals.totalCents,
    email: input.email,
    description: totals.lines.map((l) => `${l.qty}× ${l.name}`).join(", "),
    card: input.card,
  });
  if (!result.ok) return result;

  const now = new Date().toISOString();
  const orderId = `VL-${shortId()}`;

  const ritualLine = totals.lines.find((l) => l.kind === "plan" && l.id === "ritual");
  const subscription = ritualLine
    ? startSubscription({
        id: `SUB-${shortId()}`,
        monthlyCents: toCents(plans.ritual.price),
        introPercentOff: input.launchActive ? [...launch.subscriptionMonthsPercentOff] : [],
        now,
      })
    : undefined;

  const order: Order = {
    id: orderId,
    placedAt: now,
    email: input.email.trim().toLowerCase(),
    name: input.name.trim(),
    address: input.address,
    lines: totals.lines.map((l) => ({ name: l.name, qty: l.qty, lineCents: l.lineCents, note: l.note })),
    gifts: totals.freeGifts.map((g) => g.name),
    subtotalCents: totals.subtotalCents,
    discountCents: totals.discountCents,
    shippingCents: totals.shippingCents,
    totalCents: totals.totalCents,
    payment: { last4: result.last4, brand: result.brand, paymentId: result.paymentId },
    subscriptionId: subscription?.id,
  };

  signIn(order.email, order.name);
  addOrder(order, subscription);
  if (totals.freeGifts.some((g) => g.id === "mini-serum")) markWelcomeGiftUsed();
  return { ok: true, order };
}
