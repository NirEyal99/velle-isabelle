import Image from "next/image";
import Link from "next/link";
import trialKit from "@/public/images/trial-kit.jpg";
import trio from "@/public/images/trio.jpg";
import gifts from "@/public/images/gifts.jpg";
import { plans, type PlanId } from "@/config/pricing";
import { PlanPrice } from "@/components/Price";
import { GuaranteeBadge } from "@/components/GuaranteeBadge";

/** Hand-drawn loop drawn around the "best value" note. */
function Circled({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block px-4 py-2 font-hand text-[1.7rem] leading-none ${className}`}>
      <svg viewBox="0 0 160 60" preserveAspectRatio="none" className="absolute inset-0 size-full" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <path d="M18 12C50 2 130 0 152 22c10 16-20 30-70 32S4 50 6 32C8 18 40 8 80 7" />
      </svg>
      {children}
    </span>
  );
}

function Includes({ id }: { id: PlanId }) {
  return (
    <ul className="mt-5 mb-8 space-y-1 text-[15px]">
      {plans[id].includes.map((item) => (
        <li key={item}>+ {item}</li>
      ))}
    </ul>
  );
}

export function Pricing() {
  const ritual = plans.ritual;
  const glow = plans["glow-journey"];

  return (
    <section id="pricing" className="scroll-mt-20 bg-oat" aria-labelledby="pricing-title">
      <div className="container-page py-20 md:py-28">
        <div className="md:flex md:items-end md:justify-between">
          <h2 id="pricing-title" className="heading-lg max-w-2xl">
            pick how you want to do it
          </h2>
          <p className="note mt-3 md:mt-0 md:mb-2 md:rotate-2">free shipping on every subscription</p>
        </div>

        {/* The two subscriptions, side by side and big. */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="flex flex-col overflow-hidden rounded-[2.25rem] bg-blush" aria-labelledby="plan-ritual">
            <div className="relative aspect-[16/11]">
              <Image src={trio} alt="full-size velle scalp serum, hydrating shampoo and nourishing conditioner" fill placeholder="blur" sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-[50%_60%]" />
              <p className="absolute top-5 left-6 -rotate-6 font-hand text-[1.6rem] text-cocoa">{ritual.badge} ♡</p>
            </div>
            <div className="flex flex-1 flex-col p-7 md:p-9">
              <h3 id="plan-ritual" className="text-[1.75rem] font-medium tracking-tight">{ritual.name}</h3>
              <p className="mt-1 text-cocoa-soft">{ritual.tagline}</p>
              <div className="mt-5"><PlanPrice planId="ritual" /></div>
              <Includes id="ritual" />
              <Link href="/shop#ritual" className="btn-primary mt-auto">{ritual.cta}</Link>
              <GuaranteeBadge className="mt-3" />
            </div>
          </article>

          <article className="relative flex flex-col overflow-hidden rounded-[2.25rem] bg-cocoa text-cream" aria-labelledby="plan-glow">
            <div className="relative aspect-[16/11]">
              <Image src={gifts} alt="silk pillowcase, satin scrunchie and scalp massager in blush pink" fill placeholder="blur" sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-[50%_65%]" />
              <div className="absolute top-5 right-6 -rotate-6 text-cocoa"><Circled>{glow.badge}!</Circled></div>
            </div>
            <div className="flex flex-1 flex-col p-7 md:p-9">
              <h3 id="plan-glow" className="text-[1.75rem] font-medium tracking-tight">{glow.name}</h3>
              <p className="mt-1 opacity-80">{glow.tagline}</p>
              <div className="mt-5"><PlanPrice planId="glow-journey" /></div>
              <Includes id="glow-journey" />
              <Link href="/shop#glow-journey" className="btn mt-auto bg-cream text-cocoa hover:bg-blush">{glow.cta}</Link>
              <GuaranteeBadge className="mt-3 !text-cream/80" />
            </div>
          </article>
        </div>

        {/* The one-time options, as simpler rows. */}
        <p className="note mt-14">or just once, no subscription:</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {([
            { id: "trial-kit", img: trialKit, alt: "velle trial kit: mini serum, shampoo and conditioner in a satin-lined box" },
            { id: "full-set", img: trio, alt: "full-size velle scalp serum, hydrating shampoo and nourishing conditioner" },
          ] as const).map(({ id, img, alt }) => {
            const plan = plans[id];
            return (
              <article key={id} className="flex gap-5 rounded-[1.75rem] bg-cream p-4 pr-6" aria-labelledby={`plan-${id}`}>
                <div className="relative size-28 shrink-0 overflow-hidden rounded-[1.25rem] md:size-32">
                  <Image src={img} alt={alt} fill placeholder="blur" sizes="128px" className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <h3 id={`plan-${id}`} className="text-xl font-medium">{plan.name}</h3>
                  <p className="text-sm text-cocoa-soft">{plan.tagline}</p>
                  <div className="mt-2 [&_p]:!text-2xl"><PlanPrice planId={id} /></div>
                  <Link href={`/shop#${id}`} className="mt-2 self-start text-[15px] font-medium underline decoration-cocoa/40 underline-offset-4 hover:decoration-cocoa">
                    {plan.cta} →
                  </Link>
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
