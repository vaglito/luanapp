import { Box, Typography } from "@mui/material";

export function ProductSpecifications1({
  specifications,
}: {
  specifications?: string;
}) {
  return (
    <Box
      sx={{
        marginTop: 4,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        borderRadius: 3,
        p: 5,
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, mb: 2, textAlign: "center" }}
      >
        Especificaciones del Producto
      </Typography>
      {specifications ? (
        <Box dangerouslySetInnerHTML={{ __html: specifications }} />
      ) : (
        <Typography>No hay descripcion</Typography>
      )}
    </Box>
  );
}
