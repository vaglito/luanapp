import { cache } from "react";
import apiClient from "../apiPublic";
import { Exchange } from "../../types/exchange.type";

export const fetchExchangeRate = cache(
  async (): Promise<Exchange> => {
    try {
      const response = await apiClient.get<Exchange>(
        "/api/relay/relay-exchange/"
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch exchange");
    }
  }
);
