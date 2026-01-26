import apiClient from "./apiClient";
import {
  typeComputerDetail,
  typeResponse,
  Computer,
} from "../types/computer.type";

export async function fetchComputerType() {
  try {
    const response = await apiClient.get("/api/computer/type-computer/");
    return response.data;
  } catch (error) {
    throw new Error("Failed fetch Computer Type");
  }
}

export async function fetchComputerSerieList(
  slug: string
): Promise<typeResponse<Computer>> {
  try {
    const response = await apiClient.get(
      `/api/computer/computer-serie/?type=${slug}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed fetch Computer Serie");
  }
}

export async function fetchComputer(serie: number) {
  try {
    const response = await apiClient.get(
      `/api/computer/computer/list/?serie=${serie}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed fetch Computer");
  }
}

export async function fetchComputerDetail(
  slug: string
): Promise<typeComputerDetail> {
  try {
    const response = await apiClient.get(
      `/api/computer/computer/detail/${slug}/`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed fetch Computer Detail");
  }
}
