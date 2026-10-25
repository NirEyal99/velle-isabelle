import type { Metadata } from "next";
import Link from "next/link";
import { plans } from "@/config/pricing";
import { guarantee, launch } from "@/config/promotions";
import { site } from "@/config/site";
import { DraftNote, InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = { title: "terms", description: "the terms for shopping with velle, including subscriptions, auto-renewal, cancellations and our money-back guarantee." };

export default function TermsPage() {
  const [m1, m2] = launch.subscriptionMonthsPercentOff;
  return (
    <InfoPage title="terms & conditions" intro="last updated: october 25, 2026">
      <DraftNote />
      <p>
        welcome to velle. these terms apply when you use our website or buy from us. by placing an order or creating an account, you agree to them, so please read them, especially the section on subscriptions. if you have questions, email us at{" "}
        <span className="font-semibold select-all">{site.email}</span>.
      </p>

      <h2>1. who can buy</h2>
      <p>you must be at least 18, or have a parent or guardian&apos;s permission, and have a US shipping address. please give us accurate details when you order or sign up, and keep your account secure.</p>

      <h2>2. orders and prices</h2>
      <p>
        all prices are in US dollars and are shown before tax. sales tax is added at checkout where it applies. we try hard to show the right prices and descriptions, but if we make a mistake, we may cancel the order and refund you in full. your order is accepted when we email your order confirmation.
      </p>

      <h2>3. promotions and free gifts</h2>
      <p>
        promotions (like our launch-week {launch.percentOff}% off) run for the dates shown and are taken off in your cart. they can&apos;t be applied to past orders or exchanged for cash, and can&apos;t be combined with other offers unless we say so. free gifts are added to qualifying orders while supplies last and have no cash value.
      </p>

      <h2>4. The Ritual subscription and automatic renewal</h2>
      <p>
        <strong>The Ritual renews automatically every month until you cancel.</strong> when you subscribe, you agree that we may charge your payment method each month for that month&apos;s delivery, at the price shown at checkout (currently ${plans.ritual.price}/month, plus tax where it applies), without asking you again each time.
      </p>
      <ul>
        <li>
          during the launch, new subscriptions get {m1}% off the first month{m2 ? ` and ${m2}% off the second month` : ""}. after that, the regular monthly price applies.
        </li>
        <li>we charge on the same date each month as your first order and email you a reminder 3 days before.</li>
        <li>
          you can <strong>skip, pause or cancel online, in one click</strong>, from <Link href="/account">your account</Link>, or by emailing us. cancel before your next charge date and you won&apos;t be charged again.
        </li>
        <li>if we ever change the subscription price, we&apos;ll email you at least 30 days before the change, so you can cancel first if you like.</li>
        <li>if a payment fails, we&apos;ll try again and let you know. if it keeps failing, we may pause your subscription.</li>
      </ul>

      <h2>5. the 6-Month Glow Journey</h2>
      <p>
        the 6-Month Glow Journey is paid once, upfront, and includes six monthly deliveries of the full-size trio plus a free silk pillowcase, satin scrunchie and scalp massager. it does not renew automatically. if you change your mind before your second delivery ships, we&apos;ll refund the deliveries you haven&apos;t received.
      </p>

      <h2>6. our money-back guarantee</h2>
      <p>
        {guarantee.long} the guarantee applies to your first order, once per customer. see <Link href="/shipping-returns">shipping &amp; returns</Link> for how it works and for returns on later orders.
      </p>

      <h2>7. using our products</h2>
      <p>
        velle products are cosmetics, for external use only. always read the label, patch test before first use, and stop using a product if irritation occurs. velle is not intended to diagnose, treat, cure or prevent any disease, including hair loss. results described on our site are cosmetic and vary from person to person. if you have a scalp or medical condition, ask your doctor first.
      </p>

      <h2>8. our website and content</h2>
      <p>
        all photos, text, logos and designs on this site belong to velle and are protected by copyright and trademark law. please don&apos;t copy or use them without our written permission. if you send us reviews, photos or ideas, you allow us to use them to promote velle, and you confirm they&apos;re yours to share.
      </p>

      <h2>9. limits on our responsibility</h2>
      <p>
        we work hard to keep the site running smoothly, but we can&apos;t promise it will always be available or error-free. to the extent the law allows, velle isn&apos;t responsible for indirect or unexpected losses, and our total responsibility for any order is limited to the amount you paid for it. nothing in these terms limits rights you have by law that can&apos;t be limited.
      </p>

      <h2>10. disagreements</h2>
      <p>
        if something goes wrong, please email us first; most problems can be fixed quickly. these terms are governed by the laws of the State of New York, USA, and any dispute will be handled by the courts of New York, unless the law where you live gives you the right to bring it there instead.
      </p>

      <h2>11. changes to these terms</h2>
      <p>we may update these terms from time to time. the date at the top shows the latest version. if a change affects your subscription, we&apos;ll email you before it takes effect.</p>

      <h2>12. contact us</h2>
      <p>
        email <span className="font-semibold select-all">{site.email}</span> or use our <Link href="/contact">contact form</Link>. we&apos;re happy to help.
      </p>
    </InfoPage>
  );
}
