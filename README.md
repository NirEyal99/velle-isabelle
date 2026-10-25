# velle

The website for velle: _hair you can't stop touching._

This is a **demo store**. Checkout and login use fake data and no real payments are taken.
To pay at checkout, use the test card **4242 4242 4242 4242** with any future date and any 3 digits. To sign in, any email works.
To take real payments later, see [STRIPE.md](STRIPE.md).

## Editing the site (no coding needed)

| To change… | Edit this file |
|---|---|
| Any price (products, plans, shipping) | `config/pricing.ts` |
| Launch sale end date, discount %, cart gifts, free-shipping minimum, popup delay, guarantee | `config/promotions.ts` |
| Contact email, social links, site address | `config/site.ts` |
| Product descriptions, ingredients, how to use | `content/products.ts` |
| FAQ questions and answers | `content/faq.ts` |
| Hair quiz questions and answers | `content/quiz.ts` |
| Photos | `public/images/` (keep the same file names) |

## Running it on a computer

1. Install [Node.js](https://nodejs.org) (version 20 or newer).
2. In this folder, run `npm install` once.
3. Run `npm run dev` and open http://localhost:3000.

## Checking the math

`npm test` checks every price rule (launch discount, free gifts, free shipping, the serum suggestion), the subscription rules (intro prices, skip, pause, resume, cancel) and the demo test cards. Run it after changing prices or promotions.

## Updating the live preview link

`npm run preview:build` packages the whole site into one file (`preview/dist/velle.html`) for the shareable preview link.

## Deploying

Import this repository into [Vercel](https://vercel.com/new). No settings are needed.
