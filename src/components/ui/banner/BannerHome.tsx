import { Box, Container } from "@mui/material";
import { SliderBanner } from "./sliderBanner";
import { Banner } from "@/types/banner.type";

export const BannerHome = ({ banners }: { banners: Banner[] }) => {
  return (
    <Container maxWidth="xl">
      <Box>
        <SliderBanner banners={banners} />
      </Box>
    </Container>
  );
};

