"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  Trash2,
  TicketPercent,
  ArrowRight,
  PackageSearch,
  Sparkles,
  ShoppingBag,
  Loader2,
  ChevronRight,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useUIStore, useCartStore, useWishlistStore } from "@/store";
import { cn, formatMoney } from "@/helpers";
import type { CartLineItem, WishlistItem } from "@/types/order";
import type { Wishlist } from "@/types/customer";
import type { ID } from "@/types";

type DrawerSide = "left" | "right";

interface DrawerShellProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  title?: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  maxWidthClass?: string;
  accent?: "primary" | "secondary" | "accent";
}

const slideVariants = (side: DrawerSide) => ({
  closed: {
    x: side === "right" ? "100%" : "-100%",
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  open: {
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
});

const backdropVariants = {
  closed: { opacity: 0, transition: { duration: 0.3 } },
  open: { opacity: 1, transition: { duration: 0.3 } },
};

const accentStyles = {
  primary: {
    icon: "bg-[#253E38]/10 text-[#253E38] dark:text-[#A7CD0F] dark:bg-[#A7CD0F]/15",
    ring: "focus-visible:ring-[#253E38]/30 dark:focus-visible:ring-[#A7CD0F]/30",
  },
  secondary: {
    icon: "bg-[#A7CD0F]/15 text-[#101418]",
    ring: "focus-visible:ring-[#A7CD0F]/40",
  },
  accent: {
    icon: "bg-[#FEB300]/15 text-[#101418]",
    ring: "focus-visible:ring-[#FEB300]/40",
  },
};

export function DrawerShell({
  open,
  onClose,
  side = "right",
  title,
  subtitle,
  icon: Icon,
  children,
  footer,
  maxWidthClass = "max-w-md md:max-w-lg",
  accent = "primary",
}: DrawerShellProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const accentStyle = accentStyles[accent];

  return (
    <AnimatePresence>
      {open && (
        <div
          data-slot="drawer-shell"
          className="fixed inset-0 z-[100]"
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="absolute inset-0 bg-[#101418]/60 backdrop-blur-md"
            aria-hidden="true"
          />
          <motion.div
            variants={slideVariants(side)}
            initial="closed"
            animate="open"
            exit="closed"
            className={cn(
              "absolute top-0 h-full w-full sm:w-[92%]",
              maxWidthClass,
              side === "right" ? "right-0" : "left-0",
              "bg-background border-l border-border/60 shadow-2xl",
              "flex flex-col"
            )}
          >
            {(title || Icon) && (
              <header className="flex items-start gap-4 px-5 md:px-7 pt-5 md:pt-6 pb-4 border-b border-border/50">
                {Icon && (
                  <div
                    className={cn(
                      "size-11 md:size-12 shrink-0 rounded-2xl flex items-center justify-center",
                      accentStyle.icon
                    )}
                  >
                    <Icon className="size-5 md:size-6" />
                  </div>
                )}
                <div className="flex-1 min-w-0 pt-0.5">
                  {title && (
                    <h2 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-foreground">
                      {title}
                    </h2>
                  )}
                  {subtitle && (
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                      {subtitle}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Fermer"
                  className={cn(
                    "shrink-0 size-10 md:size-11 rounded-xl border border-border/60 bg-card",
                    "flex items-center justify-center text-muted-foreground hover:text-foreground",
                    "hover:bg-muted hover:-translate-y-0.5 hover:shadow-md",
                    "transition-all duration-300 ease-[var(--ease-premium)]",
                    "outline-none focus-visible:ring-4",
                    accentStyle.ring
                  )}
                >
                  <X className="size-5" />
                </button>
              </header>
            )}

            <div className="flex-1 overflow-y-auto overscroll-contain">
              {children}
            </div>

            {footer && (
              <footer className="border-t border-border/50 bg-card/60 backdrop-blur-xl px-5 md:px-7 py-5 md:py-6">
                {footer}
              </footer>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface EmptyDrawerStateProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  accent?: "primary" | "secondary" | "accent";
}

function EmptyDrawerState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  accent = "primary",
}: EmptyDrawerStateProps) {
  const gradientByAccent = {
    primary:
      "from-[#253E38]/10 via-transparent to-[#A7CD0F]/10",
    secondary:
      "from-[#A7CD0F]/15 via-transparent to-[#FEB300]/10",
    accent:
      "from-[#FEB300]/15 via-transparent to-[#253E38]/10",
  };

  const iconBgByAccent = {
    primary:
      "bg-gradient-to-br from-[#253E38]/10 to-[#253E38]/5 text-[#253E38] dark:text-[#A7CD0F]",
    secondary:
      "bg-gradient-to-br from-[#A7CD0F]/20 to-[#A7CD0F]/10 text-[#101418]",
    accent:
      "bg-gradient-to-br from-[#FEB300]/20 to-[#FEB300]/10 text-[#101418]",
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 md:px-10 py-16 text-center">
      <div
        className={cn(
          "relative mb-7 md:mb-8",
          "before:absolute before:inset-0 before:blur-3xl before:opacity-60",
          accent === "primary" && "before:bg-[#253E38]/20",
          accent === "secondary" && "before:bg-[#A7CD0F]/30",
          accent === "accent" && "before:bg-[#FEB300]/30"
        )}
      >
        <div
          className={cn(
            "relative size-24 md:size-28 rounded-[2rem] flex items-center justify-center",
            iconBgByAccent[accent]
          )}
        >
          <Icon className="size-12 md:size-14" strokeWidth={1.5} />
        </div>
        <div
          className={cn(
            "absolute -top-2 -right-2 size-10 rounded-2xl flex items-center justify-center",
            "bg-white dark:bg-[#1a2027] shadow-lg border border-border/40",
            "animate-float"
          )}
          style={{ animationDelay: "0.6s" }}
        >
          <Sparkles
            className={cn(
              "size-5",
              accent === "primary" && "text-[#253E38] dark:text-[#A7CD0F]",
              accent === "secondary" && "text-[#A7CD0F]",
              accent === "accent" && "text-[#FEB300]"
            )}
          />
        </div>
      </div>

      <div
        className={cn(
          "w-full max-w-xs -mt-1 mb-8 h-32 rounded-3xl",
          "bg-gradient-to-br",
          gradientByAccent[accent],
          "border border-border/30 flex items-center justify-center",
          "absolute pointer-events-none opacity-70"
        )}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-foreground mb-2.5">
          {title}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xs mx-auto mb-7">
          {description}
        </p>
        {actionLabel && onAction && (
          <Button
            variant={accent === "primary" ? "primary" : accent === "secondary" ? "secondary" : "accent"}
            size="lg"
            onClick={onAction}
            className="gap-2 shadow-lg"
          >
            <ShoppingBag className="size-5" />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

export function CartDrawer() {
  const open = useUIStore((s) => s.ui.drawers.cart === "open");
  const closeDrawer = useUIStore((s) => s.closeDrawer);
  const { items, subtotal, total, discounts, shippingTotal, taxes, couponCode, meta } =
    useCartStore();
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const [couponInput, setCouponInput] = React.useState("");
  const [applying, setApplying] = React.useState(false);
  const locale = useUIStore((s) => s.locale.locale);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setApplying(true);
    try {
      await applyCoupon(couponInput.trim().toUpperCase());
      setCouponInput("");
    } finally {
      setApplying(false);
    }
  };

  const count = useCartStore((s) => s.count());

  const footer = items.length > 0 ? (
    <div className="space-y-5">
      <div className="space-y-2.5 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Sous-total</span>
          <span className="font-semibold tabular-nums">
            {formatMoney(subtotal, locale)}
          </span>
        </div>
        {discounts.amount > 0 && (
          <div className="flex items-center justify-between text-[#A7CD0F]">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <TicketPercent className="size-3.5" />
              Réduction{couponCode ? ` (${couponCode})` : ""}
            </span>
            <span className="font-bold tabular-nums">
              -{formatMoney(discounts, locale)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Livraison estimée</span>
          <span className="font-semibold tabular-nums">
            {shippingTotal.amount === 0 ? (
              <span className="text-[#A7CD0F]">Gratuite</span>
            ) : (
              formatMoney(shippingTotal, locale)
            )}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Taxes estimées</span>
          <span className="font-semibold tabular-nums">
            {formatMoney(taxes, locale)}
          </span>
        </div>
        <div className="h-px bg-border/60 my-3" />
        <div className="flex items-center justify-between pt-1">
          <span className="font-heading text-lg font-bold text-foreground">
            Total
          </span>
          <span className="font-heading text-2xl md:text-3xl font-bold text-[#253E38] dark:text-[#A7CD0F] tabular-nums tracking-tight">
            {formatMoney(total, locale)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {!couponCode ? (
          <div className="flex gap-2.5">
            <Input
              placeholder="Code promo"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
              variant="filled"
              floatingLabel="Code promo"
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={handleApplyCoupon}
              disabled={applying || !couponInput.trim()}
              className="shrink-0 gap-2"
            >
              {applying ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <TicketPercent className="size-4.5" />
              )}
              Appliquer
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-2xl border-2 border-[#A7CD0F]/40 bg-[#A7CD0F]/8 dark:bg-[#A7CD0F]/12 px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-[#A7CD0F]/15 flex items-center justify-center">
                <TicketPercent className="size-4.5 text-[#101418]" />
              </div>
              <div>
                <div className="text-sm font-bold tracking-tight">
                  {couponCode}
                </div>
                <div className="text-xs text-muted-foreground">
                  Remise appliquée
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeCoupon}
              className="text-destructive hover:text-destructive"
            >
              Retirer
            </Button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={() => closeDrawer("cart")}
            className="gap-2"
          >
            Continuer
            <ChevronRight className="size-4.5 -mr-1" />
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="gap-2 shadow-lg group"
            disabled={items.length === 0}
          >
            Commander
            <ArrowRight className="size-4.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <DrawerShell
      open={open}
      onClose={() => closeDrawer("cart")}
      side="right"
      title="Mon panier"
      subtitle={
        count > 0
          ? `${count} article${count > 1 ? "s" : ""} dans votre panier`
          : "Vos articles sélectionnés"
      }
      icon={ShoppingCart}
      accent="primary"
      footer={footer}
    >
      {items.length === 0 ? (
        <EmptyDrawerState
          icon={PackageSearch}
          title="Votre panier est vide"
          description="Parcourez notre sélection de véhicules et accessoires pour trouver ce qui vous convient."
          actionLabel="Découvrir nos produits"
          onAction={() => closeDrawer("cart")}
          accent="primary"
        />
      ) : (
        <div className="p-5 md:p-7 space-y-3.5 md:space-y-4">
          {items.map((item) => (
            <CartLineItemRow
              key={item.id}
              item={item}
              locale={locale}
              onQtyChange={(q) => updateQuantity(item.id, q)}
              onRemove={() => removeItem(item.id)}
            />
          ))}
        </div>
      )}
    </DrawerShell>
  );
}

interface CartLineItemRowProps {
  item: CartLineItem;
  locale: string;
  onQtyChange: (qty: number) => void;
  onRemove: () => void;
}

function CartLineItemRow({ item, locale, onQtyChange, onRemove }: CartLineItemRowProps) {
  const kindAccent: Record<CartLineItem["kind"], string> = {
    product: "bg-[#A7CD0F]/10 text-[#101418]",
    vehicle: "bg-[#253E38]/10 text-[#253E38] dark:text-[#A7CD0F]",
    service: "bg-[#FEB300]/12 text-[#101418]",
    fee: "bg-muted text-muted-foreground",
    discount: "bg-[#A7CD0F]/10 text-[#A7CD0F]",
    shipping: "bg-muted text-muted-foreground",
    tax: "bg-muted text-muted-foreground",
    custom: "bg-muted text-muted-foreground",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="group rounded-2xl border border-border/60 bg-card p-3.5 md:p-4 flex gap-3.5 md:gap-4 hover:border-[#253E38]/20 dark:hover:border-[#A7CD0F]/20 hover:shadow-md transition-all duration-300 ease-[var(--ease-premium)]"
    >
      <div className="relative shrink-0 size-20 md:size-24 rounded-xl overflow-hidden bg-gradient-to-br from-muted via-muted/70 to-muted border border-border/40">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="size-8 text-muted-foreground/40" />
          </div>
        )}
        <Badge
          size="sm"
          variant="glass"
          className={cn(
            "absolute top-2 left-2 !px-2 !text-[0.62rem] capitalize",
            kindAccent[item.kind]
          )}
        >
          {item.kind}
        </Badge>
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-sm md:text-base text-foreground leading-snug line-clamp-2 group-hover:text-[#253E38] dark:group-hover:text-[#A7CD0F] transition-colors">
              {item.name}
            </h4>
            {item.sku && (
              <div className="text-[0.68rem] text-muted-foreground mt-1 font-mono tracking-tight">
                SKU · {item.sku}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Retirer du panier"
            className="shrink-0 size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300 ease-[var(--ease-premium)]"
          >
            <Trash2 className="size-4" />
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="inline-flex items-center rounded-xl border border-border/60 bg-muted/60 overflow-hidden">
            <button
              type="button"
              onClick={() => onQtyChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label="Diminuer la quantité"
              className="size-8 md:size-9 flex items-center justify-center text-muted-foreground hover:text-[#253E38] dark:hover:text-[#A7CD0F] hover:bg-card transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Minus className="size-3.5 md:size-4" />
            </button>
            <span className="w-8 md:w-10 text-center text-sm md:text-base font-bold tabular-nums text-foreground">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onQtyChange(item.quantity + 1)}
              aria-label="Augmenter la quantité"
              className="size-8 md:size-9 flex items-center justify-center text-muted-foreground hover:text-[#253E38] dark:hover:text-[#A7CD0F] hover:bg-card transition-colors"
            >
              <Plus className="size-3.5 md:size-4" />
            </button>
          </div>

          <div className="text-right">
            <div className="font-heading text-lg md:text-xl font-bold text-[#253E38] dark:text-[#A7CD0F] tabular-nums tracking-tight">
              {formatMoney(item.totalPrice, locale)}
            </div>
            {item.quantity > 1 && (
              <div className="text-[0.7rem] md:text-xs text-muted-foreground tabular-nums">
                {formatMoney(item.unitPrice, locale)} / unité
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function WishlistDrawer() {
  const open = useUIStore((s) => s.ui.drawers.wishlist === "open");
  const closeDrawer = useUIStore((s) => s.closeDrawer);
  const openDrawer = useUIStore((s) => s.openDrawer);
  const addItem = useCartStore((s) => s.addItem);
  const activeList = useWishlistStore((s) => s.getActiveList());
  const removeItem = useWishlistStore((s) => s.removeItem);
  const moveAllToCart = useWishlistStore((s) => s.moveAllToCart);
  const locale = useUIStore((s) => s.locale.locale);
  const [moving, setMoving] = React.useState(false);

  const items = activeList?.items ?? [];
  const count = useWishlistStore((s) => s.count());

  const handleMoveAll = async () => {
    if (!activeList?.id) return;
    setMoving(true);
    try {
      await moveAllToCart(activeList.id);
      openDrawer("cart");
    } finally {
      setMoving(false);
    }
  };

  const handleAddToCart = async (wItem: WishlistItem) => {
    const name = "Article favori";
    const vehicle = wItem.vehicleId;
    const product = wItem.productId;

    await addItem({
      kind: wItem.kind,
      vehicleId: vehicle,
      productId: product,
      variantId: wItem.variantId,
      name,
      unitPrice: wItem.priceWhenAdded ?? { amount: 0, currency: "EUR" },
      quantity: wItem.quantity,
    });
    if (activeList?.id && wItem.id) {
      await removeItem(activeList.id, wItem.id);
    }
    openDrawer("cart");
  };

  const footer = items.length > 0 ? (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
            Total favoris
          </div>
          <div className="font-heading text-lg font-bold text-foreground">
            {count} article{count > 1 ? "s" : ""}
          </div>
        </div>
        <div className="size-11 rounded-2xl bg-[#FEB300]/15 flex items-center justify-center">
          <Heart className="size-5 text-[#FEB300] fill-[#FEB300]" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={handleMoveAll}
          disabled={moving}
          className="gap-2"
        >
          {moving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ShoppingBag className="size-4.5" />
          )}
          Tout ajouter
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            closeDrawer("wishlist");
            openDrawer("cart");
          }}
          className="gap-2 group"
        >
          Voir le panier
          <ChevronRight className="size-4.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  ) : null;

  return (
    <DrawerShell
      open={open}
      onClose={() => closeDrawer("wishlist")}
      side="right"
      title="Mes favoris"
      subtitle={
        activeList?.name
          ? activeList.name
          : count > 0
          ? `${count} article${count > 1 ? "s" : ""} sauvegardé${count > 1 ? "s" : ""}`
          : "Vos articles préférés"
      }
      icon={Heart}
      accent="accent"
      footer={footer}
    >
      {items.length === 0 ? (
        <EmptyDrawerState
          icon={Heart}
          title="Aucun favori pour l'instant"
          description="Ajoutez des véhicules et produits à vos favoris pour les retrouver rapidement ici."
          actionLabel="Explorer le catalogue"
          onAction={() => closeDrawer("wishlist")}
          accent="accent"
        />
      ) : (
        <div className="p-5 md:p-7 space-y-3.5 md:space-y-4">
          {items.map((item) => (
            <WishlistItemRow
              key={item.id}
              item={item}
              locale={locale}
              listId={activeList!.id}
              onRemove={() => removeItem(activeList!.id, item.id)}
              onAddToCart={() => handleAddToCart(item)}
            />
          ))}
        </div>
      )}
    </DrawerShell>
  );
}

interface WishlistItemRowProps {
  item: WishlistItem;
  locale: string;
  listId: ID;
  onRemove: () => void;
  onAddToCart: () => void;
}

function WishlistItemRow({ item, locale, onRemove, onAddToCart }: WishlistItemRowProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="group rounded-2xl border border-border/60 bg-card p-3.5 md:p-4 flex gap-3.5 md:gap-4 hover:border-[#FEB300]/30 hover:shadow-md transition-all duration-300 ease-[var(--ease-premium)]"
    >
      <div className="relative shrink-0 size-20 md:size-24 rounded-xl overflow-hidden bg-gradient-to-br from-[#FEB300]/8 via-[#A7CD0F]/5 to-[#253E38]/8 border border-border/40">
        <div className="absolute inset-0 flex items-center justify-center">
          {item.kind === "vehicle" ? (
            <Package className="size-8 text-[#253E38]/30 dark:text-[#A7CD0F]/30" />
          ) : (
            <ShoppingBag className="size-8 text-[#FEB300]/30" />
          )}
        </div>
        <Badge
          size="sm"
          variant="accent"
          className="absolute top-2 left-2 !px-2 !text-[0.62rem] capitalize shadow-md"
        >
          {item.kind}
        </Badge>
        <div className="absolute top-2 right-2 size-7 rounded-lg bg-white/90 dark:bg-[#1a2027]/90 backdrop-blur flex items-center justify-center shadow-sm">
          <Heart className="size-3.5 text-[#FEB300] fill-[#FEB300]" />
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-sm md:text-base text-foreground leading-snug line-clamp-2 group-hover:text-[#253E38] dark:group-hover:text-[#A7CD0F] transition-colors">
              {item.kind === "vehicle" ? "Véhicule favori" : "Produit favori"}
            </h4>
            <div className="flex items-center gap-2 mt-1.5">
              <Badge
                size="sm"
                variant="outline"
                className="!h-5 !px-2 !text-[0.65rem] capitalize"
              >
                {item.priority ?? "medium"}
              </Badge>
              <span className="text-[0.68rem] text-muted-foreground">
                Qty {item.quantity}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Retirer des favoris"
            className="shrink-0 size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300"
          >
            <Trash2 className="size-4" />
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3">
          <div>
            {item.priceWhenAdded && (
              <div className="font-heading text-base md:text-lg font-bold text-[#FEB300] tabular-nums tracking-tight">
                {formatMoney(item.priceWhenAdded, locale)}
              </div>
            )}
            <div className="text-[0.7rem] text-muted-foreground">
              Ajouté le {new Date(item.addedAt).toLocaleDateString(locale)}
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={onAddToCart}
            className="shrink-0 gap-1.5 shadow-md"
          >
            <ShoppingCart className="size-4" />
            <span className="hidden md:inline">Ajouter</span>
            <span className="md:hidden">Panier</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
