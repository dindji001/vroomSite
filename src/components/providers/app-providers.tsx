"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";
import { useAuthStore, useWishlistStore, useCartStore } from "@/store";
import { useUIStore } from "@/store/ui-store";
import { useToast, useMounted, useStickyHeader } from "@/hooks";
import { cn } from "@/lib/utils";

export function StoreInitializer({ children }: { children: React.ReactNode }) {
  const initAuth = useAuthStore((s) => s.init);
  const initCart = useCartStore((s) => s.init);
  const initWishlist = useWishlistStore((s) => s.init);
  const user = useAuthStore((s) => s.user);
  const initialized = useMounted();
  const didInit = React.useRef(false);

  React.useEffect(() => {
    if (!initialized || didInit.current) return;
    didInit.current = true;
    void Promise.allSettled([initAuth(), initCart(), initWishlist(user)]);
  }, [initialized, initAuth, initCart, initWishlist, user]);

  return <>{children}</>;
}

export function NavbarScrollSyncer() {
  const setScrolled = useUIStore((s) => s.setScrolled);
  const scrolled = useStickyHeader(16);
  React.useEffect(() => setScrolled(scrolled), [scrolled, setScrolled]);
  return null;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="vroomcar:theme"
      themes={["light", "dark"]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

export function ToastRenderer() {
  const queue = useUIStore((s) => s.ui?.toastQueue) || [];
  const dismiss = useUIStore((s) => s.dismissToast);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[120] flex flex-col items-center gap-3 px-4 md:top-6 md:items-end md:pr-6 lg:pr-10">
      {queue.slice(-6).map((t) => (
        <div
          key={t.id}
          className={cn(
            "pointer-events-auto w-full max-w-sm rounded-2xl border border-border/60 bg-card p-4 shadow-premium animate-[slideDownIn_.28s_ease-out] backdrop-blur-xl",
            t.type === "success" &&
              "border-success/30 shadow-[0_10px_30px_-12px_rgba(16,185,129,0.45)]",
            t.type === "error" &&
              "border-destructive/30 shadow-[0_10px_30px_-12px_rgba(239,68,68,0.45)]",
            t.type === "warning" &&
              "border-warning/30 shadow-[0_10px_30px_-12px_rgba(250,204,21,0.45)]",
            t.type === "info" &&
              "border-info/30 shadow-[0_10px_30px_-12px_rgba(59,130,246,0.45)]"
          )}
          role={t.type === "error" ? "alert" : "status"}
        >
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "mt-0.5 size-8 rounded-xl flex items-center justify-center shrink-0",
                t.type === "success" && "bg-success/15 text-success",
                t.type === "error" && "bg-destructive/15 text-destructive",
                t.type === "warning" && "bg-warning/15 text-warning",
                t.type === "info" && "bg-info/15 text-info"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {t.type === "success" ? (
                  <path d="M20 6 9 17l-5-5" />
                ) : t.type === "error" ? (
                  <path d="M18 6 6 18M6 6l12 12" />
                ) : t.type === "warning" ? (
                  <>
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                  </>
                ) : (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </>
                )}
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              {t.title && (
                <div className="font-heading text-sm font-bold">{t.title}</div>
              )}
              {t.message && (
                <div className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                  {t.message}
                </div>
              )}
            </div>
            <button
              type="button"
              aria-label="Fermer"
              onClick={() => dismiss(t.id)}
              className="-m-1.5 size-8 rounded-xl flex items-center justify-center text-muted-foreground/70 hover:bg-muted hover:text-foreground transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const isProduction = process.env.NODE_ENV === "production";

export function AnalyticsAutoTracker() {
  const lastPath = React.useRef<string | null>(null);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const track = () => {
      if (lastPath.current === window.location.pathname) return;
      lastPath.current = window.location.pathname;
      // Track page view via API (production only or when configured)
    };
    track();
    window.addEventListener("popstate", track);
    const orig = history.pushState;
    history.pushState = function (...args) {
      const r = orig.apply(this, args as any);
      setTimeout(track, 10);
      return r;
    };
    return () => {
      window.removeEventListener("popstate", track);
    };
  }, []);
  return null;
}

export function CookieConsentBanner() {
  const { ui, acceptCookies, dismissCookieBanner } = useUIStore();
  const show =
    !ui.cookieConsent.dismissed &&
    (ui.cookieConsent.marketing === null || ui.cookieConsent.analytics === null);
  if (!show) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-[110] px-4 pb-4 md:pb-6">
      <div className="mx-auto max-w-5xl rounded-3xl border border-border/60 bg-card/95 p-5 md:p-6 shadow-premium backdrop-blur-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="flex-1">
            <div className="font-heading text-lg font-bold">Cookies & confidentialité</div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground max-w-3xl">
              Nous utilisons des cookies pour améliorer votre expérience, mesurer
              l&apos;audience et personnaliser nos contenus. Vous pouvez gérer vos
              préférences à tout moment.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            <button
              onClick={() => acceptCookies({ marketing: false, analytics: false })}
              className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:bg-muted transition-colors"
            >
              Essentiels uniquement
            </button>
            <button
              onClick={() => acceptCookies({ marketing: true, analytics: true })}
              className="inline-flex items-center justify-center rounded-xl bg-[#253E38] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:translate-y-[-1px] transition-all dark:bg-[#A7CD0F] dark:text-[#101418]"
            >
              Tout accepter
            </button>
            <button
              onClick={dismissCookieBanner}
              aria-label="Fermer"
              className="md:hidden inline-flex items-center justify-center size-10 rounded-xl bg-muted text-foreground/70"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <StoreInitializer>
        <NavbarScrollSyncer />
        <AnalyticsAutoTracker />
        {children}
        <ToastRenderer />
        <CookieConsentBanner />
      </StoreInitializer>
    </ThemeProvider>
  );
}

export default AppProviders;
