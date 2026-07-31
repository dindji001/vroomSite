"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#253E38]/20 to-[#0a0a0a]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A7CD0F]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#253E38]/10 rounded-full blur-3xl" />
      
      <div className="container-premium relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à Trouver Votre Véhicule de Rêve ?
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              Contactez nos experts dès aujourd'hui pour une consultation personnalisée et découvrez comment VroomCar peut transformer votre expérience automobile.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#A7CD0F]/20 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-[#A7CD0F]" />
              </div>
              <div className="text-white font-semibold mb-2">Téléphone</div>
              <a href="tel:+2250123456789" className="text-white/60 hover:text-[#A7CD0F] transition-colors">
                +225 01 23 45 67 89
              </a>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#A7CD0F]/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-[#A7CD0F]" />
              </div>
              <div className="text-white font-semibold mb-2">Email</div>
              <a href="mailto:contact@vroomcar.ci" className="text-white/60 hover:text-[#A7CD0F] transition-colors">
                contact@vroomcar.ci
              </a>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#A7CD0F]/20 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-[#A7CD0F]" />
              </div>
              <div className="text-white font-semibold mb-2">Adresse</div>
              <span className="text-white/60">
                Abidjan, Côte d'Ivoire
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-[#A7CD0F] text-[#101418] hover:bg-[#A7CD0F]/90 px-8 py-6 rounded-full font-semibold shadow-[0_0_40px_rgba(167,205,15,0.3)]"
              onClick={() => window.location.href = "/contact"}
            >
              Demander un devis gratuit
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full font-semibold"
              onClick={() => window.location.href = "/vehicles"}
            >
              Voir nos véhicules
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
