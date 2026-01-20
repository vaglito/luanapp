"use client"
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
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ flexShrink: 0 }}>
          <Image
            src={imageSrc}
            alt={productName}
            width={80}
            height={80}
            style={{ objectFit: "cover", borderRadius: 8 }}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {productName}
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
              disabled={product.quantity >= maxStock}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>

          <Typography variant="body2" color="text.secondary" mt={1}>
            Precio unitario: <strong>${unitPriceUSD.toFixed(2)}</strong> - S/.{" "}
            <strong>{unitPricePEN.toFixed(2)}</strong>
          </Typography>

          {useOfferPrice && !isComputer && (
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
