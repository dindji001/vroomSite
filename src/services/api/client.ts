import { apiConfig } from "@/config/api";
import { STORAGE_KEYS, ERROR_MESSAGES } from "@/constants";
import { storageGet, storageSet, clearAuthStorage } from "@/helpers";

export type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";
  body?: unknown;
  query?: Record<string, unknown>;
  headers?: Record<string, string>;
  timeoutMs?: number;
  cache?:
    | "default"
    | "force-cache"
    | "no-cache"
    | "no-store"
    | "only-if-cached"
    | "reload";
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
  useInternalBase?: boolean;
  isFormData?: boolean;
  authenticate?: boolean;
  signal?: AbortSignal;
  retries?: number;
  retryDelayMs?: number;
  onUploadProgress?: (progress: number) => void;
  onDownloadProgress?: (progress: number) => void;
  skipAuthRefresh?: boolean;
};

export type ApiError = {
  message: string;
  code?: string;
  status: number;
  details?: unknown;
  path?: string;
  timestamp?: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  metadata?: Record<string, unknown>;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  message?: string;
  warnings?: string[];
};

export class ApiClientError extends Error implements ApiError {
  status: number;
  code?: string;
  details?: unknown;
  path?: string;
  timestamp?: string;
  constructor(error: ApiError) {
    super(error.message);
    this.name = "ApiClientError";
    this.status = error.status;
    this.code = error.code;
    this.details = error.details;
    this.path = error.path;
    this.timestamp = error.timestamp;
  }
}

function buildUrlWithQuery(url: string, query?: Record<string, unknown>): string {
  if (!query) return url;
  const parts = Object.entries(query)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .flatMap(([k, v]) => {
      if (Array.isArray(v)) {
        return v
          .filter((item) => item !== undefined && item !== null && item !== "")
          .map((item) => `${encodeURIComponent(k)}[]=${encodeURIComponent(String(item))}`);
      }
      return [`${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`];
    });
  if (parts.length === 0) return url;
  return `${url}${url.includes("?") ? "&" : "?"}${parts.join("&")}`;
}

async function refreshTokenIfNeeded(): Promise<boolean> {
  const refreshToken = storageGet<string>(STORAGE_KEYS.AUTH.REFRESH_TOKEN);
  if (!refreshToken) return false;
  try {
    const res = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.auth.refresh}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return false;
    const json = await res.json();
    const tokens = json?.data ?? json;
    if (tokens?.accessToken) {
      storageSet(STORAGE_KEYS.AUTH.ACCESS_TOKEN, tokens.accessToken);
    }
    if (tokens?.refreshToken) {
      storageSet(STORAGE_KEYS.AUTH.REFRESH_TOKEN, tokens.refreshToken);
    }
    if (tokens?.expiresIn) {
      storageSet(
        STORAGE_KEYS.AUTH.EXPIRES_AT,
        Date.now() + tokens.expiresIn * 1000
      );
    }
    return true;
  } catch {
    clearAuthStorage();
    return false;
  }
}

export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    method = "GET",
    body,
    query,
    headers = {},
    timeoutMs = apiConfig.timeoutMs,
    cache,
    next,
    useInternalBase = false,
    isFormData = false,
    authenticate = method !== "GET",
    signal,
    retries = 1,
    retryDelayMs = apiConfig.retryDelayMs,
    skipAuthRefresh = false,
  } = options;

  const baseUrl = useInternalBase ? apiConfig.internalBaseUrl : apiConfig.baseUrl;
  let url = endpoint.startsWith("http") ? endpoint : `${baseUrl}${endpoint}`;
  url = buildUrlWithQuery(url, query);

  const accessToken = storageGet<string>(STORAGE_KEYS.AUTH.ACCESS_TOKEN);

  const requestHeaders: Record<string, string> = {
    Accept: "application/json",
    "Accept-Language": "fr-FR",
    "X-App-Version": "1.0.0",
    ...headers,
    ...(!isFormData && body ? { "Content-Type": "application/json" } : {}),
    ...(authenticate && accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  const controller =
    typeof AbortController !== "undefined" ? new AbortController() : null;
  const timeout =
    timeoutMs > 0 && controller
      ? setTimeout(() => controller.abort(), timeoutMs)
      : null;

  if (signal && controller) {
    if (typeof signal.addEventListener === "function") {
      signal.addEventListener("abort", () => controller.abort());
    }
  }

  let finalBody: BodyInit | null = null;
  if (body !== undefined) {
    if (isFormData && body instanceof FormData) {
      finalBody = body;
    } else {
      finalBody = JSON.stringify(body);
    }
  }

  const fetchOptions: RequestInit = {
    method,
    headers: requestHeaders,
    body: finalBody,
    cache,
    next,
    signal: controller?.signal ?? signal,
    credentials: "include",
  };

  let lastError: ApiError | null = null;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, fetchOptions);

      if (res.status === 204) {
        timeout && clearTimeout(timeout);
        return undefined as unknown as T;
      }

      const contentType = res.headers.get("content-type") ?? "";
      let payload: unknown;
      if (contentType.includes("application/json")) {
        payload = await res.json();
      } else {
        payload = await res.text();
      }

      if (res.ok) {
        timeout && clearTimeout(timeout);
        if (typeof payload === "object" && payload !== null && "data" in (payload as object)) {
          return (payload as ApiResponse<T>).data as T;
        }
        return payload as T;
      }

      if (
        authenticate &&
        res.status === 401 &&
        !skipAuthRefresh &&
        attempt === 0 &&
        !("__noRetry" in options)
      ) {
        const refreshed = await refreshTokenIfNeeded();
        if (refreshed) {
          const newToken = storageGet<string>(STORAGE_KEYS.AUTH.ACCESS_TOKEN);
          if (newToken) {
            (fetchOptions.headers as Record<string, string>).Authorization = `Bearer ${newToken}`;
          }
          continue;
        }
      }

      const errorPayload: ApiError = {
        message:
          typeof payload === "object" &&
          payload !== null &&
          "message" in (payload as Record<string, unknown>)
            ? String((payload as Record<string, unknown>).message)
            : res.statusText || ERROR_MESSAGES.DEFAULT,
        status: res.status,
        code:
          typeof payload === "object" &&
          payload !== null &&
          "code" in (payload as Record<string, unknown>)
            ? String((payload as Record<string, unknown>).code)
            : undefined,
        details:
          typeof payload === "object" &&
          payload !== null &&
          "details" in (payload as Record<string, unknown>)
            ? (payload as Record<string, unknown>).details
            : payload,
        path: endpoint,
        timestamp: new Date().toISOString(),
      };

      if ((apiConfig.retryStatuses as readonly number[]).includes(res.status) && attempt < retries) {
        const wait = Math.min(
          retryDelayMs * 2 ** attempt,
          apiConfig.retryMaxDelayMs
        );
        await new Promise((r) => setTimeout(r, wait));
        lastError = errorPayload;
        continue;
      }

      if (res.status === 401) {
        clearAuthStorage();
      }

      throw new ApiClientError(errorPayload);
    } catch (err: unknown) {
      if (err instanceof ApiClientError) throw err;
      const errAny = err as { message?: string; name?: string };
      if (attempt < retries) {
        const wait = Math.min(
          retryDelayMs * 2 ** attempt,
          apiConfig.retryMaxDelayMs
        );
        await new Promise((r) => setTimeout(r, wait));
        lastError = {
          message: errAny.message ?? ERROR_MESSAGES.NETWORK,
          status: 0,
        };
        continue;
      }
      timeout && clearTimeout(timeout);
      throw new ApiClientError({
        message: errAny.name === "AbortError" ? ERROR_MESSAGES.TIMEOUT : ERROR_MESSAGES.NETWORK,
        status: errAny.name === "AbortError" ? 408 : 0,
      });
    }
  }

  timeout && clearTimeout(timeout);
  throw new ApiClientError(
    lastError ?? { message: ERROR_MESSAGES.DEFAULT, status: 0 }
  );
}

export const apiClient = {
  get: <T>(url: string, opts?: RequestOptions) =>
    apiRequest<T>(url, { ...opts, method: "GET" }),
  post: <T>(url: string, body?: unknown, opts?: RequestOptions) =>
    apiRequest<T>(url, { ...opts, method: "POST", body }),
  put: <T>(url: string, body?: unknown, opts?: RequestOptions) =>
    apiRequest<T>(url, { ...opts, method: "PUT", body }),
  patch: <T>(url: string, body?: unknown, opts?: RequestOptions) =>
    apiRequest<T>(url, { ...opts, method: "PATCH", body }),
  delete: <T>(url: string, opts?: RequestOptions) =>
    apiRequest<T>(url, { ...opts, method: "DELETE" }),
  upload: <T>(url: string, formData: FormData, opts?: RequestOptions) =>
    apiRequest<T>(url, { ...opts, method: "POST", body: formData, isFormData: true }),
  buildUrl: buildUrlWithQuery,
};

export default apiClient;
