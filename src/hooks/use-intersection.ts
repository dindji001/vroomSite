"use client";

import * as React from "react";

export function useIntersectionObserver<T extends Element>(
  options: IntersectionObserverInit = { threshold: 0 }
): [React.RefCallback<T>, IntersectionObserverEntry | null] {
  const [entry, setEntry] = React.useState<IntersectionObserverEntry | null>(null);
  const ref = React.useCallback(
    (node: T | null) => {
      if (!node) return;
      if (typeof IntersectionObserver === "undefined") return;
      const observer = new IntersectionObserver(
        ([entry_]) => setEntry(entry_),
        options
      );
      observer.observe(node);
    },
    [options.root, options.rootMargin, options.threshold]
  );
  return [ref, entry];
}

export function useInView<T extends Element>(
  options: IntersectionObserverInit = { threshold: 0.2 },
  once = true
): [React.RefCallback<T>, boolean, IntersectionObserverEntry | null] {
  const [inView, setInView] = React.useState(false);
  const [entry, setEntry] = React.useState<IntersectionObserverEntry | null>(null);
  const triggered = React.useRef(false);
  const ref = React.useCallback(
    (node: T | null) => {
      if (!node) return;
      if (typeof IntersectionObserver === "undefined") {
        setInView(true);
        return;
      }
      const observer = new IntersectionObserver(([entry_]) => {
        setEntry(entry_);
        const visible = entry_.isIntersecting;
        if (visible) {
          if (once) {
            if (!triggered.current) {
              triggered.current = true;
              setInView(true);
              observer.disconnect();
            }
          } else {
            setInView(true);
          }
        } else if (!once) {
          setInView(false);
        }
      }, options);
      observer.observe(node);
    },
    [once, options.root, options.rootMargin, options.threshold]
  );
  return [ref, inView, entry];
}

export function useStickyHeader(threshold = 24): boolean {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    let frame = 0;
    const listener = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(onScroll);
    };
    window.addEventListener("scroll", listener, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", listener);
    };
  }, [threshold]);
  return scrolled;
}

export function useScrollDirection(
  threshold = 8
): { up: boolean; down: boolean; y: number } {
  const [state, setState] = React.useState({ up: false, down: false, y: 0 });
  const last = React.useRef(0);
  const ticking = React.useRef(0);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    last.current = window.scrollY;
    const handler = () => {
      if (ticking.current) return;
      ticking.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - last.current;
        if (Math.abs(delta) > threshold) {
          setState({
            up: delta < 0,
            down: delta > 0,
            y,
          });
          last.current = y;
        } else {
          setState((s) => ({ ...s, y }));
        }
        ticking.current = 0;
      });
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return state;
}

export function useDocumentScroll(): { x: number; y: number; progress: number } {
  const [pos, setPos] = React.useState({ x: 0, y: 0, progress: 0 });
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const update = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const x = window.scrollX || document.documentElement.scrollLeft || 0;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setPos({
        x,
        y,
        progress: docHeight > 0 ? Math.min(1, Math.max(0, y / docHeight)) : 0,
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return pos;
}

export function useElementSize<T extends Element>(): [React.RefCallback<T>, { width: number; height: number }] {
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  const ref = React.useCallback(
    (node: T | null) => {
      if (!node) return;
      const measure = () => {
        const rect = node.getBoundingClientRect();
        setSize({ width: rect.width, height: rect.height });
      };
      measure();
      if (typeof ResizeObserver !== "undefined") {
        const ro = new ResizeObserver(([entry]) => {
          const { width, height } = entry.contentRect;
          setSize({ width, height });
        });
        ro.observe(node);
      } else {
        window.addEventListener("resize", measure);
      }
    },
    []
  );
  return [ref, size];
}
