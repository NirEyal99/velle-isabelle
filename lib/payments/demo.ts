import type { PaymentCard, PaymentProvider, PaymentResult } from "@/lib/payments/types";

/**
 * Demo payments: nothing is charged and no card details leave the browser.
 * Uses the same test cards as Stripe's test mode, and refuses anything that
 * looks like a real card so nobody types theirs in by mistake.
 */
export const TEST_CARDS = {
  success: "4242424242424242",
  declined: "4000000000000002",
} as const;

export const digits = (s: string) => s.replace(/\D/g, "");

/** The standard checksum every real card number passes (Luhn). */
export function luhnValid(number: string): boolean {
  const n = digits(number);
  if (n.length < 12 || n.length > 19) return false;
  let sum = 0;
  for (let i = 0; i < n.length; i++) {
    let d = Number(n[n.length - 1 - i]);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}

/** Checks the card fields and returns the first problem, or null if they look right. */
export function checkCard(card: PaymentCard, now = new Date()): Extract<PaymentResult, { ok: false }> | null {
  const number = digits(card.number);
  if (!luhnValid(number)) return { ok: false, field: "number", message: "that card number doesn't look right. check the digits and try again." };
  if (!Object.values(TEST_CARDS).includes(number as never)) {
    return { ok: false, field: "number", message: "this is a demo store, so please don't use a real card. use the test card 4242 4242 4242 4242." };
  }
  const m = /^(\d{2})\s*\/\s*(\d{2})$/.exec(card.expiry.trim());
  if (!m || Number(m[1]) < 1 || Number(m[1]) > 12) return { ok: false, field: "expiry", message: "enter the expiry as MM / YY, like 08 / 29." };
  const endOfMonth = new Date(Date.UTC(2000 + Number(m[2]), Number(m[1]), 1));
  if (endOfMonth <= now) return { ok: false, field: "expiry", message: "this card has expired. try a date in the future." };
  if (!/^\d{3,4}$/.test(card.cvc.trim())) return { ok: false, field: "cvc", message: "the security code is the 3 or 4 digits on the back of the card." };
  if (card.name.trim().length < 2) return { ok: false, field: "name", message: "enter the name on the card." };
  return null;
}

export const demoPayments: PaymentProvider = {
  mode: "demo",
  async pay({ card }) {
    const problem = checkCard(card);
    if (problem) return problem;
    // A short pause so it feels like a real payment.
    await new Promise((r) => setTimeout(r, 900));
    const number = digits(card.number);
    if (number === TEST_CARDS.declined) {
      return { ok: false, field: "number", message: "your card was declined. try a different card (in this demo: 4242 4242 4242 4242)." };
    }
    return { ok: true, paymentId: `pay_demo_${Date.now().toString(36)}`, last4: number.slice(-4), brand: "visa" };
  },
};
