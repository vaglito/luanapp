import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid2,
  Chip,
  Alert,
  Divider,
  Button
} from "@mui/material";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CodeIcon from "@mui/icons-material/Code";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InvoicesPagination from "./components/InvoicesPagination";
import InvoicesSearch from "./components/InvoicesSearch";

interface InvoiceData {
  unico: string;
  cod: string;
  ruc: string;
  fecha: string;
  estab: string;
  ptoemi: string;
  total: number;
  secuencial: string;
  tipoDoc: {
    cod: string;
    descripcion: string;
  };
}

interface InvoicesResponse {
  success: boolean;
  message: string;
  data: InvoiceData[];
  meta: {
    total: number;
    page: number;
    size: number;
    pages: number;
  };
}

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const resolvedParams = await searchParams;
  const pageParam = resolvedParams?.page;
  const currentPage = typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;
  const pageSize = 9; // Display 9 items per page (3x3 grid)

  // Additional search filters
  const secuencial = typeof resolvedParams?.SECUENCIAL === "string" ? resolvedParams.SECUENCIAL : undefined;
  const ptoemi = typeof resolvedParams?.PTOEMI === "string" ? resolvedParams.PTOEMI : undefined;
  const cod = typeof resolvedParams?.COD === "string" ? resolvedParams.COD : undefined;
  const fecha1 = typeof resolvedParams?.fecha1 === "string" ? resolvedParams.fecha1 : undefined;
  const fecha2 = typeof resolvedParams?.fecha2 === "string" ? resolvedParams.fecha2 : undefined;

  const documentNumber = session.user.documentNumber;
  console.log(documentNumber);
  let invoicesData: InvoicesResponse | null = null;
  let errorMsg = null;

  if (!documentNumber) {
    errorMsg = "No se encontró el número de documento asociado a este usuario.";
  } else {
    try {
      const EDOC_URL = process.env.API_URL_EDIC || "http://localhost:8001";
      // We search by RUC and include pagination using page and size
      const searchQuery = new URLSearchParams({
        ruc: documentNumber,
        page: String(currentPage),
        size: String(pageSize),
      });
      if (secuencial) searchQuery.set("SECUENCIAL", secuencial);
      if (ptoemi) searchQuery.set("PTOEMI", ptoemi);
      if (cod) searchQuery.set("COD", cod);
      if (fecha1) searchQuery.set("fecha1", fecha1);
      if (fecha2) searchQuery.set("fecha2", fecha2);

      const res = await fetch(
        `${EDOC_URL}/api/documents/search?${searchQuery.toString()}`,
        {
          cache: "no-store",
        },
      );

      if (!res.ok) {
        const errorBody = await res.text();
        console.error(
          `Invoice API error: ${res.status} ${res.statusText}`,
          errorBody,
        );
        throw new Error(`Error al obtener las facturas (HTTP ${res.status})`);
      }
      invoicesData = await res.json();
    } catch (error) {
      console.error(error);
      errorMsg =
        "Ocurrió un error al cargar sus facturas o el servicio no está disponible.";
    }
  }

  const totalPages = invoicesData?.meta?.pages || 0;

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <ReceiptLongIcon sx={{ fontSize: 40, color: "primary.main" }} />
        <Box>
          <Typography variant="h4" fontWeight="800" color="text.primary">
            Mis Facturas
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gestiona y descarga tus comprobantes electrónicos emitidos.
          </Typography>
        </Box>
      </Box>

      {/* Search component */}
      <InvoicesSearch />

      {errorMsg ? (
        <Alert severity="error" sx={{ borderRadius: 2 }}>{errorMsg}</Alert>
      ) : invoicesData?.data?.length === 0 ? (
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          No se encontraron comprobantes electrónicos registrados a su documento ({documentNumber}).
        </Alert>
      ) : (
        <>
          <Grid2 container spacing={3}>
            {invoicesData?.data.map((invoice) => (
              <Grid2 size={{ xs: 12, md: 6, lg: 4 }} key={invoice.unico}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    border: "1px solid",
                    borderColor: "divider",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                      borderColor: "primary.light",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Header: Document Type and Total Amount */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                      <Box>
                        <Chip
                          label={invoice.tipoDoc.descripcion}
                          size="small"
                          color={invoice.tipoDoc.cod === "01" ? "primary" : "default"}
                          sx={{ fontWeight: "bold", mb: 1, textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: 0.5 }}
                        />
                        <Typography variant="h6" fontWeight="bold" sx={{ letterSpacing: 0.5 }}>
                          {invoice.estab}-{invoice.ptoemi}-{invoice.secuencial}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: -0.5 }}>
                          Total Facturado
                        </Typography>
                        <Typography variant="h6" fontWeight="900" color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          S/ {invoice.total.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2, borderStyle: "dashed" }} />

                    {/* Body: Date and Document Info */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary" }}>
                        <CalendarTodayIcon fontSize="small" />
                        <Typography variant="body2" fontWeight="500">
                          Emitido el {new Date(invoice.fecha + "T00:00:00").toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary" }}>
                        <ReceiptLongIcon fontSize="small" />
                        <Typography variant="body2" fontWeight="500">
                          RUC: {invoice.ruc}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Footer: Action Buttons */}
                    <Box sx={{ display: "flex", gap: 1.5 }}>
                      <Button
                        component="a"
                        href={`https://see.corporacionluana.pe/download.php?val=${invoice.unico}&ty=p&dat=${invoice.tipoDoc.cod}`}
                        target="_blank"
                        variant="contained"
                        color="error"
                        fullWidth
                        startIcon={<PictureAsPdfIcon />}
                        disableElevation
                        sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
                      >
                        PDF
                      </Button>
                      <Button
                        component="a"
                        href={`https://see.corporacionluana.pe/download.php?val=${invoice.unico}&ty=x&dat=${invoice.tipoDoc.cod}`}
                        target="_blank"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        startIcon={<CodeIcon />}
                        sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold", borderWidth: 1.5, "&:hover": { borderWidth: 1.5 } }}
                      >
                        XML
                      </Button>
                    </Box>

                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>

          <InvoicesPagination totalPages={totalPages} currentPage={currentPage} />
        </>
      )}
    </Box>
  );
}
