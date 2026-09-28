"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Handshake, 
  TrendingUp, 
  Globe, 
  Award, 
  Shield, 
  Zap, 
  ArrowRight,
  Calendar,
  CheckCircle,
  Building2,
  Car,
  Star,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { cn } from "@/lib/utils";

// Timeline Item Component
function TimelineItem({ year, title, description, index }: { year: string; title: string; description: string; index: number }) {
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
          <div className="absolute -top-4 left-6 w-16 h-16 rounded-2xl bg-[#A7CD0F] flex items-center justify-center text-[#101418] font-heading font-bold text-xl">
            {year}
          </div>
          <div className="pt-8">
            <h3 className="font-heading text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{description}</p>
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

// Value Card Component
function ValueCard({ icon: Icon, title, description, index }: { icon: any; title: string; description: string; index: number }) {
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
          className="w-14 h-14 rounded-xl bg-[#A7CD0F]/20 flex items-center justify-center mb-4"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Icon className="w-7 h-7 text-[#A7CD0F]" />
        </motion.div>
        <h3 className="font-heading text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/70 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// Team Member Component
function TeamMember({ name, role, image, index }: { name: string; role: string; image: string; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="relative h-full">
        <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 overflow-hidden mb-4">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#253E38]/20 to-[#A7CD0F]/20">
            <Users className="w-16 h-16 text-white/30" />
          </div>
        </div>
        <h3 className="font-heading font-bold text-white">{name}</h3>
        <p className="text-[#A7CD0F] text-sm">{role}</p>
      </div>
    </motion.div>
  );
}

// Partner Logo Component
function PartnerLogo({ name, index }: { name: string; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
    >
      <Building2 className="w-12 h-12 text-white/40 mx-auto" />
      <p className="text-center text-white/60 text-sm mt-2">{name}</p>
    </motion.div>
  );
}

// Stat Counter Component
function StatCounter({ value, label, icon: Icon, index }: { value: string; label: string; icon: any; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#253E38]/10 to-[#A7CD0F]/10 border border-white/10"
    >
      <Icon className="w-8 h-8 text-[#A7CD0F] mx-auto mb-3" />
      <div className="font-heading text-4xl font-bold text-white mb-1">{value}</div>
      <div className="text-white/60 text-sm">{label}</div>
    </motion.div>
  );
}

export default function AboutPage() {
  const timeline = [
    { year: "2018", title: "Fondation", description: "VroomCar est fondé avec une vision : révolutionner l'achat de véhicules en ligne." },
    { year: "2019", title: "Première livraison", description: "Nous livrons notre premier véhicule à l'international, marquant le début de notre expansion." },
    { year: "2020", title: "Expansion africaine", description: "Ouverture de nos premiers showrooms en Afrique de l'Ouest et lancement de notre plateforme de tracking GPS." },
    { year: "2021", title: "Série A", description: "Levée de fonds de 6.5M FCFA pour accélérer notre croissance et notre innovation technologique." },
    { year: "2022", title: "1000 véhicules", description: "Nous atteignons le cap des 1000 véhicules livrés à travers l'Afrique." },
    { year: "2023", title: "Innovation", description: "Lancement de VroomTrack Pro et ouverture de notre marketplace d'accessoires premium." },
    { year: "2024", title: "Leader africain", description: "Devenir le leader africain de l'achat de véhicules en ligne premium." },
  ];
  
  const values = [
    { icon: Shield, title: "Transparence", description: "Nous croyons en une communication honnête et ouverte avec nos clients et partenaires." },
    { icon: Heart, title: "Passion", description: "Notre passion pour l'automobile et l'excellence guide chacune de nos décisions." },
    { icon: Zap, title: "Innovation", description: "Nous repoussons constamment les limites pour offrir des solutions innovantes." },
    { icon: Users, title: "Client d'abord", description: "La satisfaction de nos clients est notre priorité absolue." },
    { icon: Award, title: "Qualité", description: "Nous maintenons les standards les plus élevés dans tous nos services." },
    { icon: Globe, title: "Durabilité", description: "Nous nous engageons à réduire notre impact environnemental." },
  ];
  
  const team = [
    { name: "Alexandre Martin", role: "CEO & Fondateur", image: "" },
    { name: "Sophie Dubois", role: "CTO", image: "" },
    { name: "Thomas Bernard", role: "Directeur Commercial", image: "" },
    { name: "Marie Leroy", role: "Directrice Marketing", image: "" },
  ];
  
  const partners = [
    { name: "Tesla" },
    { name: "BMW" },
    { name: "Mercedes" },
    { name: "Audi" },
    { name: "Porsche" },
    { name: "Lamborghini" },
  ];
  
  const stats = [
    { icon: Car, value: "5,000+", label: "Véhicules livrés" },
    { icon: Globe, value: "25+", label: "Pays desservis" },
    { icon: Users, value: "98%", label: "Satisfaction client" },
    { icon: Award, value: "15+", label: "Prix remportés" },
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
          <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "À propos", href: "/about" }]} />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mt-12"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Notre Histoire
              <span className="block bg-gradient-to-r from-[#A7CD0F] to-[#FEB300] bg-clip-text text-transparent">
                Notre Vision
              </span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Depuis 2018, VroomCar révolutionne l'expérience d'achat de véhicules en ligne, 
              offrant qualité, transparence et service premium à travers le monde.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-[#253E38]/10 to-[#A7CD0F]/10 border border-white/10"
            >
              <Target className="w-12 h-12 text-[#A7CD0F] mb-4" />
              <h2 className="font-heading text-2xl font-bold text-white mb-4">Notre Mission</h2>
              <p className="text-white/70 leading-relaxed">
                Démocratiser l'accès aux véhicules premium en offrant une expérience d'achat transparente, 
                sécurisée et exceptionnelle. Nous nous engageons à fournir des véhicules de qualité 
                avec un service client irréprochable, rendant l'automobile accessible à tous.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-[#A7CD0F]/10 to-[#253E38]/10 border border-white/10"
            >
              <Eye className="w-12 h-12 text-[#A7CD0F] mb-4" />
              <h2 className="font-heading text-2xl font-bold text-white mb-4">Notre Vision</h2>
              <p className="text-white/70 leading-relaxed">
                Devenir le leader mondial de l'achat de véhicules premium en ligne, 
                en innovant constamment et en dépassant les attentes de nos clients. 
                Nous aspirons à créer un écosystème automobile où qualité, confiance 
                et innovation se rencontrent.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-20">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Nos
              <span className="block text-[#A7CD0F]">Valeurs</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Les principes qui guident chacune de nos actions et décisions.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <ValueCard key={index} {...value} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats */}
      <section className="py-20">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCounter key={index} {...stat} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Timeline */}
      <section className="py-20">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Notre
              <span className="block text-[#A7CD0F]">Histoire</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              De 2018 à aujourd'hui, une aventure passionnée.
            </p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto space-y-6">
            {timeline.map((item, index) => (
              <TimelineItem key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-20">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Notre
              <span className="block text-[#A7CD0F]">Équipe</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Les talents derrière notre succès.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <TeamMember key={index} {...member} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Partners */}
      <section className="py-20">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Nos
              <span className="block text-[#A7CD0F]">Partenaires</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Nous collaborons avec les meilleurs constructeurs automobiles.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {partners.map((partner, index) => (
              <PartnerLogo key={index} {...partner} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Commitment */}
      <section className="py-20">
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
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <CheckCircle className="w-16 h-16 text-[#A7CD0F] mx-auto mb-6" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
                Notre Engagement
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Chez VroomCar, nous nous engageons à offrir une expérience d'achat exceptionnelle. 
                Chaque véhicule est inspecté rigoureusement, chaque client est traité avec le plus grand respect, 
                et chaque livraison est assurée avec professionnalisme. Votre satisfaction est notre priorité absolue.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#A7CD0F]" />
                  <span className="text-white">Garantie 12 mois</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-[#A7CD0F]" />
                  <span className="text-white">Inspection 200 points</span>
                </div>
                <div className="flex items-center gap-3">
                  <Handshake className="w-6 h-6 text-[#A7CD0F]" />
                  <span className="text-white">Support 24/7</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Rejoignez l'aventure
              <span className="block text-[#A7CD0F]">VroomCar</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              Découvrez notre collection de véhicules premium et laissez-nous vous accompagner 
              dans votre prochain achat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#A7CD0F] text-[#101418] hover:bg-[#A7CD0F]/90 px-8 py-6 rounded-full font-semibold shadow-[0_0_40px_rgba(167,205,15,0.3)]"
                asChild
              >
                <a href="/vehicles" className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Voir les véhicules
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full font-semibold"
                asChild
              >
                <a href="/contact" className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Nous contacter
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
