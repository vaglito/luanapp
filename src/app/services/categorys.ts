import { Categorys } from "../types/v2/categorys-type";

const apiUrl = process.env.API_URL;

export const getCategoryList = async (): Promise<Categorys[]> => {
  try {
    const response = await fetch(`${apiUrl}/api/v2.0/categorys/list/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if(!response.ok) {
        switch (response.status) {
            case 404:
                throw new Error("The requested resource could not be found. Not Found 404");
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
