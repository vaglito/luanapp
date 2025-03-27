import { Box, Typography, Container, Grid2 } from "@mui/material";
import { CardLaptop } from "../product/CardLaptop/card-laptop";
import { Product } from "@/app/types/v2/products-type";
import { SliderProduct } from "../product/slider-product";

export const SectionLaptop = ({ products }: { products: Product[] }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.0rem",
        margin: "1.0rem 0",
        background: "linear-gradient(to top right, #5914A3, #A3147F)",
        borderRadius: "0.5rem",
      }}
    >
      <Container maxWidth="xl">
        <Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: "2.0rem",
              fontWeight: "bold",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Busca tú Laptop ideal
          </Typography>
        </Box>
        <Box>
            <SliderProduct products={products} Component={CardLaptop}/>
        </Box>
      </Container>
    </Box>
  );
};
