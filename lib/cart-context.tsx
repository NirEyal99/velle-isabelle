"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { computeCart, lineKey, type CartItem, type CartTotals } from "@/lib/cart-math";
import { useLaunch } from "@/lib/launch-context";
import { getWelcomeSignup, WELCOME_EVENT } from "@/lib/welcome";

const KEY = "velle:cart";

type CartApi = {
  items: CartItem[];
  totals: CartTotals;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  /** Adds one (or sets a plan, which you can only have one of) and opens the cart. */
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartApi | null>(null);

function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

/** The shopping cart, kept in this browser so it survives a refresh. */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const { active } = useLaunch();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [welcomeGift, setWelcomeGift] = useState(false);

  useEffect(() => {
    setItems(load());
    setLoaded(true);
    setWelcomeGift(getWelcomeSignup() !== null);
    const onWelcome = () => setWelcomeGift(true);
    window.addEventListener(WELCOME_EVENT, onWelcome);
    return () => window.removeEventListener(WELCOME_EVENT, onWelcome);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      // Storage blocked: the cart still works for this visit.
    }
  }, [items, loaded]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const key = lineKey(item);
      const existing = prev.find((i) => lineKey(i) === key);
      if (item.kind === "plan") {
        // Plans are one per order.
        return existing ? prev : [...prev, { ...item, qty: 1 } as CartItem];
      }
      if (existing) return prev.map((i) => (lineKey(i) === key ? { ...i, qty: Math.min(6, i.qty + qty) } : i));
      return [...prev, { ...item, qty } as CartItem];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) => (qty <= 0 ? prev.filter((i) => lineKey(i) !== key) : prev.map((i) => (lineKey(i) === key ? { ...i, qty } : i))));
  }, []);

  const remove = useCallback((key: string) => setItems((prev) => prev.filter((i) => lineKey(i) !== key)), []);
  const clear = useCallback(() => setItems([]), []);

  const totals = useMemo(() => computeCart(items, { launchActive: active, welcomeGift }), [items, active, welcomeGift]);

  const api = useMemo<CartApi>(
    () => ({ items, totals, isOpen, open: () => setOpen(true), close: () => setOpen(false), add, setQty, remove, clear }),
    [items, totals, isOpen, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
