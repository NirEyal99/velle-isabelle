import type { Metadata } from "next";
import { site } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = { title: "contact", description: "questions about your order, your ritual or your hair? message velle, a real person answers." };

export default function ContactPage() {
  return (
    <section className="container-page grid gap-10 py-12 md:grid-cols-[1fr_1.2fr] md:gap-16 md:py-20" aria-labelledby="contact-title">
      <div>
        <h1 id="contact-title" className="heading-lg">
          say hi
        </h1>
        <p className="mt-4 max-w-sm text-[17px] text-cocoa-soft">questions about your order, your ritual or your hair? a real person reads every message.</p>
        <p className="mt-6 text-[15px]">
          or email us: <span className="font-semibold select-all">{site.email}</span>
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
