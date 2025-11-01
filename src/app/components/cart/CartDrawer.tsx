"use client";
import { Drawer, Box, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "@/app/hooks/use-cart";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items } = useCart();

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: {xs: "100vw", sm: 450}, padding: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" fontWeight={600}>Tu carrito</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />
        {items.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No hay productos en el carrito.
          </Typography>
        ) : (
          <>
            {items.map((item) => (
              <CartItem key={item.id} product={item} />
            ))}
            <Divider sx={{ my: 2 }} />
            <CartSummary />
          </>
        )}
      </Box>
    </Drawer>
  );
}