import axios from "axios";
import { JWT } from "next-auth/jwt";
import { signOut } from "next-auth/react";

interface RefreshResponse {
  access: string;
}
const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY
export async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const res = await axios.post<RefreshResponse>(
      `${API_URL}/api/v2.0/auth/login/refresh/`,
      { refresh: token.refreshToken, },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${API_KEY}`,
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
