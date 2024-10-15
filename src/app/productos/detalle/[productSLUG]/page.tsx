import Image from "next/image";
import Link from "next/link";
import {
  Container,
  Typography,
  Grid2,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { fetchProductDetail } from "@/app/utils/products";
import { AddToCard } from "@/app/ui/product/detail/Addtocard";
import { StockDisplay } from "@/app/ui/product/detail/StockDisplay";
import { ProductSpecifications1 } from "@/app/ui/product/detail/ProductSpecifications";
import { ProductImageCarousel } from "@/app/ui/product/detail/ProductImageCarousel";

interface ProductDetailProps {
  params: {
    productSLUG: string;
  };
}
// Función para capitalizar la primera letra de cada palabra
function capitalizeText(text: string) {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function ProductDetailPage({
  params,
}: ProductDetailProps) {
  const { productSLUG } = params;
  const product = await fetchProductDetail(productSLUG);

  const specifications = {
    Socket: "LGA1700",
    RAM: "5200MHZ, 5600MHZ, 600MHZ DDR5",
    peso: "500g",
    material: "Aluminio",
    modelo: "ABC123",
    garantia: "1 año",
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ marginY: 6 }}>
        <Grid2 container spacing={1}>
          <Grid2 size={{ md: 5 }}>
            <ProductImageCarousel product={product} />
          </Grid2>
          <Grid2 size={{ md: 7 }}>
            <Box
              sx={{
                margin: "20px auto",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 1, textAlign: "center" }}
              >
                {capitalizeText(product.sopprod.nom_prod)}
              </Typography>
              <Divider sx={{ marginBottom: "20px" }} />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  marginY: 2,
                  justifyContent: "space-between",
                }}
              >
                {/* Resumen del producto */}
                <Box
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: 3,
                    padding: 2,
                    flex: 1,
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Descripción
                  </Typography>
                  <Box
                    dangerouslySetInnerHTML={{ __html: product.resumen }}
                  />
                </Box>

                {/* Precio y opciones */}
                <Box sx={{ flex: 1, padding: 2 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "primary.main",
                      fontWeight: 600,
                      mb: 1,
                      textAlign: "center",
                    }}
                  >
                    Precio
                  </Typography>

                  {/* Estilo del precio sin fondo */}
                  <Box
                    sx={{
                      textAlign: "center",
                      mb: 2,
                      position: "relative",
                      "&:before": {
                        content: '""',
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        bottom: "-10px",
                        width: "80%",
                        height: "2px",
                        backgroundColor: "primary.main",
                      },
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        color: "primary.main",
                        letterSpacing: "1px",
                      }}
                    >
                      S/
                      {
                        product.sopprod.cod_prod_relation_precios[0]
                          .precio_local
                      }
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 500,
                        color: "#757575",
                      }}
                    >
                      o $
                      {
                        product.sopprod.cod_prod_relation_precios[0]
                          .precio_decimal
                      }
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{ mt: 1, color: "gray", textAlign: "center" }}
                  >
                    Ahorra pagando con efectivo o transferencia
                  </Typography>

                  {/* Componente AddToCard */}
                  <Box sx={{ mt: 2 }}>
                    <StockDisplay stock={product.sopprod.stock_index} />
                    <AddToCard />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
        <ProductSpecifications1 specifications={product.description} />
      </Box>
    </Container>
  );
}
