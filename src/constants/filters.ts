import type { SortOption, Option } from "@/types";
import type {
  VehicleCondition,
  FuelType,
  TransmissionType,
  BodyType,
  Drivetrain,
  VehicleStatus,
} from "@/types/vehicle";
import type { ProductStatus, ProductType, ProductStockStatus, ProductCondition } from "@/types/product";
import type { OrderStatus, PaymentMethod, PaymentStatus, ShippingMethod, FulfillmentStatus } from "@/types/order";

export const VEHICLE_CONDITIONS: Option<VehicleCondition>[] = [
  { value: "new", label: "Neuf" },
  { value: "pre_registered", label: "Pré-immatriculé" },
  { value: "demonstrator", label: "Démonstrateur" },
  { value: "used", label: "Occasion" },
];

export const VEHICLE_STATUSES: Option<VehicleStatus>[] = [
  { value: "available", label: "Disponible" },
  { value: "reserved", label: "Réservé" },
  { value: "pending_delivery", label: "Livraison en cours" },
  { value: "sold", label: "Vendu" },
];

export const FUEL_TYPES: Option<FuelType>[] = [
  { value: "petrol", label: "Essence" },
  { value: "diesel", label: "Diesel" },
  { value: "hybrid", label: "Hybride" },
  { value: "plug_in_hybrid", label: "Hybride Rechargeable" },
  { value: "electric", label: "100% Électrique" },
  { value: "hydrogen", label: "Hydrogène" },
  { value: "lpg", label: "GPL" },
  { value: "ethanol", label: "Éthanol" },
];

export const TRANSMISSION_TYPES: Option<TransmissionType>[] = [
  { value: "manual", label: "Manuelle" },
  { value: "automatic", label: "Automatique" },
  { value: "semi_automatic", label: "Semi-automatique" },
  { value: "cvt", label: "CVT" },
  { value: "single_gear", label: "À vitesse unique" },
];

export const BODY_TYPES: Option<BodyType>[] = [
  { value: "sedan", label: "Berline" },
  { value: "suv", label: "SUV" },
  { value: "hatchback", label: "Citadine" },
  { value: "coupe", label: "Coupé" },
  { value: "convertible", label: "Cabriolet" },
  { value: "wagon", label: "Break" },
  { value: "van", label: "Utilitaire" },
  { value: "pickup", label: "Pickup" },
  { value: "minivan", label: "Monospace" },
  { value: "sports", label: "Sportive" },
];

export const DRIVETRAINS: Option<Drivetrain>[] = [
  { value: "fwd", label: "Traction (AV)" },
  { value: "rwd", label: "Propulsion (AR)" },
  { value: "awd", label: "Intégrale Permanente" },
  { value: "4wd", label: "4x4" },
];

export const CRIT_AIR_OPTIONS: Option<string>[] = [
  { value: "1", label: "Crit'Air 1" },
  { value: "2", label: "Crit'Air 2" },
  { value: "3", label: "Crit'Air 3" },
  { value: "4", label: "Crit'Air 4" },
  { value: "5", label: "Crit'Air 5" },
];

export const DOORS_OPTIONS: Option<string>[] = [
  { value: "2", label: "2 portes" },
  { value: "3", label: "3 portes" },
  { value: "4", label: "4 portes" },
  { value: "5", label: "5 portes" },
];

export const SEATS_OPTIONS: Option<string>[] = [
  { value: "2", label: "2 places" },
  { value: "4", label: "4 places" },
  { value: "5", label: "5 places" },
  { value: "7", label: "7 places" },
  { value: "9", label: "9 places" },
];

export const VEHICLE_SORT_OPTIONS: SortOption[] = [
  { label: "Prix : croissant", value: "price_asc", sortBy: "price.amount", sortOrder: "asc" },
  { label: "Prix : décroissant", value: "price_desc", sortBy: "price.amount", sortOrder: "desc" },
  { label: "Kilométrage : bas d'abord", value: "mileage_asc", sortBy: "mileageKm", sortOrder: "asc" },
  { label: "Kilométrage : haut d'abord", value: "mileage_desc", sortBy: "mileageKm", sortOrder: "desc" },
  { label: "Année : plus récent", value: "year_desc", sortBy: "year", sortOrder: "desc" },
  { label: "Année : plus ancien", value: "year_asc", sortBy: "year", sortOrder: "asc" },
  { label: "Puissance : haut d'abord", value: "power_desc", sortBy: "powerHp", sortOrder: "desc" },
  { label: "Mise en ligne : récent", value: "created_desc", sortBy: "publishedAt", sortOrder: "desc" },
  { label: "Populaires", value: "popular", sortBy: "viewCount", sortOrder: "desc" },
  { label: "Meilleures offres", value: "deal_score", sortBy: "dealScore", sortOrder: "desc" },
];

export const VEHICLE_MILEAGE_RANGES = [
  { min: 0, max: 10000, label: "- 10 000 km" },
  { min: 10000, max: 30000, label: "10 000 - 30 000 km" },
  { min: 30000, max: 60000, label: "30 000 - 60 000 km" },
  { min: 60000, max: 100000, label: "60 000 - 100 000 km" },
  { min: 100000, max: 150000, label: "100 000 - 150 000 km" },
  { min: 150000, max: 200000, label: "150 000 - 200 000 km" },
  { min: 200000, max: undefined, label: "+ 200 000 km" },
];

export const VEHICLE_YEAR_RANGES = [
  { min: 2024, max: undefined, label: "2024 et plus" },
  { min: 2022, max: undefined, label: "2022 et plus" },
  { min: 2020, max: undefined, label: "2020 et plus" },
  { min: 2018, max: 2023, label: "2018 - 2023" },
  { min: 2015, max: 2019, label: "2015 - 2019" },
  { min: 2010, max: 2014, label: "2010 - 2014" },
];

export const VEHICLE_POWER_RANGES = [
  { min: 0, max: 100, label: "- 100 ch" },
  { min: 100, max: 150, label: "100 - 150 ch" },
  { min: 150, max: 200, label: "150 - 200 ch" },
  { min: 200, max: 300, label: "200 - 300 ch" },
  { min: 300, max: 500, label: "300 - 500 ch" },
  { min: 500, max: undefined, label: "+ 500 ch" },
];

export const PRODUCT_STATUSES: Option<ProductStatus>[] = [
  { value: "active", label: "Actif" },
  { value: "draft", label: "Brouillon" },
  { value: "out_of_stock", label: "Rupture de stock" },
  { value: "inactive", label: "Inactif" },
];

export const PRODUCT_TYPES: Option<ProductType>[] = [
  { value: "physical", label: "Produit physique" },
  { value: "digital", label: "Produit numérique" },
  { value: "service", label: "Service" },
  { value: "bundle", label: "Lot / Pack" },
];

export const PRODUCT_STOCK_STATUSES: Option<ProductStockStatus>[] = [
  { value: "in_stock", label: "En stock" },
  { value: "low_stock", label: "Stock limité" },
  { value: "out_of_stock", label: "Rupture" },
  { value: "pre_order", label: "Pré-commande" },
  { value: "on_demand", label: "Sur commande" },
];

export const PRODUCT_CONDITIONS: Option<ProductCondition>[] = [
  { value: "new", label: "Neuf" },
  { value: "like_new", label: "État neuf" },
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Bon état" },
  { value: "fair", label: "État correct" },
];

export const PRODUCT_SORT_OPTIONS: SortOption[] = [
  { label: "Pertinence", value: "relevance", sortBy: "_score", sortOrder: "desc" },
  { label: "Prix : croissant", value: "price_asc", sortBy: "price.amount", sortOrder: "asc" },
  { label: "Prix : décroissant", value: "price_desc", sortBy: "price.amount", sortOrder: "desc" },
  { label: "Les mieux notés", value: "rating", sortBy: "averageRating", sortOrder: "desc" },
  { label: "Meilleures ventes", value: "bestseller", sortBy: "salesCount", sortOrder: "desc" },
  { label: "Nouveautés", value: "newest", sortBy: "publishedAt", sortOrder: "desc" },
  { label: "Promos", value: "discount", sortBy: "discountPercent", sortOrder: "desc" },
  { label: "A-Z", value: "name_asc", sortBy: "name", sortOrder: "asc" },
];

export const ORDER_STATUSES: Option<OrderStatus>[] = [
  { value: "pending", label: "En attente" },
  { value: "awaiting_payment", label: "En attente de paiement" },
  { value: "payment_received", label: "Paiement reçu" },
  { value: "processing", label: "En préparation" },
  { value: "shipped", label: "Expédié" },
  { value: "in_transit", label: "En transit" },
  { value: "out_for_delivery", label: "En livraison" },
  { value: "delivered", label: "Livré" },
  { value: "completed", label: "Terminé" },
  { value: "cancelled", label: "Annulé" },
  { value: "refunded", label: "Remboursé" },
  { value: "disputed", label: "Litige" },
  { value: "on_hold", label: "En pause" },
];

export const PAYMENT_METHODS: Option<PaymentMethod>[] = [
  { value: "card", label: "Carte bancaire" },
  { value: "apple_pay", label: "Apple Pay" },
  { value: "google_pay", label: "Google Pay" },
  { value: "paypal", label: "PayPal" },
  { value: "klarna", label: "Klarna" },
  { value: "alma", label: "Alma (3x CB)" },
  { value: "sepa_transfer", label: "Virement SEPA" },
  { value: "bank_transfer", label: "Virement bancaire" },
  { value: "lease", label: "Location / LOA" },
  { value: "loan", label: "Crédit auto" },
  { value: "trade_in", label: "Reprise" },
  { value: "wallet_credit", label: "Crédit VroomCar" },
];

export const PAYMENT_STATUSES: Option<PaymentStatus>[] = [
  { value: "pending", label: "En attente" },
  { value: "authorized", label: "Autorisé" },
  { value: "captured", label: "Capturé" },
  { value: "refunded", label: "Remboursé" },
  { value: "failed", label: "Échoué" },
  { value: "cancelled", label: "Annulé" },
  { value: "expired", label: "Expiré" },
];

export const SHIPPING_METHODS: Option<ShippingMethod>[] = [
  { value: "standard", label: "Livraison Standard (3-5j)" },
  { value: "express", label: "Livraison Express (1-2j)" },
  { value: "home_delivery", label: "Livraison à Domicile Premium" },
  { value: "pickup_point", label: "Point Relais" },
  { value: "store_pickup", label: "Retrait en Concession" },
  { value: "premium_white_glove", label: "White Glove (installation)" },
  { value: "same_day", label: "Livraison le Jour Même" },
  { value: "international", label: "Livraison Internationale" },
];

export const FULFILLMENT_STATUSES: Option<FulfillmentStatus>[] = [
  { value: "not_needed", label: "N/A" },
  { value: "pending", label: "En attente" },
  { value: "picking", label: "Préparation" },
  { value: "packed", label: "Emballé" },
  { value: "shipped", label: "Expédié" },
  { value: "in_transit", label: "En transit" },
  { value: "delivered", label: "Livré" },
  { value: "failed", label: "Échec" },
  { value: "returned", label: "Retourné" },
];

export const RATING_OPTIONS = [
  { value: 1, label: "1 étoile" },
  { value: 2, label: "2 étoiles" },
  { value: 3, label: "3 étoiles" },
  { value: 4, label: "4 étoiles" },
  { value: 5, label: "5 étoiles" },
];
