import { guarantee } from "@/config/promotions";

/** Money-back guarantee note, shown next to every Add to cart / buy button. */
export function GuaranteeBadge({ className = "" }: { className?: string }) {
  return (
    <p className={`flex items-center justify-center gap-1.5 text-[13px] text-cocoa-soft ${className}`}>
      <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
      {guarantee.short} on your first order
    </p>
  );
}
