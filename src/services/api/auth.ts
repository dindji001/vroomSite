import { apiClient } from "./client";
import { apiConfig } from "@/config/api";
import type { User, AuthTokens, LoginInput, RegisterInput, UserTier, UserActivity } from "@/types/user";
import type { ID, Address, PaymentCard } from "@/types";
import type {
  SavedSearch,
  Wallet,
  WalletTransaction,
  LoyaltyProgram,
  LoyaltyPointsLedger,
  Referral,
  Notification,
  NotificationPreferences,
  Wishlist,
  WishlistItem,
  Document,
} from "@/types/customer";

export const authApi = {
  login: (payload: LoginInput) =>
    apiClient.post<{ user: User; tokens: AuthTokens }>(apiConfig.endpoints.auth.login, payload, {
      authenticate: false,
    }),
  register: (payload: RegisterInput) =>
    apiClient.post<{ user: User; tokens?: AuthTokens; needsEmailVerification: boolean }>(
      apiConfig.endpoints.auth.register,
      payload,
      { authenticate: false }
    ),
  logout: () => apiClient.post(apiConfig.endpoints.auth.logout, undefined, { authenticate: true }),
  refresh: (refreshToken: string) =>
    apiClient.post<AuthTokens>(
      apiConfig.endpoints.auth.refresh,
      { refreshToken },
      { authenticate: false, skipAuthRefresh: true }
    ),
  me: () => apiClient.get<User>(apiConfig.endpoints.auth.me),
  forgotPassword: (email: string) =>
    apiClient.post(
      apiConfig.endpoints.auth.forgotPassword,
      { email },
      { authenticate: false }
    ),
  resetPassword: (token: string, password: string) =>
    apiClient.post(
      apiConfig.endpoints.auth.resetPassword,
      { token, password },
      { authenticate: false }
    ),
  changePassword: (currentPassword: string, newPassword: string) =>
    apiClient.post(apiConfig.endpoints.users.password, {
      currentPassword,
      newPassword,
    }),
  verifyEmail: (token: string) =>
    apiClient.post(
      apiConfig.endpoints.auth.verifyEmail,
      { token },
      { authenticate: false }
    ),
  resendVerification: () => apiClient.post(apiConfig.endpoints.auth.resendVerification),
  updateProfile: (data: Partial<User>) =>
    apiClient.patch<User>(apiConfig.endpoints.users.profile, data),
  updatePreferences: (prefs: User["preferences"]) =>
    apiClient.patch<User["preferences"]>(apiConfig.endpoints.users.preferences, prefs),
  uploadAvatar: (file: File) => {
    const fd = new FormData();
    fd.append("avatar", file);
    return apiClient.upload<User>(apiConfig.endpoints.users.avatar, fd);
  },
  updateEmail: (email: string, password: string) =>
    apiClient.post(apiConfig.endpoints.users.email, { email, password }),
  updatePhone: (phone: string) =>
    apiClient.post(apiConfig.endpoints.users.phone, { phone }),
  getTier: () => apiClient.get<UserTier>(apiConfig.endpoints.users.tier),
  getActivity: (query?: { page?: number; limit?: number; type?: string }) =>
    apiClient.get<{ data: UserActivity[]; total: number }>(
      apiConfig.endpoints.users.activity,
      { query }
    ),
  listAddresses: () => apiClient.get<Address[]>(apiConfig.endpoints.users.addresses),
  createAddress: (data: Omit<Address, "id">) =>
    apiClient.post<Address>(apiConfig.endpoints.users.addresses, data),
  updateAddress: (id: ID, data: Partial<Address>) =>
    apiClient.patch<Address>(apiConfig.endpoints.users.addressById.replace(":id", id), data),
  deleteAddress: (id: ID) =>
    apiClient.delete(apiConfig.endpoints.users.addressById.replace(":id", id)),
  listPaymentCards: () =>
    apiClient.get<PaymentCard[]>(apiConfig.endpoints.users.paymentCards),
  deletePaymentCard: (id: ID) =>
    apiClient.delete(
      apiConfig.endpoints.users.paymentCardById.replace(":id", id)
    ),
  setDefaultPaymentCard: (id: ID) =>
    apiClient.post(
      apiConfig.endpoints.users.paymentCardById.replace(":id", id) + "/default"
    ),
};

export const userApi = authApi;
