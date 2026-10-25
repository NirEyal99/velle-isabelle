import { welcomeGift } from "@/config/promotions";
import { Drop } from "@/components/Logo";
import { WelcomeSignupForm } from "@/components/WelcomeSignupForm";

export function WelcomeBand() {
  return (
    <section className="bg-blush" aria-labelledby="welcome-title">
      <div className="container-page grid items-center gap-6 py-10 md:grid-cols-[1fr_1.1fr] md:gap-12 md:py-12">
        <div>
          <h2 id="welcome-title" className="flex items-center gap-2 text-2xl font-medium md:text-3xl">
            {welcomeGift.headline}
            <Drop className="h-5 w-auto" />
          </h2>
          <p className="mt-2 text-cocoa">{welcomeGift.body}</p>
        </div>
        <WelcomeSignupForm />
      </div>
    </section>
  );
}
