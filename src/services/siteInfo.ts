import { serverFetch } from "./serverFetch";
import { Banner } from "../types/banner.type";
import { SiteInfoMetadata } from "../types/siteinfo.type";
import { unstable_cache } from "next/cache";


export async function fetchBannerHome(): Promise<Banner[]> {
  try {
    const data = await serverFetch<Banner[]>("/api/site/banners");
    return data;
  } catch (error) {
    throw new Error("Failed to fetch banners");
  }
}

export const fetchSiteMetadata = unstable_cache(
  async (id: number): Promise<SiteInfoMetadata> => {
    try {
      const data = await serverFetch<SiteInfoMetadata>(`/api/site/site-info/${id}/`);
      return data;
    } catch (error) {
      throw new Error(`Error al obtener metadata: ${error}`);
    }
  },
  ["site-metadata"], // clave de caché
  { revalidate: 300 }
);
