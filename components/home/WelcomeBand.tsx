import { welcomeGift } from "@/config/promotions";
import { WelcomeSignupForm } from "@/components/WelcomeSignupForm";

export function WelcomeBand() {
  return (
    <section className="bg-cocoa text-cream" aria-labelledby="welcome-title">
      <div className="container-page grid items-center gap-6 py-12 md:grid-cols-2 md:gap-16 md:py-14">
        <div>
          <h2 id="welcome-title" className="text-[2rem] leading-none font-extrabold tracking-[-0.04em] md:text-[2.5rem]">
            {welcomeGift.headline}
          </h2>
          <p className="mt-3 max-w-sm opacity-85">{welcomeGift.body}</p>
        </div>
        <WelcomeSignupForm dark />
      </div>
    </section>
  );
}
