"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Lock, 
  Shield, 
  Check, 
  AlertCircle,
  Calendar,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PaymentFormProps {
  onSubmit?: (data: PaymentFormData) => void;
  loading?: boolean;
}

export interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  saveCard: boolean;
}

export function PaymentForm({ onSubmit, loading = false }: PaymentFormProps) {
  const [formData, setFormData] = React.useState<PaymentFormData>({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
  });
  
  const [errors, setErrors] = React.useState<Partial<Record<keyof PaymentFormData, string>>>({});
  const [isFocused, setIsFocused] = React.useState<keyof PaymentFormData | null>(null);
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };
  
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };
  
  const handleChange = (field: keyof PaymentFormData, value: string | boolean) => {
    let formattedValue = value;
    
    if (field === "cardNumber" && typeof value === "string") {
      formattedValue = formatCardNumber(value);
    } else if (field === "expiryDate" && typeof value === "string") {
      formattedValue = formatExpiryDate(value);
    }
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };
  
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof PaymentFormData, string>> = {};
    
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Numéro de carte invalide";
    }
    
    if (!formData.cardHolder || formData.cardHolder.length < 3) {
      newErrors.cardHolder = "Nom du titulaire requis";
    }
    
    if (!formData.expiryDate || formData.expiryDate.length !== 5) {
      newErrors.expiryDate = "Date d'expiration invalide";
    }
    
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = "CVV invalide";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && onSubmit) {
      onSubmit(formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Preview */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-6 rounded-2xl bg-gradient-to-br from-[#253E38] to-[#3a5c54] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#A7CD0F]/20 to-transparent" />
        <div className="absolute top-4 right-4">
          <CreditCard className="w-12 h-12 text-white/20" />
        </div>
        <div className="relative z-10">
          <div className="text-white/60 text-sm mb-2">Numéro de carte</div>
          <div className="text-white text-2xl font-mono tracking-wider mb-6">
            {formData.cardNumber || "•••• •••• •••• ••••"}
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-white/60 text-sm mb-1">Titulaire</div>
              <div className="text-white font-medium uppercase">
                {formData.cardHolder || "NOM DU TITULAIRE"}
              </div>
            </div>
            <div>
              <div className="text-white/60 text-sm mb-1">Expiration</div>
              <div className="text-white font-medium">
                {formData.expiryDate || "MM/AA"}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Card Number */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/90">
          Numéro de carte
          <span className="text-[#A7CD0F] ml-1">*</span>
        </label>
        <div className="relative">
          <CreditCard className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors",
            isFocused === "cardNumber" ? "text-[#A7CD0F]" : "text-white/50"
          )} />
          <Input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={(e) => handleChange("cardNumber", e.target.value)}
            onFocus={() => setIsFocused("cardNumber")}
            onBlur={() => setIsFocused(null)}
            maxLength={19}
            className={cn(
              "h-12 pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl transition-colors",
              errors.cardNumber && "border-red-500/50",
              isFocused === "cardNumber" && "border-[#A7CD0F]/50"
            )}
          />
        </div>
        {errors.cardNumber && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1 text-xs text-red-400"
          >
            <AlertCircle className="w-3 h-3" />
            {errors.cardNumber}
          </motion.div>
        )}
      </div>
      
      {/* Card Holder */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/90">
          Nom du titulaire
          <span className="text-[#A7CD0F] ml-1">*</span>
        </label>
        <div className="relative">
          <User className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors",
            isFocused === "cardHolder" ? "text-[#A7CD0F]" : "text-white/50"
          )} />
          <Input
            type="text"
            placeholder="JEAN DUPONT"
            value={formData.cardHolder}
            onChange={(e) => handleChange("cardHolder", e.target.value.toUpperCase())}
            onFocus={() => setIsFocused("cardHolder")}
            onBlur={() => setIsFocused(null)}
            className={cn(
              "h-12 pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl transition-colors",
              errors.cardHolder && "border-red-500/50",
              isFocused === "cardHolder" && "border-[#A7CD0F]/50"
            )}
          />
        </div>
        {errors.cardHolder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1 text-xs text-red-400"
          >
            <AlertCircle className="w-3 h-3" />
            {errors.cardHolder}
          </motion.div>
        )}
      </div>
      
      {/* Expiry Date and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/90">
            Date d'expiration
            <span className="text-[#A7CD0F] ml-1">*</span>
          </label>
          <div className="relative">
            <Calendar className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors",
              isFocused === "expiryDate" ? "text-[#A7CD0F]" : "text-white/50"
            )} />
            <Input
              type="text"
              placeholder="MM/AA"
              value={formData.expiryDate}
              onChange={(e) => handleChange("expiryDate", e.target.value)}
              onFocus={() => setIsFocused("expiryDate")}
              onBlur={() => setIsFocused(null)}
              maxLength={5}
              className={cn(
                "h-12 pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl transition-colors",
                errors.expiryDate && "border-red-500/50",
                isFocused === "expiryDate" && "border-[#A7CD0F]/50"
              )}
            />
          </div>
          {errors.expiryDate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1 text-xs text-red-400"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.expiryDate}
            </motion.div>
          )}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/90">
            CVV
            <span className="text-[#A7CD0F] ml-1">*</span>
          </label>
          <div className="relative">
            <Lock className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors",
              isFocused === "cvv" ? "text-[#A7CD0F]" : "text-white/50"
            )} />
            <Input
              type="password"
              placeholder="123"
              value={formData.cvv}
              onChange={(e) => handleChange("cvv", e.target.value)}
              onFocus={() => setIsFocused("cvv")}
              onBlur={() => setIsFocused(null)}
              maxLength={4}
              className={cn(
                "h-12 pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl transition-colors",
                errors.cvv && "border-red-500/50",
                isFocused === "cvv" && "border-[#A7CD0F]/50"
              )}
            />
          </div>
          {errors.cvv && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1 text-xs text-red-400"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.cvv}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Save Card */}
      <label className="flex items-center gap-3 cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            checked={formData.saveCard}
            onChange={(e) => handleChange("saveCard", e.target.checked)}
            className="sr-only"
          />
          <motion.div
            className={cn(
              "w-5 h-5 rounded border-2 transition-colors",
              formData.saveCard
                ? "bg-[#A7CD0F] border-[#A7CD0F]"
                : "border-white/30 hover:border-white/50"
            )}
            whileTap={{ scale: 0.9 }}
          >
            {formData.saveCard && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center justify-center"
              >
                <Check className="w-3 h-3 text-[#101418]" />
              </motion.div>
            )}
          </motion.div>
        </div>
        <span className="text-sm text-white/70">Sauvegarder cette carte pour mes prochains achats</span>
      </label>
      
      {/* Security Notice */}
      <div className="flex items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10">
        <Shield className="w-5 h-5 text-[#A7CD0F] shrink-0" />
        <p className="text-xs text-white/60">
          Paiement sécurisé par chiffrement SSL 256-bit. Vos données bancaires ne sont jamais stockées sur nos serveurs.
        </p>
      </div>
      
      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full h-14 bg-[#A7CD0F] text-[#101418] hover:bg-[#A7CD0F]/90 rounded-xl font-semibold text-base shadow-[0_0_40px_rgba(167,205,15,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-5 h-5 border-2 border-[#101418]/30 border-t-[#101418] rounded-full" />
          </motion.div>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Lock className="w-5 h-5" />
            Payer maintenant
          </span>
        )}
      </Button>
    </form>
  );
}
