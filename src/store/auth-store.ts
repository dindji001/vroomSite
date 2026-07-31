import { create } from "zustand";
import type { AuthState, User, AuthTokens, LoginInput, RegisterInput } from "@/types/user";
import { STORAGE_KEYS, SUCCESS_MESSAGES } from "@/constants";
import { storageGet, storageSet, storageRemove, clearAuthStorage } from "@/helpers";
import { authApi } from "@/services/api";
import type { AsyncStatus } from "@/types";

type Meta = {
  status: AsyncStatus;
  initialized: boolean;
  error: string | null;
  errorCode?: string | null;
  loading: boolean;
  loginStatus: AsyncStatus;
  registerStatus: AsyncStatus;
  logoutStatus: AsyncStatus;
  refreshStatus: AsyncStatus;
  profileStatus: AsyncStatus;
};

type Store = AuthState &
  Meta & {
    init: () => Promise<void>;
    reset: () => void;

    setTokens: (tokens: AuthTokens | null) => void;
    setUser: (user: User | null) => void;

    login: (input: LoginInput) => Promise<boolean>;
    register: (input: RegisterInput) => Promise<boolean>;
    logout: () => Promise<void>;
    refresh: () => Promise<boolean>;
    fetchMe: () => Promise<User | null>;
    updateProfile: (data: Partial<User>) => Promise<boolean>;
    verifyEmail: (token: string) => Promise<boolean>;
    resendVerification: () => Promise<boolean>;
    forgotPassword: (email: string) => Promise<boolean>;
    resetPassword: (token: string, password: string) => Promise<boolean>;
    changePassword: (oldPwd: string, newPwd: string) => Promise<boolean>;
    loginWithOAuth: (provider: string) => void;

    getAccessToken: () => string | null;
    isAuthenticated: () => boolean;
    isVerified: () => boolean;
    isStaff: () => boolean;
    can: (permission: string) => boolean;
  };

const initialState: AuthState & Meta = {
  user: null,
  tokens: null,
  impersonating: false,
  status: "idle",
  initialized: false,
  error: null,
  errorCode: null,
  loading: false,
  loginStatus: "idle",
  registerStatus: "idle",
  logoutStatus: "idle",
  refreshStatus: "idle",
  profileStatus: "idle",
};

export const useAuthStore = create<Store>((set, get) => ({
  ...initialState,

  init: async () => {
    try {
      const access = storageGet<string>(STORAGE_KEYS.AUTH.ACCESS_TOKEN);
      const refresh = storageGet<string>(STORAGE_KEYS.AUTH.REFRESH_TOKEN);
      const expiresAt = storageGet<number>(STORAGE_KEYS.AUTH.EXPIRES_AT);
      const now = Date.now();
      if (access && refresh) {
        const tokens: AuthTokens = {
          accessToken: access,
          refreshToken: refresh,
          tokenType: "Bearer",
          expiresIn: expiresAt && expiresAt > now ? (expiresAt - now) / 1000 : 3600,
        };
        set({ tokens });
        try {
          const user = await authApi.me();
          if (user) set({ user });
        } catch {
          const needsRefresh = !expiresAt || expiresAt <= now;
          if (needsRefresh) {
            try {
              const refreshed = await get().refresh();
              if (!refreshed) clearAuthStorage();
            } catch {
              clearAuthStorage();
            }
          }
        }
      }
    } catch (e) {
      // ignore
    } finally {
      set({ initialized: true });
    }
  },

  reset: () => {
    clearAuthStorage();
    set({
      ...initialState,
      initialized: true,
    });
  },

  setTokens: (tokens) => set({ tokens }),
  setUser: (user) => set({ user }),

  login: async (input) => {
    set({ loginStatus: "loading", loading: true, error: null, errorCode: null });
    try {
      const { user, tokens } = await authApi.login(input);
      storageSet(STORAGE_KEYS.AUTH.ACCESS_TOKEN, tokens.accessToken);
      storageSet(STORAGE_KEYS.AUTH.REFRESH_TOKEN, tokens.refreshToken);
      storageSet(
        STORAGE_KEYS.AUTH.EXPIRES_AT,
        Date.now() + tokens.expiresIn * 1000
      );
      storageSet(STORAGE_KEYS.AUTH.REMEMBER_ME, input.remember === true);
      set({
        user,
        tokens,
        loginStatus: "success",
        loading: false,
        status: "success",
      });
      return true;
    } catch (err: any) {
      set({
        loginStatus: "error",
        loading: false,
        error: err?.message ?? "Impossible de se connecter",
        errorCode: err?.code,
        status: "error",
      });
      return false;
    }
  },

  register: async (input) => {
    set({ registerStatus: "loading", loading: true, error: null, errorCode: null });
    try {
      const { user, tokens } = await authApi.register(input);
      if (tokens) {
        storageSet(STORAGE_KEYS.AUTH.ACCESS_TOKEN, tokens.accessToken);
        storageSet(STORAGE_KEYS.AUTH.REFRESH_TOKEN, tokens.refreshToken);
        storageSet(
          STORAGE_KEYS.AUTH.EXPIRES_AT,
          Date.now() + tokens.expiresIn * 1000
        );
      }
      set({
        user,
        tokens,
        registerStatus: "success",
        loading: false,
      });
      return true;
    } catch (err: any) {
      set({
        registerStatus: "error",
        loading: false,
        error: err?.message ?? "Inscription échouée",
        errorCode: err?.code,
      });
      return false;
    }
  },

  logout: async () => {
    set({ logoutStatus: "loading" });
    try {
      const tokens = get().tokens;
      if (tokens) {
        await authApi.logout().catch(() => {});
      }
    } finally {
      get().reset();
      set({ logoutStatus: "success" });
    }
  },

  refresh: async () => {
    set({ refreshStatus: "loading" });
    try {
      const current = get().tokens;
      if (!current?.refreshToken) return false;
      const tokens = await authApi.refresh(current.refreshToken);
      storageSet(STORAGE_KEYS.AUTH.ACCESS_TOKEN, tokens.accessToken);
      storageSet(STORAGE_KEYS.AUTH.REFRESH_TOKEN, tokens.refreshToken);
      storageSet(
        STORAGE_KEYS.AUTH.EXPIRES_AT,
        Date.now() + tokens.expiresIn * 1000
      );
      set({ tokens, refreshStatus: "success" });
      return true;
    } catch {
      set({ refreshStatus: "error" });
      get().reset();
      return false;
    }
  },

  fetchMe: async () => {
    set({ profileStatus: "loading" });
    try {
      const user = await authApi.me();
      set({ user, profileStatus: "success" });
      return user;
    } catch (err: any) {
      set({ profileStatus: "error", error: err?.message ?? null });
      return null;
    }
  },

  updateProfile: async (data) => {
    set({ profileStatus: "loading" });
    try {
      const user = await authApi.updateProfile(data);
      set({ user, profileStatus: "success" });
      return true;
    } catch {
      set({ profileStatus: "error" });
      return false;
    }
  },

  verifyEmail: async (token) => {
    try {
      await authApi.verifyEmail(token);
      const user = get().user;
      if (user) set({ user: { ...user, emailVerifiedAt: new Date().toISOString() } });
      return true;
    } catch {
      return false;
    }
  },

  resendVerification: async () => {
    try {
      await authApi.resendVerification();
      return true;
    } catch {
      return false;
    }
  },

  forgotPassword: async (email) => {
    try {
      await authApi.forgotPassword(email);
      return true;
    } catch {
      return false;
    }
  },

  resetPassword: async (token, password) => {
    try {
      await authApi.resetPassword(token, password);
      return true;
    } catch {
      return false;
    }
  },

  changePassword: async (oldPwd, newPwd) => {
    try {
      await authApi.changePassword(oldPwd, newPwd);
      return true;
    } catch {
      return false;
    }
  },

  loginWithOAuth: (provider) => {
    const base = `${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}/auth/oauth/${provider}`;
    if (typeof window !== "undefined") {
      window.location.href = `${base}?redirect_uri=${encodeURIComponent(
        window.location.origin + "/auth/callback"
      )}`;
    }
  },

  getAccessToken: () => get().tokens?.accessToken ?? null,
  isAuthenticated: () => Boolean(get().tokens?.accessToken && get().user),
  isVerified: () => Boolean(get().user?.emailVerifiedAt),
  isStaff: () =>
    get().user?.role === "admin" ||
    get().user?.role === "staff" ||
    get().user?.role === "pro",
  can: (permission) => {
    const role = get().user?.role;
    if (!role) return false;
    const permissions: Record<string, string[]> = {
      admin: ["admin", "staff", "pro", "client"],
      staff: ["staff", "pro", "client"],
      pro: ["pro", "client"],
      client: ["client"],
    };
    return permissions[role]?.includes(permission) ?? false;
  },
}));
