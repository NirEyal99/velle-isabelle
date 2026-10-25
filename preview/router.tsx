"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

/**
 * A tiny page switcher for the single-page preview (the live link).
 * The site's real addresses ("/shop", "/products/serum") are mapped to short
 * names after the # in the address ("#shop", "#product-serum"), because the
 * preview is one page and that's the only part of its address it can use.
 */

export type Location = { path: string; search: string; anchor: string };

const TOKENS: Record<string, string> = {
  "/": "",
  "/shop": "shop",
  "/quiz": "quiz",
  "/checkout": "checkout",
  "/checkout/success": "order",
  "/account": "account",
  "/faq": "faq",
  "/contact": "contact",
  "/shipping-returns": "shipping-returns",
  "/privacy": "privacy",
  "/terms": "terms",
};
const PATHS = Object.fromEntries(Object.entries(TOKENS).map(([p, t]) => [t, p]));

export function pathToToken(path: string): string {
  if (path.startsWith("/products/")) return `product-${path.slice("/products/".length)}`;
  return TOKENS[path] ?? "";
}

export function tokenToPath(token: string): string {
  if (token.startsWith("product-")) return `/products/${token.slice("product-".length)}`;
  return PATHS[token] ?? "/";
}

export function parseHref(href: string, current: Location): Location {
  const url = new URL(href, `https://velle.preview${current.path}`);
  return { path: url.pathname, search: url.search, anchor: url.hash.slice(1) };
}

type RouterApi = { location: Location; navigate: (href: string) => void };
const RouterContext = createContext<RouterApi | null>(null);

// The search part (e.g. ?order=VL-123) can't live in the preview's address,
// so it's remembered per page, which keeps the Back button working.
const searchByToken: Record<string, string> = {};

function readLocation(): Location {
  const token = window.location.hash.slice(1);
  return { path: tokenToPath(token), search: searchByToken[token] ?? "", anchor: "" };
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<Location>({ path: "/", search: "", anchor: "" });
  // Where to scroll once the new page is on screen: a section id, "top", or nothing.
  const pendingScroll = useRef<{ target: string; smooth: boolean } | null>(null);

  useEffect(() => {
    setLocation(readLocation());
    // Back/forward buttons.
    const onBack = () => {
      pendingScroll.current = { target: "top", smooth: false };
      setLocation(readLocation());
    };
    window.addEventListener("popstate", onBack);
    return () => window.removeEventListener("popstate", onBack);
  }, []);

  // Scroll after the new page has rendered.
  useEffect(() => {
    const job = pendingScroll.current;
    if (!job) return;
    pendingScroll.current = null;
    const el = job.target === "top" ? null : document.getElementById(job.target);
    // "instant" overrides the site's smooth scrolling, so a new page opens at the right spot straight away.
    if (el) el.scrollIntoView({ behavior: job.smooth ? "smooth" : "instant" });
    else if (job.target === "top") window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  const navigate = useCallback(
    (href: string) => {
      const next = parseHref(href, location);
      const token = pathToToken(next.path);
      searchByToken[token] = next.search;
      const samePage = next.path === location.path;
      pendingScroll.current = next.anchor ? { target: next.anchor, smooth: samePage } : samePage ? null : { target: "top", smooth: false };
      // pushState (not location.hash) so the browser doesn't jump to a same-named spot on the old page.
      if (window.location.hash.slice(1) !== token) {
        try {
          history.pushState(null, "", `#${token}`);
        } catch {
          // Some viewers don't allow changing the address: the page still switches.
        }
      }
      setLocation({ ...next, anchor: next.anchor });
    },
    [location],
  );

  return <RouterContext.Provider value={{ location, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouterState(): RouterApi {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouterState must be used inside RouterProvider");
  return ctx;
}
