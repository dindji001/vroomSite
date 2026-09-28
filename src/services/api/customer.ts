import { apiClient } from "./client";
import { apiConfig } from "@/config/api";
import type { ID, Money, PaginationParams, PaginatedResult } from "@/types";
import type { UserTier } from "@/types/user";
import type {
  Wallet,
  WalletTransaction,
  LoyaltyProgram,
  LoyaltyPointsLedger,
  Referral,
} from "@/types/customer";
import { siteConfig } from "@/config/site";

export const walletApi = {
  get: () => apiClient.get<Wallet>(apiConfig.endpoints.wallet.root),
  listTransactions: (query?: PaginationParams & { type?: string }) =>
    apiClient.get<PaginatedResult<WalletTransaction>>(
      apiConfig.endpoints.wallet.transactions,
      { query: query as Record<string, unknown> }
    ),
  getTransaction: (id: ID) =>
    apiClient.get<WalletTransaction>(
      apiConfig.endpoints.wallet.transactionById.replace(":id", id)
    ),
  createTopUpIntent: (payload: {
    amount: Money;
    paymentMethodId?: ID;
    returnUrl?: string;
    provider?: "stripe" | "mango_pay" | "adyen";
  }) =>
    apiClient.post<{
      clientSecret: string;
      paymentIntentId: ID;
      walletId: ID;
      amount: Money;
      provider: string;
      publishableKey?: string;
      ephemeralKey?: string;
    }>(apiConfig.endpoints.wallet.topUpIntent, payload),
  confirmTopUp: (payload: {
    paymentIntentId: ID;
    transactionId?: ID;
    metadata?: Record<string, unknown>;
  }) =>
    apiClient.post<{
      transaction: WalletTransaction;
      newBalance: Money;
      success: boolean;
    }>(apiConfig.endpoints.wallet.topUp, payload),
  withdraw: (payload: {
    amount: Money;
    bankAccountId?: ID;
    iban?: string;
    bic?: string;
    holderName?: string;
  }) =>
    apiClient.post<{
      transaction: WalletTransaction;
      estimatedProcessingDays: number;
      reference: string;
    }>(apiConfig.endpoints.wallet.withdraw, payload),
  transfer: (payload: {
    recipientEmail?: string;
    recipientPhone?: string;
    recipientUserId?: ID;
    amount: Money;
    note?: string;
  }) =>
    apiClient.post<{
      transaction: WalletTransaction;
      recipientNotified: boolean;
      recipientId?: ID;
    }>(apiConfig.endpoints.wallet.transfer, payload),
  getStatement: (query?: { startDate?: string; endDate?: string; format?: "pdf" | "csv" }) =>
    apiClient.get<{ url: string; type: string; expiresAt: string }>(
      apiConfig.endpoints.wallet.statement,
      { query: query as Record<string, unknown> }
    ),
  getAutoTopUp: () =>
    apiClient.get<{
      enabled: boolean;
      triggerAmount?: Money;
      topUpAmount?: Money;
      paymentMethodId?: ID;
    }>(apiConfig.endpoints.wallet.autoTopUp),
  toggleAutoTopUp: (
    enabled: boolean,
    config?: { triggerAmount?: Money; topUpAmount?: Money; paymentMethodId?: ID }
  ) =>
    apiClient.post(apiConfig.endpoints.wallet.autoTopUp, { enabled, ...config }),
};

export const loyaltyApi = {
  getProgram: () =>
    apiClient.get<LoyaltyProgram>(apiConfig.endpoints.loyalty.program),
  getLedger: (query?: PaginationParams & { type?: string }) =>
    apiClient.get<PaginatedResult<LoyaltyPointsLedger>>(
      apiConfig.endpoints.loyalty.ledger,
      { query: query as Record<string, unknown> }
    ),
  getTiers: () =>
    apiClient.get<
      Array<
        UserTier & {
          progress: {
            currentPoints: number;
            pointsToNextTier: number;
            percentToNextTier: number;
            isCurrentTier: boolean;
          } | null;
        }
      >
    >(apiConfig.endpoints.loyalty.tiers),
  getCurrentTier: () =>
    apiClient.get<{
      tier: UserTier;
      pointsBalance: number;
      pointsExpiringSoon?: { count: number; date: string };
      pointsToNextTier: number;
      percentToNextTier: number;
      lifetimePointsEarned: number;
    }>(apiConfig.endpoints.loyalty.currentTier),
  earn: (payload: {
    action: string;
    orderId?: ID;
    productId?: ID;
    metadata?: Record<string, unknown>;
  }) =>
    apiClient.post<{
      earned: number;
      ledgerEntryId: ID;
      newBalance: number;
    }>(apiConfig.endpoints.loyalty.earn, payload),
  redeem: (payload: {
    type: "discount" | "wallet_credit" | "voucher" | "product";
    points: number;
    discountPercent?: number;
    discountAmount?: Money;
    productId?: ID;
    voucherCode?: string;
  }) =>
    apiClient.post<{
      redeemed: number;
      newBalance: number;
      ledgerEntryId: ID;
      reward: {
        type: string;
        value: Money;
        discountPercent?: number;
        couponCode?: string;
        couponId?: ID;
      };
    }>(apiConfig.endpoints.loyalty.redeem, payload),
  exchangeToWallet: (points: number) =>
    apiClient.post<{
      pointsConverted: number;
      walletCredit: Money;
      newPointsBalance: number;
      walletTransactionId: ID;
    }>(apiConfig.endpoints.loyalty.exchange, { points, target: "wallet" }),
  listVouchers: () =>
    apiClient.get<
      Array<{
        id: ID;
        code: string;
        name?: string;
        type: "percent" | "fixed" | "free_shipping" | "gift";
        discountPercent?: number;
        discountAmount?: Money;
        minOrderAmount?: Money;
        appliesTo: string;
        validFrom?: string;
        validUntil?: string;
        redeemedAt?: string;
        source: "loyalty" | "promo" | "referral" | "gift";
        used: boolean;
      }>
    >(apiConfig.endpoints.loyalty.vouchers),
};

export const referralsApi = {
  getMyCode: () =>
    apiClient.get<{
      code: string;
      shareLink: string;
      shareableUrls: {
        facebook?: string;
        twitter?: string;
        whatsapp?: string;
        email?: string;
        sms?: string;
        copyText: string;
      };
      bannerImageUrl?: string;
      qrCodeUrl?: string;
      rewardReferrer: Money | { type: string; value: string };
      rewardReferee: Money | { type: string; value: string };
      programDescription: string;
      programTermsUrl: string;
    }>(apiConfig.endpoints.referrals.myCode),
  send: (payload: {
    recipients: Array<{ email?: string; phone?: string; name?: string }>;
    message?: string;
    channel: "email" | "sms" | "both";
  }) =>
    apiClient.post<{
      sentCount: number;
      failedRecipients?: Array<{ recipient: string; reason: string }>;
      referralIds: ID[];
    }>(apiConfig.endpoints.referrals.send, payload),
  listMyReferrals: (query?: PaginationParams & { status?: Referral["status"] }) =>
    apiClient.get<PaginatedResult<Referral>>(
      apiConfig.endpoints.referrals.root,
      { query: query as Record<string, unknown> }
    ),
  getStats: () =>
    apiClient.get<{
      totalInvitesSent: number;
      totalInvitesViewed: number;
      totalSignups: number;
      totalFirstOrders: number;
      totalRewardsEarned: Money;
      rewardsClaimed: number;
      rewardsPending: number;
      topPerformersPercentile: number;
      conversionRate: number;
      referralsChart: Array<{ period: string; signups: number; firstOrders: number; rewards: number }>;
    }>(apiConfig.endpoints.referrals.referralStats),
  validateCode: (code: string) =>
    apiClient.post<{
      valid: boolean;
      referrerName?: string;
      refereeReward: { type: "discount" | "wallet_credit" | "gift"; value: string };
      terms: string;
    }>(`${apiConfig.endpoints.referrals.root}/validate`, { code }),
  applyCode: (code: string) =>
    apiClient.post<{
      success: boolean;
      creditApplied?: Money;
      couponApplied?: { code: string; name?: string; expiresAt: string };
      appliedType: "credit" | "coupon";
    }>(`${apiConfig.endpoints.referrals.root}/apply`, { code }),
};

export const supportApi = {
  listTickets: (query?: PaginationParams & { status?: string; categoryId?: ID }) =>
    apiClient.get<PaginatedResult<any>>(apiConfig.endpoints.support.tickets, {
      query: query as Record<string, unknown>,
    }),
  createTicket: (payload: {
    subject: string;
    categoryId: ID;
    priority: "low" | "normal" | "high" | "urgent";
    orderId?: ID;
    vehicleId?: ID;
    message: string;
    attachments?: File[];
  }) =>
    apiClient.post<{ id: ID; number: string; createdAt: string }>(
      apiConfig.endpoints.support.tickets,
      payload
    ),
  getTicket: (id: ID) =>
    apiClient.get<any>(apiConfig.endpoints.support.ticketById.replace(":id", id)),
  sendMessage: (ticketId: ID, payload: { message: string; attachments?: File[]; asStaff?: boolean }) =>
    apiClient.post<any>(
      apiConfig.endpoints.support.ticketMessages.replace(":id", ticketId),
      payload
    ),
  closeTicket: (id: ID, resolution?: string) =>
    apiClient.post<any>(apiConfig.endpoints.support.closeTicket.replace(":id", id), {
      resolution,
    }),
  listCategories: () =>
    apiClient.get<
      Array<{
        id: ID;
        name: string;
        slug: string;
        description?: string;
        icon?: string;
        openTicketsAverage?: number;
        responseTimeMinutes?: number;
      }>
    >(apiConfig.endpoints.support.categories),
  listFaq: (query?: { categoryId?: ID; search?: string }) =>
    apiClient.get<
      Array<{
        id: ID;
        categoryId?: ID;
        question: string;
        answer: string;
        order: number;
        helpfulCount: number;
      }>
    >(apiConfig.endpoints.support.faq, { query }),
  listArticles: (query?: { categoryId?: ID; search?: string; tag?: string }) =>
    apiClient.get<PaginatedResult<any>>(apiConfig.endpoints.support.articles, {
      query: query as Record<string, unknown>,
    }),
  getArticle: (id: ID) =>
    apiClient.get<any>(apiConfig.endpoints.support.articleById.replace(":id", id)),
  initChat: (payload?: { visitorName?: string; visitorEmail?: string; departmentId?: ID }) =>
    apiClient.post<{
      sessionId: ID;
      token: string;
      websocketUrl?: string;
      welcomeMessage: string;
      department: string;
      agentAvailable: boolean;
      averageWaitTimeSeconds?: number;
    }>(apiConfig.endpoints.support.chatInit, payload),
  getHours: () =>
    apiClient.get<{
      phoneSupport: {
        days: Array<{ day: string; from: string; to: string; closed?: boolean }>;
        timezone: string;
        phoneNumbers: Array<{ label: string; number: string; tollFree?: boolean }>;
      };
      chatSupport: {
        available24x7: boolean;
        days: Array<{ day: string; from: string; to: string; closed?: boolean }>;
        timezone: string;
      };
      currentStatus: {
        phoneOpen: boolean;
        chatOpen: boolean;
        nextOpeningAt?: string;
      };
    }>(`${apiConfig.endpoints.support.tickets}/hours`),
};

export const appointmentsApi = {
  listSlots: (query: {
    locationId?: ID;
    type: "test_drive" | "trade_in" | "pickup" | "service" | "consultation";
    date?: string;
    startDate?: string;
    endDate?: string;
    vehicleId?: ID;
    durationMinutes?: number;
  }) =>
    apiClient.get<{
      days: Array<{
        date: string;
        hasSlots: boolean;
        slots: Array<{
          id: string;
          startAt: string;
          endAt: string;
          available: boolean;
          durationMinutes: number;
          calendarEventId?: ID;
        }>;
      }>;
      timezone: string;
      location?: { name: string; address: string; mapUrl?: string; phone?: string };
      minAdvanceDays?: number;
      maxAdvanceDays?: number;
      bufferMinutes?: number;
    }>(apiConfig.endpoints.appointments.slots, {
      query: query as Record<string, unknown>,
    }),
  listMyAppointments: (query?: PaginationParams & { status?: string }) =>
    apiClient.get<PaginatedResult<any>>(apiConfig.endpoints.appointments.myAppointments, {
      query: query as Record<string, unknown>,
    }),
  create: (payload: {
    slotId: string;
    date: string;
    startAt: string;
    endAt?: string;
    type: "test_drive" | "trade_in" | "pickup" | "service" | "consultation";
    locationId?: ID;
    addressId?: ID;
    homeServiceAddress?: any;
    vehicleId?: ID;
    tradeInVehicleData?: any;
    name?: string;
    email?: string;
    phone?: string;
    comments?: string;
    services?: Array<{ id: ID; name: string; price: Money; durationMinutes: number }>;
  }) =>
    apiClient.post<{
      appointmentId: ID;
      number: string;
      status: "scheduled" | "pending" | "confirmed";
      googleCalendarEventUrl?: string;
      icsFileUrl?: string;
      confirmationExpiresAt?: string;
    }>(apiConfig.endpoints.appointments.root, payload),
  get: (id: ID) =>
    apiClient.get<any>(apiConfig.endpoints.appointments.byId.replace(":id", id)),
  reschedule: (id: ID, payload: { slotId?: string; startAt?: string }) =>
    apiClient.post<{
      appointmentId: ID;
      status: string;
      previousDate?: string;
      newDate: string;
    }>(apiConfig.endpoints.appointments.reschedule.replace(":id", id), payload),
  cancel: (id: ID, reason?: string) =>
    apiClient.post<{ success: boolean; refundAmount?: Money; refundedAt?: string }>(
      apiConfig.endpoints.appointments.cancel.replace(":id", id),
      { reason }
    ),
  checkIn: (id: ID) =>
    apiClient.post<{ checkedInAt: string }>(
      `${apiConfig.endpoints.appointments.byId.replace(":id", id)}/check-in`
    ),
  getServices: (locationId?: ID) =>
    apiClient.get<
      Array<{
        id: ID;
        type: string;
        name: string;
        description?: string;
        durationMinutes: number;
        price: Money;
        availableAtHome: boolean;
        requiresVehicle: boolean;
        icon?: string;
      }>
    >(`${apiConfig.endpoints.appointments.slots}/services`, {
      query: locationId ? { locationId } : undefined,
    }),
  getLocations: (query?: { countryCode?: string; postalCode?: string; type?: string }) =>
    apiClient.get<
      Array<{
        id: ID;
        code?: string;
        name: string;
        type: "showroom" | "service_center" | "pickup_point" | "partner";
        address: any;
        phone?: string;
        email?: string;
        website?: string;
        openingHours?: any;
        geolocation?: { lat: number; lng: number };
        distanceKm?: number;
      }>
    >(`${apiConfig.endpoints.appointments.slots}/locations`, {
      query: query as Record<string, unknown>,
    }),
};

export const staticApi = {
  getPage: (slug: string) =>
    apiClient.get<{
      id: ID;
      slug: string;
      title: string;
      contentHtml?: string;
      seoTitle?: string;
      seoDescription?: string;
      blocks?: any[];
      breadcrumbs?: { label: string; href?: string }[];
      publishedAt?: string;
    }>(apiConfig.endpoints.static.pages.replace(":slug", slug)),
  getMenu: (location: "header" | "footer" | "mobile" | "sidebar") =>
    apiClient.get<{
      id: ID;
      location: string;
      name: string;
      items: Array<{
        id: ID;
        label: string;
        href?: string;
        target?: string;
        icon?: string;
        badge?: { label: string; variant: string };
        isFeatured?: boolean;
        children?: any[];
      }>;
    }>(apiConfig.endpoints.static.menu.replace(":location", location)),
  getBanners: (zone: "home_hero" | "home_promo" | "cart_promo" | "checkout_promo" | "blog") =>
    apiClient.get<
      Array<{
        id: ID;
        zone: string;
        title?: string;
        subtitle?: string;
        ctaLabel?: string;
        ctaUrl?: string;
        imageUrl?: string;
        desktopImageUrl?: string;
        mobileImageUrl?: string;
        backgroundColor?: string;
        textColor?: string;
        startAt?: string;
        endAt?: string;
        priority: number;
      }>
    >(apiConfig.endpoints.static.banners.replace(":zone", zone)),
  getFooter: () =>
    apiClient.get<{
      id: ID;
      columns: Array<{
        title: string;
        links: Array<{ label: string; href?: string; target?: string; external?: boolean }>;
      }>;
      paymentMethods: Array<{ name: string; iconUrl: string; }>;
      securityBadges: Array<{ name: string; iconUrl: string }>;
      socials: Array<{ platform: string; url: string; iconUrl?: string }>;
      copyright: string;
      legalLinks: Array<{ label: string; href: string }>;
    }>(apiConfig.endpoints.static.footer),
};

export const searchApi = {
  global: (q: string, opts?: { scope?: "all" | "vehicles" | "products" | "blog" | "pages"; limit?: number }) =>
    apiClient.get<{
      vehicles?: any[];
      products?: any[];
      posts?: any[];
      pages?: any[];
      categories?: any[];
      brands?: any[];
      suggests?: Array<{ label: string; href?: string; image?: string; subtitle?: string }>;
      totalResults: number;
      corrections?: { original: string; corrected: string }[];
    }>(apiConfig.endpoints.search.global, {
      query: { q, ...(opts ?? {}) },
    }),
  autocomplete: (q: string, limit = 8) =>
    apiClient.get<{
      suggestions: Array<{
        type: "query" | "vehicle" | "product" | "make" | "category" | "brand";
        label: string;
        href?: string;
        imageUrl?: string;
        subtitle?: string;
        metadata?: Record<string, string>;
      }>;
      popular: Array<{ label: string; href?: string; trend?: "up" | "down"; delta?: number }>;
      recent: Array<{ label: string; href?: string; searchedAt: string }>;
    }>(apiConfig.endpoints.search.autocomplete, { query: { q, limit } }),
  suggestions: (q: string) =>
    apiClient.get<{ suggestions: Array<{ label: string; isCorrection?: boolean }> }>(
      apiConfig.endpoints.search.suggestions,
      { query: { q } }
    ),
  trending: (limit = 10) =>
    apiClient.get<{ queries: Array<{ label: string; href?: string; trend: "up" | "down"; delta: number; rank: number }> }>(
      apiConfig.endpoints.search.trending,
      { query: { limit } }
    ),
  recent: (limit = 10) =>
    apiClient.get<{ queries: Array<{ label: string; href?: string; searchedAt: string }> }>(
      apiConfig.endpoints.search.recent,
      { query: { limit } }
    ),
};

export const regionsApi = {
  listCountries: (query?: { active?: boolean; shippingZoneId?: ID; search?: string }) =>
    apiClient.get<
      Array<{
        code: string;
        name: string;
        nativeName?: string;
        flagEmoji?: string;
        currencyCode: string;
        currencySymbol?: string;
        languageCodes: string[];
        phonePrefix?: string;
        hasTaxId?: boolean;
        vatRates?: { standard: number; reduced?: number[] };
        shippingAvailable: boolean;
        shippingZones?: ID[];
        regions?: Array<{ code: string; name: string; taxRate?: number }>;
      }>
    >(apiConfig.endpoints.regions.countries, { query }),
  listCities: (query: { countryCode?: string; postalCode?: string; search?: string; limit?: number }) =>
    apiClient.get<
      Array<{
        id: ID;
        name: string;
        countryCode: string;
        regionCode?: string;
        latitude?: number;
        longitude?: number;
        postalCodes?: string[];
        population?: number;
      }>
    >(apiConfig.endpoints.regions.cities, { query }),
  lookupZipcode: (code: string, countryCode?: string) =>
    apiClient.get<{
      code: string;
      countryCode: string;
      regionName?: string;
      regionCode?: string;
      cities: Array<{
        name: string;
        latitude?: number;
        longitude?: number;
      }>;
    }>(apiConfig.endpoints.regions.zipcodes.replace(":code", code), {
      query: countryCode ? { countryCode } : undefined,
    }),
  getShippingZones: (query?: { countryCode?: string; currency?: string }) =>
    apiClient.get<
      Array<{
        id: ID;
        name: string;
        countries: Array<{ code: string; name: string }>;
        postalCodeExceptions?: string[];
        methods: Array<{
          code: string;
          name: string;
          cost: Money;
          freeFrom?: Money;
          deliveryDays: { min: number; max: number };
        }>;
        taxRate?: number;
      }>
    >(apiConfig.endpoints.regions.shippingZones, { query }),
};

type UploadFolder =
  | "users/avatars"
  | "vehicles/images"
  | "products/images"
  | "support/attachments"
  | "documents"
  | "reviews/media"
  | "blog/images"
  | "temp";

export const uploadsApi = {
  createPresigned: (payload: {
    fileName: string;
    contentType: string;
    sizeBytes: number;
    folder: UploadFolder;
    use?: string;
    access?: "public" | "private";
    expiresSeconds?: number;
    convertToWebp?: boolean;
  }) =>
    apiClient.post<{
      key: string;
      uploadUrl: string;
      method: "PUT" | "POST";
      fields?: Record<string, string>;
      headers?: Record<string, string>;
      expiresAt: string;
      publicUrl?: string;
      cdnUrl?: string;
    }>(apiConfig.endpoints.uploads.presigned, payload),
  createPresignedBulk: (files: Array<{ fileName: string; contentType: string; sizeBytes: number; folder: string }>) =>
    apiClient.post<{ items: Array<{
      fileName: string;
      key: string;
      uploadUrl: string;
      fields?: Record<string, string>;
      publicUrl?: string;
    }> }>(apiConfig.endpoints.uploads.presignedBulk, { files }),
  confirm: (key: string, metadata?: Record<string, unknown>) =>
    apiClient.post<{
      key: string;
      url: string;
      cdnUrl: string;
      size: number;
      etag?: string;
      storedContentType?: string;
      variants?: Array<{ key: string; url: string; width: number; height: number }>;
    }>(apiConfig.endpoints.uploads.confirm.replace(":key", key), metadata),
  remove: (key: string) =>
    apiClient.delete(apiConfig.endpoints.uploads.remove.replace(":key", key)),
  async uploadFile(file: File, folder: UploadFolder) {
    const { uploadUrl, method, fields, key } = await this.createPresigned({
      fileName: file.name,
      contentType: file.type || "application/octet-stream",
      sizeBytes: file.size,
      folder,
    });
    const formData = new FormData();
    if (fields) {
      Object.entries(fields).forEach(([k, v]) => formData.append(k, v));
    }
    formData.append("file", file);
    await fetch(uploadUrl, {
      method: method || "PUT",
      body: method === "PUT" ? file : formData,
    });
    const result = await this.confirm(key, { originalName: file.name });
    return result;
  },
};

export const analyticsApi = {
  trackEvent: (name: string, properties: Record<string, unknown>, options?: { user_id?: ID; anonymous_id?: string; timestamp?: string }) =>
    apiClient.post<{ received: boolean; eventId: string }>(
      apiConfig.endpoints.analytics.event,
      {
        name,
        properties,
        ...(options ?? {}),
      }
    ),
  trackPageView: (payload: {
    path: string;
    title?: string;
    referrer?: string;
    search?: string;
    hash?: string;
    durationSeconds?: number;
    scrollPercent?: number;
    utm?: Record<string, string | undefined>;
    userAgent?: string;
    screen?: { width: number; height: number };
    viewport?: { width: number; height: number };
    language?: string;
    timezone?: string;
  }) =>
    apiClient.post<{ received: boolean; viewId: string }>(
      apiConfig.endpoints.analytics.pageView,
      payload
    ),
};

export const healthApi = {
  root: () =>
    apiClient.get<{
      status: "ok" | "degraded" | "critical";
      version: string;
      environment: string;
      timestamp: string;
      uptimeSeconds: number;
      services: { [name: string]: { status: string; responseTimeMs: number } };
    }>(apiConfig.endpoints.health.root),
  db: () => apiClient.get<{ status: string }>(apiConfig.endpoints.health.db),
  redis: () => apiClient.get<{ status: string }>(apiConfig.endpoints.health.redis),
  services: () =>
    apiClient.get<{
      services: Array<{
        name: string;
        status: string;
        responseTimeMs: number;
        lastIncidentAt?: string;
      }>;
      incidents: Array<{ id: ID; title: string; severity: string; startedAt: string; resolvedAt?: string; affectedServices: string[] }>;
      maintenancePlanned?: { title: string; startAt: string; endAt: string; services: string[] } | null;
    }>(apiConfig.endpoints.health.services),
};
