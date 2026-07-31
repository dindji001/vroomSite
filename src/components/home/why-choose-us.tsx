"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { 
  ShieldCheck, 
  Clock, 
  Award, 
  Users, 
  Globe, 
  Headphones,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

// Feature Card Component
function FeatureCard({ feature, index }: { feature: any; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="p-8 rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 hover:border-[#A7CD0F]/30 transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#A7CD0F]/20 flex items-center justify-center mb-6">
        <feature.icon className="w-7 h-7 text-[#A7CD0F]" />
      </div>
      <h3 className="font-heading text-xl font-bold text-white mb-3">{feature.title}</h3>
      <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

export function WhyChooseUs() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const features = [
    {
      icon: ShieldCheck,
      title: "Qualité Garantie",
      description: "Tous nos véhicules sont rigoureusement inspectés et certifiés selon les standards les plus élevés de l'industrie."
    },
    {
      icon: Clock,
      title: "Service Rapide",
      description: "Processus d'achat simplifié et livraison accélérée pour une expérience client sans attente."
    },
    {
      icon: Award,
      title: "Expertise Reconnue",
      description: "Plus de 15 ans d'expérience dans l'automobile premium avec une équipe de passionnés."
    },
    {
      icon: Users,
      title: "Client Satisfait",
      description: "98% de nos clients nous recommandent, preuve de notre engagement envers l'excellence."
    },
    {
      icon: Globe,
      title: "Réseau International",
      description: "Partenaires dans plus de 50 pays pour des services d'import/export de qualité."
    },
    {
      icon: Headphones,
      title: "Support 24/7",
      description: "Assistance dédiée disponible à tout moment pour répondre à toutes vos questions."
    }
  ];
  
  const benefits = [
    "Véhicules vérifiés et certifiés",
    "Garantie étendue incluse",
    "Financement sur mesure",
    "Livraison à domicile",
    "Service après-vente premium",
    "Échange possible sous 30 jours"
  ];
  
  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#101418] to-[#0a0a0a]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#253E38]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#A7CD0F]/5 rounded-full blur-3xl" />
      
      <div className="container-premium relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#A7CD0F]/10 border border-[#A7CD0F]/20 text-[#A7CD0F] text-sm font-medium mb-4">
              Pourquoi Nous Choisir
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              L'Excellence au Service de Vos Besoins
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Chez VroomCar, nous nous engageons à offrir une expérience automobile exceptionnelle. 
              Notre passion pour l'excellence se reflète dans chaque aspect de nos services.
            </p>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#A7CD0F] shrink-0" />
                  <span className="text-white/80">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Right Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
