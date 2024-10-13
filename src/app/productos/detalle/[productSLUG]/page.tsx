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

  return (
    <Container maxWidth="xl">
      <Box sx={{ marginY: 6 }}>
        <Grid2 container spacing={4}>
          <Grid2 size={{ md: 5 }}>
            {product.productimage_set.map((image, index) => (
              <Box key={index}>
                <Image
                  src={image.images}
                  alt={`Imagen de ${capitalizeText(product.sopprod.nom_prod)}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "80%", height: "auto" }}
                />
              </Box>
            ))}
          </Grid2>
          <Grid2 size={{ md: 7 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {capitalizeText(product.sopprod.nom_prod)}
              </Typography>
              <Divider />
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "row", gap: 1, marginY: 1, width: "100%" }}
            >
              <Box sx={{ bgcolor: "#f0f0f0", borderRadius: 2, p: 1, width: "50%" }}>
                <Box dangerouslySetInnerHTML={{ __html: product.resumen }} />
              </Box>
              <Box sx={{ p: 1, width: "50%" }}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ color: "primary.main", fontWeight: 600 }}
                  >
                    Precio
                  </Typography>
                  <Box>
                    <Typography>
                      $
                      {
                        product.sopprod.cod_prod_relation_precios[0]
                          .precio_decimal
                      }{" "}
                      o S/
                      {
                        product.sopprod.cod_prod_relation_precios[0]
                          .precio_local
                      }
                    </Typography>
                    <Typography>
                      Ahorra pagando con efectivo o transferencia
                    </Typography>
                    <AddToCard />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}
