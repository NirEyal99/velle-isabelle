import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = { title: "checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <section className="container-page py-10 md:py-14">
      <CheckoutForm />
    </section>
  );
}
