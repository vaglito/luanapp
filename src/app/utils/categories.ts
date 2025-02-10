import { Categories } from "../types/categories";
import { Product } from "../types/products";
const api_url = process.env.API_URL; // url de la api
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
    const response = await fetch(`${api_url}/api/categorys/`, {
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

/**
 * Obtiene una lista de productos de una subcategoría específica dentro de una categoría.
 *
 * @async
 * @function fetchListProductCategory
 * @param {string} category_slug - El slug de la categoría.
 * @param {string} subcategory_slug - El slug de la subcategoría.
 * @returns {Promise<Product | null>} - Promesa que se resuelve con un objeto `Product` si la solicitud es exitosa. Si ocurre un error, devuelve `null`.
 * @throws {Error} - Lanza un error si la respuesta de la API no es exitosa (código de estado distinto de 200).
 *
 * @description Esta función realiza una solicitud HTTP GET al endpoint de detalle de una subcategoría específica dentro de una categoría y devuelve los productos correspondientes. Si la solicitud falla, captura el error y lo registra en la consola, devolviendo `null`.
 *
 * @example
 * const products = await fetchListProductCategory("impresoras", "laser");
 * if (products) {
 *   console.log(products);
 * } else {
 *   console.log("No se encontraron productos o hubo un error.");
 * }
 */
export async function fetchListProductCategory(
  category_slug: string,
  subcategory_slug: string,
  page?: number,
): Promise<Product | null> {
  try {
    const url = new URL(`${api_url}/api/categorys/categoria/detalle/${category_slug}/${subcategory_slug}`);

    if (page) {
      url.searchParams.append("page", page.toString())
    }

    const response = await fetch(
      url.toString(),
      {
        method: "GET",
      }
    );

    const products: Product = await response.json();

    if (!response.ok) {
      throw new Error(`Hubo un error al obtener los datos: ${response.status}`);
    }
    return products;
  } catch (error) {
    console.log(error);
    return null;
  }
}
