import apiClient from "../apiPublic";
import { Brands } from "../../types/brands.type";
import { isAxiosError } from "axios";

export async function fetchBrands(): Promise<Brands[]> {
  try {
    const response = await apiClient.get<Brands[]>("/api/brands/brands/");
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const detail = error.response?.data?.detail;
      switch (error.response?.status) {
        case 400: throw new Error(detail || "Solicitud inválida al obtener las marcas.");
        case 401: throw new Error("No autenticado. Por favor inicia sesión.");
        case 403: throw new Error("No tienes permisos para acceder a las marcas.");
        case 404: throw new Error("No se encontraron las marcas solicitadas.");
        case 408: throw new Error("La solicitud tardó demasiado. Intenta nuevamente.");
        case 500: throw new Error("Error interno del servidor al obtener las marcas.");
        default: throw new Error(detail || "Error del servidor al obtener las marcas.");
      }
    }
    throw new Error("Error inesperado al obtener las marcas.");
  }
}

export async function fetchBrandsSearch(search: string): Promise<Brands[]> {
  try {
    const response = await apiClient.get<Brands[]>("/api/brands/brands/search", {
      params: { search }
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const detail = error.response?.data?.detail;
      switch (error.response?.status) {
        case 400: throw new Error(detail || "Solicitud de búsqueda inválida.");
        case 401: throw new Error("No autenticado para realizar búsquedas.");
        case 403: throw new Error("No tienes permisos para buscar marcas.");
        case 404: throw new Error("No se encontraron marcas para tu búsqueda.");
        case 408: throw new Error("La búsqueda tardó demasiado. Intenta de nuevo.");
        case 500: throw new Error("Error interno del servidor al buscar marcas.");
        default: throw new Error(detail || "Error del servidor al buscar las marcas.");
      }
    }
    throw new Error("Error inesperado al buscar las marcas.");
  }
}

export async function fetchBrandsCategories(
  subcategory: string
): Promise<Brands[]> {
  try {
    const response = await apiClient.get<Brands[]>("/api/categories/categories/brand/", {
      params: { subcategory }
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const detail = error.response?.data?.detail;
      switch (error.response?.status) {
        case 400: throw new Error(detail || "Categoría inválida para obtener marcas.");
        case 401: throw new Error("No autenticado. Por favor inicia sesión.");
        case 403: throw new Error("No tienes permisos para realizar esta acción.");
        case 404: throw new Error("No se encontraron marcas para esta categoría.");
        case 408: throw new Error("La solicitud tardó demasiado. Intenta nuevamente.");
        case 500: throw new Error("Error del servidor al obtener marcas por categoría.");
        default: throw new Error(detail || "Error del servidor al obtener las marcas por categoría.");
      }
    }
    throw new Error("Error inesperado al obtener las marcas por categoría.");
  }
}
