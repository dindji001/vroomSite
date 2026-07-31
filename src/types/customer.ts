import type { ID, Timestamp, Money } from "@/types";
import type { User, UserTier } from "@/types/user";

export type WalletTransactionType =
  | "credit"
  | "debit"
  | "top_up"
  | "refund"
  | "purchase"
  | "cashback"
  | "referral_bonus"
  | "promo"
  | "conversion_from_points"
  | "conversion_to_points"
  | "adjustment_admin";

export type WalletTransactionStatus = "pending" | "completed" | "failed" | "reversed" | "cancelled";

export type Wallet = {
  id: ID;
  userId: ID;
  user?: User;
  currency: string;
  balance: Money;
  availableBalance: Money;
  pendingBalance: Money;
  lifetimeCredited: Money;
  lifetimeDebited: Money;
  isActive: boolean;
  lastTopUpAt?: string;
  lastTransactionAt?: string;
  lowBalanceThreshold?: Money;
  notificationsEnabled: boolean;
  statementEnabled: boolean;
  automaticTopUpEnabled?: boolean;
  automaticTopUpTrigger?: Money;
  automaticTopUpAmount?: Money;
  maximumBalance?: Money;
} & Timestamp;

export type WalletTransaction = {
  id: ID;
  walletId: ID;
  userId: ID;
  referenceType: string;
  referenceId?: ID;
  type: WalletTransactionType;
  status: WalletTransactionStatus;
  amount: Money;
  runningBalance?: Money;
  currency: string;
  description?: string;
  counterpartyWalletId?: ID;
  counterpartyUserId?: ID;
  feeAmount?: Money;
  netAmount?: Money;
  metadata?: Record<string, unknown>;
  initiatedById?: ID;
  failureReason?: string;
  reversedByTransactionId?: ID;
  reversalOfTransactionId?: ID;
  expiresAt?: string;
  holdExpiresAt?: string;
  processor?: string;
  processorTransactionId?: string;
  attachments?: string[];
  notes?: string;
  createdAt: string;
  updatedAt?: string;
};

export type LoyaltyTransactionType =
  | "earn_purchase"
  | "earn_signup"
  | "earn_referral"
  | "earn_review"
  | "earn_social_share"
  | "earn_birthday"
  | "earn_anniversary"
  | "earn_promotion"
  | "earn_admin"
  | "redeem_discount"
  | "redeem_product"
  | "redeem_wallet_credit"
  | "redeem_voucher"
  | "expire"
  | "adjustment"
  | "return_deduction";

export type LoyaltyProgram = {
  id: ID;
  name: string;
  slug: string;
  isActive: boolean;
  earnRatePerEuroSpent: number;
  minPointsToRedeem: number;
  pointsValueRate: number;
  pointsExpiryMonths?: number;
  tierBenefitsMultiplier?: Record<string, number>;
  maxEarnPerOrder?: number;
  maxRedeemPerOrderPercent?: number;
  earnOnShipping?: boolean;
  earnOnTaxes?: boolean;
  earnOnDiscounts?: boolean;
  milestones?: Array<{ threshold: number; rewardType: string; rewardValue: string }>;
  earnRules?: Array<{ action: string; points: number; description?: string; limitPerUser?: number }>;
};

export type LoyaltyPointsLedger = {
  id: ID;
  userId: ID;
  programId: ID;
  type: LoyaltyTransactionType;
  direction: "in" | "out";
  points: number;
  runningBalance?: number;
  referenceId?: ID;
  referenceType?: string;
  orderId?: ID;
  productId?: ID;
  description?: string;
  expiresAt?: string;
  relatedExpiryTransactionId?: ID;
  metadata?: Record<string, unknown>;
  createdAt: string;
};

export type Referral = {
  id: ID;
  referrerUserId: ID;
  refereeUserId?: ID;
  refereeEmail?: string;
  refereeName?: string;
  refereePhone?: string;
  code: string;
  link?: string;
  status: "sent" | "viewed" | "signed_up" | "first_order_completed" | "rewarded" | "expired" | "cancelled";
  rewardReferrerType?: "discount" | "wallet_credit" | "points" | "gift";
  rewardReferrerValue?: Money;
  rewardReferrerPoints?: number;
  rewardReferrerCouponId?: ID;
  rewardReferrerProductId?: ID;
  rewardRefereeType?: "discount" | "wallet_credit" | "points" | "gift";
  rewardRefereeValue?: Money;
  rewardRefereeCouponId?: ID;
  refereeFirstOrderId?: ID;
  refereeSignedUpAt?: string;
  refereeFirstOrderAt?: string;
  rewardGivenAt?: string;
  rewardRefereeGivenAt?: string;
  message?: string;
  expiresAt?: string;
  sentVia?: "email" | "sms" | "link_share" | "manual";
  createdAt: string;
} & Timestamp;

export type PaymentCard = {
  id: ID;
  userId: ID;
  user?: User;
  fingerprint?: string;
  brand: "visa" | "mastercard" | "amex" | "discover" | "unionpay" | "jcb" | "diners" | "other";
  last4: string;
  bin?: string;
  expMonth: number;
  expYear: number;
  cardholderName?: string;
  maskedNumber?: string;
  isDefault: boolean;
  processor: "stripe" | "mango_pay" | "adyen" | "internal";
  processorPaymentMethodId?: string;
  processorCustomerId?: string;
  isActive: boolean;
  isThreeDSecureEnrolled?: boolean;
  billingCountry?: string;
  billingPostalCode?: string;
  funding?: "credit" | "debit" | "prepaid" | "unknown";
  isVirtual?: boolean;
  wallet?: "apple_pay" | "google_pay" | null;
  lastUsedAt?: string;
  addedAt: string;
  expiresSoon?: boolean;
};

export type SavedSearch = {
  id: ID;
  userId: ID;
  name: string;
  scope: "vehicles" | "products";
  filters: Record<string, unknown>;
  searchQuery?: string;
  alertEnabled: boolean;
  alertFrequency: "instant" | "daily" | "weekly";
  lastAlertAt?: string;
  matchesCount?: number;
  lastMatchesCount?: number;
  pinned?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type WishlistItem = {
  id: ID;
  wishlistId: ID;
  kind: "vehicle" | "product";
  vehicleId?: ID;
  productId?: ID;
  variantId?: ID;
  addedNote?: string;
  priority?: "low" | "medium" | "high";
  quantity: number;
  addedAt: string;
  alertedOnPriceDrop?: boolean;
  alertedOnBackInStock?: boolean;
  priceWhenAdded?: Money;
};

export type Wishlist = {
  id: ID;
  userId: ID;
  user?: User;
  name: string;
  description?: string;
  isPublic: boolean;
  shareLink?: string;
  isDefault: boolean;
  scope: "vehicles" | "products" | "mixed";
  items: WishlistItem[];
  itemCount: number;
  estimatedTotal?: Money;
  coverImageUrl?: string;
  lastViewedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type NotificationKind =
  | "order_status"
  | "payment"
  | "shipment"
  | "wishlist_price_drop"
  | "wishlist_back_in_stock"
  | "saved_search_match"
  | "loyalty"
  | "referral"
  | "support_ticket"
  | "vehicle_available"
  | "appointment_reminder"
  | "document_upload"
  | "wallet"
  | "marketing"
  | "system"
  | "staff_assignment"
  | "security";

export type NotificationChannel = "email" | "sms" | "push" | "in_app" | "whatsapp";

export type Notification = {
  id: ID;
  userId: ID;
  kind: NotificationKind;
  priority: "low" | "normal" | "high" | "urgent";
  title: string;
  body: string;
  summary?: string;
  imageUrl?: string;
  actionLabel?: string;
  actionUrl?: string;
  deepLink?: string;
  referenceType?: string;
  referenceId?: ID;
  metadata?: Record<string, unknown>;
  channels: NotificationChannel[];
  sentChannels?: NotificationChannel[];
  readAt?: string;
  seenAt?: string;
  clickedAt?: string;
  archivedAt?: string;
  expiresAt?: string;
  scheduledAt?: string;
  sentAt?: string;
  failedAt?: string;
  failureReason?: string;
  attempts?: number;
  ttlSeconds?: number;
  groupKey?: string;
  createdAt: string;
};

export type NotificationPreferences = {
  userId: ID;
  preferences: Record<NotificationKind, Partial<Record<NotificationChannel, boolean>>>;
  quietHoursEnabled: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  quietHoursTimezone?: string;
  doNotDisturbUntil?: string;
  marketingOptIn: boolean;
  smsOptIn: boolean;
  whatsappOptIn: boolean;
  pushOptIn: boolean;
  pushDeviceTokens?: Array<{ token: string; platform: "ios" | "android" | "web"; addedAt: string }>;
  browserSubscriptions?: Array<{ endpoint: string; createdAt: string }>;
  updatedAt: string;
};
