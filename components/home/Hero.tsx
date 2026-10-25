"use client";

import Image from "next/image";
import Link from "next/link";
import hero from "@/public/images/hero.jpg";
import { launch } from "@/config/promotions";
import { site } from "@/config/site";
import { useLaunch } from "@/lib/launch-context";
import { GuaranteeBadge } from "@/components/GuaranteeBadge";

export function Hero() {
  const { active } = useLaunch();

  return (
    // The background matches the photo's pink wall so the two blend together.
    <section className="relative overflow-hidden bg-[#EAB6A6]" aria-labelledby="hero-title">
      {/* Phones: photo on top. Larger screens: photo fills the right side, text sits in the empty space on the left. */}
      <div className="relative aspect-[1199/1100] w-full md:absolute md:inset-y-0 md:right-0 md:aspect-auto md:w-[62%] lg:w-[58%]">
        <Image
          src={hero}
          alt="smiling woman with a glossy brown bob holding a bottle of velle scalp serum"
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1024px) 58vw, (min-width: 768px) 62vw, 100vw"
          className="object-cover object-[50%_20%]"
        />
        <div className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-[#EAB6A6] to-transparent md:block" />
      </div>

      <div className="container-page relative flex md:min-h-[min(82vh,760px)] md:items-center">
        <div className="max-w-md py-10 md:py-20">
          {active && <p className="eyebrow !text-cocoa">{launch.bannerText}</p>}
          <h1 id="hero-title" className="heading-xl mt-3">
            {site.tagline}
          </h1>
          <p className="mt-5 text-lg leading-relaxed">
            a 3-step scalp-first ritual for a healthier-feeling scalp, fuller-looking hair and visible shine.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/shop" className="btn-primary">
              shop the ritual
            </Link>
            <Link href="/quiz" className="btn-outline">
              take the hair quiz
            </Link>
          </div>
          <GuaranteeBadge className="mt-4 !justify-start !text-cocoa" />
        </div>
      </div>
    </section>
  );
}
