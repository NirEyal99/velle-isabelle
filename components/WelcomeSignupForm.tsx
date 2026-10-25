"use client";

import { useId, useState } from "react";
import { getWelcomeSignup, isValidEmail, saveWelcomeSignup } from "@/lib/welcome";

/** Email signup for the free mini serum. Used in the homepage band and the welcome popup. */
export function WelcomeSignupForm({ onDone, dark = false }: { onDone?: () => void; dark?: boolean }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!isValidEmail(value)) {
      setError("please enter a valid email, like you@example.com");
      return;
    }
    if (!getWelcomeSignup()) saveWelcomeSignup(value);
    setError("");
    setDone(true);
    onDone?.();
  }

  if (done) {
    return (
      <p role="status" className={`rounded-2xl px-5 py-4 text-[15px] ${dark ? "bg-cream/10" : "bg-cream/70"}`}>
        you're on the list ♡ your free mini scalp serum will be added to your first order automatically.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <label htmlFor={`${id}-email`} className="sr-only">
        email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="min-h-12 flex-1 rounded-full border border-cocoa/30 bg-cream px-5 text-[15px] text-cocoa placeholder:text-cocoa-soft focus:border-cocoa focus:outline-none"
        />
        <button type="submit" className={dark ? "btn-light" : "btn-primary"}>
          claim my gift
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className={`mt-2 px-2 text-sm ${dark ? "text-blush" : "text-[#8a2f1d]"}`}>
          {error}
        </p>
      )}
    </form>
  );
}
