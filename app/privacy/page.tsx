import type { Metadata } from "next";
import { site } from "@/config/site";
import { InfoPage, Placeholder } from "@/components/InfoPage";

export const metadata: Metadata = { title: "privacy policy", description: "how velle collects, uses and protects your information." };

export default function PrivacyPage() {
  return (
    <InfoPage title="privacy policy" intro="last updated: [date]">
      <Placeholder>
        this page needs a real privacy policy before the store takes real customers. a lawyer or a trusted privacy-policy generator can write one for your business. below are the topics it should cover.
      </Placeholder>
      <h2>what we collect</h2>
      <Placeholder>for example: name, email, shipping address, order history, quiz answers, and basic website analytics. card details are handled by the payment provider, not stored by velle.</Placeholder>
      <h2>how we use it</h2>
      <Placeholder>for example: to fulfil orders, run subscriptions, send emails you signed up for, and improve the site.</Placeholder>
      <h2>who we share it with</h2>
      <Placeholder>for example: the payment provider, the shipping carrier and the email service, only as needed to run the store.</Placeholder>
      <h2>your choices</h2>
      <Placeholder>how customers can unsubscribe from emails, see or delete their data, and any rights under laws like CCPA.</Placeholder>
      <h2>contact</h2>
      <p>
        questions about privacy: <span className="font-semibold select-all">{site.email}</span>
      </p>
    </InfoPage>
  );
}
