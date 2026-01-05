import { Role, ROLE_PERMISSIONS } from "@/config/roles";

export function hasPermission(
  userRoles: Role[],
  permission: string
): boolean {
  return userRoles.some((role) => {
    const perms = ROLE_PERMISSIONS[role];
    return perms.includes("*") || perms.includes(permission);
  });
}
