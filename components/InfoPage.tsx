/** Layout for simple text pages (shipping, privacy, terms). */
export function InfoPage({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section className="container-page py-12 md:py-20" aria-labelledby="info-title">
      <div className="max-w-2xl">
        <h1 id="info-title" className="heading-lg">
          {title}
        </h1>
        {intro && <p className="mt-4 text-[17px] text-cocoa-soft">{intro}</p>}
        <div className="info-body mt-8 space-y-4 text-[16px] leading-relaxed [&_h2]:pt-4 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:tracking-[-0.03em] [&_li]:ml-5 [&_li]:list-disc">
          {children}
        </div>
      </div>
    </section>
  );
}

/** A clearly marked spot for the owner to replace with their own wording. */
export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-2xl border border-dashed border-clay-ink/60 bg-oat px-4 py-3 text-[15px]">
      <strong>placeholder:</strong> {children}
    </p>
  );
}
