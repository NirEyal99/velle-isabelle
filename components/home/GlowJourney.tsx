import Link from "next/link";

const milestones = [
  { month: "month 1", body: "you'll feel the tingle, and how clean your scalp is. hair is softer from the first wash." },
  { month: "month 3", body: "visible shine, smoother ends and less breakage in your brush." },
  { month: "month 6", body: "fuller-looking, bouncy hair, and a routine that's become a habit." },
];

export function GlowJourney() {
  return (
    <section className="bg-oat" aria-labelledby="journey-title">
      <div className="container-page py-20 md:py-32">
        <p className="label">the 6-month glow journey</p>
        <h2 id="journey-title" className="heading-lg mt-3 max-w-xl">
          what to expect
        </h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
          {milestones.map((m) => (
            <li key={m.month} className="border-t border-cocoa/20 pt-6">
              <h3 className="text-xl font-medium">{m.month}</h3>
              <p className="mt-2 text-cocoa-soft">{m.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <Link href="/#pricing" className="btn-primary self-start">
            start your glow journey
          </Link>
          <p className="text-sm text-cocoa-soft">cosmetic results with regular use. everyone&apos;s hair is different.</p>
        </div>
      </div>
    </section>
  );
}
