import apiClient from "./apiClient";
import { Brands } from "../types/brands.type";

export async function fetchBrands(): Promise<Brands[]> {
  try {
    const response = await apiClient.get("/api/brands/brands/");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch brands");
  }
}

export async function fetchBrandsSearch(search: string): Promise<Brands[]> {
  try {
    const response = await apiClient.get("/api/brands/brands/search", {
      params: {
        search: search,
      },
      paramsSerializer: { indexes: null },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed fetch search brands");
  }
}
