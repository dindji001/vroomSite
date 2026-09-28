"use client";

import * as React from "react";
import { X, ShoppingBag, Heart, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUIStore } from "@/store/ui-store";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { formatCurrency } from "@/helpers/format";
import type { ID } from "@/types";

type DrawerKind = "cart" | "wishlist" | "filters";

function Overlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      aria-hidden={!open}
      onClick={onClose}
      className={cn(
        "fixed inset-0 z-[130] bg-black/50 backdrop-blur-sm transition-opacity duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    />
  );
}

function DrawerPanel({
  open,
  side = "right",
  children,
  onClose,
  title,
  icon: Icon,
  count,
}: {
  open: boolean;
  side?: "left" | "right";
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
}) {
  return (
    <aside
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className={cn(
        "fixed top-0 z-[140] h-full w-full max-w-md bg-background border-border/60 shadow-2xl flex flex-col transition-transform duration-500 ease-[var(--ease-premium)]",
        side === "right" ? "right-0 border-l" : "left-0 border-r",
        open
          ? "translate-x-0"
          : side === "right"
          ? "translate-x-full"
          : "-translate-x-full"
      )}
    >
      <header className="flex items-center gap-3 px-5 md:px-6 h-16 md:h-[72px] border-b border-border/40">
        <div className="size-10 rounded-2xl bg-[#253E38]/8 dark:bg-[#A7CD0F]/12 flex items-center justify-center shrink-0">
          <Icon className="size-5 text-[#253E38] dark:text-[#A7CD0F]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-heading font-bold text-lg leading-tight">{title}</h2>
            {typeof count === "number" && (
              <Badge variant="secondary" size="sm">
                {count}
              </Badge>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Fermer"
          onClick={onClose}
          className="shrink-0"
        >
          <X className="size-5" />
        </Button>
      </header>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </aside>
  );
}

function CartDrawerContent({ onClose }: { onClose: () => void }) {
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.removeItem);
  const updateQty = useCartStore((s) => s.updateQuantity);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center h-full">
        <div className="size-20 rounded-3xl bg-muted flex items-center justify-center mb-5">
          <ShoppingBag className="size-9 text-muted-foreground/60" />
        </div>
        <h3 className="font-heading font-bold text-xl mb-2">Votre panier est vide</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-xs">
          Découvrez nos véhicules d&apos;exception et nos accessoires premium.
        </p>
        <Link href="/vehicles" onClick={onClose}>
          <Button variant="primary">Explorer les véhicules</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-5 md:p-6 space-y-4">
        {items.map((it) => (
          <div
            key={it.id}
            className="flex gap-4 rounded-2xl border border-border/60 bg-card p-3 md:p-4"
          >
            <div className="size-20 md:size-24 rounded-2xl bg-muted shrink-0 overflow-hidden" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-heading font-semibold text-sm md:text-base truncate">
                    {it.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {it.kind === "vehicle" ? "Véhicule" : "Produit"}
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Retirer"
                  onClick={() => remove(it.id)}
                  className="shrink-0 size-8 rounded-xl hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="inline-flex items-center rounded-xl border border-border/60 h-9">
                  <button
                    type="button"
                    className="size-9 flex items-center justify-center text-muted-foreground hover:text-foreground"
                    onClick={() => updateQty(it.id, Math.max(1, it.quantity - 1))}
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-semibold text-sm">{it.quantity}</span>
                  <button
                    type="button"
                    className="size-9 flex items-center justify-center text-muted-foreground hover:text-foreground"
                    onClick={() => updateQty(it.id, it.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="font-heading font-bold text-[#253E38] dark:text-[#A7CD0F]">
                  {formatCurrency(it.unitPrice.amount * it.quantity, it.unitPrice.currency as any)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <footer className="border-t border-border/40 p-5 md:p-6 space-y-4 bg-card/50">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Sous-total</span>
          <span className="font-heading font-bold text-xl">
            {items.length > 0 ? formatCurrency(items.reduce((sum, item) => sum + item.unitPrice.amount * item.quantity, 0), items[0].unitPrice.currency as any) : "0 FCFA"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <Link href="/cart" onClick={onClose}>
            <Button variant="outline" className="w-full">Voir le panier</Button>
          </Link>
          <Link href="/checkout" onClick={onClose}>
            <Button variant="primary" className="w-full">Paiement</Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}

function WishlistDrawerContent({ onClose }: { onClose: () => void }) {
  const getActiveList = useWishlistStore((s) => s.getActiveList);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const activeList = getActiveList();
  const items = activeList?.items ?? [];
  const activeListId = activeList?.id;
  
  const remove = (itemId: ID) => {
    if (activeListId) {
      removeItem(activeListId, itemId);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center h-full">
        <div className="size-20 rounded-3xl bg-muted flex items-center justify-center mb-5">
          <Heart className="size-9 text-muted-foreground/60" />
        </div>
        <h3 className="font-heading font-bold text-xl mb-2">Aucun favori pour le moment</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-xs">
          Ajoutez des véhicules ou produits à votre liste pour les retrouver facilement.
        </p>
        <Link href="/vehicles" onClick={onClose}>
          <Button variant="primary">Découvrir nos véhicules</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-6 space-y-3">
      {items.map((it: any) => (
        <div
          key={it.id}
          className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-3 md:p-4"
        >
          <div className="size-16 md:size-20 rounded-2xl bg-muted shrink-0 overflow-hidden" />
          <div className="flex-1 min-w-0">
            <div className="font-heading font-semibold text-sm md:text-base truncate">
              {it.name ?? it.title ?? "Élément"}
            </div>
            {it.unitPrice && (
              <div className="mt-1 font-heading font-bold text-sm text-[#253E38] dark:text-[#A7CD0F]">
                {formatCurrency(it.unitPrice.amount, it.unitPrice.currency as any)}
              </div>
            )}
          </div>
          <button
            type="button"
            aria-label="Retirer des favoris"
            onClick={() => remove(it.id)}
            className="shrink-0 size-8 rounded-xl hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
      ))}
      <div className="pt-3">
        <Link href="/wishlist" onClick={onClose}>
          <Button variant="outline" className="w-full">Voir toute la liste</Button>
        </Link>
      </div>
    </div>
  );
}

function FiltersDrawerContent() {
  return (
    <div className="p-5 md:p-6 space-y-6">
      <div className="rounded-2xl border border-border/60 bg-card p-4">
        <h3 className="font-heading font-bold mb-3">Filtres</h3>
        <p className="text-sm text-muted-foreground">
          Personnalisez votre recherche à l&apos;aide des filtres disponibles.
        </p>
      </div>
      <div className="space-y-2">
        {["Catégorie", "Prix", "Marque", "Carburant", "Année"].map((f) => (
          <div
            key={f}
            className="rounded-2xl border border-border/60 bg-card p-4"
          >
            <div className="font-semibold text-sm mb-3">{f}</div>
            <div className="h-24 rounded-xl bg-muted/60" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DrawerRenderer() {
  const drawers = useUIStore((s) => s.ui.drawers) || { cart: "closed", wishlist: "closed", filters: "closed" };
  const closeDrawer = useUIStore((s) => s.closeDrawer);
  const cartCount = useCartStore((s) => s.uniqueCount());
  const wishlistCount = useWishlistStore((s) => s.count());

  const anyOpen =
    drawers?.cart === "open" || drawers?.wishlist === "open" || drawers?.filters === "open";

  const active: DrawerKind | null =
    drawers?.cart === "open"
      ? "cart"
      : drawers?.wishlist === "open"
      ? "wishlist"
      : drawers?.filters === "open"
      ? "filters"
      : null;

  const closeActive = () => active && closeDrawer(active);

  return (
    <>
      <Overlay open={anyOpen} onClose={closeActive} />
      <DrawerPanel
        open={active === "cart"}
        onClose={() => closeDrawer("cart")}
        title="Mon panier"
        icon={ShoppingBag}
        count={cartCount}
      >
        <CartDrawerContent onClose={() => closeDrawer("cart")} />
      </DrawerPanel>
      <DrawerPanel
        open={active === "wishlist"}
        onClose={() => closeDrawer("wishlist")}
        title="Mes favoris"
        icon={Heart}
        count={wishlistCount}
      >
        <WishlistDrawerContent onClose={() => closeDrawer("wishlist")} />
      </DrawerPanel>
      <DrawerPanel
        open={active === "filters"}
        onClose={() => closeDrawer("filters")}
        title="Filtres de recherche"
        icon={SlidersHorizontal}
      >
        <FiltersDrawerContent />
      </DrawerPanel>
    </>
  );
}

export default DrawerRenderer;
