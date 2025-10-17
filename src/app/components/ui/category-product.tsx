"use client"
import {  useRouter } from "next/navigation";
import { Box, Typography, Container, Button } from "@mui/material";
import { CardLaptop } from "../product/CardLaptop/card-laptop";
import { CardProduct } from "../product/card-product";
import { Product } from "@/app/types/v2/products-type";
import { SliderProduct } from "../product/slider-product";

export const SectionLaptop = ({ products }: { products: Product[] }) => {
  const router = useRouter();

  const handleFilter = (subcategory: string) => {
    router.push(`/buscar?query=laptop&subcategoria=${subcategory}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingY: "1.0rem",
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
            Busca tu Laptop ideal
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "1.0rem",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Encuentra la laptop perfecta para tus necesidades, ya sea para
            trabajo, estudio o entretenimiento.
          </Typography>
        </Box>
        <Box
          sx={{
            margin: "1.0rem 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: "1.0rem",
          }}
        >
          <Button
            variant="contained"
            color="info"
            onClick={() => handleFilter("laptop-c-video-integrada")}
          >
            Laptop con video Integradas
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => handleFilter("laptop-cvideo-dedicada")}
          >
            Laptop con video dedicadas
          </Button>
          <Button
          variant="text"
            onClick={() => router.push("/buscar?query=laptop")}
            sx={{
              color: "#fff",
              fontSize: "1.0rem",
              textAlign: "center",
            }}
          >
            Ver más
          </Button>
        </Box>
        <Box>
          <SliderProduct products={products} Component={CardProduct} />
        </Box>
      </Container>
    </Box>
  );
};