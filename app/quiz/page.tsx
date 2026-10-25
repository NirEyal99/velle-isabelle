import type { Metadata } from "next";
import { quizPopup } from "@/config/promotions";
import { QuizFlow } from "@/components/quiz/QuizFlow";

export const metadata: Metadata = {
  title: "hair quiz",
  description: "take the free 60-second velle hair quiz to find your perfect ritual, with a mystery gift at the end.",
};

export default function QuizPage() {
  return (
    <section className="bg-blush" aria-labelledby="quiz-page-title">
      <div className="container-page grid gap-10 py-16 md:grid-cols-[1fr_1.1fr] md:gap-16 md:py-24">
        <div>
          <p className="label">free hair quiz</p>
          <h1 id="quiz-page-title" className="heading-lg mt-3">
            find your perfect ritual
          </h1>
          <p className="mt-4 max-w-sm text-[17px]">{quizPopup.body}</p>
        </div>
        <div className="rounded-[2rem] bg-oat p-6 md:p-8">
          <QuizFlow />
        </div>
      </div>
    </section>
  );
}
