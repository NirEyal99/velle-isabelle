import Image from "next/image";
import Link from "next/link";
import trialKit from "@/public/images/trial-kit.jpg";

export function QuizCta() {
  return (
    <section className="container-page pb-20 md:pb-28" aria-labelledby="quiz-title">
      <div className="relative overflow-hidden rounded-[2.5rem_2.5rem_2.5rem_8rem] bg-blush md:grid md:grid-cols-[1.3fr_1fr] md:items-center">
        <div className="px-7 py-12 md:px-14 md:py-16">
          <p className="note">takes about a minute</p>
          <h2 id="quiz-title" className="heading-lg mt-2">
            can&apos;t decide? fair.
          </h2>
          <p className="mt-4 max-w-sm text-[17px]">
            answer five quick questions about your hair and we&apos;ll tell you where to start.
          </p>
          <Link href="/quiz" className="btn-primary mt-8">
            take the hair quiz
          </Link>
        </div>
        <div className="relative hidden h-full min-h-80 md:block">
          <Image src={trialKit} alt="" fill sizes="40vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
