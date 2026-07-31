"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  CarFront,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Globe,
  ChevronDown,
  Navigation,
  Truck,
  Package,
  FileCheck,
  Phone,
  Languages,
  Moon,
  Sun,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { useUIStore } from "@/store/ui-store";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useMounted } from "@/hooks";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const scrolled = useTransform(scrollY, [0, 50], [0, 1]);
  const backgroundColor = useTransform(scrollY, [0, 50], ["transparent", "rgba(255, 255, 255, 0.95)"]);
  const textColor = useTransform(scrollY, [0, 50], ["#ffffff", "#253E38"]);
  const logoScale = useTransform(scrollY, [0, 50], [1, 0.9]);
  const navbarHeight = useTransform(scrollY, [0, 50], [80, 64]);
  
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [languageOpen, setLanguageOpen] = React.useState(false);
  
  const pathname = usePathname();
  const toggleDrawer = useUIStore((s) => s.toggleDrawer);
  const openModal = useUIStore((s) => s.openModal);
  const isAuth = useAuthStore((s) => s.isAuthenticated());
  const countCart = useCartStore((s) => s.uniqueCount());
  const countWish = useWishlistStore((s) => s.count());
  const mount = useMounted();

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/services", label: "Services", hasDropdown: true },
    { href: "/vehicles", label: "Véhicules" },
    { href: "/services/gps-tracking", label: "Vroom Track GPS" },
    { href: "/services/import-export", label: "Import / Export" },
    { href: "/products", label: "Boutique" },
    { href: "/about", label: "À propos" },
    { href: "/contact", label: "Contact" },
  ];

  const servicesItems = [
    { icon: Navigation, title: "Vroom Track GPS", description: "Suivi GPS en temps réel", href: "/services/gps-tracking" },
    { icon: Truck, title: "Gestion de mobilité", description: "Optimisation de flotte", href: "/services/mobility" },
    { icon: CarFront, title: "Vente de véhicules", description: "Véhicules premium", href: "/vehicles" },
    { icon: Package, title: "Import / Export", description: "Services internationaux", href: "/services/import-export" },
    { icon: ShoppingBag, title: "Boutique", description: "Accessoires auto", href: "/products" },
  ];

  return (
    <>
      <motion.nav
        style={{
          backgroundColor,
          color: textColor,
          height: navbarHeight,
        }}
        className="fixed top-9 left-0 right-0 z-40 transition-all duration-300"
      >
        <div className="container-premium h-full flex items-center justify-between">
          {/* Logo */}
          <motion.div style={{ scale: logoScale }} className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#253E38] to-[#3a5c54] dark:from-[#A7CD0F] dark:to-[#7d9b0a] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <CarFront className="w-5 h-5 text-white dark:text-[#101418]" />
              </div>
              <div className="hidden sm:block">
                <div className="font-heading font-bold text-lg leading-tight">VroomCar</div>
                <div className="text-[10px] uppercase tracking-wider opacity-70">Excellence</div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setServicesOpen(true)}
                onMouseLeave={() => link.hasDropdown && setServicesOpen(false)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[#A7CD0F] flex items-center gap-1",
                    pathname === link.href ? "text-[#A7CD0F]" : ""
                  )}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
                {link.hasDropdown && (
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px]"
                      >
                        <div className="bg-white dark:bg-[#101418] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 p-6 grid grid-cols-2 gap-4">
                          {servicesItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="group p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                            >
                              <div className="w-10 h-10 rounded-lg bg-[#253E38]/10 dark:bg-[#A7CD0F]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <item.icon className="w-5 h-5 text-[#253E38] dark:text-[#A7CD0F]" />
                              </div>
                              <h3 className="font-semibold text-sm mb-1 group-hover:text-[#A7CD0F] transition-colors">{item.title}</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                              <ArrowRight className="w-4 h-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative hidden md:block">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLanguageOpen(!languageOpen)}
                className="relative"
              >
                <Languages className="w-5 h-5" />
              </Button>
              <AnimatePresence>
                {languageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 bg-white dark:bg-[#101418] rounded-xl shadow-lg border border-gray-200 dark:border-white/10 p-2 min-w-[120px]"
                  >
                    {["FR", "EN", "DE", "ES"].map((lang) => (
                      <button
                        key={lang}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-sm font-medium transition-colors"
                        onClick={() => setLanguageOpen(false)}
                      >
                        {lang}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => isAuth ? toggleDrawer("wishlist") : openModal("login")}
              className="relative"
            >
              <Heart className="w-5 h-5" />
              {mount && countWish > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-[#A7CD0F] text-[#101418]">
                  {countWish > 99 ? "99+" : countWish}
                </Badge>
              )}
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleDrawer("cart")}
              className="relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {mount && countCart > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-[#253E38] text-white">
                  {countCart > 99 ? "99+" : countCart}
                </Badge>
              )}
            </Button>

            {/* Profile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => isAuth ? (window.location.href = "/account") : openModal("login")}
            >
              <User className="w-5 h-5" />
            </Button>

            {/* CTA Button */}
            <Button
              className="hidden md:inline-flex bg-[#253E38] hover:bg-[#1E312D] text-white"
              onClick={() => (window.location.href = "/contact")}
            >
              <FileCheck className="w-4 h-4 mr-2" />
              Demander un devis
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-[#101418] z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#253E38] to-[#3a5c54] dark:from-[#A7CD0F] dark:to-[#7d9b0a] flex items-center justify-center">
                      <CarFront className="w-5 h-5 text-white dark:text-[#101418]" />
                    </div>
                    <div className="font-heading font-bold text-lg">VroomCar</div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <nav className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-colors",
                        pathname === link.href
                          ? "bg-[#253E38]/10 text-[#253E38] dark:bg-[#A7CD0F]/10 dark:text-[#A7CD0F]"
                          : "hover:bg-gray-100 dark:hover:bg-white/5"
                      )}
                    >
                      {link.label}
                      {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                    </Link>
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10">
                  <Button
                    className="w-full bg-[#253E38] hover:bg-[#1E312D] text-white mb-4"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.location.href = "/contact";
                    }}
                  >
                    <FileCheck className="w-4 h-4 mr-2" />
                    Demander un devis
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Phone className="w-4 h-4" />
                    <a href="tel:+2250123456789" className="hover:text-[#A7CD0F]">
                      +225 01 23 45 67 89
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
