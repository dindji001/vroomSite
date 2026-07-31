import { apiClient } from "./client";
import { apiConfig } from "@/config/api";
import type { ID, PaginationParams, PaginatedResult } from "@/types";
import type {
  Product,
  ProductListParams,
  ProductBrand,
  ProductCategoryNode,
  ProductAttribute,
  ProductReview,
  ProductReviewStats,
  ProductVariant,
  ProductInventory,
} from "@/types/product";

type ReviewPayload = {
  rating: 1 | 2 | 3 | 4 | 5;
  title?: string;
  comment?: string;
  pros?: string[];
  cons?: string[];
  media?: Array<{ type: "image" | "video"; url: string }>;
};

export const productsApi = {
  list: (params: ProductListParams = {}) =>
    apiClient.get<PaginatedResult<Product>>(apiConfig.endpoints.products.root, {
      query: params as Record<string, unknown>,
    }),
  get: (id: ID) =>
    apiClient.get<Product>(apiConfig.endpoints.products.byId.replace(":id", id)),
  getBySlug: (slug: string) =>
    apiClient.get<Product>(
      apiConfig.endpoints.products.bySlug.replace(":slug", slug)
    ),
  search: (q: string, params?: ProductListParams) =>
    apiClient.get<PaginatedResult<Product>>(apiConfig.endpoints.products.search, {
      query: { q, ...params },
    }),
  listBrands: (query?: { active?: boolean; letter?: string; search?: string }) =>
    apiClient.get<ProductBrand[]>(apiConfig.endpoints.products.brands, { query }),
  getBrand: (id: ID) =>
    apiClient.get<ProductBrand>(
      apiConfig.endpoints.products.brandById.replace(":id", id)
    ),
  listCategories: (query?: { parentId?: ID | null; active?: boolean; depth?: number }) =>
    apiClient.get<ProductCategoryNode[]>(apiConfig.endpoints.products.categories, {
      query,
    }),
  getCategory: (id: ID) =>
    apiClient.get<ProductCategoryNode>(
      apiConfig.endpoints.products.categoryById.replace(":id", id)
    ),
  listAttributes: (query?: { categoryId?: ID; isFilterable?: boolean }) =>
    apiClient.get<ProductAttribute[]>(apiConfig.endpoints.products.attributes, {
      query,
    }),
  getFiltersMeta: (query?: { categoryId?: ID; brandId?: ID }) =>
    apiClient.get<{
      priceRange: { min: number; max: number };
      ratingRange: { min: number; max: number };
      brands: Array<{ id: ID; name: string; count: number }>;
      categories: Array<{ id: ID; name: string; count: number }>;
      conditions: Array<{ value: string; label: string; count: number }>;
      stockStatuses: Array<{ value: string; label: string; count: number }>;
      attributes: Array<{
        id: ID;
        name: string;
        type: ProductAttribute["type"];
        values: Array<{ value: string; label: string; count: number }>;
      }>;
    }>(apiConfig.endpoints.products.filters, { query }),
  featured: (limit = 8) =>
    apiClient.get<Product[]>(apiConfig.endpoints.products.featured, {
      query: { limit },
    }),
  bestsellers: (limit = 10) =>
    apiClient.get<Product[]>(apiConfig.endpoints.products.bestsellers, {
      query: { limit },
    }),
  newArrivals: (limit = 12) =>
    apiClient.get<Product[]>(apiConfig.endpoints.products.newArrivals, {
      query: { limit },
    }),
  onSale: (limit = 12) =>
    apiClient.get<Product[]>(apiConfig.endpoints.products.onSale, {
      query: { limit },
    }),
  related: (id: ID, limit = 6) =>
    apiClient.get<Product[]>(
      apiConfig.endpoints.products.related.replace(":id", id),
      { query: { limit } }
    ),
  upsell: (id: ID, limit = 4) =>
    apiClient.get<Product[]>(
      apiConfig.endpoints.products.upsell.replace(":id", id),
      { query: { limit } }
    ),
  crossSell: (id: ID, limit = 6) =>
    apiClient.get<Product[]>(
      apiConfig.endpoints.products.crossSell.replace(":id", id),
      { query: { limit } }
    ),
  listReviews: (
    id: ID,
    query?: PaginationParams & { rating?: number; verified?: boolean; helpfulOnly?: boolean }
  ) =>
    apiClient.get<PaginatedResult<ProductReview>>(
      apiConfig.endpoints.products.reviews.replace(":id", id),
      { query }
    ),
  getReviewStats: (id: ID) =>
    apiClient.get<ProductReviewStats>(
      apiConfig.endpoints.products.reviewStats.replace(":id", id)
    ),
  createReview: (id: ID, payload: ReviewPayload) =>
    apiClient.post<ProductReview>(
      apiConfig.endpoints.products.reviews.replace(":id", id),
      payload
    ),
  voteReview: (reviewId: ID, helpful: boolean) =>
    apiClient.post(
      apiConfig.endpoints.products.helpfulVote.replace(":id", reviewId),
      { helpful }
    ),
  listVariants: (id: ID) =>
    apiClient.get<ProductVariant[]>(
      apiConfig.endpoints.products.variants.replace(":id", id)
    ),
  getVariant: (id: ID) =>
    apiClient.get<ProductVariant>(
      apiConfig.endpoints.products.variantById.replace(":id", id)
    ),
  getInventory: (id: ID) =>
    apiClient.get<ProductInventory[]>(
      apiConfig.endpoints.products.inventory.replace(":id", id)
    ),
  getCompatibleVehicles: (id: ID) =>
    apiClient.get<{ makeId?: ID; modelId?: ID; note?: string }[]>(
      `${apiConfig.endpoints.products.byId.replace(":id", id)}/compatibility`
    ),
};

export default productsApi;
