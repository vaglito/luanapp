import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { auth, signOut } from "@/auth";
import { refreshAccessToken } from "./auth/refresh-token";

const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY

export const axiosAuth = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": `${API_KEY}`,
  },
});

axiosAuth.interceptors.request.use(
  async (config) => {
    const session = await auth();

    if (session?.user.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) promise.reject(error);
    else promise.resolve(token!);
  });

  failedQueue = [];
};

axiosAuth.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // No es 401 → error normal
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // Si ya se está refrescando, encolar request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosAuth(originalRequest));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const session = await auth();

      if (!session?.user?.refreshToken) {
        throw new Error("No refresh token available");
      }

      const newAccessToken = await refreshAccessToken(
        session.user.refreshToken
      );

      if (!newAccessToken) {
        throw new Error("Failed to refresh access token");
      }

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosAuth(originalRequest);
    } catch (err) {
      processQueue(err, null);
      await signOut({ redirect: true });
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);