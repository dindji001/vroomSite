import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button btn-hover-shine inline-flex shrink-0 items-center justify-center font-semibold whitespace-nowrap select-none outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50 transition-all duration-[400ms] ease-[var(--ease-premium)] will-change-transform [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[#253E38] text-white shadow-[0_4px_14px_-4px_rgba(37,62,56,0.45)] hover:bg-[#1e322e] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgba(37,62,56,0.55)] active:translate-y-0 focus-visible:ring-[#253E38]/30",
        secondary:
          "bg-[#A7CD0F] text-[#101418] shadow-[0_4px_14px_-4px_rgba(167,205,15,0.45)] hover:bg-[#89a80d] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgba(167,205,15,0.55)] active:translate-y-0 focus-visible:ring-[#A7CD0F]/40",
        accent:
          "bg-[#FEB300] text-[#101418] shadow-[0_4px_14px_-4px_rgba(254,179,0,0.45)] hover:bg-[#d99700] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgba(254,179,0,0.55)] active:translate-y-0 focus-visible:ring-[#FEB300]/40",
        outline:
          "border-2 border-border bg-background text-foreground hover:border-[#253E38] hover:bg-[#253E38]/5 hover:text-[#253E38] hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-[#253E38]/20 dark:border-input dark:hover:border-[#A7CD0F] dark:hover:bg-[#A7CD0F]/5 dark:hover:text-[#A7CD0F]",
        ghost:
          "text-foreground hover:bg-muted hover:text-[#253E38] hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-[#253E38]/15 dark:hover:text-[#A7CD0F]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_4px_14px_-4px_rgba(239,68,68,0.45)] hover:bg-destructive/90 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgba(239,68,68,0.55)] active:translate-y-0 focus-visible:ring-destructive/30",
        glass:
          "backdrop-blur-xl bg-white/70 dark:bg-[#1a2027]/70 text-foreground border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(16,20,24,0.06)] hover:bg-white/85 dark:hover:bg-[#1a2027]/85 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(16,20,24,0.1)] active:translate-y-0 focus-visible:ring-[#253E38]/20",
      },
      size: {
        xs: "h-7 gap-1.5 rounded-md px-2.5 text-xs tracking-tight [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-9 gap-2 rounded-lg px-3.5 text-sm [&_svg:not([class*='size-'])]:size-4",
        md: "h-11 gap-2.5 rounded-xl px-5 text-base [&_svg:not([class*='size-'])]:size-5",
        lg: "h-14 gap-3 rounded-2xl px-7 text-lg [&_svg:not([class*='size-'])]:size-6",
        xl: "h-16 gap-3.5 rounded-[1.25rem] px-9 text-xl [&_svg:not([class*='size-'])]:size-7",
        icon: "h-11 w-11 rounded-xl [&_svg:not([class*='size-'])]:size-5",
        "icon-sm": "h-9 w-9 rounded-lg [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "h-14 w-14 rounded-2xl [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-slot="button"
        aria-label={props["aria-label"] ?? (typeof props.children === "string" ? props.children : undefined)}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
