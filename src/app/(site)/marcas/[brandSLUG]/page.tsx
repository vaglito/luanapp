import {
  Container,
  Box,
  Typography,
  Button,
  Grid2,
  Divider,
} from "@mui/material";
import { fetchListProductBrand } from "@/app/utils/brands";
import { ProductChart } from "@/app/ui/product-chart";

export const generateMetadata = ({
  params,
}: {
  params: { brandSLUG: string };
}) => {
  return {
    title: `Marca ${params.brandSLUG} | Corporación Luana`,
    description: `Productos de la marca ${params.brandSLUG} en Corporación Luana.`,
  };
};

interface BrandDetailProps {
  params: {
    brandSLUG: string;
  };
  searchParams: {
    page?: string;
  };
}

export const revalidate = 0;

export default async function BrandDetail({
  params,
  searchParams,
}: BrandDetailProps) {
  const currentPage = parseInt(searchParams.page || "1", 20);

  const { results, count } = await fetchListProductBrand(
    params.brandSLUG,
    currentPage
  );

  const totalPages = Math.ceil(count / 20);

  return (
    <>
      <Container maxWidth="xl">
        <Grid2 container spacing={2}>
          <Grid2 size={{ md: 2 }}>
            <Box marginY={4}>
              <Typography variant="h4">Categorias</Typography>
              <Box></Box>
            </Box>
          </Grid2>
          <Grid2 size={{ md: 10 }}>
            <Box marginY={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4">
                  Productos{" "}
                  <span className="uppercase">{params.brandSLUG}</span>
                </Typography>
                <Typography>{count} productos encontrados</Typography>
              </Box>
              <Divider sx={{ marginY: 2 }} />
              <Box>
                {results && results.length > 0 ? (
                  <>
                    <ProductChart products={results} />

                    <Box display="flex" justifyContent="center" mt={3}>
                      {Array.from({ length: totalPages }, (_, index) => (
                        <Button
                          key={index + 1}
                          variant="outlined"
                          color={
                            currentPage === index + 1 ? "primary" : "secondary"
                          }
                          href={`?&page=${index + 1}`}
                          sx={{ mx: 0.5 }}
                        >
                          {index + 1}
                        </Button>
                      ))}
                    </Box>
                  </>
                ) : (
                  <Typography>No hay productos para mostrar</Typography>
                )}
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
