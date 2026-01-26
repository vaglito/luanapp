import apiClient from "./apiClient";
import { Banner } from "../types/banner.type";
import { SiteInfoMetadata } from "../types/siteinfo.type";
import { unstable_cache } from "next/cache";


export async function fetchBannerHome(): Promise<Banner[]> {
  try {
    const response = await apiClient.get<Banner[]>("/api/site/banners");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch banners");
  }
}

export const fetchSiteMetadata = unstable_cache(
  async (id: number): Promise<SiteInfoMetadata> => {
    try {
      const response = await apiClient.get(`/api/site/site-info/${id}/`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener metadata: ${error}`);
    }
  },
  ["site-metadata"], // clave de caché
  { revalidate: 300 }
);
