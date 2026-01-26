import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SettingsIcon from "@mui/icons-material/Settings";
import StoreIcon from "@mui/icons-material/Store";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { DashboardMenuSection } from "@/types/dashboard-menu";

export const DASHBOARD_MENU: DashboardMenuSection[] = [
  {
    section: "General",
    items: [
      {
        label: "Panel",
        href: "/dashboard",
        icon: <DashboardIcon />,
        permission: "profile.update",
      },
      {
        label: "Configuración",
        href: "/dashboard/settings",
        icon: <SettingsIcon />,
        permission: "profile.update",
      },
    ],
  },
  {
    section: "Ventas",
    items: [
      {
        label: "Pedidos",
        href: "/dashboard/orders",
        icon: <ShoppingBagIcon />,
        permission: "orders.manage",
      },
      {
        label: "Proformas",
        href: "/dashboard/seller",
        icon: <StoreIcon />,
        permission: "products.manage",
      },
    ],
  },
  {
    section: "Administración",
    items: [
      {
        label: "Administración",
        href: "/dashboard/admin",
        icon: <AdminPanelSettingsIcon />,
        permission: "*",
      },
    ],
  },
];

