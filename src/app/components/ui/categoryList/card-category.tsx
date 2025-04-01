import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { Categorys } from "@/app/types/v2/categorys-type";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

export const CardCategory = ({ category }: { category: Categorys }) => {
  return (
    <BootstrapTooltip title={category.soplinea.nom_line}>
      <Box
        sx={{
          bgcolor: "#e1e1e1",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          width: { xs: 110, sm: 120, md: 190 }, // Tamaño ajustable según el viewport
          height: { xs: 110, sm: 120, md: 190 },
          overflow: "hidden", // Evita que la imagen sobresalga del borde redondo
          mx: "auto", // Centra el contenedor
        }}
      >
        {category.image ? (
          <Image
            src={category.image}
            alt={`Imagen de ${category.soplinea.nom_line ?? "categoría"}`}
            sizes="100vw"
            width={250}
            height={250}
            className="transition duration-150 ease-in-out hover:scale-110"
            style={{
              width: "100%", // Ajustar a contenedor
              height: "100%", // Ajustar a contenedor
              objectFit: "cover", // Evitar distorsión
              borderRadius: "50%", // Hacer la imagen redonda
              cursor: "pointer",
            }}
          />
        ) : (
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.0rem",
              textAlign: "center",
              color: "#333",
            }}
          >
            {category.soplinea.nom_line}
          </Typography>
        )}
      </Box>
    </BootstrapTooltip>
  );
};
