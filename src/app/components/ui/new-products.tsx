import { Typography, Box } from "@mui/material";
import { SliderProduct } from "../product/slider-product";
import { Product } from "@/app/types/v2/products-type";
import { CardProduct } from "../product/card-product";

export const NewProducts = ({ products }: { products: Product[] }) => {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.5rem" }}>
        <Typography variant="h1" sx={{
            fontSize: "2.0rem",
            fontWeight: "bold",
            color: "#333",
        }}>Nuevos Ingresos</Typography>
      </Box>
      <Box>
        <SliderProduct products={products} Component={CardProduct} />
      </Box>
    </Box>
  );
};
