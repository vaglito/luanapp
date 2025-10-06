import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

type Specifications = {
  [key: string]: string | number; // Definición del tipo
};

interface ProductSpecificationsProps {
  specifications: Specifications;
}

export function ProductSpecifications({
  specifications,
}: ProductSpecificationsProps) {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, mb: 2, textAlign: "center" }}
      >
        Especificaciones del Producto
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ boxShadow: "0 2px 10px rgba(0,0,0,0.1)", borderRadius: 3 }}
      >
        <Table>
          <TableBody>
            {Object.entries(specifications).map(([key, value], index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                    width: "40%",
                    textTransform: "capitalize",
                  }}
                >
                  {key.replace(/_/g, " ")}
                </TableCell>
                <TableCell sx={{ color: "#757575" }}>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export function ProductSpecifications1({
  specifications,
}: {
  specifications: string;
}) {
  return (
    <Box sx={{ marginTop: 4, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", borderRadius: 3, p: 5 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, mb: 2, textAlign: "center" }}
      >
        Especificaciones del Producto
      </Typography>
      <Box dangerouslySetInnerHTML={{ __html: specifications }} />
    </Box>
  );
}
