import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ID } from "@/types";
import type { VehicleFilter } from "@/types/vehicle";
import type { ProductFilter } from "@/types/product";
import { STORAGE_KEYS } from "@/constants";
import { siteConfig } from "@/config/site";

type DrawerState = "closed" | "open";
type ModalKind =
  | "cart"
  | "wishlist"
  | "mobile_menu"
  | "filters_vehicles"
  | "filters_products"
  | "vehicle_quick_view"
  | "product_quick_view"
  | "login"
  | "register"
  | "forgot_password"
  | "locale_currency"
  | "search_global"
  | "vehicle_reserve"
  | "vehicle_test_drive"
  | "vehicle_inquiry"
  | "checkout_login"
  | "cookie_consent"
  | "share"
  | "appointment"
  | "referral"
  | "gallery"
  | "quote";

type Locale = {
  locale: typeof siteConfig.defaults.locale;
  currency: typeof siteConfig.defaults.currency;
  language: typeof siteConfig.defaults.language;
  country: string;
};

type Store = {
  ui: {
    navbar: {
      transparent: boolean;
      scrolled: boolean;
      mobileMenuOpen: boolean;
      searchOpen: boolean;
      accountMenuOpen: boolean;
      notificationsOpen: boolean;
    };
    drawers: Record<"cart" | "wishlist" | "filters", DrawerState>;
    modals: Record<ModalKind, { open: boolean; data?: Record<string, unknown> }>;
    compactMode: boolean;
    reducedMotion: boolean;
    sidebarOpen: boolean;
    gridMode: {
      vehicles: "grid" | "list";
      products: "grid" | "list";
    };
    perPage: {
      vehicles: number;
      products: number;
    };
    toastQueue: Array<{
      id: string;
      type: "success" | "error" | "warning" | "info" | "promise";
      title?: string;
      message?: string;
      meta?: Record<string, unknown>;
    }>;
    cookieConsent: {
      marketing: boolean | null;
      analytics: boolean | null;
      necessary: boolean;
      acceptedAt: number | null;
      dismissed: boolean;
    };
  };
  locale: Locale;
  compare: {
    vehicleIds: ID[];
    productIds: ID[];
    maxVehicles: number;
    maxProducts: number;
  };
  search: {
    recentQueries: string[];
    scope: "vehicles" | "products" | "all";
  };
  vehicleFilters: VehicleFilter & { sort: string; page: number; perPage: number };
  productFilters: ProductFilter & { sort: string; page: number; perPage: number };

  setScrolled: (scrolled: boolean) => void;
  setNavbarTransparent: (v: boolean) => void;
  toggleMobileMenu: (v?: boolean) => void;
  toggleSearch: (v?: boolean) => void;
  toggleNotifications: (v?: boolean) => void;
  toggleAccountMenu: (v?: boolean) => void;
  openDrawer: (which: keyof Store["ui"]["drawers"]) => void;
  closeDrawer: (which: keyof Store["ui"]["drawers"]) => void;
  toggleDrawer: (which: keyof Store["ui"]["drawers"]) => void;
  openModal: (which: ModalKind, data?: Record<string, unknown>) => void;
  closeModal: (which: ModalKind) => void;
  setModalData: (which: ModalKind, data: Record<string, unknown>) => void;
  toggleSidebar: (v?: boolean) => void;
  setGridMode: (scope: "vehicles" | "products", mode: "grid" | "list") => void;
  setPerPage: (scope: "vehicles" | "products", n: number) => void;
  setCompactMode: (v: boolean) => void;
  setReducedMotion: (v: boolean) => void;
  setLocale: (partial: Partial<Locale>) => void;

  toggleCompare: (kind: "vehicle" | "product", id: ID) => boolean;
  clearCompare: (kind: "vehicle" | "product") => void;

  addRecentQuery: (q: string) => void;
  clearRecentQueries: () => void;
  setSearchScope: (scope: Store["search"]["scope"]) => void;

  setVehicleFilters: (patch: Partial<Store["vehicleFilters"]>) => void;
  resetVehicleFilters: () => void;
  setProductFilters: (patch: Partial<Store["productFilters"]>) => void;
  resetProductFilters: () => void;

  pushToast: (t: Omit<Store["ui"]["toastQueue"][number], "id">) => string;
  dismissToast: (id: string) => void;
  clearToasts: () => void;

  acceptCookies: (opts: { marketing: boolean; analytics: boolean }) => void;
  dismissCookieBanner: () => void;
};

export type UIStore = Store;

const initialModalState: Store["ui"]["modals"] = {
  cart: { open: false },
  wishlist: { open: false },
  mobile_menu: { open: false },
  filters_vehicles: { open: false },
  filters_products: { open: false },
  vehicle_quick_view: { open: false },
  product_quick_view: { open: false },
  login: { open: false },
  register: { open: false },
  forgot_password: { open: false },
  locale_currency: { open: false },
  search_global: { open: false },
  vehicle_reserve: { open: false },
  vehicle_test_drive: { open: false },
  vehicle_inquiry: { open: false },
  checkout_login: { open: false },
  cookie_consent: { open: false },
  share: { open: false },
  appointment: { open: false },
  referral: { open: false },
  gallery: { open: false },
  quote: { open: false },
};

const initialVehicleFilters: Store["vehicleFilters"] = {
  sort: "created_desc",
  page: 1,
  perPage: siteConfig.defaults.perPage.default,
};

const initialProductFilters: Store["productFilters"] = {
  sort: "relevance",
  page: 1,
  perPage: siteConfig.defaults.perPage.default,
};

export const useUIStore = create<Store>()(
  persist(
    (set, get) => ({
      ui: {
        navbar: {
          transparent: true,
          scrolled: false,
          mobileMenuOpen: false,
          searchOpen: false,
          accountMenuOpen: false,
          notificationsOpen: false,
        },
        drawers: { cart: "closed", wishlist: "closed", filters: "closed" },
        modals: initialModalState,
        compactMode: false,
        reducedMotion: false,
        sidebarOpen: false,
        gridMode: { vehicles: "grid", products: "grid" },
        perPage: {
          vehicles: siteConfig.defaults.perPage.default,
          products: siteConfig.defaults.perPage.default,
        },
        toastQueue: [],
        cookieConsent: {
          marketing: null,
          analytics: null,
          necessary: true,
          acceptedAt: null,
          dismissed: false,
        },
      },
      locale: {
        locale: siteConfig.defaults.locale,
        currency: siteConfig.defaults.currency,
        language: siteConfig.defaults.language,
        country: siteConfig.defaults.country,
      },
      compare: {
        vehicleIds: [],
        productIds: [],
        maxVehicles: siteConfig.business.maxCompareVehicles,
        maxProducts: 4,
      },
      search: {
        recentQueries: [],
        scope: "all",
      },
      vehicleFilters: { ...initialVehicleFilters },
      productFilters: { ...initialProductFilters },

      setScrolled: (scrolled) =>
        set((s) => ({ ui: { ...s.ui, navbar: { ...s.ui.navbar, scrolled } } })),
      setNavbarTransparent: (transparent) =>
        set((s) => ({ ui: { ...s.ui, navbar: { ...s.ui.navbar, transparent } } })),
      toggleMobileMenu: (v) =>
        set((s) => ({
          ui: {
            ...s.ui,
            navbar: {
              ...s.ui.navbar,
              mobileMenuOpen: v ?? !s.ui.navbar.mobileMenuOpen,
            },
          },
        })),
      toggleSearch: (v) =>
        set((s) => ({
          ui: { ...s.ui, navbar: { ...s.ui.navbar, searchOpen: v ?? !s.ui.navbar.searchOpen } },
        })),
      toggleNotifications: (v) =>
        set((s) => ({
          ui: {
            ...s.ui,
            navbar: {
              ...s.ui.navbar,
              notificationsOpen: v ?? !s.ui.navbar.notificationsOpen,
            },
          },
        })),
      toggleAccountMenu: (v) =>
        set((s) => ({
          ui: {
            ...s.ui,
            navbar: {
              ...s.ui.navbar,
              accountMenuOpen: v ?? !s.ui.navbar.accountMenuOpen,
            },
          },
        })),

      openDrawer: (which) =>
        set((s) => ({
          ui: { ...s.ui, drawers: { ...s.ui.drawers, [which]: "open" } },
        })),
      closeDrawer: (which) =>
        set((s) => ({
          ui: { ...s.ui, drawers: { ...s.ui.drawers, [which]: "closed" } },
        })),
      toggleDrawer: (which) =>
        set((s) => ({
          ui: {
            ...s.ui,
            drawers: {
              ...s.ui.drawers,
              [which]: s.ui.drawers[which] === "open" ? "closed" : "open",
            },
          },
        })),

      openModal: (which, data) =>
        set((s) => ({
          ui: {
            ...s.ui,
            modals: {
              ...s.ui.modals,
              [which]: { open: true, data: data ?? s.ui.modals[which].data },
            },
          },
        })),
      closeModal: (which) =>
        set((s) => ({
          ui: {
            ...s.ui,
            modals: { ...s.ui.modals, [which]: { open: false, data: undefined } },
          },
        })),
      setModalData: (which, data) =>
        set((s) => ({
          ui: {
            ...s.ui,
            modals: {
              ...s.ui.modals,
              [which]: { ...s.ui.modals[which], data },
            },
          },
        })),

      toggleSidebar: (v) =>
        set((s) => ({
          ui: { ...s.ui, sidebarOpen: v ?? !s.ui.sidebarOpen },
        })),

      setGridMode: (scope, mode) =>
        set((s) => ({ ui: { ...s.ui, gridMode: { ...s.ui.gridMode, [scope]: mode } } })),
      setPerPage: (scope, n) =>
        set((s) => ({ ui: { ...s.ui, perPage: { ...s.ui.perPage, [scope]: n } } })),
      setCompactMode: (compactMode) => set((s) => ({ ui: { ...s.ui, compactMode } })),
      setReducedMotion: (reducedMotion) => set((s) => ({ ui: { ...s.ui, reducedMotion } })),
      setLocale: (partial) => set((s) => ({ locale: { ...s.locale, ...partial } })),

      toggleCompare: (kind, id) => {
        const key = kind === "vehicle" ? "vehicleIds" : "productIds";
        const maxKey = kind === "vehicle" ? "maxVehicles" : "maxProducts";
        const { compare } = get();
        const current = compare[key];
        if (current.includes(id)) {
          set({ compare: { ...compare, [key]: current.filter((x) => x !== id) } });
          return false;
        }
        if (current.length >= compare[maxKey]) return false;
        set({ compare: { ...compare, [key]: [...current, id] } });
        return true;
      },
      clearCompare: (kind) => {
        const key = kind === "vehicle" ? "vehicleIds" : "productIds";
        set((s) => ({ compare: { ...s.compare, [key]: [] } }));
      },

      addRecentQuery: (q) => {
        if (!q.trim()) return;
        const { search } = get();
        const deduped = [q.trim(), ...search.recentQueries.filter((x) => x !== q.trim())].slice(
          0,
          10
        );
        set({ search: { ...search, recentQueries: deduped } });
      },
      clearRecentQueries: () =>
        set((s) => ({ search: { ...s.search, recentQueries: [] } })),
      setSearchScope: (scope) => set((s) => ({ search: { ...s.search, scope } })),

      setVehicleFilters: (patch) =>
        set((s) => ({ vehicleFilters: { ...s.vehicleFilters, ...patch } })),
      resetVehicleFilters: () => set({ vehicleFilters: { ...initialVehicleFilters } }),
      setProductFilters: (patch) =>
        set((s) => ({ productFilters: { ...s.productFilters, ...patch } })),
      resetProductFilters: () => set({ productFilters: { ...initialProductFilters } }),

      pushToast: (t) => {
        const id = `t_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        set((s) => ({
          ui: {
            ...s.ui,
            toastQueue: [...s.ui.toastQueue, { id, ...t }].slice(-10),
          },
        }));
        setTimeout(() => get().dismissToast(id), 6000);
        return id;
      },
      dismissToast: (id) =>
        set((s) => ({
          ui: {
            ...s.ui,
            toastQueue: s.ui.toastQueue.filter((t) => t.id !== id),
          },
        })),
      clearToasts: () => set((s) => ({ ui: { ...s.ui, toastQueue: [] } })),

      acceptCookies: (opts) =>
        set((s) => ({
          ui: {
            ...s.ui,
            cookieConsent: {
              ...s.ui.cookieConsent,
              marketing: opts.marketing,
              analytics: opts.analytics,
              acceptedAt: Date.now(),
              dismissed: true,
            },
          },
        })),
      dismissCookieBanner: () =>
        set((s) => ({
          ui: {
            ...s.ui,
            cookieConsent: { ...s.ui.cookieConsent, dismissed: true },
          },
        })),
    }),
    {
      name: "vroomcar:ui",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        ui: {
          compactMode: s.ui.compactMode,
          gridMode: s.ui.gridMode,
          perPage: s.ui.perPage,
          sidebarOpen: s.ui.sidebarOpen,
          cookieConsent: s.ui.cookieConsent,
        },
        locale: s.locale,
        compare: s.compare,
        search: s.search,
      }),
      version: 2,
    }
  )
);
