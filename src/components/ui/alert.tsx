import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "group/alert relative w-full rounded-2xl p-5 overflow-hidden transition-all duration-[500ms] ease-[var(--ease-premium)]",
  {
    variants: {
      variant: {
        default:
          "bg-card border border-border/60 text-card-foreground shadow-sm hover:shadow-md hover:border-[#253E38]/20",
        info:
          "bg-info/8 border-2 border-info/20 text-foreground shadow-[0_4px_16px_-4px_rgba(59,130,246,0.15)] hover:shadow-[0_8px_28px_-6px_rgba(59,130,246,0.25)] hover:border-info/40",
        success:
          "bg-success/8 border-2 border-success/25 text-foreground shadow-[0_4px_16px_-4px_rgba(16,185,129,0.15)] hover:shadow-[0_8px_28px_-6px_rgba(16,185,129,0.25)] hover:border-success/45",
        warning:
          "bg-warning/8 border-2 border-warning/25 text-foreground shadow-[0_4px_16px_-4px_rgba(245,158,11,0.15)] hover:shadow-[0_8px_28px_-6px_rgba(245,158,11,0.25)] hover:border-warning/45",
        destructive:
          "bg-destructive/8 border-2 border-destructive/25 text-foreground shadow-[0_4px_16px_-4px_rgba(239,68,68,0.15)] hover:shadow-[0_8px_28px_-6px_rgba(239,68,68,0.25)] hover:border-destructive/45",
        premium:
          "text-white shadow-[0_10px_40px_-10px_rgba(37,62,56,0.55)] hover:shadow-[0_20px_60px_-10px_rgba(37,62,56,0.75)] border-0 bg-[linear-gradient(135deg,#253E38_0%,#2e544c_35%,#3a5c54_65%,#A7CD0F_120%)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_60%)] before:transition-opacity before:duration-500 before:opacity-0 hover:before:opacity-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "role">,
    VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="alert"
      role={variant === "destructive" ? "alert" : variant === "success" ? "status" : undefined}
      aria-live={variant === "destructive" || variant === "warning" ? "assertive" : "polite"}
      className={cn(alertVariants({ variant, className }))}
      {...props}
    />
  )
)
Alert.displayName = "Alert"

const AlertIcon = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    data-slot="alert-icon"
    aria-hidden="true"
    className={cn(
      "inline-flex shrink-0 items-center justify-center rounded-xl h-11 w-11 transition-transform duration-500 ease-[var(--ease-premium)] group-hover/alert:scale-110 [&>svg]:size-6",
      className
    )}
    {...props}
  />
))
AlertIcon.displayName = "AlertIcon"

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    data-slot="alert-title"
    className={cn(
      "font-heading text-base font-semibold tracking-tight leading-tight",
      className
    )}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="alert-description"
    className={cn(
      "text-sm leading-relaxed opacity-90 mt-1",
      className
    )}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

const AlertAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert-action"
    className={cn(
      "ml-auto shrink-0 flex items-center gap-2 transition-all duration-500 ease-[var(--ease-premium)]",
      className
    )}
    {...props}
  />
))
AlertAction.displayName = "AlertAction"

export {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  AlertAction,
  alertVariants,
}
