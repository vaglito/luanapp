"use client";
import { useState, useEffect } from "react";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCart } from "@/hooks/use-cart";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function CartIconButton({ exchange }: { exchange: number }) {
  const [openCart, setOpenCart] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cart = useCart();

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

  return (
    <>
      <IconButton onClick={() => setOpenCart(true)} size="large">
        <Badge badgeContent={cart.items.length} color="secondary">
          <ShoppingCartOutlinedIcon fontSize="inherit" />
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
