/**
 * ─────────────────────────────────────────────────────────────
 *  PRICES — edit this file to change any price on the site.
 * ─────────────────────────────────────────────────────────────
 *  • Prices are in US dollars, BEFORE any launch discount.
 *    (The launch discount is set in config/promotions.ts.)
 *  • Only change the numbers and words inside quotes.
 *    Don't change the `id` values — the site uses them behind the scenes.
 */

export type ProductId = "serum" | "shampoo" | "conditioner";
export type PlanId = "trial-kit" | "ritual" | "glow-journey" | "full-set";
export type GiftId = "mini-serum" | "scrunchie" | "massager" | "pillowcase" | "travel-kit";

/** The three individual products. */
export const products = {
  serum: {
    id: "serum",
    name: "Scalp Serum",
    price: 34,
    size: "30 ml / 1 fl oz",
  },
  shampoo: {
    id: "shampoo",
    name: "Hydrating Shampoo",
    price: 29,
    size: "250 ml / 8.4 fl oz",
  },
  conditioner: {
    id: "conditioner",
    name: "Nourishing Conditioner",
    price: 29,
    size: "200 ml / 6.8 fl oz",
  },
} as const satisfies Record<ProductId, { id: ProductId; name: string; price: number; size: string }>;

/**
 * Plans and sets. `cta` is the text on the plan's button.
 * kind:
 *   "one-time"     – paid once
 *   "subscription" – charged every month until skipped, paused or cancelled
 *   "prepaid"      – paid once upfront for several months
 */
export const plans = {
  "trial-kit": {
    cta: "get the trial kit",
    id: "trial-kit",
    name: "Trial Kit",
    kind: "one-time",
    price: 39,
    tagline: "minis of all three, for a first try.",
    includes: ["mini scalp serum", "mini hydrating shampoo", "mini nourishing conditioner"],
    freeShipping: false,
    badge: null,
  },
  ritual: {
    cta: "start the ritual",
    id: "ritual",
    name: "The Ritual",
    kind: "subscription",
    price: 52,
    interval: "month",
    tagline: "the full-size trio, every month.",
    includes: ["full-size scalp serum", "full-size shampoo", "full-size conditioner", "free shipping, always", "skip, pause or cancel anytime"],
    freeShipping: true,
    badge: null,
  },
  "glow-journey": {
    cta: "start glowing",
    id: "glow-journey",
    name: "6-Month Glow Journey",
    kind: "prepaid",
    price: 279,
    months: 6,
    tagline: "six months of the ritual, paid once.",
    includes: ["6 months of the full-size trio", "free silk pillowcase", "free travel kit", "free shipping, always"],
    freeShipping: true,
    badge: "best value",
  },
  "full-set": {
    cta: "get the full set",
    id: "full-set",
    name: "Full Set",
    kind: "one-time",
    price: 78,
    tagline: "the full-size trio, just once.",
    includes: ["full-size scalp serum", "full-size shampoo", "full-size conditioner", "no subscription"],
    freeShipping: false,
    badge: null,
  },
} as const;

/** Free gifts (they cost the customer nothing; shown as $0 in the cart). */
export const gifts: Record<GiftId, { id: GiftId; name: string; worth: number }> = {
  "mini-serum": { id: "mini-serum", name: "Mini Scalp Serum", worth: 14 },
  scrunchie: { id: "scrunchie", name: "Satin Scrunchie", worth: 12 },
  massager: { id: "massager", name: "Scalp Massager", worth: 18 },
  pillowcase: { id: "pillowcase", name: "Silk Pillowcase", worth: 45 },
  "travel-kit": { id: "travel-kit", name: "Travel Kit", worth: 20 },
};

/** Standard shipping price for one-time orders under the free-shipping minimum. */
export const standardShipping = 5.95;
