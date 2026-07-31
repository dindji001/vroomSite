import type { ID, Timestamp, ImageAsset, Money, PaginationParams } from "@/types";

export type ProductStatus = "draft" | "active" | "inactive" | "out_of_stock" | "archived";
export type ProductType = "physical" | "digital" | "service" | "bundle";
export type ProductCondition = "new" | "like_new" | "excellent" | "good" | "fair";
export type ProductCategory =
  | "accessories"
  | "parts"
  | "tires"
  | "care"
  | "tools"
  | "electronics"
  | "interior"
  | "exterior"
  | "performance"
  | "merchandising";

export type ProductStockStatus = "in_stock" | "low_stock" | "out_of_stock" | "pre_order" | "on_demand";
export type TaxRate = {
  id: ID;
  country: string;
  rate: number;
  name: string;
};

export type ProductBrand = {
  id: ID;
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
  country?: string;
  website?: string;
  active: boolean;
  productCount?: number;
} & Timestamp;

export type ProductCategoryNode = {
  id: ID;
  name: string;
  slug: string;
  parentId?: ID;
  children?: ProductCategoryNode[];
  level: number;
  description?: string;
  imageUrl?: string;
  icon?: string;
  metaTitle?: string;
  metaDescription?: string;
  productCount?: number;
  active: boolean;
  sortOrder: number;
} & Timestamp;

export type ProductAttribute = {
  id: ID;
  name: string;
  slug: string;
  type: "text" | "number" | "boolean" | "select" | "multiselect" | "color";
  options?: Array<{ label: string; value: string }>;
  isFilterable?: boolean;
  isVisible?: boolean;
  sortOrder: number;
};

export type ProductAttributeValue = {
  attributeId: ID;
  attribute?: ProductAttribute;
  value: string | number | boolean | string[];
};

export type ProductVariant = {
  id: ID;
  productId: ID;
  sku: string;
  ean?: string;
  upc?: string;
  mpn?: string;
  combination?: Record<string, string>;
  combinationLabel?: string;
  price: Money;
  compareAtPrice?: Money;
  costPrice?: Money;
  marginPercent?: number;
  stock: number;
  reservedStock?: number;
  safetyStock?: number;
  stockStatus: ProductStockStatus;
  weightGrams?: number;
  lengthMm?: number;
  widthMm?: number;
  heightMm?: number;
  images?: ImageAsset[];
  thumbnailUrl?: string;
  active: boolean;
  isDefault?: boolean;
  barcodeType?: string;
  hsCode?: string;
  originCountry?: string;
} & Timestamp;

export type ProductInventory = {
  productId: ID;
  variantId?: ID;
  warehouseId?: ID;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  lastRestockAt?: string;
  restockExpectedAt?: string;
  lastCountedAt?: string;
};

export type ProductReview = {
  id: ID;
  productId: ID;
  userId: ID;
  userName?: string;
  userAvatarUrl?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title?: string;
  comment?: string;
  pros?: string[];
  cons?: string[];
  verified: boolean;
  helpfulCount: number;
  notHelpfulCount: number;
  reportedAt?: string | null;
  approvedAt?: string | null;
  replyToId?: ID;
  replies?: ProductReview[];
  media?: Array<{ type: "image" | "video"; url: string }>;
  deletedAt?: string | null;
} & Timestamp;

export type ProductReviewStats = {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<1 | 2 | 3 | 4 | 5, number>;
  percentRecommended?: number;
};

export type Product = {
  id: ID;
  slug: string;
  type: ProductType;
  status: ProductStatus;
  name: string;
  description?: string;
  shortDescription?: string;
  features?: string[];
  brandId?: ID;
  brand?: ProductBrand;
  categoryId?: ID;
  category?: ProductCategoryNode;
  tags?: string[];
  sku?: string;
  ean?: string;
  mpn?: string;
  upc?: string;
  price: Money;
  compareAtPrice?: Money;
  costPrice?: Money;
  taxRateId?: ID;
  taxRate?: TaxRate;
  taxIncluded: boolean;
  discountPercent?: number;
  discountFixed?: Money;
  discountStartAt?: string;
  discountEndAt?: string;
  stock: number;
  stockStatus: ProductStockStatus;
  safetyStock: number;
  availableFrom?: string;
  isNew: boolean;
  isFeatured: boolean;
  isBestseller: boolean;
  isDigital: boolean;
  isService: boolean;
  virtualDownloadUrl?: string;
  virtualDownloadLimit?: number;
  virtualExpiryDays?: number;
  images: ImageAsset[];
  videoUrl?: string;
  threeSixtyUrl?: string;
  weightGrams?: number;
  lengthMm?: number;
  widthMm?: number;
  heightMm?: number;
  condition: ProductCondition;
  warrantyMonths?: number;
  warrantyTerms?: string;
  returnable: boolean;
  returnDays?: number;
  attributes?: ProductAttributeValue[];
  variants?: ProductVariant[];
  defaultVariantId?: ID;
  hasVariants: boolean;
  upsellIds?: ID[];
  crossSellIds?: ID[];
  relatedIds?: ID[];
  bundleProducts?: Array<{ productId: ID; quantity: number }>;
  bundleDiscountPercent?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  canonicalUrl?: string;
  structuredData?: Record<string, unknown>;
  viewCount: number;
  salesCount: number;
  averageRating?: number;
  totalReviews?: number;
  compatibleVehicleIds?: ID[];
  compatibleMakeIds?: ID[];
  compatibleModelIds?: ID[];
  requiresProfessionalInstallation?: boolean;
  installationGuideUrl?: string;
  manualUrl?: string;
  safetyDataSheetUrl?: string;
  publishedAt?: string | null;
  soldCount?: number;
  supplierId?: ID;
  supplierSku?: string;
  originCountry?: string;
  hsCode?: string;
} & Timestamp;

export type ProductFilter = {
  q?: string;
  brandIds?: ID[];
  categoryIds?: ID[];
  categorySlugs?: string[];
  statuses?: ProductStatus[];
  types?: ProductType[];
  minPrice?: number;
  maxPrice?: number;
  conditions?: ProductCondition[];
  stockStatuses?: ProductStockStatus[];
  attributes?: Record<string, string[]>;
  minRating?: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  onSale?: boolean;
  tags?: string[];
  inStockOnly?: boolean;
  compatibleVehicleId?: ID;
};

export type ProductListParams = ProductFilter & PaginationParams;
