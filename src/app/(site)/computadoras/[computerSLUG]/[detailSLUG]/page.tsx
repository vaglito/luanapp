import Image from "next/image";
import { Box, Container, Typography, Divider } from "@mui/material";
import { fetchComputerDetail } from "@/app/services/computer";
import { ShopWhatsApp } from "@/app/ui/shop-whatsapp";

interface ComputerDetailPageProps {
  params: {
    detailSLUG: string;
  };
}

export default async function ComputerDetailPage({
  params,
}: ComputerDetailPageProps) {
  const { detailSLUG } = params;
  const computer = await fetchComputerDetail(detailSLUG);

  if (!computer) {
    return (
        <Box>
            <Typography>No hay ninguna pc para mostrar.</Typography>
        </Box>
    )
  }

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "column", lg: "row" },
          width: "100%",
          gap: 5,
        }}
      >
        {/* Image */}
        <Box
          sx={{
            width: { xs: "100%", md: "100%", lg: 900 },
          }}
        >
          {computer?.image ? (
            <Image
              src={computer?.image}
              alt="Foto titulo"
              width={900}
              height={900}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <Image
              src="/not-found.png"
              alt="La imagen no existe"
              width={900}
              height={900}
              style={{ objectFit: "cover" }}
            />
          )}
        </Box>
        {/* Description */}
        <Box
          sx={{
            display: "flex",
            width: { xs: "100%", md: "100%", lg: "100%" },
            flexDirection: "column",
          }}
        >
          <Box mb={8}>
            <Typography
              sx={{
                fontSize: 35,
                color: "#333333",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {computer?.slug}
            </Typography>
          </Box>
          {/* specs */}
          <Divider>Especificaciones</Divider>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                marginY: 2,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                width: "60%",
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
          <Box>
            <ShopWhatsApp title={computer?.slug} slug={computer?.slug} />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          marginY: 10,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 25, fontWeight: "bold" }}>
            Ficha Tecnica
          </Typography>
        </Box>
      </Box>
      <Box>
        {computer?.computers.map((item) => (
          <Box key={item.pk}>
            <Typography>{item.product.sopprod.nom_prod}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
