import axios from "axios";

const API_URL = process.env.API_URL;

const apiClient = axios.create({
  baseURL: `${API_URL}`,
  headers: {
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
