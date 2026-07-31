"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { CarFront, Heart, ArrowRight, Zap, Fuel, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Vehicle Card Component
function VehicleCard({ vehicle, index }: { vehicle: any; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isLiked, setIsLiked] = React.useState(false);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <div className="relative h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-3xl overflow-hidden border border-white/10 hover:border-[#A7CD0F]/30 transition-all duration-300">
        {/* Image */}
        <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-[#253E38]/20 to-[#A7CD0F]/20">
          <motion.div
            className="w-full h-full flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            <CarFront className="w-24 h-24 text-white/20" />
          </motion.div>
          
          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold",
              vehicle.badge === "Nouveau" ? "bg-[#A7CD0F] text-[#101418]" : "bg-white/10 text-white"
            )}>
              {vehicle.badge}
            </span>
          </div>
          
          {/* Like Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <Heart className={cn("w-5 h-5 transition-colors", isLiked ? "fill-[#A7CD0F] text-[#A7CD0F]" : "text-white")} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#A7CD0F] font-medium">{vehicle.brand}</span>
            <span className="text-xs text-white/50">{vehicle.year}</span>
          </div>
          <h3 className="font-heading text-xl font-bold text-white mb-2">{vehicle.name}</h3>
          <p className="text-sm text-white/60 mb-4">{vehicle.description}</p>
          
          {/* Specs */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-xs text-white/70">
              <Zap className="w-4 h-4" />
              <span>{vehicle.power}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/70">
              <Fuel className="w-4 h-4" />
              <span>{vehicle.fuel}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/70">
              <Gauge className="w-4 h-4" />
              <span>{vehicle.km}</span>
            </div>
          </div>
          
          {/* Price & CTA */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-heading font-bold text-2xl text-[#A7CD0F]">{vehicle.price}</div>
              <div className="text-xs text-white/50">FCFA TTC</div>
            </div>
            <Button
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white rounded-full"
              onClick={() => window.location.href = `/vehicles/${vehicle.slug}`}
            >
              Voir détails
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedVehicles() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const vehicles = [
    {
      id: 1,
      name: "Tesla Model S Plaid",
      brand: "Tesla",
      year: "2024",
      badge: "Nouveau",
      description: "Berline électrique ultra-performante",
      power: "1020 ch",
      fuel: "Électrique",
      km: "0 km",
      price: "15 000 000 FCFA",
      slug: "tesla-model-s-plaid"
    },
    {
      id: 2,
      name: "Mercedes-AMG GT",
      brand: "Mercedes",
      year: "2024",
      badge: "Premium",
      description: "Coupé sportif d'exception",
      power: "585 ch",
      fuel: "Essence",
      km: "5 000 km",
      price: "90 000 000 FCFA",
      slug: "mercedes-amg-gt"
    },
    {
      id: 3,
      name: "Porsche Taycan Turbo",
      brand: "Porsche",
      year: "2023",
      badge: "Électrique",
      description: "Sportive 100% électrique",
      power: "680 ch",
      fuel: "Électrique",
      km: "12 000 km",
      price: "70 000 000 FCFA",
      slug: "porsche-taycan-turbo"
    },
    {
      id: 4,
      name: "BMW M4 Competition",
      brand: "BMW",
      year: "2024",
      badge: "Sport",
      description: "Coupé haute performance",
      power: "510 ch",
      fuel: "Essence",
      km: "3 000 km",
      price: "60 000 000 FCFA",
      slug: "bmw-m4-competition"
    },
    {
      id: 5,
      name: "Audi RS e-tron GT",
      brand: "Audi",
      year: "2024",
      badge: "Nouveau",
      description: "Gran Turismo électrique",
      power: "598 ch",
      fuel: "Électrique",
      km: "0 km",
      price: "65 000 000 FCFA",
      slug: "audi-rs-etron-gt"
    },
    {
      id: 6,
      name: "Range Rover Sport",
      brand: "Land Rover",
      year: "2023",
      badge: "SUV",
      description: "SUV de luxe tout-terrain",
      power: "530 ch",
      fuel: "Hybride",
      km: "8 000 km",
      price: "57 000 000 FCFA",
      slug: "range-rover-sport"
    }
  ];
  
  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#101418] to-[#0a0a0a]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#253E38]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#A7CD0F]/5 rounded-full blur-3xl" />
      
      <div className="container-premium relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#A7CD0F]/10 border border-[#A7CD0F]/20 text-[#A7CD0F] text-sm font-medium mb-4">
            Collection Exclusive
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Véhicules en Vedette
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Découvrez notre sélection de véhicules premium soigneusement choisis pour leur excellence et leur performance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {vehicles.map((vehicle, index) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
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
            className="bg-[#A7CD0F] text-[#101418] hover:bg-[#A7CD0F]/90 px-8 py-6 rounded-full font-semibold shadow-[0_0_40px_rgba(167,205,15,0.3)]"
            onClick={() => window.location.href = "/vehicles"}
          >
            Voir tous les véhicules
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
