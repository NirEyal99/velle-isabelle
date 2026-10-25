import Image from "next/image";
import Link from "next/link";
import shampoo from "@/public/images/shampoo.jpg";
import conditioner from "@/public/images/conditioner.jpg";
import applying from "@/public/images/applying.jpg";

const steps = [
  {
    n: "1",
    title: "wash",
    body: "the hydrating shampoo, with rice water and aloe and no sulfates. hair comes out soft instead of squeaky.",
    img: shampoo,
    alt: "velle hydrating shampoo bottle",
    href: "/products/shampoo",
    // Each photo gets its own shape and offset so the row feels loose, not boxed in.
    shape: "rounded-t-full rounded-b-[2rem]",
    offset: "",
  },
  {
    n: "2",
    title: "condition",
    body: "argan and camellia oil, with so much slip your comb just glides. ends look glossy and your brush collects way less breakage.",
    img: conditioner,
    alt: "velle nourishing conditioner tube",
    href: "/products/conditioner",
    shape: "rounded-[2.5rem]",
    offset: "md:mt-24",
  },
  {
    n: "3",
    title: "the fun part",
    body: "a few drops of serum along your part, then massage it in. it tingles (the good kind). this is the step for fuller-looking roots.",
    img: applying,
    alt: "woman with a bob dropping velle scalp serum onto her parting",
    href: "/products/serum",
    shape: "rounded-[48%_52%_2rem_2rem/38%_38%_2rem_2rem]",
    offset: "md:mt-10",
  },
];

export function Ritual() {
  return (
    <section id="ritual" className="container-page scroll-mt-20 py-20 md:py-28" aria-labelledby="ritual-title">
      <div className="md:flex md:items-end md:justify-between">
        <h2 id="ritual-title" className="heading-lg max-w-xl">
          the whole routine takes about five minutes
        </h2>
        <p className="note mt-3 md:mt-0 md:mb-2 md:-rotate-3">(we timed it, in the shower)</p>
      </div>
      <ol className="mt-12 grid gap-14 md:grid-cols-3 md:gap-8">
        {steps.map((s) => (
          <li key={s.n} className={s.offset}>
            <Link href={s.href} className="group block">
              <div className={`relative aspect-[4/5] overflow-hidden bg-oat ${s.shape}`}>
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-hand text-4xl leading-none text-clay-ink">{s.n}</span>
                <h3 className="text-2xl font-medium tracking-tight">{s.title}</h3>
              </div>
              <p className="mt-2 max-w-sm text-cocoa-soft">{s.body}</p>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
