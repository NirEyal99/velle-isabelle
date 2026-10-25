import { faqs } from "@/content/faq";

/** Accordion of FAQs. Uses built-in <details> so it works with keyboards and screen readers. */
export function FaqList({ limit }: { limit?: number }) {
  const items = limit ? faqs.slice(0, limit) : faqs;
  return (
    <div className="divide-y divide-latte/60 border-y border-latte/60">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-medium [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="text-2xl font-light transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="pb-5 text-cocoa-soft">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
