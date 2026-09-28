"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X,
  Home,
  Building,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Address {
  id: string;
  type: "home" | "work" | "other";
  label: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

interface AddressFormProps {
  addresses?: Address[];
  onSave?: (address: Address) => void;
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
}

export function AddressForm({ addresses = [], onSave, onDelete, onSetDefault }: AddressFormProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState<Partial<Address>>({
    type: "home",
    label: "Domicile",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Côte d'Ivoire",
    phone: "",
    isDefault: false,
  });
  
  const handleEdit = (address: Address) => {
    setEditingId(address.id);
    setFormData(address);
    setIsEditing(true);
  };
  
  const handleNew = () => {
    setEditingId(null);
    setFormData({
      type: "home",
      label: "Domicile",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "Côte d'Ivoire",
      phone: "",
      isDefault: false,
    });
    setIsEditing(true);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      type: "home",
      label: "Domicile",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "Côte d'Ivoire",
      phone: "",
      isDefault: false,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      const address: Address = {
        id: editingId || Date.now().toString(),
        type: formData.type || "home",
        label: formData.label || "Domicile",
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        address: formData.address || "",
        city: formData.city || "",
        postalCode: formData.postalCode || "",
        country: formData.country || "Côte d'Ivoire",
        phone: formData.phone || "",
        isDefault: formData.isDefault || false,
      };
      onSave(address);
      handleCancel();
    }
  };
  
  const handleDelete = (id: string) => {
    if (onDelete && confirm("Êtes-vous sûr de vouloir supprimer cette adresse ?")) {
      onDelete(id);
    }
  };
  
  const handleSetDefault = (id: string) => {
    if (onSetDefault) {
      onSetDefault(id);
    }
  };
  
  const getTypeIcon = (type: Address["type"]) => {
    switch (type) {
      case "home":
        return Home;
      case "work":
        return Briefcase;
      default:
        return Building;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading text-xl font-bold text-white">Adresses de livraison</h3>
          <p className="text-white/60 text-sm">Gérez vos adresses de livraison et de facturation</p>
        </div>
        {!isEditing && (
          <Button
            onClick={handleNew}
            className="bg-[#A7CD0F] text-[#101418] hover:bg-[#A7CD0F]/90"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle adresse
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
                <label className="text-sm font-medium text-white/90">Type d'adresse</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Address["type"] })}
                  className="w-full h-12 px-4 bg-white/5 border border-white/10 text-white rounded-xl"
                >
                  <option value="home">Domicile</option>
                  <option value="work">Travail</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">Libellé</label>
                <Input
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="Domicile, Bureau..."
                  className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">Prénom</label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Jean"
                  required
                  className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">Nom</label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Dupont"
                  required
                  className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Adresse</label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="123 Rue de la Paix"
                required
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">Code postal</label>
                <Input
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="00225"
                  required
                  className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">Ville</label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Abidjan"
                  required
                  className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">Pays</label>
                <Input
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="Côte d'Ivoire"
                  required
                  className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Téléphone</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="01 23 45 67 89"
                required
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
              />
            </div>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isDefault}
                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                className="w-5 h-5 rounded border-2 border-white/30 bg-transparent checked:bg-[#A7CD0F] checked:border-[#A7CD0F]"
              />
              <span className="text-sm text-white/70">Définir comme adresse par défaut</span>
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
      
      {/* Addresses List */}
      {!isEditing && addresses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => {
            const TypeIcon = getTypeIcon(address.type);
            return (
              <motion.div
                key={address.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "p-4 rounded-2xl border transition-all duration-300",
                  address.isDefault
                    ? "bg-[#A7CD0F]/10 border-[#A7CD0F]/30"
                    : "bg-white/5 border-white/10 hover:border-white/20"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      address.isDefault ? "bg-[#A7CD0F]/20" : "bg-white/10"
                    )}>
                      <TypeIcon className={cn(
                        "w-5 h-5",
                        address.isDefault ? "text-[#A7CD0F]" : "text-white/50"
                      )} />
                    </div>
                    <div>
                      <div className="font-medium text-white">{address.label}</div>
                      {address.isDefault && (
                        <div className="text-xs text-[#A7CD0F]">Par défaut</div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(address)}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Edit className="w-4 h-4 text-white/50 hover:text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-white/50 hover:text-red-400" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-1 text-sm text-white/70">
                  <div>{address.firstName} {address.lastName}</div>
                  <div>{address.address}</div>
                  <div>{address.postalCode} {address.city}</div>
                  <div>{address.country}</div>
                  <div>{address.phone}</div>
                </div>
                
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
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
      
      {!isEditing && addresses.length === 0 && (
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
          <MapPin className="w-12 h-12 text-white/30 mx-auto mb-4" />
          <p className="text-white/60 mb-4">Aucune adresse enregistrée</p>
          <Button
            onClick={handleNew}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une adresse
          </Button>
        </div>
      )}
    </div>
  );
}
