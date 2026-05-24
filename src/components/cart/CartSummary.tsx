"use client"
import { Box, Typography, Stack, Divider } from "@mui/material";
import { useCart } from "@/hooks/use-cart";
import { convertUsdToPen } from "@/lib/currency";
import { generateProformaPDF } from "@/utils/pdf-proforma";
import { MyButton } from "../ui/Buttons/Buttons";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';

export function CartSummary({ exchange }: { exchange: number }) {
  const { items, removeAll } = useCart();

  const totalUSD = items.reduce((sum, item) => {
    const price =
      item.relay.priceBulk > 0 ? item.relay.priceBulk : item.relay.priceSale;
    return sum + price * item.quantity;
  }, 0);

  const totalPEN = convertUsdToPen(totalUSD, exchange);

  return (
    <Box sx={{ mt: 4, pt: 2 }}>
      <Divider sx={{ mb: 3, borderStyle: 'dashed' }} />
      
      <Typography variant="h6" fontWeight={700} mb={2} textTransform="uppercase" letterSpacing={1}>
        Resumen de Compra
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="body1" color="text.secondary">Total USD</Typography>
          <Typography variant="h6" fontWeight={700}>
            ${totalUSD.toFixed(2)}
          </Typography>
        </Box>
        
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body1" color="text.secondary">Total PEN (T.C. {exchange})</Typography>
          <Typography variant="h6" fontWeight={700} color="primary.main">
            S/. {totalPEN.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      <Stack 
        direction={{ xs: "column", sm: "row" }} 
        spacing={2} 
        sx={{ mt: 2 }}
      >
        <MyButton 
          customVariant="checkout" 
          fullWidth 
          onClick={() => generateProformaPDF(items, exchange)}  
          endIcon={<FileDownloadIcon />}
          sx={{ py: 1.5 }}
        >
          Descargar Proforma
        </MyButton>
        <MyButton 
          customVariant="alert" 
          color="error" 
          fullWidth 
          onClick={removeAll} 
          endIcon={<DeleteIcon />}
          sx={{ py: 1.5 }}
        >
          Vaciar carrito
        </MyButton>
      </Stack>
    </Box>
  );
}
