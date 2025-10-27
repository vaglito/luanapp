import apiClient from "./apiClient";
import { Banner } from "../types/banner.type";

export async function fetchBannerHome(): Promise<Banner[]> {
  try {
    const response = await apiClient.get<Banner[]>("/api/site/banners");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch banners");
  }
}
