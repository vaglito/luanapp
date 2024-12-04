import { Container, Box } from "@mui/material";
import { getBannerList } from "../utils/extras";
import { CarouselIndex } from "./banner-image";
import { Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress"; // Componente de carga

async function BannerContent() {
  const data = await getBannerList();
  return <CarouselIndex data={data} />;
}

export async function BannerMain() {
  return (
    <Container maxWidth={false} disableGutters>
      <Box marginY={2}>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-48">
              <CircularProgress />
            </div>
          }
        >
          <BannerContent />
        </Suspense>
      </Box>
    </Container>
  );
}
