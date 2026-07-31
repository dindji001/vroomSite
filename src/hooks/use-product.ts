import { productsApi } from "@/services/api/products";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product, ProductListParams } from "@/types/product";

export function useProducts(params?: ProductListParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productsApi.list(params || {}),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productsApi.get(id),
    enabled: !!id,
  });
}

export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => productsApi.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useRelatedProducts(productId: string, limit = 4) {
  return useQuery({
    queryKey: ["products", "related", productId],
    queryFn: () => productsApi.related(productId, limit),
    enabled: !!productId,
  });
}

export function useProductBrands() {
  return useQuery({
    queryKey: ["product-brands"],
    queryFn: () => productsApi.listBrands(),
  });
}

export function useProductCategories() {
  return useQuery({
    queryKey: ["product-categories"],
    queryFn: () => productsApi.listCategories(),
  });
}

export function useProductReviews(productId: string) {
  return useQuery({
    queryKey: ["product-reviews", productId],
    queryFn: () => productsApi.listReviews(productId),
    enabled: !!productId,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { productId: string; rating: 1 | 2 | 3 | 4 | 5; title: string; comment: string }) =>
      productsApi.createReview(data.productId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["product-reviews", variables.productId] });
    },
  });
}
