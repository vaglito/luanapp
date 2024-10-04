import { Result } from "../types/products";

const api_url = process.env.API_URL;


/**
 * Obtiene los datos de nuevos productos desde una API.
 * @async
 * @function fetchNewProductList
 * @returns {Promise<Result[]>} - Una promesa que se resuelve en una lista de nuevos productos ({@link Result[]}) si la solicitud es exitosa, o en un arreglo vacío si ocurre un error.
 * @throws {Error} - Lanza un error si la respuesta de la API no es exitosa (código de estado distinto de 200).
 *
 * @description Esta función realiza una solicitud HTTP GET al endpoint especificado para obtener una lista de nuevos productos.
 * La respuesta se valida para asegurar que sea exitosa (status 200). Si no lo es, se lanza un error.
 * Si ocurre un error durante la comunicación con la API, se captura y se devuelve un arreglo vacío.
 *
 */
export async function fetchNewProductList(): Promise<Result[]> {
  try {
    const response = await fetch(`${api_url}/api/products/new-product/`, {
      cache: "no-store",
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("hubo un error al obtener los productos nuevos.");
    }
    const data: Result[] = await response.json();
    return data;

  } catch (error) {
    console.log(error);
    return [];
  }
}
