"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Button } from "@mui/material";

const navlinks = [
  { id: 1, title: "Productos", path: "/productos" },
  { id: 2, title: "Marcas", path: "/marcas" },
  { id: 3, title: "Servicio Técnico", path: "/servicio-tecnico" },
  { id: 4, title: "Sobre Nosotros", path: "/sobre-nosotros" },
  {
    id: 5,
    title: "Comprobante",
    path: "https://see.corporacionluana.pe/",
    external: true,
  },
];

export function DesktopNavLinks() {
  const pathname = usePathname();

  return (
    <Box sx={{ display: "flex", gap: 0.5 }}>
      {navlinks.map((link) => {
        const isActive = link.path === pathname;
        return (
          <Button
            key={link.id}
            component={Link}
            href={link.path}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            sx={{
              color: "white",
              fontWeight: isActive ? 700 : 500,
              borderRadius: 2,
              px: 2,
              textTransform: "none",
              fontSize: "0.9rem",
              backgroundColor: isActive ? "rgba(255,255,255,0.15)" : "transparent",
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
  );
}
