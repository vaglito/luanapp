import Image from "next/image";
import Link from "next/link";
import { Box } from "@mui/material";
import { Banner } from "@/types/banner.type";

export const BannerCard = ({
  banner,
  priority = false,
}: {
  banner: Banner;
  priority?: boolean;
}) => {
  return (
    <Box
      sx={{
        mt: 2,
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "30%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.15), transparent)",
          borderRadius: "0.75rem",
          pointerEvents: "none",
        },
      }}
    >
      {banner.isActive && (
        <Box>
          {banner.link ? (
            <Link href={banner.link}>
              <Image
                src={banner.image}
                alt={banner.title}
                height={576}
                width={2000}
                priority={priority}
                className="rounded-xl"
                style={{ width: "100%", height: "auto" }}
              />
            </Link>
          ) : (
            <Image
              src={banner.image}
              alt={banner.title}
              height={576}
              width={2000}
              priority={priority}
              className="rounded-xl"
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

