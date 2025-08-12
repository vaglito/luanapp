import { Typography, Box } from "@mui/material";
import { SliderProduct } from "../product/slider-product";
import { Product } from "@/app/types/v2/products-type";
import { CardProduct } from "../product/card-product";

export const NewProducts = ({ products }: { products: Product[] }) => {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" color="#545454" sx={{ fontWeight: "bold" }}>
            Nuevos Ingresos
          </Typography>
          <Box>
            <Typography
              color="#545454"
              sx={{
                fontSize: 18,
              }}
            >
              Consigue productos recien ingresados.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <SliderProduct products={products} Component={CardProduct} />
      </Box>
    </Box>
  );
};
