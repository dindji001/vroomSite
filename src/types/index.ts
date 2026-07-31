export type ID = string;

export type Timestamp = {
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
};

export type PaginatedResult<T> = {
  data: T[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

export type SortOption = {
  label: string;
  value: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
};

export type Option<T extends string = string> = {
  label: string;
  value: T;
  icon?: React.ComponentType<{ className?: string }>;
};

export type WithId<T = unknown> = T & { id: ID };

export type Nullable<T> = T | null;

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type AsyncStatus = "idle" | "loading" | "success" | "error";

export type AsyncState<TData, TError = unknown> = {
  status: AsyncStatus;
  data: TData | null;
  error: TError | null;
};

export type Locale = "fr" | "en" | "de" | "es" | "it";
export type Currency = "EUR" | "USD" | "GBP" | "CHF";
export type LanguageCode = "fr-FR" | "en-US" | "de-DE" | "es-ES" | "it-IT";

export type Money = {
  amount: number;
  currency: Currency;
};

export type FileObject = {
  id: ID;
  url: string;
  name: string;
  size: number;
  mime: string;
  type: "image" | "document" | "video" | "other";
};

export type ImageAsset = {
  id: ID;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  position?: number;
};

export type Address = {
  id: ID;
  label?: string;
  firstName: string;
  lastName: string;
  company?: string;
  line1: string;
  line2?: string;
  postalCode: string;
  city: string;
  region?: string;
  country: string;
  countryCode: string;
  phone?: string;
  isDefault?: boolean;
};

export type Geolocation = {
  lat: number;
  lng: number;
  formattedAddress?: string;
};

export type SeoMetadata = {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  robots?: string;
};

export type ToastType = "success" | "error" | "warning" | "info" | "promise";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};
