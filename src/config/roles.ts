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

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  ADMIN: ["*"],
  STAFF: ["dashboard.view", "orders.view", "orders.manage"],
  SELLER: ["orders.manage", "products.manage"],
  TECHNICIAN: ["tickets.view", "tickets.update"],
  EDITOR: ["desboard.view", "products.manage"],
  CUSTOMER: ["orders.view", "profile.update"],
};
