import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

type Specifications = {
  [key: string]: string | number; // Definición del tipo
};

interface ProductSpecificationsProps {
  specifications: Specifications;
}

export function ProductSpecificationsContainer({
  specifications,
}: ProductSpecificationsProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          mb: 2,
          textAlign: "center",
          textShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
          color: "#545454",
          fontSize: 25,
        }}
      >
        Especificaciones del Producto
      </Typography>

      <TableContainer
        sx={{
          paddingX: { xs: 0, sm: 0, md: 4 },
          borderRadius: "12px",
        }}
      >
        <Table>
          <TableBody>
            {Object.entries(specifications).map(([key, value], index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                    width: "50%",
                    textTransform: "capitalize",
                    textShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                    fontSize: 19,
                  }}
                >
                  {key.replace(/_/g, " ")}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#545454",
                    textShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                    fontSize: 19,
                  }}
                >
                  {value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
