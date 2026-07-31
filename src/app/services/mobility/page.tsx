"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { 
  Users, 
  MapPin, 
  Route, 
  FileText, 
  Fuel, 
  Wrench, 
  BarChart3, 
  TrendingUp,
  Play,
  Check,
  ChevronRight,
  ArrowRight,
  Zap,
  Clock,
  Shield,
  Car,
  Calendar,
  AlertTriangle,
  Target,
  Activity
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
  stats,
  color,
  index 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  stats: string;
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
        <p className="text-white/70 text-sm leading-relaxed mb-4">{description}</p>
        <div className="pt-4 border-t border-white/10">
          <div className="text-[#A7CD0F] font-bold text-sm">{stats}</div>
        </div>
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

// Stat Card Component
function StatCard({ 
  value, 
  label, 
  icon: Icon, 
  trend,
  delay 
}: { 
  value: string; 
  label: string; 
  icon: any; 
  trend: string;
  delay: number;
}) {
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
      
      const timeout = setTimeout(() => requestAnimationFrame(animate), delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, targetValue, delay]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#A7CD0F]/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-[#A7CD0F]" />
        </div>
        <div className="flex items-center gap-1 text-xs text-green-400">
          <TrendingUp className="w-3 h-3" />
          <span>{trend}</span>
        </div>
      </div>
      <div className="font-heading font-bold text-3xl text-white mb-1">
        {count.toLocaleString()}{value.includes("%") && "%"}
      </div>
      <div className="text-sm text-white/60">{label}</div>
    </motion.div>
  );
}

export default function MobilityManagementPage() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const features = [
    {
      icon: Users,
      title: "Gestion des Chauffeurs",
      description: "Attribuez des véhicules, suivez les horaires et gérez les performances de vos chauffeurs en temps réel.",
      stats: "50+ chauffeurs gérés",
      color: "bg-gradient-to-br from-[#253E38]/20 to-[#A7CD0F]/20",
    },
    {
      icon: MapPin,
      title: "Suivi GPS Précis",
      description: "Localisation en temps réel de toute votre flotte avec géofencing et alertes intelligentes.",
      stats: "Précision 5m",
      color: "bg-gradient-to-br from-[#A7CD0F]/20 to-[#FEB300]/20",
    },
    {
      icon: Route,
      title: "Optimisation des Trajets",
      description: "Algorithmes intelligents pour optimiser les itinéraires et réduire les temps de parcours.",
      stats: "-30% de temps",
      color: "bg-gradient-to-br from-[#FEB300]/20 to-[#A7CD0F]/20",
    },
    {
      icon: FileText,
      title: "Rapports Détaillés",
      description: "Générez des rapports personnalisés sur l'activité, les coûts et la performance de votre flotte.",
      stats: "Rapports automatiques",
      color: "bg-gradient-to-br from-[#253E38]/20 to-[#3a5c54]/20",
    },
    {
      icon: Fuel,
      title: "Consommation Carburant",
      description: "Suivez la consommation de carburant par véhicule et identifiez les anomalies.",
      stats: "-15% de carburant",
      color: "bg-gradient-to-br from-[#A7CD0F]/20 to-[#253E38]/20",
    },
    {
      icon: Wrench,
      title: "Maintenance Préventive",
      description: "Alertes automatiques pour l'entretien programmé et gestion des pannes.",
      stats: "Zéro panne imprévue",
      color: "bg-gradient-to-br from-[#253E38]/20 to-[#A7CD0F]/20",
    },
  ];
  
  const timeline = [
    { step: 1, title: "Intégration de la Flotte", description: "Importez vos véhicules et configurez les paramètres de suivi.", icon: Car },
    { step: 2, title: "Configuration des Chauffeurs", description: "Créez les profils chauffeurs et attribuez les véhicules.", icon: Users },
    { step: 3, title: "Définition des Zones", description: "Configurez les zones géographiques et les itinéraires autorisés.", icon: MapPin },
    { step: 4, title: "Surveillance Active", description: "Commencez le suivi en temps réel et recevez les alertes.", icon: Activity },
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
          <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: "Gestion de Mobilité", href: "/services/mobility" }]} />
          
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
              <Zap className="w-4 h-4 text-[#A7CD0F]" />
              <span className="text-sm font-medium text-[#A7CD0F]">Solution Intelligente</span>
            </motion.div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Gestion de Mobilité
              <span className="block bg-gradient-to-r from-[#A7CD0F] to-[#FEB300] bg-clip-text text-transparent">
                Intelligente
              </span>
            </h1>
            
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Optimisez votre flotte automobile avec notre solution de gestion de mobilité nouvelle génération. 
              Réduisez les coûts, améliorez la productivité et assurez la sécurité de vos chauffeurs.
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
      
      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard value="500+" label="Véhicules gérés" icon={Car} trend="+12%" delay={0} />
            <StatCard value="30%" label="Réduction coûts" icon={TrendingUp} trend="+8%" delay={0.1} />
            <StatCard value="98%" label="Satisfaction client" icon={Shield} trend="+5%" delay={0.2} />
            <StatCard value="24/7" label="Support disponible" icon={Clock} trend="Stable" delay={0.3} />
          </div>
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
              <span className="block text-[#A7CD0F]">Complètes</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Découvrez toutes les fonctionnalités qui font de notre solution de gestion de mobilité la plus avancée du marché.
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
              Une mise en place simple et rapide en 4 étapes pour commencer à optimiser votre flotte dès aujourd'hui.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {timeline.map((item, index) => (
              <TimelineItem key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Dashboard Preview Section */}
      <section id="demo" className="py-20 relative">
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
              <span className="block text-[#A7CD0F]">Moderne</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Un tableau de bord intuitif avec graphiques en temps réel et cartes interactives.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl bg-gradient-to-br from-[#253E38]/10 to-[#A7CD0F]/10 border border-white/10 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-[#A7CD0F]" />
                <h3 className="font-heading text-xl font-bold text-white">Statistiques en temps réel</h3>
              </div>
              <div className="space-y-4">
                <div className="h-32 rounded-xl bg-white/5 flex items-center justify-center">
                  <Activity className="w-12 h-12 text-white/30" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-white/60 text-sm mb-1">Trajets aujourd'hui</div>
                    <div className="text-white font-bold text-2xl">127</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-white/60 text-sm mb-1">Km parcourus</div>
                    <div className="text-white font-bold text-2xl">2,450</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-2xl bg-gradient-to-br from-[#A7CD0F]/10 to-[#253E38]/10 border border-white/10 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-[#A7CD0F]" />
                <h3 className="font-heading text-xl font-bold text-white">Carte interactive</h3>
              </div>
              <div className="h-48 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                <MapPin className="w-12 h-12 text-white/30" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Véhicules actifs</span>
                  <span className="text-[#A7CD0F] font-bold">45/50</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">En mouvement</span>
                  <span className="text-white font-bold">32</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">À l'arrêt</span>
                  <span className="text-white font-bold">13</span>
                </div>
              </div>
            </motion.div>
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
            className="relative rounded-3xl p-12 md:p-16 bg-gradient-to-r from-[#253E38]/20 to-[#A7CD0F]/20 border border-white/10 overflow-hidden text-center"
          >
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#A7CD0F]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#253E38]/10 rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <Target className="w-12 h-12 text-[#A7CD0F] mx-auto mb-4" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Prêt à optimiser votre flotte ?
              </h2>
              <p className="text-white/70 mb-8">
                Demandez une démonstration personnalisée et découvrez comment notre solution peut transformer la gestion de votre mobilité.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                    <Shield className="w-5 h-5" />
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
