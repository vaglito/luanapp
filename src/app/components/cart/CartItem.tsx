import { Box, Typography, IconButton, TextField, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import { Products } from "@/app/types/products.type";
import { useCart } from "@/app/hooks/use-cart";
import { convertUsdToPen } from "@/app/lib/currency";

interface CartItemProps {
  product: Products & { quantity: number };
  exchange: number;
}

export function CartItem({ product, exchange }: CartItemProps) {
  const { removeItem, updatedItemQuantity } = useCart();

  const useOfferPrice = product.relay.priceBulk > 0;
  const unitPriceUSD = useOfferPrice
    ? product.relay.priceBulk
    : product.relay.priceSale;
  const unitPricePEN = convertUsdToPen(unitPriceUSD, exchange);
  const subtotalUSD = unitPriceUSD * product.quantity;
  const subtotalPEN = convertUsdToPen(subtotalUSD, exchange);

  const handleChange = (delta: number) => {
    const newQty = product.quantity + delta;
    updatedItemQuantity(product.id, newQty);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ flexShrink: 0 }}>
          <Image
            src={product.productsimages[0]?.images}
            alt={product.relay.productName}
            width={80}
            height={80}
            style={{ objectFit: "cover", borderRadius: 8 }}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {product.relay.productName}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <IconButton
              onClick={() => handleChange(-1)}
              size="small"
              disabled={product.quantity <= 1}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <TextField
              value={product.quantity}
              size="small"
              slotProps={{
                input: {
                  readOnly: true,
                  style: { width: 40, textAlign: "center" },
                },
              }}
            />
            <IconButton
              onClick={() => handleChange(1)}
              size="small"
              disabled={product.quantity >= product.relay.totalStock}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>

          <Typography variant="body2" color="text.secondary" mt={1}>
            Precio unitario: <strong>${unitPriceUSD.toFixed(2)}</strong> - S/.{" "}
            <strong>{unitPricePEN.toFixed(2)}</strong>
          </Typography>

          {useOfferPrice && (
            <Typography variant="caption" color="success.main">
              Oferta activa (antes ${product.relay.priceSale.toFixed(2)})
            </Typography>
          )}

          <Typography variant="body2" fontWeight={600} mt={0.5}>
            Subtotal: ${subtotalUSD.toFixed(2)} - S/. {subtotalPEN.toFixed(2)}
          </Typography>
        </Box>

        <Box sx={{ alignSelf: "flex-start" }}>
          <IconButton onClick={() => removeItem(product.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}
