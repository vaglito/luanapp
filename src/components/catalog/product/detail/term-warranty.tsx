"use client";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";

const sectionTitleStyle = {
  fontSize: 25,
  fontWeight: 600,
  textShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
  color: "#545454",
};

const summaryTextStyle = {
  fontSize: 20,
  fontWeight: 600,
  textShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
  color: "#545454",
};

const detailTextStyle = {
  fontSize: 16,
  color: "#545454",
  textShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
};

export function TermWarranty() {
  return (
    <Box>
      <Box sx={{ marginY: 4 }}>
        <Typography sx={sectionTitleStyle}>
          📦 Garantía de Productos
        </Typography>
      </Box>

      {/* Garantía dentro de los primeros 7 días */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={summaryTextStyle}>
            ✅ Garantía dentro de los primeros 7 días hábiles
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={detailTextStyle}>
          <Typography>
            Durante los{" "}
            <Typography component="span" fontWeight="bold">
              primeros 7 días hábiles
            </Typography>{" "}
            desde la fecha de compra, si el producto presenta fallas de
            funcionamiento, se procederá a realizar el{" "}
            <Typography component="span" fontWeight="bold">
              cambio inmediato
            </Typography>
            .
          </Typography>

          <Typography my={2}>
            Para hacer válida esta garantía, el producto debe cumplir con las
            siguientes condiciones:
          </Typography>

          <ul style={{ paddingLeft: "1.5rem", marginTop: 0 }}>
            <li>
              <Typography sx={detailTextStyle}>
                Estar en el{" "}
                <Typography component="span" fontWeight="bold">
                  mismo estado en que fue entregado
                </Typography>
                .
              </Typography>
            </li>
            <li>
              <Typography sx={detailTextStyle}>
                Incluir{" "}
                <Typography component="span" fontWeight="bold">
                  todos sus accesorios originales
                </Typography>
                , empaques, repuestos, manuales, seguros y demás elementos del
                contenido de la caja.
              </Typography>
            </li>
            <li>
              <Typography sx={detailTextStyle}>
                <Typography component="span" fontWeight="bold">
                  No presentar señales de uso
                </Typography>
                , daños físicos, rayaduras, suciedad u otras alteraciones.
              </Typography>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>

      {/* Garantía después de los 7 días */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={summaryTextStyle}>
            🔧 Garantía después de los 7 días hábiles
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={detailTextStyle}>
          <Typography>
            Si el producto presenta alguna{" "}
            <Typography component="span" fontWeight="bold">
              falla después de los 7 días hábiles
            </Typography>
            , el cliente deberá acercarse al soporte técnico. El producto será
            evaluado y enviado al{" "}
            <Typography component="span" fontWeight="bold">
              servicio técnico autorizado por la marca
            </Typography>
            .
          </Typography>

          <ul style={{ paddingLeft: "1.5rem", marginTop: "1rem" }}>
            <li>
              <Typography sx={detailTextStyle}>
                El plazo mínimo de diagnóstico es de{" "}
                <Typography component="span" fontWeight="bold">
                  7 días hábiles
                </Typography>{" "}
                y el máximo de{" "}
                <Typography component="span" fontWeight="bold">
                  30 días hábiles
                </Typography>
                .
              </Typography>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>

      {/* Casos en los que la garantía no aplica */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={summaryTextStyle}>
            ❌ Casos en los que la garantía no aplica
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={detailTextStyle}>
          <Typography my={2}>
            La garantía{" "}
            <Typography component="span" fontWeight="bold">
              no será válida
            </Typography>{" "}
            en los siguientes casos:
          </Typography>

          <Box style={{ paddingLeft: "1.5rem" }}>
            {[
              "Cuando el producto se encuentre fuera del periodo de garantía.",
              "Presente daños físicos o rayaduras.",
              "Las etiquetas del fabricante estén adulteradas o removidas.",
              "El daño haya sido causado por fluctuaciones eléctricas o mala instalación.",
              "Haya presencia de óxido o elementos corrosivos.",
              "Se evidencie un intento de reparación no autorizado.",
              "Las fallas provengan del uso de software no recomendado o mal manipulado.",
            ].map((text, idx) => (
                <Typography component="li" key={idx} sx={detailTextStyle}>{text}</Typography>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
