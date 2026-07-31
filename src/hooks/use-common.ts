"use client";

import * as React from "react";
import { useUIStore } from "@/store/ui-store";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "@/constants";
import type { ToastType } from "@/types";

export function useDebounce<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = React.useState<T>(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

export function useThrottle<T>(value: T, delayMs = 300): T {
  const [throttled, setThrottled] = React.useState(value);
  const last = React.useRef<number>(0);
  React.useEffect(() => {
    const now = Date.now();
    if (now - last.current >= delayMs) {
      last.current = now;
      setThrottled(value);
    } else {
      const t = setTimeout(() => {
        last.current = Date.now();
        setThrottled(value);
      }, delayMs - (now - last.current));
      return () => clearTimeout(t);
    }
  }, [value, delayMs]);
  return throttled;
}

export function useDebouncedFunction<Args extends unknown[], R>(
  fn: (...args: Args) => R,
  delayMs = 300
): (...args: Args) => void {
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  return React.useCallback(
    (...args: Args) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => fn(...args), delayMs);
    },
    [fn, delayMs]
  );
}

export function useLocalStorage<T>(
  key: string,
  initial: T | (() => T)
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const read = React.useCallback(() => {
    if (typeof window === "undefined") {
      return typeof initial === "function" ? (initial as () => T)() : initial;
    }
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) {
        return typeof initial === "function" ? (initial as () => T)() : initial;
      }
      return JSON.parse(raw) as T;
    } catch {
      return typeof initial === "function" ? (initial as () => T)() : initial;
    }
  }, [key, initial]);

  const [value, setValue] = React.useState<T>(read);

  React.useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setValue(JSON.parse(e.newValue));
        } catch {
          /* ignore */
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);

  const set = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const v = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(v));
        } catch {
          /* storage exhausted */
        }
        return v;
      });
    },
    [key]
  );

  const remove = React.useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } finally {
      const v = typeof initial === "function" ? (initial as () => T)() : initial;
      setValue(v);
    }
  }, [key, initial]);

  return [value, set, remove];
}

export function useInterval(callback: () => void, delayMs: number | null): void {
  const saved = React.useRef(callback);
  React.useEffect(() => {
    saved.current = callback;
  }, [callback]);
  React.useEffect(() => {
    if (delayMs === null) return;
    const id = setInterval(() => saved.current(), delayMs);
    return () => clearInterval(id);
  }, [delayMs]);
}

export function useTimeout(callback: () => void, delayMs: number | null): void {
  const saved = React.useRef(callback);
  React.useEffect(() => {
    saved.current = callback;
  }, [callback]);
  React.useEffect(() => {
    if (delayMs === null) return;
    const id = setTimeout(() => saved.current(), delayMs);
    return () => clearTimeout(id);
  }, [delayMs]);
}

export function useUnmount(fn: () => void): void {
  const ref = React.useRef(fn);
  React.useEffect(() => {
    ref.current = fn;
  });
  React.useEffect(() => () => ref.current(), []);
}

export function useMounted(): boolean {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

export function useForceUpdate(): () => void {
  const [, setN] = React.useState(0);
  return React.useCallback(() => setN((n) => n + 1), []);
}

export function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T | undefined>(undefined);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function useCounter(initial = 0, min?: number, max?: number) {
  const [count, setCount] = React.useState(initial);
  const clamp = (n: number) => {
    if (typeof min === "number") n = Math.max(min, n);
    if (typeof max === "number") n = Math.min(max, n);
    return n;
  };
  return {
    count,
    set: (v: number | ((c: number) => number)) =>
      setCount((c) => clamp(typeof v === "function" ? (v as (x: number) => number)(c) : v)),
    inc: (step = 1) => setCount((c) => clamp(c + step)),
    dec: (step = 1) => setCount((c) => clamp(c - step)),
    reset: () => setCount(clamp(initial)),
  };
}

export function useToggle(initial = false): [boolean, () => void, (v: boolean) => void] {
  const [on, setOn] = React.useState(initial);
  const toggle = React.useCallback(() => setOn((v) => !v), []);
  return [on, toggle, setOn];
}

export function useBoolean(initial = false) {
  const [value, setValue] = React.useState(initial);
  return {
    value,
    setTrue: React.useCallback(() => setValue(true), []),
    setFalse: React.useCallback(() => setValue(false), []),
    toggle: React.useCallback(() => setValue((v) => !v), []),
    set: setValue,
  };
}

export function useFetch<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
  options: { enabled?: boolean; initialData?: T; onError?: (e: unknown) => void; onSuccess?: (v: T) => void } = {}
) {
  const { enabled = true, initialData, onError, onSuccess } = options;
  const [data, setData] = React.useState<T | null>(initialData ?? null);
  const [loading, setLoading] = React.useState(enabled);
  const [error, setError] = React.useState<unknown>(null);
  React.useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetcher()
      .then((res) => {
        if (cancelled) return;
        setData(res);
        onSuccess?.(res);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e);
        onError?.(e);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return { data, loading, error, isEmpty: data !== null && (Array.isArray(data) ? data.length === 0 : !data) };
}

export function useCopyToClipboard(): [
  (text: string, successMessage?: string) => Promise<boolean>,
  boolean,
  string | null
] {
  const [copied, setCopied] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const pushToast = useUIStore((s) => s.pushToast);
  const copy = async (text: string, successMessage?: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setError(null);
      pushToast({
        type: "success",
        title: successMessage ?? "Copié dans le presse-papier",
      });
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (e: any) {
      setError(e?.message ?? "Erreur de copie");
      setCopied(false);
      return false;
    }
  };
  return [copy, copied, error];
}

export function useToast(): {
  success: (message: string, title?: string) => string;
  error: (message: string, title?: string) => string;
  warning: (message: string, title?: string) => string;
  info: (message: string, title?: string) => string;
  dismiss: (id: string) => void;
} {
  const push = useUIStore((s) => s.pushToast);
  const dismiss = useUIStore((s) => s.dismissToast);
  return {
    success: (message, title) =>
      push({ type: "success", title: title ?? SUCCESS_MESSAGES.PROFILE_UPDATED.slice(0, 15), message }),
    error: (message, title) =>
      push({ type: "error", title: title ?? ERROR_MESSAGES.DEFAULT.slice(0, 10), message }),
    warning: (message, title) =>
      push({ type: "warning", title: title ?? "Attention", message }),
    info: (message, title) => push({ type: "info", title: title ?? "Info", message }),
    dismiss,
  };
}

export function useIsFirstRender(): boolean {
  const ref = React.useRef(true);
  const isFirst = ref.current;
  ref.current = false;
  return isFirst;
}

export function useHash(): [string, (hash: string) => void] {
  const [hash, setHashState] = React.useState(() =>
    typeof window === "undefined" ? "" : window.location.hash
  );
  React.useEffect(() => {
    const handler = () => setHashState(window.location.hash);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  const setHash = React.useCallback((next: string) => {
    const cleaned = next.startsWith("#") ? next : `#${next}`;
    if (window.location.hash !== cleaned) window.location.hash = cleaned;
  }, []);
  return [hash, setHash];
}

export function useDocumentTitle(title: string, restoreOnUnmount?: string): void {
  const prev = React.useRef(typeof document !== "undefined" ? document.title : "");
  React.useEffect(() => {
    document.title = title;
  }, [title]);
  React.useEffect(() => {
    if (!restoreOnUnmount) return;
    const p = prev.current;
    return () => {
      document.title = restoreOnUnmount ?? p;
    };
  }, [restoreOnUnmount]);
}

export function useLazyRef<T>(init: () => T): React.MutableRefObject<T> {
  const ref = React.useRef<T | null>(null);
  if (ref.current === null) ref.current = init();
  return ref as React.MutableRefObject<T>;
}

export type AsyncPromiseState<T, E = unknown> = {
  data: T | null;
  loading: boolean;
  error: E | null;
  execute: (...args: unknown[]) => Promise<T>;
  reset: () => void;
};

export function useAsync<T>(fn: () => Promise<T>): AsyncPromiseState<T> {
  const [state, setState] = React.useState<{ data: T | null; loading: boolean; error: unknown }>({
    data: null,
    loading: false,
    error: null,
  });
  const reset = React.useCallback(() => setState({ data: null, loading: false, error: null }), []);
  const execute = React.useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await fn();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      setState((s) => ({ ...s, loading: false, error }));
      throw error;
    }
  }, [fn]);
  return { ...state, execute, reset };
}
