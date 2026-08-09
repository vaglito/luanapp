"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Menu,
  Box,
  Typography,
  Grid2,
  alpha,
  useTheme,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CategoryIcon from "@mui/icons-material/Category";
import ComputerIcon from "@mui/icons-material/Computer";
import MemoryIcon from "@mui/icons-material/Memory";
import LaptopIcon from "@mui/icons-material/Laptop";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import { Brands } from "@/types/brands.type";

// Static fallback categories — dynamic ones come from backend via props
const defaultCategories = [
  { name: "Laptops", slug: "laptops", icon: <LaptopIcon /> },
  { name: "Computadoras", slug: "computadoras", icon: <ComputerIcon /> },
  { name: "Componentes", slug: "componentes", icon: <MemoryIcon /> },
  { name: "Accesorios", slug: "accesorios", icon: <DevicesOtherIcon /> },
];

interface CategoryDropdownProps {
  brands: Brands[];
}

export function CategoryDropdown({ brands }: CategoryDropdownProps) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<KeyboardArrowDownIcon />}
        startIcon={<CategoryIcon />}
        sx={{
          color: "white",
          fontWeight: 600,
          fontSize: "0.95rem",
          textTransform: "none",
          borderRadius: 2,
          px: 2,
          "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
        }}
      >
        Categorías
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              p: 3,
              minWidth: 600,
              maxWidth: 700,
              borderRadius: 3,
              background: alpha("#fff", 0.95),
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.5)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <Typography
          variant="overline"
          sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: 1, mb: 2, display: "block" }}
        >
          Categorías de Productos
        </Typography>

        <Grid2 container spacing={3}>
          {/* Categorías */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "primary.main" }}>
              Productos
            </Typography>
            {defaultCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/productos/${cat.slug}`}
                style={{ textDecoration: "none" }}
                onClick={() => setAnchorEl(null)}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    py: 0.75,
                    px: 1.5,
                    borderRadius: 1.5,
                    transition: "all 0.15s",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <Box sx={{ color: "primary.main", display: "flex" }}>{cat.icon}</Box>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary" }}>
                    {cat.name}
                  </Typography>
                </Box>
              </Link>
            ))}
          </Grid2>

          {/* Marcas destacadas */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "secondary.main" }}>
              Marcas
            </Typography>
            {brands.slice(0, 8).map((brand) => (
              <Link
                key={brand.id}
                href={`/marcas/${brand.relay.brands}`}
                style={{ textDecoration: "none" }}
                onClick={() => setAnchorEl(null)}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    py: 0.5,
                    px: 1.5,
                    borderRadius: 1.5,
                    transition: "all 0.15s",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.secondary.main, 0.08),
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary" }}>
                    {brand.relay.brandName}
                  </Typography>
                </Box>
              </Link>
            ))}
          </Grid2>
        </Grid2>
      </Menu>
    </>
  );
}
