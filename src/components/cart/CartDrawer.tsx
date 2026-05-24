"use client";
import { Drawer, Box, Typography, IconButton, Divider, alpha } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  exchange: number;
}

export function CartDrawer({ open, onClose, exchange }: CartDrawerProps) {
  const { items } = useCart();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          backgroundColor: alpha("#fff", 0.9),
        },
      }}
    >
      <Box
        sx={{
          width: { xs: "100vw", sm: 700 },
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Tu carrito
          </Typography>
          <IconButton onClick={onClose} color="primary">
            <CloseIcon />
          </IconButton>
        </Box>
        {items.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No hay productos en el carrito.
          </Typography>
        ) : (
          <>
            {items.map((item) => (
              <CartItem key={item.id} product={item} exchange={exchange} />
            ))}
            <CartSummary exchange={exchange} />
          </>
        )}
      </Box>
    </Drawer>
  );
}
