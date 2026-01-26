import { useSession } from "next-auth/react";

export function usePermissions() {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";

  const roles = {
    isAdmin: session?.user.isAdmin ?? false,
    isStaff: session?.user.isStaff ?? false,
    isCustomer: session?.user.isCustomer ?? false,
    isSeller: session?.user.isSeller ?? false,
  };

  return {
    isLoading,
    ...roles,
    isAuthenticated: status === "authenticated",
  };
}
