import { Result, Product } from "../types/products";
import { Detail } from "../types/detail";

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
    // await new Promise(resolve => setTimeout(resolve, 5000))
    const response = await fetch(`${api_url}/api/products/new-product/`, {
      method: "GET",
      cache: 'no-store',
      headers: {
        "Content-Type": "application/json",
      }
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

export async function fetchFilterProductCategorySubCategory(
  cod_category: string,
  cod_subcategory: string
): Promise<Product> {
  try {
    const response = await fetch(
      `${api_url}/api/products/product/filter/${cod_category}/${cod_subcategory}/`,
      {
        cache: "no-store",
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Hubo un error al obtener los productos filtrados");
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

/**
 * Función asíncrona que obtiene los detalles de un producto por su slug.
 * @async
 * @function fetchProductDetail
 * @param {string} product_slug - El slug del producto que se desea obtener.
 * @returns {Promise<Detail>} - Una promesa que se resuelve con los detalles del producto.
 * @throws {Error} - Si hay un error en la solicitud de la API.
 *
 * @description Esta función realiza una solicitud HTTP GET a la API para obtener los detalles de un producto específico
 * utilizando su slug como parámetro. Si la respuesta no es exitosa (código de estado diferente de 200), lanza un error.
 *
 * @example
 * const productDetail = await fetchProductDetail("laptop-lenovo-123");
 * console.log(productDetail.nom_prod); // Muestra el nombre del producto.
 */
export async function fetchProductDetail(
  product_slug: string
): Promise<Detail> {
  try {
    const response = await fetch(
      `${api_url}/api/products/detalle/${product_slug}/`,
      {
        cache: "no-store",
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Hubo un error");
    }

    const data: Detail = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el detalle del producto");
  }
}

export async function fetchProductSearch(
  query?: string,
  page?: number
): Promise<Product> {
  try {
    // Create the URL with query and page parameters
    const url = new URL(`${api_url}/api/products/search/`);
    url.searchParams.append("q", query || "");
    if (page) {
      url.searchParams.append("page", page.toString());
    }

    const response = await fetch(url.toString(), {
      cache: "no-store",
      method: "GET",
    });

    // Handle 404 status specifically
    if (response.status === 404) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Producto no encontrado.");
    }

    // Check for other types of response errors
    if (!response.ok) {
      throw new Error("No se pudieron cargar los datos");
    }

    const data: Product = await response.json();
    return data;

  } catch (error) {
    const errorMessage = (error as { message?: string }).message || "Hubo un error en la conexión de la API";
    console.error("API error:", errorMessage);
    throw new Error(errorMessage);
  }
}