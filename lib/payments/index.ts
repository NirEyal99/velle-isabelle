import { demoPayments } from "@/lib/payments/demo";
import type { PaymentProvider } from "@/lib/payments/types";

/**
 * The payment system the shop uses. Swap demoPayments for a Stripe version
 * here when the shop goes live (see STRIPE.md).
 */
export const payments: PaymentProvider = demoPayments;
