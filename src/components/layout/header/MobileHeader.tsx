"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  IconButton,
  Drawer,
  InputBase,
  Avatar,
  Badge,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/navigation";
import { DrawerMobile } from "./drawer";
import { useCart } from "@/hooks/use-cart";
import { CartDrawer } from "../../cart/CartDrawer";
import { Session } from "next-auth";
import { Brands } from "@/types/brands.type";

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
];

interface MobileHeaderProps {
  logo: string;
  exchange: number;
  brands: Brands[];
  session: Session | null;
}

export function MobileHeader({ logo, exchange, session }: MobileHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");
  // Prevent hydration mismatch: cart state lives in localStorage (client-only)
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const cart = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only show real count after client hydration to avoid SSR mismatch
  const itemCount = mounted ? cart.items.length : 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/buscar?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <>
      {/* ═══════════════════════════════════════
          ROW 1: Hamburger | Logo | Cart | Avatar
      ═══════════════════════════════════════ */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 1.5,
          py: 1,
          gap: 1,
        }}
      >
        {/* ── Hamburger ── */}
        <IconButton
          onClick={() => setMenuOpen(true)}
          size="small"
          aria-label="Abrir menú"
          sx={{
            flexShrink: 0,
            color: "primary.main",
            bgcolor: "rgba(107,33,168,0.08)",
            borderRadius: 1.5,
            p: 0.75,
            "&:hover": { bgcolor: "rgba(107,33,168,0.15)" },
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>

        {/* ── Logo ── */}
        <Link href="/" style={{ flexShrink: 0 }}>
          <Image
            src={logo}
            alt="Corporación Luana"
            width={140}
            height={44}
            style={{ width: "auto", height: 36, objectFit: "contain" }}
            priority
          />
        </Link>

        {/* ── Spacer ── */}
        <Box sx={{ flexGrow: 1 }} />

        {/* ── Cart button ── */}
        <IconButton
          size="small"
          onClick={() => setCartOpen(true)}
          aria-label="Carrito de compras"
          sx={{
            flexShrink: 0,
            border: "1.5px solid",
            borderColor: "divider",
            borderRadius: 1.5,
            p: 0.75,
          }}
        >
          <Badge
            badgeContent={itemCount}
            color="secondary"
            overlap="circular"
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "0.6rem",
                minWidth: 16,
                height: 16,
                p: "2px",
              },
            }}
          >
            <ShoppingCartIcon fontSize="small" />
          </Badge>
        </IconButton>

        {/* ── Avatar / Login ── */}
        {session ? (
          <Link href="/dashboard" style={{ flexShrink: 0 }}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 34,
                height: 34,
                fontSize: "0.9rem",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 0 0 2px rgba(107,33,168,0.2)",
              }}
            >
              {session.user?.name?.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        ) : (
          <Link href="/login" style={{ textDecoration: "none", flexShrink: 0 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: "primary.main",
                border: "1.5px solid",
                borderColor: "primary.main",
                borderRadius: 1.5,
                px: 1.5,
                py: 0.5,
                lineHeight: 1,
              }}
            >
              Ingresar
            </Typography>
          </Link>
        )}
      </Box>

      {/* ═══════════════════════════════════════
          ROW 2: Search bar
      ═══════════════════════════════════════ */}
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: "flex",
          alignItems: "center",
          mx: 1.5,
          mb: 1,
          px: 1.5,
          py: 0.75,
          borderRadius: 2,
          bgcolor: "grey.100",
          border: "1.5px solid transparent",
          transition: "border-color 0.2s, background 0.2s",
          "&:focus-within": {
            borderColor: "primary.light",
            bgcolor: "white",
            boxShadow: "0 0 0 3px rgba(107,33,168,0.08)",
          },
        }}
      >
        <SearchIcon
          sx={{ fontSize: 18, color: "text.disabled", mr: 1, flexShrink: 0 }}
        />
        <InputBase
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          sx={{
            fontSize: "0.875rem",
            color: "text.primary",
            "& input::placeholder": { color: "text.disabled", opacity: 1 },
          }}
          inputProps={{ "aria-label": "Buscar productos" }}
        />
      </Box>

      {/* ═══════════════════════════════════════
          DRAWERS
      ═══════════════════════════════════════ */}
      <Drawer
        variant="temporary"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ "& .MuiDrawer-paper": { width: 260 } }}
      >
        <DrawerMobile
          navlinks={navlinks}
          onNavigate={() => setMenuOpen(false)}
        />
      </Drawer>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        exchange={exchange}
      />
    </>
  );
}
