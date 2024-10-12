import { Product } from "../types/products";
const api_url = process.env.API_URL; // url de la api

export async function fetchListProductBrand(
  slugBrand: string
): Promise<Product> {
  try {
    const response = await fetch(
      `${api_url}/api/trademarks/detalle/${slugBrand}/`,
      {
        cache: "no-store",
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
