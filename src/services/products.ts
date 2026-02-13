import apiClient from "./apiClient";
import { Products, ProductDetail } from "../types/products.type";
import { PaginatedResponse } from "../types/paginatedResponse.type";

import { notFound, redirect } from "next/navigation";
import { AxiosError } from "axios";

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
    const err = error as AxiosError;

    // --- Manejo de errores típicos ---
    switch (err.response?.status) {
      case 400:
        throw new Error("Solicitud inválida. Verifica los parámetros enviados.");
      case 401:
        // No autenticado → podrías redirigir al login
        redirect("/login");
      case 403:
        throw new Error("No tienes permisos para acceder a este recurso.");
      case 404:
        // Producto no encontrado → página not-found
        notFound();
      case 408:
        throw new Error("La solicitud tardó demasiado. Intenta nuevamente.");
      case 429:
        throw new Error("Demasiadas solicitudes. Espera un momento antes de reintentar.");
      case 500:
        throw new Error("Error interno del servidor. Intenta más tarde.");
      case 502:
      case 503:
      case 504:
        throw new Error("El servicio no está disponible temporalmente.");
      default:
        throw new Error(`Error inesperado al obtener el producto: ${slug}.`);
    }
  }
}


interface ProductFilters {
  category?: string | string[];
  subcategory?: string | string[];
  brand?: string | string[];
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

// --- Statistics ---

export async function registerProductView(slug: string): Promise<void> {
  if (!slug) return;
  try {
    if (typeof window !== "undefined") {
      // Client-side: Call Next.js Proxy
      await fetch(`/api/stats/view/${slug}`, { method: "POST" });
    } else {
      // Server-side: Call Django Backend directly
      await apiClient.post(`/api/products/products/stats/view/${slug}/`);
    }
  } catch (error) {
    console.error(`Failed to register product view for slug: ${slug}`, error);
  }
}

export async function fetchPopularProducts(): Promise<Products[]> {
  try {
    const response = await apiClient.get("/api/products/products/stats/popular/");
    // Si la respuesta es paginada (tiene results), retornamos results.
    // Si es un array directo, retornamos la data.
    if (response.data?.results) {
      return response.data.results;
    }
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch popular products", error);
    return [];
  }
}