import type { Metadata } from "next";
import Link from "next/link";
import { freeShippingMinimum, guarantee } from "@/config/promotions";
import { standardShipping } from "@/config/pricing";
import { site } from "@/config/site";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = { title: "shipping & returns", description: "velle shipping costs, delivery times, returns and our 30-day money-back guarantee." };

export default function ShippingReturnsPage() {
  return (
    <InfoPage title="shipping & returns" intro="free shipping on every subscription and on orders over $50, and a money-back guarantee on your first order. here are the details.">
      <h2>shipping costs</h2>
      <ul>
        <li>
          <strong>subscriptions ship free</strong>, always: The Ritual and the 6-Month Glow Journey.
        </li>
        <li>
          <strong>one-time orders of ${freeShippingMinimum} or more ship free</strong> (counted after any discounts).
        </li>
        <li>one-time orders under ${freeShippingMinimum} ship for a flat ${standardShipping.toFixed(2)}.</li>
      </ul>

      <h2>when your order arrives</h2>
      <p>
        we pack orders within 1–2 business days (monday to friday, not counting holidays). standard delivery then takes 3–7 business days. as soon as your order leaves us, we&apos;ll email you a tracking link.
      </p>
      <p>
        we ship to all 50 US states, including PO boxes and APO/FPO addresses. we don&apos;t ship outside the US yet, but we&apos;re working on it.
      </p>

      <h2>subscription deliveries</h2>
      <p>
        The Ritual ships once a month, on the same date as your first order. we&apos;ll email you a reminder 3 days before each delivery, so there&apos;s always time to skip, pause or cancel from{" "}
        <Link href="/account">your account</Link>. changes made before your delivery date apply to that delivery.
      </p>
      <p>the 6-Month Glow Journey ships your first trio, silk pillowcase and travel kit right away, then one full-size trio every month for the next five months.</p>

      <h2>our money-back guarantee</h2>
      <p>{guarantee.long}</p>
      <p>
        to ask for a refund, email us at <span className="font-semibold select-all">{site.email}</span> with your order number. there&apos;s no need to send anything back. we&apos;ll refund your original payment method within 5–10 business days. the guarantee covers your first order, once per customer.
      </p>

      <h2>returns on later orders</h2>
      <p>
        unopened, unused products from any order can be returned within 30 days of delivery for a full refund of the product price. email us first and we&apos;ll send you a return label. for hygiene reasons, opened products can&apos;t be returned, except under the money-back guarantee above.
      </p>

      <h2>damaged, wrong or missing orders</h2>
      <p>
        if something arrives damaged, if we sent the wrong item, or if your tracking says delivered but your order isn&apos;t there, email us within 14 days of the delivery date with your order number (and a photo, if something is damaged). we&apos;ll send a replacement or a refund, whichever you prefer.
      </p>

      <h2>free gifts</h2>
      <p>
        free gifts (like the satin scrunchie, scalp massager or mini scalp serum) are added to qualifying orders while supplies last. they have no cash value, and if you return items so an order no longer qualifies, the gift doesn&apos;t need to come back.
      </p>

      <h2>questions?</h2>
      <p>
        email <span className="font-semibold select-all">{site.email}</span> or use our <Link href="/contact">contact form</Link>. a real person answers within 1–2 business days.
      </p>
    </InfoPage>
  );
}
