import Link from "next/link";

const milestones = [
  {
    month: "month 1",
    title: "the wake-up",
    body: "that cooling tingle becomes your favorite part of the day. scalp feels fresh and clean, and hair feels softer from the first wash.",
  },
  {
    month: "month 3",
    title: "the shine",
    body: "visible shine, smoother lengths and less breakage in your brush. people start asking what you changed.",
  },
  {
    month: "month 6",
    title: "the glow",
    body: "fuller-looking, glossy, bouncy hair. the kind you can't stop touching. the ritual is officially a habit.",
  },
];

export function GlowJourney() {
  return (
    <section className="bg-oat" aria-labelledby="journey-title">
      <div className="container-page py-16 md:py-24">
        <p className="eyebrow">the 6-month glow journey</p>
        <h2 id="journey-title" className="heading-lg mt-3 max-w-xl">
          good hair is a habit, not a miracle.
        </h2>
        <ol className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Connecting line: vertical on phones, horizontal on larger screens. */}
          <div aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-px bg-latte md:top-[7px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-full" />
          {milestones.map((m) => (
            <li key={m.month} className="relative pl-10 md:pt-10 md:pl-0">
              <span aria-hidden="true" className="absolute top-0.5 left-0 size-[15px] rounded-full border-4 border-oat bg-clay md:top-0" />
              <p className="eyebrow">{m.month}</p>
              <h3 className="mt-2 text-2xl font-medium">{m.title}</h3>
              <p className="mt-2 text-cocoa-soft">{m.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Link href="/#pricing" className="btn-primary">
            start your glow journey
          </Link>
          <p className="text-xs text-cocoa-soft">cosmetic results with consistent use. everyone's hair is different.</p>
        </div>
      </div>
    </section>
  );
}
