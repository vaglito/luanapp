"use client"
import { Box, Typography, IconButton, TextField, Divider, Tooltip, alpha, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import { Products } from "@/types/products.type";
import { useCart } from "@/hooks/use-cart";
import { convertUsdToPen } from "@/lib/currency";

interface CartItemProps {
  product: Products & { quantity: number };
  exchange: number;
}

export function CartItem({ product, exchange }: CartItemProps) {
  const { removeItem, updatedItemQuantity } = useCart();

  // Compatibilidad para Items tipo Computer que no tienen 'relay'
  const isComputer = !product.relay;
  // @ts-ignore
  const computerItem = product as any;

  const productName = isComputer ? computerItem.title : product.relay.productName;

  let unitPriceUSD = 0;
  let useOfferPrice = false;

  if (isComputer) {
    unitPriceUSD = computerItem.totalPrice || 0;
  } else {
    useOfferPrice = product.relay.priceBulk > 0;
    unitPriceUSD = useOfferPrice ? product.relay.priceBulk : product.relay.priceSale;
  }

  const unitPricePEN = convertUsdToPen(unitPriceUSD, exchange);
  const subtotalUSD = unitPriceUSD * product.quantity;
  const subtotalPEN = convertUsdToPen(subtotalUSD, exchange);

  const imageSrc = isComputer
    ? (computerItem.image || "/not-found.png")
    : (product.productsimages?.[0]?.images || "/not-found.png");

  const maxStock = isComputer ? 5 : product.relay.totalStock; // Limit stock for computers if unknown

  const handleChange = (delta: number) => {
    const newQty = product.quantity + delta;
    updatedItemQuantity(product.id, newQty);
  };

  return (
    <Box 
      sx={{ 
        mb: 2, 
        p: 2, 
        borderRadius: 2, 
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: alpha('#000', 0.02),
          borderColor: 'primary.light',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }
      }}
    >
      <Stack direction="row" spacing={2}>
        <Image
          src={imageSrc}
          alt={productName}
          width={110}
          height={110}
          style={{ objectFit: "cover", borderRadius: 12, backgroundColor: '#f5f5f5' }}
        />

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2} mb={1}>
            {productName}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }}>
            {/* Quantity Selector Control */}
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              border: '1px solid', 
              borderColor: 'divider',
              borderRadius: '20px',
              p: 0.5,
              bgcolor: 'background.paper'
            }}>
              <IconButton
                onClick={() => handleChange(-1)}
                size="small"
                disabled={product.quantity <= 1}
                sx={{ color: 'primary.main' }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography sx={{ width: 30, textAlign: 'center', fontWeight: 600 }}>
                {product.quantity}
              </Typography>
              <IconButton
                onClick={() => handleChange(1)}
                size="small"
                disabled={product.quantity >= maxStock}
                sx={{ color: 'primary.main' }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Unit: ${unitPriceUSD.toFixed(2)} / S/. {unitPricePEN.toFixed(2)}
              </Typography>
              <Typography variant="body2" fontWeight={700} color="primary.main">
                Subtotal: ${subtotalUSD.toFixed(2)} / S/. {subtotalPEN.toFixed(2)}
              </Typography>
            </Box>
          </Stack>

          {useOfferPrice && !isComputer && (
            <Box sx={{ mt: 1, display: 'inline-flex', bgcolor: 'success.light', px: 1, borderRadius: 1 }}>
              <Typography variant="caption" sx={{ color: 'success.contrastText', fontWeight: 600 }}>
                OFERTA: antes ${product.relay.priceSale.toFixed(2)}
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ alignSelf: "flex-start" }}>
          <Tooltip title="Eliminar del carrito" arrow>
            <IconButton 
              onClick={() => removeItem(product.id)} 
              sx={{ color: 'error.light', '&:hover': { color: 'error.main', bgcolor: alpha('#f44336', 0.08) } }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
    </Box>
  );
}
