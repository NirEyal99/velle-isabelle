import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";

export const metadata: Metadata = { title: "order confirmed", robots: { index: false } };

export default function OrderConfirmedPage() {
  return (
    <section className="container-page py-12 md:py-20">
      <Suspense fallback={<p className="py-24 text-center">loading your order…</p>}>
        <OrderConfirmation />
      </Suspense>
    </section>
  );
}
