"use client";

import Image from "next/image";
import Link from "next/link";
import hero from "@/public/images/hero.jpg";
import { useLaunch } from "@/lib/launch-context";
import { GuaranteeBadge } from "@/components/GuaranteeBadge";

/** Hand-drawn curvy arrow used next to handwritten notes. */
export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 50" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M3 8c14-6 30-4 40 8s14 24 30 26" />
      <path d="M64 35l9 7-10 4" />
    </svg>
  );
}

export function Hero() {
  const { active } = useLaunch();

  return (
    // The background matches the photo's pink wall so the two blend together.
    <section className="relative overflow-hidden bg-[#EAB6A6]" aria-labelledby="hero-title">
      {/* Phones: photo on top. Larger screens: photo fills the right side, text sits in the empty space on the left. */}
      <div className="relative aspect-[1199/1150] w-full md:absolute md:inset-y-0 md:right-0 md:aspect-auto md:w-[64%] lg:w-[60%]">
        <Image
          src={hero}
          alt="smiling woman with a glossy brown bob holding a bottle of velle scalp serum"
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1024px) 60vw, (min-width: 768px) 64vw, 100vw"
          className="object-cover object-[50%_20%]"
        />
        <div className="absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-[#EAB6A6] to-transparent md:block" />
        {/* Handwritten note pointing at the bottle. */}
        <p className="absolute top-[62%] left-[5%] flex -rotate-6 items-start gap-1 font-hand text-[1.35rem] leading-tight text-cocoa md:top-[66%] md:left-[18%] md:text-[1.7rem]">
          <span>
            the serum
            <br />
            everyone&apos;s asking about
          </span>
          <Squiggle className="mt-6 h-9 w-14 shrink-0 md:h-11 md:w-16" />
        </p>
      </div>

      <div className="container-page relative flex md:min-h-[min(84vh,780px)] md:items-center">
        <div className="max-w-[34rem] pt-8 pb-12 md:py-20">
          {active && (
            <p className="note mb-4 inline-block -rotate-2 !text-cocoa">
              launch week, everything&apos;s 25% off ✿
            </p>
          )}
          <h1 id="hero-title" className="heading-xl">
            hair you <br className="hidden md:block" />
            can&apos;t stop <br className="hidden md:block" />
            touching.
          </h1>
          <p className="mt-6 max-w-[26rem] text-[17px] leading-relaxed">
            it starts at your scalp with a cooling, minty serum and ends with soft, glossy hair you&apos;ll keep running your hands through.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/shop" className="btn-primary px-9">
              shop velle
            </Link>
            <Link href="/quiz" className="group inline-flex min-h-12 items-center justify-center gap-1.5 text-[15px] font-medium underline decoration-cocoa/40 underline-offset-[6px] hover:decoration-cocoa">
              or take the 60-sec hair quiz
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <GuaranteeBadge className="mt-6 !justify-start !text-cocoa" />
        </div>
      </div>
    </section>
  );
}
