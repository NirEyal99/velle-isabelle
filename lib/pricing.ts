import { launch } from "@/config/promotions";

/** Money is handled in whole cents internally so totals never drift (e.g. $0.1 + $0.2). */
export const toCents = (dollars: number) => Math.round(dollars * 100);

export function formatMoney(cents: number): string {
  const dollars = cents / 100;
  return Number.isInteger(dollars) ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}

export const launchEndsAt = new Date(launch.endsAt).getTime();

export function isLaunchActive(now: number): boolean {
  return now < launchEndsAt;
}

export function applyPercentOff(cents: number, percent: number): number {
  return Math.round((cents * (100 - percent)) / 100);
}

/** Price after the launch discount (or the normal price once the launch is over). */
export function salePrice(dollars: number, launchActive: boolean): number {
  const cents = toCents(dollars);
  return launchActive ? applyPercentOff(cents, launch.percentOff) : cents;
}

/** Month-by-month intro prices for the subscription during the launch, e.g. [3900, 4160]. */
export function subscriptionIntroPrices(monthlyDollars: number, launchActive: boolean): number[] {
  if (!launchActive) return [];
  return launch.subscriptionMonthsPercentOff.map((p) => applyPercentOff(toCents(monthlyDollars), p));
}
