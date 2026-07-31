"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { 
  Navigation, 
  Truck, 
  CarFront, 
  Package, 
  ShoppingBag, 
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Globe,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Service Card Component
function ServiceCard({ 
  service, 
  index 
}: { 
  service: {
    title: string;
    description: string;
    icon: any;
    gradient: string;
    features: string[];
    href: string;
  };
  index: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      {/* Glass Effect Card */}
      <div className="relative h-full p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
        {/* Gradient Background */}
        <motion.div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            service.gradient
          )}
          initial={{ scale: 0.8, opacity: 0 }}
          whileHover={{ scale: 1.1, opacity: 0.15 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Animated Border Gradient */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(45deg, transparent, rgba(167,205,15,0.3), transparent)`,
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Icon */}
          <motion.div
            className="relative mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center",
              service.gradient.replace("opacity-15", "opacity-20")
            )}>
              <service.icon className="w-8 h-8 text-white" />
            </div>
            <motion.div
              className="absolute inset-0 rounded-2xl blur-xl opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: service.gradient.replace("opacity-15", "opacity-30"),
              }}
            />
          </motion.div>
          
          {/* Title */}
          <h3 className="font-heading text-2xl font-bold text-white mb-3 group-hover:text-[#A7CD0F] transition-colors duration-300">
            {service.title}
          </h3>
          
          {/* Description */}
          <p className="text-white/70 text-sm leading-relaxed mb-6 flex-1">
            {service.description}
          </p>
          
          {/* Features */}
          <div className="space-y-2 mb-6">
            {service.features.slice(0, 3).map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className="flex items-center gap-2 text-sm text-white/60"
              >
                <Sparkles className="w-3 h-3 text-[#A7CD0F]" />
                {feature}
              </motion.div>
            ))}
          </div>
          
          {/* Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outline"
              className={cn(
                "w-full group-hover:bg-white group-hover:text-[#101418] transition-all duration-300 border-white/20",
                "relative overflow-hidden"
              )}
              asChild
            >
              <a href={service.href} className="flex items-center justify-center gap-2">
                <span className="relative z-10">En savoir plus</span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </a>
            </Button>
          </motion.div>
        </div>
        
        {/* Corner Decorations */}
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#A7CD0F]/50" />
        <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-[#A7CD0F]/50" />
      </div>
    </motion.div>
  );
}

// Floating Icons Background
function FloatingIcons() {
  const icons = [Navigation, Truck, CarFront, Package, ShoppingBag];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          animate={{
            opacity: [0, 0.1, 0],
            y: [null, null, (Math.random() - 0.5) * 100],
            rotate: [null, null, Math.random() * 360],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <Icon className="w-16 h-16 text-[#A7CD0F]/20" />
        </motion.div>
      ))}
    </div>
  );
}

export function ServicesSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const services = [
    {
      title: "Vroom Track GPS avec IA",
      description: "Suivi intelligent de votre flotte avec géolocalisation précise, alertes en temps réel et analyse prédictive grâce à l'intelligence artificielle.",
      icon: Navigation,
      gradient: "bg-gradient-to-br from-[#253E38]/15 to-[#A7CD0F]/15",
      features: ["Géolocalisation temps réel", "Alertes intelligentes", "Analyse prédictive IA"],
      href: "/services/gps-tracking",
    },
    {
      title: "Gestion de mobilité",
      description: "Solutions complètes pour optimiser votre parc automobile : planification des trajets, gestion des conducteurs et réduction des coûts.",
      icon: Truck,
      gradient: "bg-gradient-to-br from-[#A7CD0F]/15 to-[#FEB300]/15",
      features: ["Optimisation trajets", "Gestion conducteurs", "Réduction coûts"],
      href: "/services/mobility",
    },
    {
      title: "Vente de véhicules",
      description: "Large sélection de véhicules neufs et d'occasion certifiés. Financement sur mesure et garantie premium incluse.",
      icon: CarFront,
      gradient: "bg-gradient-to-br from-[#253E38]/15 to-[#3a5c54]/15",
      features: ["Véhicules certifiés", "Financement LOA/LLD", "Garantie 24 mois"],
      href: "/vehicles",
    },
    {
      title: "Import Export",
      description: "Services d'importation et exportation de véhicules dans toute l'Europe et au-delà. Dédouanement et logistique inclus.",
      icon: Package,
      gradient: "bg-gradient-to-br from-[#FEB300]/15 to-[#A7CD0F]/15",
      features: ["Europe & International", "Dédouanement inclus", "Logistique complète"],
      href: "/services/import-export",
    },
    {
      title: "Boutique",
      description: "Accessoires, pneumatiques, entretien et pièces de performance. Tout pour votre véhicule en un seul endroit.",
      icon: ShoppingBag,
      gradient: "bg-gradient-to-br from-[#A7CD0F]/15 to-[#253E38]/15",
      features: ["Large catalogue", "Livraison rapide", "Prix compétitifs"],
      href: "/products",
    },
  ];
  
  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#101418] to-[#0a0a0a]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#253E38]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#A7CD0F]/10 rounded-full blur-3xl" />
        <FloatingIcons />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container-premium">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A7CD0F]/10 border border-[#A7CD0F]/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#A7CD0F]" />
            <span className="text-sm font-medium text-[#A7CD0F]">Nos Services Premium</span>
          </motion.div>
          
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Des solutions
            <span className="block bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              sur mesure
            </span>
          </h2>
          
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Découvrez notre gamme complète de services automobiles premium, conçus pour répondre à tous vos besoins avec excellence et innovation.
          </p>
        </motion.div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 md:mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 rounded-3xl bg-gradient-to-r from-[#253E38]/10 to-[#A7CD0F]/10 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#A7CD0F]/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#A7CD0F]" />
              </div>
              <div className="text-left">
                <div className="font-heading font-bold text-white">Besoin d'un conseil ?</div>
                <div className="text-sm text-white/60">Nos experts sont à votre écoute</div>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-[#A7CD0F] text-[#101418] hover:bg-[#A7CD0F]/90 px-8 py-6 rounded-full font-semibold shadow-[0_0_40px_rgba(167,205,15,0.3)]"
              asChild
            >
              <a href="/contact" className="flex items-center gap-2">
                Contacter un expert
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
