# velle

The website for velle: _hair you can't stop touching._

This is a **demo store**. Checkout and login use fake data and no real payments are taken.

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

## Checking the cart math

`npm run test:cart` checks every price rule (launch discount, free gifts, free shipping, the serum suggestion). Run it after changing prices or promotions.

## Deploying

Import this repository into [Vercel](https://vercel.com/new). No settings are needed.
