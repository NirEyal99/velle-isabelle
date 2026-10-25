import Image from "next/image";
import ingredients from "@/public/images/ingredients.jpg";
import { freeFrom } from "@/content/products";

const heroes = [
  { name: "rosemary", body: "the herbal classic for a refreshed, healthier-feeling scalp." },
  { name: "peppermint", body: "the cooling tingle that wakes everything up." },
  { name: "fermented rice water", body: "for soft, smooth, shiny-looking strands." },
  { name: "argan + camellia oil", body: "slip, softness and a glossy finish." },
];

export function Ingredients() {
  return (
    <section id="ingredients" className="container-page scroll-mt-20 py-16 md:py-24" aria-labelledby="ingredients-title">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
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
          <p className="eyebrow">what's inside</p>
          <h2 id="ingredients-title" className="heading-lg mt-3">
            plants that pull their weight.
          </h2>
          <ul className="mt-8 divide-y divide-latte/60 border-y border-latte/60">
            {heroes.map((h) => (
              <li key={h.name} className="py-4">
                <h3 className="font-medium">{h.name}</h3>
                <p className="mt-1 text-cocoa-soft">{h.body}</p>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="free from and certifications">
            {freeFrom.map((f) => (
              <li key={f} className="rounded-full border border-latte px-3.5 py-1.5 text-sm">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
