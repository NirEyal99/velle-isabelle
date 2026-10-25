"use client";

/** A labelled text input with an error message underneath. */
export function Field({
  id,
  label,
  error,
  className = "",
  ...input
}: { id: string; label: string; error?: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`min-h-12 w-full rounded-xl border bg-cream px-4 text-[16px] placeholder:text-cocoa-soft/70 focus:border-cocoa focus:outline-none ${error ? "border-[#8a2f1d]" : "border-cocoa/25"}`}
        {...input}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-[#8a2f1d]">
          {error}
        </p>
      )}
    </div>
  );
}
