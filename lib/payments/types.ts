/**
 * The one connection point between the shop and a payment system.
 * Today it's the demo (lib/payments/demo.ts). To take real payments, add a
 * Stripe version with the same shape and switch to it in lib/payments/index.ts.
 * See STRIPE.md for the steps.
 */

export type PaymentCard = { number: string; expiry: string; cvc: string; name: string };

export type PaymentRequest = {
  /** Amount to charge today, in cents. */
  amountCents: number;
  email: string;
  description: string;
  card: PaymentCard;
};

export type PaymentResult =
  | { ok: true; paymentId: string; last4: string; brand: string }
  | { ok: false; field?: "number" | "expiry" | "cvc" | "name"; message: string };

export interface PaymentProvider {
  /** "demo" shows the test-card notice on the checkout page. */
  mode: "demo" | "live";
  pay(request: PaymentRequest): Promise<PaymentResult>;
}
