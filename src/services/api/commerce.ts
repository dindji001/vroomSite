import { apiClient } from "./client";
import { apiConfig } from "@/config/api";
import type { ID, Money, PaginationParams, PaginatedResult, Address } from "@/types";
import type {
  Cart,
  CartLineItem,
  Order,
  OrderFilter,
  PaymentMethod,
  ShippingMethod,
  Coupon,
  OrderReturn,
  OrderLineItem,
} from "@/types/order";
import type { Wishlist, WishlistItem } from "@/types/customer";

export const cartApi = {
  get: () => apiClient.get<Cart>(apiConfig.endpoints.cart.root),
  sync: (cart: Partial<Cart>) =>
    apiClient.put<Cart>(apiConfig.endpoints.cart.root, cart),
  addItem: (item: Partial<CartLineItem>, cart?: Partial<Cart>) =>
    apiClient.post<Cart>(apiConfig.endpoints.cart.items, { item, cart }),
  updateItem: (itemId: string, quantity: number, cart?: Partial<Cart>) =>
    apiClient.patch<Cart>(apiConfig.endpoints.cart.updateItem.replace(":id", itemId), {
      quantity,
      cart,
    }),
  removeItem: (itemId: string) =>
    apiClient.delete<Cart>(
      apiConfig.endpoints.cart.updateItem.replace(":id", itemId)
    ),
  clear: () => apiClient.post<Cart>(apiConfig.endpoints.cart.clear),
  applyCoupon: (code: string) =>
    apiClient.post<Cart>(apiConfig.endpoints.cart.applyCoupon, { code }),
  removeCoupon: () =>
    apiClient.delete<Cart>(apiConfig.endpoints.cart.removeCoupon),
  getShippingQuote: (payload: {
    items: CartLineItem[];
    shippingAddress?: Partial<Address>;
    billingAddress?: Partial<Address>;
    countryCode?: string;
    postalCode?: string;
    city?: string;
    itemsWeightGrams?: number;
  }) =>
    apiClient.post<{
      options: Array<{
        id: ID;
        name: string;
        code: ShippingMethod;
        description?: string;
        estimatedDeliveryDays: { min: number; max: number };
        cost: Money;
        freeFrom?: Money;
        trackingAvailable: boolean;
        signatureRequired?: boolean;
        carrier?: string;
      }>;
      freeShippingThreshold?: Money;
      distanceKm?: number;
    }>(apiConfig.endpoints.cart.shippingQuote, payload),
  estimate: (payload: {
    items: CartLineItem[];
    countryCode?: string;
    postalCode?: string;
    couponCodes?: string[];
    taxId?: string;
    isCompany?: boolean;
  }) =>
    apiClient.post<{
      subtotal: Money;
      productDiscounts: Money;
      couponDiscounts: Money;
      totalDiscounts: Money;
      shippingEstimate: Money;
      shippingTax?: Money;
      taxes: Money;
      grandTotal: Money;
      couponSavings?: Money;
      vatAmount?: Money;
      applicableCoupons?: Array<{ code: string; name?: string; discount: Money }>;
      warnings?: string[];
    }>(apiConfig.endpoints.cart.estimate, payload),
  merge: (payload: { localCartId?: string; remoteCartId?: string }) =>
    apiClient.post<Cart>(apiConfig.endpoints.cart.merge, payload),
  convert: (payload?: { returnUrl?: string; cancelUrl?: string }) =>
    apiClient.post<{ orderId: ID; checkoutId?: ID; redirectUrl?: string }>(
      apiConfig.endpoints.cart.convert,
      payload
    ),
};

export const checkoutApi = {
  initialize: (payload?: {
    cartId?: ID;
    returnUrl?: string;
    cancelUrl?: string;
    provider?: string;
  }) =>
    apiClient.post<{
      checkoutId: ID;
      orderId?: ID;
      expiresAt: string;
      requiresAuth: boolean;
      requiresShipping: boolean;
      supportedPaymentMethods: PaymentMethod[];
    }>(apiConfig.endpoints.checkout.initialize, payload),
  prepare: (checkoutId: ID, payload: Partial<Order>) =>
    apiClient.post<{
      checkoutId: ID;
      prepared: true;
      summary: Order;
      requiresAction: boolean;
      actionType?: "3ds" | "redirect" | "authentication";
      nextStep:
        | "review"
        | "payment"
        | "confirm"
        | "shipping_address"
        | "billing_address"
        | "payment_method";
    }>(apiConfig.endpoints.checkout.prepare, { checkoutId, ...payload }),
  process: (checkoutId: ID, payload: { paymentIntentId?: string }) =>
    apiClient.post<{
      orderId: ID;
      status: Order["status"];
      paymentStatus: Order["paymentStatus"];
      redirectUrl?: string;
      confirmationUrl?: string;
      clientSecret?: string;
    }>(apiConfig.endpoints.checkout.process, { checkoutId, ...payload }),
  confirm: (checkoutId: ID, payload?: { token?: string }) =>
    apiClient.post<{
      orderId: ID;
      success: boolean;
      order: Order;
      invoiceAvailable: boolean;
      downloadLink?: string;
      estimatedDeliveryDate?: string;
    }>(apiConfig.endpoints.checkout.confirm.replace(":id", checkoutId), payload),
  cancel: (checkoutId: ID, reason?: string) =>
    apiClient.post(apiConfig.endpoints.checkout.cancel.replace(":id", checkoutId), {
      reason,
    }),
  listPaymentMethods: (query?: { orderTotal?: Money }) =>
    apiClient.get<{
      methods: Array<{
        id: string;
        code: PaymentMethod;
        name: string;
        description?: string;
        iconUrl?: string;
        enabled: boolean;
        minAmount?: Money;
        maxAmount?: Money;
        installmentOptions?: number[];
        feeFixed?: Money;
        feePercent?: number;
      }>;
    }>(apiConfig.endpoints.checkout.paymentMethods, {
      query: query ? (query as unknown as Record<string, unknown>) : undefined,
    }),
  listShippingMethods: (query?: {
    addressId?: ID;
    countryCode?: string;
    postalCode?: string;
    itemsWeightGrams?: number;
    orderSubtotal?: Money;
  }) =>
    apiClient.get<{
      methods: Array<{
        id: ID;
        code: ShippingMethod;
        name: string;
        description?: string;
        carrier?: string;
        deliveryMinDays: number;
        deliveryMaxDays: number;
        cost: Money;
        freeFrom?: Money;
        trackingAvailable: boolean;
        signatureRequired?: boolean;
        pickupLocation?: { name: string; address: Address; distanceKm?: number };
      }>;
    }>(apiConfig.endpoints.checkout.shippingMethods, {
      query: query ? (query as unknown as Record<string, unknown>) : undefined,
    }),
  createPaymentIntent: (payload: {
    orderId?: ID;
    checkoutId?: ID;
    amount?: Money;
    paymentMethod?: PaymentMethod;
    saveCard?: boolean;
    setupFutureUsage?: boolean;
  }) =>
    apiClient.post<{
      clientSecret: string;
      paymentIntentId: string;
      requiresAction: boolean;
      ephemeralKey?: string;
      customerId?: string;
      publishableKey?: string;
    }>(apiConfig.endpoints.checkout.paymentIntent, payload),
  capture: (checkoutId: ID, amount?: Money) =>
    apiClient.post<{ captured: Money; transactionId: ID }>(
      apiConfig.endpoints.checkout.capture.replace(":id", checkoutId),
      { amount }
    ),
};

export const ordersApi = {
  list: (query?: OrderFilter & PaginationParams) =>
    apiClient.get<PaginatedResult<Order>>(apiConfig.endpoints.orders.root, {
      query: query as unknown as Record<string, unknown>,
    }),
  my: (query?: PaginationParams & { statuses?: Order["status"][] }) =>
    apiClient.get<PaginatedResult<Order>>(apiConfig.endpoints.orders.userOrders, {
      query: query as Record<string, unknown>,
    }),
  get: (id: ID) =>
    apiClient.get<Order>(apiConfig.endpoints.orders.byId.replace(":id", id)),
  getByNumber: (number: string) =>
    apiClient.get<Order>(
      apiConfig.endpoints.orders.byNumber.replace(":number", number)
    ),
  track: (id: ID) =>
    apiClient.get<{
      status: Order["fulfillmentStatus"];
      timeline: Array<{
        status: string;
        timestamp: string;
        description: string;
        location?: string;
        by?: string;
      }>;
      trackingCode?: string;
      trackingUrl?: string;
      carrier?: string;
      estimatedDeliveryAt?: string;
      deliveredAt?: string;
      shipmentId?: ID;
      lastUpdate?: string;
    }>(apiConfig.endpoints.orders.track.replace(":id", id)),
  getInvoice: (id: ID) =>
    apiClient.get<{ url: string; expiresAt: string; number: string; issuedAt: string }>(
      apiConfig.endpoints.orders.invoice.replace(":id", id)
    ),
  downloadInvoice: (id: ID) =>
    `${apiConfig.baseUrl}${apiConfig.endpoints.orders.downloadInvoice.replace(":id", id)}`,
  cancel: (id: ID, reason?: string) =>
    apiClient.post<{ success: boolean; refundAmount?: Money; refundedAt?: string }>(
      apiConfig.endpoints.orders.cancel.replace(":id", id),
      { reason }
    ),
  requestReturn: (
    id: ID,
    payload: {
      type: OrderReturn["type"];
      reason: string;
      detailedReason?: string;
      customerComments?: string;
      items: Array<{ orderLineItemId: ID; quantity: number }>;
      photos?: string[];
    }
  ) =>
    apiClient.post<{ returnRequestId: ID; number: string; status: OrderReturn["status"] }>(
      apiConfig.endpoints.orders.requestReturn.replace(":id", id),
      payload
    ),
  listReturns: (id: ID) =>
    apiClient.get<OrderReturn[]>(
      apiConfig.endpoints.orders.returns.replace(":id", id)
    ),
  getReturn: (returnId: ID) =>
    apiClient.get<OrderReturn>(
      apiConfig.endpoints.orders.returnById.replace(":id", returnId)
    ),
  reorder: (id: ID) =>
    apiClient.post<{ cartId: ID; addedItems: OrderLineItem[] }>(
      apiConfig.endpoints.orders.reorder.replace(":id", id)
    ),
  requestReview: (id: ID, payload?: { sendByEmail?: boolean }) =>
    apiClient.post<{ success: boolean; availableItems: OrderLineItem[] }>(
      apiConfig.endpoints.orders.review.replace(":id", id),
      payload
    ),
  listDocuments: (id: ID) =>
    apiClient.get<
      Array<{
        id: ID;
        type: "invoice" | "receipt" | "contract" | "certificate" | "warranty" | "delivery_note";
        name: string;
        url: string;
        createdAt: string;
        size?: number;
      }>
    >(apiConfig.endpoints.orders.documents.replace(":id", id)),
};

export const couponsApi = {
  validate: (code: string, payload?: { cartSubtotal?: Money; itemsCount?: number }) =>
    apiClient.post<{
      coupon: Coupon;
      discount: Money;
      applicable: boolean;
      error?: string;
      warnings?: string[];
      freeShipping?: boolean;
      giftProductId?: ID;
    }>(apiConfig.endpoints.coupons.validate, { code, ...payload }),
  getByCode: (code: string) =>
    apiClient.get<Coupon>(apiConfig.endpoints.coupons.byCode.replace(":code", code)),
};

export const wishlistApi = {
  getAll: () => apiClient.get<Wishlist[]>(apiConfig.endpoints.wishlists.root),
  create: (data: Partial<Wishlist> & { name: string }) =>
    apiClient.post<Wishlist>(apiConfig.endpoints.wishlists.root, data),
  getDefault: () => apiClient.get<Wishlist>(apiConfig.endpoints.wishlists.default),
  get: (id: ID) =>
    apiClient.get<Wishlist>(apiConfig.endpoints.wishlists.byId.replace(":id", id)),
  update: (id: ID, patch: Partial<Pick<Wishlist, "name" | "description" | "isPublic" | "scope">>) =>
    apiClient.patch<Wishlist>(
      apiConfig.endpoints.wishlists.byId.replace(":id", id),
      patch
    ),
  remove: (id: ID) =>
    apiClient.delete(apiConfig.endpoints.wishlists.byId.replace(":id", id)),
  addItem: (id: ID, item: WishlistItem) =>
    apiClient.post<Wishlist>(
      apiConfig.endpoints.wishlists.items.replace(":id", id),
      item
    ),
  removeItem: (listId: ID, itemId: ID) =>
    apiClient.delete<Wishlist>(
      apiConfig.endpoints.wishlists.itemById
        .replace(":id", listId)
        .replace(":itemId", itemId)
    ),
  updateItem: (
    listId: ID,
    itemId: ID,
    patch: Partial<Pick<WishlistItem, "priority" | "addedNote" | "quantity">>
  ) =>
    apiClient.patch<Wishlist>(
      apiConfig.endpoints.wishlists.itemById
        .replace(":id", listId)
        .replace(":itemId", itemId),
      patch
    ),
  moveItem: (fromListId: ID, toListId: ID, itemId: ID) =>
    apiClient.post<Wishlist>(
      `${apiConfig.endpoints.wishlists.byId.replace(":id", fromListId)}/move/${itemId}`,
      { toListId }
    ),
  share: (id: ID, payload?: { emails?: string[]; note?: string }) =>
    apiClient.post<{
      shareableLink: string;
      wishlistId: ID;
      token: string;
      emailsSentCount: number;
    }>(apiConfig.endpoints.wishlists.share.replace(":id", id), payload),
  addToCart: (id: ID, payload?: { copyWishlistItems?: boolean }) =>
    apiClient.post<{ cartId: ID; addedCount: number; skipped: Array<{ id: ID; reason: string }> }>(
      apiConfig.endpoints.wishlists.addToCart.replace(":id", id),
      payload
    ),
};

export const savedSearchesApi = {
  list: (scope?: "vehicles" | "products") =>
    apiClient.get<Array<any>>(apiConfig.endpoints.savedSearches.root, {
      query: scope ? { scope } : undefined,
    }),
  create: (data: any) =>
    apiClient.post<any>(apiConfig.endpoints.savedSearches.root, data),
  remove: (id: ID) =>
    apiClient.delete(apiConfig.endpoints.savedSearches.byId.replace(":id", id)),
  toggleAlert: (id: ID, enabled: boolean) =>
    apiClient.patch<any>(
      apiConfig.endpoints.savedSearches.toggleAlert.replace(":id", id),
      { enabled }
    ),
  setFrequency: (
    id: ID,
    frequency: "instant" | "daily" | "weekly"
  ) =>
    apiClient.patch<any>(
      apiConfig.endpoints.savedSearches.toggleFrequency.replace(":id", id),
      { frequency }
    ),
};

export const notificationsApi = {
  list: (query?: PaginationParams & { kind?: string; read?: boolean }) =>
    apiClient.get<PaginatedResult<any>>(apiConfig.endpoints.notifications.root, {
      query: query as Record<string, unknown>,
    }),
  getUnreadCount: () =>
    apiClient.get<{ count: number; highPriorityCount: number }>(
      apiConfig.endpoints.notifications.unread
    ),
  markRead: (id: ID) =>
    apiClient.post(apiConfig.endpoints.notifications.markRead.replace(":id", id)),
  markAllRead: () => apiClient.post(apiConfig.endpoints.notifications.markAllRead),
  getPreferences: () =>
    apiClient.get<any>(apiConfig.endpoints.notifications.preferences),
  updatePreferences: (prefs: any) =>
    apiClient.patch<any>(apiConfig.endpoints.notifications.preferences, prefs),
};

export {
  cartApi as cart,
  checkoutApi as checkout,
  ordersApi as orders,
  couponsApi as coupons,
  wishlistApi as wishlist,
  savedSearchesApi as savedSearches,
  notificationsApi as notifications,
};
