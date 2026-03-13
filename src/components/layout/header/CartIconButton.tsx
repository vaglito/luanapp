
"use client";
import { useState, useEffect } from "react";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "@/hooks/use-cart";
import { CartDrawer } from "../../cart/CartDrawer";

export function CartIconButton({ exchange }: { exchange: number }) {
  const [openCart, setOpenCart] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <IconButton
        sx={{ border: "1px solid #ddd", borderRadius: 2, p: { xs: 0.5, md: 1 } }}
        disabled
      >
        <ShoppingCartIcon sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }} />
      </IconButton>
    );
  }

  return (
    <>
      <IconButton
        onClick={() => setOpenCart(true)}
        sx={{ border: "1px solid #ddd", borderRadius: 2, p: { xs: 0.5, md: 1 } }}
      >
        <Badge badgeContent={cart.items.length} color="secondary">
          <ShoppingCartIcon sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }} />
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

