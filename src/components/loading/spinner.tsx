"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

type SpinnerVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "dots"
  | "pulse"
  | "ring"
  | "gradient"
  | "bars";

type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

const spinnerSizes: Record<SpinnerSize, { w: string; h: string; border: string }> = {
  xs: { w: "w-3", h: "h-3", border: "border-[1.5px]" },
  sm: { w: "w-4", h: "h-4", border: "border-2" },
  md: { w: "w-6", h: "h-6", border: "border-2" },
  lg: { w: "w-10", h: "h-10", border: "border-3" },
  xl: { w: "w-14", h: "h-14", border: "border-4" },
};

const colorMap: Record<"primary" | "secondary" | "accent" | "foreground", string> = {
  primary: "#253E38",
  secondary: "#A7CD0F",
  accent: "#FEB300",
  foreground: "currentColor",
};

export interface SpinnerProps {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  className?: string;
  label?: string;
}

const EASE: readonly [number, number, number, number] = [0.22, 1, 0.36, 1];

const DualRingSpinner: React.FC<{ size: SpinnerSize; color: string; className?: string }> = ({
  size,
  color,
  className,
}) => {
  const s = spinnerSizes[size];
  return (
    <div className={cn("relative", s.w, s.h, className)} role="status" aria-label="loading">
      <div
        className={cn(
          "absolute inset-0 rounded-full border-solid border-transparent animate-spin",
          s.border
        )}
        style={{
          borderTopColor: color,
          borderRightColor: color,
          borderBottomColor: "transparent",
          borderLeftColor: color,
          animationDuration: "1s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      />
      <div
        className={cn(
          "absolute rounded-full border-solid border-transparent animate-spin",
          s.border
        )}
        style={{
          inset: size === "xs" || size === "sm" ? "2px" : "4px",
          borderTopColor: "transparent",
          borderRightColor: color,
          borderBottomColor: "transparent",
          borderLeftColor: "transparent",
          animationDuration: "1.5s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: "reverse",
        }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const DotsSpinner: React.FC<{ size: SpinnerSize; color: string; className?: string }> = ({
  size,
  color,
  className,
}) => {
  const scale: Record<SpinnerSize, string> = {
    xs: "scale-50",
    sm: "scale-75",
    md: "scale-100",
    lg: "scale-150",
    xl: "scale-200",
  };
  const dotSize = "w-2 h-2";
  return (
    <div className={cn("flex items-center gap-1", className)} role="status" aria-label="loading">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(dotSize, "rounded-full", scale[size])}
          style={{
            backgroundColor: color,
            animation: "spinner-bounce 1.4s ease-in-out infinite",
            animationDelay: `${i * 0.16}s`,
          }}
        />
      ))}
      <span className="sr-only">Loading...</span>
      <style>{`
        @keyframes spinner-bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const PulseSpinner: React.FC<{ size: SpinnerSize; color: string; className?: string }> = ({
  size,
  color,
  className,
}) => {
  const s = spinnerSizes[size];
  return (
    <div className={cn("relative", s.w, s.h, className)} role="status" aria-label="loading">
      <div
        className={cn("absolute inset-0 rounded-full")}
        style={{
          backgroundColor: color,
          animation: "spinner-pulse 1.2s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        }}
      />
      <span className="sr-only">Loading...</span>
      <style>{`
        @keyframes spinner-pulse {
          0% { transform: scale(0.3); opacity: 1; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const RingSpinner: React.FC<{ size: SpinnerSize; color: string; className?: string }> = ({
  size,
  color,
  className,
}) => {
  const s = spinnerSizes[size];
  return (
    <div
      className={cn("rounded-full border-solid border-transparent", s.w, s.h, s.border, className)}
      role="status"
      aria-label="loading"
      style={{
        borderTopColor: color,
        animation: "spinner-ring 0.8s linear infinite",
      }}
    >
      <span className="sr-only">Loading...</span>
      <style>{`
        @keyframes spinner-ring {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const GradientSpinner: React.FC<{ size: SpinnerSize; className?: string }> = ({
  size,
  className,
}) => {
  const s = spinnerSizes[size];
  return (
    <div className={cn("relative", s.w, s.h, className)} role="status" aria-label="loading">
      <div
        className={cn("absolute inset-0 rounded-full")}
        style={{
          background:
            "conic-gradient(from 0deg, #253E38, #A7CD0F, #FEB300, #253E38)",
          animation: "spinner-gradient 1.2s linear infinite",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))",
        }}
      />
      <span className="sr-only">Loading...</span>
      <style>{`
        @keyframes spinner-gradient {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const BarsSpinner: React.FC<{ size: SpinnerSize; color: string; className?: string }> = ({
  size,
  color,
  className,
}) => {
  const heights: Record<SpinnerSize, string> = {
    xs: "h-4",
    sm: "h-5",
    md: "h-7",
    lg: "h-10",
    xl: "h-14",
  };
  const widths: Record<SpinnerSize, string> = {
    xs: "w-0.5",
    sm: "w-1",
    md: "w-1.5",
    lg: "w-2",
    xl: "w-3",
  };
  return (
    <div
      className={cn("flex items-center gap-1 justify-center", heights[size], className)}
      role="status"
      aria-label="loading"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={cn("rounded-full", widths[size], "bg-current")}
          style={{
            backgroundColor: color,
            animation: "spinner-bars 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
            height: "100%",
          }}
        />
      ))}
      <span className="sr-only">Loading...</span>
      <style>{`
        @keyframes spinner-bars {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
};

export function Spinner({
  variant = "default",
  size = "md",
  className,
  label,
}: SpinnerProps) {
  let color = colorMap.foreground;
  if (variant === "primary") color = colorMap.primary;
  else if (variant === "secondary") color = colorMap.secondary;
  else if (variant === "accent") color = colorMap.accent;

  let spinnerEl: React.ReactNode = null;

  switch (variant) {
    case "dots":
      spinnerEl = <DotsSpinner size={size} color={color} className={className} />;
      break;
    case "pulse":
      spinnerEl = <PulseSpinner size={size} color={color} className={className} />;
      break;
    case "ring":
    case "primary":
    case "secondary":
    case "accent":
    case "default":
      if (variant === "default") {
        spinnerEl = <DualRingSpinner size={size} color={color} className={className} />;
      } else {
        spinnerEl = <RingSpinner size={size} color={color} className={className} />;
      }
      break;
    case "gradient":
      spinnerEl = <GradientSpinner size={size} className={className} />;
      break;
    case "bars":
      spinnerEl = <BarsSpinner size={size} color={color} className={className} />;
      break;
  }

  if (label) {
    return (
      <div className="flex items-center gap-3">
        {spinnerEl}
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    );
  }

  return spinnerEl;
}

export interface LoadingOverlayProps {
  visible: boolean;
  text?: string;
  spinnerVariant?: SpinnerVariant;
  spinnerSize?: SpinnerSize;
  className?: string;
  blurLevel?: "sm" | "md" | "lg";
}

const blurClassMap: Record<NonNullable<LoadingOverlayProps["blurLevel"]>, string> = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-xl",
};

export function LoadingOverlay({
  visible,
  text = "Chargement...",
  spinnerVariant = "gradient",
  spinnerSize = "lg",
  className,
  blurLevel = "md",
}: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 bg-background/60",
        blurClassMap[blurLevel],
        className
      )}
      role="dialog"
      aria-modal="true"
      aria-label={text}
    >
      <Spinner variant={spinnerVariant} size={spinnerSize} />
      {text && (
        <p className="text-sm font-medium text-foreground/80 animate-pulse">{text}</p>
      )}
    </div>
  );
}

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  spinnerVariant?: SpinnerVariant;
  spinnerSize?: SpinnerSize;
}

export const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      className,
      children,
      loading = false,
      disabled,
      spinnerVariant,
      spinnerSize = "sm",
      variant = "primary",
      ...props
    },
    ref
  ) => {
    const resolvedVariant: SpinnerVariant = spinnerVariant
      ? spinnerVariant
      : (variant === "primary"
          ? "primary"
          : variant === "secondary"
          ? "secondary"
          : variant === "accent"
          ? "accent"
          : "default");

    return (
      <Button
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        disabled={disabled || loading}
        variant={variant}
        {...props}
      >
        <span
          className={cn(
            "inline-flex items-center gap-2 transition-all duration-300",
            loading ? "opacity-0 scale-95" : "opacity-100 scale-100"
          )}
          style={{ transitionTimingFunction: `cubic-bezier(${EASE.join(", ")})` }}
        >
          {children}
        </span>
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner
              variant={resolvedVariant}
              size={spinnerSize}
              className={variant !== "ghost" ? "text-white" : ""}
            />
          </span>
        )}
      </Button>
    );
  }
);
LoadingButton.displayName = "LoadingButton";
