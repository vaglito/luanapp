import { auth } from "@/auth";
import apiPrivate from "../../apiPrivate";
import { PaginatedResponse } from "@/types/paginatedResponse.type";
import { Proforma } from "@/types/proformas.type";

export async function getProformas(): Promise<PaginatedResponse<Proforma>> {
  const session = await auth();
  try {
    const res = await apiPrivate.get("/api/proformas/proforma/", {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    });
    return res.data;
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
  const session = await auth();
  const res = await apiPrivate.get<Proforma>(
    `/api/proformas/proforma/${code}/`, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    }
  );
  return res.data;
}
