"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@mui/material";
import { AppBar, Box, Drawer, Toolbar, Button, alpha } from "@mui/material";
import LocalPlayIcon from "@mui/icons-material/LocalPlay"; // 👈 Ícono de ticket de sorteo

import { DrawerMobile } from "./drawer";
import { Brands } from "@/types/brands.type";

interface Props {
  window?: () => Window;
  brands: Brands[];
}

// 1. Agregamos la propiedad 'isCTA' (Call To Action) al nuevo enlace
const navlinks = [
  { id: 1, title: "Inicio", path: "/" },
  { id: 2, title: "Marcas", path: "/marcas" },
  { id: 3, title: "Nuestra Empresa", path: "/sobre-nosotros" },
  { id: 4, title: "Servicio Técnico", path: "/servicio-tecnico" },
  {
    id: 5,
    title: "Busca tu comprobante",
    path: "https://see.corporacionluana.pe/",
    external: true,
  },
  { 
    id: 6, 
    title: "¡Participa y Gana!", 
    path: "/participa", 
    isCTA: true // 👈 Esta bandera cambiará todo el diseño
  },
];

const drawerWidth = 260;

export function Navbar({ window }: Props) {
  const theme = useTheme();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      {/* DESKTOP PURPLE NAVBAR only */}
      <AppBar
        component="nav"
        position="static"
        elevation={0}
        sx={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          backgroundColor: alpha(theme.palette.primary.main, 0.95),
        }}
      >
        <Toolbar sx={{ minHeight: 48, justifyContent: "center" }}>
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
            {navlinks.map((link) => {
              const isActive = pathname === link.path;
              
              return (
                <Button
                  key={link.id}
                  component={Link}
                  href={link.path}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  // 2. Si es el CTA, le agregamos el ícono a la izquierda
                  startIcon={link.isCTA ? <LocalPlayIcon /> : undefined}
                  sx={{
                    // --- Lógica de Color de Texto ---
                    color: link.isCTA ? theme.palette.primary.main : "white",
                    fontWeight: link.isCTA ? 800 : (isActive ? 700 : 500),
                    borderRadius: 2,
                    px: link.isCTA ? 2.5 : 2,
                    textTransform: "none",
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease-in-out",
                    
                    // --- Lógica de Fondo y Sombras ---
                    backgroundColor: link.isCTA
                      ? "#FFD700" // Dorado llamativo
                      : isActive
                      ? "rgba(255,255,255,0.15)"
                      : "transparent",
                      
                    boxShadow: link.isCTA 
                      ? "0 4px 14px 0 rgba(255, 215, 0, 0.39)" 
                      : "none",

                    // --- Lógica de Hover ---
                    "&:hover": {
                      backgroundColor: link.isCTA 
                        ? "#FFEA00" // Un amarillo más brillante al pasar el mouse
                        : "rgba(255,255,255,0.2)",
                      transform: link.isCTA ? "translateY(-2px)" : "none",
                      boxShadow: link.isCTA 
                        ? "0 6px 20px rgba(255, 215, 0, 0.6)" 
                        : "none",
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
    </Box>
  );
}