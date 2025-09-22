import { ResponseProducts, Product } from "../types/v2/products-type";

const apiUrl = process.env.API_URL;

/**
 * Fetches the list of recent products from the API.
 *
 * @returns {Promise<ResponseProducts>} A promise that resolves to the list of recent products.
 *
 * @throws {Error} Throws an error if the response status is 404 (Not Found), 500 (Internal Server Error),
 * or any other unexpected status.
 *
 * @example
 * getNewProductList().then(products => {
 *   console.log(products);
 * }).catch(error => {
 *   console.error(error);
 * });
 */
export const getNewProductList = async (): Promise<ResponseProducts> => {
  try {
    const response = await fetch(`${apiUrl}/api/v2.0/products/recent/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is ok
    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error(
            "The requested resource could not be found. Not Found 404"
          );
        case 500:
          throw new Error("Internal Server Error 500.");
        default:
          throw new Error(`Unexpected error: ${response.status}`);
      }
    }

    const data: ResponseProducts = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching new products: ", error);
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }
};

/**
 * Fetches the details of a product based on the provided slug.
 *
 * @param {string} slug - The unique identifier for the product.
 * @returns {Promise<Product>} - A promise that resolves to the product details.
 * @throws {Error} - Throws an error if the response status is 404 (Not Found), 500 (Internal Server Error), or any other unexpected status.
 *
 * @example
 * getProductDetail('product-slug')
 *   .then(product => console.log(product))
 *   .catch(error => console.error(error));
 */
export const getProductDetail = async (slug: string): Promise<Product> => {
  try {
    const response = await fetch(`${apiUrl}/api/v2.0/products/get/${slug}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is ok
    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error(
            "The requested resource could not be found. Not Found 404"
          );
        case 500:
          throw new Error("Internal Server Error 500.");
        default:
          throw new Error(`Unexpected error: ${response.status}`);
      }
    }

    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product detail: ", error);
    throw new Error("Error fetching product detail");
  }
};

/**
 * Fetches the list of products based on the provided category and subcategory slugs.
 *
 * @param {string} categorySlug - The slug of the category.
 * @param {string} subcategorySlug - The slug of the subcategory.
 * @param {number} page - The page number to fetch.
 * @returns {Promise<ResponseProducts>} - A promise that resolves to the list of products.
 * @throws {Error} - Throws an error if the response status is 404 (Not Found), 500 (Internal Server Error), or any other unexpected status.
 *
 * @example
 * getProductList('category-slug', 'subcategory-slug', 1)
 *   .then(products => console.log(products))
 *   .catch(error => console.error(error));
 */
export const getProductList = async ({
  brandSlug,
  categorySlug,
  subcategorySlug,
  page = 1,
}: {
  brandSlug?: string;
  categorySlug?: string;
  subcategorySlug?: string | string[]; // 👈 permitir array también
  page?: number;
}): Promise<ResponseProducts> => {
  try {
    const queryParams = new URLSearchParams();

    if (brandSlug) queryParams.append("brands", brandSlug);
    if (categorySlug) queryParams.append("category", categorySlug);

    // ✅ soportar múltiples subcategorías
    if (subcategorySlug) {
      if (Array.isArray(subcategorySlug)) {
        subcategorySlug.forEach((slug) =>
          queryParams.append("subcategory", slug)
        );
      } else {
        queryParams.append("subcategory", subcategorySlug);
      }
    }

    queryParams.append("page", page.toString());

    const response = await fetch(
      `${apiUrl}/api/v2.0/products/list/?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error(
            "The requested resource could not be found. Not Found 404"
          );
        case 500:
          throw new Error("Internal Server Error 500.");
        default:
          throw new Error(`Unexpected error: ${response.status}`);
      }
    }

    const data: ResponseProducts = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product list: ", error);
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }
};

/**
 * Fetches a list of products based on the provided search parameters.
 *
 * @param {Object} params - The search parameters.
 * @param {string} params.query - The search query string.
 * @param {string} [params.brandSlug] - Optional slug for filtering by brand.
 * @param {string} [params.categorySlug] - Optional slug for filtering by category.
 * @param {string} [params.subcategorySlug] - Optional slug for filtering by subcategory.
 * @param {number} [params.page=1] - The page number for pagination (default is 1).
 * @returns {Promise<ResponseProducts>} A promise that resolves to the product search results.
 *
 * @throws {Error} Throws an error if the response status is not OK (e.g., 404 or 500).
 *
 * @example
 * const products = await getProductSearch({
 *   query: "laptop",
 *   brandSlug: "brand-x",
 *   categorySlug: "electronics",
 *   page: 2,
 * });
 * console.log(products);
 */
export const getProductSearch = async ({
  query,
  brandSlugs,
  categorySlugs,
  subcategorySlugs,
  page = 1,
}: {
  query: string;
  brandSlugs?: string[]; // ahora es un array
  categorySlugs?: string[]; // ahora es un array
  subcategorySlugs?: string[]; // ahora es un array
  page?: number;
}): Promise<ResponseProducts> => {
  try {
    const queryParams = new URLSearchParams();

    if (query) queryParams.set("search", query ?? "");

    if (brandSlugs && brandSlugs.length > 0) {
      brandSlugs.forEach((slug) => queryParams.append("brand", slug));
    }

    if (categorySlugs && categorySlugs.length > 0) {
      categorySlugs.forEach((slug) => queryParams.append("category", slug));
    }

    if (subcategorySlugs && subcategorySlugs.length > 0) {
      subcategorySlugs.forEach((slug) =>
        queryParams.append("subcategory", slug)
      );
    }

    queryParams.append("page", page.toString());

    const response = await fetch(
      `${apiUrl}/api/v2.0/products/search/?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error(
            "The requested resource could not be found. Not Found 404"
          );
        case 500:
          throw new Error("Internal Server Error 500.");
        default:
          throw new Error(`Unexpected error: ${response.status}`);
      }
    }

    const data: ResponseProducts = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product search: ", error);
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }
};
