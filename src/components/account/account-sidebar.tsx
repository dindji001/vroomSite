"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

const navItems = [
  { href: "/account", label: "Tableau de bord", icon: "🏠" },
  { href: "/account/profile", label: "Mon profil", icon: "👤" },
  { href: "/account/orders", label: "Mes commandes", icon: "📦" },
  { href: "/account/wishlist", label: "Mes favoris", icon: "❤️" },
  { href: "/account/addresses", label: "Adresses", icon: "📍" },
  { href: "/account/payment-methods", label: "Moyens de paiement", icon: "💳" },
  { href: "/account/wallet", label: "Portefeuille", icon: "💰" },
  { href: "/account/loyalty", label: "Programme fidélité", icon: "⭐" },
  { href: "/account/referrals", label: "Parrainage", icon: "🎁" },
  { href: "/account/support", label: "Support", icon: "💬" },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="space-y-6">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
              pathname === item.href
                ? "bg-[#253E38] text-white dark:bg-[#A7CD0F] dark:text-[#101418]"
                : "hover:bg-muted"
            )}
          >
            <span>{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <button
        onClick={() => logout()}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
      >
        <span>🚪</span>
        <span className="font-medium">Déconnexion</span>
      </button>
    </div>
  );
}
