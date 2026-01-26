import { auth } from "@/auth";
import { axiosAuth } from "@/lib/axios";
import { PaginatedResponse } from "@/types/paginatedResponse.type";
import { Proforma } from "@/types/proformas.type";

const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY

export async function getProformas(): Promise<PaginatedResponse<Proforma>> {
  const session = await auth();
  try {
    const res = await fetch(`${API_URL}/api/proformas/proforma/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${API_KEY}`,
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    });
    const data = res.json();
    return data;
  } catch (error) {
    return {
      count: 0,
      next: "",
      previous: "",
      results: [],
    };
  }
}

export async function searchProformaByCode(code: string) {
  const res = await axiosAuth.get<Proforma>(
    `proformas/proforma/${code}/`
  );
  return res.data;
}

