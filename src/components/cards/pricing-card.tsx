"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { Check, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const pricingCardVariants = cva(
  "group relative flex flex-col w-full rounded-3xl transition-all duration-500 ease-[var(--ease-premium)] will-change-transform",
  {
    variants: {
      tier: {
        basic:
          "bg-card border border-border/60 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-[#253E38]/20 dark:hover:border-[#A7CD0F]/20",
        pro:
          "bg-gradient-to-b from-white via-card to-white/80 dark:from-[#1a2027] dark:via-[#1a2027] dark:to-[#252d36]",
        enterprise:
          "bg-card border border-border/60 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-[#253E38]/20 dark:hover:border-[#A7CD0F]/20",
      },
      featured: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        tier: "pro",
        featured: true,
        className:
          "shadow-[0_40px_80px_-20px_rgba(37,62,56,0.25)] dark:shadow-[0_40px_80px_-20px_rgba(167,205,15,0.20)] -translate-y-2 scale-[1.02] hover:-translate-y-3 hover:scale-[1.03]",
      },
    ],
    defaultVariants: {
      tier: "basic",
      featured: false,
    },
  }
)

export interface PricingCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof pricingCardVariants> {
  featured?: boolean
  savePercent?: number
  children: React.ReactNode
}

const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  ({ className, tier, featured = false, savePercent, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        data-slot="pricing-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn("relative", className)}
        {...(props as any)}
      >
        {featured && (
          <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-[#253E38] via-[#A7CD0F] to-[#FEB300] bg-[length:200%_200%] animate-gradient opacity-90 z-0" aria-hidden="true" />
        )}
        <div className={cn(pricingCardVariants({ tier, featured }), "relative z-10 overflow-visible")}>
          {featured && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
              <Badge variant="accent" size="lg" className="gap-1.5 px-5 shadow-lg">
                <Sparkles className="size-4" />
                Most Popular
              </Badge>
            </div>
          )}
          {savePercent !== undefined && savePercent > 0 && (
            <div className="absolute top-4 right-4 z-20">
              <Badge variant="secondary" size="pill" className="font-bold">
                Save {savePercent}%
              </Badge>
            </div>
          )}
          <div className={cn("flex flex-col h-full", featured ? "p-7 md:p-8" : "p-6 md:p-7")}>
            {children}
          </div>
        </div>
      </motion.div>
    )
  }
)
PricingCard.displayName = "PricingCard"

export interface PricingCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode
  description?: React.ReactNode
  tier?: "basic" | "pro" | "enterprise"
}

const PricingCardHeader = React.forwardRef<HTMLDivElement, PricingCardHeaderProps>(
  ({ className, title, description, tier, ...props }, ref) => {
    const tierColors = {
      basic: "text-[#253E38] dark:text-[#A7CD0F]",
      pro: "text-[#FEB300]",
      enterprise: "text-[#253E38] dark:text-[#A7CD0F]",
    }
    return (
      <div
        ref={ref}
        data-slot="pricing-card-header"
        className={cn("mb-6 md:mb-8 space-y-2", className)}
        {...props}
      >
        {title && (
          <div className="flex items-center gap-2.5">
            <div className={cn(
              "size-2.5 rounded-full",
              tier === "pro" ? "bg-[#FEB300] shadow-[0_0_12px_rgba(254,179,0,0.6)]" : "bg-[#253E38] dark:bg-[#A7CD0F]"
            )} />
            <h3 className={cn(
              "font-heading text-sm md:text-base font-bold uppercase tracking-[0.14em]",
              tier ? tierColors[tier] : "text-[#253E38] dark:text-[#A7CD0F]"
            )}>
              {title}
            </h3>
          </div>
        )}
        {description && (
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            {description}
          </p>
        )}
      </div>
    )
  }
)
PricingCardHeader.displayName = "PricingCardHeader"

export interface PricingCardPriceProps extends React.HTMLAttributes<HTMLDivElement> {
  price?: number
  priceAnnual?: number
  period?: string
  periodAnnual?: string
  currency?: string
  isAnnual?: boolean
}

const PricingCardPrice = React.forwardRef<HTMLDivElement, PricingCardPriceProps>(
  ({ className, price, priceAnnual, period = "/mo", periodAnnual = "/yr", currency = "€", isAnnual = false, ...props }, ref) => {
    const currentPrice = isAnnual && priceAnnual !== undefined ? priceAnnual : price
    const currentPeriod = isAnnual ? periodAnnual : period
    const monthlyEquivalent = priceAnnual !== undefined ? Number((priceAnnual / 12).toFixed(0)) : undefined

    return (
      <div
        ref={ref}
        data-slot="pricing-card-price"
        className={cn("mb-6 md:mb-8 space-y-1", className)}
        {...props}
      >
        <div className="flex items-baseline gap-1.5">
          <span className="text-muted-foreground text-xl md:text-2xl font-semibold">{currency}</span>
          <motion.span
            key={String(currentPrice)}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-foreground"
          >
            {currentPrice}
          </motion.span>
          <span className="text-muted-foreground text-sm md:text-base font-medium ml-1">{currentPeriod}</span>
        </div>
        {isAnnual && monthlyEquivalent !== undefined && (
          <p className="text-xs md:text-sm text-[#A7CD0F] dark:text-[#A7CD0F] font-semibold">
            {currency}{monthlyEquivalent}/month billed annually
          </p>
        )}
      </div>
    )
  }
)
PricingCardPrice.displayName = "PricingCardPrice"

export interface PricingCardFeaturesProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode
}

const PricingCardFeatures = React.forwardRef<HTMLUListElement, PricingCardFeaturesProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        data-slot="pricing-card-features"
        className={cn("flex-1 space-y-3.5 mb-7 md:mb-8", className)}
        {...props}
      >
        {children}
      </ul>
    )
  }
)
PricingCardFeatures.displayName = "PricingCardFeatures"

export interface PricingCardFeatureProps extends React.LiHTMLAttributes<HTMLLIElement> {
  included?: boolean
  label?: React.ReactNode
}

const PricingCardFeature = React.forwardRef<HTMLLIElement, PricingCardFeatureProps>(
  ({ className, included = true, label, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        data-slot="pricing-card-feature"
        className={cn(
          "flex items-start gap-3 text-sm md:text-base transition-all duration-300 ease-[var(--ease-premium)]",
          !included && "opacity-50",
          className
        )}
        {...props}
      >
        <span className={cn(
          "mt-0.5 size-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
          included
            ? "bg-[#253E38]/10 dark:bg-[#A7CD0F]/15 text-[#253E38] dark:text-[#A7CD0F]"
            : "bg-muted text-muted-foreground"
        )}>
          {included ? <Check className="size-3" /> : <X className="size-3" />}
        </span>
        <span className={cn("leading-snug pt-0.5", included ? "text-foreground/90" : "text-muted-foreground line-through/50")}>
          {label ?? children}
        </span>
      </li>
    )
  }
)
PricingCardFeature.displayName = "PricingCardFeature"

export interface PricingCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  ctaLabel?: React.ReactNode
  ctaHref?: string
  onCtaClick?: () => void
  tier?: "basic" | "pro" | "enterprise"
  secondaryLabel?: React.ReactNode
  onSecondaryClick?: () => void
}

const PricingCardFooter = React.forwardRef<HTMLDivElement, PricingCardFooterProps>(
  ({ className, ctaLabel = "Get started", ctaHref, onCtaClick, tier = "basic", secondaryLabel, onSecondaryClick, children, ...props }, ref) => {
    const buttonVariant = tier === "pro" ? "primary" : tier === "enterprise" ? "secondary" : "outline"
    return (
      <div
        ref={ref}
        data-slot="pricing-card-footer"
        className={cn("space-y-3 pt-2 border-t border-border/40", className)}
        {...props}
      >
        {ctaHref ? (
          <Button asChild variant={buttonVariant as any} size="lg" className="w-full">
            <a href={ctaHref} onClick={onCtaClick}>{ctaLabel}</a>
          </Button>
        ) : (
          <Button variant={buttonVariant as any} size="lg" className="w-full" onClick={onCtaClick}>
            {ctaLabel}
          </Button>
        )}
        {secondaryLabel && (
          <button
            type="button"
            onClick={onSecondaryClick}
            className="w-full text-sm text-muted-foreground hover:text-[#253E38] dark:hover:text-[#A7CD0F] font-medium transition-colors duration-300 py-1"
          >
            {secondaryLabel}
          </button>
        )}
        {children}
      </div>
    )
  }
)
PricingCardFooter.displayName = "PricingCardFooter"

export {
  PricingCard,
  PricingCardHeader,
  PricingCardPrice,
  PricingCardFeatures,
  PricingCardFeature,
  PricingCardFooter,
  pricingCardVariants,
}
