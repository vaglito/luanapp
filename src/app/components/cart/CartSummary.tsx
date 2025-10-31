import { Box, Typography, Button } from "@mui/material";
import { useCart } from "@/app/hooks/use-cart";

export function CartSummary() {
  const { items } = useCart();
  const total = items.reduce((sum, item) => sum + item.relay.priceSale, 0);

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Total: $ {total.toFixed(2)}
      </Typography>
      <Button variant="contained" fullWidth>
        Ir al checkout
      </Button>
    </Box>
  );
}