/**
 * Subscription rules (demo), with no screen code so they're easy to test.
 * With real Stripe, Stripe keeps this state and the Customer Portal handles
 * skip/pause/cancel; this file mirrors what that portal does.
 */

export type SubscriptionStatus = "active" | "paused" | "cancelled";

export type Subscription = {
  id: string;
  planId: "ritual";
  name: string;
  /** Full monthly price in cents. */
  monthlyCents: number;
  /** Launch intro: percent off for each charge, in order (charge 1, charge 2, ...). Empty after the launch. */
  introPercentOff: number[];
  /** How many monthly charges have been made (the first one happens at checkout). */
  chargesMade: number;
  status: SubscriptionStatus;
  /** Next charge date (ISO), or null when paused or cancelled. */
  nextChargeAt: string | null;
  startedAt: string;
  cancelledAt?: string;
};

/** Same day next month (or the last day of next month if it's shorter). */
export function addMonths(iso: string, months: number): string {
  const d = new Date(iso);
  const day = d.getUTCDate();
  const target = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + months, 1, d.getUTCHours(), d.getUTCMinutes()));
  const lastDay = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate();
  target.setUTCDate(Math.min(day, lastDay));
  return target.toISOString();
}

/** The price of a given charge (0 = the first charge), including any launch intro. */
export function chargeCents(sub: Pick<Subscription, "monthlyCents" | "introPercentOff">, chargeIndex: number): number {
  const pct = sub.introPercentOff[chargeIndex] ?? 0;
  return Math.round((sub.monthlyCents * (100 - pct)) / 100);
}

/** What the next charge will be. */
export const nextChargeCents = (sub: Subscription) => chargeCents(sub, sub.chargesMade);

export function startSubscription(opts: { id: string; monthlyCents: number; introPercentOff: number[]; now: string }): Subscription {
  return {
    id: opts.id,
    planId: "ritual",
    name: "The Ritual",
    monthlyCents: opts.monthlyCents,
    introPercentOff: opts.introPercentOff,
    chargesMade: 1,
    status: "active",
    nextChargeAt: addMonths(opts.now, 1),
    startedAt: opts.now,
  };
}

/** Skip the next delivery: push the next charge back a month. The intro price isn't used up. */
export function skipNext(sub: Subscription): Subscription {
  if (sub.status !== "active" || !sub.nextChargeAt) return sub;
  return { ...sub, nextChargeAt: addMonths(sub.nextChargeAt, 1) };
}

export function pause(sub: Subscription): Subscription {
  if (sub.status !== "active") return sub;
  return { ...sub, status: "paused", nextChargeAt: null };
}

/** Resume: the next delivery is charged a month from today. */
export function resume(sub: Subscription, now: string): Subscription {
  if (sub.status === "active") return sub;
  return { ...sub, status: "active", nextChargeAt: addMonths(now, 1), cancelledAt: undefined };
}

export function cancel(sub: Subscription, now: string): Subscription {
  if (sub.status === "cancelled") return sub;
  return { ...sub, status: "cancelled", nextChargeAt: null, cancelledAt: now };
}
