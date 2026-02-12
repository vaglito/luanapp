import { Box, Container } from "@mui/material";
import { SliderBanner } from "./sliderBanner";
import { Banner } from "@/types/banner.type";

export const BannerHome = ({ banners }: { banners: Banner[] }) => {
  return (
    <Box sx={{ width: "100%", p: 0, m: 0 }}>
      <SliderBanner banners={banners} />
    </Box>
  );
};

