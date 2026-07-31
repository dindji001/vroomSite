"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { 
  Globe, 
  Ship, 
  Plane, 
  Truck, 
  FileText, 
  ShieldCheck, 
  Clock, 
  Award,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Zap,
  Package,
  MapPin,
  Navigation,
  BarChart3,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { cn } from "@/lib/utils";

// Service Card Component
function ServiceCard({ 
  icon: Icon, 
  title, 
  description, 
  color,
  index 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  color: string;
  index: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="relative h-full p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <motion.div
          className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
            color
          )}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>
        <h3 className="font-heading text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/70 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// Process Step Component
function ProcessStep({ 
  step, 
  title, 
  description, 
  icon: Icon,
  index 
}: { 
  step: number; 
  title: string; 
  description: string; 
  icon: any;
  index: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={cn(
        "flex gap-6",
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      <div className="flex-1">
        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-[#253E38]/10 to-[#A7CD0F]/10 border border-white/10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#A7CD0F]/20 flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6 text-[#A7CD0F]" />
            </div>
            <div>
              <div className="text-[#A7CD0F] font-bold text-sm mb-1">Étape {step}</div>
              <h4 className="font-heading text-lg font-bold text-white mb-2">{title}</h4>
              <p className="text-white/70 text-sm">{description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-[#A7CD0F]" />
      </div>
      <div className="hidden md:block w-24" />
    </motion.div>
  );
}

// Advantage Card Component
function AdvantageCard({ 
  icon: Icon, 
  title, 
  description, 
  index 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  index: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#A7CD0F]/30 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-[#A7CD0F]/20 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-[#A7CD0F]" />
      </div>
      <h3 className="font-heading text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-white/70 text-sm">{description}</p>
    </motion.div>
  );
}

export default function ImportExportPage() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const services = [
    {
      icon: Globe,
      title: "Importation",
      description: "Importation de véhicules depuis l'Union Européenne et les pays tiers avec formalités douanières.",
      color: "bg-gradient-to-br from-[#253E38]/20 to-[#A7CD0F]/20",
    },
    {
      icon: Ship,
      title: "Exportation",
      description: "Exportation de véhicules vers le monde entier avec transport maritime et aérien.",
      color: "bg-gradient-to-br from-[#A7CD0F]/20 to-[#FEB300]/20",
    },
    {
      icon: Plane,
      title: "Transport Aérien",
      description: "Transport rapide par avion pour les véhicules d'exception et les commandes urgentes.",
      color: "bg-gradient-to-br from-[#FEB300]/20 to-[#A7CD0F]/20",
    },
    {
      icon: Truck,
      title: "Transport Routier",
      description: "Transport par route avec convoyage professionnel et assurance complète.",
      color: "bg-gradient-to-br from-[#253E38]/20 to-[#3a5c54]/20",
    },
  ];
  
  const process = [
    { step: 1, title: "Consultation", description: "Analyse de vos besoins et établissement d'un devis personnalisé.", icon: FileText },
    { step: 2, title: "Recherche", description: "Sélection du véhicule idéal selon vos critères et budget.", icon: Package },
    { step: 3, title: "Formalités", description: "Gestion complète des démarches administratives et douanières.", icon: ShieldCheck },
    { step: 4, title: "Livraison", description: "Transport sécurisé et livraison à l'adresse de votre choix.", icon: Truck },
  ];
  
  const advantages = [
    {
      icon: ShieldCheck,
      title: "Assurance Complète",
      description: "Couverture assurance intégrée pour tous vos transports.",
    },
    {
      icon: Clock,
      title: "Délais Garantis",
      description: "Respect strict des délais annoncés avec suivi en temps réel.",
    },
    {
      icon: Award,
      title: "Expertise Douanière",
      description: "Connaissance approfondie des réglementations internationales.",
    },
    {
      icon: FileText,
      title: "Gestion Administrative",
      description: "Prise en charge complète de toutes les formalités.",
    },
    {
      icon: Globe,
      title: "Réseau Mondial",
      description: "Partenaires dans plus de 50 pays pour une logistique optimisée.",
    },
    {
      icon: CheckCircle,
      title: "Qualité Garantie",
      description: "Véhicules vérifiés et certifiés avant expédition.",
    },
  ];
  
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#101418] to-[#0a0a0a]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#253E38]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#A7CD0F]/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 container-premium">
          <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: "Import / Export", href: "/services/import-export" }]} />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mt-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A7CD0F]/10 border border-[#A7CD0F]/20 mb-6"
            >
              <Globe className="w-4 h-4 text-[#A7CD0F]" />
              <span className="text-sm font-medium text-[#A7CD0F]">Services Internationaux</span>
            </motion.div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Import / Export
              <span className="block bg-gradient-to-r from-[#A7CD0F] to-[#FEB300] bg-clip-text text-transparent">
                Véhicules Premium
              </span>
            </h1>
            
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Nous facilitons l'importation et l'exportation de véhicules dans toute l'Afrique et au-delà. 
              Une expertise sans faille pour vos projets automobiles internationaux.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#A7CD0F] text-[#101418] hover:bg-[#A7CD0F]/90 px-8 py-6 rounded-full font-semibold shadow-[0_0_40px_rgba(167,205,15,0.3)]"
                onClick={() => window.location.href = "/contact"}
              >
                Demander un devis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full"
                onClick={() => window.location.href = "tel:+2250123456789"}
              >
                <Phone className="w-4 h-4 mr-2" />
                +225 01 23 45 67 89
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Nos Services d'Import / Export
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Des solutions complètes pour l'importation et l'exportation de véhicules, 
              avec accompagnement personnalisé et gestion administrative.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Notre Processus
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Un processus simplifié et transparent pour garantir une expérience sans faille.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {process.map((item, index) => (
              <ProcessStep key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Pourquoi Choisir VroomCar ?
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Des avantages exclusifs pour une expérience d'import/export premium.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <AdvantageCard key={index} {...advantage} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#253E38]/20 to-[#0a0a0a]" />
        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à Importer ou Exporter Votre Véhicule ?
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Contactez nos experts pour un devis personnalisé et découvrez comment nous pouvons faciliter votre projet automobile international.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full"
                onClick={() => window.location.href = "mailto:contact@vroomcar.ci"}
              >
                <Mail className="w-4 h-4 mr-2" />
                contact@vroomcar.ci
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
