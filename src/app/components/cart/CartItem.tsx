import { Box, Typography, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import { Products } from "@/app/types/products.type";
import { useCart } from "@/app/hooks/use-cart";

interface CartItemProps {
  product: Products & { quantity: number };
}

export function CartItem({ product }: CartItemProps) {
  const { removeItem, updatedItemQuantity } = useCart();

  const useOfferPrice = product.relay.priceBulk > 0;
  const unitPrice = useOfferPrice
    ? product.relay.priceBulk
    : product.relay.priceSale;
  const subtotal = unitPrice * product.quantity;


  const handleChange = (delta: number) => {
    const newQty = product.quantity + delta;
    updatedItemQuantity(product.id, newQty);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Image
        src={product.productsimages[0]?.images}
        alt={product.relay.productName}
        width={60}
        height={60}
        style={{ objectFit: "cover", borderRadius: 8 }}
      />
      <Box sx={{ ml: 2, flexGrow: 1 }}>
        <Typography variant="body1">{product.relay.productName}</Typography>
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
                style: { width: 50, textAlign: "center" },
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

        <Typography variant="body2" color="text.secondary">
          Precio unit.$ {unitPrice.toFixed(2)}
        </Typography>
        {useOfferPrice && (
          <Typography variant="caption" color="success.main">
            Oferta activa: (antes $ {product.relay.priceSale.toFixed(2)})
          </Typography>
        )}
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ fontWeight: 600 }}
        >
          Subtotal: $ {subtotal.toFixed(2)}
        </Typography>
      </Box>
      <IconButton onClick={() => removeItem(product.id)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}
