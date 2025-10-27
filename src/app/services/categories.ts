import apiClient from "./apiClient";
import { Categories } from "../types/categories.type";

export async function fetchCategories(): Promise<Categories[]> {
  try {
    const response = await apiClient.get("/api/categories/categories/");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
}
