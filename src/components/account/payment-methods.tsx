"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X,
  Lock,
  Shield,
  AlertCircle,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "bank_transfer";
  label: string;
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  isDefault: boolean;
  isExpired?: boolean;
}

interface PaymentMethodsProps {
  paymentMethods?: PaymentMethod[];
  onSave?: (method: PaymentMethod) => void;
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
}

export function PaymentMethods({ 
  paymentMethods = [], 
  onSave, 
  onDelete, 
  onSetDefault 
}: PaymentMethodsProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState<Partial<PaymentMethod>>({
    type: "card",
    label: "Carte principale",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    isDefault: false,
  });
  
  const handleEdit = (method: PaymentMethod) => {
    setEditingId(method.id);
    setFormData(method);
    setIsEditing(true);
  };
  
  const handleNew = () => {
    setEditingId(null);
    setFormData({
      type: "card",
      label: "Carte principale",
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      isDefault: false,
    });
    setIsEditing(true);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      type: "card",
      label: "Carte principale",
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      isDefault: false,
    });
  };
  
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      const method: PaymentMethod = {
        id: editingId || Date.now().toString(),
        type: formData.type || "card",
        label: formData.label || "Carte principale",
        cardNumber: formData.cardNumber,
        cardHolder: formData.cardHolder,
        expiryDate: formData.expiryDate,
        isDefault: formData.isDefault || false,
      };
      onSave(method);
      handleCancel();
    }
  };
  
  const handleDelete = (id: string) => {
    if (onDelete && confirm("Êtes-vous sûr de vouloir supprimer ce moyen de paiement ?")) {
      onDelete(id);
    }
  };
  
  const handleSetDefault = (id: string) => {
    if (onSetDefault) {
      onSetDefault(id);
    }
  };
  
  const maskCardNumber = (cardNumber?: string) => {
    if (!cardNumber) return "•••• •••• •••• ••••";
    const parts = cardNumber.split(" ");
    if (parts.length === 4) {
      return `•••• •••• •••• ${parts[3]}`;
    }
    return "•••• •••• •••• ••••";
  };
  
  const getCardType = (cardNumber?: string) => {
    if (!cardNumber) return "unknown";
    const number = cardNumber.replace(/\s/g, "");
    if (/^4/.test(number)) return "visa";
    if (/^5[1-5]/.test(number)) return "mastercard";
    if (/^3[47]/.test(number)) return "amex";
    return "unknown";
  };
  
  const isCardExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const [month, year] = expiryDate.split("/");
    const now = new Date();
    const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
    return expiry < now;
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading text-xl font-bold text-white">Moyens de paiement</h3>
          <p className="text-white/60 text-sm">Gérez vos cartes bancaires et moyens de paiement</p>
        </div>
        {!isEditing && (
          <Button
            onClick={handleNew}
            className="bg-[#A7CD0F] text-[#101418] hover:bg-[#A7CD0F]/90"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau moyen de paiement
          </Button>
        )}
      </div>
      
      {/* Edit Form */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">Type de moyen de paiement</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as PaymentMethod["type"] })}
                  className="w-full h-12 px-4 bg-white/5 border border-white/10 text-white rounded-xl"
                >
                  <option value="card">Carte bancaire</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank_transfer">Virement bancaire</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">Libellé</label>
                <Input
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="Carte principale"
                  className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
                />
              </div>
            </div>
            
            {formData.type === "card" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/90">Numéro de carte</label>
                  <Input
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/90">Titulaire</label>
                    <Input
                      value={formData.cardHolder}
                      onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value.toUpperCase() })}
                      placeholder="JEAN DUPONT"
                      required
                      className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/90">Expiration</label>
                    <Input
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: formatExpiryDate(e.target.value) })}
                      placeholder="MM/AA"
                      maxLength={5}
                      required
                      className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
                    />
                  </div>
                </div>
              </>
            )}
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isDefault}
                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                className="w-5 h-5 rounded border-2 border-white/30 bg-transparent checked:bg-[#A7CD0F] checked:border-[#A7CD0F]"
              />
              <span className="text-sm text-white/70">Définir comme moyen de paiement par défaut</span>
            </label>
            
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="bg-[#A7CD0F] text-[#101418] hover:bg-[#A7CD0F]/90"
              >
                <Check className="w-4 h-4 mr-2" />
                {editingId ? "Modifier" : "Ajouter"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <X className="w-4 h-4 mr-2" />
                Annuler
              </Button>
            </div>
          </form>
        </motion.div>
      )}
      
      {/* Payment Methods List */}
      {!isEditing && paymentMethods.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => {
            const cardType = getCardType(method.cardNumber);
            const expired = method.isExpired || isCardExpired(method.expiryDate);
            
            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "p-4 rounded-2xl border transition-all duration-300",
                  method.isDefault
                    ? "bg-[#A7CD0F]/10 border-[#A7CD0F]/30"
                    : "bg-white/5 border-white/10 hover:border-white/20",
                  expired && "border-red-500/30 bg-red-500/5"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      method.isDefault ? "bg-[#A7CD0F]/20" : expired ? "bg-red-500/20" : "bg-white/10"
                    )}>
                      <CreditCard className={cn(
                        "w-5 h-5",
                        method.isDefault ? "text-[#A7CD0F]" : expired ? "text-red-400" : "text-white/50"
                      )} />
                    </div>
                    <div>
                      <div className="font-medium text-white">{method.label}</div>
                      {method.isDefault && (
                        <div className="text-xs text-[#A7CD0F]">Par défaut</div>
                      )}
                      {expired && (
                        <div className="text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Expirée
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(method)}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Edit className="w-4 h-4 text-white/50 hover:text-white" />
                    </button>
                    {!method.isDefault && (
                      <button
                        onClick={() => handleDelete(method.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-white/50 hover:text-red-400" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="space-y-1 text-sm text-white/70">
                  {method.type === "card" && method.cardNumber && (
                    <>
                      <div className="font-mono">{maskCardNumber(method.cardNumber)}</div>
                      {method.cardHolder && <div>{method.cardHolder}</div>}
                      {method.expiryDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{method.expiryDate}</span>
                        </div>
                      )}
                    </>
                  )}
                  {method.type === "paypal" && (
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#A7CD0F]" />
                      <span>Compte PayPal connecté</span>
                    </div>
                  )}
                  {method.type === "bank_transfer" && (
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-white/50" />
                      <span>Virement bancaire</span>
                    </div>
                  )}
                </div>
                
                {!method.isDefault && !expired && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="mt-3 text-xs text-[#A7CD0F] hover:underline"
                  >
                    Définir par défaut
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
      
      {!isEditing && paymentMethods.length === 0 && (
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
          <CreditCard className="w-12 h-12 text-white/30 mx-auto mb-4" />
          <p className="text-white/60 mb-4">Aucun moyen de paiement enregistré</p>
          <Button
            onClick={handleNew}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un moyen de paiement
          </Button>
        </div>
      )}
      
      {/* Security Notice */}
      {!isEditing && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
          <Lock className="w-5 h-5 text-[#A7CD0F] shrink-0" />
          <p className="text-xs text-white/60">
            Vos informations de paiement sont sécurisées par chiffrement SSL 256-bit et conformes à la norme PCI DSS.
          </p>
        </div>
      )}
    </div>
  );
}
