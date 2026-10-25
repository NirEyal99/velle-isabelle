import type { PlanId } from "@/config/pricing";

/**
 * The hair quiz. Edit questions and answers freely.
 * - The "goal" answer picks the personal note shown with the result.
 * - The "commitment" answer picks which plan is recommended.
 */
export type QuizOption = { id: string; label: string; note?: string; plan?: PlanId };
export type QuizQuestion = { id: string; question: string; options: QuizOption[] };

export const quizQuestions: QuizQuestion[] = [
  {
    id: "goal",
    question: "what's your #1 hair goal right now?",
    options: [
      { id: "length", label: "growing it out, longer lengths", note: "you're growing it out, so the serum and conditioner team up to cut breakage and help you keep every inch." },
      { id: "volume", label: "fuller-looking roots", note: "for fuller-looking roots, the scalp serum is your hero. massage it in daily for lift you can see." },
      { id: "shine", label: "shine and softness", note: "for glossy, soft hair, the rice water shampoo and argan conditioner do the heavy lifting." },
      { id: "flow", label: "less frizz, more flow", note: "for less frizz and more flow, the conditioner's slip smooths every strand so it moves the way you want." },
    ],
  },
  {
    id: "scalp",
    question: "how does your scalp usually feel?",
    options: [
      { id: "oily", label: "oily by day 2" },
      { id: "dry", label: "dry or tight" },
      { id: "sensitive", label: "a bit sensitive" },
      { id: "balanced", label: "pretty balanced" },
    ],
  },
  {
    id: "texture",
    question: "how would you describe your hair?",
    options: [
      { id: "straight", label: "straight" },
      { id: "wavy", label: "wavy" },
      { id: "curly", label: "curly" },
      { id: "coily", label: "coily" },
    ],
  },
  {
    id: "wash",
    question: "how often do you wash it?",
    options: [
      { id: "daily", label: "every day" },
      { id: "few", label: "every 2–3 days" },
      { id: "weekly", label: "about once a week" },
    ],
  },
  {
    id: "commitment",
    question: "how ready are you?",
    options: [
      { id: "try", label: "i want to try it first", plan: "trial-kit" },
      { id: "monthly", label: "ready for a monthly ritual", plan: "ritual" },
      { id: "all-in", label: "all in for my best hair ever", plan: "glow-journey" },
    ],
  },
];

/** Turns the answers (question id → option id) into a recommended plan and a personal note. */
export function recommend(answers: Record<string, string>): { planId: PlanId; note: string } {
  const pick = (qid: string) => quizQuestions.find((q) => q.id === qid)?.options.find((o) => o.id === answers[qid]);
  return {
    planId: pick("commitment")?.plan ?? "ritual",
    note: pick("goal")?.note ?? "",
  };
}
