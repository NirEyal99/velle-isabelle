import Image from "next/image";
import ingredients from "@/public/images/ingredients.jpg";
import { Botanical, type Plant } from "@/components/Botanical";

/** The 5 natural hero ingredients. Cosmetic descriptions only. */
const plants: { plant: Plant; name: string; body: string }[] = [
  { plant: "rosemary", name: "rosemary", body: "for a fresh, healthier-feeling scalp. in the serum." },
  { plant: "peppermint", name: "peppermint", body: "the cooling tingle. in the serum." },
  { plant: "rice", name: "rice water", body: "a creamy lather and smooth strands. in the shampoo." },
  { plant: "aloe", name: "aloe vera", body: "keeps your scalp feeling calm. in the shampoo." },
  { plant: "argan", name: "argan oil", body: "softness and visible shine. in the conditioner." },
];

export function Ingredients() {
  return (
    <section id="ingredients" className="scroll-mt-20 bg-oat" aria-labelledby="ingredients-title">
      <div className="container-page grid items-center gap-12 py-20 md:grid-cols-2 md:gap-20 md:py-28">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
          <Image
            src={ingredients}
            alt="flat-lay of fresh rosemary, mint leaves, a bowl of rice water, rice grains and golden oil drops on linen"
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="label">what&apos;s inside</p>
          <h2 id="ingredients-title" className="heading-lg mt-3">
            5 natural ingredients
          </h2>
          <ul className="mt-8 divide-y divide-cocoa/10 border-y border-cocoa/10">
            {plants.map((p) => (
              <li key={p.plant} className="flex items-center gap-5 py-4">
                <span className="grid size-16 shrink-0 place-items-center rounded-full bg-cream">
                  <Botanical plant={p.plant} stroke={3.5} className="size-11 text-sage" />
                </span>
                <div>
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  <p className="text-[15px] text-cocoa-soft">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-cocoa-soft">vegan · cruelty-free · no sulfates, parabens or silicones</p>
        </div>
      </div>
    </section>
  );
}
