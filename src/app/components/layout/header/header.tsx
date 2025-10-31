"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Container, Button, IconButton, Badge } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Navbar } from "./navbar";
import { Search } from "../search";
import { useCart } from "@/app/hooks/use-cart";
import { CartDrawer } from "../../cart/CartDrawer";

interface HeaderProps {
  logo: string;
}

export function Header({ logo }: HeaderProps) {
  const cart = useCart();
  const [openCart, setOpenCart] = useState(false);
  const toggleCart = () => setOpenCart((prev) => !prev);

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
          <Box sx={{ width: { sm: "100%", xs: "100%", md: "30%" } }}>
            <Link href="/">
              <Image
                src={logo}
                width={0}
                height={0}
                alt="Logo de corporacion luana"
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                priority={true}
              />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, marginY: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Suspense fallback={<div>Loading search...</div>}>
                <Search />
              </Suspense>
            </Box>
          </Box>
          <Box>
            <Box sx={{ display: "flex", gap: 4 }}>
              <IconButton
                color="primary"
                aria-label="abrir carrito"
                onClick={toggleCart}
              >
                <Badge badgeContent={cart.items.length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <Button variant="outlined" startIcon={<LoginIcon />}>
                Iniciar sesión
              </Button>
              <Button variant="contained" startIcon={<PersonIcon />}>
                Crear Cuenta
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Navbar />
      <CartDrawer open={openCart} onClose={toggleCart} /> {/* ✅ aquí se integra */}
    </Box>
  );
}
