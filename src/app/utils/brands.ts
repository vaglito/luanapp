import { Product } from "../types/products";
import { Brands } from "../types/brands";

const api_url = process.env.API_URL; // url de la api

export async function getListBrands(): Promise<Brands[]> {
  try {
    const response = await fetch(`${api_url}/api/trademarks/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Hubo un error al obtener el listado de marcas");
    }

    const data: Brands[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchListProductBrand(
  slugBrand: string,
  page?: number
): Promise<Product> {
  try {
    const url = new URL(`${api_url}/api/trademarks/detalle/${slugBrand}`);
    if (page) {
      url.searchParams.append("page", page.toString());
    }

    const response = await fetch(
      url.toString(),
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Hubo un problema al obtener los datos");
    }

    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {
      count: 0,
      results: [],
      next: undefined,
      previous: undefined,
    };
  }
}
