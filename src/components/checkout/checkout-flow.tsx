"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { 
  CreditCard, 
  Truck, 
  MapPin, 
  Shield, 
  Check, 
  ChevronRight,
  Lock,
  Clock,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Step Indicator Component
function StepIndicator({ 
  currentStep, 
  totalSteps 
}:{ 
  currentStep: number; 
  totalSteps: number;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <React.Fragment key={i}>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
              i + 1 <= currentStep
                ? "bg-[#A7CD0F] text-[#101418]"
                : "bg-white/10 text-white/50"
            )}
          >
            {i + 1 <= currentStep ? <Check className="w-5 h-5" /> : i + 1}
          </motion.div>
          {i < totalSteps - 1 && (
            <div
              className={cn(
                "w-16 h-0.5 transition-all duration-300",
                i + 1 < currentStep ? "bg-[#A7CD0F]" : "bg-white/10"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// Form Field Component
function FormField({ 
  label, 
  placeholder, 
  type = "text", 
  required = false,
  icon: Icon 
}: { 
  label: string; 
  placeholder: string; 
  type?: string; 
  required?: boolean;
  icon?: any;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/90">
        {label}
        {required && <span className="text-[#A7CD0F] ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
        )}
        <Input
          type={type}
          placeholder={placeholder}
          required={required}
          className={cn(
            "h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl",
            Icon && "pl-12"
          )}
        />
      </div>
    </div>
  );
}

// Payment Method Card Component
function PaymentMethodCard({ 
  name, 
  icon: Icon, 
  selected, 
  onClick 
}: { 
  name: string; 
  icon: any; 
  selected: boolean; 
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative p-4 rounded-2xl border-2 transition-all duration-300",
        selected
          ? "border-[#A7CD0F] bg-[#A7CD0F]/10"
          : "border-white/10 bg-white/5 hover:border-white/20"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className={cn("w-6 h-6", selected ? "text-[#A7CD0F]" : "text-white/50")} />
        <span className={cn("font-medium", selected ? "text-white" : "text-white/70")}>{name}</span>
      </div>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-5 h-5 bg-[#A7CD0F] rounded-full flex items-center justify-center"
        >
          <Check className="w-3 h-3 text-[#101418]" />
        </motion.div>
      )}
    </motion.button>
  );
}

export function CheckoutFlow() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [selectedPayment, setSelectedPayment] = React.useState("card");
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const steps = [
    { id: 1, title: "Livraison", icon: Truck },
    { id: 2, title: "Adresse", icon: MapPin },
    { id: 3, title: "Paiement", icon: CreditCard },
    { id: 4, title: "Confirmation", icon: Shield },
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div ref={sectionRef} className="w-full">
      <StepIndicator currentStep={currentStep} totalSteps={steps.length} />
      
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Step 1: Delivery */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Truck className="w-6 h-6 text-[#A7CD0F]" />
              <h3 className="font-heading text-2xl font-bold text-white">Choisir la livraison</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#253E38]/10 to-[#A7CD0F]/10 border border-white/10 hover:border-[#A7CD0F]/30 transition-all duration-300 text-left"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#A7CD0F]/20 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-[#A7CD0F]" />
                  </div>
                  <span className="text-[#A7CD0F] font-bold">Gratuit</span>
                </div>
                <h4 className="font-heading text-lg font-bold text-white mb-2">Livraison Standard</h4>
                <p className="text-white/60 text-sm mb-3">Livraison sous 5-7 jours ouvrés</p>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <Clock className="w-4 h-4" />
                  <span>5-7 jours</span>
                </div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 text-left"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-white/50" />
                  </div>
                  <span className="text-white/70 font-bold">€19.99</span>
                </div>
                <h4 className="font-heading text-lg font-bold text-white mb-2">Livraison Express</h4>
                <p className="text-white/60 text-sm mb-3">Livraison sous 24-48 heures</p>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <Clock className="w-4 h-4" />
                  <span>24-48 heures</span>
                </div>
              </motion.button>
            </div>
          </div>
        )}
        
        {/* Step 2: Address */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-[#A7CD0F]" />
              <h3 className="font-heading text-2xl font-bold text-white">Adresse de livraison</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Prénom" placeholder="Jean" required icon={User} />
              <FormField label="Nom" placeholder="Dupont" required icon={User} />
              <FormField label="Adresse" placeholder="123 Rue de la Paix" required icon={MapPin} />
              <FormField label="Code postal" placeholder="75001" required icon={MapPin} />
              <FormField label="Ville" placeholder="Paris" required icon={MapPin} />
              <FormField label="Téléphone" placeholder="06 12 34 56 78" required icon={Phone} />
            </div>
            
            <FormField label="Instructions de livraison (optionnel)" placeholder="Code d'accès, étage, etc." />
          </div>
        )}
        
        {/* Step 3: Payment */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-6 h-6 text-[#A7CD0F]" />
              <h3 className="font-heading text-2xl font-bold text-white">Mode de paiement</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <PaymentMethodCard
                name="Carte bancaire"
                icon={CreditCard}
                selected={selectedPayment === "card"}
                onClick={() => setSelectedPayment("card")}
              />
              <PaymentMethodCard
                name="PayPal"
                icon={Shield}
                selected={selectedPayment === "paypal"}
                onClick={() => setSelectedPayment("paypal")}
              />
              <PaymentMethodCard
                name="Virement"
                icon={Lock}
                selected={selectedPayment === "transfer"}
                onClick={() => setSelectedPayment("transfer")}
              />
            </div>
            
            {selectedPayment === "card" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <FormField label="Numéro de carte" placeholder="1234 5678 9012 3456" required icon={CreditCard} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Date d'expiration" placeholder="MM/AA" required />
                  <FormField label="CVV" placeholder="123" required icon={Lock} />
                </div>
                <FormField label="Nom sur la carte" placeholder="JEAN DUPONT" required />
              </motion.div>
            )}
            
            <div className="flex items-center gap-2 text-xs text-white/50">
              <Lock className="w-4 h-4" />
              <span>Paiement sécurisé par chiffrement SSL 256-bit</span>
            </div>
          </div>
        )}
        
        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-[#A7CD0F]" />
              <h3 className="font-heading text-2xl font-bold text-white">Confirmation</h3>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-[#A7CD0F]/10 to-[#253E38]/10 border border-[#A7CD0F]/20 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#A7CD0F]/20 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-[#A7CD0F]" />
              </div>
              <h4 className="font-heading text-xl font-bold text-white mb-2">Commande confirmée !</h4>
              <p className="text-white/70 mb-4">
                Vous recevrez un email de confirmation avec les détails de votre commande.
              </p>
              <div className="inline-flex items-center gap-2 text-sm text-[#A7CD0F]">
                <AlertCircle className="w-4 h-4" />
                <span>Numéro de commande : #VC-2024-001</span>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
        >
          Retour
        </Button>
        
        {currentStep < steps.length ? (
          <Button
            onClick={handleNext}
            className="bg-[#A7CD0F] text-[#101418] hover:bg-[#A7CD0F]/90 px-8"
          >
            Continuer
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            className="bg-[#A7CD0F] text-[#101418] hover:bg-[#A7CD0F]/90 px-8"
          >
            Terminer
          </Button>
        )}
      </div>
    </div>
  );
}

// User icon for form fields
function User({ className }: { className?: string }) {
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
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

// Phone icon for form fields
function Phone({ className }: { className?: string }) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
