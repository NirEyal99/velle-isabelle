// Checks for the demo payments. Run with: npm test
import assert from "node:assert/strict";
import { checkCard, demoPayments, luhnValid } from "./demo.ts";

const ok = { number: "4242 4242 4242 4242", expiry: "08 / 29", cvc: "123", name: "Ava Rose" };
const now = new Date("2026-10-25T12:00:00Z");

assert.equal(luhnValid("4242424242424242"), true);
assert.equal(luhnValid("4242424242424241"), false);

assert.equal(checkCard(ok, now), null);
assert.equal(checkCard({ ...ok, number: "4242 4242 4242 4241" }, now)?.field, "number");
// A real-looking card (valid checksum, but not a test card) is refused.
assert.match(checkCard({ ...ok, number: "5555 5555 5555 4444" }, now)?.message ?? "", /demo store/);
assert.equal(checkCard({ ...ok, expiry: "13 / 29" }, now)?.field, "expiry");
assert.equal(checkCard({ ...ok, expiry: "09 / 26" }, now)?.field, "expiry", "expired");
assert.equal(checkCard({ ...ok, expiry: "10 / 26" }, now), null, "valid through the end of this month");
assert.equal(checkCard({ ...ok, cvc: "12" }, now)?.field, "cvc");
assert.equal(checkCard({ ...ok, name: " " }, now)?.field, "name");

const paid = await demoPayments.pay({ amountCents: 4800, email: "a@b.co", description: "test", card: ok });
assert.equal(paid.ok, true);
assert.equal(paid.ok && paid.last4, "4242");
const declined = await demoPayments.pay({ amountCents: 4800, email: "a@b.co", description: "test", card: { ...ok, number: "4000 0000 0000 0002" } });
assert.equal(declined.ok, false);
assert.match(!declined.ok ? declined.message : "", /declined/);

console.log("payments: all checks passed");
