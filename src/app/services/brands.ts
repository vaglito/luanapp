import { ResponseBrands } from "../types/v2/brands-type";

const apiUrl = process.env.API_URL;


export const fetchBrandSearch = async (query?: string): Promise<ResponseBrands> => {
  try {
    //await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await fetch(
      `${apiUrl}/api/v2.0/brands/search/?search=${query}`,
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
          throw new Error("The requested resource could not be found.");
        case 500:
          throw new Error("Internal server error 500.");
        default:
          throw new Error(`Unexpected error ${response.status}.`);
      };
    };
    const data: ResponseBrands = await response.json();
    return data;
  } catch (error) {
    throw new Error("Fetch data request error could not be connect server." + error)
  }
};
