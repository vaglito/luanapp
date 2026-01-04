import axios from "axios";
import { JWT } from "next-auth/jwt";
import { signOut } from "next-auth/react";

interface RefreshResponse {
  access: string;
}

export async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const res = await axios.post<RefreshResponse>(
      "http://localhost:8000/api/v2.0/auth/login/refresh/",
      { refresh: token.refreshToken, },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "RUC9TfgQ.1gjQczBKXzHuvXD8utSVTURBiX6moaMG",
        },
      }
    );

    return {
      ...token,
      accessToken: res.data.access,
    };
  } catch (error) {
    await signOut({ redirect: true });
    return {
      ...token,
      accessToken: "",
      error: "RefreshAccessTokenError",
    };
  }
}
