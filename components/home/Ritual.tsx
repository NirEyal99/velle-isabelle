import Image from "next/image";
import Link from "next/link";
import shampoo from "@/public/images/shampoo.jpg";
import conditioner from "@/public/images/conditioner.jpg";
import applying from "@/public/images/applying.jpg";

const steps = [
  {
    n: "01",
    title: "cleanse",
    body: "hydrating shampoo with fermented rice water. a soft, sulfate-free clean that never feels stripped.",
    img: shampoo,
    alt: "velle hydrating shampoo bottle",
    href: "/products/shampoo",
  },
  {
    n: "02",
    title: "condition",
    body: "nourishing conditioner with argan and camellia oil. silky slip, less breakage, glossy finish.",
    img: conditioner,
    alt: "velle nourishing conditioner tube",
    href: "/products/conditioner",
  },
  {
    n: "03",
    title: "wake up your scalp",
    body: "a few drops of scalp serum, massaged in. cooling tingle now, fuller-looking hair later.",
    img: applying,
    alt: "woman with a bob dropping velle scalp serum onto her parting",
    href: "/products/serum",
  },
];

export function Ritual() {
  return (
    <section id="ritual" className="container-page scroll-mt-20 py-16 md:py-24" aria-labelledby="ritual-title">
      <p className="eyebrow">the ritual</p>
      <h2 id="ritual-title" className="heading-lg mt-3 max-w-xl">
        three steps. five minutes. hair you can't stop touching.
      </h2>
      <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
        {steps.map((s) => (
          <li key={s.n}>
            <Link href={s.href} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-oat">
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute top-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-sm font-medium">
                  step {s.n}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-medium">{s.title}</h3>
              <p className="mt-2 text-cocoa-soft">{s.body}</p>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
