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
