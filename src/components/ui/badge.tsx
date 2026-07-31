import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-[400ms] ease-[var(--ease-premium)] select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[#253E38] text-white shadow-[0_2px_8px_-2px_rgba(37,62,56,0.5)] hover:bg-[#1e322e] hover:shadow-[0_4px_14px_-3px_rgba(37,62,56,0.6)]",
        secondary:
          "bg-[#A7CD0F] text-[#101418] shadow-[0_2px_8px_-2px_rgba(167,205,15,0.5)] hover:bg-[#89a80d] hover:shadow-[0_4px_14px_-3px_rgba(167,205,15,0.6)]",
        accent:
          "bg-[#FEB300] text-[#101418] shadow-[0_2px_8px_-2px_rgba(254,179,0,0.5)] hover:bg-[#d99700] hover:shadow-[0_4px_14px_-3px_rgba(254,179,0,0.6)]",
        success:
          "bg-success text-success-foreground shadow-[0_2px_8px_-2px_rgba(16,185,129,0.5)] hover:bg-success/90 hover:shadow-[0_4px_14px_-3px_rgba(16,185,129,0.6)]",
        warning:
          "bg-warning text-warning-foreground shadow-[0_2px_8px_-2px_rgba(245,158,11,0.5)] hover:bg-warning/90 hover:shadow-[0_4px_14px_-3px_rgba(245,158,11,0.6)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_2px_8px_-2px_rgba(239,68,68,0.5)] hover:bg-destructive/90 hover:shadow-[0_4px_14px_-3px_rgba(239,68,68,0.6)]",
        info:
          "bg-info text-info-foreground shadow-[0_2px_8px_-2px_rgba(59,130,246,0.5)] hover:bg-info/90 hover:shadow-[0_4px_14px_-3px_rgba(59,130,246,0.6)]",
        outline:
          "border-2 border-[#253E38]/30 bg-transparent text-[#253E38] hover:border-[#253E38] hover:bg-[#253E38]/5 dark:border-[#A7CD0F]/30 dark:text-[#A7CD0F] dark:hover:border-[#A7CD0F] dark:hover:bg-[#A7CD0F]/5",
        dot:
          "border border-border/60 bg-muted/50 text-foreground hover:bg-muted hover:border-border before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#253E38] before:mr-2 before:animate-pulse-soft dark:before:bg-[#A7CD0F]",
        glass:
          "backdrop-blur-xl bg-white/70 dark:bg-[#1a2027]/75 border border-white/40 dark:border-white/10 text-foreground shadow-[0_4px_16px_rgba(16,20,24,0.06)] hover:bg-white/85 dark:hover:bg-[#1a2027]/85 hover:shadow-[0_6px_24px_rgba(16,20,24,0.1)]",
      },
      size: {
        sm: "h-6 gap-1 rounded-lg px-2.5 text-[0.68rem] [&>svg]:size-3",
        md: "h-7.5 gap-1.5 rounded-xl px-3 text-xs [&>svg]:size-3.5",
        lg: "h-9 gap-2 rounded-2xl px-4 text-sm [&>svg]:size-4.5",
        pill: "h-8 gap-2 rounded-full px-4 text-xs [&>svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="badge"
      role="status"
      aria-label={props["aria-label"] ?? (typeof props.children === "string" ? `Badge: ${props.children}` : undefined)}
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  )
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
