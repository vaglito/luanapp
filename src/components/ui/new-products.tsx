
import { Typography, Box } from "@mui/material";
import { SliderProduct } from "../product/slider-product";
import { Products } from "@/types/products.type";
import { CardProduct } from "../product/card-product";

export const NewProducts = ({
  products,
  exchange,
}: {
  products: Products[];
  exchange: number;
}) => {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 800,
              mb: 1,
              background: "linear-gradient(45deg, #1a237e 30%, #534bae 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Nuevos Ingresos
          </Typography>
          <Box>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{
                maxWidth: "600px",
                fontSize: { xs: "1rem", md: "1.1rem" },
              }}
            >
              Descubre los últimos lanzamientos y actualizaciones de nuestro catálogo.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <SliderProduct
          products={products}
          Component={CardProduct}
          exchange={exchange}
        />
      </Box>
    </Box>
  );
};

