import apiClient from "./apiClient";
import { Exchange } from "../types/exchange.type";

export async function fetchExchangeRate(): Promise<Exchange> {
  try {
    const response = await apiClient.get<Exchange>(
      "/api/relay/relay-exchange/"
    );
    
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch exchange");
  }
}
