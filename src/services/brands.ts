import { serverFetch } from "./serverFetch";
import { Brands } from "../types/brands.type";

export async function fetchBrands(): Promise<Brands[]> {
  try {
    const data = await serverFetch<Brands[]>("/api/brands/brands/");
    return data;
  } catch (error) {
    throw new Error("Failed to fetch brands");
  }
}

export async function fetchBrandsSearch(search: string): Promise<Brands[]> {
  try {
    const params = new URLSearchParams({ search });
    const data = await serverFetch<Brands[]>(`/api/brands/brands/search?${params.toString()}`);
    return data;
  } catch (error) {
    throw new Error("Failed fetch search brands");
  }
}

export async function fetchBrandsCategories(
  subcategory: string
): Promise<Brands[]> {
  try {
    const params = new URLSearchParams({ subcategory });
    const data = await serverFetch<Brands[]>(`/api/categories/categories/brand/?${params.toString()}`);
    return data;
  } catch (error) {
    throw new Error("Failed fetch subcategory brands");
  }
}
