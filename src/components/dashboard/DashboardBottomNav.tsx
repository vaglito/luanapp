"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { User } from "next-auth";

interface DashboardBottomNavProps {
  user: User;
  onMenuClick: () => void;
}

export function DashboardBottomNav({ user, onMenuClick }: DashboardBottomNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Determine dynamic third action based on role
  let dynamicAction = {
    label: "Facturas",
    icon: <ReceiptIcon />,
    path: "/dashboard/invoices",
  };

  if (user.isSeller || user.isAdmin || user.isSuperuser) {
    dynamicAction = {
      label: "Ventas",
      icon: <ShoppingCartIcon />,
      path: "/dashboard/sales",
    };
  } else if (user.isTechnician) {
    dynamicAction = {
      label: "Servicio",
      icon: <EngineeringIcon />,
      path: "/dashboard/tech",
    };
  }

  // Handle navigation internally so BottomNavigation can use standard 'value' logic
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === "menu") {
      onMenuClick();
    } else {
      router.push(newValue);
    }
  };

  // Determine which tab is technically active.
  // If the pathname isn't one of the bottom bar keys, we set value to false so nothing is highlighted.
  const validPaths = ["/dashboard", "/dashboard/profile", dynamicAction.path];
  const activeValue = validPaths.includes(pathname) ? pathname : false;

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: "block", sm: "none" },
        zIndex: 1100, // Stay above standard page content but below modals
        borderTop: "1px solid",
        borderColor: "divider",
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={activeValue}
        onChange={handleChange}
        sx={{
          "& .MuiBottomNavigationAction-root": {
            minWidth: "auto",
            px: 1,
            "&.Mui-selected": {
              color: "primary.main",
            },
          },
        }}
      >
        <BottomNavigationAction
          label="Inicio"
          value="/dashboard"
          icon={<DashboardIcon />}
        />
        <BottomNavigationAction
          label="Perfil"
          value="/dashboard/profile"
          icon={<PersonIcon />}
        />
        <BottomNavigationAction
          label={dynamicAction.label}
          value={dynamicAction.path}
          icon={dynamicAction.icon}
        />
        <BottomNavigationAction
          label="Menú"
          value="menu"
          icon={<MenuIcon />}
          // Even if not strictly the active route, this is just an action trigger
          sx={{ color: "text.secondary" }}
        />
      </BottomNavigation>
    </Paper>
  );
}
