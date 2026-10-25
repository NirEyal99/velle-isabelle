import Image from "next/image";
import Link from "next/link";
import trio from "@/public/images/trio.jpg";

export function QuizCta() {
  return (
    <section className="bg-cocoa text-cream" aria-labelledby="quiz-title">
      <div className="container-page grid items-center gap-10 py-20 md:grid-cols-2 md:gap-16 md:py-24">
        <div>
          <h2 id="quiz-title" className="heading-lg">
            not sure where to start?
          </h2>
          <p className="mt-4 max-w-sm text-[17px] opacity-85">five quick questions and we&apos;ll point you to the right ritual.</p>
          <Link href="/quiz" className="btn-light mt-8">
            take the hair quiz
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-blush">
          <Image src={trio} alt="velle scalp serum, hydrating shampoo and nourishing conditioner" fill placeholder="blur" sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-[50%_46%]" />
        </div>
      </div>
    </section>
  );
}
