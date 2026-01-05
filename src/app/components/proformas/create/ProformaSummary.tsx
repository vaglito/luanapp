import { Box, Typography, Divider } from "@mui/material";

export function ProformaSummary({ subtotal }: { subtotal: number }) {
  return (
    <Box sx={{ p: 2, border: "1px solid #eee", borderRadius: 2 }}>
      <Typography fontWeight={700}>Resumen</Typography>

      <Divider sx={{ my: 1 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Total</Typography>
        <Typography fontWeight={700}>
          $ {subtotal.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
}
