import type { BreadcrumbItem } from "@/types";

export const DEFAULT_BREADCRUMBS: BreadcrumbItem[] = [
  { label: "Accueil", href: "/" },
];

export const NAVIGATION_BREADCRUMBS: Record<string, BreadcrumbItem[]> = {
  "/vehicles": [{ label: "Véhicules", href: "/vehicles" }],
  "/products": [{ label: "Boutique", href: "/products" }],
  "/services": [{ label: "Services", href: "/services" }],
  "/about": [{ label: "À propos", href: "/about" }],
  "/contact": [{ label: "Contact", href: "/contact" }],
  "/blog": [{ label: "Blog", href: "/blog" }],
  "/cart": [{ label: "Panier", href: "/cart" }],
  "/checkout": [
    { label: "Panier", href: "/cart" },
    { label: "Paiement", href: "/checkout" },
  ],
  "/wishlist": [{ label: "Mes favoris", href: "/wishlist" }],
  "/compare": [{ label: "Comparaison", href: "/compare" }],
  "/login": [{ label: "Connexion", href: "/login" }],
  "/register": [{ label: "Inscription", href: "/register" }],
  "/account": [{ label: "Mon compte", href: "/account" }],
  "/account/profile": [
    { label: "Mon compte", href: "/account" },
    { label: "Profil", href: "/account/profile" },
  ],
  "/account/orders": [
    { label: "Mon compte", href: "/account" },
    { label: "Commandes", href: "/account/orders" },
  ],
  "/account/favorites": [
    { label: "Mon compte", href: "/account" },
    { label: "Favoris", href: "/account/favorites" },
  ],
  "/account/settings": [
    { label: "Mon compte", href: "/account" },
    { label: "Préférences", href: "/account/settings" },
  ],
  "/account/wallet": [
    { label: "Mon compte", href: "/account" },
    { label: "Portefeuille", href: "/account/wallet" },
  ],
  "/account/documents": [
    { label: "Mon compte", href: "/account" },
    { label: "Documents", href: "/account/documents" },
  ],
};

export const STORAGE_KEYS = {
  CART: "vroomcar:cart",
  CART_ID: "vroomcar:cart_id",
  WISHLIST: "vroomcar:wishlist",
  WISHLIST_ID: "vroomcar:wishlist_id",
  COMPARE: "vroomcar:compare_vehicles",
  SEARCH_HISTORY: "vroomcar:search_history",
  SAVED_FILTERS_VEHICLES: "vroomcar:filters:vehicles",
  SAVED_FILTERS_PRODUCTS: "vroomcar:filters:products",
  GUEST_EMAIL: "vroomcar:guest_email",
  REFERRAL_CODE: "vroomcar:referral_code",
  UTM_PARAMS: "vroomcar:utm_params",
  NOTIFICATIONS_SEEN_AT: "vroomcar:notifications_seen_at",
  CONSENT: {
    COOKIES: "vroomcar:consent:cookies",
    MARKETING: "vroomcar:consent:marketing",
    ANALYTICS: "vroomcar:consent:analytics",
  },
  UI: {
    SIDEBAR_OPEN: "vroomcar:ui:sidebar_open",
    GRID_MODE_VEHICLES: "vroomcar:ui:grid_mode_vehicles",
    GRID_MODE_PRODUCTS: "vroomcar:ui:grid_mode_products",
    FILTERS_OPEN: "vroomcar:ui:filters_open",
    NAVBAR_TRANSPARENT: "vroomcar:ui:navbar_transparent",
    COMPACT_MODE: "vroomcar:ui:compact_mode",
  },
  AUTH: {
    ACCESS_TOKEN: "vroomcar:access_token",
    REFRESH_TOKEN: "vroomcar:refresh_token",
    EXPIRES_AT: "vroomcar:expires_at",
    REMEMBER_ME: "vroomcar:remember_me",
    IMPERSONATION: "vroomcar:impersonating",
    CSRF_TOKEN: "vroomcar:csrf_token",
    DEVICE_ID: "vroomcar:device_id",
  },
  PAYMENT: {
    INTENT_ID: "vroomcar:payment_intent_id",
    CHECKOUT_ID: "vroomcar:checkout_id",
    CART_TOKEN: "vroomcar:cart_token",
  },
} as const;

export const COOKIE_KEYS = {
  SESSION: "vroomcar_session",
  REFRESH: "vroomcar_refresh",
  CART_ID: "vroomcar_cart_id",
  GUEST_ID: "vroomcar_guest_id",
  DEVICE_ID: "vroomcar_device_id",
  CONSENT: "vroomcar_consent",
  REFERRAL: "vroomcar_referral",
  AFFILIATE: "vroomcar_affiliate",
  LOCALE: "vroomcar_locale",
  CURRENCY: "vroomcar_currency",
  NAVBAR_THEME: "vroomcar_nav_theme",
} as const;

export const ENV = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  IS_TEST: process.env.NODE_ENV === "test",
  IS_STAGING: process.env.NEXT_PUBLIC_ENV === "staging",
  IS_PREVIEW: process.env.VERCEL_ENV === "preview",
} as const;

export const ERROR_MESSAGES = {
  DEFAULT: "Une erreur est survenue. Veuillez réessayer ultérieurement.",
  NETWORK:
    "Impossible de se connecter au serveur. Vérifiez votre connexion internet.",
  TIMEOUT: "La requête a mis trop de temps à répondre. Réessayez.",
  UNAUTHORIZED: "Votre session a expiré. Veuillez vous reconnecter.",
  FORBIDDEN: "Vous n'êtes pas autorisé à effectuer cette action.",
  NOT_FOUND: "La ressource demandée est introuvable.",
  VALIDATION: "Certains champs sont invalides. Veuillez vérifier vos saisies.",
  CONFLICT: "Cette ressource existe déjà ou est en conflit avec une autre.",
  UNPROCESSABLE: "Impossible de traiter la demande. Vérifiez vos données.",
  RATE_LIMIT:
    "Trop de requêtes. Veuillez patienter quelques instants avant de réessayer.",
  PAYMENT_FAILED: "Le paiement a échoué. Vérifiez vos moyens de paiement.",
  OUT_OF_STOCK: "Un ou plusieurs articles ne sont plus en stock.",
  CART_EMPTY: "Votre panier est vide.",
  INVALID_COUPON: "Code promo invalide ou expiré.",
  DUPLICATE_EMAIL: "Cette adresse email est déjà utilisée.",
  WEAK_PASSWORD: "Le mot de passe est trop faible.",
  INVALID_CREDENTIALS: "Identifiants incorrects.",
  ACCOUNT_SUSPENDED: "Votre compte a été suspendu. Contactez le support.",
  EMAIL_NOT_VERIFIED:
    "Veuillez vérifier votre adresse email avant de continuer.",
  MIN_ORDER_VALUE: (min: number, currency: string) =>
    `Le montant minimum de commande est de ${min} ${currency}.`,
  FILE_TOO_BIG: (max: string) =>
    `Le fichier est trop volumineux (taille max : ${max}).`,
  INVALID_FILE_TYPE: (types: string) =>
    `Type de fichier invalide. Types acceptés : ${types}.`,
} as const;

export const SUCCESS_MESSAGES = {
  ACCOUNT_CREATED:
    "Votre compte a été créé avec succès ! Vérifiez vos emails pour valider votre inscription.",
  LOGGED_IN: "Connexion réussie. Bon retour parmi nous !",
  LOGGED_OUT: "Vous avez été déconnecté. À bientôt !",
  PASSWORD_RESET:
    "Un email de réinitialisation a été envoyé. Consultez votre boîte mail.",
  PROFILE_UPDATED: "Votre profil a été mis à jour.",
  PASSWORD_UPDATED: "Votre mot de passe a été modifié avec succès.",
  EMAIL_VERIFIED: "Email vérifié. Votre compte est maintenant actif !",
  ADDED_TO_CART: "Article ajouté à votre panier.",
  REMOVED_FROM_CART: "Article retiré de votre panier.",
  CART_UPDATED: "Votre panier a été mis à jour.",
  COUPON_APPLIED: "Code promo appliqué avec succès !",
  ADDED_TO_WISHLIST: "Ajouté à vos favoris.",
  REMOVED_FROM_WISHLIST: "Retiré de vos favoris.",
  ADDED_TO_COMPARE: "Ajouté à la comparaison.",
  REMOVED_FROM_COMPARE: "Retiré de la comparaison.",
  SAVED_SEARCH: "Recherche sauvegardée. Recevez nos alertes !",
  ORDER_PLACED: "Commande confirmée. Merci pour votre confiance !",
  APPOINTMENT_BOOKED: "Rendez-vous confirmé. Un email de rappel vous sera envoyé.",
  RESERVATION_CONFIRMED: "Véhicule réservé pour 30 minutes.",
  REVIEW_SUBMITTED: "Merci pour votre avis ! Il sera visible sous peu.",
  ADDRESS_SAVED: "Adresse sauvegardée.",
  PAYMENT_METHOD_SAVED: "Moyen de paiement enregistré.",
  REFUND_REQUESTED:
    "Demande de retour enregistrée. Un conseiller vous répondra sous 48h.",
  WALLET_TOPPED_UP: "Votre portefeuille a été crédité.",
  FILE_UPLOADED: "Document téléversé avec succès.",
} as const;

export const LOADING_MESSAGES = {
  LOADING: "Chargement...",
  AUTHENTICATING: "Authentification en cours...",
  SUBMITTING: "Envoi en cours...",
  SAVING: "Sauvegarde en cours...",
  PROCESSING_PAYMENT: "Traitement du paiement en cours...",
  UPLOADING: "Téléversement en cours...",
  RESERVING: "Réservation en cours...",
  PREPARING_ORDER: "Préparation de votre commande...",
  LOADING_VEHICLES: "Chargement des véhicules disponibles...",
  LOADING_PRODUCTS: "Chargement des produits...",
  CALCULATING_DELIVERY: "Calcul des tarifs de livraison...",
  GENERATING_INVOICE: "Génération de votre facture...",
  INITIALIZING_CHECKOUT: "Préparation de votre paiement sécurisé...",
  SEARCHING: "Recherche en cours...",
} as const;
