"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Testimonial Card Component
function TestimonialCard({ testimonial, index }: { testimonial: any; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 hover:border-[#A7CD0F]/30 transition-all duration-300">
        <Quote className="absolute top-6 right-6 w-8 h-8 text-[#A7CD0F]/20" />
        
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={cn("w-4 h-4", i < testimonial.rating ? "fill-[#A7CD0F] text-[#A7CD0F]" : "text-white/20")} />
          ))}
        </div>
        
        <p className="text-white/80 text-sm leading-relaxed mb-6 italic">
          "{testimonial.content}"
        </p>
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#253E38] to-[#A7CD0F] flex items-center justify-center">
            <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
          </div>
          <div>
            <div className="font-semibold text-white">{testimonial.name}</div>
            <div className="text-xs text-white/50">{testimonial.role}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const testimonials = [
    {
      id: 1,
      name: "Jean Dupont",
      role: "CEO, Tech Solutions",
      rating: 5,
      content: "Service exceptionnel ! J'ai importé ma Tesla Model S via VroomCar et tout s'est déroulé parfaitement. L'équipe est professionnelle et réactive."
    },
    {
      id: 2,
      name: "Marie Laurent",
      role: "Directrice Marketing",
      rating: 5,
      content: "La gestion de notre flotte de véhicules a été transformée grâce à Vroom Track GPS. Nous avons optimisé nos trajets et réduit nos coûts de 30%."
    },
    {
      id: 3,
      name: "Pierre Martin",
      role: "Entrepreneur",
      rating: 5,
      content: "J'ai acheté ma Porsche Taycan chez VroomCar. Le processus était simple, le financement avantageux et la livraison impeccable. Je recommande vivement !"
    },
    {
      id: 4,
      name: "Sophie Bernard",
      role: "Consultante",
      rating: 5,
      content: "Le service après-vente est remarquable. J'ai eu un souci technique et ils ont réagi immédiatement. C'est rare de nos jours."
    },
    {
      id: 5,
      name: "Lucas Moreau",
      role: "Architecte",
      rating: 5,
      content: "J'utilise VroomCar depuis 3 ans pour tous mes véhicules professionnels. Fiabilité, qualité et service client au top. Je ne changerai pas."
    },
    {
      id: 6,
      name: "Emma Durand",
      role: "Designer",
      rating: 5,
      content: "Mon Audi RS e-tron GT est arrivée en parfait état. L'équipe m'a accompagnée à chaque étape. Une expérience premium de A à Z."
    }
  ];
  
  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#101418] to-[#0a0a0a]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A7CD0F]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#253E38]/5 rounded-full blur-3xl" />
      
      <div className="container-premium relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#A7CD0F]/10 border border-[#A7CD0F]/20 text-[#A7CD0F] text-sm font-medium mb-4">
            Témoignages
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Ce Que Disent Nos Clients
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Découvrez les expériences de nos clients satisfaits qui nous font confiance pour leurs besoins automobiles.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-6 rounded-full font-semibold"
            onClick={() => window.location.href = "/contact"}
          >
            Partager votre expérience
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
