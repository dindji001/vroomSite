import { STORAGE_KEYS } from "@/constants";
import { ENV } from "@/constants";

const IS_BROWSER = typeof window !== "undefined";

function getStorage(persist = true): Storage | null {
  if (!IS_BROWSER) return null;
  return persist ? window.localStorage : window.sessionStorage;
}

export function storageGet<T = unknown>(key: string, persist = true): T | null {
  try {
    const store = getStorage(persist);
    if (!store) return null;
    const raw = store.getItem(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as unknown as T;
    }
  } catch {
    return null;
  }
}

export function storageSet(key: string, value: unknown, persist = true): boolean {
  try {
    const store = getStorage(persist);
    if (!store) return false;
    const serialized = typeof value === "string" ? value : JSON.stringify(value);
    store.setItem(key, serialized);
    return true;
  } catch (err) {
    if (!ENV.IS_PRODUCTION) {
      console.warn(`[storage] failed to set ${key}`, err);
    }
    return false;
  }
}

export function storageRemove(key: string, persist = true): boolean {
  try {
    const store = getStorage(persist);
    if (!store) return false;
    store.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function storageHas(key: string, persist = true): boolean {
  try {
    const store = getStorage(persist);
    if (!store) return false;
    return store.getItem(key) !== null;
  } catch {
    return false;
  }
}

export function storageClear(persist = true): boolean {
  try {
    const store = getStorage(persist);
    if (!store) return false;
    store.clear();
    return true;
  } catch {
    return false;
  }
}

export function storageClearKeys(
  prefix: string,
  persist = true,
  exceptions: string[] = []
): number {
  try {
    const store = getStorage(persist);
    if (!store) return 0;
    let removed = 0;
    for (let i = store.length - 1; i >= 0; i--) {
      const key = store.key(i);
      if (key && key.startsWith(prefix) && !exceptions.includes(key)) {
        store.removeItem(key);
        removed++;
      }
    }
    return removed;
  } catch {
    return 0;
  }
}

export function cookieGet(name: string): string | null {
  if (!IS_BROWSER) return null;
  const cookie = `; ${document.cookie}`;
  const parts = cookie.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop()!.split(";").shift()!);
  return null;
}

export function cookieSet(
  name: string,
  value: string,
  options: {
    days?: number;
    hours?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
    httpOnly?: boolean;
  } = {}
): boolean {
  if (!IS_BROWSER) return false;
  try {
    const parts: string[] = [`${encodeURIComponent(name)}=${encodeURIComponent(value)}`];
    if (options.days) {
      parts.push(`max-age=${options.days * 86400}`);
    } else if (options.hours) {
      parts.push(`max-age=${options.hours * 3600}`);
    }
    parts.push(`path=${options.path ?? "/"}`);
    if (options.domain) parts.push(`domain=${options.domain}`);
    if (options.secure ?? ENV.IS_PRODUCTION) parts.push("secure");
    parts.push(`samesite=${options.sameSite ?? "Lax"}`);
    document.cookie = parts.join("; ");
    return true;
  } catch {
    return false;
  }
}

export function cookieRemove(name: string, path = "/", domain?: string): boolean {
  if (!IS_BROWSER) return false;
  try {
    const parts: string[] = [
      `${encodeURIComponent(name)}=`,
      "expires=Thu, 01 Jan 1970 00:00:00 GMT",
      `path=${path}`,
    ];
    if (domain) parts.push(`domain=${domain}`);
    document.cookie = parts.join("; ");
    return true;
  } catch {
    return false;
  }
}

export function clearAuthStorage(): void {
  storageRemove(STORAGE_KEYS.AUTH.ACCESS_TOKEN);
  storageRemove(STORAGE_KEYS.AUTH.REFRESH_TOKEN);
  storageRemove(STORAGE_KEYS.AUTH.EXPIRES_AT);
  storageRemove(STORAGE_KEYS.AUTH.CSRF_TOKEN);
  storageRemove(STORAGE_KEYS.AUTH.IMPERSONATION);
}
