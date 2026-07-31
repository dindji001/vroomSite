"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle,
  ChevronDown,
  User,
  Building2,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";

// Contact Info Card Component
function ContactInfoCard({ icon: Icon, title, value, link, index }: { icon: any; title: string; value: string; link?: string; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const content = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <motion.div
          className="w-12 h-12 rounded-xl bg-[#A7CD0F]/20 flex items-center justify-center mb-4"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Icon className="w-6 h-6 text-[#A7CD0F]" />
        </motion.div>
        <h3 className="font-heading font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/70 text-sm break-words">{value}</p>
      </div>
    </motion.div>
  );
  
  if (link) {
    return <a href={link} className="block">{content}</a>;
  }
  
  return content;
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

// Business Hours Card Component
function BusinessHoursCard({ day, hours, isOpen }: { day: string; hours: string; isOpen: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
      <span className={cn("font-medium", isOpen ? "text-white" : "text-white/60")}>{day}</span>
      <span className={cn("text-sm", isOpen ? "text-[#A7CD0F]" : "text-white/40")}>{hours}</span>
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle");
  
  const pushToast = useUIStore((s) => s.pushToast);
  
  const contactInfo = [
    { icon: MapPin, title: "Adresse", value: "Boulevard de la République, Abidjan, Côte d'Ivoire" },
    { icon: Phone, title: "Téléphone", value: "+225 01 23 45 67 89", link: "tel:+2250123456789" },
    { icon: Mail, title: "Email", value: "contact@vroomcar.ci", link: "mailto:contact@vroomcar.ci" },
    { icon: MessageCircle, title: "WhatsApp", value: "+225 07 12 34 56 78", link: "https://wa.me/2250712345678" },
  ];
  
  const faqs = [
    { question: "Quels sont vos horaires d'ouverture ?", answer: "Nos showrooms sont ouverts du lundi au samedi de 9h à 19h. Notre service client est disponible 24h/24 et 7j/7." },
    { question: "Comment puis-je réserver un essai ?", answer: "Vous pouvez réserver un essai directement sur notre site via la page du véhicule ou en nous contactant par téléphone ou WhatsApp." },
    { question: "Proposez-vous un financement ?", answer: "Oui, nous proposons des solutions de financement via nos partenaires bancaires. Utilisez notre calculateur de financement sur chaque page véhicule." },
    { question: "Livrez-vous à l'international ?", answer: "Oui, nous livrons dans toute l'Afrique de l'Ouest et dans de nombreux pays internationaux. Contactez-nous pour plus d'informations." },
    { question: "Quelle est votre politique de retour ?", answer: "Nous offrons une garantie de conformité de 30 jours. Si le véhicule ne correspond pas à la description, nous vous remboursons intégralement." },
  ];
  
  const businessHours = [
    { day: "Lundi", hours: "9h - 19h", isOpen: true },
    { day: "Mardi", hours: "9h - 19h", isOpen: true },
    { day: "Mercredi", hours: "9h - 19h", isOpen: true },
    { day: "Jeudi", hours: "9h - 19h", isOpen: true },
    { day: "Vendredi", hours: "9h - 19h", isOpen: true },
    { day: "Samedi", hours: "9h - 18h", isOpen: true },
    { day: "Dimanche", hours: "Fermé", isOpen: false },
  ];
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Le téléphone est requis";
    } else if (!/^[+]?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Numéro de téléphone invalide";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Le sujet est requis";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    } else if (formData.message.length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      pushToast({
        type: "error",
        title: "Erreur de validation",
        message: "Veuillez corriger les erreurs dans le formulaire",
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitStatus("success");
    
    pushToast({
      type: "success",
      title: "Message envoyé",
      message: "Nous vous répondrons dans les plus brefs délais",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    
    setTimeout(() => setSubmitStatus("idle"), 5000);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-8 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#101418] to-[#0a0a0a]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#253E38]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#A7CD0F]/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 container-premium">
          <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Contact", href: "/contact" }]} />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mt-12"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Contactez-nous
              <span className="block bg-gradient-to-r from-[#A7CD0F] to-[#FEB300] bg-clip-text text-transparent">
                Nous sommes là pour vous
              </span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Notre équipe est disponible 24h/24 et 7j/7 pour répondre à toutes vos questions. 
              N'hésitez pas à nous contacter par téléphone, email ou via notre formulaire.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Info */}
      <section className="py-12">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <ContactInfoCard key={index} {...info} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Map and Form */}
      <section className="py-12">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Google Maps */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-[500px] rounded-2xl overflow-hidden bg-white/5 border border-white/10"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sAv.%20des%20Champs-%C3%89lys%C3%A9es%2C%2075008%20Paris!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
            >
              <h2 className="font-heading text-2xl font-bold text-white mb-6">Envoyez-nous un message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Nom complet *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Votre nom"
                      className={cn(
                        "h-12 pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl",
                        errors.name && "border-red-500"
                      )}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="votre@email.com"
                        className={cn(
                          "h-12 pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl",
                          errors.email && "border-red-500"
                        )}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Téléphone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+225 01 23 45 67 89"
                        className={cn(
                          "h-12 pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl",
                          errors.phone && "border-red-500"
                        )}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Sujet *</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full h-12 pl-10 pr-4 bg-white/5 border-white/10 text-white rounded-xl appearance-none cursor-pointer",
                        errors.subject && "border-red-500"
                      )}
                    >
                      <option value="" className="bg-[#0a0a0a]">Sélectionnez un sujet</option>
                      <option value="general" className="bg-[#0a0a0a]">Question générale</option>
                      <option value="vehicle" className="bg-[#0a0a0a]">Information véhicule</option>
                      <option value="test-drive" className="bg-[#0a0a0a]">Essai véhicule</option>
                      <option value="financing" className="bg-[#0a0a0a]">Financement</option>
                      <option value="support" className="bg-[#0a0a0a]">Support technique</option>
                    </select>
                  </div>
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Votre message..."
                    rows={4}
                    className={cn(
                      "w-full p-4 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl resize-none",
                      errors.message && "border-red-500"
                    )}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-[#A7CD0F] text-[#101418] hover:bg-[#A7CD0F]/90 font-semibold rounded-xl flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#101418] border-t-transparent rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : submitStatus === "success" ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Message envoyé
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Business Hours */}
      <section className="py-12">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto"
          >
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-[#A7CD0F]" />
                <h2 className="font-heading text-xl font-bold text-white">Horaires d'ouverture</h2>
              </div>
              <div className="space-y-0">
                {businessHours.map((hours, index) => (
                  <BusinessHoursCard key={index} {...hours} />
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-white/60 text-sm">
                  <span className="text-[#A7CD0F] font-semibold">Service client :</span> Disponible 24h/24 et 7j/7
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-12">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-heading text-3xl font-bold text-white mb-8 text-center">
              Questions
              <span className="block text-[#A7CD0F]">Fréquentes</span>
            </h2>
            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              {faqs.map((faq, index) => (
                <FAQItem key={index} {...faq} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
