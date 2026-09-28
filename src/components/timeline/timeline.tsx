"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

const timelineVariants = cva(
  "relative w-full transition-all duration-500 ease-[var(--ease-premium)]",
  {
    variants: {
      variant: {
        default: "",
        minimal: "",
        dotted: "",
        "gradient-line": "",
      },
      orientation: {
        vertical: "",
        horizontal: "",
      },
      align: {
        left: "",
        right: "",
        center: "",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "vertical",
      align: "left",
    },
  }
)

export interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {
  children: React.ReactNode
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, variant, orientation, align, children, ...props }, ref) => {
    const lineClass = React.useMemo(() => {
      const base = "absolute z-0 transition-all duration-500 ease-[var(--ease-premium)]"
      if (orientation === "horizontal") {
        const y = "top-1/2 -translate-y-1/2"
        const lineStyle =
          variant === "dotted"
            ? "border-t-2 border-dashed border-[#253E38]/30 dark:border-[#A7CD0F]/30"
            : variant === "minimal"
            ? "h-px bg-border/80"
            : variant === "gradient-line"
            ? "h-1 rounded-full bg-gradient-to-r from-[#253E38] via-[#A7CD0F] to-[#FEB300] bg-[length:200%_200%] animate-gradient"
            : "h-0.5 bg-[#253E38]/20 dark:bg-[#A7CD0F]/20"
        return cn(base, "left-0 right-0", y, lineStyle)
      } else {
        const x =
          align === "right"
            ? "right-6"
            : align === "center"
            ? "left-1/2 -translate-x-1/2"
            : "left-6"
        const lineStyle =
          variant === "dotted"
            ? "border-l-2 border-dashed border-[#253E38]/30 dark:border-[#A7CD0F]/30"
            : variant === "minimal"
            ? "w-px bg-border/80"
            : variant === "gradient-line"
            ? "w-1 rounded-full bg-gradient-to-b from-[#253E38] via-[#A7CD0F] to-[#FEB300] bg-[length:100%_200%] animate-gradient"
            : "w-0.5 bg-[#253E38]/20 dark:bg-[#A7CD0F]/20"
        return cn(base, "top-0 bottom-0", x, lineStyle)
      }
    }, [variant, orientation, align])

    const layoutClass =
      orientation === "horizontal"
        ? "flex flex-row items-start overflow-x-auto py-4"
        : align === "center"
        ? "space-y-12"
        : "space-y-8"

    return (
      <div
        ref={ref}
        data-slot="timeline"
        className={cn(timelineVariants({ variant, orientation, align, className }), layoutClass)}
        {...props}
      >
        <div className={lineClass} aria-hidden="true" />
        {children}
      </div>
    )
  }
)
Timeline.displayName = "Timeline"

export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  index?: number
  orientation?: "vertical" | "horizontal"
  align?: "left" | "right" | "center"
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, children, index = 0, orientation = "vertical", align = "left", ...props }, ref) => {
    const localRef = React.useRef<HTMLDivElement>(null)
    const inView = useInView(localRef, { once: true, margin: "-50px" })

    React.useImperativeHandle(ref, () => localRef.current as HTMLDivElement)

    const staggerDelay = index * 0.1

    const itemClass =
      orientation === "horizontal"
        ? "relative flex-shrink-0 px-4 min-w-[240px] md:min-w-[280px] z-10"
        : align === "center"
        ? index % 2 === 0
          ? "relative w-1/2 pr-12 z-10"
          : "relative w-1/2 ml-auto pl-12 z-10"
        : align === "right"
        ? "relative pl-4 pr-16 z-10"
        : "relative pl-16 pr-4 z-10"

    return (
      <motion.div
        ref={localRef}
        data-slot="timeline-item"
        initial={{ opacity: 0, y: orientation === "horizontal" ? 20 : 30, x: orientation === "horizontal" ? 0 : align === "right" ? 20 : -20 }}
        animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
        transition={{ duration: 0.6, delay: staggerDelay, ease: [0.22, 1, 0.36, 1] }}
        className={cn(itemClass, className)}
        {...(props as any)}
      >
        {children}
      </motion.div>
    )
  }
)
TimelineItem.displayName = "TimelineItem"

export interface TimelineConnectorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal"
  align?: "left" | "right" | "center"
}

const TimelineConnector = React.forwardRef<HTMLDivElement, TimelineConnectorProps>(
  ({ className, orientation = "vertical", align = "left", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="timeline-connector"
        className={cn("hidden", className)}
        aria-hidden="true"
        {...props}
      />
    )
  }
)
TimelineConnector.displayName = "TimelineConnector"

const timelineDotVariants = cva(
  "absolute z-20 flex items-center justify-center rounded-full transition-all duration-500 ease-[var(--ease-premium)] will-change-transform",
  {
    variants: {
      status: {
        completed:
          "bg-[#253E38] text-white shadow-[0_4px_14px_-2px_rgba(37,62,56,0.5)] ring-4 ring-[#253E38]/15 dark:bg-[#A7CD0F] dark:text-[#101418] dark:ring-[#A7CD0F]/25 dark:shadow-[0_4px_14px_-2px_rgba(167,205,15,0.5)]",
        current:
          "bg-[#FEB300] text-[#101418] shadow-[0_4px_20px_-2px_rgba(254,179,0,0.6)] ring-4 ring-[#FEB300]/30 scale-110",
        pending:
          "bg-white dark:bg-[#1a2027] text-muted-foreground border-2 border-border shadow-sm ring-4 ring-transparent",
        error:
          "bg-destructive text-white shadow-[0_4px_14px_-2px_rgba(239,68,68,0.5)] ring-4 ring-destructive/20",
      },
      size: {
        sm: "size-7 [&>svg]:size-3.5",
        md: "size-10 [&>svg]:size-5",
        lg: "size-12 [&>svg]:size-6",
      },
    },
    defaultVariants: {
      status: "completed",
      size: "md",
    },
  }
)

export interface TimelineDotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineDotVariants> {
  icon?: React.ReactNode
  orientation?: "vertical" | "horizontal"
  align?: "left" | "right" | "center" | "top" | "bottom"
  itemIndex?: number
}

const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ className, status, size, icon, orientation = "vertical", align = "left", itemIndex = 0, ...props }, ref) => {
    const positionClass =
      orientation === "horizontal"
        ? (align as string) === "top"
          ? "top-0 left-1/2 -translate-x-1/2"
          : (align as string) === "bottom"
          ? "bottom-0 left-1/2 -translate-x-1/2"
          : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        : align === "center"
        ? itemIndex % 2 === 0
          ? "top-6 -right-5 md:-right-6"
          : "top-6 -left-5 md:-left-6"
        : align === "right"
        ? "top-6 right-0"
        : "top-6 left-0"

    return (
      <div
        ref={ref}
        data-slot="timeline-dot"
        className={cn(timelineDotVariants({ status, size, className }), positionClass)}
        {...props}
      >
        {status === "pending" && !icon ? (
          <div className="size-2 rounded-full bg-muted-foreground/50" />
        ) : (
          icon
        )}
      </div>
    )
  }
)
TimelineDot.displayName = "TimelineDot"

export interface TimelineContentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  date?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, date, title, description, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="timeline-content"
        className={cn(
          "group relative rounded-2xl border border-border/60 bg-card p-5 md:p-6 shadow-sm transition-all duration-500 ease-[var(--ease-premium)] hover:-translate-y-0.5 hover:shadow-lg hover:border-[#253E38]/20 dark:hover:border-[#A7CD0F]/20",
          className
        )}
        {...props}
      >
        {date && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#253E38]/8 dark:bg-[#A7CD0F]/12 px-3 py-1 text-[0.72rem] font-semibold text-[#253E38] dark:text-[#A7CD0F] tracking-tight mb-3">
            {date}
          </div>
        )}
        {title && (
          <h4 className="font-heading text-lg md:text-xl font-semibold tracking-tight text-foreground mb-2 transition-colors duration-500 group-hover:text-[#253E38] dark:group-hover:text-[#A7CD0F]">
            {title}
          </h4>
        )}
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </div>
    )
  }
)
TimelineContent.displayName = "TimelineContent"

export {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
  timelineVariants,
  timelineDotVariants,
}
