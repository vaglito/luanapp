import apiClient from "./apiClient";
import { Banner } from "../types/banner.type";
import { SiteInfoMetadata } from "../types/siteinfo.type";

export async function fetchBannerHome(): Promise<Banner[]> {
  try {
    const response = await apiClient.get<Banner[]>("/api/site/banners");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch banners");
  }
}

export async function fetchSiteMetadata(id: number): Promise<SiteInfoMetadata> {
  try {
    const response = await apiClient.get(`/api/site/site-info/${id}/`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch sitemetadata");
  }
}
