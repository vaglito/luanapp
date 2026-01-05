import { auth } from "@/auth";
import { PaginatedResponse } from "@/app/types/paginatedResponse.type";
import { Proforma } from "@/app/types/proformas.type";

export async function getProformas(): Promise<PaginatedResponse<Proforma>> {
  const session = await auth();
  try {
    const res = await fetch("http://localhost:8000/api/proformas/proforma/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "RUC9TfgQ.1gjQczBKXzHuvXD8utSVTURBiX6moaMG",
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
