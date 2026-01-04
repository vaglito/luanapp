"use client";

import Link from "next/link";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SettingsIcon from "@mui/icons-material/Settings";

const menu = [
  { label: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
  { label: "Pedidos", href: "/dashboard/orders", icon: <ShoppingBagIcon /> },
  {
    label: "Configuración",
    href: "/dashboard/settings",
    icon: <SettingsIcon />,
  },
];

export function DashboardSidebar() {
  return (
    <Box sx={{ width: 200, bgcolor: "white"}}>
      <Box sx={{ p: 2, fontWeight: 700 }}>Mi Cuenta</Box>

      <List>
        {menu.map((item) => (
          <Link key={item.href} href={item.href}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  );
}
