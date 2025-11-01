import { Box, Typography, Button } from "@mui/material";
import { useCart } from "@/app/hooks/use-cart";

export function CartSummary() {
  const { items, removeAll } = useCart();
  const total = items.reduce((sum, item) => {
    const price =
      item.relay.priceBulk > 0 ? item.relay.priceBulk : item.relay.priceSale;
    return sum + price * item.quantity;
  }, 0);

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Total: $ {total.toFixed(2)}
      </Typography>
      <Button variant="contained">Ir al checkout</Button>
      <Button variant="contained" color="error" onClick={() => removeAll()}>
        Eliminar todo el carrito
      </Button>
    </Box>
  );
}
