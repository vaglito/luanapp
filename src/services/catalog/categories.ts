import apiClient from "../apiPublic";
import { Categories } from "../../types/categories.type";
import { isAxiosError } from "axios";

export async function fetchCategories(): Promise<Categories[]> {
  try {
    const response = await apiClient.get<Categories[]>("/api/categories/categories/");
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const detail = error.response?.data?.detail;
      switch (error.response?.status) {
        case 400: throw new Error(detail || "Solicitud inválida al obtener las categorías.");
        case 401: throw new Error("No autenticado. Por favor inicia sesión.");
        case 403: throw new Error("No tienes permisos para acceder a las categorías.");
        case 404: throw new Error("No se encontraron las categorías solicitadas.");
        case 408: throw new Error("La solicitud tardó demasiado. Intenta nuevamente.");
        case 500: throw new Error("Error interno del servidor al obtener las categorías.");
        default: throw new Error(detail || "Error del servidor al obtener las categorías.");
      }
    }
    throw new Error("Error inesperado al obtener las categorías.");
  }
}

export async function fetchCategoriesSearch(
  search: string
): Promise<Categories[]> {
  try {
    const response = await apiClient.get<Categories[]>(`/api/categories/categories/search/`, {
      params: { search },
      paramsSerializer: { indexes: null },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const detail = error.response?.data?.detail;
      switch (error.response?.status) {
        case 400: throw new Error(detail || "Solicitud de búsqueda inválida.");
        case 401: throw new Error("No autenticado para realizar búsquedas.");
        case 403: throw new Error("No tienes permisos para buscar categorías.");
        case 404: throw new Error("No se encontraron categorías para tu búsqueda.");
        case 408: throw new Error("La búsqueda tardó demasiado. Intenta de nuevo.");
        case 500: throw new Error("Error interno del servidor al buscar categorías.");
        default: throw new Error(detail || "Error del servidor al buscar las categorías.");
      }
    }
    throw new Error("Error inesperado al buscar las categorías.");
  }
}

export async function fetchCategoriesBrands(
  brand: string
): Promise<Categories[]> {
  try {
    const response = await apiClient.get<Categories[]>("/api/brands/brands/categories/", {
      params: { brand },
      paramsSerializer: { indexes: null },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const detail = error.response?.data?.detail;
      switch (error.response?.status) {
        case 400: throw new Error(detail || "Marca inválida para obtener categorías.");
        case 401: throw new Error("No autenticado. Por favor inicia sesión.");
        case 403: throw new Error("No tienes permisos para realizar esta acción.");
        case 404: throw new Error("No se encontraron categorías para esta marca.");
        case 408: throw new Error("La solicitud tardó demasiado. Intenta nuevamente.");
        case 500: throw new Error("Error del servidor al obtener categorías por marca.");
        default: throw new Error(detail || "Error del servidor al obtener las categorías por marca.");
      }
    }
    throw new Error("Error inesperado al obtener las categorías por marca.");
  }
}
