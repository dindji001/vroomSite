"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Award, Users, Target, Heart, Globe, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Stat Card Component
function StatCard({ value, label, icon: Icon, index }: { value: string; label: string; icon: any; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = React.useState(0);
  const targetValue = parseInt(value.replace(/[^0-9]/g, ""));
  
  React.useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * targetValue));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      const timeout = setTimeout(() => requestAnimationFrame(animate), index * 200);
      return () => clearTimeout(timeout);
    }
  }, [isInView, targetValue, index]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="p-8 rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 hover:border-[#A7CD0F]/30 transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#A7CD0F]/20 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-[#A7CD0F]" />
      </div>
      <div className="font-heading font-bold text-4xl text-white mb-2">
        {count.toLocaleString()}{value.includes("+") && "+"}
      </div>
      <div className="text-white/60">{label}</div>
    </motion.div>
  );
}

// Value Card Component
function ValueCard({ value, icon: Icon, index }: { value: any; icon: any; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 hover:border-[#A7CD0F]/30 transition-all duration-300">
        <div className="w-12 h-12 rounded-xl bg-[#A7CD0F]/20 flex items-center justify-center mb-4 group-hover:scale-1.1 transition-transform">
          <Icon className="w-6 h-6 text-[#A7CD0F]" />
        </div>
        <h3 className="font-heading text-xl font-bold text-white mb-2">{value.title}</h3>
        <p className="text-white/60 text-sm">{value.description}</p>
      </div>
    </motion.div>
  );
}

export function AboutUs() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const stats = [
    { value: "15+", label: "Années d'expérience", icon: Award },
    { value: "5000+", label: "Clients satisfaits", icon: Users },
    { value: "50+", label: "Pays d'Afrique desservis", icon: Globe },
    { value: "98%", label: "Taux de satisfaction", icon: Heart }
  ];
  
  const values = [
    {
      title: "Excellence",
      description: "Nous nous engageons à fournir des services et produits de la plus haute qualité.",
      icon: Award
    },
    {
      title: "Innovation",
      description: "Nous intégrons les dernières technologies pour améliorer votre expérience.",
      icon: Zap
    },
    {
      title: "Transparence",
      description: "Une communication claire et honnête dans toutes nos interactions.",
      icon: Target
    },
    {
      title: "Engagement",
      description: "Notre passion pour l'automobile se reflète dans chaque service que nous offrons.",
      icon: Heart
    }
  ];
  
  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#101418] to-[#0a0a0a]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#253E38]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#A7CD0F]/5 rounded-full blur-3xl" />
      
      <div className="container-premium relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#A7CD0F]/10 border border-[#A7CD0F]/20 text-[#A7CD0F] text-sm font-medium mb-4">
              Qui Sommes Nous
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Une Passion pour l'Excellence Automobile
            </h2>
            <p className="text-white/70 text-lg mb-6 leading-relaxed">
              Fondée en 2009, VroomCar s'est imposée comme une référence dans le secteur automobile premium en Côte d'Ivoire. 
              Notre mission est de transformer l'expérience automobile en offrant des services exceptionnels 
              et des véhicules d'exception.
            </p>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Notre équipe d'experts passionnés s'engage à vous accompagner à chaque étape, 
              de la sélection de votre véhicule idéal à sa livraison à Abidjan et dans toute la Côte d'Ivoire, 
              en passant par tous les services nécessaires à une expérience sans faille.
            </p>
            <Button
              size="lg"
              className="bg-[#A7CD0F] text-[#101418] hover:bg-[#A7CD0F]/90 px-8 py-6 rounded-full font-semibold shadow-[0_0_40px_rgba(167,205,15,0.3)]"
              onClick={() => window.location.href = "/about"}
            >
              En savoir plus sur nous
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
          
          {/* Right Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} index={index} />
            ))}
          </div>
        </div>
        
        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-heading text-3xl font-bold text-white text-center mb-12">
            Nos Valeurs Fondamentales
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <ValueCard key={index} value={value} icon={value.icon} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
