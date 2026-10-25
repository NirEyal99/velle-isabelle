import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { LaunchProvider } from "@/lib/launch-context";
import { isLaunchActive } from "@/lib/pricing";
import { CountdownBanner } from "@/components/CountdownBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuizPopup } from "@/components/quiz/QuizPopup";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

// Pages are rebuilt at most once a minute, so the launch sale switches off on
// schedule even for visitors whose browser hasn't loaded yet.
export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `velle | ${site.tagline}`, template: "%s | velle" },
  description: site.description,
  openGraph: { siteName: "velle", type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#F7F2EC" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={figtree.variable}>
      <body className="flex min-h-dvh flex-col font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-cocoa focus:px-4 focus:py-2 focus:text-cream">
          skip to content
        </a>
        <LaunchProvider initialActive={isLaunchActive(Date.now())}>
          <CountdownBanner />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <QuizPopup />
        </LaunchProvider>
      </body>
    </html>
  );
}
