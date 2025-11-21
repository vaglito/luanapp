import axios from "axios";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const apiClient = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "Authorization": `Api-Key ${API_KEY}`,
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
