"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, AnimatePresence } from "framer-motion"
import {
  Star,
  ShoppingCart,
  Eye,
  Heart,
  Check,
  Package,
  AlertTriangle,
  PackageOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const productCardVariants = cva(
  "group relative w-full rounded-3xl overflow-hidden bg-card border border-border/60 shadow-sm transition-all duration-500 ease-[var(--ease-premium)] will-change-transform hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-15px_rgba(37,62,56,0.18)] hover:border-[#253E38]/20 dark:hover:border-[#A7CD0F]/20",
  {
    variants: {},
    defaultVariants: {},
  }
)

export interface ProductCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof productCardVariants> {
  name?: string
  category?: string
  image?: string
  price?: number
  originalPrice?: number
  salePrice?: number
  currency?: string
  discountPercent?: number
  rating?: number
  reviewCount?: number
  colors?: { name: string; value: string }[]
  stock?: "in" | "low" | "out" | number
  isFavorite?: boolean
  onFavoriteToggle?: () => void
  onAddToCart?: () => void
  onQuickView?: () => void
  href?: string
  children?: React.ReactNode
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      name,
      category,
      image,
      price,
      originalPrice,
      salePrice,
      currency = "FCFA",
      discountPercent,
      rating = 0,
      reviewCount = 0,
      colors,
      stock = "in",
      isFavorite = false,
      onFavoriteToggle,
      onAddToCart,
      onQuickView,
      href,
      children,
      ...props
    },
    ref
  ) => {
    const resolvedOriginal = originalPrice ?? price;
    const resolvedSale = salePrice ?? price;
    const computedDiscount =
      discountPercent !== undefined
        ? discountPercent
        : resolvedOriginal && resolvedSale
        ? Math.round(((resolvedOriginal - resolvedSale) / resolvedOriginal) * 100)
        : 0

    return (
      <motion.div
        ref={ref}
        data-slot="product-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(productCardVariants({ className }))}
        {...(props as any)}
      >
        {children ?? (
          <>
            <ProductCardImage image={image} name={name} onQuickView={onQuickView}>
              <ProductCardBadges discountPercent={computedDiscount} stock={stock} />
              <button
                type="button"
                onClick={onFavoriteToggle}
                aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
                className={cn(
                  "absolute top-3 right-3 md:top-4 md:right-4 z-20 size-10 flex items-center justify-center rounded-full backdrop-blur-xl transition-all duration-300 ease-[var(--ease-premium)] will-change-transform",
                  isFavorite
                    ? "bg-[#FEB300]/95 text-[#101418] shadow-[0_8px_20px_-4px_rgba(254,179,0,0.5)] scale-110"
                    : "bg-white/80 dark:bg-[#1a2027]/80 text-foreground/80 hover:text-[#FEB300] hover:bg-white dark:hover:bg-[#1a2027] border border-white/40 dark:border-white/10 hover:scale-110"
                )}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={String(isFavorite)}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <Heart className={cn("size-5", isFavorite && "fill-current")} />
                  </motion.div>
                </AnimatePresence>
              </button>
            </ProductCardImage>

            <div className="p-5 md:p-6 flex flex-col gap-4">
              <div className="space-y-1.5">
                {category && (
                  <div className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#253E38] dark:text-[#A7CD0F]">
                    {category}
                  </div>
                )}
                <h3 className="font-heading text-lg md:text-xl font-semibold tracking-tight text-foreground line-clamp-2 leading-snug group-hover:text-[#253E38] dark:group-hover:text-[#A7CD0F] transition-colors duration-300">
                  {href ? <a href={href}>{name}</a> : name}
                </h3>
              </div>

              <ProductCardRating rating={rating} reviewCount={reviewCount} />

              <ProductCardColors colors={colors} />

              <div className="flex flex-wrap items-end justify-between gap-3 pt-1">
                <ProductCardPricing
                  originalPrice={resolvedOriginal}
                  salePrice={resolvedSale}
                  currency={currency}
                />
                <ProductCardActions onAddToCart={onAddToCart} stock={stock} />
              </div>
            </div>
          </>
        )}
      </motion.div>
    )
  }
)
ProductCard.displayName = "ProductCard"

export interface ProductCardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string
  name?: string
  onQuickView?: () => void
}

const ProductCardImage = React.forwardRef<HTMLDivElement, ProductCardImageProps>(
  ({ className, image, name, onQuickView, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="product-card-image"
        className={cn(
          "relative aspect-square overflow-hidden bg-gradient-to-br from-muted via-muted/60 to-muted",
          className
        )}
        {...props}
      >
        {image ? (
          <img
            src={image}
            alt={name ?? "Product"}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-[700ms] ease-[var(--ease-premium)] group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#253E38]/5 via-transparent to-[#A7CD0F]/10">
            <PackageOpen className="size-20 md:size-24 text-[#253E38]/20 dark:text-[#A7CD0F]/20" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[var(--ease-premium)] pointer-events-none" />

        {children}

        <AnimatePresence>
          <motion.button
            type="button"
            onClick={onQuickView}
            aria-label="Quick view"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{
              opacity: onQuickView ? (undefined as any) : 0,
              y: undefined as any,
            }}
            whileHover={undefined as any}
            className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-400 ease-[var(--ease-premium)]"
          >
            <Button variant="glass" size="md" className="gap-2 shadow-lg backdrop-blur-xl">
              <Eye className="size-4.5" />
              Quick View
            </Button>
          </motion.button>
        </AnimatePresence>
      </div>
    )
  }
)
ProductCardImage.displayName = "ProductCardImage"

export interface ProductCardBadgesProps extends React.HTMLAttributes<HTMLDivElement> {
  discountPercent?: number
  stock?: "in" | "low" | "out" | number
}

const ProductCardBadges = React.forwardRef<HTMLDivElement, ProductCardBadgesProps>(
  ({ className, discountPercent = 0, stock = "in", ...props }, ref) => {
    const stockLevel = typeof stock === "number" ? (stock === 0 ? "out" : stock <= 5 ? "low" : "in") : stock

    return (
      <div
        ref={ref}
        data-slot="product-card-badges"
        className={cn("absolute top-3 left-3 md:top-4 md:left-4 z-20 flex flex-col gap-2", className)}
        {...props}
      >
        {discountPercent > 0 && (
          <Badge variant="destructive" size="pill" className="font-bold shadow-lg">
            -{discountPercent}%
          </Badge>
        )}
        {stockLevel === "out" ? (
          <Badge variant="destructive" size="pill" className="gap-1.5">
            <AlertTriangle className="size-3" />
            Out of stock
          </Badge>
        ) : stockLevel === "low" ? (
          <Badge variant="warning" size="pill" className="gap-1.5">
            <Package className="size-3" />
            Low stock
          </Badge>
        ) : null}
      </div>
    )
  }
)
ProductCardBadges.displayName = "ProductCardBadges"

export interface ProductCardRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  rating?: number
  reviewCount?: number
}

const ProductCardRating = React.forwardRef<HTMLDivElement, ProductCardRatingProps>(
  ({ className, rating = 0, reviewCount = 0, ...props }, ref) => {
    const fullStars = Math.floor(rating)
    const hasHalf = rating - fullStars >= 0.5
    const totalStars = 5

    return (
      <div
        ref={ref}
        data-slot="product-card-rating"
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        <div className="flex items-center gap-0.5">
          {Array.from({ length: totalStars }).map((_, i) => {
            const isFull = i < fullStars
            const isHalf = !isFull && i === fullStars && hasHalf
            return (
              <div key={i} className="relative size-4 md:size-[1.1rem]">
                <Star
                  className={cn(
                    "absolute inset-0 size-full transition-colors duration-300",
                    isFull || isHalf
                      ? "fill-[#FEB300] text-[#FEB300] drop-shadow-[0_1px_2px_rgba(254,179,0,0.4)]"
                      : "fill-muted text-muted-foreground/40"
                  )}
                />
                {isHalf && (
                  <div className="absolute inset-0 overflow-hidden w-1/2">
                    <Star className="size-full fill-[#FEB300] text-[#FEB300]" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <span className="text-xs md:text-sm font-semibold text-foreground/90 tabular-nums">
          {rating.toFixed(1)}
        </span>
        {reviewCount > 0 && (
          <span className="text-xs md:text-sm text-muted-foreground">
            ({reviewCount.toLocaleString()})
          </span>
        )}
      </div>
    )
  }
)
ProductCardRating.displayName = "ProductCardRating"

export interface ProductCardColorsProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: { name: string; value: string }[]
  maxVisible?: number
}

const ProductCardColors = React.forwardRef<HTMLDivElement, ProductCardColorsProps>(
  ({ className, colors = [], maxVisible = 5, ...props }, ref) => {
    const [selected, setSelected] = React.useState<string | null>(colors[0]?.value ?? null)
    const visibleColors = colors.slice(0, maxVisible)
    const remaining = colors.length - visibleColors.length

    if (!colors.length) return null

    return (
      <div
        ref={ref}
        data-slot="product-card-colors"
        className={cn("flex flex-wrap items-center gap-2", className)}
        {...props}
      >
        {visibleColors.map((color) => (
          <button
            key={color.value}
            type="button"
            aria-label={`Select color: ${color.name}`}
            onClick={() => setSelected(color.value)}
            className={cn(
              "relative size-6 md:size-7 rounded-full transition-all duration-300 ease-[var(--ease-premium)] will-change-transform ring-offset-2 ring-offset-card dark:ring-offset-[#1a2027]",
              selected === color.value
                ? "ring-2 ring-[#253E38] dark:ring-[#A7CD0F] scale-115 shadow-md"
                : "ring-1 ring-border/60 hover:scale-110 hover:ring-[#253E38]/40 dark:hover:ring-[#A7CD0F]/40"
            )}
            style={{ backgroundColor: color.value }}
          >
            {selected === color.value && (
              <Check className="absolute inset-0 m-auto size-3 text-white drop-shadow-md" />
            )}
          </button>
        ))}
        {remaining > 0 && (
          <div className="size-6 md:size-7 rounded-full bg-muted border border-border/60 flex items-center justify-center text-[0.65rem] md:text-xs font-bold text-muted-foreground">
            +{remaining}
          </div>
        )}
      </div>
    )
  }
)
ProductCardColors.displayName = "ProductCardColors"

export interface ProductCardPricingProps extends React.HTMLAttributes<HTMLDivElement> {
  originalPrice?: number
  salePrice?: number
  currency?: string
}

const ProductCardPricing = React.forwardRef<HTMLDivElement, ProductCardPricingProps>(
  ({ className, originalPrice, salePrice, currency = "€", ...props }, ref) => {
    const hasDiscount = originalPrice !== undefined && salePrice !== undefined && originalPrice > salePrice
    const displayPrice = salePrice ?? originalPrice ?? 0

    return (
      <div
        ref={ref}
        data-slot="product-card-pricing"
        className={cn("flex items-baseline gap-2", className)}
        {...props}
      >
        <span className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-[#253E38] dark:text-[#A7CD0F]">
          {currency}
          {displayPrice.toLocaleString()}
        </span>
        {hasDiscount && (
          <span className="text-sm md:text-base text-muted-foreground line-through/70 decoration-destructive/60 decoration-1 font-medium tabular-nums">
            {currency}
            {originalPrice?.toLocaleString()}
          </span>
        )}
      </div>
    )
  }
)
ProductCardPricing.displayName = "ProductCardPricing"

export interface ProductCardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  onAddToCart?: () => void
  stock?: "in" | "low" | "out" | number
  label?: React.ReactNode
}

const ProductCardActions = React.forwardRef<HTMLDivElement, ProductCardActionsProps>(
  ({ className, onAddToCart, stock = "in", label = "Add to cart", ...props }, ref) => {
    const stockLevel = typeof stock === "number" ? (stock === 0 ? "out" : stock <= 5 ? "low" : "in") : stock
    const isDisabled = stockLevel === "out"

    return (
      <div
        ref={ref}
        data-slot="product-card-actions"
        className={cn("", className)}
        {...props}
      >
        <Button
          variant={stockLevel === "out" ? "outline" : "secondary"}
          size="md"
          onClick={onAddToCart}
          disabled={isDisabled}
          className={cn(
            "gap-2 shadow-lg transition-all duration-400 ease-[var(--ease-premium)]",
            !isDisabled && "hover:shadow-[0_8px_24px_-4px_rgba(167,205,15,0.55)] hover:-translate-y-0.5"
          )}
        >
          <ShoppingCart className="size-4.5" />
          <span className="text-sm md:text-base font-semibold">
            {stockLevel === "out" ? "Sold out" : label}
          </span>
        </Button>
      </div>
    )
  }
)
ProductCardActions.displayName = "ProductCardActions"

export {
  ProductCard,
  ProductCardImage,
  ProductCardBadges,
  ProductCardRating,
  ProductCardColors,
  ProductCardPricing,
  ProductCardActions,
  productCardVariants,
}
