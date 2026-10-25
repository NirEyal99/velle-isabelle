import Image from "next/image";
import Link from "next/link";
import trialKit from "@/public/images/trial-kit.jpg";
import trio from "@/public/images/trio.jpg";
import gifts from "@/public/images/gifts.jpg";
import { plans, type PlanId } from "@/config/pricing";
import { PlanPrice } from "@/components/Price";
import { GuaranteeBadge } from "@/components/GuaranteeBadge";

const cards: { id: PlanId; img: typeof trio; alt: string }[] = [
  { id: "trial-kit", img: trialKit, alt: "velle trial kit: mini serum, shampoo and conditioner in a satin-lined box" },
  { id: "ritual", img: trio, alt: "full-size velle scalp serum, hydrating shampoo and nourishing conditioner" },
  { id: "glow-journey", img: gifts, alt: "silk pillowcase, satin scrunchie and scalp massager in blush pink" },
  { id: "full-set", img: trio, alt: "full-size velle scalp serum, hydrating shampoo and nourishing conditioner" },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-oat scroll-mt-20" aria-labelledby="pricing-title">
      <div className="container-page py-16 md:py-24">
        <p className="eyebrow">pricing</p>
        <h2 id="pricing-title" className="heading-lg mt-3 max-w-xl">
          pick your ritual.
        </h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ id, img, alt }) => {
            const plan = plans[id];
            const best = id === "glow-journey";
            return (
              <li
                key={id}
                className={`relative flex flex-col rounded-3xl bg-cream p-4 ${best ? "ring-2 ring-cocoa" : ""}`}
              >
                {plan.badge && (
                  <span
                    className={`absolute top-7 left-7 z-10 rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase ${
                      best ? "bg-cocoa text-cream" : "bg-cream text-cocoa"
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-oat sm:aspect-square">
                  <Image src={img} alt={alt} fill placeholder="blur" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
                  <h3 className="text-xl font-medium">{plan.name}</h3>
                  <p className="mt-1 text-sm text-cocoa-soft">{plan.tagline}</p>
                  <div className="mt-4">
                    <PlanPrice planId={id} />
                  </div>
                  <ul className="mt-4 mb-6 space-y-1.5 text-[15px]">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="text-clay-ink">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/shop#${id}`} className={`mt-auto text-center ${best ? "btn-primary" : "btn-outline"}`}>
                    {plan.cta}
                  </Link>
                  <GuaranteeBadge className="mt-3 !text-xs" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
