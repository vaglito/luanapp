"use client";

import { Container, Box, Typography, Table, TableBody, TableCell, TableRow, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCompare } from "@/hooks/use-compare";
import { convertUsdToPen } from "@/lib/currency";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const exchange = 3.75; // Default, could be passed from server

export default function ComparePage() {
  const { items, removeItem, clearAll } = useCompare();

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          No hay productos para comparar
        </Typography>
        <Typography color="text.secondary" mb={3}>
          Agregá productos usando el botón ⚖️ en las tarjetas del catálogo.
        </Typography>
        <Link href="/productos" style={{ color: "#5914A3", fontWeight: 600 }}>
          ← Volver al catálogo
        </Link>
      </Container>
    );
  }

  const specs = [
    { label: "Nombre", render: (p: typeof items[0]) => p.relay.productName },
    { label: "Precio", render: (p: typeof items[0]) => `S/. ${convertUsdToPen(p.relay.priceSale, exchange).toFixed(2)}` },
    { label: "Precio por mayor", render: (p: typeof items[0]) => p.relay.priceBulk > 0 ? `S/. ${convertUsdToPen(p.relay.priceBulk, exchange).toFixed(2)}` : "—" },
    { label: "Stock", render: (p: typeof items[0]) => `${p.relay.totalStock} unidades` },
    { label: "Código", render: (p: typeof items[0]) => p.relay.productId },
    { label: "Marca", render: (p: typeof items[0]) => p.relay.classificationCode.brandName },
    { label: "Categoría", render: (p: typeof items[0]) => p.relay.subcategoryCode.subcategoryName },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Comparar productos
          </Typography>
          <Typography color="text.secondary">
            {items.length} producto{items.length > 1 ? "s" : ""} seleccionado{items.length > 1 ? "s" : ""}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Link href="/productos" style={{ textDecoration: "none" }}>
            <Box component="span" sx={{ color: "text.secondary", display: "flex", alignItems: "center", gap: 0.5, "&:hover": { color: "primary.main" } }}>
              <ArrowBackIcon fontSize="small" /> Volver
            </Box>
          </Link>
        </Box>
      </Box>

      <Paper elevation={0} sx={{ overflow: "auto", border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
        <Table>
          <TableBody>
            {specs.map((spec) => (
              <TableRow key={spec.label} sx={{ "&:nth-of-type(odd)": { bgcolor: "grey.50" } }}>
                <TableCell sx={{ fontWeight: 700, whiteSpace: "nowrap", minWidth: 140, borderRight: "1px solid", borderColor: "divider" }}>
                  {spec.label}
                </TableCell>
                {items.map((item) => (
                  <TableCell key={item.id} sx={{ minWidth: 200 }}>
                    {spec.render(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Box
          onClick={clearAll}
          sx={{ color: "error.main", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 0.5, "&:hover": { textDecoration: "underline" } }}
        >
          <DeleteIcon fontSize="small" /> Limpiar comparación
        </Box>
      </Box>
    </Container>
  );
}
