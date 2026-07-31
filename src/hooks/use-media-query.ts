"use client";

import * as React from "react";
import { useUIStore } from "@/store/ui-store";

export function useMediaQuery(query: string, defaultMatches = false): boolean {
  const getInitial = () => {
    if (typeof window === "undefined") return defaultMatches;
    return window.matchMedia(query).matches;
  };
  const [matches, setMatches] = React.useState<boolean>(getInitial);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    setMatches(mql.matches);
    if (mql.addEventListener) mql.addEventListener("change", listener);
    else mql.addListener(listener);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", listener);
      else mql.removeListener(listener);
    };
  }, [query]);
  return matches;
}

export function useIsMobile(breakpoint = 768): boolean {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
}

export function useIsTablet(min = 768, max = 1023): boolean {
  return useMediaQuery(`(min-width: ${min}px) and (max-width: ${max}px)`);
}

export function useIsDesktop(breakpoint = 1024): boolean {
  return useMediaQuery(`(min-width: ${breakpoint}px)`);
}

export function useIsTouch(): boolean {
  return useMediaQuery("(hover: none) and (pointer: coarse)");
}

export function usePrefersReducedMotion(): boolean {
  const prefers = useMediaQuery("(prefers-reduced-motion: reduce)", false);
  const { ui } = useUIStore();
  return prefers || ui.reducedMotion;
}

export function usePrefersColorScheme(): "light" | "dark" {
  const light = useMediaQuery("(prefers-color-scheme: light)", false);
  return light ? "light" : "dark";
}

export function useViewport() {
  const [dim, setDim] = React.useState(() => ({
    width: typeof window === "undefined" ? 1280 : window.innerWidth,
    height: typeof window === "undefined" ? 800 : window.innerHeight,
  }));
  React.useEffect(() => {
    const handler = () =>
      setDim({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handler);
    window.addEventListener("orientationchange", handler);
    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("orientationchange", handler);
    };
  }, []);
  return {
    ...dim,
    sm: dim.width >= 640,
    md: dim.width >= 768,
    lg: dim.width >= 1024,
    xl: dim.width >= 1280,
    xxl: dim.width >= 1536,
  };
}
