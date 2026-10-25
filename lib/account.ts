"use client";

import { useSyncExternalStore } from "react";
import type { Subscription } from "@/lib/subscription";

/**
 * Demo customer accounts, kept in this browser. Any email "signs in".
 * With a real backend this becomes a database plus real sign-in (for example
 * an emailed magic link), and Stripe holds the orders and subscriptions.
 */

export type Address = { line1: string; line2?: string; city: string; state: string; zip: string };

export type Order = {
  id: string;
  placedAt: string;
  email: string;
  name: string;
  address: Address;
  lines: { name: string; qty: number; lineCents: number; note?: string }[];
  gifts: string[];
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  totalCents: number;
  payment: { last4: string; brand: string; paymentId: string };
  subscriptionId?: string;
};

export type Account = { email: string; name: string; createdAt: string; orders: Order[]; subscriptions: Subscription[] };

type Store = { signedIn: string | null; accounts: Record<string, Account> };

const KEY = "velle:accounts";
const EVENT = "velle:accounts-changed";
const EMPTY: Store = { signedIn: null, accounts: {} };

let cachedRaw: string | null = null;
let cachedStore: Store = EMPTY;

function read(): Store {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    // Storage blocked: behave as signed out.
  }
  if (raw === cachedRaw) return cachedStore;
  cachedRaw = raw;
  try {
    cachedStore = raw ? (JSON.parse(raw) as Store) : EMPTY;
  } catch {
    cachedStore = EMPTY;
  }
  return cachedStore;
}

function write(next: Store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage blocked: changes last only for this page view.
    cachedRaw = null;
    cachedStore = next;
  }
  window.dispatchEvent(new Event(EVENT));
}

const normalize = (email: string) => email.trim().toLowerCase();

export function signIn(email: string, name = ""): Account {
  const store = read();
  const key = normalize(email);
  const existing = store.accounts[key];
  const account: Account = existing
    ? { ...existing, name: existing.name || name }
    : { email: key, name, createdAt: new Date().toISOString(), orders: [], subscriptions: [] };
  write({ signedIn: key, accounts: { ...store.accounts, [key]: account } });
  return account;
}

export function signOut() {
  write({ ...read(), signedIn: null });
}

function updateAccount(email: string, fn: (a: Account) => Account) {
  const store = read();
  const key = normalize(email);
  const account = store.accounts[key];
  if (!account) return;
  write({ ...store, accounts: { ...store.accounts, [key]: fn(account) } });
}

export function addOrder(order: Order, subscription?: Subscription) {
  updateAccount(order.email, (a) => ({
    ...a,
    orders: [order, ...a.orders],
    subscriptions: subscription ? [subscription, ...a.subscriptions] : a.subscriptions,
  }));
}

export function updateSubscription(email: string, id: string, fn: (s: Subscription) => Subscription) {
  updateAccount(email, (a) => ({ ...a, subscriptions: a.subscriptions.map((s) => (s.id === id ? fn(s) : s)) }));
}

export function findOrder(id: string): Order | undefined {
  for (const a of Object.values(read().accounts)) {
    const o = a.orders.find((x) => x.id === id);
    if (o) return o;
  }
  return undefined;
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** The signed-in account (or null), kept up to date. `ready` is false until the browser has loaded it. */
export function useAccount(): { ready: boolean; account: Account | null } {
  const store = useSyncExternalStore(subscribe, read, () => null);
  if (store === null) return { ready: false, account: null };
  return { ready: true, account: store.signedIn ? store.accounts[store.signedIn] ?? null : null };
}

/** Order status for the demo, based on how long ago it was placed. */
export function orderStatus(placedAt: string, now = Date.now()): string {
  const days = (now - new Date(placedAt).getTime()) / 86_400_000;
  if (days < 1) return "confirmed";
  if (days < 3) return "packing";
  return "shipped";
}
