import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "group relative overflow-hidden rounded-2xl bg-card text-card-foreground transition-all duration-[500ms] ease-[var(--ease-premium)] will-change-transform",
  {
    variants: {
      variant: {
        default:
          "border border-border/60 shadow-sm hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(16,20,24,0.15)] hover:border-[#253E38]/20",
        elevated:
          "border border-border/40 shadow-lg hover:-translate-y-2 hover:shadow-2xl hover:border-transparent",
        glass:
          "backdrop-blur-xl bg-white/70 dark:bg-[#1a2027]/75 border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(16,20,24,0.08)] hover:-translate-y-1.5 hover:bg-white/85 dark:hover:bg-[#1a2027]/85 hover:shadow-[0_20px_50px_rgba(16,20,24,0.15)]",
        outlined:
          "border-2 border-border/80 bg-transparent shadow-none hover:-translate-y-0.5 hover:border-[#253E38]/40 hover:shadow-md dark:hover:border-[#A7CD0F]/40",
        featured:
          "border border-[#253E38]/20 dark:border-[#A7CD0F]/20 bg-gradient-to-br from-white via-card to-white/80 dark:from-[#1a2027] dark:via-[#1a2027] dark:to-[#252d36] shadow-[0_30px_60px_-15px_rgba(37,62,56,0.18)] hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(37,62,56,0.30)] ring-1 ring-[#253E38]/10 dark:ring-[#A7CD0F]/10 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-[#253E38] before:via-[#A7CD0F] before:to-[#FEB300] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:ease-[var(--ease-premium)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card"
      role={props.onClick ? "button" : undefined}
      tabIndex={props.onClick ? 0 : undefined}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-header"
    className={cn("flex flex-col gap-2 p-6 pb-4 transition-all duration-500 ease-[var(--ease-premium)] group-hover:gap-2.5", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-footer"
    className={cn("flex items-center gap-3 p-6 pt-4 border-t border-border/40 transition-all duration-500 ease-[var(--ease-premium)]", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    data-slot="card-title"
    className={cn("font-heading text-2xl font-semibold tracking-tight text-foreground leading-snug transition-colors duration-500 ease-[var(--ease-premium)]", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="card-description"
    className={cn("text-sm text-muted-foreground leading-relaxed transition-colors duration-500 ease-[var(--ease-premium)]", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-content"
    className={cn("p-6 pt-2 flex flex-col gap-3 transition-all duration-500 ease-[var(--ease-premium)]", className)}
    {...props}
  />
))
CardContent.displayName = "CardContent"

const CardActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-actions"
    className={cn("flex flex-wrap items-center gap-2.5 transition-all duration-500 ease-[var(--ease-premium)]", className)}
    {...props}
  />
))
CardActions.displayName = "CardActions"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardActions,
  cardVariants,
}
