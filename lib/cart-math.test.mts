// Checks for the cart math. Run with: npm run test:cart
import assert from "node:assert/strict";
import { computeCart, type CartItem } from "./cart-math.ts";

const on = { launchActive: true, welcomeGift: false };
const off = { launchActive: false, welcomeGift: false };
const cart = (...items: CartItem[]) => items;

// Empty cart: nothing to pay, no shipping, no gifts.
{
  const t = computeCart([], on);
  assert.equal(t.totalCents, 0);
  assert.equal(t.shippingCents, 0);
  assert.equal(t.freeGifts.length, 0);
}

// One shampoo during launch: $26 − 25% = $19.50, under $50 so $5.95 shipping.
{
  const t = computeCart(cart({ kind: "product", id: "shampoo", qty: 1 }), on);
  assert.equal(t.subtotalCents, 2600);
  assert.equal(t.discountCents, 650);
  assert.equal(t.shippingCents, 595);
  assert.equal(t.totalCents, 1950 + 595);
  assert.equal(t.nextGift?.name, "Satin Scrunchie");
  assert.equal(t.nextGift?.awayCents, 6000 - 1950);
}

// Same cart after the launch: full price.
{
  const t = computeCart(cart({ kind: "product", id: "shampoo", qty: 1 }), off);
  assert.equal(t.discountCents, 0);
  assert.equal(t.totalCents, 2600 + 595);
}

// Shampoo + conditioner, no serum: suggest the serum. $54 − 25% = $40.50.
{
  const t = computeCart(cart({ kind: "product", id: "shampoo", qty: 1 }, { kind: "product", id: "conditioner", qty: 1 }), on);
  assert.equal(t.suggestSerum, true);
  assert.equal(t.afterDiscountCents, 4050);
  assert.equal(t.shippingCents, 595);
}

// Adding the serum removes the suggestion. $92 − 25% = $69: free shipping and the scrunchie.
{
  const t = computeCart(
    cart({ kind: "product", id: "shampoo", qty: 1 }, { kind: "product", id: "conditioner", qty: 1 }, { kind: "product", id: "serum", qty: 1 }),
    on,
  );
  assert.equal(t.suggestSerum, false);
  assert.equal(t.afterDiscountCents, 6900);
  assert.equal(t.shippingCents, 0);
  assert.deepEqual(t.freeGifts.map((g) => g.id), ["scrunchie"]);
  assert.equal(t.nextGift?.name, "Scalp Massager");
  assert.equal(t.nextGift?.awayCents, 10000 - 6900);
}

// The Ritual during launch: 25% off month 1 today ($39), always free shipping.
{
  const t = computeCart(cart({ kind: "plan", id: "ritual", qty: 1 }), on);
  assert.equal(t.totalCents, 3900);
  assert.equal(t.shippingCents, 0);
  assert.equal(t.hasSubscription, true);
  assert.match(t.lines[0].note ?? "", /month 2: 20% off/);
}

// 6-month plan during launch: $279 − 25% = $209.25 → over $100, both gifts, free shipping.
{
  const t = computeCart(cart({ kind: "plan", id: "glow-journey", qty: 1 }), on);
  assert.equal(t.totalCents, 20925);
  assert.deepEqual(t.freeGifts.map((g) => g.id), ["scrunchie", "massager"]);
  assert.equal(t.nextGift, null);
  assert.equal(t.giftProgress, 1);
}

// Gifts use the price AFTER the discount: $65 full set → $48.75, so no scrunchie yet.
{
  const t = computeCart(cart({ kind: "plan", id: "full-set", qty: 1 }), on);
  assert.equal(t.afterDiscountCents, 4875);
  assert.equal(t.freeGifts.length, 0);
  assert.equal(t.shippingCents, 595);
  // Without the launch it's $65: scrunchie + free shipping.
  const after = computeCart(cart({ kind: "plan", id: "full-set", qty: 1 }), off);
  assert.deepEqual(after.freeGifts.map((g) => g.id), ["scrunchie"]);
  assert.equal(after.shippingCents, 0);
}

// Welcome gift is added once there's something in the cart.
{
  assert.equal(computeCart([], { launchActive: true, welcomeGift: true }).freeGifts.length, 0);
  const t = computeCart(cart({ kind: "plan", id: "trial-kit", qty: 1 }), { launchActive: true, welcomeGift: true });
  assert.deepEqual(t.freeGifts.map((g) => g.id), ["mini-serum"]);
}

// A plan that includes the serum also stops the serum suggestion.
{
  const t = computeCart(
    cart({ kind: "product", id: "shampoo", qty: 1 }, { kind: "product", id: "conditioner", qty: 1 }, { kind: "plan", id: "trial-kit", qty: 1 }),
    on,
  );
  assert.equal(t.suggestSerum, false);
}

console.log("cart math: all checks passed");
