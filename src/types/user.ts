import type { ID, Timestamp, ImageAsset, Money } from "@/types";

export type UserRole = "client" | "pro" | "admin" | "staff";
export type UserStatus = "active" | "inactive" | "suspended" | "pending";
export type Gender = "male" | "female" | "other";
export type VerificationStatus = "verified" | "unverified" | "pending";

export type UserPreferences = {
  locale: string;
  currency: string;
  newsletter: boolean;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
  };
  theme: "light" | "dark" | "system";
};

export type User = {
  id: ID;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  gender?: Gender;
  birthdate?: string;
  role: UserRole;
  status: UserStatus;
  nationality?: string;
  taxId?: string;
  companyId?: string;
  emailVerifiedAt?: string | null;
  phoneVerifiedAt?: string | null;
  identityVerification: VerificationStatus;
  preferences: UserPreferences;
  creditBalance: number;
  loyaltyPoints: number;
  tierId?: ID;
} & Timestamp;

export type UserTier = {
  id: ID;
  name: string;
  slug: "bronze" | "silver" | "gold" | "platinum" | "pinnacle";
  level: number;
  color: string;
  minPoints: number;
  benefits: string[];
  multiplier: number;
  imageUrl?: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  tokenType: "Bearer";
  expiresIn: number;
};

export type AuthState = {
  user: User | null;
  tokens: AuthTokens | null;
  impersonating: boolean;
  impersonatedFrom?: ID;
};

export type LoginInput = {
  email: string;
  password: string;
  remember?: boolean;
};

export type RegisterInput = {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  phone?: string;
  acceptTerms: boolean;
  acceptNewsletter?: boolean;
  referralCode?: string;
};

export type SocialProvider = "google" | "apple" | "facebook" | "linkedin";

export type UpdateProfileInput = Partial<
  Pick<User, "firstName" | "lastName" | "phone" | "gender" | "birthdate" | "nationality">
> & {
  avatar?: File;
};

export type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
};

export type UserActivity = {
  id: ID;
  userId: ID;
  type: string;
  action: string;
  description?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
};
