"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { DrawerMobile } from "./drawer";
import { Brands } from "@/app/types/brands.type";

interface Props {
  window?: () => Window;
  brands: Brands[]
}

const navlinks = [
  { id: 1, title: "Inicio", path: "/" },
  { id: 2, title: "Marcas", path: "/marcas" },
  { id: 3, title: "Nuestra Empresa", path: "/sobre-nosotros" },
  {
    id: 4,
    title: "Busca tu comprobante",
    path: "https://see.corporacionluana.pe/",
    external: true,
  },
];

const drawerWidth = 260;

export function Navbar({ window }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <CssBaseline />

      <AppBar
        component="nav"
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "primary.main",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Toolbar sx={{ minHeight: 56 }}>
          {/* MOBILE MENU ICON */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" }, mr: 1 }}
            aria-label="Open navigation menu"
          >
            <MenuIcon />
          </IconButton>

          {/* DESKTOP MENU */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: 1,
            }}
          >
            {navlinks.map((link) => {
              const isActive = pathname === link.path;

              return (
                <Button
                  key={link.id}
                  component={Link}
                  href={link.path}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  sx={{
                    color: "#fff",
                    fontWeight: 500,
                    borderRadius: 2,
                    px: 2,
                    backgroundColor: isActive
                      ? "rgba(255,255,255,0.15)"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                    },
                  }}
                >
                  {link.title}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        <DrawerMobile
          navlinks={navlinks}
          onNavigate={() => setMobileOpen(false)}
        />
      </Drawer>
    </Box>
  );
}
