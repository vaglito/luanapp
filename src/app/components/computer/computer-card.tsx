import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { Computer } from "@/app/types/v2/computer-type";
import { ShopWhatsApp } from "../shop-whatsapp";

export function ComputerCard({ computer }: { computer: Computer }) {
  const pathname = usePathname();
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Link href={`${pathname}/${computer.slug}`}>
        <Box
          sx={{
            borderRadius: 5,
            overflow: "hidden",
            "& img": {
              transition:
                "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease, box-shadow 0.6s ease",
              transform: "scale(1)",
            },
            "&:hover img": {
              transform: "scale(1.1)",
            },
          }}
        >
          {computer.image ? (
            <Image
              src={computer.image}
              alt={`${computer.title} - foto`}
              width={500}
              height={500}
              style={{ objectFit: "cover", borderRadius: 5 }}
            />
          ) : (
            <Image
              src="/not-found.png"
              alt="Foto de la computadora no encontrada."
              width={500}
              height={500}
              style={{ objectFit: "cover", borderRadius: 5 }}
            />
          )}
        </Box>
        <Box
          sx={{
            marginY: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: 16, md: 20 },
              color: "#333333",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {computer.title}
          </Typography>
        </Box>
      </Link>
      <ShopWhatsApp title={computer.title} slug={computer.slug} />
      <Box
        sx={{
          marginY: 2,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {Object.entries(computer.specifications).map(([key, value]) => (
          <Box
            key={key}
            sx={{
              width: "45%",
              mb: 1,
              bgcolor: "primary.main",
              borderRadius: 1,
              p: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 12, md: 18 },
                textAlign: "center",
                color: "white",
              }}
            >
              {key}: {value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
