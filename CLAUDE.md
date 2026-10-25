# Working on velle

## Always test before answering (the owner's #1 rule)

Never tell the owner something works until you have tested it yourself, in this session, after the last change. Before every reply that reports work:

1. `npm test` (cart math, subscription rules, demo payments) and `npx tsc --noEmit`.
2. `npm run build` must succeed.
3. Start the site (`npx next start`) and click through what you changed in a real browser (Playwright is installed) at **phone size (390×844)** and **laptop size (1440×900)**: check for page errors, broken links, text overflowing the screen, and that the numbers on screen are right.
4. Look at screenshots of what you changed before describing it.
5. Report honestly: what you tested, what passed, and anything that failed or wasn't tested.

## About the owner

The owner is not a developer. Explain everything in plain, simple words, no jargon.

## Product rules

- Copy is cosmetic only: never claim the products grow hair, treat hair loss or cure anything. Use "healthier-feeling scalp", "fuller-looking hair", "visible shine", "less breakage so you keep your length".
- Never show fake reviews, ratings or results.
- Demo store: no real payments or accounts. Keep the payment system swappable (`lib/payments`, see `STRIPE.md`).
- Prices live only in `config/pricing.ts`; promotions only in `config/promotions.ts`.
- Item prices always show full price; the launch discount is taken off in the cart.
