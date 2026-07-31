"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  Gauge,
  Fuel,
  Settings2,
  Zap,
  ChevronRight,
  CarFront,
  Sparkles,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const vehicleCardVariants = cva(
  "group relative w-full rounded-3xl overflow-hidden bg-card border border-border/60 shadow-sm transition-all duration-500 ease-[var(--ease-premium)] will-change-transform hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-15px_rgba(37,62,56,0.20)] hover:border-[#253E38]/20 dark:hover:border-[#A7CD0F]/20",
  {
    variants: {
      status: {
        new: "",
        "pre-owned": "",
      },
    },
    defaultVariants: {
      status: "pre-owned",
    },
  }
)

export interface VehicleCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof vehicleCardVariants> {
  make?: string
  model?: string
  year?: number
  price?: number
  currency?: string
  mileage?: string
  fuel?: string
  transmission?: string
  power?: string
  status?: "new" | "pre-owned"
  isFavorite?: boolean
  onFavoriteToggle?: () => void
  onViewDetails?: () => void
  href?: string
  images?: string[]
  loading?: boolean
  children?: React.ReactNode
}

const VehicleCard = React.forwardRef<HTMLDivElement, VehicleCardProps>(
  (
    {
      className,
      status = "pre-owned",
      make,
      model,
      year,
      price,
      currency = "€",
      mileage,
      fuel,
      transmission,
      power,
      isFavorite = false,
      onFavoriteToggle,
      onViewDetails,
      href,
      images,
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    if (loading) {
      return (
        <div
          ref={ref}
          data-slot="vehicle-card"
          className={cn(vehicleCardVariants({ status }), className)}
          {...props}
        >
          <div className="relative aspect-[4/3] skeleton" />
          <div className="p-5 md:p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-5 w-24 skeleton rounded-md" />
                <div className="h-7 w-40 skeleton rounded-md" />
              </div>
              <div className="h-8 w-16 skeleton rounded-full" />
            </div>
            <div className="h-9 w-32 skeleton rounded-lg" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-14 skeleton rounded-xl" />
              <div className="h-14 skeleton rounded-xl" />
              <div className="h-14 skeleton rounded-xl" />
              <div className="h-14 skeleton rounded-xl" />
            </div>
            <div className="h-12 skeleton rounded-2xl" />
          </div>
        </div>
      )
    }

    return (
      <motion.div
        ref={ref}
        data-slot="vehicle-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(vehicleCardVariants({ status, className }))}
        {...(props as any)}
      >
        {children ?? (
          <>
            <VehicleCardImage images={images} make={make} model={model} status={status}>
              <VehicleCardBadges make={make} model={model} year={year} status={status} />
              <button
                type="button"
                onClick={onFavoriteToggle}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                className={cn(
                  "absolute top-3 right-3 md:top-4 md:right-4 z-20 size-10 md:size-11 flex items-center justify-center rounded-full backdrop-blur-xl transition-all duration-300 ease-[var(--ease-premium)] will-change-transform",
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
                    <Heart className={cn("size-5 md:size-[1.35rem]", isFavorite && "fill-current")} />
                  </motion.div>
                </AnimatePresence>
              </button>
            </VehicleCardImage>

            <div className="p-5 md:p-6 flex flex-col gap-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <CarFront className="size-4 text-[#253E38] dark:text-[#A7CD0F]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#253E38] dark:text-[#A7CD0F]">
                      {make}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-foreground truncate group-hover:text-[#253E38] dark:group-hover:text-[#A7CD0F] transition-colors duration-300">
                    {model} {year}
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[0.65rem] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">
                    From
                  </div>
                  <div className="font-heading text-2xl md:text-3xl font-bold text-[#253E38] dark:text-[#A7CD0F] tracking-tight">
                    {currency}
                    {price?.toLocaleString()}
                  </div>
                </div>
              </div>

              <VehicleCardSpecs
                mileage={mileage}
                fuel={fuel}
                transmission={transmission}
                power={power}
              />

              <VehicleCardFooter href={href} onViewDetails={onViewDetails} />
            </div>
          </>
        )}
      </motion.div>
    )
  }
)
VehicleCard.displayName = "VehicleCard"

export interface VehicleCardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  images?: string[]
  make?: string
  model?: string
  status?: "new" | "pre-owned"
}

const VehicleCardImage = React.forwardRef<HTMLDivElement, VehicleCardImageProps>(
  ({ className, images, make, model, status, children, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = React.useState(0)
    const safeImages = images?.length ? images : []

    return (
      <div
        ref={ref}
        data-slot="vehicle-card-image"
        className={cn(
          "relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-muted via-muted/60 to-muted",
          className
        )}
        {...props}
      >
        <AnimatePresence mode="wait">
          {safeImages[activeIndex] ? (
            <motion.img
              key={activeIndex}
              src={safeImages[activeIndex]}
              alt={`${make ?? ""} ${model ?? ""}`}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-[var(--ease-premium)] group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#253E38]/5 via-transparent to-[#A7CD0F]/10"
            >
              <CarFront className="size-20 md:size-24 text-[#253E38]/20 dark:text-[#A7CD0F]/20" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[var(--ease-premium)] pointer-events-none" />

        {children}

        {safeImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {safeImages.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`View image ${i + 1}`}
                onClick={() => setActiveIndex(i)}
                onMouseEnter={() => setActiveIndex(i)}
                className={cn(
                  "rounded-full transition-all duration-300 ease-[var(--ease-premium)]",
                  i === activeIndex
                    ? "w-6 h-2 bg-white shadow-md"
                    : "size-2 bg-white/50 hover:bg-white/80 backdrop-blur-sm"
                )}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)
VehicleCardImage.displayName = "VehicleCardImage"

export interface VehicleCardBadgesProps extends React.HTMLAttributes<HTMLDivElement> {
  make?: string
  model?: string
  year?: number
  status?: "new" | "pre-owned"
}

const VehicleCardBadges = React.forwardRef<HTMLDivElement, VehicleCardBadgesProps>(
  ({ className, make, model, year, status = "pre-owned", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="vehicle-card-badges"
        className={cn("absolute top-3 left-3 md:top-4 md:left-4 z-20 flex flex-wrap items-center gap-2", className)}
        {...props}
      >
        {status === "new" ? (
          <Badge variant="accent" size="pill" className="gap-1.5 shadow-lg">
            <Sparkles className="size-3.5" />
            New
          </Badge>
        ) : (
          <Badge variant="glass" size="pill" className="gap-1.5">
            <RefreshCw className="size-3.5" />
            Pre-owned
          </Badge>
        )}
        {year && (
          <Badge variant="primary" size="pill" className="shadow-sm">
            {year}
          </Badge>
        )}
      </div>
    )
  }
)
VehicleCardBadges.displayName = "VehicleCardBadges"

export interface VehicleCardSpecsProps extends React.HTMLAttributes<HTMLDivElement> {
  mileage?: string
  fuel?: string
  transmission?: string
  power?: string
}

const VehicleCardSpecs = React.forwardRef<HTMLDivElement, VehicleCardSpecsProps>(
  ({ className, mileage, fuel, transmission, power, ...props }, ref) => {
    const specs = [
      { icon: Gauge, label: mileage, unit: "km" },
      { icon: Fuel, label: fuel },
      { icon: Settings2, label: transmission },
      { icon: Zap, label: power },
    ]

    return (
      <div
        ref={ref}
        data-slot="vehicle-card-specs"
        className={cn("grid grid-cols-2 gap-2.5 md:gap-3", className)}
        {...props}
      >
        {specs.map(({ icon: Icon, label, unit }, i) => (
          label && (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2.5 rounded-2xl bg-muted/60 dark:bg-white/[0.04] border border-border/40 p-3 transition-all duration-300 group-hover:bg-[#253E38]/5 dark:group-hover:bg-[#A7CD0F]/8 group-hover:border-[#253E38]/15 dark:group-hover:border-[#A7CD0F]/20"
            >
              <div className="size-9 shrink-0 rounded-xl bg-[#253E38]/10 dark:bg-[#A7CD0F]/15 flex items-center justify-center text-[#253E38] dark:text-[#A7CD0F]">
                <Icon className="size-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-foreground truncate">{label}</div>
                {unit && <div className="text-[0.65rem] text-muted-foreground">{unit}</div>}
              </div>
            </motion.div>
          )
        ))}
      </div>
    )
  }
)
VehicleCardSpecs.displayName = "VehicleCardSpecs"

export interface VehicleCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string
  onViewDetails?: () => void
  label?: React.ReactNode
}

const VehicleCardFooter = React.forwardRef<HTMLDivElement, VehicleCardFooterProps>(
  ({ className, href, onViewDetails, label = "View details", ...props }, ref) => {
    const content = (
      <>
        <span className="flex-1">{label}</span>
        <ChevronRight className="size-4.5 transition-transform duration-300 group-hover:translate-x-1" />
      </>
    )

    return (
      <div
        ref={ref}
        data-slot="vehicle-card-footer"
        className={cn("mt-1", className)}
        {...props}
      >
        {href ? (
          <Button asChild variant="primary" size="lg" className="w-full">
            <a href={href} onClick={onViewDetails}>{content}</a>
          </Button>
        ) : (
          <Button variant="primary" size="lg" className="w-full" onClick={onViewDetails}>
            {content}
          </Button>
        )}
      </div>
    )
  }
)
VehicleCardFooter.displayName = "VehicleCardFooter"

export {
  VehicleCard,
  VehicleCardImage,
  VehicleCardBadges,
  VehicleCardSpecs,
  VehicleCardFooter,
  vehicleCardVariants,
}
