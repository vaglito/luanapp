import { useSession } from "next-auth/react";
import { getUserRoles } from "../lib/getUserRoles";
import { hasPermission } from "../lib/hasPermission";

export function useAuthorization() {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";

  const roles = session ? getUserRoles(session.user as any) : [];

  function can(permission: string) {
    return hasPermission(roles, permission);
  }

  return {
    isLoading,
    roles,
    can,
    isAuthenticated: status === "authenticated",
  };
}