"use client";

import { useRouterState } from "../router";

/** Stand-ins for next/navigation in the preview. */
export function useRouter() {
  const { navigate } = useRouterState();
  return { push: navigate, replace: navigate, back: () => history.back(), refresh: () => {}, prefetch: () => {} };
}

export function usePathname() {
  return useRouterState().location.path;
}

export function useSearchParams() {
  return new URLSearchParams(useRouterState().location.search);
}

export function notFound(): never {
  throw new Error("page not found");
}
