import Image from "next/image";
import Link from "next/link";
import shampoo from "@/public/images/shampoo.jpg";
import conditioner from "@/public/images/conditioner.jpg";
import applying from "@/public/images/applying.jpg";

const steps = [
  {
    title: "wash",
    body: "hydrating shampoo with rice water and aloe. sulfate-free, so hair comes out soft instead of squeaky.",
    img: shampoo,
    alt: "velle hydrating shampoo bottle",
    href: "/products/shampoo",
  },
  {
    title: "condition",
    body: "argan and camellia oil for slip, less breakage and a glossy finish.",
    img: conditioner,
    alt: "velle nourishing conditioner tube",
    href: "/products/conditioner",
  },
  {
    title: "massage in the serum",
    body: "a few drops along your part. it tingles a little, and it's the step for fuller-looking roots.",
    img: applying,
    alt: "woman with a bob dropping velle scalp serum onto her parting",
    href: "/products/serum",
  },
];

export function Ritual() {
  return (
    <section id="ritual" className="container-page scroll-mt-20 py-20 md:py-32" aria-labelledby="ritual-title">
      <p className="label">the ritual</p>
      <h2 id="ritual-title" className="heading-lg mt-3 max-w-xl">
        three steps, about five minutes
      </h2>
      <ol className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
        {steps.map((s, i) => (
          <li key={s.title}>
            <Link href={s.href} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-oat">
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="mt-5 text-xl font-medium">
                <span className="mr-2 text-clay-ink">{i + 1}.</span>
                {s.title}
              </h3>
              <p className="mt-2 max-w-sm text-cocoa-soft">{s.body}</p>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
