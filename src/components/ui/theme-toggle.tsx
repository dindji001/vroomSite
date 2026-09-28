"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Monitor, Palette } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

type ThemeIconProps = React.HTMLAttributes<HTMLSpanElement> & {
  size?: number
}

const SunIcon = React.forwardRef<HTMLSpanElement, ThemeIconProps>(
  ({ className, size = 20, ...props }, ref) => (
    <span ref={ref} className={cn("inline-flex items-center justify-center", className)} {...props}>
      <Sun style={{ width: size, height: size }} />
    </span>
  )
)
SunIcon.displayName = "SunIcon"

const MoonIcon = React.forwardRef<HTMLSpanElement, ThemeIconProps>(
  ({ className, size = 20, ...props }, ref) => (
    <span ref={ref} className={cn("inline-flex items-center justify-center", className)} {...props}>
      <Moon style={{ width: size, height: size }} />
    </span>
  )
)
MoonIcon.displayName = "MoonIcon"

const MonitorIcon = React.forwardRef<HTMLSpanElement, ThemeIconProps>(
  ({ className, size = 20, ...props }, ref) => (
    <span ref={ref} className={cn("inline-flex items-center justify-center", className)} {...props}>
      <Monitor style={{ width: size, height: size }} />
    </span>
  )
)
MonitorIcon.displayName = "MonitorIcon"

export interface ThemeToggleProps extends Omit<ButtonProps, "variant" | "size"> {
  variant?: "icon" | "button" | "switch" | "menu"
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, variant = "icon", size = "md", showLabel = false, ...props }, ref) => {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
      setMounted(true)
    }, [])

    const currentTheme = mounted ? (resolvedTheme as "light" | "dark" | undefined) : undefined
    const isDark = currentTheme === "dark"

    const sizeConfig = {
      sm: { btn: "size-8", icon: 16 },
      md: { btn: "size-11", icon: 20 },
      lg: { btn: "size-14", icon: 24 },
    }

    if (variant === "switch") {
      return (
        <button
          ref={ref}
          type="button"
          aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={cn(
            "relative inline-flex items-center rounded-full border border-border/60 bg-card transition-all duration-500 ease-[var(--ease-premium)] hover:border-[#253E38]/30 dark:hover:border-[#A7CD0F]/30 shadow-sm hover:shadow-md",
            size === "sm" && "h-7 w-14",
            size === "md" && "h-8 w-16",
            size === "lg" && "h-10 w-20",
            className
          )}
          {...props}
        >
          <span className="sr-only">Toggle theme</span>
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={String(isDark)}
              initial={{ x: isDark ? "-100%" : "0%", opacity: 0 }}
              animate={{ x: isDark ? "calc(100% - 2px)" : "2px", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 rounded-full shadow-md flex items-center justify-center",
                isDark
                  ? "bg-[linear-gradient(135deg,#253E38,#1e322e)] text-white"
                  : "bg-[linear-gradient(135deg,#FEB300,#fec54d)] text-[#101418]",
                size === "sm" && "size-5",
                size === "md" && "size-6",
                size === "lg" && "size-8"
              )}
            >
              {isDark ? (
                <Moon style={{ width: sizeConfig[size].icon * 0.6, height: sizeConfig[size].icon * 0.6 }} />
              ) : (
                <Sun style={{ width: sizeConfig[size].icon * 0.6, height: sizeConfig[size].icon * 0.6 }} />
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      )
    }

    if (variant === "menu") {
      return (
        <div
          ref={ref as unknown as React.RefObject<HTMLDivElement>}
          className={cn(
            "inline-flex items-center gap-1 rounded-2xl border border-border/60 bg-card p-1 shadow-sm",
            className
          )}
          role="radiogroup"
          aria-label="Sélection du thème"
        >
          {[
            { value: "light", Icon: SunIcon, label: "Clair" },
            { value: "system", Icon: MonitorIcon, label: "Système" },
            { value: "dark", Icon: MoonIcon, label: "Sombre" },
          ].map(({ value, Icon, label }) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={theme === value}
              aria-label={`Thème ${label}`}
              onClick={() => setTheme(value)}
              className={cn(
                "relative inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-400 ease-[var(--ease-premium)]",
                theme === value
                  ? "bg-[#253E38] text-white shadow-[0_4px_14px_-4px_rgba(37,62,56,0.45)] dark:bg-[#A7CD0F] dark:text-[#101418] dark:shadow-[0_4px_14px_-4px_rgba(167,205,15,0.45)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon size={sizeConfig[size].icon * 0.85} />
              {showLabel && <span>{label}</span>}
            </button>
          ))}
        </div>
      )
    }

    const buttonSize = variant === "button" ? size : ("icon" as const)

    return (
      <Button
        ref={ref}
        variant={variant === "button" ? "outline" : "glass"}
        size={variant === "button" ? size : (size === "sm" ? "icon-sm" : size === "lg" ? "icon-lg" : "icon")}
        aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={cn(
          variant === "icon" && sizeConfig[size].btn,
          className
        )}
        {...props}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={String(isDark)}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="inline-flex items-center justify-center"
          >
            {isDark ? (
              <Sun style={{ width: sizeConfig[size].icon, height: sizeConfig[size].icon }} />
            ) : (
              <Moon style={{ width: sizeConfig[size].icon, height: sizeConfig[size].icon }} />
            )}
          </motion.span>
        </AnimatePresence>
        {variant === "button" && showLabel && (
          <span className="ml-2">{isDark ? "Clair" : "Sombre"}</span>
        )}
      </Button>
    )
  }
)
ThemeToggle.displayName = "ThemeToggle"

export { ThemeToggle }
