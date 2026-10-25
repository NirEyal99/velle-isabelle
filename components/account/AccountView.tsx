"use client";

import Link from "next/link";
import { useState } from "react";
import { orderStatus, signIn, signOut, updateSubscription, useAccount, type Account } from "@/lib/account";
import { formatMoney } from "@/lib/pricing";
import { cancel, nextChargeCents, pause, resume, skipNext, type Subscription } from "@/lib/subscription";
import { getWelcomeSignup, isValidEmail } from "@/lib/welcome";

const longDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
const shortDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export function AccountView() {
  const { ready, account } = useAccount();
  if (!ready) return <p className="py-24 text-center">loading…</p>;
  return account ? <SignedIn account={account} /> : <SignInForm />;
}

function SignInForm() {
  const [email, setEmail] = useState(() => (typeof window === "undefined" ? "" : getWelcomeSignup()?.email ?? ""));
  const [error, setError] = useState("");
  return (
    <div className="mx-auto max-w-md py-8">
      <h1 className="heading-lg">sign in</h1>
      <p className="mt-3 text-cocoa-soft">see your orders and manage your ritual: skip, pause or cancel in one click.</p>
      <form
        noValidate
        className="mt-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (!isValidEmail(email.trim())) {
            setError("enter your email, like you@example.com");
            return;
          }
          signIn(email);
        }}
      >
        <label htmlFor="signin-email" className="mb-1.5 block text-sm font-semibold">
          email
        </label>
        <input
          id="signin-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "signin-error" : "signin-note"}
          className={`min-h-12 w-full rounded-xl border bg-cream px-4 text-[16px] focus:border-cocoa focus:outline-none ${error ? "border-[#8a2f1d]" : "border-cocoa/25"}`}
        />
        {error && (
          <p id="signin-error" className="mt-1.5 text-sm text-[#8a2f1d]">
            {error}
          </p>
        )}
        <button type="submit" className="btn-primary mt-5 w-full">
          sign in
        </button>
        <p id="signin-note" className="mt-4 rounded-2xl bg-blush px-4 py-3 text-[14px]">
          demo store: any email works, no password needed. a real store would email you a one-tap sign-in link.
        </p>
      </form>
      <p className="mt-8 text-center text-[15px]">
        new here?{" "}
        <Link href="/shop" className="font-semibold underline underline-offset-4">
          shop velle
        </Link>
      </p>
    </div>
  );
}

function SignedIn({ account }: { account: Account }) {
  const first = (account.name.split(" ")[0] || account.email.split("@")[0]).toLowerCase();
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label">{account.email}</p>
          <h1 className="heading-lg mt-2">hi, {first} ♡</h1>
        </div>
        <button type="button" onClick={signOut} className="btn-outline min-h-11">
          sign out
        </button>
      </div>

      <section className="mt-10" aria-labelledby="subs-title">
        <h2 id="subs-title" className="text-[1.9rem] leading-none font-extrabold tracking-[-0.04em]">
          your ritual
        </h2>
        {account.subscriptions.length === 0 ? (
          <div className="mt-5 rounded-[2rem] bg-oat p-6">
            <p>no subscription yet. The Ritual brings the full-size trio every month, with free shipping. skip, pause or cancel anytime.</p>
            <Link href="/shop#ritual" className="btn-primary mt-5">
              see The Ritual
            </Link>
          </div>
        ) : (
          <ul className="mt-5 grid gap-4">
            {account.subscriptions.map((s) => (
              <li key={s.id}>
                <SubscriptionCard sub={s} email={account.email} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-12" aria-labelledby="orders-title">
        <h2 id="orders-title" className="text-[1.9rem] leading-none font-extrabold tracking-[-0.04em]">
          your orders
        </h2>
        {account.orders.length === 0 ? (
          <div className="mt-5 rounded-[2rem] bg-oat p-6">
            <p>no orders yet.</p>
            <Link href="/shop" className="btn-primary mt-5">
              shop velle
            </Link>
          </div>
        ) : (
          <ul className="mt-5 divide-y divide-cocoa/10 rounded-[2rem] bg-oat px-6">
            {account.orders.map((o) => (
              <li key={o.id}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-x-4 gap-y-1 [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="font-bold">{o.id}</span> <span className="text-cocoa-soft">· {shortDate(o.placedAt)}</span>
                      <span className="block text-[15px] text-cocoa-soft">{o.lines.map((l) => (l.qty > 1 ? `${l.qty}× ${l.name}` : l.name)).join(", ")}</span>
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold uppercase">{orderStatus(o.placedAt)}</span>
                      <span className="font-semibold tabular-nums">{formatMoney(o.totalCents)}</span>
                      <span aria-hidden="true" className="text-xl transition-transform group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <div className="mt-4 grid gap-4 text-[15px] sm:grid-cols-2">
                    <ul className="space-y-1">
                      {o.lines.map((l) => (
                        <li key={l.name} className="flex justify-between gap-3">
                          <span>
                            {l.name} × {l.qty}
                          </span>
                          <span className="tabular-nums">{formatMoney(l.lineCents)}</span>
                        </li>
                      ))}
                      {o.gifts.map((g) => (
                        <li key={g} className="flex justify-between gap-3">
                          <span>{g}</span>
                          <span>free</span>
                        </li>
                      ))}
                      {o.discountCents > 0 && (
                        <li className="flex justify-between gap-3 text-clay-ink">
                          <span>launch discount</span>
                          <span className="tabular-nums">−{formatMoney(o.discountCents)}</span>
                        </li>
                      )}
                      <li className="flex justify-between gap-3">
                        <span>shipping</span>
                        <span>{o.shippingCents === 0 ? "free" : formatMoney(o.shippingCents)}</span>
                      </li>
                    </ul>
                    <p className="text-cocoa-soft">
                      shipping to {o.address.line1}, {o.address.city}, {o.address.state} {o.address.zip}
                      <br />
                      paid with visa ending in {o.payment.last4}
                    </p>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-[13px] text-cocoa-soft">demo store: orders are saved in this browser only, and nothing ships.</p>
      </section>
    </div>
  );
}

function SubscriptionCard({ sub, email }: { sub: Subscription; email: string }) {
  const [message, setMessage] = useState("");
  const now = () => new Date().toISOString();
  const act = (fn: (s: Subscription) => Subscription, text: (s: Subscription) => string) => {
    const next = fn(sub);
    updateSubscription(email, sub.id, () => next);
    setMessage(text(next));
  };

  const statusStyle = { active: "bg-cocoa text-cream", paused: "bg-latte text-cocoa", cancelled: "bg-cream text-cocoa" }[sub.status];

  return (
    <div className="rounded-[2rem] bg-blush p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-[1.6rem] leading-none font-extrabold tracking-[-0.04em]">{sub.name}</h3>
        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${statusStyle}`}>{sub.status}</span>
      </div>
      <p className="mt-2 text-[15px]">full-size scalp serum, hydrating shampoo and nourishing conditioner · free shipping</p>

      <p className="mt-4 text-[17px]">
        {sub.status === "active" && sub.nextChargeAt && (
          <>
            next delivery: <strong>{longDate(sub.nextChargeAt)}</strong> · <strong>{formatMoney(nextChargeCents(sub))}</strong>
            {nextChargeCents(sub) !== sub.monthlyCents && <span className="text-[15px]"> (launch price, then {formatMoney(sub.monthlyCents)}/month)</span>}
          </>
        )}
        {sub.status === "paused" && <>paused. you won&apos;t be charged until you resume.</>}
        {sub.status === "cancelled" && sub.cancelledAt && <>cancelled on {longDate(sub.cancelledAt)}. you won&apos;t be charged again.</>}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {sub.status === "active" && (
          <>
            <button type="button" className="btn-primary min-h-11" onClick={() => act(skipNext, (s) => `skipped ♡ your next delivery is now ${longDate(s.nextChargeAt!)}.`)}>
              skip next delivery
            </button>
            <button type="button" className="btn-outline min-h-11" onClick={() => act(pause, () => "paused. resume whenever you're ready.")}>
              pause
            </button>
            <button type="button" className="btn-outline min-h-11" onClick={() => act((s) => cancel(s, now()), () => "cancelled. you won't be charged again.")}>
              cancel
            </button>
          </>
        )}
        {sub.status !== "active" && (
          <button type="button" className="btn-primary min-h-11" onClick={() => act((s) => resume(s, now()), (s) => `welcome back ♡ your next delivery is ${longDate(s.nextChargeAt!)}.`)}>
            {sub.status === "paused" ? "resume" : "restart my ritual"}
          </button>
        )}
      </div>
      <p role="status" aria-live="polite" className="mt-4 min-h-6 text-[15px] font-semibold">
        {message}
      </p>
    </div>
  );
}
