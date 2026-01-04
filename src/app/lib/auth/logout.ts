import { signOut, getSession } from "next-auth/react";
import { axiosAuth } from "../axios";

export async function logout() {
  const session = await getSession();

  try {
    if (session?.user.refreshToken) {
      await axiosAuth.post("v2.0/auth/logout/", {
        refresh: session.user.refreshToken,
      });
    }
  } catch (error) {
    console.error("Backend logout failed", error);
  } finally {
    await signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  }
}
