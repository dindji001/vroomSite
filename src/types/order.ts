import type { ID, Timestamp, Money, Address } from "@/types";
import type { User } from "@/types/user";
import type { Vehicle } from "@/types/vehicle";
import type { ProductVariant } from "@/types/product";

export type OrderStatus =
  | "pending"
  | "awaiting_payment"
  | "payment_received"
  | "processing"
  | "awaiting_shipment"
  | "shipped"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "completed"
  | "cancelled"
  | "refunded"
  | "partially_refunded"
  | "disputed"
  | "on_hold";

export type PaymentMethod =
  | "card"
  | "sepa_transfer"
  | "bank_transfer"
  | "paypal"
  | "apple_pay"
  | "google_pay"
  | "klarna"
  | "alma"
  | "scalapay"
  | "cash"
  | "check"
  | "lease"
  | "loan"
  | "trade_in"
  | "wallet_credit";

export type PaymentStatus =
  | "pending"
  | "authorized"
  | "captured"
  | "partially_captured"
  | "refunded"
  | "partially_refunded"
  | "failed"
  | "cancelled"
  | "expired"
  | "disputed";

export type ShippingMethod =
  | "home_delivery"
  | "pickup_point"
  | "store_pickup"
  | "premium_white_glove"
  | "international"
  | "standard"
  | "express"
  | "same_day";

export type InvoiceStatus = "draft" | "issued" | "paid" | "partially_paid" | "overdue" | "cancelled" | "credited";

export type LineItemKind = "product" | "vehicle" | "service" | "fee" | "discount" | "shipping" | "tax" | "custom";
export type OrderKind = "product" | "vehicle" | "mixed" | "subscription" | "service";
export type FulfillmentStatus = "not_needed" | "pending" | "awaiting_stock" | "picking" | "packed" | "shipped" | "in_transit" | "delivered" | "failed" | "returned" | "cancelled";
export type ReturnStatus = "requested" | "approved" | "in_transit" | "received" | "inspecting" | "refunded" | "exchanged" | "rejected" | "cancelled";

export type CartLineItem = {
  id: string;
  kind: LineItemKind;
  productId?: ID;
  variantId?: ID;
  variant?: ProductVariant;
  vehicleId?: ID;
  vehicle?: Vehicle;
  serviceId?: ID;
  customTitle?: string;
  customDescription?: string;
  sku?: string;
  name: string;
  imageUrl?: string;
  quantity: number;
  unitPrice: Money;
  totalPrice: Money;
  taxRate?: number;
  taxAmount?: Money;
  discountPercent?: number;
  discountAmount?: Money;
  metadata?: Record<string, unknown>;
  isGift?: boolean;
  giftMessage?: string;
  addedAt: string;
  reservedUntil?: string;
};

export type Cart = {
  id: ID;
  userId?: ID;
  sessionId?: string;
  items: CartLineItem[];
  subtotal: Money;
  discounts: Money;
  shippingTotal: Money;
  taxes: Money;
  total: Money;
  totalWeightGrams?: number;
  itemCount: number;
  uniqueItemCount: number;
  couponCode?: string;
  couponId?: ID;
  appliedCoupons?: ID[];
  shippingAddressId?: ID;
  billingAddressId?: ID;
  shippingAddress?: Address;
  billingAddress?: Address;
  shippingMethod?: ShippingMethod;
  shippingQuote?: Money;
  paymentMethod?: PaymentMethod;
  currency: string;
  locale?: string;
  note?: string;
  expiresAt?: string;
  locked?: boolean;
  metadata?: Record<string, unknown>;
  convertedToOrderAt?: string;
  convertedOrderId?: ID;
} & Timestamp;

export type Coupon = {
  id: ID;
  code: string;
  name?: string;
  description?: string;
  type: "percent" | "fixed" | "free_shipping" | "gift" | "buy_x_get_y";
  value: number;
  valueCurrency?: string;
  minimumOrderAmount?: Money;
  maximumDiscountAmount?: Money;
  appliesTo: "all" | "products" | "categories" | "vehicle" | "services";
  applicableProductIds?: ID[];
  applicableCategoryIds?: ID[];
  applicableVehicleIds?: ID[];
  excludedProductIds?: ID[];
  includedGiftProductId?: ID;
  buyXGetYConfig?: { buy: number; get: number; getProductId?: ID; sameProduct?: boolean };
  usageLimit?: number;
  usagePerUserLimit?: number;
  usedCount: number;
  isActive: boolean;
  isStackable: boolean;
  isPublic: boolean;
  requiresLogin?: boolean;
  allowedUserIds?: ID[];
  allowedRoles?: string[];
  newCustomersOnly?: boolean;
  validFrom?: string;
  validUntil?: string;
  firstPurchaseOnly?: boolean;
  compatibleWithSubscriptions?: boolean;
} & Timestamp;

export type OrderLineItem = {
  id: ID;
  orderId: ID;
  kind: LineItemKind;
  productId?: ID;
  variantId?: ID;
  vehicleId?: ID;
  serviceId?: ID;
  sku?: string;
  ean?: string;
  name: string;
  description?: string;
  variantLabel?: string;
  imageUrl?: string;
  quantity: number;
  quantityShipped: number;
  quantityReturned: number;
  quantityRefunded: number;
  unitPrice: Money;
  subtotal: Money;
  taxRate: number;
  taxAmount: Money;
  totalPrice: Money;
  totalPaid?: Money;
  totalRefunded?: Money;
  discountAmount?: Money;
  discountPercent?: number;
  isGift?: boolean;
  giftMessage?: string;
  weightGrams?: number;
  warrantyMonths?: number;
  metadata?: Record<string, unknown>;
  snapshot?: Record<string, unknown>;
};

export type Fulfillment = {
  id: ID;
  orderId: ID;
  trackingCode?: string;
  trackingUrl?: string;
  carrier?: string;
  service?: string;
  estimatedDeliveryAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  status: FulfillmentStatus;
  items: Array<{ orderLineItemId: ID; quantity: number }>;
  weightGrams?: number;
  cost?: Money;
  labelUrl?: string;
  signatureRequired?: boolean;
  instructions?: string;
  notes?: string;
} & Timestamp;

export type OrderTransaction = {
  id: ID;
  orderId: ID;
  type: "authorization" | "capture" | "refund" | "void" | "chargeback" | "payout";
  paymentMethod: PaymentMethod;
  processor: "stripe" | "mango_pay" | "adyen" | "paypal" | "klarna" | "alma" | "bank_transfer" | "cash" | "internal";
  processorTransactionId?: string;
  amount: Money;
  fees?: Money;
  netAmount?: Money;
  currency: string;
  status: PaymentStatus;
  gatewayStatus?: string;
  riskScore?: number;
  riskLevel?: "low" | "medium" | "high";
  paymentMethodDetails?: Record<string, unknown>;
  failureReason?: string;
  metadata?: Record<string, unknown>;
  processedAt?: string;
  createdAt: string;
};

export type OrderInvoice = {
  id: ID;
  orderId: ID;
  invoiceNumber: string;
  status: InvoiceStatus;
  amountDue: Money;
  amountPaid: Money;
  amountRemaining: Money;
  taxAmount: Money;
  currency: string;
  issuedAt?: string;
  dueAt?: string;
  paidAt?: string;
  pdfUrl?: string;
  isProforma?: boolean;
  associatedCreditNoteIds?: ID[];
  notes?: string;
} & Timestamp;

export type OrderReturn = {
  id: ID;
  orderId: ID;
  number: string;
  status: ReturnStatus;
  type: "return" | "exchange" | "refund_only";
  reason: string;
  detailedReason?: string;
  customerComments?: string;
  staffNotes?: string;
  items: Array<{ orderLineItemId: ID; quantity: number; condition?: string; reason?: string }>;
  refundRequestedAmount?: Money;
  refundApprovedAmount?: Money;
  refundProcessedAmount?: Money;
  refundTransactionId?: ID;
  exchangeOrderId?: ID;
  labelUrl?: string;
  returnShippingCost?: Money;
  restockingFee?: Money;
  returnDeadlineAt?: string;
  requestedAt: string;
  approvedAt?: string;
  receivedAt?: string;
  processedAt?: string;
  closedAt?: string;
  trackingCode?: string;
  carrier?: string;
  photos?: string[];
} & Timestamp;

export type Order = {
  id: ID;
  number: string;
  kind: OrderKind;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  userId?: ID;
  user?: User;
  guestEmail?: string;
  guestPhone?: string;
  customerFirstName?: string;
  customerLastName?: string;
  customerCompany?: string;
  billingAddress: Address;
  shippingAddress: Address;
  sameBillingShipping: boolean;
  currency: string;
  locale?: string;
  channel: "web" | "mobile_app" | "marketplace" | "store" | "phone" | "concierge";
  sourceUtm?: Record<string, string | undefined>;
  items: OrderLineItem[];
  itemCount: number;
  itemTotalQuantity: number;
  subtotal: Money;
  subtotalWithoutDiscounts?: Money;
  productDiscounts: Money;
  couponDiscounts: Money;
  totalDiscounts: Money;
  loyaltyDiscounts?: Money;
  shipping: Money;
  shippingTax?: Money;
  taxes: Money;
  totalTaxes: Money;
  fees: Money;
  grandTotal: Money;
  totalPaid: Money;
  totalDue: Money;
  totalRefunded: Money;
  totalWeightGrams?: number;
  paymentMethod: PaymentMethod;
  paymentProcessor?: string;
  paymentIntentId?: string;
  authorizedAmount?: Money;
  capturedAmount?: Money;
  installmentsCount?: number;
  firstInstallmentAmount?: Money;
  leaseDurationMonths?: number;
  monthlyPayment?: Money;
  depositAmount?: Money;
  residualValue?: Money;
  effectiveApr?: number;
  creditApplicationId?: ID;
  creditApplicationStatus?: string;
  tradeInVehicleId?: ID;
  tradeInAmount?: Money;
  shippingMethod: ShippingMethod;
  shippingProvider?: string;
  shippingService?: string;
  trackingCode?: string;
  trackingUrl?: string;
  estimatedDeliveryAt?: string;
  placedAt?: string;
  confirmedAt?: string;
  paidAt?: string;
  processingAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  refundedAt?: string;
  expectedDeliveryDateStart?: string;
  expectedDeliveryDateEnd?: string;
  couponId?: ID;
  couponCode?: string;
  couponAmount?: Money;
  loyaltyPointsUsed?: number;
  loyaltyPointsEarned?: number;
  storeCreditUsed?: Money;
  storeCreditEarned?: Money;
  giftCardUsed?: Money;
  giftCardIds?: ID[];
  invoices?: OrderInvoice[];
  transactions?: OrderTransaction[];
  fulfillments?: Fulfillment[];
  returns?: OrderReturn[];
  customerNote?: string;
  internalNotes?: string;
  staffAssigneeId?: ID;
  tags?: string[];
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  referrerUrl?: string;
  landingUrl?: string;
  fraudRisk?: "low" | "medium" | "high";
  fraudFlags?: string[];
  holdReason?: string;
  holdUntil?: string;
  isPriority?: boolean;
  isGiftOrder?: boolean;
  giftMessage?: string;
  requestedDeliveryWindow?: string;
  signatureRequired?: boolean;
  orderAgreementSigned?: boolean;
  orderAgreementSignedAt?: string;
  orderAgreementSignedIp?: string;
  vehicleDeliveryContact?: { name?: string; phone?: string; email?: string };
  vehicleRegistrationOwner?: Partial<Address> & { company?: string; birthdate?: string };
  convertedFromCartId?: ID;
} & Timestamp;

export type OrderFilter = {
  q?: string;
  statuses?: OrderStatus[];
  paymentStatuses?: PaymentStatus[];
  fulfillmentStatuses?: FulfillmentStatus[];
  userId?: ID;
  channels?: Order["channel"][];
  startDate?: string;
  endDate?: string;
  minTotal?: number;
  maxTotal?: number;
  hasReturns?: boolean;
  paymentMethods?: PaymentMethod[];
  shippingMethods?: ShippingMethod[];
  tags?: string[];
  vehicleOrder?: boolean;
};
