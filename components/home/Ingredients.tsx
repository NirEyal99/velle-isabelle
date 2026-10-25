import Image from "next/image";
import ingredients from "@/public/images/ingredients.jpg";

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
    <section id="ingredients" className="container-page scroll-mt-20 py-20 md:py-28" aria-labelledby="ingredients-title">
      <div className="grid items-center gap-12 md:grid-cols-[1.1fr_1fr] md:gap-20">
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
                <span className="size-2.5 rounded-full bg-clay" />
                {t.label}
              </span>
            ))}
          </div>
        </figure>

        <div>
          <p className="note">what&apos;s actually in there</p>
          <h2 id="ingredients-title" className="heading-lg mt-2">
            the good stuff, and nothing weird
          </h2>
          <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-cocoa-soft">
            <p>
              rosemary and peppermint give the serum its fresh, cooling tingle. fermented rice water makes the shampoo feel creamy and leaves strands smooth.
            </p>
            <p>
              argan and camellia oil are why the conditioner feels so silky. the caffeine and castor oil are in there for roots that look fuller and lifted.
            </p>
          </div>
          <ul className="mt-8 flex flex-wrap gap-3" aria-label="free from and certifications">
            {stickers.map((s) => (
              <li key={s.text} className={`rounded-full px-4 py-2 text-[15px] font-medium shadow-[0_4px_14px_-8px_rgba(59,43,36,0.5)] ${s.cls}`}>
                {s.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
