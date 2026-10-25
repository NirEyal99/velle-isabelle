import Image from "next/image";
import Link from "next/link";
import ingredients from "@/public/images/ingredients.jpg";
import { Botanical, type Plant } from "@/components/Botanical";

/** The 5 natural hero ingredients. Cosmetic descriptions only. */
const plants: { plant: Plant; name: string; inProduct: string; href: string; body: string; bg: string; tilt: string }[] = [
  {
    plant: "rosemary",
    name: "rosemary",
    inProduct: "scalp serum",
    href: "/products/serum",
    body: "the herb behind the serum's fresh, wide-awake feeling.",
    bg: "bg-cream",
    tilt: "md:-rotate-2",
  },
  {
    plant: "peppermint",
    name: "peppermint",
    inProduct: "scalp serum",
    href: "/products/serum",
    body: "where the cooling tingle comes from.",
    bg: "bg-blush/70",
    tilt: "md:rotate-1 md:translate-y-6",
  },
  {
    plant: "rice",
    name: "rice",
    inProduct: "hydrating shampoo",
    href: "/products/shampoo",
    body: "fermented into rice water for a creamy lather and smooth-feeling strands.",
    bg: "bg-cream",
    tilt: "md:-rotate-1",
  },
  {
    plant: "aloe",
    name: "aloe vera",
    inProduct: "hydrating shampoo",
    href: "/products/shampoo",
    body: "keeps your scalp feeling calm and hydrated.",
    bg: "bg-oat",
    tilt: "md:rotate-2 md:translate-y-4",
  },
  {
    plant: "argan",
    name: "argan",
    inProduct: "nourishing conditioner",
    href: "/products/conditioner",
    body: "the oil that gives you softness, slip and visible shine.",
    bg: "bg-blush/70",
    tilt: "md:-rotate-1",
  },
];

/** Labels placed on the actual ingredients in the photo (positions are % of the photo). */
const tags = [
  { label: "rosemary", x: "30%", y: "16%" },
  { label: "rice water", x: "49%", y: "45%" },
  { label: "rice", x: "80%", y: "33%" },
  { label: "peppermint", x: "22%", y: "70%" },
  { label: "argan oil", x: "72%", y: "79%" },
];

const stickers = [
  { text: "no sulfates", cls: "bg-blush -rotate-6" },
  { text: "no parabens", cls: "bg-cream rotate-3" },
  { text: "no silicones", cls: "bg-latte/60 -rotate-2" },
  { text: "vegan", cls: "bg-cocoa text-cream rotate-6" },
  { text: "cruelty-free", cls: "bg-blush -rotate-3" },
];

export function Ingredients() {
  return (
    <section id="ingredients" className="relative scroll-mt-20 overflow-hidden" aria-labelledby="ingredients-title">
      <div className="container-page py-20 md:py-28">
        <div className="md:flex md:items-end md:justify-between">
          <div>
            <p className="note">what&apos;s actually in there</p>
            <h2 id="ingredients-title" className="heading-lg mt-2 max-w-xl">
              5 natural ingredients, straight from the garden
            </h2>
          </div>
          <p className="note mt-3 md:mt-0 md:mb-2 md:rotate-2">(okay, and a rice field)</p>
        </div>

        {/* The five plants, each with its own drawing. */}
        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-5">
          {plants.map((p, i) => (
            <li key={p.plant} className={`${p.tilt} ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}>
              <Link href={p.href} className={`group flex h-full flex-col rounded-[2rem] p-5 pb-6 shadow-[0_14px_40px_-26px_rgba(59,43,36,0.5)] transition-transform hover:-translate-y-1 ${p.bg}`}>
                <div className="grid h-36 place-items-center text-sage md:h-44">
                  <Botanical plant={p.plant} className="h-full max-w-full transition-transform duration-500 group-hover:rotate-3" />
                </div>
                <h3 className="mt-4 text-xl font-medium tracking-tight">{p.name}</h3>
                <p className="font-hand text-[1.2rem] leading-tight text-clay-ink">in the {p.inProduct}</p>
                <p className="mt-2 text-[15px] text-cocoa-soft">{p.body}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid items-center gap-12 md:mt-24 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <figure className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem_3rem_3rem_10rem]">
              <Image
                src={ingredients}
                alt="flat-lay of fresh rosemary, mint leaves, a bowl of rice water, rice grains and golden oil drops on linen"
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover"
              />
              {tags.map((t) => (
                <span
                  key={t.label}
                  aria-hidden="true"
                  style={{ left: t.x, top: t.y }}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-cream/90 py-1 pr-3 pl-1.5 text-[13px] font-medium whitespace-nowrap shadow-sm backdrop-blur-sm md:text-sm"
                >
                  <span className="size-2.5 rounded-full bg-sage" />
                  {t.label}
                </span>
              ))}
            </div>
          </figure>

          <div>
            <h3 className="text-[1.75rem] leading-tight font-medium tracking-tight md:text-[2.1rem]">the good stuff, and nothing weird</h3>
            <p className="mt-4 text-[17px] leading-relaxed text-cocoa-soft">
              alongside the plants you&apos;ll find camellia oil, caffeine, castor oil and biotin. and the whole lineup is:
            </p>
            <ul className="mt-7 flex flex-wrap gap-3" aria-label="free from and certifications">
              {stickers.map((s) => (
                <li key={s.text} className={`rounded-full px-4 py-2 text-[15px] font-medium shadow-[0_4px_14px_-8px_rgba(59,43,36,0.5)] ${s.cls}`}>
                  {s.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
