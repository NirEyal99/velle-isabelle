import { gifts, plans, products, standardShipping, type GiftId, type PlanId, type ProductId } from "@/config/pricing";
import { cartGifts, freeShippingMinimum, launch } from "@/config/promotions";
import { applyPercentOff, toCents } from "@/lib/pricing";

/**
 * All cart math in one place, with no screen code, so it's easy to test and
 * easy to swap for Stripe's own totals later. Every amount is in cents.
 */

export type CartItem = { kind: "product"; id: ProductId; qty: number } | { kind: "plan"; id: PlanId; qty: number };

export type CartLine = {
  key: string;
  kind: CartItem["kind"];
  id: ProductId | PlanId;
  name: string;
  qty: number;
  /** Full price of one, before any launch discount. */
  unitCents: number;
  /** unitCents × qty. */
  lineCents: number;
  /** Launch discount on this line (0 when the sale is over). */
  discountCents: number;
  /** Short note under the line, e.g. "then $52/month". */
  note?: string;
  maxQty: number;
};

export type GiftLine = { id: GiftId; name: string; worth: number; reason: string };

export type CartTotals = {
  lines: CartLine[];
  /** Sum of full prices. */
  subtotalCents: number;
  /** Total launch discount. */
  discountCents: number;
  /** What the order is worth after the discount; the gift goals and free shipping use this. */
  afterDiscountCents: number;
  shippingCents: number;
  totalCents: number;
  freeGifts: GiftLine[];
  /** The next gift to unlock, and how far away it is. */
  nextGift: { name: string; minimumCents: number; awayCents: number } | null;
  /** How far along the gift progress bar is, 0 to 1. */
  giftProgress: number;
  /** Suggest adding the serum (cart has shampoo and conditioner but no serum). */
  suggestSerum: boolean;
  hasSubscription: boolean;
  itemCount: number;
};

export const lineKey = (item: Pick<CartItem, "kind" | "id">) => `${item.kind}:${item.id}`;

const SERUM_PLANS: PlanId[] = ["trial-kit", "ritual", "glow-journey", "full-set"];

export function computeCart(items: CartItem[], opts: { launchActive: boolean; welcomeGift: boolean }): CartTotals {
  const { launchActive } = opts;

  const lines: CartLine[] = items
    .filter((i) => i.qty > 0)
    .map((item) => {
      if (item.kind === "product") {
        const p = products[item.id];
        const unitCents = toCents(p.price);
        const lineCents = unitCents * item.qty;
        const discountCents = launchActive ? lineCents - applyPercentOff(lineCents, launch.percentOff) : 0;
        return { key: lineKey(item), kind: item.kind, id: item.id, name: p.name, qty: item.qty, unitCents, lineCents, discountCents, maxQty: 6 };
      }
      const plan = plans[item.id];
      const unitCents = toCents(plan.price);
      const lineCents = unitCents * item.qty;
      let discountCents = 0;
      let note: string | undefined;
      if (plan.kind === "subscription") {
        // Charged today: the first month. The launch intro takes the first month's
        // percentage off today; month 2's percentage comes off the next bill.
        const [m1 = 0, m2] = launchActive ? launch.subscriptionMonthsPercentOff : [];
        discountCents = lineCents - applyPercentOff(lineCents, m1);
        note = launchActive && m2 ? `month 2: ${m2}% off, then full price. skip, pause or cancel anytime.` : "billed monthly. skip, pause or cancel anytime.";
      } else {
        discountCents = launchActive ? lineCents - applyPercentOff(lineCents, launch.percentOff) : 0;
        if (plan.kind === "prepaid") note = `${plan.months} months, paid once. free pillowcase and travel kit included.`;
      }
      return { key: lineKey(item), kind: item.kind, id: item.id, name: plan.name, qty: item.qty, unitCents, lineCents, discountCents, note, maxQty: 1 };
    });

  const subtotalCents = lines.reduce((s, l) => s + l.lineCents, 0);
  const discountCents = lines.reduce((s, l) => s + l.discountCents, 0);
  const afterDiscountCents = subtotalCents - discountCents;

  const hasSubscription = lines.some((l) => l.kind === "plan" && plans[l.id as PlanId].freeShipping);
  const shippingCents =
    lines.length === 0 || hasSubscription || afterDiscountCents >= toCents(freeShippingMinimum) ? 0 : toCents(standardShipping);

  // Free gifts: threshold gifts (based on the price after discount) and the welcome gift.
  const freeGifts: GiftLine[] = [];
  for (const g of cartGifts) {
    if (lines.length && afterDiscountCents >= toCents(g.minimum)) {
      freeGifts.push({ ...gifts[g.giftId], reason: `free on orders $${g.minimum}+` });
    }
  }
  if (opts.welcomeGift && lines.length) {
    freeGifts.push({ ...gifts["mini-serum"], reason: "your welcome gift" });
  }

  const upcoming = cartGifts.find((g) => afterDiscountCents < toCents(g.minimum));
  const top = toCents(cartGifts[cartGifts.length - 1].minimum);
  const nextGift = upcoming
    ? { name: gifts[upcoming.giftId].name, minimumCents: toCents(upcoming.minimum), awayCents: toCents(upcoming.minimum) - afterDiscountCents }
    : null;

  const has = (kind: CartItem["kind"], id: string) => lines.some((l) => l.kind === kind && l.id === id);
  const serumCovered = has("product", "serum") || SERUM_PLANS.some((p) => has("plan", p));
  const suggestSerum = has("product", "shampoo") && has("product", "conditioner") && !serumCovered;

  return {
    lines,
    subtotalCents,
    discountCents,
    afterDiscountCents,
    shippingCents,
    totalCents: afterDiscountCents + shippingCents,
    freeGifts,
    nextGift,
    giftProgress: Math.min(1, afterDiscountCents / top),
    suggestSerum,
    hasSubscription,
    itemCount: lines.reduce((s, l) => s + l.qty, 0),
  };
}
