"use client";
import { useState, useEffect } from "react";
import { IconButton, Badge, alpha, useTheme } from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCart } from "@/hooks/use-cart";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function CartIconButton({ exchange }: { exchange: number }) {
  const [openCart, setOpenCart] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cart = useCart();
  const theme = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <IconButton disabled size="large">
        <ShoppingCartOutlinedIcon fontSize="inherit" />
      </IconButton>
    );
  }

  const count = cart.items.length;

  return (
    <>
      <IconButton
        onClick={() => setOpenCart(true)}
        size="large"
        aria-label={`Carrito de compras${count > 0 ? `, ${count} productos` : ""}`}
        sx={{
          position: "relative",
          color: "primary.main",
          bgcolor: alpha(theme.palette.primary.main, 0.06),
          borderRadius: 1.5,
          p: 1,
          transition: "all 0.2s",
          "&:hover": {
            bgcolor: alpha(theme.palette.primary.main, 0.12),
            transform: "scale(1.05)",
          },
        }}
      >
        <Badge
          badgeContent={count}
          color="secondary"
          overlap="circular"
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "0.65rem",
              minWidth: 18,
              height: 18,
              fontWeight: 700,
            },
          }}
        >
          <ShoppingCartOutlinedIcon />
        </Badge>
      </IconButton>
      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
        exchange={exchange}
      />
    </>
  );
}
