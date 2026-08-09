import axios from "axios";
import { env } from "@/lib/env";

const apiClient = axios.create({
  baseURL: env.API_URL,
  headers: {
    "x-api-key": env.API_KEY,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
