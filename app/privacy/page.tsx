import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { DraftNote, InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = { title: "privacy policy", description: "how velle collects, uses and protects your personal information, and the choices you have." };

export default function PrivacyPage() {
  return (
    <InfoPage title="privacy policy" intro="last updated: october 25, 2026">
      <DraftNote />
      <p>
        your privacy matters to us. this policy explains what information velle (&quot;velle&quot;, &quot;we&quot;, &quot;us&quot;) collects when you visit our website or buy from us, how we use it, and the choices you have. we keep it simple: we only collect what we need to run the store and make it better, and we never sell your personal information.
      </p>

      <h2>what we collect</h2>
      <ul>
        <li>
          <strong>details you give us:</strong> your name, email, shipping address and phone number (if you add one) when you order, create an account, join our email list, take the hair quiz or contact us.
        </li>
        <li>
          <strong>order details:</strong> what you bought, your subscription and its status, and your order history.
        </li>
        <li>
          <strong>hair quiz answers:</strong> your hair goals, scalp, hair type and routine, used only to recommend products.
        </li>
        <li>
          <strong>payment details:</strong> card payments are handled by our payment provider. velle never sees or stores your full card number. we only keep the card type and last 4 digits so you can recognise it.
        </li>
        <li>
          <strong>how you use the site:</strong> pages visited, device and browser type, and general location (city or region), collected with cookies and similar tools.
        </li>
      </ul>

      <h2>how we use it</h2>
      <ul>
        <li>to process, ship and support your orders and subscriptions;</li>
        <li>to send order updates, delivery reminders and receipts;</li>
        <li>to send marketing emails, only if you&apos;ve signed up (you can unsubscribe anytime);</li>
        <li>to recommend products based on your hair quiz;</li>
        <li>to prevent fraud and keep the store secure;</li>
        <li>to understand what&apos;s working on the site and improve it.</li>
      </ul>

      <h2>who we share it with</h2>
      <p>we share information only with companies that help us run velle, and only what they need to do their job:</p>
      <ul>
        <li>our payment provider, to take payments securely;</li>
        <li>shipping carriers, to deliver your orders;</li>
        <li>our email provider, to send order emails and newsletters;</li>
        <li>website hosting and analytics providers.</li>
      </ul>
      <p>we may also share information if the law requires it, or as part of a sale or merger of the business. we never sell your personal information or share it for other companies&apos; advertising.</p>

      <h2>cookies</h2>
      <p>
        we use cookies and your browser&apos;s storage to keep your bag and sign-in working, remember things like whether you&apos;ve seen our quiz popup, and understand how the site is used. you can block or delete cookies in your browser settings, though parts of the store (like your bag) may stop working.
      </p>

      <h2>your choices and rights</h2>
      <ul>
        <li>unsubscribe from marketing emails with the link at the bottom of any email.</li>
        <li>see, update or delete your details from your account, or by emailing us.</li>
        <li>
          if you live in California or another state with privacy laws, you can ask what personal information we hold about you, ask us to delete or correct it, and opt out of any &quot;sale&quot; or &quot;sharing&quot; (we don&apos;t do either). we won&apos;t treat you differently for using these rights.
        </li>
      </ul>
      <p>
        to make a request, email <span className="font-semibold select-all">{site.email}</span>. we&apos;ll reply within 30 days.
      </p>

      <h2>how long we keep it</h2>
      <p>we keep order records for as long as the law requires for tax and accounting (usually 7 years). other information is kept while your account is active, or until you ask us to delete it.</p>

      <h2>keeping it safe</h2>
      <p>we use secure, encrypted connections and trusted providers to protect your information. no system is 100% secure, but we take it seriously and limit who can access your details.</p>

      <h2>children</h2>
      <p>velle is not meant for children under 13, and we don&apos;t knowingly collect their information. if you think a child has shared information with us, email us and we&apos;ll delete it.</p>

      <h2>changes to this policy</h2>
      <p>if we change this policy, we&apos;ll update the date at the top. for big changes, we&apos;ll email customers before they take effect.</p>

      <h2>contact us</h2>
      <p>
        questions about your privacy? email <span className="font-semibold select-all">{site.email}</span> or use our <Link href="/contact">contact form</Link>.
      </p>
    </InfoPage>
  );
}
