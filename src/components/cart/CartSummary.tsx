"use client"
import { Box, Typography, Button, Stack } from "@mui/material";
import { useCart } from "@/hooks/use-cart";
import { convertUsdToPen } from "@/lib/currency";
import { generateProformaPDF } from "@/utils/pdf-proforma";

export function CartSummary({ exchange }: { exchange: number }) {
  const { items, removeAll } = useCart();

  const totalUSD = items.reduce((sum, item) => {
    const price =
      item.relay.priceBulk > 0 ? item.relay.priceBulk : item.relay.priceSale;
    return sum + price * item.quantity;
  }, 0);

  const totalPEN = convertUsdToPen(totalUSD, exchange);

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={1}>
        Resumen del carrito
      </Typography>

      <Typography variant="body1" mb={2}>
        Total: <strong>${totalUSD.toFixed(2)}</strong> -{" "}
        <strong>S/. {totalPEN.toFixed(2)}</strong>
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button variant="contained" fullWidth color="success" onClick={() => generateProformaPDF(items, exchange)}>
          Descargar Proforma
        </Button>
        <Button variant="outlined" color="error" fullWidth onClick={removeAll}>
          Vaciar carrito
        </Button>
      </Stack>
    </Box>
  );
}

