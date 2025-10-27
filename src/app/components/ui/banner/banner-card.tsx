import Image from "next/image";
import Link from "next/link";
import { Box } from "@mui/material";
import { Banner } from "@/app/types/banner.type";

export const BannerCard = ({ banner }: { banner: Banner }) => {
  return (
    <Box sx={{ mt: 2 }}>
      {banner.isActive && (
        <Box>
          {banner.link ? (
            <Link href={banner.link}>
              <Image
                src={banner.image}
                alt={banner.title}
                height={576}
                width={2000}
                className="rounded-xl"
              />
            </Link>
          ) : (
            <Image
              src={banner.image}
              alt={banner.title}
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
