"use client";

import { launch } from "@/config/promotions";
import { useLaunch } from "@/lib/launch-context";

function split(ms: number) {
  const s = Math.floor(ms / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Launch-sale banner. Disappears for good when the countdown reaches zero. */
export function CountdownBanner() {
  const { active, remainingMs } = useLaunch();
  if (!active) return null;

  const t = remainingMs === null ? null : split(remainingMs);

  return (
    <div className="bg-cocoa text-cream" role="region" aria-label="launch sale">
      <div className="container-page flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 py-2 text-center text-[13px]">
        <span className="font-medium">{launch.bannerText}</span>
        <span aria-hidden="true" className="hidden text-latte sm:inline">·</span>
        <span className="tabular-nums">
          ends in{" "}
          {t ? (
            <>
              <span className="sr-only">
                {t.d} days {t.h} hours {t.m} minutes
              </span>
              <span aria-hidden="true">
                {t.d}d {pad(t.h)}h {pad(t.m)}m {pad(t.s)}s
              </span>
            </>
          ) : (
            <span aria-hidden="true">–d ––h ––m ––s</span>
          )}
        </span>
      </div>
    </div>
  );
}
