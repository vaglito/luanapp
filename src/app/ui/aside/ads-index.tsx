import Link from "next/link";
import Image from "next/image";

// Imports MUI Components
import { Box, Container, Typography, Grid2 } from "@mui/material";

export function AdsHome() {
  return (
    <Box component="section" sx={{ marginY: 4 }}>
      <Grid2 container spacing={1}>
        <Grid2 size={{ xs: 6, md: 4 }}>
          <Link href="/productos">
            <Image
              src="/category/IMPRESORAS.jpg"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              alt="Impresoras"
              className="rounded-xl drop-shadow-lg"
            />
          </Link>
        </Grid2>
        <Grid2 size={{ xs: 6, md: 4 }}>
          <Link href="/productos">
            <Image
              src="/category/MONITORES.jpg"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              alt="Monitores"
              className="rounded-xl drop-shadow-lg"
            />
          </Link>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Link href="/productos">
            <Image
              src="/category/PERIFERICOS.jpg"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              alt="Perifericos"
              className="rounded-xl drop-shadow-lg"
            />
          </Link>
        </Grid2>
      </Grid2>
      <Grid2 container spacing={1} sx={{ marginY: 1 }}>
        <Grid2 size={6}>
          <Link href="/productos">
            <Image
              src="/category/TARJETAS-DE-VIDEO.jpg"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              alt="Tarjetas de video"
              className="rounded-xl drop-shadow-lg"
            />
          </Link>
        </Grid2>
        <Grid2 size={6}>
          <Link href="/productos">
            <Image
              src="/category/MOTHERBOARDS.jpg"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              alt="Placas madres"
              className="rounded-xl drop-shadow-lg"
            />
          </Link>
        </Grid2>
      </Grid2>
    </Box>
  );
}
