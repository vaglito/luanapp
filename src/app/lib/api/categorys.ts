import { Categorys } from "../../types/v2/categorys-type";

const apiUrl = process.env.API_URL;

export const getCategoryList = async (): Promise<Categorys[]> => {
  try {
    const response = await fetch(`${apiUrl}/api/v2.0/categorys/list/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
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

    const data: Categorys[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories: ", error);
    return [];
  }
};

export const fetchCategoriesSearch = async (query: string) => {
  try {
    //await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await fetch(
      `${apiUrl}/api/v2.0/categorys/search?search=${query}`,
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
          throw new Error("Internal Server Error 500");
        default:
          throw new Error(`Unexpected error: ${response.status}`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCategoriesSubCategoriesBrand = async (brand: string) => {
  try {
    const response = await fetch(
      `${apiUrl}/api/v2.0/categorys/brand/?brand=${brand}`,
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
            "The requested resources could not be found. Not Found 404."
          );
        case 500:
          throw new Error("Internal Server Error 500");
        default:
          throw new Error(`Unexpected error: ${response.status}`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      "Fetch data request error could not be connect server. " + error
    );
  }
};
