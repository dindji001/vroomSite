"use client";

import * as React from "react";
import {
  motion,
  useAnimationFrame,
  useInView as fmUseInView,
  useScroll,
  useSpring,
  useTransform,
  type MotionProps,
  type Transition,
} from "framer-motion";
import { cn } from "@/lib/utils";

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

const DEFAULT_TRANSITION: Transition = {
  duration: 0.6,
  ease: EASE,
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: DEFAULT_TRANSITION,
  },
};

export const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: DEFAULT_TRANSITION,
  },
};

export const slideDown = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: DEFAULT_TRANSITION,
  },
};

export const slideLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: DEFAULT_TRANSITION,
  },
};

export const slideRight = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: DEFAULT_TRANSITION,
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ...DEFAULT_TRANSITION,
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const staggerItem = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...DEFAULT_TRANSITION,
      delay,
    },
  },
});

export const textReveal = {
  hidden: {
    opacity: 0,
    y: 30,
    rotateX: -90,
    skewY: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    skewY: 0,
    transition: {
      ...DEFAULT_TRANSITION,
      duration: 0.8,
    },
  },
};

export const parallax = (speed: number = 0.5) => ({
  hidden: {},
  visible: {},
  speed,
});

export function useInViewScroll(
  options: {
    threshold?: number;
    triggerOnce?: boolean;
    initial?: MotionProps["initial"];
    whileInView?: MotionProps["whileInView"];
    viewport?: { once?: boolean; margin?: string; amount?: number | "some" | "all" | "any" };
  } = {}
) {
  const {
    threshold = 0.2,
    triggerOnce = true,
    initial = "hidden",
    whileInView = "visible",
    viewport,
  } = options;

  const ref = React.useRef<HTMLElement>(null);
  const inView = fmUseInView(ref, {
    once: triggerOnce,
    amount: threshold,
    ...viewport,
  });

  return {
    ref,
    inView,
    initial,
    whileInView,
    viewport: {
      once: triggerOnce,
      amount: threshold,
      ...viewport,
    },
  };
}

interface MotionWrapperProps extends MotionProps {
  className?: string;
  children?: React.ReactNode;
}

const baseMotionProps: MotionProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.2 },
  transition: DEFAULT_TRANSITION,
};

export const MotionDiv = React.forwardRef<HTMLDivElement, MotionWrapperProps>(
  ({ className, variants, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={variants || fadeIn}
      {...baseMotionProps}
      {...props}
    />
  )
);
MotionDiv.displayName = "MotionDiv";

export const MotionSection = React.forwardRef<HTMLElement, MotionWrapperProps>(
  ({ className, variants, ...props }, ref) => (
    <motion.section
      ref={ref}
      className={cn(className)}
      variants={variants || fadeIn}
      {...baseMotionProps}
      {...props}
    />
  )
);
MotionSection.displayName = "MotionSection";

export const MotionArticle = React.forwardRef<HTMLElement, MotionWrapperProps>(
  ({ className, variants, ...props }, ref) => (
    <motion.article
      ref={ref}
      className={cn(className)}
      variants={variants || fadeIn}
      {...baseMotionProps}
      {...props}
    />
  )
);
MotionArticle.displayName = "MotionArticle";

export const MotionHeader = React.forwardRef<HTMLElement, MotionWrapperProps>(
  ({ className, variants, ...props }, ref) => (
    <motion.header
      ref={ref}
      className={cn(className)}
      variants={variants || fadeIn}
      {...baseMotionProps}
      {...props}
    />
  )
);
MotionHeader.displayName = "MotionHeader";

export const MotionNav = React.forwardRef<HTMLElement, MotionWrapperProps>(
  ({ className, variants, ...props }, ref) => (
    <motion.nav
      ref={ref}
      className={cn(className)}
      variants={variants || fadeIn}
      {...baseMotionProps}
      {...props}
    />
  )
);
MotionNav.displayName = "MotionNav";

export const MotionSpan = React.forwardRef<HTMLSpanElement, MotionWrapperProps>(
  ({ className, variants, ...props }, ref) => (
    <motion.span
      ref={ref}
      className={cn(className)}
      variants={variants || fadeIn}
      {...baseMotionProps}
      {...props}
    />
  )
);
MotionSpan.displayName = "MotionSpan";

export const MotionH1 = React.forwardRef<HTMLHeadingElement, MotionWrapperProps>(
  ({ className, variants, ...props }, ref) => (
    <motion.h1
      ref={ref}
      className={cn(className)}
      variants={variants || slideUp}
      {...baseMotionProps}
      {...props}
    />
  )
);
MotionH1.displayName = "MotionH1";

export const MotionH2 = React.forwardRef<HTMLHeadingElement, MotionWrapperProps>(
  ({ className, variants, ...props }, ref) => (
    <motion.h2
      ref={ref}
      className={cn(className)}
      variants={variants || slideUp}
      {...baseMotionProps}
      {...props}
    />
  )
);
MotionH2.displayName = "MotionH2";

export const MotionH3 = React.forwardRef<HTMLHeadingElement, MotionWrapperProps>(
  ({ className, variants, ...props }, ref) => (
    <motion.h3
      ref={ref}
      className={cn(className)}
      variants={variants || slideUp}
      {...baseMotionProps}
      {...props}
    />
  )
);
MotionH3.displayName = "MotionH3";

export const MotionP = React.forwardRef<HTMLParagraphElement, MotionWrapperProps>(
  ({ className, variants, ...props }, ref) => (
    <motion.p
      ref={ref}
      className={cn(className)}
      variants={variants || fadeIn}
      {...baseMotionProps}
      {...props}
    />
  )
);
MotionP.displayName = "MotionP";

export const MotionImg = React.forwardRef<HTMLImageElement, MotionWrapperProps & React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, variants, src, alt, ...props }, ref) => (
    <motion.img
      ref={ref}
      src={src}
      alt={alt || ""}
      className={cn(className)}
      variants={variants || scaleIn}
      {...baseMotionProps}
      {...props}
    />
  )
);
MotionImg.displayName = "MotionImg";
