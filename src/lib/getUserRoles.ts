import { Role } from "@/config/roles";

interface UserFlags {
  isAdmin?: boolean | null;
  isStaff?: boolean | null;
  isSeller?: boolean | null;
  isTechnician?: boolean | null;
  isEditor?: boolean | null;
  isCustomer?: boolean | null;
}

export function getUserRoles(token: UserFlags): Role[] {
  const roles: Role[] = [];

  if (token.isAdmin) roles.push("ADMIN");
  if (token.isStaff) roles.push("STAFF");
  if (token.isSeller) roles.push("SELLER");
  if (token.isTechnician) roles.push("TECHNICIAN");
  if (token.isEditor) roles.push("EDITOR");
  if (token.isCustomer) roles.push("CUSTOMER");

  return roles;
}
