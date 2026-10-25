import Image from "next/image";
import Link from "next/link";
import applying from "@/public/images/applying.jpg";

const milestones = [
  { n: "1", body: "your scalp feels clean and awake. strands feel softer and smoother from the very first wash." },
  { n: "3", body: "next-level texture: more shine, more slip, less frizz and less breakage in your brush." },
  { n: "6", body: "fuller-looking, glossy hair with real flow, and lengths that stay long because they break less." },
];

export function GlowJourney() {
  return (
    <section className="bg-clay text-cocoa-deep" aria-labelledby="journey-title">
      <div className="container-page grid items-center gap-12 py-20 md:grid-cols-[1.2fr_1fr] md:gap-16 md:py-28">
        <div>
          <p className="label">the 6-month glow journey</p>
          <h2 id="journey-title" className="heading-lg mt-3">
            what to expect
          </h2>
          <ol className="mt-10 space-y-7">
            {milestones.map((m) => (
              <li key={m.n} className="flex items-start gap-6">
                <span className="w-24 shrink-0 text-[4.5rem] leading-[0.8] font-extrabold tracking-[-0.06em] md:w-28 md:text-[5.5rem]" aria-hidden="true">
                  {m.n}
                </span>
                <div>
                  <h3 className="text-lg font-bold">month {m.n}</h3>
                  <p className="mt-1">{m.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <Link href="/#pricing" className="btn-primary self-start whitespace-nowrap">
              start your glow journey
            </Link>
            <p className="text-sm">cosmetic results with regular use. everyone&apos;s hair is different.</p>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
          <Image
            src={applying}
            alt="woman with long, glossy brown waves dropping velle scalp serum onto her parting"
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
