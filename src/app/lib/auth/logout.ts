import { auth, signOut } from "@/auth";
import { axiosAuth } from "../axios";

export async function logout() {
  const session = await auth();

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
    });
  }
}
