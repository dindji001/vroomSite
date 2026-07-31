"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { 
  Car, 
  ShoppingCart, 
  SearchCheck, 
  Truck, 
  Globe, 
  Package, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Shield, 
  Clock, 
  HeadphonesIcon, 
  Award, 
  Zap, 
  ArrowRight,
  Star,
  FileText,
  CreditCard,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { cn } from "@/lib/utils";

// Timeline Step Component
function TimelineStep({ 
  step, 
  title, 
  description, 
  icon: Icon, 
  duration,
  index 
}: { 
  step: number; 
  title: string; 
  description: string; 
  icon: any; 
  duration: string;
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
            <div className="w-16 h-16 rounded-2xl bg-[#A7CD0F]/20 flex items-center justify-center shrink-0">
              <Icon className="w-8 h-8 text-[#A7CD0F]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#A7CD0F] flex items-center justify-center text-[#101418] font-bold text-sm">
                  {step}
                </div>
                <div className="text-[#A7CD0F] font-bold text-sm">{duration}</div>
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{description}</p>
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
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-white/10"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <span className="font-heading font-semibold text-white pr-8">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-[#A7CD0F] shrink-0" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pb-6 text-white/70 leading-relaxed">{answer}</div>
      </motion.div>
    </motion.div>
  );
}

// Benefit Card Component
function BenefitCard({ icon: Icon, title, description, index }: { icon: any; title: string; description: string; index: number }) {
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

// Guarantee Card Component
function GuaranteeCard({ icon: Icon, title, description, duration, index }: { icon: any; title: string; description: string; duration: string; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative p-6 rounded-2xl bg-gradient-to-br from-[#253E38]/20 to-[#A7CD0F]/20 border border-white/10"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#A7CD0F]/30 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-[#A7CD0F]" />
        </div>
        <div className="flex-1">
          <h3 className="font-heading text-lg font-bold text-white mb-1">{title}</h3>
          <p className="text-white/70 text-sm mb-2">{description}</p>
          <div className="inline-flex items-center gap-1 text-xs text-[#A7CD0F]">
            <Clock className="w-3 h-3" />
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BuyingProcessPage() {
  const timeline = [
    { step: 1, title: "Choix du véhicule", description: "Parcourez notre catalogue et sélectionnez le véhicule de vos rêves parmi notre collection exclusive. Nos experts sont disponibles pour vous conseiller.", icon: Car, duration: "1-2 jours" },
    { step: 2, title: "Commande", description: "Finalisez votre commande en ligne ou avec l'aide de nos conseillers. Signez le contrat et effectuez le paiement sécurisé.", icon: ShoppingCart, duration: "Immédiat" },
    { step: 3, title: "Inspection", description: "Notre équipe réalise une inspection complète du véhicule : vérification mécanique, contrôle technique, et test de qualité approfondi.", icon: SearchCheck, duration: "2-3 jours" },
    { step: 4, title: "Transport", description: "Votre véhicule est transporté par nos partenaires certifiés avec une assurance tous risques pendant tout le trajet.", icon: Truck, duration: "7-14 jours" },
    { step: 5, title: "Douane", description: "Nous gérons toutes les formalités douanières pour vous : documents, taxes, et réglementations locales.", icon: Globe, duration: "3-5 jours" },
    { step: 6, title: "Livraison", description: "Votre véhicule est livré directement chez vous ou dans notre showroom. Nous vous remettons tous les documents.", icon: Package, duration: "1 jour" },
  ];
  
  const faqs = [
    { question: "Comment fonctionne le processus d'achat ?", answer: "Notre processus d'achat est simple : sélectionnez votre véhicule, passez commande, et nous nous occupons de tout le reste, de l'inspection à la livraison." },
    { question: "Quels sont les modes de paiement acceptés ?", answer: "Nous acceptons les virements bancaires, les cartes de crédit, et le financement via nos partenaires bancaires. Un acompte de 20% est requis à la commande." },
    { question: "Les véhicules sont-ils garantis ?", answer: "Oui, tous nos véhicules bénéficient d'une garantie constructeur ou d'une garantie VroomCar selon le véhicule. Des extensions de garantie sont disponibles." },
    { question: "Pouvez-vous livrer à l'international ?", answer: "Oui, nous livrons dans toute l'Europe et dans de nombreux pays internationaux. Nos experts gèrent toutes les formalités douanières." },
    { question: "Que se passe-t-il si le véhicule ne correspond pas à la description ?", answer: "Nous effectuons une inspection rigoureuse avant livraison. Si le véhicule ne correspond pas aux spécifications, nous vous remboursons intégralement." },
    { question: "Puis-je essayer le véhicule avant l'achat ?", answer: "Oui, nous proposons des essais virtuels via vidéo et des essais physiques dans nos showrooms pour les véhicules disponibles en stock." },
  ];
  
  const benefits = [
    { icon: Shield, title: "Inspection 200 points", description: "Chaque véhicule passe par une inspection complète de 200 points avant livraison." },
    { icon: Clock, title: "Livraison rapide", description: "Délai de livraison moyen de 3 semaines grâce à notre logistique optimisée." },
    { icon: HeadphonesIcon, title: "Support 24/7", description: "Notre équipe est disponible 24h/24 et 7j/7 pour répondre à vos questions." },
    { icon: Award, title: "Certifié", description: "Tous nos véhicules sont certifiés et garantis par des experts indépendants." },
    { icon: Zap, title: "Processus simplifié", description: "Tout est géré en ligne, de la commande à la livraison, sans paperasse inutile." },
    { icon: Star, title: "Satisfaction client", description: "98% de nos clients nous recommandent. Votre satisfaction est notre priorité." },
  ];
  
  const guarantees = [
    { icon: Shield, title: "Garantie mécanique", description: "Couverture des pannes mécaniques et électroniques", duration: "12 mois" },
    { icon: FileText, title: "Garantie conformité", description: "Véhicule conforme à la description et aux normes", duration: "30 jours" },
    { icon: CreditCard, title: "Garantie remboursement", description: "Remboursement intégral si non-conformité", duration: "14 jours" },
    { icon: MapPin, title: "Garantie livraison", description: "Livraison sans dommage ou remplacement", duration: "48h" },
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
          <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: "Processus d'achat", href: "/services/buying-process" }]} />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mt-12"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Notre Processus
              <span className="block bg-gradient-to-r from-[#A7CD0F] to-[#FEB300] bg-clip-text text-transparent">
                d'Achat
              </span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Découvrez comment nous vous accompagnons de la sélection à la livraison de votre véhicule, 
              avec un service premium et une attention aux détails.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#A7CD0F] text-[#101418] hover:bg-[#A7CD0F]/90 px-8 py-6 rounded-full font-semibold shadow-[0_0_40px_rgba(167,205,15,0.3)]"
                asChild
              >
                <a href="/vehicles" className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Choisir un véhicule
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full font-semibold"
                asChild
              >
                <a href="#contact" className="flex items-center gap-2">
                  <HeadphonesIcon className="w-5 h-5" />
                  Nous contacter
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Timeline Section */}
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
              Étape par étape
              <span className="block text-[#A7CD0F]">Vers votre véhicule</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Un processus transparent et efficace pour vous garantir une expérience d'achat sans souci.
            </p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto space-y-6">
            {timeline.map((item, index) => (
              <TimelineStep key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
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
              Pourquoi nous
              <span className="block text-[#A7CD0F]">choisir ?</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Des avantages exclusifs qui font de VroomCar votre partenaire de confiance.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Guarantees Section */}
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
              Nos
              <span className="block text-[#A7CD0F]">Garanties</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Une protection complète pour votre achat en toute sérénité.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((guarantee, index) => (
              <GuaranteeCard key={index} {...guarantee} index={index} />
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
              Tout ce que vous devez savoir sur notre processus d'achat.
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              {faqs.map((faq, index) => (
                <FAQItem key={index} {...faq} index={index} />
              ))}
            </div>
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
              <Car className="w-16 h-16 text-[#A7CD0F] mx-auto mb-6" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Prêt à trouver votre véhicule ?
              </h2>
              <p className="text-white/70 mb-8">
                Parcourez notre collection et laissez-nous vous accompagner dans votre achat.
                Notre équipe est disponible pour répondre à toutes vos questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-[#A7CD0F] text-[#101418] hover:bg-[#A7CD0F]/90 px-8 py-6 rounded-full font-semibold shadow-[0_0_40px_rgba(167,205,15,0.3)]"
                  asChild
                >
                  <a href="/vehicles" className="flex items-center gap-2">
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
                  <a href="tel:+2250123456789" className="flex items-center gap-2">
                    <HeadphonesIcon className="w-5 h-5" />
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
