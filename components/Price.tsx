"use client";

import { plans, type PlanId } from "@/config/pricing";
import { useLaunch } from "@/lib/launch-context";
import { formatMoney, salePrice, subscriptionIntroPrices, toCents } from "@/lib/pricing";

/** A price that shows the launch discount (with the old price crossed out) while the sale is on. */
export function Price({ dollars, className = "" }: { dollars: number; className?: string }) {
  const { active } = useLaunch();
  const now = salePrice(dollars, active);
  const was = toCents(dollars);
  return (
    <span className={className}>
      {active && now < was && (
        <>
          <s className="mr-2 font-normal opacity-75">
            <span className="sr-only">was </span>
            {formatMoney(was)}
          </s>
          <span className="sr-only">now </span>
        </>
      )}
      {formatMoney(now)}
    </span>
  );
}

/** Full price block for a plan card, including per-month and intro-offer lines. */
export function PlanPrice({ planId }: { planId: PlanId }) {
  const { active } = useLaunch();
  const plan = plans[planId];

  if (plan.kind === "subscription") {
    const [first, second] = subscriptionIntroPrices(plan.price, active);
    return (
      <div>
        <p className="text-3xl font-medium">
          {first !== undefined ? (
            <>
              <s className="mr-2 text-xl font-normal opacity-75">
                <span className="sr-only">was </span>
                {formatMoney(toCents(plan.price))}
              </s>
              <span className="sr-only">now </span>
              {formatMoney(first)}
              <span className="text-base font-normal"> first month</span>
            </>
          ) : (
            <>
              {formatMoney(toCents(plan.price))}
              <span className="text-base font-normal">/month</span>
            </>
          )}
        </p>
        {first !== undefined && (
          <p className="mt-1 text-sm opacity-75">
            {second !== undefined && <>then {formatMoney(second)} for month 2, </>}
            {formatMoney(toCents(plan.price))}/month after
          </p>
        )}
      </div>
    );
  }

  if (plan.kind === "prepaid") {
    const total = salePrice(plan.price, active);
    return (
      <div>
        <p className="text-3xl font-medium">
          <Price dollars={plan.price} className="[&_s]:text-xl" />
        </p>
        <p className="mt-1 text-sm opacity-75">
          paid upfront · just {formatMoney(Math.round(total / plan.months))}/month
        </p>
      </div>
    );
  }

  return (
    <p className="text-3xl font-medium">
      <Price dollars={plan.price} className="[&_s]:text-xl" />
      <span className="text-base font-normal"> one-time</span>
    </p>
  );
}
