/**
 * ─────────────────────────────────────────────────────────────
 *  PROMOTIONS — edit this file to change sales, gifts and shipping.
 * ─────────────────────────────────────────────────────────────
 */

export const launch = {
  /**
   * When the launch sale ENDS. The countdown always counts down to this
   * exact moment — it never restarts. After it, the banner disappears and
   * prices go back to normal on their own.
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

  bannerText: "launch week: 25% off everything",
};

export const welcomeGift = {
  /** Seconds before the welcome popup appears (it also appears if a visitor tries to leave). */
  popupDelaySeconds: 8,
  headline: "a little gift, just for you",
  body: "join the velle list and get a free mini scalp serum with your first order.",
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
