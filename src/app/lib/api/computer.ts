import {
  typeResponse,
  typeComputer,
  typeComputerSerie,
  Computer,
  typeComputerDetail
} from "../../types/v2/computer-type";

const API_URL = process.env.API_URL;

export const fetchComputerSerieList = async (slug: string) => {
  try {
    const response = await fetch(
      `${API_URL}/api/v2.0/computers/computer-serie/?type=${slug}`,
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
          throw new Error("Error 404: the endpoint not exists.");
        case 500:
          throw new Error("Error 500: Internal error");
        default:
          throw new Error(`Unexpected error ${response.status}`);
      }
    }

    const data: typeResponse<typeComputerSerie> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchComputer = async (serie: number) => {
  try {
    const response = await fetch(
      `${API_URL}/api/v2.0/computers/computer/list/?serie=${serie}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data: typeResponse<Computer> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchComputerDetail = async (slug: string) => {
  try {
    const response = await fetch(
      `${API_URL}/api/v2.0/computers/computer/detail/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data: typeComputerDetail = await response.json()
    return data;
  } catch (error) {
    console.error(error);
  }
};
