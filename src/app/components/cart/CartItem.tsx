import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import { Products } from "@/app/types/products.type";
import { useCart } from "@/app/hooks/use-cart";

export function CartItem({ product }: { product: Products }) {
  const { removeItem } = useCart();

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
        <Typography variant="body2" color="text.secondary">
          ${product.relay.priceSale}
        </Typography>
      </Box>
      <IconButton onClick={() => removeItem(product.id)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}