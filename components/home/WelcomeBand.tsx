import { welcomeGift } from "@/config/promotions";
import { WelcomeSignupForm } from "@/components/WelcomeSignupForm";

export function WelcomeBand() {
  return (
    <section className="bg-blush" aria-labelledby="welcome-title">
      <div className="container-page grid items-center gap-6 py-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 id="welcome-title" className="text-[1.75rem] leading-tight font-medium tracking-tight">
            {welcomeGift.headline}
          </h2>
          <p className="mt-2 max-w-sm">{welcomeGift.body}</p>
        </div>
        <WelcomeSignupForm />
      </div>
    </section>
  );
}
