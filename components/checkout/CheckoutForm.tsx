"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { plans } from "@/config/pricing";
import { launch } from "@/config/promotions";
import { useAccount } from "@/lib/account";
import { useCart } from "@/lib/cart-context";
import { useLaunch } from "@/lib/launch-context";
import { placeOrder } from "@/lib/place-order";
import { payments } from "@/lib/payments";
import { TEST_CARDS } from "@/lib/payments/demo";
import { formatMoney, toCents } from "@/lib/pricing";
import { chargeCents } from "@/lib/subscription";
import { getWelcomeSignup, isValidEmail } from "@/lib/welcome";
import { Field } from "@/components/checkout/Field";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { GuaranteeBadge } from "@/components/GuaranteeBadge";

type Values = Record<"email" | "name" | "line1" | "line2" | "city" | "state" | "zip" | "cardNumber" | "expiry" | "cvc" | "cardName", string>;
type Errors = Partial<Record<keyof Values | "renewal" | "form", string>>;

const EMPTY: Values = { email: "", name: "", line1: "", line2: "", city: "", state: "", zip: "", cardNumber: "", expiry: "", cvc: "", cardName: "" };

const formatCard = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
function formatExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
}

export function CheckoutForm() {
  const router = useRouter();
  const { totals, clear } = useCart();
  const { active } = useLaunch();
  const { account } = useAccount();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [renewalOk, setRenewalOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const [placed, setPlaced] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Prefill the email (and name) from the account or the welcome-gift signup.
  useEffect(() => {
    const email = account?.email ?? getWelcomeSignup()?.email ?? "";
    setValues((v) => ({ ...v, email: v.email || email, name: v.name || account?.name || "" }));
  }, [account]);

  const set = (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (key === "cardNumber") value = formatCard(value);
    if (key === "expiry") value = formatExpiry(value);
    if (key === "zip") value = value.replace(/\D/g, "").slice(0, 5);
    if (key === "state") value = value.toUpperCase().slice(0, 2);
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  if (totals.lines.length === 0 && !placed) {
    return (
      <div className="py-16 text-center">
        <h1 className="heading-lg">your bag is empty</h1>
        <p className="mt-3 text-cocoa-soft">add something lovely, then come back here to check out.</p>
        <Link href="/shop" className="btn-primary mt-8">
          shop velle
        </Link>
      </div>
    );
  }

  const hasRitual = totals.lines.some((l) => l.kind === "plan" && l.id === "ritual");
  const ritualMonthly = toCents(plans.ritual.price);
  const nextRitualCents = chargeCents({ monthlyCents: ritualMonthly, introPercentOff: active ? [...launch.subscriptionMonthsPercentOff] : [] }, 1);

  function validate(): Errors {
    const e: Errors = {};
    if (!isValidEmail(values.email.trim())) e.email = "enter your email, like you@example.com";
    if (values.name.trim().length < 2) e.name = "enter your full name";
    if (values.line1.trim().length < 3) e.line1 = "enter your street address";
    if (values.city.trim().length < 2) e.city = "enter your city";
    if (!/^[A-Z]{2}$/.test(values.state)) e.state = "2 letters, like NY";
    if (!/^\d{5}$/.test(values.zip)) e.zip = "5 digits";
    if (hasRitual && !renewalOk) e.renewal = "please tick the box to agree to the monthly subscription";
    return e;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setBusy(true);
    const result = await placeOrder({
      totals,
      launchActive: active,
      email: values.email,
      name: values.name,
      address: { line1: values.line1.trim(), line2: values.line2.trim() || undefined, city: values.city.trim(), state: values.state, zip: values.zip },
      card: { number: values.cardNumber, expiry: values.expiry, cvc: values.cvc, name: values.cardName },
    });
    setBusy(false);
    if (!result.ok) {
      const map: Record<string, keyof Values> = { number: "cardNumber", expiry: "expiry", cvc: "cvc", name: "cardName" };
      const key = result.field ? map[result.field] : undefined;
      setErrors(key ? { [key]: result.message } : { form: result.message });
      if (key) formRef.current?.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();
      return;
    }
    setPlaced(true);
    clear();
    router.push(`/checkout/success?order=${result.order.id}`);
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1.15fr_1fr] md:gap-14">
      <form ref={formRef} onSubmit={submit} noValidate className="order-2 md:order-1" aria-labelledby="checkout-title">
        <h1 id="checkout-title" className="heading-lg">
          checkout
        </h1>

        <fieldset className="mt-8">
          <legend className="text-xl font-extrabold tracking-[-0.03em]">contact</legend>
          <Field id="email" label="email" type="email" autoComplete="email" inputMode="email" value={values.email} onChange={set("email")} error={errors.email} className="mt-4" />
          {!account && (
            <p className="mt-2 text-[13px] text-cocoa-soft">
              we&apos;ll create your account with this email so you can track orders and manage your subscription.
            </p>
          )}
        </fieldset>

        <fieldset className="mt-8">
          <legend className="text-xl font-extrabold tracking-[-0.03em]">shipping address</legend>
          <div className="mt-4 grid grid-cols-6 gap-4">
            <Field id="name" label="full name" autoComplete="name" value={values.name} onChange={set("name")} error={errors.name} className="col-span-6" />
            <Field id="line1" label="street address" autoComplete="address-line1" value={values.line1} onChange={set("line1")} error={errors.line1} className="col-span-6" />
            <Field id="line2" label="apartment, suite (optional)" autoComplete="address-line2" value={values.line2} onChange={set("line2")} className="col-span-6" />
            <Field id="city" label="city" autoComplete="address-level2" value={values.city} onChange={set("city")} error={errors.city} className="col-span-6 sm:col-span-3" />
            <Field id="state" label="state" autoComplete="address-level1" placeholder="NY" value={values.state} onChange={set("state")} error={errors.state} className="col-span-3 sm:col-span-1" />
            <Field id="zip" label="zip code" autoComplete="postal-code" inputMode="numeric" value={values.zip} onChange={set("zip")} error={errors.zip} className="col-span-3 sm:col-span-2" />
          </div>
          <p className="mt-2 text-[13px] text-cocoa-soft">we ship within the US.</p>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="text-xl font-extrabold tracking-[-0.03em]">payment</legend>
          {payments.mode === "demo" && (
            <div className="mt-4 rounded-2xl bg-blush p-4 text-[15px]">
              <p className="font-bold">demo store: no real payment is taken</p>
              <p className="mt-1">
                use the test card <span className="font-semibold tabular-nums">4242 4242 4242 4242</span>, any future date and any 3 digits. to see a declined payment, use{" "}
                <span className="tabular-nums">4000 0000 0000 0002</span>.
              </p>
              <button
                type="button"
                className="mt-3 text-sm font-semibold underline underline-offset-4"
                onClick={() => {
                  setValues((v) => ({ ...v, cardNumber: formatCard(TEST_CARDS.success), expiry: "12 / 30", cvc: "123", cardName: v.cardName || v.name }));
                  setErrors((er) => ({ ...er, cardNumber: undefined, expiry: undefined, cvc: undefined, cardName: undefined }));
                }}
              >
                fill in the test card for me
              </button>
            </div>
          )}
          <div className="mt-4 grid grid-cols-6 gap-4">
            <Field id="cardNumber" label="card number" autoComplete="cc-number" inputMode="numeric" placeholder="1234 1234 1234 1234" value={values.cardNumber} onChange={set("cardNumber")} error={errors.cardNumber} className="col-span-6" />
            <Field id="expiry" label="expiry (MM / YY)" autoComplete="cc-exp" inputMode="numeric" placeholder="MM / YY" value={values.expiry} onChange={set("expiry")} error={errors.expiry} className="col-span-3" />
            <Field id="cvc" label="security code" autoComplete="cc-csc" inputMode="numeric" placeholder="123" maxLength={4} value={values.cvc} onChange={set("cvc")} error={errors.cvc} className="col-span-3" />
            <Field id="cardName" label="name on card" autoComplete="cc-name" value={values.cardName} onChange={set("cardName")} error={errors.cardName} className="col-span-6" />
          </div>
        </fieldset>

        {hasRitual && (
          <div className="mt-8">
            <label className="flex items-start gap-3 rounded-2xl border border-cocoa/20 bg-cream p-4 text-[15px]">
              <input
                type="checkbox"
                name="renewal"
                checked={renewalOk}
                onChange={(e) => {
                  setRenewalOk(e.target.checked);
                  setErrors((er) => ({ ...er, renewal: undefined }));
                }}
                aria-describedby={errors.renewal ? "renewal-error" : undefined}
                className="mt-1 size-5 shrink-0 accent-cocoa"
              />
              <span>
                i agree that The Ritual renews automatically every month. my next charge is <strong>{formatMoney(nextRitualCents)}</strong>
                {nextRitualCents !== ritualMonthly && <>, then {formatMoney(ritualMonthly)}/month</>}, until i cancel. i can skip, pause or cancel anytime in my account, in one click.
              </span>
            </label>
            {errors.renewal && (
              <p id="renewal-error" className="mt-1.5 text-sm text-[#8a2f1d]">
                {errors.renewal}
              </p>
            )}
          </div>
        )}

        {errors.form && (
          <p role="alert" className="mt-6 rounded-xl bg-[#8a2f1d]/10 p-4 text-[#8a2f1d]">
            {errors.form}
          </p>
        )}
        <p role="status" className="sr-only">
          {busy ? "processing your payment" : ""}
        </p>

        <button type="submit" disabled={busy} className="btn-primary mt-8 w-full text-base disabled:opacity-70">
          {busy ? "processing…" : `pay ${formatMoney(totals.totalCents)}`}
        </button>
        <GuaranteeBadge className="mt-3" />
      </form>

      <aside className="order-1 self-start rounded-[2rem] bg-oat p-5 md:sticky md:top-24 md:order-2 md:p-7" aria-label="order summary">
        <details className="group md:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between font-bold [&::-webkit-details-marker]:hidden">
            <span>
              order summary <span className="text-sm font-normal underline underline-offset-4 group-open:hidden">show</span>
              <span className="hidden text-sm font-normal underline underline-offset-4 group-open:inline">hide</span>
            </span>
            <span className="tabular-nums">{formatMoney(totals.totalCents)}</span>
          </summary>
          <div className="mt-2">
            <OrderSummary totals={totals} />
          </div>
        </details>
        <div className="hidden md:block">
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">your order</h2>
          <div className="mt-3">
            <OrderSummary totals={totals} />
          </div>
        </div>
      </aside>
    </div>
  );
}
