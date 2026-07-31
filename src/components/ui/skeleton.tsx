"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const skeletonVariants = cva(
  "relative overflow-hidden rounded-xl skeleton",
  {
    variants: {
      variant: {
        default: "",
        pulse: "animate-pulse-soft",
        text: "h-[1em] rounded-md my-0.5",
        circular: "rounded-full",
        card: "rounded-3xl",
        thumbnail: "aspect-square rounded-2xl",
        avatar: "rounded-full aspect-square",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(skeletonVariants({ variant, className }))}
      {...props}
    />
  )
)
Skeleton.displayName = "Skeleton"

const SkeletonText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { lines?: number }
>(({ className, lines = 3, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="skeleton-text"
    className={cn("flex flex-col gap-2", className)}
    {...props}
  >
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        variant="text"
        style={{
          width:
            i === lines - 1
              ? "60%"
              : i === 0
              ? "100%"
              : `${85 + Math.random() * 10}%`,
        }}
      />
    ))}
  </div>
))
SkeletonText.displayName = "SkeletonText"

const SkeletonCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    showImage?: boolean
    showHeader?: boolean
    contentLines?: number
    showFooter?: boolean
  }
>(
  (
    {
      className,
      showImage = true,
      showHeader = true,
      contentLines = 3,
      showFooter = true,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      data-slot="skeleton-card"
      className={cn(
        "rounded-3xl border border-border/60 bg-card p-5 md:p-6 space-y-5",
        className
      )}
      {...props}
    >
      {showImage && <Skeleton variant="card" className="aspect-[4/3] w-full" />}
      {showHeader && (
        <div className="space-y-3">
          <Skeleton variant="text" className="h-5 w-1/3" />
          <Skeleton variant="text" className="h-7 w-2/3" />
        </div>
      )}
      {contentLines > 0 && <SkeletonText lines={contentLines} />}
      {showFooter && (
        <div className="flex gap-3 pt-2 border-t border-border/40">
          <Skeleton className="h-12 flex-1 rounded-2xl" />
          <Skeleton className="h-12 w-28 rounded-2xl" />
        </div>
      )}
    </div>
  )
)
SkeletonCard.displayName = "SkeletonCard"

const SkeletonAvatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { size?: "sm" | "md" | "lg" | "xl" }
>(({ className, size = "md", ...props }, ref) => {
  const sizeClasses = {
    sm: "size-8",
    md: "size-12",
    lg: "size-16",
    xl: "size-24",
  }
  return (
    <Skeleton
      ref={ref}
      data-slot="skeleton-avatar"
      variant="avatar"
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  )
})
SkeletonAvatar.displayName = "SkeletonAvatar"

const SkeletonList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    items?: number
    showAvatar?: boolean
    contentLines?: number
  }
>(
  (
    { className, items = 4, showAvatar = true, contentLines = 2, ...props },
    ref
  ) => (
    <div
      ref={ref}
      data-slot="skeleton-list"
      className={cn("space-y-4", className)}
      {...props}
    >
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-start gap-4">
          {showAvatar && <SkeletonAvatar size="md" />}
          <div className="flex-1 space-y-2 pt-1">
            <SkeletonText lines={contentLines} />
          </div>
        </div>
      ))}
    </div>
  )
)
SkeletonList.displayName = "SkeletonList"

export {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonList,
  skeletonVariants,
}
