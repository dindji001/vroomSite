export * from "./client";
export * from "./auth";
export * from "./vehicles";
export * from "./products";
export * from "./commerce";
export * from "./customer";

import { authApi, userApi } from "./auth";
import { vehiclesApi } from "./vehicles";
import { productsApi } from "./products";
import {
  cartApi,
  checkoutApi,
  ordersApi,
  couponsApi,
  wishlistApi,
  savedSearchesApi,
  notificationsApi,
} from "./commerce";
import {
  walletApi,
  loyaltyApi,
  referralsApi,
  supportApi,
  appointmentsApi,
  staticApi,
  searchApi,
  regionsApi,
  uploadsApi,
  analyticsApi,
  healthApi,
} from "./customer";

export const api = {
  auth: authApi,
  user: userApi,
  vehicles: vehiclesApi,
  products: productsApi,
  cart: cartApi,
  checkout: checkoutApi,
  orders: ordersApi,
  coupons: couponsApi,
  wishlist: wishlistApi,
  savedSearches: savedSearchesApi,
  notifications: notificationsApi,
  wallet: walletApi,
  loyalty: loyaltyApi,
  referrals: referralsApi,
  support: supportApi,
  appointments: appointmentsApi,
  static: staticApi,
  search: searchApi,
  regions: regionsApi,
  uploads: uploadsApi,
  analytics: analyticsApi,
  health: healthApi,
};

export default api;
