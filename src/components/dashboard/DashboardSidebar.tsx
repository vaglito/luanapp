"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
} from "@mui/material";

// Iconos
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import EngineeringIcon from "@mui/icons-material/Engineering";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import { User } from "next-auth";

const SIDEBAR_WIDTH = 280;

interface DashboardSidebarProps {
  user: User;
  onCloseMobile?: () => void;
}

export const DashboardSidebar = ({ user, onCloseMobile }: DashboardSidebarProps) => {
  const pathname = usePathname();

  const menuConfig = [
    {
      title: "General",
      items: [
        {
          label: "Panel Principal",
          icon: <DashboardIcon />,
          path: "/dashboard",
          visible: true,
        },
        {
          label: "Mi Perfil",
          icon: <PeopleIcon />, // Using PeopleIcon here as PersonIcon was not imported yet, saving a new import line, both are suitable.
          path: "/dashboard/profile",
          visible: true,
        },
        {
          label: "Mis Facturas",
          icon: <ReceiptIcon />,
          path: "/dashboard/invoices",
          visible: true,
        },
      ],
    },
    {
      title: "Administración",
      items: [
        {
          label: "Usuarios",
          icon: <PeopleIcon />,
          path: "/dashboard/users",
          visible: user?.isAdmin,
        },
        {
          label: "Configuración",
          icon: <SettingsIcon />,
          path: "/dashboard/settings",
          visible: user?.isAdmin,
        },
      ],
    },
    {
      title: "Operaciones",
      items: [
        {
          label: "Ventas",
          icon: <ShoppingCartIcon />,
          path: "/dashboard/sales",
          visible: user?.isAdmin || user?.isSeller,
        },
        {
          label: "Proformas",
          icon: <AssignmentIcon />,
          path: "/dashboard/proformas",
          visible: user?.isAdmin || user?.isSeller,
        },
        {
          label: "Ordenes",
          icon: <LocalShippingIcon />,
          path: "/dashboard/ordenes",
          visible: user?.isAdmin || user?.isSeller,
        },
        {
          label: "Servicio Técnico",
          icon: <EngineeringIcon />,
          path: "/dashboard/tech",
          visible: user?.isAdmin || user?.isTechnician,
        },
      ],
    },
  ];

  return (
    <Box
      component="nav"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      {/* Menú Dinámico */}
      <Box sx={{ overflowY: "auto", flexGrow: 1, px: 2, py: 3 }}>
        {menuConfig.map((group) => {
          const visibleItems = group.items.filter((i) => i.visible);
          if (visibleItems.length === 0) return null;

          return (
            <Box key={group.title} sx={{ mb: 3 }}>
              <Typography
                variant="caption"
                sx={{
                  px: 2,
                  fontWeight: 700,
                  color: "text.secondary",
                  textTransform: "uppercase",
                }}
              >
                {group.title}
              </Typography>
              <List>
                {visibleItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                      <Link
                        href={item.path}
                        onClick={() => onCloseMobile?.()}
                        style={{
                          textDecoration: "none",
                          width: "100%",
                          color: "inherit",
                        }}
                      >
                        <ListItemButton
                          selected={isActive}
                          sx={{
                            borderRadius: "8px",
                            "&.Mui-selected": {
                              bgcolor: "primary.light",
                              color: "white",
                              "&:hover": { bgcolor: "primary.light" },
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              color: isActive ? "white" : "inherit",
                              minWidth: 40,
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                              fontSize: "0.85rem",
                              fontWeight: isActive ? 600 : 500,
                            }}
                          />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          );
        })}
      </Box>

      {/* Footer con info de usuario */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            p: 2,
            bgcolor: "grey.50",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 32,
              height: 32,
              fontSize: "1rem",
            }}
          >
            {user?.name?.[0]}
          </Avatar>
          <Box sx={{ overflow: "hidden" }}>
            <Typography variant="body2" fontWeight="700" noWrap>
              {user?.name}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
              display="block"
            >
              {user?.isAdmin ? "Administrador" : user?.isSuperuser ? "Superadmin" : user?.isSeller ? "Vendedor" : user?.isTechnician ? "Técnico" : user?.isEditor ? "Editor" : user?.isCustomer ? "Cliente" : "Staff"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
