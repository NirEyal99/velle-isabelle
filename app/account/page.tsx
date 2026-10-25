import type { Metadata } from "next";
import { AccountView } from "@/components/account/AccountView";

export const metadata: Metadata = { title: "my account", robots: { index: false } };

export default function AccountPage() {
  return (
    <section className="container-page py-10 md:py-16">
      <AccountView />
    </section>
  );
}
