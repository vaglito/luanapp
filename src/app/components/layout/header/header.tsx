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
  Skeleton,
  Divider,
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
import { Brands } from "@/app/types/brands.type";

interface HeaderProps {
  logo: string;
  exchange: number;
  brands: Brands[]
}

export function Header({ logo, exchange, brands }: HeaderProps) {
  const cart = useCart();
  const [openCart, setOpenCart] = useState(false);

  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 2, md: 3 },
            py: 2,
          }}
        >
          {/* LOGO */}
          <Box
            sx={{
              flexShrink: 0,
              alignSelf: { xs: "center", md: "flex-start" },
            }}
          >
            <Link href="/">
              <Image
                src={logo}
                alt="Logo"
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: 360,
                }}
                priority
              />
            </Link>
          </Box>

          {/* SEARCH (CENTRADO REAL) */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 600 }}>
              <Suspense fallback={<Skeleton height={40} />}>
                <Search />
              </Suspense>
            </Box>
          </Box>

          {/* ACTIONS */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flexShrink: 0,
            }}
          >
            <IconButton
              onClick={() => setOpenCart(true)}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <Badge badgeContent={cart.items.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <Divider orientation="vertical" flexItem />

            {status === "loading" ? (
              <Skeleton variant="rounded" width={120} height={36} />
            ) : isAuthenticated ? (
              <HeaderUserMenu />
            ) : (
              <>
                <Button
                  variant="text"
                  startIcon={<LoginIcon />}
                  component={Link}
                  href="/login"
                >
                  Ingresar
                </Button>

                <Button
                  variant="contained"
                  startIcon={<PersonIcon />}
                  component={Link}
                  href="/register"
                  sx={{ borderRadius: 2 }}
                >
                  Crear cuenta
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Container>

      <Navbar brands={brands}/>
      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
        exchange={exchange}
      />
    </Box>
  );
}
