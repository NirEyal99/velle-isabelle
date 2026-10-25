import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { WelcomeBand } from "@/components/home/WelcomeBand";
import { Ritual } from "@/components/home/Ritual";
import { GlowJourney } from "@/components/home/GlowJourney";
import { Ingredients } from "@/components/home/Ingredients";
import { Pricing } from "@/components/home/Pricing";
import { Results } from "@/components/home/Results";
import { QuizCta } from "@/components/home/QuizCta";
import { FaqList } from "@/components/FaqList";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WelcomeBand />
      <Ritual />
      <GlowJourney />
      <Ingredients />
      <Pricing />
      <Results />
      <QuizCta />
      <section className="border-t border-latte/50" aria-labelledby="faq-title">
        <div className="container-page grid gap-8 py-16 md:grid-cols-[1fr_1.6fr] md:gap-16 md:py-24">
          <div>
            <p className="label">faq</p>
            <h2 id="faq-title" className="heading-lg mt-3">
              you asked
            </h2>
            <p className="mt-4 max-w-xs text-cocoa-soft">and if it&apos;s not here, just message us. a real person answers.</p>
            <Link href="/faq" className="mt-6 inline-block underline underline-offset-4">
              see all faqs
            </Link>
          </div>
          <FaqList limit={5} />
        </div>
      </section>
    </>
  );
}
