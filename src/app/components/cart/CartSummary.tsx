import { Box, Typography, Button } from "@mui/material";
import { useCart } from "@/app/hooks/use-cart";
import { convertUsdToPen } from "@/app/lib/currency";

export function CartSummary() {
  const { items, removeAll } = useCart();
  const exchange = 3.75;

  const totalUSD = items.reduce((sum, item) => {
    const price =
      item.relay.priceBulk > 0 ? item.relay.priceBulk : item.relay.priceSale;
    return sum + price * item.quantity;
  }, 0);

  const totalPEN = convertUsdToPen(totalUSD, exchange)

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Total: $ {totalUSD.toFixed(2)} - S/ {totalPEN}
      </Typography>
      <Button variant="contained">Ir al checkout</Button>
      <Button variant="contained" color="error" onClick={() => removeAll()}>
        Eliminar todo el carrito
      </Button>
    </Box>
  );
}
