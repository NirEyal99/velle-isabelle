import Link from "next/link";

export function QuizCta() {
  return (
    <section className="container-page pb-16 md:pb-24" aria-labelledby="quiz-title">
      <div className="rounded-3xl bg-blush px-6 py-12 text-center md:py-16">
        <p className="eyebrow !text-cocoa">60-second hair quiz</p>
        <h2 id="quiz-title" className="heading-lg mx-auto mt-3 max-w-lg">
          not sure where to start?
        </h2>
        <p className="mx-auto mt-3 max-w-md">
          answer 5 quick questions and we'll match you with the right ritual for your hair.
        </p>
        <Link href="/quiz" className="btn-primary mt-7">
          take the quiz
        </Link>
      </div>
    </section>
  );
}
