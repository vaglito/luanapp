import { Container, Typography, Grid2, Box, Divider } from "@mui/material";
import { fetchProductDetail } from "@/app/utils/products";
import { AddToCard } from "@/app/ui/product/detail/Addtocard";
import { StockDisplay } from "@/app/ui/product/detail/StockDisplay";
import {
  ProductSpecifications,
  ProductSpecifications1,
} from "@/app/ui/product/detail/ProductSpecifications";
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

export const revalidate = 0;

export default async function ProductDetailPage({
  params,
}: ProductDetailProps) {
  const { productSLUG } = params;
  const product = await fetchProductDetail(productSLUG);

  const precioOriginal =
    product.sopprod.cod_prod_relation_precios[0].precio_decimal;
  const precioLocalOriginal =
    product.sopprod.cod_prod_relation_precios[0].precio_local;
  const precioOferta =
    product.sopprod.cod_prod_relation_precios[0].precio_oferta_d;
  const precioLocalOferta =
    product.sopprod.cod_prod_relation_precios[0].precio_oferta;
  const porcentajeDescuento =
    precioOferta > 0
      ? ((precioOriginal - precioOferta) / precioOriginal) * 100
      : 0;

  return (
    <Container maxWidth="xl">
      <Box sx={{ marginY: 6 }}>
        <Grid2 container spacing={2}>
          {/* Carrusel de imágenes */}
          <Grid2 size={{ xs: 12, md: 5 }}>
            <ProductImageCarousel product={product} />
          </Grid2>

          {/* Detalles del producto */}
          <Grid2 size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                margin: { xs: "10px auto", md: "20px auto" },
                padding: { xs: 2, md: 4 },
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 1, textAlign: "center" }}
              >
                {product.sopprod.nom_prod}
              </Typography>
              <Divider sx={{ marginBottom: "20px" }} />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
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
                  <Typography>Codigo: {product.sopprod.cod_prod}</Typography>
                  <Typography>
                    Marca: {product.sopprod.cod_subc.nom_sub2}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mt: 2 }}>
                    Descripción
                  </Typography>
                  <Box dangerouslySetInnerHTML={{ __html: product.resumen }} />
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

                  <Box sx={{ textAlign: "center", mb: 2 }}>
                    {precioOferta > 0 ? (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 1,
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
                          sx={{
                            textDecoration: "line-through",
                            color: "GrayText",
                            fontSize: "18px",
                          }}
                        >
                          ${precioOriginal.toFixed(2)} (S/
                          {precioLocalOriginal.toFixed(2)})
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "success.main",
                            fontWeight: "bold",
                            fontSize: "18px",
                          }}
                        >
                          -{porcentajeDescuento.toFixed(1)}% de descuento
                        </Typography>
                        <Typography
                          variant="h3"
                          sx={{
                            fontWeight: 800,
                            color: "primary.main",
                            letterSpacing: "1px",
                          }}
                        >
                          S/{precioLocalOferta.toFixed(2)}
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 500,
                            color: "#757575",
                          }}
                        >
                          o ${precioOferta.toFixed(2)}
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        sx={{
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
                          S/{precioLocalOriginal.toFixed(2)}
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 500,
                            color: "#757575",
                          }}
                        >
                          o ${precioOriginal.toFixed(2)}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{ mt: 1, color: "gray", textAlign: "center" }}
                  >
                    Ahorra pagando con efectivo o transferencia
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <StockDisplay stock={product.sopprod.stock_index} />
                    <AddToCard title={product.sopprod.nom_prod} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid2>
        </Grid2>

        {product.specs ? (
          <ProductSpecifications specifications={product.specs} />
        ) : (
          <ProductSpecifications1 specifications={product.description} />
        )}
      </Box>
    </Container>
  );
}
