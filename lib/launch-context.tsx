"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { isLaunchActive, launchEndsAt } from "@/lib/pricing";

type LaunchState = {
  /** True while the launch sale is running. */
  active: boolean;
  /** Milliseconds left, or null before the page has loaded in the browser. */
  remainingMs: number | null;
};

const LaunchContext = createContext<LaunchState>({ active: false, remainingMs: null });

/**
 * Keeps every price and the countdown banner in sync with the real clock.
 * The server decides the starting state; the browser then ticks every second
 * and switches the sale off the moment the end date passes. Once off, it never
 * switches back on.
 */
export function LaunchProvider({ initialActive, children }: { initialActive: boolean; children: React.ReactNode }) {
  const [state, setState] = useState<LaunchState>({ active: initialActive, remainingMs: null });

  useEffect(() => {
    if (!initialActive) return;
    const tick = () => {
      const now = Date.now();
      const active = isLaunchActive(now);
      setState({ active, remainingMs: active ? launchEndsAt - now : 0 });
      return active;
    };
    if (!tick()) return;
    const timer = setInterval(() => {
      if (!tick()) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [initialActive]);

  return <LaunchContext.Provider value={state}>{children}</LaunchContext.Provider>;
}

export const useLaunch = () => useContext(LaunchContext);
