import type { Metadata } from "next";
import { site } from "@/config/site";
import { InfoPage, Placeholder } from "@/components/InfoPage";

export const metadata: Metadata = { title: "terms", description: "the terms for shopping with velle, including subscriptions and the money-back guarantee." };

export default function TermsPage() {
  return (
    <InfoPage title="terms" intro="last updated: [date]">
      <Placeholder>this page needs real terms of service before the store takes real customers. a lawyer can write them for your business. below are the topics they should cover.</Placeholder>
      <h2>orders and pricing</h2>
      <Placeholder>prices, taxes, promotions (including how the launch discount works), and what happens if a price is shown by mistake.</Placeholder>
      <h2>subscriptions and auto-renewal</h2>
      <Placeholder>
        how The Ritual renews monthly until cancelled, the intro pricing, how to skip, pause or cancel online, and when a cancellation takes effect. many US states require these terms to be clear and easy to find.
      </Placeholder>
      <h2>the 6-month glow journey</h2>
      <Placeholder>what&apos;s included, how the 6 deliveries are scheduled, and refunds if someone changes their mind partway.</Placeholder>
      <h2>money-back guarantee</h2>
      <Placeholder>the exact rules for the 30-day guarantee on a first order.</Placeholder>
      <h2>product use</h2>
      <Placeholder>velle products are cosmetics. patch test first, stop using if irritation occurs, and results vary.</Placeholder>
      <h2>contact</h2>
      <p>
        questions about these terms: <span className="font-semibold select-all">{site.email}</span>
      </p>
    </InfoPage>
  );
}
