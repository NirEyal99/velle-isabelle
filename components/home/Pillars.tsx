/**
 * The four things velle stands for. Cosmetic language only: "growth goals" is
 * about the customer growing her hair while velle cuts breakage so she keeps
 * the length. Never say the products make hair grow.
 */
const pillars = [
  {
    title: "elite hair health",
    body: "scalp-first care that keeps your scalp feeling clean, calm and balanced, and strands feeling strong from root to tip.",
    tile: "bg-cocoa text-cream",
  },
  {
    title: "texture & flow",
    body: "soft, smooth, touchable strands with real slip. hair that swings when you walk and falls right back into place.",
    tile: "bg-blush",
  },
  {
    title: "the look",
    body: "glossy, fuller-looking hair with visible shine from roots to ends.",
    tile: "bg-latte",
  },
  {
    title: "growth goals",
    body: "growing it out? velle keeps your scalp feeling its best and your strands conditioned, so less breaks off and you keep the length you grow.",
    tile: "bg-clay text-cocoa-deep",
  },
];

export function Pillars() {
  return (
    <section className="container-page py-20 md:py-28" aria-labelledby="pillars-title">
      <p className="label">the velle standard</p>
      <h2 id="pillars-title" className="heading-lg mt-3 max-w-3xl">
        elite hair, from the scalp up
      </h2>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p) => (
          <li key={p.title} className={`flex flex-col justify-between gap-10 rounded-[2rem] p-7 md:min-h-80 ${p.tile}`}>
            <h3 className="text-[2.1rem] leading-[0.95] font-extrabold tracking-[-0.045em]">{p.title}</h3>
            <p className="text-[16px] leading-relaxed">{p.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
