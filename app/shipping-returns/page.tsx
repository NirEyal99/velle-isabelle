import type { Metadata } from "next";
import { freeShippingMinimum, guarantee } from "@/config/promotions";
import { standardShipping } from "@/config/pricing";
import { InfoPage, Placeholder } from "@/components/InfoPage";

export const metadata: Metadata = { title: "shipping & returns", description: "velle shipping costs, delivery times and our 30-day money-back guarantee." };

export default function ShippingReturnsPage() {
  return (
    <InfoPage title="shipping & returns" intro="the short version: free shipping on subscriptions and orders over $50, and a money-back guarantee on your first order.">
      <h2>shipping</h2>
      <ul>
        <li>free shipping on every subscription (The Ritual and the 6-Month Glow Journey).</li>
        <li>free shipping on one-time orders of ${freeShippingMinimum} or more, after discounts.</li>
        <li>one-time orders under ${freeShippingMinimum}: ${standardShipping.toFixed(2)} flat.</li>
        <li>we currently ship within the US.</li>
      </ul>
      <Placeholder>add your real delivery times (for example &quot;ships in 1–2 business days, arrives in 3–5&quot;), your carrier and how tracking emails work.</Placeholder>

      <h2>money-back guarantee</h2>
      <p>{guarantee.long}</p>
      <Placeholder>add how to start a refund (for example &quot;email us your order number&quot;), whether customers need to send the products back, and how long refunds take to appear.</Placeholder>

      <h2>subscriptions</h2>
      <p>skip, pause or cancel The Ritual anytime from your account, in one click. changes made before your next delivery date apply to that delivery.</p>

      <h2>damaged or missing orders</h2>
      <Placeholder>add what happens if an order arrives damaged or goes missing.</Placeholder>
    </InfoPage>
  );
}
