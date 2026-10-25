/** Layout for simple text pages (shipping, privacy, terms). */
export function InfoPage({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section className="container-page py-12 md:py-20" aria-labelledby="info-title">
      <div className="max-w-2xl">
        <h1 id="info-title" className="heading-lg">
          {title}
        </h1>
        {intro && <p className="mt-4 text-[17px] text-cocoa-soft">{intro}</p>}
        <div className="info-body mt-8 space-y-4 text-[16px] leading-relaxed [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4 [&_h2]:pt-6 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:tracking-[-0.03em] [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">
          {children}
        </div>
      </div>
    </section>
  );
}

/**
 * Small note on the legal pages. The text is a well-written starting point,
 * not legal advice: have a lawyer review it before taking real customers.
 */
export function DraftNote() {
  return (
    <p className="rounded-2xl bg-oat px-4 py-3 text-[14px] text-cocoa-soft">
      velle is a demo store and isn&apos;t selling yet. this page is a draft and will be reviewed by a lawyer before launch.
    </p>
  );
}
