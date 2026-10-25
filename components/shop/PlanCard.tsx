import Image from "next/image";
import { plans, type PlanId } from "@/config/pricing";
import { itemImages } from "@/content/images";
import { AddToCart } from "@/components/cart/AddToCart";
import { PlanPrice } from "@/components/Price";
import { GuaranteeBadge } from "@/components/GuaranteeBadge";

/** A plan or set, with its price and an add-to-cart button. */
export function PlanCard({ id }: { id: PlanId }) {
  const plan = plans[id];
  const img = itemImages[id];
  const best = plan.badge !== null;
  return (
    <article id={id} className={`flex scroll-mt-24 flex-col overflow-hidden rounded-[2rem] ${best ? "bg-cocoa text-cream" : "bg-cream"}`} aria-labelledby={`card-${id}`}>
      <div className="relative aspect-[5/4]">
        <Image src={img.src} alt={img.alt} fill placeholder="blur" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" style={{ objectPosition: img.focus }} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <h3 id={`card-${id}`} className="text-[1.6rem] leading-none font-extrabold tracking-[-0.04em]">
            {plan.name}
          </h3>
          {plan.badge && <span className="rounded-full bg-blush px-3 py-1 text-xs font-bold tracking-wide text-cocoa uppercase">{plan.badge}</span>}
        </div>
        <p className={`mt-2 ${best ? "opacity-80" : "text-cocoa-soft"}`}>{plan.tagline}</p>
        <div className="mt-4">
          <PlanPrice planId={id} />
        </div>
        <ul className="mt-4 mb-7 space-y-1 text-[15px]">
          {plan.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <AddToCart kind="plan" id={id} className={`mt-auto ${best ? "btn bg-cream text-cocoa hover:bg-blush" : "btn-primary"}`}>
          {plan.cta}
        </AddToCart>
        <GuaranteeBadge className={`mt-3 ${best ? "!text-cream/80" : ""}`} />
      </div>
    </article>
  );
}
