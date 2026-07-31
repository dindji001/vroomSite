"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Truck, Shield, Phone, Share2, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function TopBar() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 50], [1, 0]);
  const y = useTransform(scrollY, [0, 50], [0, -32]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#253E38] text-white"
    >
      <div className="container-premium">
        <div className="h-9 flex items-center justify-between text-xs">
          {/* Left side - Info */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-white/90">
              <Truck className="w-3.5 h-3.5" />
              <span>Livraison en Côte d'Ivoire</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Shield className="w-3.5 h-3.5" />
              <span>Garantie Premium</span>
            </div>
          </div>

          {/* Center - Phone */}
          <div className="flex items-center gap-2 text-white/90">
            <Phone className="w-3.5 h-3.5" />
            <a href="tel:+2250123456789" className="hover:text-[#A7CD0F] transition-colors">
              +225 01 23 45 67 89
            </a>
          </div>

          {/* Right side - Social */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="text-white/70 hover:text-[#A7CD0F] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-white/70 hover:text-[#A7CD0F] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-white/70 hover:text-[#A7CD0F] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-white/70 hover:text-[#A7CD0F] transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
