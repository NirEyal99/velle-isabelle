import { Drop } from "@/components/Logo";

const words = ["rosemary", "peppermint", "rice water", "aloe vera", "argan oil", "no sulfates", "vegan", "cruelty-free", "no silicones"];

/** Slowly scrolling strip of ingredients. Stays still for people who prefer reduced motion. */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <li key={w} className="flex items-center gap-6 pr-6 text-lg whitespace-nowrap md:text-xl">
          {w}
          <Drop className="h-3.5 w-auto" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-y border-cocoa/10 bg-cream py-3.5">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
