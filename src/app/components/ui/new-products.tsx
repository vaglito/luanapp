import { Typography, Box } from "@mui/material";
import { SliderProduct } from "../product/slider-product";
import { Products } from "@/app/types/products.type";
import { CardProduct } from "../product/card-product";

export const NewProducts = ({ products, exchange }: { products: Products[], exchange: number }) => {
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
        <SliderProduct products={products} Component={CardProduct} exchange={exchange}/>
      </Box>
    </Box>
  );
};
