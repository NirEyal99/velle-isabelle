"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { quizPopup } from "@/config/promotions";
import { getWelcomeSignup } from "@/lib/welcome";
import { QuizFlow } from "@/components/quiz/QuizFlow";

const SEEN_KEY = "velle:quiz-popup";

function alreadySeen() {
  try {
    return localStorage.getItem(SEEN_KEY) !== null || getWelcomeSignup() !== null;
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    localStorage.setItem(SEEN_KEY, new Date().toISOString());
  } catch {
    // Storage blocked: the popup may show again next visit, which is harmless.
  }
}

/**
 * Hair-quiz popup. Opens once per visitor: after a few seconds, or when the
 * mouse heads for the top of the window to leave (desktop). Never on /quiz,
 * and never for someone who already claimed the welcome gift.
 */
export function QuizPopup() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Not on the quiz page itself, and never interrupt checkout or the account pages.
    const quiet = pathname === "/quiz" || pathname.startsWith("/checkout") || pathname.startsWith("/account");
    if (quiet || alreadySeen()) return;

    const open = () => {
      if (alreadySeen() || !dialog.current || dialog.current.open) return;
      markSeen();
      dialog.current.showModal();
      cleanup();
    };
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) open();
    };
    const timer = window.setTimeout(open, quizPopup.delaySeconds * 1000);
    document.addEventListener("mouseout", onLeave);
    const cleanup = () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onLeave);
    };
    return cleanup;
  }, [pathname]);

  const close = () => dialog.current?.close();

  return (
    <dialog
      ref={dialog}
      aria-labelledby="quiz-popup-title"
      onClick={(e) => e.target === dialog.current && close()}
      className="quiz-popup m-auto w-[calc(100%-2rem)] max-w-lg rounded-[2rem] bg-oat p-0 text-cocoa backdrop:bg-cocoa/60"
    >
      {/* autoFocus here so the popup opens focused on its content, not with a focus ring on the close button. */}
      <div autoFocus tabIndex={-1} className="max-h-[88dvh] overflow-y-auto p-6 pt-5 outline-none md:p-8">
        <div className="flex justify-end">
          <button type="button" onClick={close} className="-mr-2 grid size-11 place-items-center rounded-full hover:bg-cocoa/10" aria-label="close">
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        {!started ? (
          <div className="quiz-intro pb-2">
            <h2 id="quiz-popup-title" className="text-[2.4rem] leading-[0.95] font-extrabold tracking-[-0.045em]">
              {quizPopup.headline}
            </h2>
            <p className="mt-4 text-[17px]">{quizPopup.body}</p>
            <button type="button" onClick={() => setStarted(true)} className="btn-primary mt-7 w-full">
              start the quiz
            </button>
            <button type="button" onClick={close} className="mt-3 min-h-11 w-full text-[15px] underline underline-offset-4">
              no thanks
            </button>
          </div>
        ) : (
          <>
            <h2 id="quiz-popup-title" className="sr-only">
              hair quiz
            </h2>
            <QuizFlow onFinish={close} />
          </>
        )}
      </div>
    </dialog>
  );
}
