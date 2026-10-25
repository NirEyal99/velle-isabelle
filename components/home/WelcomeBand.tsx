import Image from "next/image";
import serum from "@/public/images/serum.jpg";
import { welcomeGift } from "@/config/promotions";
import { WelcomeSignupForm } from "@/components/WelcomeSignupForm";

export function WelcomeBand() {
  return (
    <section className="relative bg-blush" aria-labelledby="welcome-title">
      <div className="container-page grid items-center gap-8 py-12 md:grid-cols-[auto_1fr_1.1fr] md:gap-12 md:py-14">
        {/* A tilted little "gift" photo of the serum. */}
        <div className="relative mx-auto hidden size-36 rotate-[-8deg] overflow-hidden rounded-[46%_54%_52%_48%/55%_48%_52%_45%] shadow-[0_10px_30px_-12px_rgba(59,43,36,0.4)] md:block">
          <Image src={serum} alt="" fill sizes="144px" className="object-cover object-[50%_45%] scale-125" />
        </div>
        <div>
          <p className="note">psst...</p>
          <h2 id="welcome-title" className="mt-1 text-[1.75rem] leading-tight font-medium tracking-tight md:text-[2rem]">
            {welcomeGift.headline}
          </h2>
          <p className="mt-2 max-w-sm">{welcomeGift.body}</p>
        </div>
        <WelcomeSignupForm />
      </div>
    </section>
  );
}
