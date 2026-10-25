# Switching to real payments with Stripe

Right now velle is a **demo store**. Checkout uses fake test cards, accounts and orders are saved only in the visitor's browser, and nothing is charged or shipped.

The site is built so that real payments can be added in one place. You'll want a developer for this step. Here is what they'll do and roughly how long it takes (about 1–2 days).

## What stays the same

All prices, promotions, the cart math (`lib/cart-math.ts`) and every page design stay as they are.

## What changes

1. **Create the products in Stripe.** Make one Stripe Price per item: the 3 products, the Trial Kit, the Full Set, the 6-Month Glow Journey (one-time), and The Ritual (monthly). Add each Price ID next to its item in `config/pricing.ts`.
2. **Add the keys.** Put `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in Vercel's environment variables. They must never go in the code.
3. **Checkout.** Add a server route (`app/api/checkout/route.ts`) that turns the cart into a Stripe Checkout Session:
   - `mode: "subscription"` when The Ritual is in the cart, otherwise `mode: "payment"`
   - the launch discount as a Stripe coupon: 25% off once for one-time items. For The Ritual, a coupon schedule of 25% off month 1 and 20% off month 2.
   - free gifts as $0 line items, and shipping as a shipping rate (free at $50+ or with a subscription)
   - then send the shopper to Stripe's hosted payment page. Card details are never handled by our site, which keeps you out of the hardest card-security rules.
4. **Turn off the demo.** Replace `demoPayments` in `lib/payments/index.ts` with the Stripe version. The checkout page then hides the test-card notice and the card fields, because Stripe's page collects the card.
5. **Orders and accounts.** Add a webhook route (`app/api/stripe/webhook/route.ts`) that saves orders and subscriptions to a real database when Stripe confirms a payment. Add real sign-in (for example an emailed one-tap link) in place of the demo "any email works" sign-in in `lib/account.ts`.
6. **Skip, pause, cancel.** Switch on the Stripe **Customer Portal** in the Stripe dashboard (allow cancel, pause and changing dates). The "manage" buttons on the account page then open the portal, or call Stripe's API directly using the same rules as `lib/subscription.ts`.
7. **Test in Stripe test mode first.** Stripe's test card is the same 4242 4242 4242 4242 the demo uses. When everything works, switch the keys to live mode.

## Before taking real money

- Make sure the Terms and Privacy pages are written for real (they currently hold placeholder text).
- Keep the auto-renewal checkbox at checkout: subscription laws in many US states require it.
- Keep all product claims cosmetic. The FAQ explains why velle doesn't make hair-growth claims.
