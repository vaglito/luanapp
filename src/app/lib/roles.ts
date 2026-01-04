import { Session } from "next-auth";

export function getUserRoles(session: Session): string[] {
  const roles: string[] = [];

  if (session.user.isAdmin) roles.push("ADMIN");
  if (session.user.isStaff) roles.push("STAFF");
  if (session.user.isSeller) roles.push("SELLER");
  if (session.user.isTechnician) roles.push("TECHNICIAN");
  if (session.user.isEditor) roles.push("EDITOR");
  if (session.user.isCustomer) roles.push("CUSTOMER");

  return roles;
}