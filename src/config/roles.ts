export type Role =
  | "ADMIN"
  | "STAFF"
  | "SELLER"
  | "TECHNICIAN"
  | "EDITOR"
  | "CUSTOMER";

export const ROLE_ROUTES: Record<string, Role[]> = {
  "/dashboard/admin": ["ADMIN"],
  "/dashboard/staff": ["ADMIN", "STAFF"],
  "/dashboard/seller": ["ADMIN", "SELLER"],
  "/dashboard/editor": ["ADMIN", "EDITOR"],
  "/dashboard/technician": ["ADMIN", "TECHNICIAN"],
  "/dashboard/customer": ["CUSTOMER"],
};