"use client";

import { useState } from "react";
import { isValidEmail } from "@/lib/welcome";
import { Field } from "@/components/checkout/Field";

/** Contact form (demo): checks the fields and shows a thank-you. Nothing is sent. */
export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<"name" | "email" | "message", string>>>({});
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p role="status" className="rounded-2xl bg-blush p-5 text-[17px]">
        thanks, {values.name.split(" ")[0].toLowerCase()} ♡ we&apos;ll reply to {values.email} within 1–2 business days. (demo store: this message wasn&apos;t actually sent.)
      </p>
    );
  }

  return (
    <form
      noValidate
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        const found: typeof errors = {};
        if (values.name.trim().length < 2) found.name = "enter your name";
        if (!isValidEmail(values.email.trim())) found.email = "enter your email, like you@example.com";
        if (values.message.trim().length < 5) found.message = "write your message";
        setErrors(found);
        const first = Object.keys(found)[0];
        if (first) document.getElementById(`contact-${first}`)?.focus();
        else setSent(true);
      }}
    >
      <Field id="contact-name" label="name" autoComplete="name" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} error={errors.name} />
      <Field id="contact-email" label="email" type="email" autoComplete="email" inputMode="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} error={errors.email} />
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold">
          message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`w-full rounded-xl border bg-cream px-4 py-3 text-[16px] focus:border-cocoa focus:outline-none ${errors.message ? "border-[#8a2f1d]" : "border-cocoa/25"}`}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-sm text-[#8a2f1d]">
            {errors.message}
          </p>
        )}
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        send message
      </button>
    </form>
  );
}
