import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";

export const metadata: Metadata = {
  title: "faq",
  description: "answers about velle: results, ingredients, color-treated hair, the subscription, the 6-month glow journey and our money-back guarantee.",
};

export default function FaqPage() {
  return (
    <section className="container-page py-12 md:py-20" aria-labelledby="faq-page-title">
      <div className="max-w-2xl">
        <h1 id="faq-page-title" className="heading-lg">
          questions, answered
        </h1>
        <p className="mt-4 text-[17px] text-cocoa-soft">
          can&apos;t find yours?{" "}
          <Link href="/contact" className="font-semibold text-cocoa underline underline-offset-4">
            message us
          </Link>
          . a real person answers.
        </p>
        <div className="mt-10">
          <FaqList />
        </div>
      </div>
    </section>
  );
}
