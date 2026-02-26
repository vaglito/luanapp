import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid2,
  Chip,
  Tooltip,
  IconButton,
  Alert,
} from "@mui/material";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CodeIcon from "@mui/icons-material/Code";

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

export default async function InvoicesPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const documentNumber = session.user.documentNumber;
  console.log(documentNumber);
  let invoicesData: InvoicesResponse | null = null;
  let errorMsg = null;

  if (!documentNumber) {
    errorMsg = "No se encontró el número de documento asociado a este usuario.";
  } else {
    try {
      const EDOC_URL = process.env.API_URL_EDIC || "http://localhost:8001";
      // We will search by RUC which represents the user document
      const res = await fetch(
        `${EDOC_URL}/api/documents/search?ruc=${documentNumber}&size=50`,
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

  const EDOC_URL = process.env.API_URL_EDIC || "http://localhost:8001";

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Mis Facturas
      </Typography>

      {errorMsg ? (
        <Alert severity="error">{errorMsg}</Alert>
      ) : invoicesData?.data?.length === 0 ? (
        <Alert severity="info">
          No tiene facturas registradas en el sistema.
        </Alert>
      ) : (
        <Grid2 container spacing={3}>
          {invoicesData?.data.map((invoice) => (
            <Grid2 size={{ xs: 12, md: 6, lg: 4 }} key={invoice.unico}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {invoice.tipoDoc.descripcion}
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {invoice.estab}-{invoice.ptoemi}-{invoice.secuencial}
                      </Typography>
                    </Box>
                    <Chip
                      label={`S/ ${invoice.total.toFixed(2)}`}
                      color="primary"
                      sx={{ fontWeight: "bold" }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      mb: 3,
                    }}
                  >
                    <Typography variant="body2">
                      <strong>Fecha:</strong>{" "}
                      {new Date(
                        invoice.fecha + "T00:00:00",
                      ).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>RUC/DNI:</strong> {invoice.ruc}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      borderTop: "1px solid",
                      borderColor: "divider",
                      pt: 2,
                    }}
                  >
                    <Tooltip title="Descargar PDF">
                      <IconButton
                        component="a"
                        href={`${EDOC_URL}/api/documents/${invoice.unico}/download/pdf`}
                        target="_blank"
                        color="error"
                      >
                        <PictureAsPdfIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Descargar XML">
                      <IconButton
                        component="a"
                        href={`${EDOC_URL}/api/documents/${invoice.unico}/download/xml`}
                        target="_blank"
                        color="primary"
                      >
                        <CodeIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
}
