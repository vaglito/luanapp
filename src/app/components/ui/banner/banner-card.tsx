import Image from "next/image";
import Link from "next/link";
import { Box } from "@mui/material";
import { Banner } from "@/app/utils/extras";

export const BannerCard = ({ banner }: { banner: Banner }) => {
  return (
    <Box sx={{ mt: 2 }}>
      {banner.is_active && (
        <Box>
          {banner.url_banner ? (
            <Link href={banner.url_banner}>
              <Image
                src={banner.img_banner}
                alt={banner.title_banner}
                height={576}
                width={2000}
                className="rounded-xl"
              />
            </Link>
          ) : (
            <Image
              src={banner.img_banner}
              alt={banner.title_banner}
              height={576}
              width={2000}
              className="rounded-xl"
            />
          )}
        </Box>
      )}
    </Box>
  );
};
