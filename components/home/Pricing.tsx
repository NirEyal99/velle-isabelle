import Image from "next/image";
import { AddToCart } from "@/components/cart/AddToCart";
import trialKit from "@/public/images/trial-kit.jpg";
import trio from "@/public/images/trio.jpg";
import gifts from "@/public/images/gifts.jpg";
import { plans, type PlanId } from "@/config/pricing";
import { PlanPrice } from "@/components/Price";
import { GuaranteeBadge } from "@/components/GuaranteeBadge";

function Includes({ id }: { id: PlanId }) {
  return (
    <ul className="mt-5 mb-8 space-y-1 text-[15px]">
      {plans[id].includes.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function Pricing() {
  const ritual = plans.ritual;
  const glow = plans["glow-journey"];

  return (
    <section id="pricing" className="scroll-mt-20 bg-blush" aria-labelledby="pricing-title">
      <div className="container-page py-20 md:py-28">
        <p className="label">pricing</p>
        <h2 id="pricing-title" className="heading-lg mt-3">
          pick your ritual
        </h2>

        {/* The two subscriptions, side by side. */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="flex flex-col overflow-hidden rounded-[2rem] bg-cream" aria-labelledby="plan-ritual">
            <div className="relative aspect-[16/11]">
              <Image src={trio} alt="full-size velle scalp serum, hydrating shampoo and nourishing conditioner" fill placeholder="blur" sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-[50%_60%]" />
            </div>
            <div className="flex flex-1 flex-col p-7 md:p-9">
              <h3 id="plan-ritual" className="text-[1.9rem] leading-none font-extrabold tracking-[-0.04em]">{ritual.name}</h3>
              <p className="mt-2 text-cocoa-soft">{ritual.tagline}</p>
              <div className="mt-5"><PlanPrice planId="ritual" /></div>
              <Includes id="ritual" />
              <AddToCart kind="plan" id="ritual" className="btn-primary mt-auto">{ritual.cta}</AddToCart>
              <GuaranteeBadge className="mt-3" />
            </div>
          </article>

          <article className="flex flex-col overflow-hidden rounded-[2rem] bg-cocoa text-cream" aria-labelledby="plan-glow">
            <div className="relative aspect-[16/11]">
              <Image src={gifts} alt="silk pillowcase, satin scrunchie and scalp massager in blush pink" fill placeholder="blur" sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-[50%_65%]" />
            </div>
            <div className="flex flex-1 flex-col p-7 md:p-9">
              <div className="flex flex-wrap items-center gap-3">
                <h3 id="plan-glow" className="text-[1.9rem] leading-none font-extrabold tracking-[-0.04em]">{glow.name}</h3>
                <span className="rounded-full bg-blush px-3 py-1 text-xs font-bold tracking-wide text-cocoa uppercase">{glow.badge}</span>
              </div>
              <p className="mt-2 opacity-80">{glow.tagline}</p>
              <div className="mt-5"><PlanPrice planId="glow-journey" /></div>
              <Includes id="glow-journey" />
              <AddToCart kind="plan" id="glow-journey" className="btn mt-auto bg-cream text-cocoa hover:bg-blush">{glow.cta}</AddToCart>
              <GuaranteeBadge className="mt-3 !text-cream/80" />
            </div>
          </article>
        </div>

        {/* The one-time options, as simpler rows. */}
        <h3 className="mt-14 text-xl font-extrabold tracking-[-0.03em]">or buy once, no subscription</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {([
            { id: "trial-kit", img: trialKit, alt: "velle trial kit: mini serum, shampoo and conditioner in a satin-lined box" },
            { id: "full-set", img: trio, alt: "full-size velle scalp serum, hydrating shampoo and nourishing conditioner" },
          ] as const).map(({ id, img, alt }) => {
            const plan = plans[id];
            return (
              <article key={id} className="flex gap-5 rounded-[2rem] bg-cream p-4 pr-6" aria-labelledby={`plan-${id}`}>
                <div className="relative size-28 shrink-0 overflow-hidden rounded-2xl md:size-32">
                  <Image src={img} alt={alt} fill placeholder="blur" sizes="128px" className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <h4 id={`plan-${id}`} className="text-xl font-extrabold tracking-[-0.03em]">{plan.name}</h4>
                  <p className="text-sm text-cocoa-soft">{plan.tagline}</p>
                  <div className="mt-2 [&>div>p:first-child]:!text-2xl"><PlanPrice planId={id} /></div>
                  <AddToCart kind="plan" id={id} className="mt-2 min-h-11 self-start text-[15px] font-semibold underline decoration-cocoa/40 underline-offset-4 hover:decoration-cocoa">
                    {plan.cta}
                  </AddToCart>
                </div>
              </article>
            );
          })}
        </div>
        <GuaranteeBadge className="mt-6" />
      </div>
    </section>
  );
}
