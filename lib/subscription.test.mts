// Checks for the subscription rules. Run with: npm test
import assert from "node:assert/strict";
import { addMonths, cancel, chargeCents, nextChargeCents, pause, resume, skipNext, startSubscription } from "./subscription.ts";

const now = "2026-10-25T15:00:00.000Z";
const sub = startSubscription({ id: "sub_1", monthlyCents: 6400, introPercentOff: [25, 20], now });

// Dates: same day next month; month-end days don't overflow into the month after.
assert.equal(addMonths(now, 1), "2026-11-25T15:00:00.000Z");
assert.equal(addMonths("2026-01-31T10:00:00.000Z", 1), "2026-02-28T10:00:00.000Z");
assert.equal(addMonths("2026-12-15T10:00:00.000Z", 1), "2027-01-15T10:00:00.000Z");

// Launch intro: charge 1 = 25% off ($48), charge 2 = 20% off ($51.20), then full price ($64).
assert.equal(chargeCents(sub, 0), 4800);
assert.equal(chargeCents(sub, 1), 5120);
assert.equal(chargeCents(sub, 2), 6400);
assert.equal(sub.chargesMade, 1);
assert.equal(nextChargeCents(sub), 5120);
assert.equal(sub.nextChargeAt, "2026-11-25T15:00:00.000Z");

// After the launch there's no intro: every charge is full price.
const plain = startSubscription({ id: "sub_2", monthlyCents: 6400, introPercentOff: [], now });
assert.equal(chargeCents(plain, 0), 6400);
assert.equal(nextChargeCents(plain), 6400);

// Skip pushes the next charge back a month and keeps the month-2 intro price.
const skipped = skipNext(sub);
assert.equal(skipped.nextChargeAt, "2026-12-25T15:00:00.000Z");
assert.equal(nextChargeCents(skipped), 5120);

// Pause clears the next charge; resume charges a month from the resume day.
const paused = pause(sub);
assert.equal(paused.status, "paused");
assert.equal(paused.nextChargeAt, null);
assert.equal(skipNext(paused), paused, "can't skip while paused");
const resumed = resume(paused, "2027-01-10T09:00:00.000Z");
assert.equal(resumed.status, "active");
assert.equal(resumed.nextChargeAt, "2027-02-10T09:00:00.000Z");

// Cancel stops everything; it can be restarted with resume.
const cancelled = cancel(sub, now);
assert.equal(cancelled.status, "cancelled");
assert.equal(cancelled.nextChargeAt, null);
assert.equal(cancelled.cancelledAt, now);
assert.equal(pause(cancelled), cancelled, "can't pause a cancelled subscription");
const restarted = resume(cancelled, now);
assert.equal(restarted.status, "active");
assert.equal(restarted.cancelledAt, undefined);

console.log("subscriptions: all checks passed");
