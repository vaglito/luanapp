import { Categories } from "../types/categories";

/**
 * Obtiene los datos de categorías desde una API.
 * @async
 * @function fetchCategory
 * @returns {Promise<Categories[]>} - Una promesa que se resuelve en una lista de categorías ({@link Categories[]}) si la solicitud es exitosa, o en un arreglo vacío si ocurre un error.
 * @throws {Error} - Lanza un error si la respuesta de la API no es exitosa (código de estado distinto de 200).
 *
 * @description Esta función realiza una solicitud HTTP GET al endpoint especificado para obtener una lista de categorías.
 * La respuesta se valida para asegurar que sea exitosa (status 200). Si no lo es, se lanza un error.
 * Si ocurre un error durante la comunicación con la API, se captura y se devuelve un arreglo vacío.
 *
 * @example
 * const categories = await fetchCategory();
 * if (categories.length === 0) {
 *   console.log('No se pudieron obtener categorías.');
 * } else {
 *   console.log(categories);
 * }
 */
export async function fetchCategory(): Promise<Categories[]> {
  try {
    const response = await fetch("https://luanatech.pe/api/categorys/", {
      cache: "no-store", // Configura la solicitud para no almacenar en caché
    });
    const categories: Categories[] = await response.json();

    // Validaciones del response
    if (!response.ok) {
      throw new Error(
        `Hubo un problema al obtener los datos de categorias: ${response.status}`
      );
    }

    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
}
