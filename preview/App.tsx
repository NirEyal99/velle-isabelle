"use client";

import { Component, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { products, type ProductId } from "@/config/pricing";
import { LaunchProvider } from "@/lib/launch-context";
import { isLaunchActive } from "@/lib/pricing";
import { CartProvider } from "@/lib/cart-context";
import { CountdownBanner } from "@/components/CountdownBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuizPopup } from "@/components/quiz/QuizPopup";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ProductView } from "@/components/shop/ProductView";
import HomePage from "@/app/page";
import ShopPage from "@/app/shop/page";
import QuizPage from "@/app/quiz/page";
import CheckoutPage from "@/app/checkout/page";
import OrderConfirmedPage from "@/app/checkout/success/page";
import AccountPage from "@/app/account/page";
import FaqPage from "@/app/faq/page";
import ContactPage from "@/app/contact/page";
import ShippingReturnsPage from "@/app/shipping-returns/page";
import PrivacyPage from "@/app/privacy/page";
import TermsPage from "@/app/terms/page";
import { RouterProvider, useRouterState } from "./router";

/**
 * The whole site as one page, for the live preview link. It uses the real
 * site's pages and components (same layout as app/layout.tsx); only links,
 * images and page switching are swapped for preview stand-ins.
 */
const pages: Record<string, () => React.ReactNode> = {
  "/": () => <HomePage />,
  "/shop": () => <ShopPage />,
  "/quiz": () => <QuizPage />,
  "/checkout": () => <CheckoutPage />,
  "/checkout/success": () => <OrderConfirmedPage />,
  "/account": () => <AccountPage />,
  "/faq": () => <FaqPage />,
  "/contact": () => <ContactPage />,
  "/shipping-returns": () => <ShippingReturnsPage />,
  "/privacy": () => <PrivacyPage />,
  "/terms": () => <TermsPage />,
};

function CurrentPage() {
  const { path } = useRouterState().location;
  if (path.startsWith("/products/")) {
    const id = path.slice("/products/".length);
    if (id in products) return <ProductView id={id as ProductId} />;
  }
  const render = pages[path] ?? pages["/"];
  return <>{render()}</>;
}

/** If a page ever crashes, show a friendly message instead of a blank screen. */
class SafePage extends Component<{ children: React.ReactNode; path: string }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidUpdate(prev: { path: string }) {
    if (prev.path !== this.props.path && this.state.failed) this.setState({ failed: false });
  }
  render() {
    return this.state.failed ? <p className="container-page py-24 text-center">something went wrong on this page. try another page from the menu.</p> : this.props.children;
  }
}

function Shell() {
  const { path } = useRouterState().location;
  return (
    <LaunchProvider initialActive={isLaunchActive(Date.now())}>
      <CartProvider>
        <CountdownBanner />
        <Header />
        <main id="main" className="flex-1">
          <SafePage path={path}>
            <Suspense fallback={null}>
              <CurrentPage />
            </Suspense>
          </SafePage>
        </main>
        <Footer />
        <QuizPopup />
        <CartDrawer />
      </CartProvider>
    </LaunchProvider>
  );
}

createRoot(document.getElementById("velle-root")!).render(
  <RouterProvider>
    <Shell />
  </RouterProvider>,
);
