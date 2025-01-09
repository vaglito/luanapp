import { Container, Box, Typography, Grid2 } from "@mui/material";
import { getListBrands } from "../utils/brands";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Marcas | Corporacion Luana",
  description: "Listado de marcas",
};

export default async function BrandPage() {
  const brands = await getListBrands();

  return (
    <Container maxWidth="xl">
      <Box marginY={4}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
            }}
          >
            Nuestras marcas
          </Typography>
        </Box>
        <Box marginY={4}>
          <Grid2 container spacing={2}>
            {brands.map((brand) => (
              <Grid2
                size={{ xs: 6, sm: 4, md: 3, lg: 2, xl: 2 }}
                sx={{
                  boxShadow: 3,
                  borderRadius: 3,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
                key={brand.id}
              >
                <Box sx={{ p: 2 }}>
                  <Link href={`/marcas/${brand.slug}`}>
                    <Box>
                      <Image
                        src={brand.image}
                        alt={`Imagen de la marca ${brand.sopsub2.nom_sub2}`}
                        width={200}
                        height={200}
                        className="h-auto w-auto rounded-xl"
                      />
                    </Box>
                    <Typography sx={{ textAlign: "center" }}>
                      {brand.sopsub2.nom_sub2}
                    </Typography>
                  </Link>
                </Box>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Box>
    </Container>
  );
}
