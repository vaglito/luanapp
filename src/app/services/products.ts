import apiClient from "./apiClient";
import { Products, ProductDetail } from "../types/products.type";
import { PaginatedResponse } from "../types/paginatedResponse.type";

export async function fetchNewProducts(): Promise<PaginatedResponse<Products>> {
  try {
    const response = await apiClient.get(
      "/api/products/products/?ordering=-created_at"
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch new products");
  }
}

export async function fetchDetailProduct(slug: string): Promise<ProductDetail> {
  try {
    const response = await apiClient.get(`/api/products/product/${slug}/`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch product with ${slug}.`);
  }
}

interface ProductFilters {
  category?: string[];
  subcategory?: string[];
  brand?: string[];
  ordering?: string;
  page?: number;
}

export async function fetchProductList(
  filters: ProductFilters
): Promise<PaginatedResponse<Products>> {
  try {
    const response = await apiClient.get("/api/products/products/", {
      params: filters,
      paramsSerializer: { indexes: null },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch list products");
  }
}

interface ProductSearchFielters {
  search?: string;
  category?: string[];
  subcategory?: string[];
  brand?: string[];
  ordering?: string;
  page?: number;
}
export async function fetchProductSearchList(
  filters: ProductSearchFielters
): Promise<PaginatedResponse<Products>> {
  try {
    const response = await apiClient.get("/api/products/products/search/", {
      params: filters,
      paramsSerializer: { indexes: null },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch serach products");
  }
}