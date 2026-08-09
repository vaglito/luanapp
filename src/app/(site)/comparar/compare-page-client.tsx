"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCompare } from "@/hooks/use-compare";
import { useCart } from "@/hooks/use-cart";
import { convertUsdToPen } from "@/lib/currency";
import { Products } from "@/types/products.type";

interface ComparePageClientProps {
  exchange: number;
}

type SpecKey =
  | "Nombre"
  | "Precio"
  | "Precio por mayor"
  | "Stock"
  | "Código"
  | "Marca"
  | "Categoría";

function computeDiffStyle(
  specKey: SpecKey,
  items: Products[],
  currentIndex: number
): React.CSSProperties {
  if (items.length < 2) return {};

  if (specKey === "Precio") {
    const values = items.map((p) => p.relay.priceSale);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const current = values[currentIndex];
    if (min === max) return {};
    if (current === min) return { color: "#2e7d32", fontWeight: 700 };
    return { backgroundColor: "#fff3e0" };
  }

  if (specKey === "Precio por mayor") {
    const vals = items.map((p) =>
      p.relay.priceBulk > 0 ? p.relay.priceBulk : null
    );
    const numeric = vals.filter((v) => v !== null) as number[];
    if (numeric.length < 2) return {};
    const min = Math.min(...numeric);
    const max = Math.max(...numeric);
    const current = vals[currentIndex];
    if (min === max) return {};
    if (current === null || current <= 0) return {};
    if (current === min) return { color: "#2e7d32", fontWeight: 700 };
    return { backgroundColor: "#fff3e0" };
  }

  if (specKey === "Stock") {
    const values = items.map((p) => p.relay.totalStock);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const current = values[currentIndex];
    if (min === max) return {};
    if (current === min) return { backgroundColor: "#fff3e0" };
    return {};
  }

  return {};
}

export function ComparePageClient({ exchange }: ComparePageClientProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { items, removeItem, clearAll } = useCompare();
  const { addItem } = useCart();

  const specs: { label: SpecKey; render: (p: Products) => string }[] = useMemo(
    () => [
      {
        label: "Nombre",
        render: (p) => p.relay.productName,
      },
      {
        label: "Precio",
        render: (p) =>
          `S/. ${convertUsdToPen(p.relay.priceSale, exchange).toFixed(2)}`,
      },
      {
        label: "Precio por mayor",
        render: (p) =>
          p.relay.priceBulk > 0
            ? `S/. ${convertUsdToPen(p.relay.priceBulk, exchange).toFixed(2)}`
            : "—",
      },
      {
        label: "Stock",
        render: (p) => `${p.relay.totalStock} unidades`,
      },
      {
        label: "Código",
        render: (p) => p.relay.productId,
      },
      {
        label: "Marca",
        render: (p) => p.relay.classificationCode.brandName,
      },
      {
        label: "Categoría",
        render: (p) => p.relay.subcategoryCode.subcategoryName,
      },
    ],
    [exchange]
  );

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" fontWeight={800} gutterBottom>
          No hay productos para comparar
        </Typography>
        <Typography color="text.secondary" mb={2}>
          Agregá productos desde el catálogo para empezar a comparar.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 1.5,
            mb: 3,
          }}
        >
          {[
            { label: "Laptops", href: "/productos/laptops" },
            { label: "Computadoras", href: "/productos/computadoras" },
            { label: "Componentes", href: "/productos/componentes" },
            { label: "Accesorios", href: "/productos/accesorios" },
          ].map((cat) => (
            <Button
              key={cat.href}
              component={Link}
              href={cat.href}
              variant="outlined"
              size="small"
              sx={{ textTransform: "none", borderRadius: 2 }}
            >
              {cat.label}
            </Button>
          ))}
        </Box>

        <Link
          href="/productos"
          style={{ color: "#5914A3", fontWeight: 600 }}
        >
          ← Volver al catálogo
        </Link>
      </Container>
    );
  }

  const handleAddToCart = (e: React.MouseEvent, product: Products) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Comparar productos
          </Typography>
          <Typography color="text.secondary">
            {items.length} producto{items.length > 1 ? "s" : ""} seleccionado
            {items.length > 1 ? "s" : ""}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Link href="/productos" style={{ textDecoration: "none" }}>
            <Box
              component="span"
              sx={{
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                "&:hover": { color: "primary.main" },
              }}
            >
              <ArrowBackIcon fontSize="small" /> Volver
            </Box>
          </Link>
        </Box>
      </Box>

      {/* Mobile: Accordion cards */}
      {isMobile ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {items.map((product) => (
            <Accordion
              key={product.id}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "12px !important",
                overflow: "hidden",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <Box
                    component="img"
                    src={
                      product.productsimages?.[0]?.images || "/not-found.png"
                    }
                    alt={product.relay.productName}
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 1,
                      objectFit: "cover",
                      border: "1px solid",
                      borderColor: "divider",
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.relay.productName}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      color="primary.main"
                    >
                      S/.{" "}
                      {convertUsdToPen(
                        product.relay.priceSale,
                        exchange
                      ).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                >
                  {specs.map((spec) => (
                    <Box
                      key={spec.label}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: 0.5,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        ...computeDiffStyle(spec.label, items, items.indexOf(product)),
                      }}
                    >
                      <Typography variant="body2" fontWeight={600}>
                        {spec.label}
                      </Typography>
                      <Typography variant="body2">
                        {spec.render(product)}
                      </Typography>
                    </Box>
                  ))}

                  {/* Actions */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mt: 1.5,
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      component={Link}
                      href={`/productos/detalle/${product.slug}`}
                      variant="outlined"
                      size="small"
                      sx={{ textTransform: "none", borderRadius: 2 }}
                    >
                      Ver detalle
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<AddShoppingCartIcon />}
                      onClick={(e) => handleAddToCart(e, product)}
                      sx={{ textTransform: "none", borderRadius: 2 }}
                    >
                      Agregar al carrito
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => removeItem(product.id)}
                      sx={{ textTransform: "none", borderRadius: 2 }}
                    >
                      Quitar
                    </Button>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ) : (
        /* Desktop: Table */
        <Paper
          elevation={0}
          sx={{
            overflow: "auto",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <Table>
            {/* Column headers: product thumbnails + name */}
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    minWidth: 140,
                    borderRight: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  Producto
                </TableCell>
                {items.map((product) => (
                  <TableCell
                    key={product.id}
                    sx={{ minWidth: 220, textAlign: "center", py: 2 }}
                  >
                    <Box
                      component="img"
                      src={
                        product.productsimages?.[0]?.images ||
                        "/not-found.png"
                      }
                      alt={product.relay.productName}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 1,
                        objectFit: "cover",
                        border: "1px solid",
                        borderColor: "divider",
                        mb: 1,
                      }}
                    />
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.relay.productName}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>

              {/* Spec rows */}
              {specs.map((spec) => (
                <TableRow
                  key={spec.label}
                  sx={{ "&:nth-of-type(odd)": { bgcolor: "grey.50" } }}
                >
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      minWidth: 140,
                      borderRight: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    {spec.label}
                  </TableCell>
                  {items.map((product, idx) => (
                    <TableCell
                      key={product.id}
                      sx={{
                        minWidth: 220,
                        textAlign: "center",
                        ...computeDiffStyle(spec.label, items, idx),
                      }}
                    >
                      {spec.render(product)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

              {/* Actions row: "Ver detalle" + "Agregar al carrito" */}
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    borderRight: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  Acciones
                </TableCell>
                {items.map((product) => (
                  <TableCell
                    key={product.id}
                    sx={{ minWidth: 220, textAlign: "center" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        alignItems: "center",
                      }}
                    >
                      <Button
                        component={Link}
                        href={`/productos/detalle/${product.slug}`}
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ textTransform: "none", borderRadius: 2 }}
                      >
                        Ver detalle
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        startIcon={<AddShoppingCartIcon />}
                        onClick={(e) => handleAddToCart(e, product)}
                        sx={{ textTransform: "none", borderRadius: 2 }}
                      >
                        Agregar al carrito
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => removeItem(product.id)}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          fontSize: "0.75rem",
                        }}
                      >
                        Quitar
                      </Button>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Footer: clear all */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Box
          onClick={clearAll}
          sx={{
            color: "error.main",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          <DeleteIcon fontSize="small" /> Limpiar comparación
        </Box>
      </Box>
    </Container>
  );
}
