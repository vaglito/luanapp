"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Container,
  Button,
  IconButton,
  Badge,
  Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useSession } from "next-auth/react";

import { Navbar } from "./navbar";
import { Search } from "../search";
import { useCart } from "@/app/hooks/use-cart";
import { CartDrawer } from "../../cart/CartDrawer";
import { HeaderUserMenu } from "./HeaderUserMenu";

interface HeaderProps {
  logo: string;
  exchange: number;
}

export function Header({ logo, exchange }: HeaderProps) {
  const cart = useCart();
  const [openCart, setOpenCart] = useState(false);
  const toggleCart = () => setOpenCart((prev) => !prev);

  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";

  return (
    <Box component="header" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            paddingY: 2,
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Box sx={{ width: { sm: "100%", md: "30%" } }}>
            <Link href="/">
              <Image
                src={logo}
                width={0}
                height={0}
                alt="Logo"
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                priority
              />
            </Link>
          </Box>

          {/* Search */}
          <Box sx={{ flexGrow: 1, marginY: 1 }}>
            <Suspense fallback={<div>Loading search...</div>}>
              <Search />
            </Suspense>
          </Box>

          {/* Actions */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <IconButton color="primary" onClick={toggleCart}>
              <Badge badgeContent={cart.items.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* AUTH SECTION */}
            {isAuthenticated ? (
              <HeaderUserMenu />
            ) : (
              <>
                <Button
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  component={Link}
                  href="/login"
                >
                  Iniciar sesión
                </Button>

                <Button
                  variant="contained"
                  startIcon={<PersonIcon />}
                  component={Link}
                  href="/register"
                >
                  Crear Cuenta
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Container>

      <Navbar />
      <CartDrawer open={openCart} onClose={toggleCart} exchange={exchange} />
    </Box>
  );
}
