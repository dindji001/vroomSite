"use client";

import * as React from "react";
import { motion, useInView, useAnimation, useScroll, useTransform, Variants } from "framer-motion";

// Fade In Animation
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  className?: string;
  once?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 40,
  className = "",
  once = true,
}: FadeInProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? distance : direction === "right" ? -distance : 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Scale In Animation
interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  from?: number;
  to?: number;
  className?: string;
  once?: boolean;
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.5,
  from = 0.9,
  to = 1,
  className = "",
  once = true,
}: ScaleInProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const variants: Variants = {
    hidden: { scale: from, opacity: 0 },
    visible: {
      scale: to,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Rotate In Animation
interface RotateInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  from?: number;
  to?: number;
  className?: string;
  once?: boolean;
}

export function RotateIn({
  children,
  delay = 0,
  duration = 0.6,
  from = -10,
  to = 0,
  className = "",
  once = true,
}: RotateInProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const variants: Variants = {
    hidden: { rotate: from, opacity: 0 },
    visible: {
      rotate: to,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Reveal Animation (clip-path)
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  once?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  direction = "up",
  className = "",
  once = true,
}: RevealProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const clipPaths = {
    up: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
    down: "polygon(0 0, 100% 0, 100% 0, 0 0)",
    left: "polygon(100% 0, 100% 100%, 100% 100%, 100% 0)",
    right: "polygon(0 0, 0 100%, 0 100%, 0 0)",
  };

  const visibleClipPaths = {
    up: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    down: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    left: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    right: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  };

  const variants: Variants = {
    hidden: {
      clipPath: clipPaths[direction],
      opacity: 0,
    },
    visible: {
      clipPath: visibleClipPaths[direction],
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger Children Animation
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = "",
  once = true,
}: StaggerContainerProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants}>{child}</motion.div>
      ))}
    </motion.div>
  );
}

// Parallax Component
interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.5, className = "" }: ParallaxProps) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// Counter Animation
interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
  className?: string;
  once?: boolean;
  suffix?: string;
  prefix?: string;
}

export function Counter({
  from,
  to,
  duration = 2,
  delay = 0,
  className = "",
  once = true,
  suffix = "",
  prefix = "",
}: CounterProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const [count, setCount] = React.useState(from);

  React.useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = from + (to - from) * easeOutQuart;
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timeoutId);
  }, [isInView, from, to, duration, delay]);

  return (
    <div ref={ref} className={className}>
      {prefix}{Math.round(count).toLocaleString()}{suffix}
    </div>
  );
}

// Hover Card Effect
interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  lift?: number;
  scale?: number;
}

export function HoverCard({ children, className = "", lift = 8, scale = 1.02 }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ y: -lift, scale }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Magnetic Button Effect
interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticButton({ children, strength = 30, className = "" }: MagneticButtonProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setPosition({
      x: x * strength / 100,
      y: y * strength / 100,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Text Reveal Animation
interface TextRevealProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function TextReveal({
  text,
  delay = 0,
  duration = 0.05,
  className = "",
  once = true,
}: TextRevealProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay * i },
    }),
  };

  const childVariants: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Export all components

// Additional components for backward compatibility
export function MotionDiv({ children, className = "", ...props }: any) {
  return <motion.div className={className} {...props}>{children}</motion.div>;
}

export function MotionNav({ children, className = "", ...props }: any) {
  return <motion.nav className={className} {...props}>{children}</motion.nav>;
}

export function staggerItem({ children, className = "", ...props }: any) {
  return <motion.div className={className} {...props}>{children}</motion.div>;
}

export function slideUp({ children, className = "", ...props }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Export StaggerContainer as staggerContainer for backward compatibility
export { StaggerContainer as staggerContainer };
