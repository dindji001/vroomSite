import type { ID, Money } from "@/types";
import { ERROR_MESSAGES } from "@/constants";

export function buildUrl(
  base: string,
  params: Record<string, unknown> = {}
): string {
  try {
    const url = new URL(base, "http://localhost");
    Object.entries(params).forEach(([k, v]) => {
      if (v === undefined || v === null || v === "") return;
      if (Array.isArray(v)) {
        v.forEach((item) => {
          if (item !== undefined && item !== null && item !== "") {
            url.searchParams.append(`${k}[]`, String(item));
          }
        });
      } else {
        url.searchParams.append(k, String(v));
      }
    });
    return url.pathname + url.search;
  } catch {
    return base;
  }
}

export function withQuery(
  path: string,
  query: Record<string, unknown> = {}
): string {
  const serialized = Object.entries(query)
    .map(([key, value]) => {
      if (value === undefined || value === null || value === "") return null;
      if (Array.isArray(value)) {
        return value
          .map(
            (v) =>
              `${encodeURIComponent(key)}[]=${encodeURIComponent(String(v))}`
          )
          .join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    })
    .filter(Boolean)
    .join("&");
  if (!serialized) return path;
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}${serialized}`;
}

export function getQueryParam(key: string, fallback?: string): string | undefined {
  if (typeof window === "undefined") return fallback;
  const url = new URL(window.location.href);
  return url.searchParams.get(key) ?? fallback;
}

export function getQueryParamAll(key: string): string[] {
  if (typeof window === "undefined") return [];
  return new URL(window.location.href).searchParams.getAll(`${key}[]`);
}

export function replaceQueryParam(
  key: string,
  value: unknown
): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  if (value === undefined || value === null || value === "") {
    url.searchParams.delete(key);
    url.searchParams.delete(`${key}[]`);
  } else if (Array.isArray(value)) {
    url.searchParams.delete(key);
    url.searchParams.delete(`${key}[]`);
    value.forEach((v) =>
      url.searchParams.append(`${key}[]`, String(v))
    );
  } else {
    url.searchParams.set(key, String(value));
  }
  return url.pathname + url.search;
}

export function getHostname(url?: string): string {
  try {
    return new URL(url ?? (typeof window !== "undefined" ? window.location.href : "/")).hostname;
  } catch {
    return "";
  }
}

export function isExternalUrl(url?: string | null): boolean {
  if (!url) return false;
  return /^(https?:)?\/\//i.test(url) || url.startsWith("mailto:") || url.startsWith("tel:");
}

export function isInternalUrl(url?: string | null): boolean {
  if (!url) return false;
  return !isExternalUrl(url);
}

export function safeRedirectUrl(redirect: unknown, fallback = "/"): string {
  if (typeof redirect !== "string" || !redirect) return fallback;
  const normalized = redirect.trim();
  if (!normalized) return fallback;
  if (isExternalUrl(normalized)) return fallback;
  if (!normalized.startsWith("/")) return fallback;
  if (normalized.length > 2048) return fallback;
  if (/^\/\/+/.test(normalized)) return fallback;
  return normalized;
}

export function absoluteUrl(path: string, baseUrl: string): string {
  try {
    return new URL(path, baseUrl).toString();
  } catch {
    return path;
  }
}

export function getFileExtension(filename: string): string {
  const idx = filename.lastIndexOf(".");
  return idx >= 0 ? filename.slice(idx + 1).toLowerCase() : "";
}

export function getFileNameFromUrl(url: string): string {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    return decodeURIComponent(parts[parts.length - 1] ?? "");
  } catch {
    return "";
  }
}

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "Ko", "Mo", "Go", "To", "Po"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const size = bytes / 1024 ** i;
  return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function isAllowedFile(
  file: File,
  options: {
    maxSizeBytes?: number;
    allowedMimeTypes?: string[];
    allowedExtensions?: string[];
  } = {}
): { valid: boolean; error?: string } {
  const { maxSizeBytes, allowedMimeTypes = [], allowedExtensions = [] } = options;
  if (maxSizeBytes && file.size > maxSizeBytes) {
    return { valid: false, error: ERROR_MESSAGES.FILE_TOO_BIG(formatFileSize(maxSizeBytes)) };
  }
  if (allowedMimeTypes.length && !allowedMimeTypes.includes(file.type)) {
    return { valid: false, error: ERROR_MESSAGES.INVALID_FILE_TYPE(allowedMimeTypes.join(", ")) };
  }
  if (allowedExtensions.length) {
    const ext = getFileExtension(file.name);
    if (!ext || !allowedExtensions.includes(ext.toLowerCase())) {
      return {
        valid: false,
        error: ERROR_MESSAGES.INVALID_FILE_TYPE(allowedExtensions.join(", ")),
      };
    }
  }
  return { valid: true };
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function retry<T>(
  fn: () => Promise<T>,
  options: {
    attempts?: number;
    delayMs?: number;
    maxDelayMs?: number;
    backoff?: "linear" | "exponential";
    onError?: (err: unknown, attempt: number) => void;
    shouldRetry?: (err: unknown, attempt: number) => boolean;
  } = {}
): Promise<T> {
  const {
    attempts = 3,
    delayMs = 400,
    maxDelayMs = 5000,
    backoff = "exponential",
    shouldRetry = () => true,
    onError,
  } = options;
  return new Promise<T>((resolve, reject) => {
    let attempt = 0;
    const run = async () => {
      try {
        resolve(await fn());
      } catch (err) {
        attempt++;
        onError?.(err, attempt);
        if (attempt >= attempts || !shouldRetry(err, attempt)) {
          reject(err);
          return;
        }
        const d = backoff === "exponential" ? delayMs * 2 ** (attempt - 1) : delayMs * attempt;
        setTimeout(run, Math.min(d, maxDelayMs));
      }
    };
    void run();
  });
}

export function groupBy<T, K extends string>(arr: T[], keyFn: (item: T) => K): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const k = keyFn(item);
    (acc[k] = acc[k] ?? []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

export function keyBy<T, K extends string>(arr: T[], keyFn: (item: T) => K): Record<K, T> {
  return arr.reduce((acc, item) => {
    acc[keyFn(item)] = item;
    return acc;
  }, {} as Record<K, T>);
}

export function uniqBy<T, K>(arr: T[], keyFn: (item: T) => K): T[] {
  const seen = new Set<K>();
  return arr.filter((item) => {
    const k = keyFn(item);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export function chunk<T>(arr: T[], size: number): T[][] {
  if (!size) return [];
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delayMs = 300
): (...args: Parameters<T>) => void {
  let t: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), delayMs);
  };
}

export function throttle<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delayMs = 300
): (...args: Parameters<T>) => void {
  let last = 0;
  let pending: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    const remaining = delayMs - (now - last);
    if (remaining <= 0) {
      if (pending) {
        clearTimeout(pending);
        pending = null;
      }
      last = now;
      fn(...args);
    } else if (!pending) {
      pending = setTimeout(() => {
        last = Date.now();
        pending = null;
        fn(...args);
      }, remaining);
    }
  };
}

export function rafDebounce<T extends (...args: Parameters<T>) => void>(
  fn: T
): (...args: Parameters<T>) => void {
  let id: number | null = null;
  return (...args: Parameters<T>) => {
    if (id !== null) cancelAnimationFrame(id);
    id = requestAnimationFrame(() => {
      id = null;
      fn(...args);
    });
  };
}

export function isSameMoney(a?: Money | null, b?: Money | null): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.amount === b.amount && a.currency === b.currency;
}

export function buildMoney(amount: number, currency = "EUR"): Money {
  return { amount, currency };
}

export function parseId(value: unknown): ID | null {
  if (typeof value === "string" && value.trim().length > 0) return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return null;
}

export function parseIds(values: unknown[]): ID[] {
  return values.map(parseId).filter((v): v is ID => v !== null);
}

export function pick<T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K> {
  const out = {} as Pick<T, K>;
  keys.forEach((k) => {
    if (k in obj) out[k] = obj[k];
  });
  return out;
}

export function omit<T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Omit<T, K> {
  const out = { ...obj };
  keys.forEach((k) => {
    delete (out as any)[k];
  });
  return out;
}

export function deepClone<T>(obj: T): T {
  if (typeof structuredClone === "function") return structuredClone(obj);
  return JSON.parse(JSON.stringify(obj)) as T;
}

export function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  const aArr = Array.isArray(a);
  const bArr = Array.isArray(b);
  if (aArr !== bArr) return false;
  const aKeys = Object.keys(a as object);
  const bKeys = Object.keys(b as object);
  if (aKeys.length !== bKeys.length) return false;
  return aKeys.every(
    (k) =>
      Object.prototype.hasOwnProperty.call(b as object, k) &&
      deepEqual(
        (a as Record<string, unknown>)[k],
        (b as Record<string, unknown>)[k]
      )
  );
}

export function objectDiff<T extends object>(
  original: T,
  next: Partial<T>
): Partial<T> {
  const diff: Partial<T> = {};
  (Object.keys(next) as (keyof T)[]).forEach((k) => {
    const v = next[k];
    if (!deepEqual(original[k], v)) diff[k] = v;
  });
  return diff;
}
