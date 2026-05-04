"use server";

import apiPrivate from "@/services/apiPrivate";
import { Banner } from "@/types/banner.type";
import { revalidatePath } from "next/cache";

export async function getBanners(): Promise<Banner[]> {
  try {
    const res = await apiPrivate.get("/api/site/banners/");
    return res.data;
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
}

export async function createBanner(formData: FormData): Promise<Banner | null> {
  try {
    const res = await apiPrivate.post("/api/site/banners/", formData);
    revalidatePath("/dashboard/banners"); // Refresca la tabla en el servidor
    return res.data;
  } catch (error) {
    console.error("Error creating banner:", error);
    return null;
  }
}

export async function updateBanner(id: number, formData: FormData): Promise<Banner | null> {
  try {
    const res = await apiPrivate.patch(`/api/site/banners/${id}/`, formData);
    revalidatePath("/dashboard/banners");
    return res.data;
  } catch (error) {
    console.error("Error updating banner:", error);
    return null;
  }
}

export async function deleteBanner(id: number): Promise<boolean> {
  try {
    await apiPrivate.delete(`/api/site/banners/${id}/`);
    revalidatePath("/dashboard/banners");
    return true;
  } catch (error) {
    console.error("Error deleting banner:", error);
    return false;
  }
}
