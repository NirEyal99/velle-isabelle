"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { products, type PlanId, type ProductId } from "@/config/pricing";
import { launch } from "@/config/promotions";
import { itemImages } from "@/content/images";
import { useCart } from "@/lib/cart-context";
import { formatMoney, toCents } from "@/lib/pricing";
import { GuaranteeBadge } from "@/components/GuaranteeBadge";

/** The cart, sliding in from the right. */
export function CartDrawer() {
  const { totals, isOpen, close, setQty, remove, add } = useCart();
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
  }, [isOpen]);

  const t = totals;
  const empty = t.lines.length === 0;

  return (
    <dialog
      ref={dialog}
      onClose={close}
      onClick={(e) => e.target === dialog.current && close()}
      aria-labelledby="cart-title"
      className="cart-drawer m-0 ml-auto h-dvh max-h-dvh w-full max-w-md bg-cream p-0 text-cocoa backdrop:bg-cocoa/50"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-cocoa/10 px-5 py-3">
          <h2 id="cart-title" className="text-xl font-extrabold tracking-[-0.03em]">
            your bag {t.itemCount > 0 && <span className="font-semibold">({t.itemCount})</span>}
          </h2>
          <button type="button" onClick={close} className="-mr-2 grid size-11 place-items-center rounded-full hover:bg-cocoa/10" aria-label="close bag">
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {empty ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <p className="text-2xl font-extrabold tracking-[-0.03em]">your bag is empty</p>
            <p className="mt-2 text-cocoa-soft">let&apos;s fix that.</p>
            <Link href="/shop" onClick={close} className="btn-primary mt-6">
              shop velle
            </Link>
            <Link href="/quiz" onClick={close} className="mt-3 text-[15px] underline underline-offset-4">
              or take the hair quiz
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 pb-6">
              {/* Free-gift progress */}
              <div className="mt-4 rounded-2xl bg-blush p-4" aria-live="polite">
                <p className="text-[15px] font-semibold">
                  {t.nextGift
                    ? `you're ${formatMoney(t.nextGift.awayCents)} away from a free ${t.nextGift.name.toLowerCase()}!`
                    : "you've unlocked every free gift ♡"}
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-cream" role="progressbar" aria-label="progress to your next free gift" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(t.giftProgress * 100)}>
                  <div className="h-full rounded-full bg-cocoa transition-[width] duration-500" style={{ width: `${t.giftProgress * 100}%` }} />
                </div>
                <p className="mt-2 text-[13px]">free satin scrunchie at $60 · free scalp massager at $100</p>
              </div>

              <ul className="mt-5 divide-y divide-cocoa/10">
                {t.lines.map((l) => {
                  const img = itemImages[l.id as ProductId | PlanId];
                  return (
                    <li key={l.key} className="flex gap-4 py-4">
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-oat">
                        <Image src={img.src} alt={img.alt} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-bold">{l.name}</p>
                          <p className="font-semibold tabular-nums">{formatMoney(l.lineCents)}</p>
                        </div>
                        {l.note && <p className="mt-0.5 text-[13px] text-cocoa-soft">{l.note}</p>}
                        <div className="mt-2 flex items-center gap-3">
                          {l.maxQty > 1 ? (
                            <div className="flex items-center rounded-full border border-cocoa/20">
                              <button type="button" onClick={() => setQty(l.key, l.qty - 1)} className="grid size-9 place-items-center rounded-full" aria-label={`one less ${l.name}`}>
                                −
                              </button>
                              <span className="w-6 text-center text-sm tabular-nums" aria-label={`quantity ${l.qty}`}>
                                {l.qty}
                              </span>
                              <button type="button" disabled={l.qty >= l.maxQty} onClick={() => setQty(l.key, l.qty + 1)} className="grid size-9 place-items-center rounded-full disabled:opacity-30" aria-label={`one more ${l.name}`}>
                                +
                              </button>
                            </div>
                          ) : null}
                          <button type="button" onClick={() => remove(l.key)} className="text-[13px] underline underline-offset-4">
                            remove
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
                {t.freeGifts.map((g) => (
                  <li key={g.id} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <p className="font-bold">{g.name}</p>
                      <p className="text-[13px] text-cocoa-soft">
                        {g.reason} · worth ${g.worth}
                      </p>
                    </div>
                    <p className="rounded-full bg-cocoa px-3 py-1 text-xs font-bold text-cream uppercase">free</p>
                  </li>
                ))}
              </ul>

              {t.suggestSerum && (
                <div className="mt-2 flex items-center gap-4 rounded-2xl bg-oat p-4">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                    <Image src={itemImages.serum.src} alt="" fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold">complete your ritual</p>
                    <p className="text-[13px] text-cocoa-soft">add the scalp serum for fuller-looking roots · {formatMoney(toCents(products.serum.price))}</p>
                  </div>
                  <button type="button" onClick={() => add({ kind: "product", id: "serum" })} className="btn-primary min-h-10 shrink-0 px-4 text-sm">
                    add
                  </button>
                </div>
              )}
            </div>

            <div className="border-t border-cocoa/10 bg-cream px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <dl className="space-y-1.5 text-[15px] tabular-nums">
                <div className="flex justify-between">
                  <dt>subtotal</dt>
                  <dd>{formatMoney(t.subtotalCents)}</dd>
                </div>
                {t.discountCents > 0 && (
                  <div className="flex justify-between font-semibold text-clay-ink">
                    <dt>launch week {launch.percentOff}% off</dt>
                    <dd>−{formatMoney(t.discountCents)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt>shipping</dt>
                  <dd>{t.shippingCents === 0 ? "free" : formatMoney(t.shippingCents)}</dd>
                </div>
                <div className="flex justify-between border-t border-cocoa/10 pt-2 text-lg font-extrabold">
                  <dt>{t.hasSubscription ? "due today" : "total"}</dt>
                  <dd>{formatMoney(t.totalCents)}</dd>
                </div>
              </dl>
              {t.shippingCents > 0 && <p className="mt-1 text-[13px] text-cocoa-soft">free shipping on orders $50+ and every subscription</p>}
              <Link href="/checkout" onClick={close} className="btn-primary mt-4 w-full">
                checkout
              </Link>
              <GuaranteeBadge className="mt-3" />
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
