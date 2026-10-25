"use client";

import Image from "next/image";
import Link from "next/link";
import hero from "@/public/images/hero.jpg";
import { useLaunch } from "@/lib/launch-context";
import { GuaranteeBadge } from "@/components/GuaranteeBadge";

export function Hero() {
  const { active } = useLaunch();

  return (
    // The background matches the photo's pink wall so the two blend together.
    <section className="relative overflow-hidden bg-[#EDB6A9]" aria-labelledby="hero-title">
      {/* Phones: photo on top. Larger screens: photo fills the right side, text sits in the empty space on the left. */}
      <div className="relative aspect-[1199/1150] w-full md:absolute md:inset-y-0 md:right-0 md:aspect-auto md:w-[64%] lg:w-[60%]">
        <Image
          src={hero}
          alt="smiling woman with long, glossy brown waves holding a bottle of velle scalp serum"
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1024px) 60vw, (min-width: 768px) 64vw, 100vw"
          className="object-cover object-[50%_20%]"
        />
        <div className="absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-[#EDB6A9] to-transparent md:block" />
      </div>

      <div className="container-page relative flex md:min-h-[min(84vh,780px)] md:items-center">
        <div className="max-w-[34rem] pt-8 pb-12 md:py-20">
          {active && <p className="mb-5 inline-block rounded-full bg-cocoa px-4 py-1.5 text-sm font-semibold text-cream">launch week · 25% off everything</p>}
          <h1 id="hero-title" className="heading-xl">
            hair you <br className="hidden md:block" />
            can&apos;t stop <br className="hidden md:block" />
            touching.
          </h1>
          <p className="mt-6 max-w-[25rem] text-[17px] leading-relaxed">
            a cooling scalp serum, a gentle shampoo and a silky conditioner. soft, shiny hair in about five minutes a day.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/shop" className="btn-primary px-9">
              shop velle
            </Link>
            <Link href="/quiz" className="inline-flex min-h-12 items-center justify-center text-[15px] underline decoration-cocoa/40 underline-offset-[6px] hover:decoration-cocoa">
              or take the hair quiz
            </Link>
          </div>
          <GuaranteeBadge className="mt-6 !justify-start !text-cocoa" />
        </div>
      </div>
    </section>
  );
}
