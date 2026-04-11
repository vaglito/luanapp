import apiClient from "./apiPublic";
import { Banner } from "../types/banner.type";
import { SiteInfoMetadata } from "../types/siteinfo.type";
import { unstable_cache } from "next/cache";
import { isAxiosError } from "axios";

export const fetchBannerHome = unstable_cache(
  async (): Promise<Banner[]> => {
    try {
      const response = await apiClient.get<Banner[]>("/api/site/banners");
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const detail = error.response?.data?.detail;
        throw new Error(detail || "Error del servidor al obtener los banners.");
      }
      throw new Error("Error inesperado al obtener los banners.");
    }
  },
  ["banners-home"], // clave única para identificar esta caché
  { revalidate: 300 }
);

export const fetchSiteMetadata = unstable_cache(
  async (id: number): Promise<SiteInfoMetadata> => {
    try {
      const response = await apiClient.get<SiteInfoMetadata>(`/api/site/site-info/${id}/`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const detail = error.response?.data?.detail;
        throw new Error(detail || "Error del servidor al obtener la metadata.");
      }
      throw new Error("Error inesperado al obtener la metadata.");
    }
  },
  ["site-metadata"], // clave de caché
  { revalidate: 300 }
);
