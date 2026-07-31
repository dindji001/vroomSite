"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

const EASE: readonly [number, number, number, number] = [0.22, 1, 0.36, 1];

function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const check =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(check);
  }, []);

  return isTouch;
}

interface HoverCardProps extends MotionProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  maxTilt?: number;
  scale?: number;
}

export const HoverCard = React.forwardRef<HTMLDivElement, HoverCardProps>(
  (
    {
      children,
      className,
      disabled = false,
      maxTilt = 10,
      scale = 1.02,
      ...props
    },
    ref
  ) => {
    const isTouch = useIsTouchDevice();
    const effDisabled = disabled || isTouch;

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const ySpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const rotateX = useTransform(
      ySpring,
      [-0.5, 0.5],
      [maxTilt, -maxTilt]
    );
    const rotateY = useTransform(
      xSpring,
      [-0.5, 0.5],
      [-maxTilt, maxTilt]
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (effDisabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      x.set(px - 0.5);
      y.set(py - 0.5);
    };

    const handleMouseLeave = () => {
      if (effDisabled) return;
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative perspective-[1000px] transform-style-preserve-3d",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
        }}
        whileHover={
          effDisabled ? undefined : { scale, transition: { ease: EASE, duration: 0.4 } }
        }
        transition={{ ease: EASE, duration: 0.4 }}
        {...props}
      >
        <motion.div
          style={{
            rotateX: effDisabled ? 0 : rotateX,
            rotateY: effDisabled ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          transition={{ ease: EASE }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }
);
HoverCard.displayName = "HoverCard";

interface HoverGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  color?: string;
  size?: number;
  opacity?: number;
}

export const HoverGlow = React.forwardRef<HTMLDivElement, HoverGlowProps>(
  (
    {
      children,
      className,
      disabled = false,
      color = "#253E38",
      size = 400,
      opacity = 0.15,
      style,
      ...props
    },
    ref
  ) => {
    const isTouch = useIsTouchDevice();
    const effDisabled = disabled || isTouch;

    const [isHovered, setIsHovered] = React.useState(false);
    const [pos, setPos] = React.useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (effDisabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      setPos({ x: px, y: py });
    };

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => !effDisabled && setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setPos({ x: 50, y: 50 });
        }}
        style={style}
        {...props}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered && !effDisabled ? 1 : 0 }}
          transition={{ ease: EASE, duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, ${color} 0%, transparent ${size / 8}px)`,
            opacity,
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);
HoverGlow.displayName = "HoverGlow";

interface HoverBorderGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  colors?: string[];
  speed?: number;
  thickness?: number;
}

export const HoverBorderGradient = React.forwardRef<HTMLDivElement, HoverBorderGradientProps>(
  (
    {
      children,
      className,
      disabled = false,
      colors = ["#253E38", "#A7CD0F", "#FEB300"],
      speed = 4,
      thickness = 2,
      style,
      ...props
    },
    ref
  ) => {
    const isTouch = useIsTouchDevice();
    const effDisabled = disabled || isTouch;

    const [isHovered, setIsHovered] = React.useState(false);
    const [pos, setPos] = React.useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (effDisabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      setPos({ x: px, y: py });
    };

    const gradientStr = colors.join(", ");

    return (
      <div
        ref={ref}
        className={cn("relative rounded-[inherit]", className)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => !effDisabled && setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setPos({ x: 50, y: 50 });
        }}
        style={style}
        {...props}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered && !effDisabled ? 1 : 0 }}
          transition={{ ease: EASE, duration: 0.3 }}
          style={{
            padding: thickness,
            background: `conic-gradient(from 0deg at ${pos.x}% ${pos.y}%, ${gradientStr})`,
            animation: isHovered && !effDisabled ? `spin ${speed}s linear infinite` : undefined,
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          }}
        />
        {children}
      </div>
    );
  }
);
HoverBorderGradient.displayName = "HoverBorderGradient";

interface HoverRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  reveal: React.ReactNode;
  className?: string;
  disabled?: boolean;
  direction?: "top" | "bottom" | "left" | "right";
  overlay?: boolean;
}

export const HoverReveal = React.forwardRef<HTMLDivElement, HoverRevealProps>(
  (
    {
      children,
      reveal,
      className,
      disabled = false,
      direction = "bottom",
      overlay = true,
      style,
      ...props
    },
    ref
  ) => {
    const isTouch = useIsTouchDevice();
    const effDisabled = disabled || isTouch;

    const getDirectionTransform = (hidden: boolean) => {
      const val = hidden ? "100%" : "0%";
      switch (direction) {
        case "top":
          return { y: `-${val}`, x: "0%" };
        case "bottom":
          return { y: val, x: "0%" };
        case "left":
          return { x: `-${val}`, y: "0%" };
        case "right":
          return { x: val, y: "0%" };
      }
    };

    return (
      <div
        ref={ref}
        className={cn("group relative overflow-hidden", className)}
        style={style}
        {...props}
      >
        {children}
        <motion.div
          className={cn(
            "absolute inset-0 z-10 flex items-center justify-center",
            overlay ? "bg-black/50" : "bg-transparent"
          )}
          initial={{ opacity: 0, ...getDirectionTransform(true) }}
          whileHover={
            effDisabled
              ? undefined
              : { opacity: 1, ...getDirectionTransform(false) }
          }
          transition={{ ease: EASE, duration: 0.4 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={effDisabled ? undefined : { opacity: 1, y: 0 }}
            transition={{ ease: EASE, duration: 0.4, delay: 0.1 }}
          >
            {reveal}
          </motion.div>
        </motion.div>
      </div>
    );
  }
);
HoverReveal.displayName = "HoverReveal";

interface HoverScaleProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  scale?: number;
  shadowIntensity?: "none" | "sm" | "md" | "lg" | "xl";
}

const shadowMap: Record<NonNullable<HoverScaleProps["shadowIntensity"]>, string> = {
  none: "",
  sm: "hover:shadow-lg",
  md: "hover:shadow-xl",
  lg: "hover:shadow-2xl",
  xl: "hover:shadow-[0_25px_50px_-12px_rgba(37,62,56,0.25)]",
};

export const HoverScale = React.forwardRef<HTMLDivElement, HoverScaleProps>(
  (
    {
      children,
      className,
      disabled = false,
      scale = 1.04,
      shadowIntensity = "md",
      style,
      ...props
    },
    ref
  ) => {
    const isTouch = useIsTouchDevice();
    const effDisabled = disabled || isTouch;

    return (
      <motion.div
        ref={ref}
        className={cn(
          "will-change-transform",
          shadowMap[shadowIntensity],
          className
        )}
        whileHover={effDisabled ? undefined : { scale, y: -4 }}
        transition={{ ease: EASE, duration: 0.4 }}
        style={style}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
HoverScale.displayName = "HoverScale";
