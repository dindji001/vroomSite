"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { 
  Navigation, 
  Truck, 
  CarFront, 
  Package, 
  ShieldCheck, 
  ArrowRight,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Service Card Component
function ServiceCard({ service, index }: { service: any; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 hover:border-[#A7CD0F]/30 transition-all duration-300">
        <motion.div
          className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center mb-6",
            service.color
          )}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <service.icon className="w-8 h-8 text-white" />
        </motion.div>
        <h3 className="font-heading text-2xl font-bold text-white mb-3">{service.title}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-6">{service.description}</p>
        <div className="flex items-center gap-2 text-[#A7CD0F] font-medium text-sm group-hover:gap-3 transition-all">
          <span>En savoir plus</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesOverview() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const services = [
    {
      icon: Navigation,
      title: "Vroom Track GPS",
      description: "Suivi GPS en temps réel de votre flotte avec géolocalisation précise et alertes intelligentes.",
      color: "bg-gradient-to-br from-[#253E38]/20 to-[#A7CD0F]/20",
      href: "/services/gps-tracking"
    },
    {
      icon: Truck,
      title: "Gestion de Mobilité",
      description: "Solutions complètes pour la gestion de votre parc automobile et optimisation des trajets.",
      color: "bg-gradient-to-br from-[#A7CD0F]/20 to-[#FEB300]/20",
      href: "/services/mobility"
    },
    {
      icon: CarFront,
      title: "Vente de Véhicules",
      description: "Large sélection de véhicules neufs et d'occasion certifiés, financement sur mesure.",
      color: "bg-gradient-to-br from-[#FEB300]/20 to-[#A7CD0F]/20",
      href: "/vehicles"
    },
    {
      icon: Package,
      title: "Import / Export",
      description: "Services d'importation et exportation de véhicules dans toute l'Afrique et au-delà.",
      color: "bg-gradient-to-br from-[#253E38]/20 to-[#3a5c54]/20",
      href: "/services/import-export"
    },
    {
      icon: ShieldCheck,
      title: "Garantie Premium",
      description: "Protection étendue pour tous vos véhicules avec service d'assistance 24/7.",
      color: "bg-gradient-to-br from-[#A7CD0F]/20 to-[#253E38]/20",
      href: "/services"
    },
    {
      icon: Zap,
      title: "Véhicules Électriques",
      description: "Expertise en véhicules hybrides et électriques avec solutions de recharge.",
      color: "bg-gradient-to-br from-[#253E38]/20 to-[#A7CD0F]/20",
      href: "/vehicles?fuel=electric"
    }
  ];
  
  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#101418] to-[#0a0a0a]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A7CD0F]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#253E38]/5 rounded-full blur-3xl" />
      
      <div className="container-premium relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#A7CD0F]/10 border border-[#A7CD0F]/20 text-[#A7CD0F] text-sm font-medium mb-4">
            Nos Services
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Solutions Premium
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Des services complets pour répondre à tous vos besoins automobiles, de l'achat à la gestion de flotte.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-6 rounded-full font-semibold"
            onClick={() => window.location.href = "/services"}
          >
            Découvrir tous nos services
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
