import Link from "next/link";
import { Logo } from "@/components/Logo";
import { site } from "@/config/site";

const columns = [
  {
    title: "shop",
    links: [
      { href: "/shop", label: "all products" },
      { href: "/products/serum", label: "scalp serum" },
      { href: "/products/shampoo", label: "hydrating shampoo" },
      { href: "/products/conditioner", label: "nourishing conditioner" },
      { href: "/quiz", label: "hair quiz" },
    ],
  },
  {
    title: "help",
    links: [
      { href: "/faq", label: "faq" },
      { href: "/contact", label: "contact" },
      { href: "/shipping-returns", label: "shipping & returns" },
      { href: "/account", label: "my account" },
    ],
  },
  {
    title: "legal",
    links: [
      { href: "/privacy", label: "privacy policy" },
      { href: "/terms", label: "terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-cocoa text-cream">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <p className="max-w-xs text-lg">{site.tagline}</p>
          <p className="mt-6 text-sm opacity-75">
            vegan · cruelty-free · no sulfates, parabens or silicones
          </p>
          <ul className="mt-6 flex gap-4 text-sm">
            <li>
              <a href={site.instagram} className="underline underline-offset-4">instagram</a>
            </li>
            <li>
              <a href={site.tiktok} className="underline underline-offset-4">tiktok</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="underline underline-offset-4">{site.email}</a>
            </li>
          </ul>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="label">{col.title}</h2>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="opacity-85 hover:opacity-100">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      {/* Big wordmark across the bottom of the page. */}
      <div className="container-page relative overflow-hidden pt-4" aria-hidden="true">
        <Logo className="text-[27vw] leading-[0.8] !text-cream md:text-[17rem]" />
      </div>
      <div className="border-t border-cream/15">
        <p className="container-page py-5 text-xs opacity-70">
          © {new Date().getFullYear()} velle. demo store: no real orders are placed and no payments are taken.
        </p>
      </div>
    </footer>
  );
}
