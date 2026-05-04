import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { TermWarranty } from "./term-warranty";

export function ProductDetailMore() {
  return (
    <Box>
      <Box>
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
          Métodos de pago
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* BCP */}
        <Box>
          <Image
            src="/logos-bancos/bcp.svg"
            alt="Banco BCP"
            width={100}
            height={200}
          />
        </Box>
        {/* BBVA */}
        <Box>
          <Image
            src="/logos-bancos/bbva.svg"
            alt="Banco BBVA"
            width={100}
            height={200}
          />
        </Box>
        {/* Interbank */}
        <Box>
          <Image
            src="/logos-bancos/interbank.svg"
            alt="Banco interbank"
            width={100}
            height={200}
          />
        </Box>
        {/* visa */}
        <Box>
          <Image
            src="/logos-bancos/visa.svg"
            alt="visa"
            width={100}
            height={200}
          />
        </Box>
        {/* mastercard */}
        <Box>
          <Image
            src="/logos-bancos/mastercard.svg"
            alt="Mastercard"
            width={100}
            height={200}
          />
        </Box>
        {/* dinerclub */}
        <Box>
          <Image
            src="/logos-bancos/dinersclub.svg"
            alt="dinerclub"
            width={100}
            height={200}
          />
        </Box>
      </Box>
      <Box sx={{ marginY: 4 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 600, textShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)", }}>
          Todas nuestras cuentas están a nombre de CORPORACIÓN LUANA S.A.C.
        </Typography>
        <Box sx={{ marginTop: 10}}>
          <TermWarranty />
        </Box>
      </Box>
    </Box>
  );
}
