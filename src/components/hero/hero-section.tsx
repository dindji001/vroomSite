"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Play, Sparkles, Navigation, Truck, CarFront, Package, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Slide data
const slides = [
  {
    id: 1,
    title: "VroomCar",
    subtitle: "L'excellence automobile redéfinie",
    description: "Découvrez notre collection exclusive de véhicules premium. Innovation, performance et luxe réunis pour une expérience unique.",
    icon: Sparkles,
    badge: "Bienvenue",
    gradient: "from-[#253E38] via-[#3a5c54] to-[#253E38]",
    accent: "#A7CD0F",
    cta: "Découvrir nos véhicules",
    ctaLink: "/vehicles"
  },
  {
    id: 2,
    title: "Vroom Track GPS",
    subtitle: "Suivi intelligent de votre flotte",
    description: "Localisation en temps réel, géofencing et alertes automatiques pour une gestion optimale de vos véhicules.",
    icon: Navigation,
    badge: "Service",
    gradient: "from-[#A7CD0F]/20 via-[#253E38]/20 to-[#A7CD0F]/20",
    accent: "#A7CD0F",
    cta: "En savoir plus",
    ctaLink: "/services/gps-tracking"
  },
  {
    id: 3,
    title: "Gestion de Mobilité",
    subtitle: "Optimisez votre parc automobile",
    description: "Solutions complètes pour la gestion de flotte, optimisation des trajets et réduction des coûts opérationnels.",
    icon: Truck,
    badge: "Solution",
    gradient: "from-[#253E38]/20 via-[#A7CD0F]/20 to-[#FEB300]/20",
    accent: "#FEB300",
    cta: "Découvrir",
    ctaLink: "/services/mobility"
  },
  {
    id: 4,
    title: "Vente de Véhicules",
    subtitle: "Véhicules premium certifiés",
    description: "Large sélection de véhicules neufs et d'occasion certifiés, avec financement sur mesure et livraison à domicile.",
    icon: CarFront,
    badge: "Collection",
    gradient: "from-[#FEB300]/20 via-[#A7CD0F]/20 to-[#253E38]/20",
    accent: "#A7CD0F",
    cta: "Voir le catalogue",
    ctaLink: "/vehicles"
  },
  {
    id: 5,
    title: "Import / Export",
    subtitle: "Services internationaux",
    description: "Importation et exportation de véhicules dans toute l'Europe et au-delà, avec gestion complète des formalités.",
    icon: Package,
    badge: "International",
    gradient: "from-[#253E38]/20 via-[#3a5c54]/20 to-[#253E38]/20",
    accent: "#A7CD0F",
    cta: "Demander un devis",
    ctaLink: "/services/import-export"
  },
  {
    id: 6,
    title: "Véhicules Électriques",
    subtitle: "L'avenir de la mobilité",
    description: "Expertise en véhicules hybrides et électriques avec solutions de recharge et accompagnement personnalisé.",
    icon: Zap,
    badge: "Innovation",
    gradient: "from-[#A7CD0F]/20 via-[#FEB300]/20 to-[#A7CD0F]/20",
    accent: "#FEB300",
    cta: "Découvrir",
    ctaLink: "/vehicles?fuel=electric"
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  
  const nextSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);
  
  const prevSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);
  
  const goToSlide = React.useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);
  
  // Auto-play
  React.useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, nextSlide]);
  
  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);
  
  const slide = slides[currentSlide];
  const Icon = slide.icon;
  
  return (
    <section 
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#101418] to-[#0a0a0a]" />
      
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#A7CD0F] rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              y: [null, null, (Math.random() - 0.5) * 200],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Light Effects */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A7CD0F]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#253E38]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-8 md:space-y-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              className="space-y-8 md:space-y-12"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
              >
                <Icon className="size-4" style={{ color: slide.accent }} />
                <span className="text-sm font-medium text-white/90">{slide.badge}</span>
              </motion.div>
              
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tight"
              >
                <span className="block">{slide.title}</span>
                <span 
                  className="block bg-gradient-to-r bg-clip-text text-transparent"
                  style={{ 
                    backgroundImage: `linear-gradient(to right, ${slide.accent}, ${slide.accent}aa)` 
                  }}
                >
                  {slide.subtitle}
                </span>
              </motion.h1>
              
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed"
              >
                {slide.description}
              </motion.p>
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="group relative overflow-hidden px-8 py-6 text-base md:text-lg font-semibold rounded-full shadow-[0_0_40px_rgba(167,205,15,0.3)] hover:shadow-[0_0_60px_rgba(167,205,15,0.5)] transition-all duration-300"
                    style={{ 
                      backgroundColor: slide.accent,
                      color: "#101418"
                    }}
                    onClick={() => window.location.href = slide.ctaLink}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {slide.cta}
                      <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <div className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 z-20">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>
      <div className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-20">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
          onClick={nextSlide}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                currentSlide === index 
                  ? "w-8 bg-[#A7CD0F]" 
                  : "bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
