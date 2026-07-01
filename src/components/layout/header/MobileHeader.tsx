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
  Skeleton,
  alpha,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalPlayIcon from "@mui/icons-material/LocalPlay"; // 👈 Ícono del Sorteo
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { DrawerMobile } from "./drawer";
import { useCart } from "@/hooks/use-cart";
import { CartDrawer } from "../../cart/CartDrawer";
import { Session } from "next-auth";
import { Brands } from "@/types/brands.type";

// 1. Actualizamos el navlinks para que concuerde con la versión Desktop
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
  isLoading?: boolean;
}

export function MobileHeader({
  logo,
  exchange,
  session,
  isLoading,
}: MobileHeaderProps) {
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const cart = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = mounted ? cart.items.length : 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/buscar?query=${encodeURIComponent(query.trim())}`);
    }
  };

  const isAuthPage = pathname === "/login" || pathname === "/registro";
  const displaySession = isAuthPage ? null : session;

  useEffect(() => {
    if (session && isAuthPage) {
      signOut({ redirect: false }).then(() => {
        router.refresh();
      });
    }
  }, [session, isAuthPage, router]);

  return (
    <>
      {/* ═══════════════════════════════════════
          ROW 1: Hamburger | Logo | PARTICIPA | Cart | Avatar
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
          size="medium"
          onClick={() => setCartOpen(true)}
          aria-label="Carrito de compras"
          sx={{ flexShrink: 0, p: 0.75 }}
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
            <ShoppingCartOutlinedIcon fontSize="inherit" />
          </Badge>
        </IconButton>

        {/* ── Avatar / Login ── */}
        {isLoading ? (
          <Skeleton
            variant="circular"
            width={34}
            height={34}
            sx={{ flexShrink: 0 }}
          />
        ) : displaySession ? (
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
              {displaySession.user?.name?.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        ) : (
          <IconButton component={Link} href="/login" size="large">
            <PersonOutlineOutlinedIcon color="primary" fontSize="inherit" />
          </IconButton>
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
        anchor="left"
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100vw", sm: 450 },
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            backgroundColor: alpha(theme.palette.primary.main, 0.9),
          },
        }}
      >
        <DrawerMobile
          navlinks={navlinks}
          onClose={() => setMenuOpen(false)}
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
