import Link from "next/link";

const entries = [
  {
    month: "month 1",
    body: "mostly you'll notice the tingle, and how clean your scalp feels. hair is softer from the very first wash.",
    tilt: "md:-rotate-2",
    bg: "bg-cream",
  },
  {
    month: "month 3",
    body: "this is when the shine shows up. smoother ends, less breakage in your brush, and someone will probably ask what you changed.",
    tilt: "md:rotate-1 md:translate-y-10",
    bg: "bg-blush",
  },
  {
    month: "month 6",
    body: "fuller-looking, bouncy hair. by now the routine is just something you do, like brushing your teeth.",
    tilt: "md:-rotate-1",
    bg: "bg-cream",
  },
];

export function GlowJourney() {
  return (
    <section className="relative overflow-hidden bg-oat" aria-labelledby="journey-title">
      <div className="container-page py-20 md:py-28">
        <p className="note">the 6-month glow journey</p>
        <h2 id="journey-title" className="heading-lg mt-2 max-w-lg">
          what to expect, honestly
        </h2>

        <div className="relative mt-14">
          {/* Hand-drawn wavy line behind the notes on larger screens. */}
          <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="absolute top-1/2 left-0 hidden h-28 w-full -translate-y-1/2 text-latte md:block" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" aria-hidden="true">
            <path d="M0 70C120 10 220 110 340 60S560 10 680 70 880 110 1000 40" />
          </svg>
          <ol className="relative grid gap-6 md:grid-cols-3 md:gap-10">
            {entries.map((e) => (
              <li key={e.month} className={`rounded-[1.75rem] px-6 pt-5 pb-7 shadow-[0_14px_40px_-24px_rgba(59,43,36,0.45)] ${e.bg} ${e.tilt}`}>
                <h3 className="font-hand text-[2rem] leading-none text-clay-ink">{e.month}</h3>
                <p className="mt-3 text-[17px] leading-relaxed">{e.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 flex flex-col gap-3 md:mt-20 md:flex-row md:items-center md:gap-6">
          <Link href="/#pricing" className="btn-primary self-start">
            start your glow journey
          </Link>
          <p className="text-sm text-cocoa-soft">everyone&apos;s hair is different. these are cosmetic results with regular use.</p>
        </div>
      </div>
    </section>
  );
}
