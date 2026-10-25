"use client";

import { useState } from "react";
import { plans } from "@/config/pricing";
import { quizPopup } from "@/config/promotions";
import { quizQuestions, recommend } from "@/content/quiz";
import { PlanPrice } from "@/components/Price";
import { GuaranteeBadge } from "@/components/GuaranteeBadge";
import { WelcomeSignupForm } from "@/components/WelcomeSignupForm";
import { useCart } from "@/lib/cart-context";

/**
 * The hair quiz: one question per screen, then a recommended plan and a
 * mystery gift to reveal. Used in the popup and on the /quiz page.
 */
export function QuizFlow({ onFinish }: { onFinish?: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState(false);
  const cart = useCart();

  const total = quizQuestions.length;

  if (step < total) {
    const q = quizQuestions[step];
    return (
      <div className="quiz-step">
        <div className="flex items-center justify-between text-sm font-semibold">
          <span>
            question {step + 1} of {total}
          </span>
          {step > 0 && (
            <button type="button" onClick={() => setStep(step - 1)} className="underline underline-offset-4">
              back
            </button>
          )}
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-cocoa/10" aria-hidden="true">
          <div className="h-full rounded-full bg-cocoa transition-[width] duration-300" style={{ width: `${(step / total) * 100}%` }} />
        </div>
        <fieldset className="mt-8">
          <legend className="text-[2rem] leading-[1] font-extrabold tracking-[-0.04em]">{q.question}</legend>
          <div className="mt-6 grid gap-3">
            {q.options.map((o) => (
              <button
                key={o.id}
                type="button"
                aria-pressed={answers[q.id] === o.id}
                onClick={() => {
                  setAnswers({ ...answers, [q.id]: o.id });
                  setStep(step + 1);
                }}
                className="min-h-14 rounded-2xl border border-cocoa/20 bg-cream px-5 text-left text-[16px] font-semibold transition-colors hover:border-cocoa hover:bg-blush aria-pressed:border-cocoa aria-pressed:bg-blush"
              >
                {o.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
    );
  }

  const { planId, note } = recommend(answers);
  const plan = plans[planId];

  return (
    <div className="quiz-result">
      <p className="text-sm font-semibold">your perfect match</p>
      <h2 className="mt-2 text-[2.2rem] leading-[0.95] font-extrabold tracking-[-0.045em]">{plan.name}</h2>
      <p className="mt-3">{note}</p>
      <div className="mt-5 rounded-2xl bg-cream p-5">
        <p className="text-cocoa-soft">{plan.tagline}</p>
        <div className="mt-2">
          <PlanPrice planId={planId} />
        </div>
        <button
          type="button"
          onClick={() => {
            onFinish?.();
            cart.add({ kind: "plan", id: planId });
          }}
          className="btn-primary mt-5 w-full"
        >
          {plan.cta}
        </button>
        <GuaranteeBadge className="mt-3" />
      </div>

      {/* The mystery gift: a dark tile that opens to show the prize, then an email field to claim it. */}
      <div className="mt-5 rounded-2xl bg-cocoa p-6 text-cream">
        {!revealed ? (
          <>
            <p className="text-sm font-semibold opacity-80">you finished the quiz, so...</p>
            <p className="mt-1 text-[1.6rem] leading-tight font-extrabold tracking-[-0.03em]">your mystery gift is waiting</p>
            <button type="button" onClick={() => setRevealed(true)} className="btn-light mt-5 w-full">
              reveal my gift
            </button>
          </>
        ) : (
          <div className="quiz-reveal">
            <p className="text-sm font-semibold opacity-80">surprise! it&apos;s</p>
            <p className="mt-1 text-[1.6rem] leading-tight font-extrabold tracking-[-0.03em]">{quizPopup.prize}</p>
            <p className="mt-2 mb-5 opacity-85">{quizPopup.prizeDetail}</p>
            <WelcomeSignupForm dark />
          </div>
        )}
      </div>
    </div>
  );
}
