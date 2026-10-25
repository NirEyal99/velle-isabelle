import Link from "next/link";

export function QuizCta() {
  return (
    <section className="bg-blush" aria-labelledby="quiz-title">
      <div className="container-page py-20 text-center md:py-24">
        <h2 id="quiz-title" className="heading-lg">
          not sure where to start?
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-[17px]">five quick questions and we&apos;ll point you to the right ritual.</p>
        <Link href="/quiz" className="btn-primary mt-8">
          take the hair quiz
        </Link>
      </div>
    </section>
  );
}
