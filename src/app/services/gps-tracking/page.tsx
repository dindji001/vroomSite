"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { 
  Navigation, 
  MapPin, 
  Brain, 
  Bell, 
  Clock, 
  Shield, 
  Users, 
  Play,
  Check,
  ChevronRight,
  ArrowRight,
  Zap,
  Smartphone,
  Globe,
  Route,
  BarChart3,
  Lock,
  AlertTriangle,
  Calendar,
  FileText,
  Video,
  Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { cn } from "@/lib/utils";

// Feature Card Component
function FeatureCard({ 
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
      className="group"
    >
      <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
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

// Timeline Component
function TimelineItem({ 
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

// FAQ Item Component
function FAQItem({ 
  question, 
  answer, 
  index 
}: { 
  question: string; 
  answer: string; 
  index: number;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300"
      >
        <div className="flex items-center justify-between gap-4">
          <h4 className="font-heading text-lg font-bold text-white">{question}</h4>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronRight className="w-5 h-5 text-[#A7CD0F]" />
          </motion.div>
        </div>
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 text-white/70 text-sm leading-relaxed">{answer}</div>
        </motion.div>
      </button>
    </motion.div>
  );
}

export default function VroomTrackGPSPage() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  
  const features = [
    {
      icon: MapPin,
      title: "Géolocalisation Précise",
      description: "Suivi en temps réel avec précision jusqu'à 5 mètres. Positionnement GPS/GLONASS/Galileo pour une couverture optimale.",
      color: "bg-gradient-to-br from-[#253E38]/20 to-[#A7CD0F]/20",
    },
    {
      icon: Brain,
      title: "Intelligence Artificielle",
      description: "Algorithmes prédictifs pour anticiper les besoins de maintenance et optimiser les itinéraires automatiquement.",
      color: "bg-gradient-to-br from-[#A7CD0F]/20 to-[#FEB300]/20",
    },
    {
      icon: Bell,
      title: "Alertes Intelligentes",
      description: "Notifications en temps réel pour dépassement de vitesse, sortie de zone, conduite agressive et maintenance requise.",
      color: "bg-gradient-to-br from-[#FEB300]/20 to-[#A7CD0F]/20",
    },
    {
      icon: Clock,
      title: "Historique Complet",
      description: "Archivage des trajets sur 12 mois avec statistiques détaillées, rapports personnalisables et export de données.",
      color: "bg-gradient-to-br from-[#253E38]/20 to-[#3a5c54]/20",
    },
    {
      icon: Shield,
      title: "Sécurité Renforcée",
      description: "Geofencing, anti-démarrage à distance, bouton SOS et intégration avec les services d'urgence.",
      color: "bg-gradient-to-br from-[#A7CD0F]/20 to-[#253E38]/20",
    },
    {
      icon: Users,
      title: "Gestion de Flotte",
      description: "Tableau de bord multi-véhicules, attribution des conducteurs, planning et optimisation des ressources.",
      color: "bg-gradient-to-br from-[#253E38]/20 to-[#A7CD0F]/20",
    },
  ];
  
  const timeline = [
    { step: 1, title: "Installation du Boîtier", description: "Nos techniciens certifient installent le boîtier GPS discret dans votre véhicule en moins de 30 minutes.", icon: Smartphone },
    { step: 2, title: "Configuration Personnalisée", description: "Paramétrage des alertes, zones géographiques et préférences selon vos besoins spécifiques.", icon: Settings },
    { step: 3, title: "Activation du Service", description: "Votre compte est activé instantanément avec accès à l'application web et mobile.", icon: Zap },
    { step: 4, title: "Suivi en Temps Réel", description: "Commencez immédiatement à suivre votre flotte avec toutes les fonctionnalités activées.", icon: Navigation },
  ];
  
  const faqs = [
    {
      question: "Comment fonctionne le suivi GPS ?",
      answer: "Notre système utilise un boîtier GPS connecté qui transmet la position du véhicule en temps réel via le réseau cellulaire. Les données sont accessibles 24h/24 depuis notre application web ou mobile.",
    },
    {
      question: "L'installation est-elle compatible avec tous les véhicules ?",
      answer: "Oui, notre solution est compatible avec 99% des véhicules légers et utilitaires. Nos techniciens certifient s'assurent d'une installation propre et sans impact sur la garantie constructeur.",
    },
    {
      question: "Quelle est la précision de la géolocalisation ?",
      answer: "Grâce à l'utilisation combinée des satellites GPS, GLONASS et Galileo, nous atteignons une précision de 5 mètres en conditions optimales. En milieu urbain, la précision reste excellente grâce à nos algorithmes de correction.",
    },
    {
      question: "Les données sont-elles sécurisées ?",
      answer: "Absolument. Toutes les données sont chiffrées de bout en bout (AES-256) et hébergées sur des serveurs certifiés ISO 27001 en Europe. Vous restez le seul propriétaire de vos données de localisation.",
    },
    {
      question: "Puis-je exporter les données de suivi ?",
      answer: "Oui, vous pouvez exporter l'historique des trajets et les statistiques en plusieurs formats (CSV, Excel, PDF) pour une intégration facile avec vos systèmes existants.",
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
          <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: "Vroom Track GPS", href: "/services/gps-tracking" }]} />
          
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
              <Navigation className="w-4 h-4 text-[#A7CD0F]" />
              <span className="text-sm font-medium text-[#A7CD0F]">Technologie de Pointe</span>
            </motion.div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Vroom Track GPS
              <span className="block bg-gradient-to-r from-[#A7CD0F] to-[#FEB300] bg-clip-text text-transparent">
                avec Intelligence Artificielle
              </span>
            </h1>
            
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Solution de suivi de flotte nouvelle génération combinant géolocalisation précise, 
              intelligence artificielle et analyse prédictive pour une gestion optimale de votre parc automobile.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#A7CD0F] text-[#101418] hover:bg-[#A7CD0F]/90 px-8 py-6 rounded-full font-semibold shadow-[0_0_40px_rgba(167,205,15,0.3)]"
                asChild
              >
                <a href="#demo" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Voir la démo
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full font-semibold"
                asChild
              >
                <a href="#contact" className="flex items-center gap-2">
                  Demander un devis
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Video Section */}
      <section id="demo" className="py-20 relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden border border-white/10"
          >
            <div className="aspect-video bg-gradient-to-br from-[#253E38]/20 to-[#A7CD0F]/20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#A7CD0F]/20 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-[#A7CD0F]/30 transition-colors">
                  <Play className="w-10 h-10 text-[#A7CD0F] ml-1" />
                </div>
                <p className="text-white/70">Voir la démonstration vidéo</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Fonctionnalités
              <span className="block text-[#A7CD0F]">Premium</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Découvrez toutes les fonctionnalités qui font de Vroom Track GPS la solution de suivi de flotte la plus avancée du marché.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Comment ça
              <span className="block text-[#A7CD0F]">fonctionne ?</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Une mise en place simple et rapide en 4 étapes pour commencer à suivre votre flotte dès aujourd'hui.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {timeline.map((item, index) => (
              <TimelineItem key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Screenshots Section */}
      <section className="py-20 relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Interface
              <span className="block text-[#A7CD0F]">Intuitive</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Une interface moderne et ergonomique accessible depuis n'importe quel appareil.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl bg-gradient-to-br from-[#253E38]/10 to-[#A7CD0F]/10 border border-white/10 p-4 aspect-video flex items-center justify-center"
              >
                <Monitor className="w-16 h-16 text-white/30" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Questions
              <span className="block text-[#A7CD0F]">Fréquentes</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Tout ce que vous devez savoir sur Vroom Track GPS.
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section id="contact" className="py-20 relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl p-12 md:p-16 bg-gradient-to-r from-[#253E38]/20 to-[#A7CD0F]/20 border border-white/10 overflow-hidden"
          >
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#A7CD0F]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#253E38]/10 rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Prêt à optimiser votre flotte ?
              </h2>
              <p className="text-white/70 mb-8">
                Demandez une démonstration personnalisée et découvrez comment Vroom Track GPS peut transformer la gestion de votre parc automobile.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#A7CD0F] text-[#101418] hover:bg-[#A7CD0F]/90 px-8 py-6 rounded-full font-semibold shadow-[0_0_40px_rgba(167,205,15,0.3)]"
                  asChild
                >
                  <a href="/contact" className="flex items-center gap-2">
                    Demander un devis
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full font-semibold"
                  asChild
                >
                  <a href="tel:+2250123456789" className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Nous appeler
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Settings icon for timeline
function Settings({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 1.73l-.15.08a2 2 0 0 0-1.73 1v.44a2 2 0 0 0 1 1.73l.15.08a2 2 0 0 1 1.73 1l.43.25a2 2 0 0 0 2 1.73v.18a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 0 2-1.73l.15-.08a2 2 0 0 0 1.73-1v-.44a2 2 0 0 0-1.73-1l-.15-.08a2 2 0 0 1-1.73-1l-.43-.25a2 2 0 0 0-2-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
