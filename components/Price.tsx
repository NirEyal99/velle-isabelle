"use client";

import { plans, type PlanId } from "@/config/pricing";
import { launch } from "@/config/promotions";
import { useLaunch } from "@/lib/launch-context";
import { formatMoney, toCents } from "@/lib/pricing";

/**
 * A regular price. Items always show their full price; the launch discount is
 * taken off in the cart, not on each item.
 */
export function Price({ dollars, className = "" }: { dollars: number; className?: string }) {
  return <span className={className}>{formatMoney(toCents(dollars))}</span>;
}

/** Small note under a price while the launch sale is on, saying the discount comes off in the cart. */
export function LaunchNote({ planId, className = "" }: { planId?: PlanId; className?: string }) {
  const { active } = useLaunch();
  if (!active) return null;
  const [m1, m2] = launch.subscriptionMonthsPercentOff;
  const text =
    planId && plans[planId].kind === "subscription"
      ? `launch week: ${m1}% off month 1${m2 ? ` and ${m2}% off month 2` : ""}, taken off in your cart`
      : `launch week: ${launch.percentOff}% off, taken off in your cart`;
  return <p className={`launch-note mt-3 inline-block rounded-full bg-current/10 px-3 py-1 text-[13px] font-semibold ${className}`}>{text}</p>;
}

/** Full price block for a plan card: the regular price, plus the launch note while the sale is on. */
export function PlanPrice({ planId }: { planId: PlanId }) {
  const plan = plans[planId];
  const cents = toCents(plan.price);

  let price: React.ReactNode;
  if (plan.kind === "subscription") {
    price = (
      <p className="text-3xl font-medium">
        {formatMoney(cents)}
        <span className="text-base font-normal">/month</span>
      </p>
    );
  } else if (plan.kind === "prepaid") {
    price = (
      <>
        <p className="text-3xl font-medium">{formatMoney(cents)}</p>
        <p className="mt-1 text-sm opacity-75">paid upfront · just {formatMoney(Math.round(cents / plan.months))}/month</p>
      </>
    );
  } else {
    price = (
      <p className="text-3xl font-medium">
        {formatMoney(cents)}
        <span className="text-base font-normal"> one-time</span>
      </p>
    );
  }

  return (
    <div>
      {price}
      <LaunchNote planId={planId} />
    </div>
  );
}
