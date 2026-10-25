/**
 * ─────────────────────────────────────────────────────────────
 *  PROMOTIONS — edit this file to change sales, gifts and shipping.
 * ─────────────────────────────────────────────────────────────
 */

export const launch = {
  /**
   * When the launch sale ENDS. The countdown always counts down to this
   * exact moment — it never restarts. After it, the banner and the
   * "taken off in your cart" notes disappear on their own.
   *
   * Items always show their FULL price. The discount is taken off in the cart.
   *
   * Format: "YYYY-MM-DDTHH:MM:SS" followed by the time-zone offset.
   *   New York in winter = -05:00, New York in summer = -04:00
   */
  endsAt: "2026-11-01T23:59:59-05:00",

  /** Percent off everything (one-time items, sets and the 6-month plan). */
  percentOff: 25,

  /**
   * The Ritual subscription gets a special intro instead:
   * 25% off the 1st month, 20% off the 2nd month, then full price.
   * Add or remove numbers to change how many months get a discount.
   */
  subscriptionMonthsPercentOff: [25, 20],

  bannerText: "launch week: 25% off everything, taken off in your cart",
};

export const welcomeGift = {
  headline: "a little gift, just for you",
  body: "leave your email and we'll tuck a free mini scalp serum into your first order.",
};

/**
 * The hair-quiz popup. It appears once per visitor, after a few seconds or
 * when they go to leave, and ends with a mystery gift.
 * The gift is claimed with an email, the same way as the welcome gift above,
 * so each customer gets it once.
 */
export const quizPopup = {
  delaySeconds: 8,
  headline: "free hair quiz, with a mystery gift at the end",
  body: "5 quick questions, about 60 seconds. find your perfect ritual, then unwrap your gift.",
  /** What the mystery gift turns out to be (shown when it's revealed). */
  prize: "a free mini scalp serum",
  prizeDetail: "leave your email and we'll tuck it into your first order.",
};

/** Free gifts added to the cart automatically once the order reaches each amount (after discounts). */
export const cartGifts = [
  { minimum: 60, giftId: "scrunchie" },
  { minimum: 100, giftId: "massager" },
] as const;

/** One-time orders at or above this amount (after discounts) ship free. Subscriptions always ship free. */
export const freeShippingMinimum = 50;

export const guarantee = {
  days: 30,
  short: "30-day money-back guarantee",
  long: "love it or your money back. if your first order isn't for you, tell us within 30 days for a full refund.",
};
