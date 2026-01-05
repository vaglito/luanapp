import { JWT } from "next-auth/jwt";
import { Role } from "@/config/roles";

export function getUserRoles(token: JWT): Role[] {
  const roles: Role[] = [];

  if (token.isAdmin) roles.push("ADMIN");
  if (token.isStaff) roles.push("STAFF");
  if (token.isSeller) roles.push("SELLER");
  if (token.isTechnician) roles.push("TECHNICIAN");
  if (token.isCustomer) roles.push("CUSTOMER");

  return roles;
}
