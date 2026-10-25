import Image from "next/image";
import Link from "next/link";
import shampoo from "@/public/images/shampoo.jpg";
import conditioner from "@/public/images/conditioner.jpg";
import serum from "@/public/images/serum.jpg";

// Each step is its own solid color tile with the product photo on it.
const steps = [
  {
    title: "wash",
    product: "hydrating shampoo",
    body: "rice water and aloe, no sulfates. hair comes out soft instead of squeaky.",
    img: shampoo,
    alt: "velle hydrating shampoo bottle",
    href: "/products/shampoo",
    tile: "bg-blush",
  },
  {
    title: "condition",
    product: "nourishing conditioner",
    body: "argan and camellia oil for slip, less breakage and a glossy finish.",
    img: conditioner,
    alt: "velle nourishing conditioner tube",
    href: "/products/conditioner",
    tile: "bg-latte",
  },
  {
    title: "wake up your scalp",
    product: "scalp serum",
    body: "a few drops along your part, massaged in. cooling tingle, fuller-looking roots.",
    img: serum,
    alt: "velle scalp serum dropper bottle",
    href: "/products/serum",
    tile: "bg-clay text-cocoa-deep",
  },
];

export function Ritual() {
  return (
    <section id="ritual" className="container-page scroll-mt-20 py-20 md:py-28" aria-labelledby="ritual-title">
      <p className="label">the ritual</p>
      <h2 id="ritual-title" className="heading-lg mt-3 max-w-2xl">
        three steps, about five minutes
      </h2>
      <ol className="mt-12 grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title}>
            <Link href={s.href} className={`group flex h-full flex-col rounded-[2rem] p-4 pb-7 ${s.tile}`}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="px-3 pt-6">
                <p className="text-[15px] font-semibold">
                  step {i + 1} · {s.product}
                </p>
                <h3 className="mt-1 text-[1.9rem] leading-none font-extrabold tracking-[-0.04em]">{s.title}</h3>
                <p className="mt-3">{s.body}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
