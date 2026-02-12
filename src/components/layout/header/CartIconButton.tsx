
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
        sx={{ border: "1px solid #ddd", borderRadius: 2 }}
        disabled
      >
        <ShoppingCartIcon />
      </IconButton>
    );
  }

  return (
    <>
      <IconButton
        onClick={() => setOpenCart(true)}
        sx={{ border: "1px solid #ddd", borderRadius: 2 }}
      >
        <Badge badgeContent={cart.items.length} color="secondary">
          <ShoppingCartIcon />
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

